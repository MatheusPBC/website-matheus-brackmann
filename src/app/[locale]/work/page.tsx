import { type Metadata } from "next";
import { Container } from "@/components/Container";
import { SITE } from "@/consts";
import { getWork } from "@/lib/content";
import { dateRange } from "@/lib/utils";
import { isLocale, type Locale, useTranslations } from "@/i18n/utils";

type WorkPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = useTranslations(safeLocale);

  return {
    title: `${t("work.meta.title")} | ${SITE.NAME}`,
    description: t("work.meta.description"),
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const t = useTranslations(locale);
  const work = getWork(locale);

  return (
    <Container>
      <div className="space-y-10">
        <h1 className="font-semibold text-black dark:text-white">{t("work.heading")}</h1>
        <ul className="flex flex-col">
          {work.map((entry) => (
            <li key={entry.slug} className="border-b border-black/10 py-4 last:border-0 dark:border-white/10">
              <div className="text-sm opacity-75">{dateRange(entry.data.dateStart, locale, entry.data.dateEnd)}</div>
              <div className="font-semibold text-black dark:text-white">{entry.data.company}</div>
              <div className="text-sm opacity-75">{entry.data.role} · {entry.data.location}</div>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {entry.data.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
              {entry.data.tools && <p className="mt-3 text-sm opacity-75">{entry.data.tools.join(" · ")}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
