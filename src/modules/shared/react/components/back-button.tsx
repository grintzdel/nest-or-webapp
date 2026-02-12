import Link from "next/link";

type BackButtonProps = {
  href: string;
  label: string;
};

export const BackButton: React.FC<BackButtonProps> = ({ href, label }) => (
  <Link
    href={href}
    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] group"
  >
    <svg
      className="h-4 w-4 transition-transform group-hover:-translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
    {label}
  </Link>
);
