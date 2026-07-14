/** Non-translatable contact data. Display names come from the i18n dict. */
export interface RegionContact {
  id: "uz" | "kz" | "de";
  accent: "green" | "blue";
  email: string;
  phone?: string;
  telegram?: string;
  whatsapp?: string;
}

export const contacts: RegionContact[] = [
  {
    id: "uz",
    accent: "green",
    email: "info@21cloud.uz",
    phone: "+998 99 988 6523",
    telegram: "@goserverless",
  },
  {
    id: "kz",
    accent: "green",
    email: "info@env.kz",
    phone: "+7 775 071 41 09",
    telegram: "@goserverless",
    whatsapp: "https://wa.me/77750714109",
  },
  {
    id: "de",
    accent: "green",
    email: "info@21cloud.uz",
    telegram: "@goserverless",
    whatsapp: "https://wa.me/77750714109",
  },
];

export const TOS_URL = "https://21cloud.uz/legal/tos";
export const TOS_URL_LABEL = "21cloud.uz/legal/tos";

/** Founder name is language-neutral; role/bio come from the i18n dict. */
export const FOUNDER_NAME = "Alex Sayfi";
