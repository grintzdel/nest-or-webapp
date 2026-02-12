"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/pizzas", label: "Pizzas", emoji: "\uD83C\uDF55" },
  { href: "/drinks", label: "Boissons", emoji: "\uD83C\uDF7A" },
  { href: "/desserts", label: "Desserts", emoji: "\uD83C\uDF70" },
  { href: "/orders", label: "Commandes", emoji: "\uD83D\uDCCB" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[var(--border)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          href="/pizzas"
          className="text-xl font-extrabold text-[var(--foreground)]"
        >
          {"\uD83C\uDF55"} Chez Nest-Or
        </Link>
        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              }`}
            >
              <span className="mr-1.5">{link.emoji}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
