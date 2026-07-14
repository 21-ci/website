import { en, type Dict } from "./en";
import { ru } from "./ru";
import { uz } from "./uz";
import { de } from "./de";

export type LanguageCode = "en" | "ru" | "uz" | "de";
export type { Dict };

export const DICTS: Record<LanguageCode, Dict> = { en, ru, uz, de };

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O'zbekcha" },
  { code: "de", label: "Deutsch" },
];

/** Replace {name} placeholders in a template with provided values. */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
