import { type Metadata } from "next";
import { Container } from "@/components/Container";
import { ArrowCard } from "@/components/ArrowCard";
import { TextLink } from "@/components/TextLink";
import { SITE, SOCIALS } from "@/consts";
import { getBlogPosts, getProjects, getSkills, getWork } from "@/lib/content";
import { dateRange } from "@/lib/utils";
import { isLocale, toLocalizedPath, type Locale, useTranslations } from "@/i18n/utils";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = useTranslations(safeLocale);

  return {
    title: `${t("home.meta.title")} | ${SITE.NAME}`,
    description: t("home.meta.description"),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const t = useTranslations(locale);
  const blog = getBlogPosts(locale).slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);
  const projects = getProjects().slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);
  const work = getWork(locale).slice(0, SITE.NUM_WORKS_ON_HOMEPAGE);
  const skills = getSkills();

  return (
    <Container>
      <h1 className="font-semibold text-black dark:text-white">{t("home.greeting")}</h1>

      <div className="mt-6 space-y-12">
        <section>
          <article className="space-y-4">
            <p>{t("home.intro.1")}</p>
            <p>{t("home.intro.2")}</p>
            <p>{t("home.intro.3")}</p>
          </article>
        </section>

        <section>
          <ul className="flex flex-wrap gap-2">
            {SOCIALS.map((social) => (
              <li key={social.HREF} className="flex gap-x-2 text-nowrap">
                <TextLink href={social.HREF} external ariaLabel={`${SITE.NAME} on ${social.NAME}`}>{social.NAME}</TextLink>
                <span>/</span>
              </li>
            ))}
            <li className="line-clamp-1">
              <TextLink href={`mailto:${SITE.EMAIL}`} ariaLabel={`Email ${SITE.NAME}`}>{SITE.EMAIL}</TextLink>
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <h2 className="font-semibold text-black dark:text-white">{t("home.latestPosts")}</h2>
            <TextLink href={toLocalizedPath(locale, "blog")}>{t("home.seeAllPosts")}</TextLink>
          </div>
          <ul className="flex flex-col gap-4">
            {blog.map((post) => (
              <li key={post.slug}>
                <ArrowCard title={post.data.title} description={post.data.description} href={toLocalizedPath(locale, `blog/${post.slug}`)} />
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <h2 className="font-semibold text-black dark:text-white">{t("home.workExperience")}</h2>
            <TextLink href={toLocalizedPath(locale, "work")}>{t("home.seeAllWork")}</TextLink>
          </div>
          <ul className="flex flex-col space-y-4">
            {work.map((entry) => (
              <li key={entry.slug} className="border-b border-black/10 py-4 last:border-0 dark:border-white/10">
                <div className="text-sm opacity-75">{dateRange(entry.data.dateStart, locale, entry.data.dateEnd)}</div>
                <div className="font-semibold text-black dark:text-white">{entry.data.company}</div>
                <div className="text-sm opacity-75">{entry.data.role} · {entry.data.location}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {entry.data.highlights.slice(0, 2).map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <h2 className="font-semibold text-black dark:text-white">{t("home.recentProjects")}</h2>
            <TextLink href={toLocalizedPath(locale, "projects")}>{t("home.seeAllProjects")}</TextLink>
          </div>
          <ul className="flex flex-col gap-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <ArrowCard title={project.data.title} description={project.data.description} href={toLocalizedPath(locale, `projects/${project.slug}`)} />
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-black dark:text-white">Skills</h2>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.slug}>
                <h3 className="text-sm font-semibold text-black dark:text-white">{skill.data.category}</h3>
                <p className="mt-1 text-sm">{skill.data.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
