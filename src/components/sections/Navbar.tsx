import { useState } from "react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { LocaleSelector } from "../ui/LocaleSelector";
import { useLocale } from "../../context/LocaleContext";
import { BOOK_CALL_URL } from "../../content/links";

export function Navbar() {
  const { dict } = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { label: dict.nav.pricing, href: "#pricing" },
    { label: dict.nav.openSource, href: "#open-source" },
    { label: dict.nav.contacts, href: "#contacts" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/70 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#" aria-label="21 Cloud - home" className="flex items-center gap-2">
          <Logo className="h-8 w-auto sm:h-9" />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSelector />
          <ButtonLink
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className="hidden md:inline-flex"
          >
            {dict.nav.bookCall}
          </ButtonLink>

          {/* mobile burger */}
          <button
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base text-white/80 hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <ButtonLink href={BOOK_CALL_URL} target="_blank" rel="noreferrer" variant="primary" className="mt-2">
              {dict.nav.bookCall}
            </ButtonLink>
          </Container>
        </nav>
      )}
    </header>
  );
}
