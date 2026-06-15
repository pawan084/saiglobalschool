import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { connection } from "next/server";
import { headers } from "next/headers";
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
import DeferredClient from "@/components/DeferredClient";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";

// Non-critical client-only widgets — gated behind <DeferredClient> so their
// JS chunks don't even fetch until the browser is idle OR the user interacts
// (whichever comes first). The ⌘K search dialog also wakes on its
// "sssgs:open-search" event so the header search button never misses.
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
  alternates: {
    canonical: "/",
    // Makes the RSS feed auto-discoverable by browsers and feed readers.
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} | Singapore`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Singapore`,
    description: site.description,
    images: ["/opengraph-image"],
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
    // Browser tab favicon — 32×32 PNG is ~2KB and renders crisply on every
    // modern browser. The 16×16 fallback covers older UIs.
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    // iOS / iPadOS home-screen icon
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Wait for an incoming request so proxy.ts can inject a per-request CSP
  // nonce. Without this, Next.js statically prerenders the layout and the
  // nonce-aware <script>/<style> attributes never get applied.
  await connection();
  const nonce = (await headers()).get("x-nonce") || undefined;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaMeasurementId = gtmId ? undefined : process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en-SG" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <GoogleTagManager containerId={gtmId} nonce={nonce} />
        <GoogleAnalytics measurementId={gaMeasurementId} nonce={nonce} />
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
          <DeferredClient>
            <ChatBot />
            <AccessibilityMenu />
            <CookieConsent />
            <OpenHouseModal />
            <PwaInstall />
            <SwRegister />
            <SearchDialog />
          </DeferredClient>
          <RecentTracker />
        </ToastProvider>
      </body>
    </html>
  );
}
