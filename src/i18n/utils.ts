import { defaultLocale, locales, ui, type Locale, type TranslationKey } from "./ui";

export { defaultLocale, locales, type Locale, type TranslationKey };

type InterpolationValues = Record<string, number | string>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function useTranslations(locale: Locale) {
  return (key: TranslationKey, variables?: InterpolationValues) => {
    let message = ui[locale]?.[key] ?? ui[defaultLocale][key] ?? key;

    if (variables) {
      for (const [name, value] of Object.entries(variables)) {
        message = message.replaceAll(`{${name}}`, String(value));
      }
    }

    return message;
  };
}

export function getIntlLocale(locale: Locale): string {
  return locale === "pt" ? "pt-BR" : "en-US";
}

function stripSurroundingSlashes(path: string): string {
  return path.replace(/^\/+|\/+$/g, "");
}

export function getPathWithoutLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) {
    return parts.slice(1).join("/");
  }
  return stripSurroundingSlashes(pathname);
}

export function toLocalizedPath(locale: Locale, path = ""): string {
  const normalized = stripSurroundingSlashes(path);
  return normalized ? `/${locale}/${normalized}` : `/${locale}`;
}

export function getSwitchLocalePath(pathname: string, locale: Locale): string {
  return toLocalizedPath(locale, getPathWithoutLocale(pathname));
}

export function getResumePath(locale: Locale): string {
  return locale === "pt"
    ? "/matheus-brackmann-cv-pt.pdf"
    : "/matheus-brackmann-cv-en.pdf";
}
