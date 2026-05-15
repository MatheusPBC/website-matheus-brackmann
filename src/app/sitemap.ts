import { type MetadataRoute } from "next";
import { locales, toLocalizedPath } from "@/i18n/utils";
import { getBlogPosts, getProjects } from "@/lib/content";

const siteUrl = "https://matheus-brackmann.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = locales.flatMap((locale) => [
    toLocalizedPath(locale),
    toLocalizedPath(locale, "blog"),
    toLocalizedPath(locale, "work"),
    toLocalizedPath(locale, "projects"),
    toLocalizedPath(locale, "links"),
  ]);

  const blogRoutes = locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => toLocalizedPath(locale, `blog/${post.slug}`)),
  );

  const projectRoutes = locales.flatMap((locale) =>
    getProjects().map((project) => toLocalizedPath(locale, `projects/${project.slug}`)),
  );

  return [...staticRoutes, ...blogRoutes, ...projectRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
