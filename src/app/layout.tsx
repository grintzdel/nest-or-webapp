import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@nest-or-front/modules/app/react/context/providers";
import { Navbar } from "@nest-or-front/modules/shared/react/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chez Nest-Or - Pizzeria",
  description:
    "Pizzeria Chez Nest-Or - Commandez vos pizzas, boissons et desserts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10 pt-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
