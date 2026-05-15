import { getIntlLocale, type Locale } from "@/i18n/utils";

export function formatDate(date: Date | string, locale: Locale) {
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDayMonth(date: Date | string, locale: Locale) {
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(date));
}

export function readingTime(markdown: string, locale: Locale) {
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return locale === "pt" ? `${minutes} min de leitura` : `${minutes} min read`;
}

export function dateRange(startDate: Date | string, locale: Locale, endDate?: Date | string): string {
  const formatter = new Intl.DateTimeFormat(getIntlLocale(locale), {
    month: "short",
    year: "numeric",
  });

  const start = formatter.format(new Date(startDate));
  const end = endDate === "Present" || !endDate
    ? locale === "pt" ? "Atual" : "Present"
    : formatter.format(new Date(endDate));

  return `${start} - ${end}`;
}
