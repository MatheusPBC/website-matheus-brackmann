import Link from "next/link";
import { type ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  active?: boolean;
  download?: boolean;
  ariaLabel?: string;
  className?: string;
};

export function TextLink({ href, children, external = false, active = false, download = false, ariaLabel, className = "" }: TextLinkProps) {
  const classes = [
    "underline underline-offset-2 transition-colors duration-100 ease-in-out",
    active
      ? "text-black decoration-black/40 dark:text-white dark:decoration-white/60"
      : "text-current decoration-black/15 hover:text-black hover:decoration-black/25 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50",
    className,
  ].join(" ");

  if (external) {
    return <a href={href} className={classes} target="_blank" rel="noreferrer" aria-label={ariaLabel}>{children}</a>;
  }

  return <Link href={href} className={classes} download={download} aria-label={ariaLabel}>{children}</Link>;
}
