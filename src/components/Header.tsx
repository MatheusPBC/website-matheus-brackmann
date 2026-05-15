"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/consts";
import { getPathWithoutLocale, getResumePath, getSwitchLocalePath, toLocalizedPath, type Locale, useTranslations } from "@/i18n/utils";
import { Container } from "./Container";
import { TextLink } from "./TextLink";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname() ?? "/";
  const t = useTranslations(locale);
  const pathnameWithoutLocale = getPathWithoutLocale(pathname);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const isActive = (href: string) =>
    href === "" ? pathnameWithoutLocale === "" : pathnameWithoutLocale === href || pathnameWithoutLocale.startsWith(`${href}/`);

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    setIsDark(nextDark);
  }

  return (
    <header>
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href={toLocalizedPath(locale)} className="font-semibold text-black no-underline dark:text-white">
            {SITE.NAME}
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:flex-nowrap md:justify-end">
            <nav className="order-3 flex w-full flex-wrap items-center gap-1 text-sm sm:text-base md:order-1 md:w-auto">
              <TextLink href={toLocalizedPath(locale, "blog")} active={isActive("blog")}>{t("nav.blog")}</TextLink>
              <span>/</span>
              <TextLink href={toLocalizedPath(locale, "work")} active={isActive("work")}>{t("nav.work")}</TextLink>
              <span>/</span>
              <TextLink href={toLocalizedPath(locale, "projects")} active={isActive("projects")}>{t("nav.projects")}</TextLink>
              <span>/</span>
              <TextLink href={getResumePath(locale)} download>{t("nav.resume")}</TextLink>
            </nav>

            <nav className="order-1 flex items-center gap-1 text-sm sm:text-base md:order-2" aria-label={t("nav.language")}>
              <TextLink href={getSwitchLocalePath(pathname, "en")} active={locale === "en"} className="no-underline">{t("lang.en")}</TextLink>
              <span>/</span>
              <TextLink href={getSwitchLocalePath(pathname, "pt")} active={locale === "pt"} className="no-underline">{t("lang.pt")}</TextLink>
            </nav>

            <div className="order-2 ml-auto flex items-center md:order-3 md:ml-0">
              <button
                type="button"
                aria-label={t("nav.themeToggle")}
                aria-pressed={isDark}
                onClick={toggleTheme}
                className="group flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300 ease-in-out group-hover:stroke-black dark:group-hover:stroke-white">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
