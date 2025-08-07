import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/hooks/use-i18n";
import { AccessibilityProvider } from "@/hooks/use-accessibility";
import { AppProvider } from "@/contexts/AppContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Rafael Vieira Gogge | Desenvolvedor Front-End & Fullstack Júnior",
  description:
    "Portfólio de Rafael Vieira Gogge. Soluções acessíveis e impactantes em Front-End e desenvolvimento web para o setor público e privado em Vitória, ES.",
  keywords: [
    "Rafael Vieira Gogge",
    "Desenvolvedor Front-End",
    "Desenvolvedor Fullstack",
    "JavaScript",
    "Python",
    "Django",
    "React",
    "Vitória ES",
    "SESA",
    "Desenvolvedor Web",
    "Portfolio",
  ],
  authors: [{ name: "Rafael Vieira Gogge" }],
  creator: "Rafael Vieira Gogge",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://rafaelgogge.dev",
    title: "Rafael Vieira Gogge | Desenvolvedor Front-End",
    description:
      "Portfólio de Rafael Vieira Gogge. Soluções acessíveis e impactantes em Front-End e desenvolvimento web.",
    siteName: "Rafael Vieira Gogge Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Vieira Gogge | Desenvolvedor Front-End",
    description:
      "Portfólio de Rafael Vieira Gogge. Soluções acessíveis e impactantes em Front-End e desenvolvimento web.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <AppProvider>
          <I18nProvider>
            <AccessibilityProvider>
              {children}
              <Toaster />
            </AccessibilityProvider>
          </I18nProvider>
        </AppProvider>
      </body>
    </html>
  );
}
