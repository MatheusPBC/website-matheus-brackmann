import { type Metadata } from "next";
import { Container } from "@/components/Container";
import { ArrowCard } from "@/components/ArrowCard";
import { TextLink } from "@/components/TextLink";
import { SITE, SOCIALS } from "@/consts";
import { getBlogPosts, getProjects, getSkills, getWork } from "@/lib/content";
import { dateRange } from "@/lib/utils";
import { getResumePath, isLocale, toLocalizedPath, type Locale, useTranslations } from "@/i18n/utils";

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
  const signalCards = [
    { value: "AWS", label: t("home.signal.aws") },
    { value: "IoT", label: t("home.signal.iot") },
    { value: "GraphQL", label: t("home.signal.graphql") },
    { value: "AI", label: t("home.signal.ai") },
  ];
  const systemFlow = ["Devices", "AppSync", "Lambda", "DynamoDB", "Ops/AI"];
  const focusAreas = [
    t("home.focus.serverless"),
    t("home.focus.telemetry"),
    t("home.focus.automation"),
    t("home.focus.ai"),
  ];

  return (
    <Container className="max-w-6xl">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/70 p-5 shadow-2xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/40 sm:p-8 lg:p-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.20),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.04),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_45%)]" />

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.8)]" />
              {t("home.status")}
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45 dark:text-white/45">{t("home.eyebrow")}</p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
                {t("home.greeting")}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300 sm:text-xl">
                {t("home.hero")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <TextLink href={getResumePath(locale)} download className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-emerald-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-emerald-200">
                {t("home.cta.resume")}
              </TextLink>
              <TextLink href={toLocalizedPath(locale, "projects")} className="rounded-full border border-black/10 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-950 no-underline transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-emerald-400/40 dark:hover:text-emerald-200">
                {t("home.cta.projects")}
              </TextLink>
              <TextLink href={`mailto:${SITE.EMAIL}`} ariaLabel={`Email ${SITE.NAME}`} className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-zinc-700 no-underline transition-colors hover:text-zinc-950 dark:border-white/10 dark:text-zinc-300 dark:hover:text-white">
                {t("home.cta.contact")}
              </TextLink>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-zinc-950/10 bg-zinc-950 p-4 text-white shadow-2xl shadow-zinc-950/20 dark:border-white/10 dark:bg-black/70">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 text-xs text-white/50">
              <span>production-systems.map</span>
              <span>live</span>
            </div>
            <div className="space-y-3">
              {systemFlow.map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 font-mono text-xs text-emerald-200">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/60 to-cyan-400/10" />
                  <div className="w-28 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {signalCards.map((card) => (
            <div key={card.value} className="rounded-2xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">{card.value}</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{card.label}</p>
            </div>
          ))}
        </section>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="space-y-5 rounded-[1.75rem] border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">{t("home.operatingMode")}</h2>
          <article className="space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
            <p>{t("home.intro.1")}</p>
            <p>{t("home.intro.2")}</p>
            <p>{t("home.intro.3")}</p>
          </article>
          <ul className="flex flex-wrap gap-2 pt-2">
            {focusAreas.map((area) => (
              <li key={area} className="rounded-full border border-black/10 bg-zinc-950/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                {area}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5 rounded-[1.75rem] border border-black/10 bg-zinc-950 p-6 text-white dark:border-white/10 dark:bg-black/60">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">{t("home.workExperience")}</h2>
            <TextLink href={toLocalizedPath(locale, "work")} className="text-white/75 hover:text-white">{t("home.seeAllWork")}</TextLink>
          </div>
          <ul className="space-y-4">
            {work.map((entry) => (
              <li key={entry.slug} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-emerald-200/70">{dateRange(entry.data.dateStart, locale, entry.data.dateEnd)}</div>
                <div className="mt-2 font-semibold text-white">{entry.data.company}</div>
                <div className="text-sm text-white/55">{entry.data.role} · {entry.data.location}</div>
                <p className="mt-3 text-sm leading-6 text-white/75">{entry.data.highlights[0]}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <h2 className="font-semibold text-black dark:text-white">{t("home.recentProjects")}</h2>
            <TextLink href={toLocalizedPath(locale, "projects")}>{t("home.seeAllProjects")}</TextLink>
          </div>
          <ul className="grid gap-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <ArrowCard title={project.data.title} description={project.data.description} href={toLocalizedPath(locale, `projects/${project.slug}`)} />
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <h2 className="font-semibold text-black dark:text-white">{t("home.latestPosts")}</h2>
            <TextLink href={toLocalizedPath(locale, "blog")}>{t("home.seeAllPosts")}</TextLink>
          </div>
          <ul className="grid gap-4">
            {blog.map((post) => (
              <li key={post.slug}>
                <ArrowCard title={post.data.title} description={post.data.description} href={toLocalizedPath(locale, `blog/${post.slug}`)} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-12 space-y-5 rounded-[1.75rem] border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
        <h2 className="font-semibold text-black dark:text-white">Skills</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.slug}>
              <h3 className="text-sm font-semibold text-black dark:text-white">{skill.data.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skill.data.items.map((item) => (
                  <span key={item} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
          {SOCIALS.map((social) => (
            <li key={social.HREF}>
              <TextLink href={social.HREF} external ariaLabel={`${SITE.NAME} on ${social.NAME}`}>{social.NAME}</TextLink>
            </li>
          ))}
          <li>
            <TextLink href={`mailto:${SITE.EMAIL}`} ariaLabel={`Email ${SITE.NAME}`}>{SITE.EMAIL}</TextLink>
          </li>
        </ul>
      </section>
    </Container>
  );
}
