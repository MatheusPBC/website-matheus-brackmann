import Link from "next/link";

type ArrowCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ArrowCard({ title, description, href }: ArrowCardProps) {
  return (
    <Link href={href} className="group block rounded-2xl border border-black/10 bg-white/65 p-4 no-underline shadow-sm shadow-black/5 transition-colors hover:border-emerald-500/35 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:shadow-black/20 dark:hover:border-emerald-400/35 dark:hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-black dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-black/55 dark:text-white/65">{description}</p>
        </div>
        <span className="rounded-full border border-black/10 px-2 py-1 text-xs text-black/35 transition-transform group-hover:translate-x-1 dark:border-white/10 dark:text-white/35">-&gt;</span>
      </div>
    </Link>
  );
}
