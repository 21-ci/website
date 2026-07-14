interface ContactBlockProps {
  name: string;
  accent: "blue" | "green";
  email: string;
  phone?: string;
  telegram?: string;
  whatsapp?: string;
  labels: { email: string; phone: string; telegram: string; whatsapp: string };
}

const accentText = {
  blue: "text-brand-blue",
  green: "text-brand-green",
};

function IconMail() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="12" height="9" rx="1.5" />
      <path d="M2 5.5l6 4 6-4" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 2.5a1 1 0 011-1h1.5a1 1 0 011 .85l.5 3a1 1 0 01-.28.9l-.9.9a8 8 0 003.03 3.03l.9-.9a1 1 0 01.9-.28l3 .5a1 1 0 01.85 1V12a1 1 0 01-1 1C5.5 13 3 7.5 3 3.5v-1z" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 8l11-5-4 11-2.5-4.5L2 8z" />
      <path d="M6.5 9.5L10 6" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M8 1a7 7 0 0 0-6.08 10.46L1 15l3.64-.9A7 7 0 1 0 8 1Zm0 12.6a5.6 5.6 0 0 1-2.86-.78l-.2-.12-2.16.54.57-2.1-.14-.22A5.6 5.6 0 1 1 8 13.6ZM11.2 9.4c-.18-.09-1.05-.52-1.21-.58-.16-.06-.28-.09-.4.09-.12.18-.46.58-.56.7-.1.12-.21.13-.39.04-.18-.09-.76-.28-1.45-.89-.54-.48-.9-1.07-1-1.25-.11-.18-.01-.28.08-.37.09-.08.18-.22.27-.33.09-.11.12-.18.18-.3.06-.12.03-.23-.01-.32-.05-.09-.4-.96-.55-1.32-.14-.34-.29-.3-.4-.3-.1 0-.22-.01-.34-.01-.12 0-.31.04-.47.23-.16.18-.62.6-.62 1.47s.63 1.7.72 1.82c.09.12 1.25 1.9 3.02 2.67.42.18.75.29 1.01.37.42.13.81.11 1.11.07.34-.05 1.05-.43 1.2-.84.15-.42.15-.77.1-.84-.04-.08-.16-.12-.34-.21Z"/>
    </svg>
  );
}

export function ContactBlock({ name, accent, email, phone, telegram, whatsapp, labels }: ContactBlockProps) {
  return (
    <div>
      <h4 className={`mb-3 text-sm font-semibold uppercase tracking-wider ${accentText[accent]}`}>
        {name}
      </h4>
      <dl className="space-y-2 text-sm sm:text-base text-white/85">
        <div className="flex items-center gap-2">
          <IconMail />
          <dt className="text-white/55 shrink-0">{labels.email}</dt>
          <dd>
            <a className="underline-offset-4 hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </dd>
        </div>
        {phone && (
          <div className="flex items-center gap-2">
            <IconPhone />
            <dt className="text-white/55 shrink-0">{labels.phone}</dt>
            <dd>
              <a className="underline-offset-4 hover:underline" href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </dd>
          </div>
        )}
        {telegram && (
          <div className="flex items-center gap-2">
            <IconTelegram />
            <dt className="text-white/55 shrink-0">{labels.telegram}</dt>
            <dd>
              <a
                className="underline-offset-4 hover:underline"
                href={`https://t.me/${telegram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {telegram}
              </a>
            </dd>
          </div>
        )}
        {whatsapp && (
          <div className="flex items-center gap-2">
            <IconWhatsApp />
            <dt className="text-white/55 shrink-0">{labels.whatsapp}</dt>
            <dd>
              <a
                className="underline-offset-4 hover:underline"
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                +7 775 071 41 09
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
