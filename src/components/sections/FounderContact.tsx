import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ContactBlock } from "../ui/ContactBlock";
import { ButtonLink } from "../ui/Button";
import { LanyardSafe } from "../effects/LanyardSafe";
import { useLocale } from "../../context/LocaleContext";
import { contacts, FOUNDER_NAME } from "../../content/contacts";
import { BOOK_CALL_URL } from "../../content/links";

export function FounderContact() {
  const { dict } = useLocale();
  const f = dict.founder;
  const telegram = contacts.find((c) => c.telegram)?.telegram ?? "@goserverless";

  return (
    <section id="contacts" className="scroll-mt-24 overflow-visible pb-20 sm:pb-28">
      <Container>
        {/* The "bar" the lanyard hangs from - flush with the top of the canvas */}
        <div className="h-px bg-white/12" />

        <div className="grid grid-cols-1 items-start gap-x-8 lg:grid-cols-5">
          {/* Lanyard - canvas starts at the separator line, rope hangs down from it */}
          <div className="order-1 lg:order-none lg:col-span-2">
            <div className="relative h-[520px] sm:h-[600px] lg:h-[700px]">
              <LanyardSafe name={FOUNDER_NAME} role={f.role} bio={f.bio} />
            </div>
          </div>

          {/* Heading + CTA + contacts */}
          <div className="order-2 pt-10 lg:order-none lg:col-span-3 lg:pt-12">
            <SectionHeading>{f.title}</SectionHeading>
            <p className="mt-4 max-w-xl text-lg text-white/85">{f.subtitle}</p>

            {/* CTA card - above contacts */}
            <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-white/12 bg-black/25 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h4 className="text-xl font-semibold text-white">{f.cta.title}</h4>
                <p className="mt-1 max-w-md text-sm text-white/60">{f.cta.body}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ButtonLink href={BOOK_CALL_URL} target="_blank" rel="noreferrer" variant="primary">
                  {f.cta.book}
                </ButtonLink>
                <ButtonLink
                  href={`https://t.me/${telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                >
                  {f.cta.telegram}
                </ButtonLink>
              </div>
            </div>

            {/* Contacts grid - below CTA */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
              {contacts.map((c) => (
                <ContactBlock
                  key={c.id}
                  name={f.regions[c.id]}
                  accent={c.accent}
                  email={c.email}
                  phone={c.phone}
                  telegram={c.telegram}
                  whatsapp={c.whatsapp}
                  labels={f.labels}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
