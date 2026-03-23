import type { Metadata } from "next";
import { Inter, Geist_Mono, Oxanium, Lexend_Peta } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { FloatingNav } from "@/components/FloatingNav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorOrb } from "@/components/CursorOrb";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const oxanium = Oxanium({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const lexendPeta = Lexend_Peta({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const calSans = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-calsans",
  display: "swap",
  weight: "600",
});

export const metadata: Metadata = {
  title: "VRATVAR — AI-Powered Agency",
  description:
    "VRATVAR builds intelligent B2B portals and AI Agents that scale your business. Powered by ZettelFlow.",
  keywords: ["AI Agents", "B2B Portal", "ZettelFlow", "SaaS", "Agency"],
  authors: [{ name: "VRATVAR" }],
  openGraph: {
    title: "VRATVAR — AI-Powered Agency",
    description:
      "Intelligent B2B portals and AI Agents that scale your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${geistMono.variable} ${oxanium.variable} ${calSans.variable} ${lexendPeta.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <ScrollToTop />
          <SmoothScroll>
            <CursorOrb />
            <FloatingNav />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
