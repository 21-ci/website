import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { useLocale } from "../../context/LocaleContext";

const ICONS = [
  // One bill, unlimited services - stack of servers
  <svg key="stack" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="3" width="20" height="5" rx="1.5" />
    <rect x="2" y="10" width="20" height="5" rx="1.5" />
    <rect x="2" y="17" width="20" height="5" rx="1.5" />
    <circle cx="19" cy="5.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="19.5" r="1" fill="currentColor" stroke="none" />
  </svg>,
  // Zero cost when idle - moon
  <svg key="moon" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>,
  // Sub-10ms cold starts - lightning
  <svg key="bolt" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  // Data stays local - location pin
  <svg key="pin" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>,
  // Open source, zero lock-in - unlock icon
  <svg key="unlock" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>,
  // Works with existing code - code brackets
  <svg key="code" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>,
];

export function Features() {
  const { dict } = useLocale();
  const f = dict.features;

  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        {/* Section header */}
        <div className="max-w-2xl">
          <SectionHeading>{f.title}</SectionHeading>
          <p className="mt-4 text-lg leading-relaxed text-white/75">{f.subtitle}</p>
        </div>

        {/* Feature cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {f.cards.map((card, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/15 bg-black/70 p-6 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-black/80"
            >
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                {ICONS[i]}
              </div>
              <h3 className="text-base font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{card.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
