import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { FeatureItem } from "../ui/FeatureItem";
import { HeroCLI } from "../ui/HeroCLI";
import { useLocale } from "../../context/LocaleContext";
import { BOOK_CALL_URL, GITHUB_URL } from "../../content/links";

// One icon per hero feature bullet (5 total after merge).
const FEATURE_ICONS = [
  // Speed - bolt
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
    <path d="M11 2L4 11h5l-1 7 8-10h-5l1-6z" />
  </svg>,
  // Price - tag
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
    <path d="M3 8.5V4.5a1 1 0 011-1h4a1 1 0 01.7.3l7 7a1 1 0 010 1.4l-4 4a1 1 0 01-1.4 0l-7-7A1 1 0 013 8.5z" />
    <circle cx="6.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
  </svg>,
  // Location - map pin
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
    <path d="M10 2a5 5 0 00-5 5c0 4.5 5 11 5 11s5-6.5 5-11a5 5 0 00-5-5z" />
    <circle cx="10" cy="7" r="1.75" />
  </svg>,
];

export function Hero() {
  const { dict } = useLocale();
  const hero = dict.hero;

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-16">
          {/* Left: headline + features + CTAs */}
          <div>
            <h1 className="max-w-2xl animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {hero.titleStart}
              <span className="text-brand-green">{hero.titleAccent}</span>
            </h1>

            <ul className="mt-10 space-y-4">
              {hero.features.map((f, i) => (
                <FeatureItem key={f.lead} lead={f.lead} text={f.text} index={i} icon={FEATURE_ICONS[i]} />
              ))}
            </ul>

            <div
              className="mt-12 flex flex-col gap-3 animate-fade-up sm:flex-row sm:items-center"
              style={{ animationDelay: "550ms" }}
            >
              <ButtonLink href={BOOK_CALL_URL} target="_blank" rel="noreferrer" size="lg" variant="primary">
                {hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={GITHUB_URL} target="_blank" rel="noreferrer" size="lg" variant="dark">
                {hero.ctaSecondary}
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </ButtonLink>
            </div>

            <p className="mt-8 text-xs text-white/40">{hero.footnote}</p>
          </div>

          {/* Right: interactive CLI demo - desktop only */}
          <div className="hidden lg:block">
            <HeroCLI />
          </div>
        </div>
      </Container>
    </section>
  );
}
