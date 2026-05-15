import { type Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SITE } from "@/consts";
import { getBlogPosts } from "@/lib/content";
import { formatDayMonth } from "@/lib/utils";
import { isLocale, toLocalizedPath, type Locale, useTranslations } from "@/i18n/utils";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = useTranslations(safeLocale);

  return {
    title: `${t("blog.meta.title")} | ${SITE.NAME}`,
    description: t("blog.meta.description"),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  const t = useTranslations(locale);
  const posts = getBlogPosts(locale);
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.data.date).getFullYear().toString();
    acc[year] = acc[year] ?? [];
    acc[year].push(post);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <Container>
      <section>
        <div className="flex items-center justify-between gap-4 pb-10">
          <h1 className="font-semibold tracking-tight text-black dark:text-white">{t("blog.heading")}</h1>
        </div>
        <div className="border-y border-black/15 dark:border-white/15">
          {years.map((year) => (
            <section key={year} className="border-t border-black/15 first:border-t-0 dark:border-white/15">
              <ul>
                {grouped[year].map((post, index) => (
                  <li key={post.slug} className="grid grid-cols-1 gap-2.5 border-b border-black/15 py-4 md:grid-cols-[6rem_1fr_auto] md:items-center md:gap-6 dark:border-white/15">
                    <div className="font-medium leading-none text-black/65 dark:text-white/65">{index === 0 ? year : ""}</div>
                    <Link href={toLocalizedPath(locale, `blog/${post.slug}`)} className="font-medium leading-tight text-black transition-colors hover:text-black/70 dark:text-white dark:hover:text-white/70">
                      {post.data.title}
                    </Link>
                    <time dateTime={new Date(post.data.date).toISOString()} className="font-medium leading-none text-black/65 md:text-right dark:text-white/65">
                      {formatDayMonth(post.data.date, locale)}
                    </time>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </Container>
  );
}
