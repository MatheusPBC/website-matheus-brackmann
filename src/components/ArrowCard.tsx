import Link from "next/link";

type ArrowCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ArrowCard({ title, description, href }: ArrowCardProps) {
  return (
    <Link href={href} className="group block rounded-lg border border-black/10 p-4 no-underline transition-colors hover:border-black/25 dark:border-white/10 dark:hover:border-white/25">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-black dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-black/55 dark:text-white/65">{description}</p>
        </div>
        <span className="text-black/35 transition-transform group-hover:translate-x-1 dark:text-white/35">-&gt;</span>
      </div>
    </Link>
  );
}
