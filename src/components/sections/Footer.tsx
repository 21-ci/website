import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { useLocale } from "../../context/LocaleContext";
import { TOS_URL, TOS_URL_LABEL } from "../../content/contacts";

export function Footer() {
  const { dict } = useLocale();
  const f = dict.footer;

  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col gap-6 text-xs leading-relaxed text-white/45 sm:text-sm md:flex-row md:justify-between">
          <p className="max-w-sm">{f.sharing}</p>
          <div className="max-w-xl space-y-1 md:text-right">
            <p>{f.registration}</p>
            <p>{f.proof}</p>
            <p className="mt-2 italic">{f.publicOffer}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo className="h-7 w-auto" />
          <p className="text-xs text-white/45">
            {f.tosBefore}
            <a href={TOS_URL} className="text-white/70 underline-offset-4 hover:underline">
              {TOS_URL_LABEL}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
