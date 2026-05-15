import { type Metadata } from "next";
import { ArrowCard } from "@/components/ArrowCard";
import { Container } from "@/components/Container";
import { SITE } from "@/consts";
import { getProjects } from "@/lib/content";
import { isLocale, toLocalizedPath, type Locale, useTranslations } from "@/i18n/utils";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = useTranslations(safeLocale);

  return {
    title: `${t("projects.meta.title")} | ${SITE.NAME}`,
    description: t("projects.meta.description"),
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const t = useTranslations(locale);
  const projects = getProjects();

  return (
    <Container>
      <div className="space-y-10">
        <h1 className="font-semibold text-black dark:text-white">{t("projects.heading")}</h1>
        <ul className="flex flex-col gap-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <ArrowCard title={project.data.title} description={project.data.description} href={toLocalizedPath(locale, `projects/${project.slug}`)} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
