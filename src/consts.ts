import cvData from "./data/cv-data.json";

export type Site = {
  NAME: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_WORKS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Social = {
  NAME: string;
  HREF: string;
};

export const SITE: Site = {
  NAME: cvData.PROFILE.NAME,
  EMAIL: cvData.PROFILE.EMAIL,
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 4,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Personal website of Matheus Brackmann, a Backend, Cloud, and DevOps developer.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Social[] = Array.from(Object.entries(cvData.PROFILE.SOCIALS)).map(([key, value]) => ({
  NAME: key.toLowerCase(),
  HREF: value,
}));

export const CV_DATA = cvData;
