import { useEffect, useState } from "react";
import * as THREE from "three";

interface BadgeParams {
  name: string;
  role: string;
  photoUrl: string;
  logoUrl: string;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// GLB card face: 0.716 wide × 1.0 tall (units); UV canvas: 512 × 543.6 px
// H-density: 512/0.716=715 px/unit; V-density: 543.6/1.0=543.6 px/unit
// Without correction, canvas content appears 715/543.6 = 1.316× taller on card.
// Pre-compress photo vertically by VCORR so it renders with natural proportions.
const VCORR = 543.6 / 715.1; // ≈ 0.760

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  yBias = 0.35,
) {
  const scale = Math.max(dw / img.width, dh / img.height);
  const sw = dw / scale;
  const sh = dh / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) * yBias;
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * Portrait badge: full-bleed photo, bottom caption strip with name + role.
 * Canvas 1024x720 creates an atlas where the front face sits on the left half.
 */
export function useBadgeTexture({ name, role, photoUrl, logoUrl }: BadgeParams) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    // Atlas requires double width so the front face falls within U: 0.0 to 0.5
    const ATLAS_W = 1024; 
    const H = 720;
    
    // Drawing boundary for a single face
    const FACE_W = 512; 

    // Card face UV: v goes 0.002 → 0.757 (top 75.7% of canvas is visible on card)
    const VISIBLE_H = Math.round(0.757 * H); // 545 - bottom of card face in canvas px
    const STRIP = 110; // caption strip at bottom of visible area

    const canvas = document.createElement("canvas");
    canvas.width = ATLAS_W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    function paint(photo: HTMLImageElement | null, logo: HTMLImageElement | null) {
      // Base fill for the entire 1024x720 atlas
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, ATLAS_W, H);

      // --- Draw Front Face on the Left Half (0 to 512) ---
      const photoH = VISIBLE_H - STRIP;
      if (photo) {
        ctx.save();
        ctx.scale(1, VCORR);
        drawCover(ctx, photo, 0, 0, FACE_W, photoH / VCORR);
        ctx.restore();
      } else {
        ctx.fillStyle = "#d1d5db";
        ctx.fillRect(0, 0, FACE_W, photoH);
      }

      // Draw Logo (Top Right)
      if (logo) {
        ctx.save();
        ctx.scale(1, VCORR); // Prevents the logo from stretching vertically on the 3D model
        const logoSize = 48;
        const padding = 24;
        ctx.drawImage(
          logo, 
          FACE_W - logoSize - padding, 
          padding / VCORR, 
          logoSize, 
          logoSize
        );
        ctx.restore();
      }

      // Caption strip
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, photoH, FACE_W, STRIP);

      // Thin separator line
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, photoH);
      ctx.lineTo(FACE_W, photoH);
      ctx.stroke();

      // Semicircle tab at the bottom of the card face (drawn below the caption strip)
      ctx.fillStyle = "#9ca3af"; // Matching the visual grey from the screenshot
      ctx.beginPath();
      // Draw a half-circle starting from the bottom edge of the visible area
      ctx.arc(FACE_W / 2, VISIBLE_H, 48, 0, Math.PI, false);
      ctx.fill();

      // --- Draw Text (Horizontally Stretched) ---
      ctx.save();
      const H_SCALE = 1 / VCORR; // ~1.316
      ctx.scale(H_SCALE, 1);
      
      // Divide X coordinates by H_SCALE to keep text perfectly centered after X-scaling
      const centerX = (FACE_W / 2) / H_SCALE;

      // Name - pinned to the top of the reserved area
      ctx.fillStyle = "#111827";
      ctx.font = "700 26px Onest, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(name, centerX, photoH + 36);

      // Role - multiline support (Up to 2 lines reserved)
      ctx.fillStyle = "#6b7280";
      ctx.font = "400 17px Onest, sans-serif";
      
      // Catch literal "\n" strings from data payloads, or standard newline characters, limiting to 2 lines
      const roleLines = role.replace(/\\n/g, '\n').split('\n').slice(0, 2);
      
      roleLines.forEach((line, index) => {
        // Line 1 is drawn at +66, Line 2 is drawn at +88.
        ctx.fillText(line.trim(), centerX, photoH + 66 + (index * 22));
      });
      
      ctx.restore();

      // --- Mirror to Back Face ---
      // Copies the front face onto the right half (512 to 1024) 
      ctx.drawImage(canvas, 0, 0, FACE_W, H, FACE_W, 0, FACE_W, H);

      const tex = new THREE.CanvasTexture(canvas);
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
      tex.needsUpdate = true;
      if (!cancelled) setTexture(tex);
    }

    // Load both the photo and the logo simultaneously
    Promise.allSettled([loadImage(photoUrl), loadImage(logoUrl)]).then(([p, l]) => {
      if (cancelled) return;
      const photo = p.status === "fulfilled" ? p.value : null;
      const logo = l.status === "fulfilled" ? l.value : null;
      
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
      if (fonts?.ready) {
        fonts.ready.then(() => !cancelled && paint(photo, logo));
      } else {
        paint(photo, logo);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [name, role, photoUrl, logoUrl]);

  return texture;
}