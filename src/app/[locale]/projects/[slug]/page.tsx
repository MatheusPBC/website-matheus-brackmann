import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TextLink } from "@/components/TextLink";
import { SITE } from "@/consts";
import { getProject, getProjects } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { isLocale, locales, toLocalizedPath, type Locale, useTranslations } from "@/i18n/utils";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjects().map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.data.title} | ${SITE.NAME}`,
    description: project.data.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = useTranslations(locale);
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <Container>
      <div className="mb-10 space-y-4">
        <TextLink href={toLocalizedPath(locale, "projects")}>{t("projects.backToProjects")}</TextLink>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">{project.data.title}</h1>
        <p>{project.data.description}</p>
        <div className="text-sm opacity-75">{formatDate(project.data.date, locale)}</div>
        <div className="flex gap-3 text-sm">
          {project.data.demoURL && <TextLink href={project.data.demoURL} external>{t("projects.demo")}</TextLink>}
          {project.data.repoURL && <TextLink href={project.data.repoURL} external>{t("projects.repo")}</TextLink>}
        </div>
      </div>
      <MarkdownContent content={project.content} />
    </Container>
  );
}
