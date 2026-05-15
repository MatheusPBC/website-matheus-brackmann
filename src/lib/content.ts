import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type Locale } from "@/i18n/utils";

const contentRoot = path.join(process.cwd(), "src", "content");

export type MarkdownEntry<TData extends Record<string, unknown>> = {
  slug: string;
  data: TData;
  content: string;
};

export type BlogData = {
  title: string;
  description: string;
  date: string;
  draft?: boolean;
};

export type ProjectData = BlogData & {
  demoURL?: string;
  repoURL?: string;
};

export type WorkData = {
  company: string;
  role: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  type?: string;
  highlights: string[];
  tools?: string[];
};

export type SkillsData = {
  category: string;
  items: string[];
};

export type EducationData = {
  institution: string;
  degree: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  highlights?: string[];
};

export type LeadershipData = {
  organization: string;
  role: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  highlights: string[];
};

function readMarkdown<TData extends Record<string, unknown>>(filePath: string, slug: string): MarkdownEntry<TData> {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);

  return {
    slug,
    data: parsed.data as TData,
    content: parsed.content.trim(),
  };
}

function readIndexEntry<TData extends Record<string, unknown>>(basePath: string, slug: string) {
  return readMarkdown<TData>(path.join(basePath, slug, "index.md"), slug);
}

function listDirectories(directory: string) {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function listIndexDirectories(directory: string) {
  return listDirectories(directory).filter((name) => fs.existsSync(path.join(directory, name, "index.md")));
}

function listMarkdownFiles(directory: string) {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
}

function sortByDateDesc<TData extends { date?: string; dateStart?: string }>(entries: MarkdownEntry<TData>[]) {
  return entries.sort((a, b) => {
    const bDate = b.data.date ?? b.data.dateStart ?? "";
    const aDate = a.data.date ?? a.data.dateStart ?? "";
    return new Date(bDate).valueOf() - new Date(aDate).valueOf();
  });
}

export function getBlogPosts(locale: Locale) {
  const basePath = path.join(contentRoot, "blog", locale);
  return sortByDateDesc(
    listIndexDirectories(basePath)
      .map((slug) => readIndexEntry<BlogData>(basePath, slug))
      .filter((entry) => !entry.data.draft),
  );
}

export function getBlogPost(locale: Locale, slug: string) {
  return getBlogPosts(locale).find((entry) => entry.slug === slug);
}

export function getProjects() {
  const basePath = path.join(contentRoot, "projects");
  return sortByDateDesc(
    listIndexDirectories(basePath)
      .map((slug) => readIndexEntry<ProjectData>(basePath, slug))
      .filter((entry) => !entry.data.draft),
  );
}

export function getProject(slug: string) {
  return getProjects().find((entry) => entry.slug === slug);
}

export function getWork(locale: Locale) {
  const basePath = path.join(contentRoot, "work", locale);
  return sortByDateDesc(
    listMarkdownFiles(basePath).map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return readMarkdown<WorkData>(path.join(basePath, fileName), slug);
    }),
  );
}

export function getSkills() {
  const basePath = path.join(contentRoot, "skills");
  return listMarkdownFiles(basePath).map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return readMarkdown<SkillsData>(path.join(basePath, fileName), slug);
  });
}

export function getEducation() {
  const basePath = path.join(contentRoot, "education");
  return sortByDateDesc(
    listMarkdownFiles(basePath).map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return readMarkdown<EducationData>(path.join(basePath, fileName), slug);
    }),
  );
}

export function getLeadership() {
  const basePath = path.join(contentRoot, "leadership");
  return sortByDateDesc(
    listMarkdownFiles(basePath).map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return readMarkdown<LeadershipData>(path.join(basePath, fileName), slug);
    }),
  );
}
