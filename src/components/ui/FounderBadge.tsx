import founderPhoto from "../../assets/founder.png";

interface FounderBadgeProps {
  name: string;
  role: string;
  bio: string;
}

/**
 * The Figma white ID-badge card with a hanging strap.
 * Used as the non-WebGL fallback for the 3D Lanyard.
 */
export function FounderBadge({ name, role, bio }: FounderBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      {/* strap */}
      <div aria-hidden className="h-16 w-1.5 rounded-b-sm bg-black/80" />
      <div aria-hidden className="-mt-1 size-3 rounded-full bg-brand-green ring-2 ring-black/60" />
      <div className="w-60 -mt-1.5 origin-top rounded-2xl bg-white p-4 pb-5 text-center shadow-2xl transition-transform duration-500 hover:rotate-2">
        <div className="relative mx-auto overflow-hidden rounded-t-[6.5rem] rounded-b-xl">
          <img
            src={founderPhoto}
            alt={`${name}, ${role}`}
            className="h-52 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-8">
            <p className="text-lg font-bold text-white">{name}</p>
            <p className="text-xs font-medium text-brand-blue">{role}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-neutral-700">{bio}</p>
      </div>
    </div>
  );
}
