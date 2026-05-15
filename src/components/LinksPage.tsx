import { SITE } from "@/consts";
import { type Locale, useTranslations } from "@/i18n/utils";
import { type LinksPageData } from "@/lib/links-data";
import { Container } from "./Container";
import { TextLink } from "./TextLink";

type LinksPageProps = {
  locale: Locale;
  data: LinksPageData;
};

export function LinksPage({ locale, data }: LinksPageProps) {
  const t = useTranslations(locale);
  const initials = SITE.NAME.split(" ").slice(0, 2).map((part) => part[0]).join("");

  return (
    <Container className="max-w-xl">
      <div className="space-y-8 text-center">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full border border-black/10 text-2xl font-semibold text-black dark:border-white/10 dark:text-white">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">{SITE.NAME}</h1>
          <p className="mt-2 text-sm">{t("links.role")}</p>
          <p className="mt-2 text-sm opacity-75">{t("links.bio")}</p>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <LinkSection title="Social" links={data.socialLinks} />
        <LinkSection title={t("links.projects")} links={data.projectLinks} />
        <LinkSection title="CV" links={data.otherLinks} />
      </div>
    </Container>
  );
}

function LinkSection({ title, links }: { title: string; links: LinksPageData["projectLinks"] }) {
  if (links.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">{title}</h2>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.href} className="rounded-lg border border-black/10 p-4 text-left dark:border-white/10">
            <TextLink href={item.href} external={item.external}>{item.label}</TextLink>
            {item.description && <p className="mt-1 text-sm opacity-75">{item.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
