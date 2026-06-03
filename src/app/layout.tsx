import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsStrip from "@/components/NewsStrip";
import FloatingMobileCTA from "@/components/FloatingMobileCTA";
import { ToastProvider } from "@/components/Toast";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";
import SkipToContent from "@/components/SkipToContent";
import OrgJsonLd from "@/components/OrgJsonLd";
import RecentTracker from "@/components/RecentTracker";

// Non-critical client-only widgets — lazy-load so they don't bloat the
// initial JS payload of every page. They render after the rest of the
// page is interactive.
const ChatBot = dynamic(() => import("@/components/ChatBot"));
const AccessibilityMenu = dynamic(() => import("@/components/AccessibilityMenu"));
const CookieConsent = dynamic(() => import("@/components/CookieConsent"));
const OpenHouseModal = dynamic(() => import("@/components/OpenHouseModal"));
const PwaInstall = dynamic(() => import("@/components/PwaInstall"));
const SwRegister = dynamic(() => import("@/components/SwRegister"));
const SearchDialog = dynamic(() => import("@/components/SearchDialog"));

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.name} | Singapore`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "international school singapore",
    "Sri Sathya Sai Global School",
    "values-based education",
    "holistic education singapore",
    "primary school singapore",
    "character development school",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} | Singapore`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Singapore`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", sizes: "any", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1d33" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <OrgJsonLd />
        <SkipToContent />
        <ToastProvider>
          <NewsStrip />
          <Header />
          <main id="main" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <FloatingMobileCTA />
          <ChatBot />
          <AccessibilityMenu />
          <CookieConsent />
          <OpenHouseModal />
          <PwaInstall />
          <SwRegister />
          <SearchDialog />
          <RecentTracker />
        </ToastProvider>
      </body>
    </html>
  );
}
