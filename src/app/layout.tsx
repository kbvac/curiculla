import type { Metadata } from "next";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Curricula — Le cursus officiel, dans l'ordre",
    template: "%s · Curricula",
  },
  description: "Les catalogues officiels des universités transformés en parcours praticables : cours réels, prérequis officiels, emploi du temps hebdomadaire.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
