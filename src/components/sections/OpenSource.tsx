import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { useLocale } from "../../context/LocaleContext";
import { GITHUB_URL } from "../../content/links";
import { WorkerCLI } from "../ui/WorkerCLI";
import logoInfra from "../../assets/logos/logo-infra.svg";

export function OpenSource() {
  const { dict } = useLocale();
  const os = dict.openSource;

  return (
    <section id="open-source" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <img src={logoInfra} alt="" aria-hidden className="mb-6 h-14 w-auto opacity-70" />
          <SectionHeading>{os.title}</SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{os.body}</p>
          <ButtonLink
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            variant="dark"
            size="lg"
            className="mt-8"
          >
            <svg viewBox="0 0 16 16" className="size-5" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            {os.cta}
          </ButtonLink>
        </div>

        <WorkerCLI />
      </Container>
    </section>
  );
}
