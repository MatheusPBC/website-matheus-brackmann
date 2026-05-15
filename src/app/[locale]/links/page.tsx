import { type Metadata } from "next";
import { LinksPage } from "@/components/LinksPage";
import { SITE } from "@/consts";
import { isLocale, type Locale, useTranslations } from "@/i18n/utils";
import { socialLinksPage } from "@/lib/links-data";

type LocaleLinksPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleLinksPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = useTranslations(safeLocale);

  return {
    title: `${t("links.meta.title")} | ${SITE.NAME}`,
    description: t("links.meta.description", { name: SITE.NAME }),
  };
}

export default async function LocaleLinksPage({ params }: LocaleLinksPageProps) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;

  return <LinksPage locale={locale} data={socialLinksPage} />;
}
