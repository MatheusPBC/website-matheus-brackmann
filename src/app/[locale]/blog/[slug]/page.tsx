import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TextLink } from "@/components/TextLink";
import { SITE } from "@/consts";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { formatDate, readingTime } from "@/lib/utils";
import { isLocale, locales, toLocalizedPath, type Locale, useTranslations } from "@/i18n/utils";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => getBlogPosts(locale).map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getBlogPost(locale, slug);
  if (!post) return {};

  return {
    title: `${post.data.title} | ${SITE.NAME}`,
    description: post.data.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = useTranslations(locale);
  const post = getBlogPost(locale, slug);

  if (!post) notFound();

  return (
    <Container>
      <div className="mb-10 space-y-4">
        <TextLink href={toLocalizedPath(locale, "blog")}>{t("blog.backToBlog")}</TextLink>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">{post.data.title}</h1>
        <p>{post.data.description}</p>
        <div className="text-sm opacity-75">{formatDate(post.data.date, locale)} · {readingTime(post.content, locale)}</div>
      </div>
      <MarkdownContent content={post.content} />
    </Container>
  );
}
