import markUrl from "../../assets/logos/logo-mark.svg";
import infraUrl from "../../assets/logos/logo-infra.svg";

interface LogoProps {
  className?: string;
  /** "mark" = colored brand glyph; "infra" = white blueprint variant. */
  variant?: "mark" | "infra";
}

/** 21 Cloud interlocked-clouds mark, rendered from the brand SVG assets. */
export function Logo({ className = "h-9 w-auto", variant = "mark" }: LogoProps) {
  return (
    <img
      src={variant === "infra" ? infraUrl : markUrl}
      alt="21 Cloud"
      className={className}
      draggable={false}
    />
  );
}
