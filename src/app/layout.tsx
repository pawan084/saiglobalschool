import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsStrip from "@/components/NewsStrip";
import ChatBot from "@/components/ChatBot";
import FloatingMobileCTA from "@/components/FloatingMobileCTA";
import { ToastProvider } from "@/components/Toast";
import { site } from "@/data/site";

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
  title: { default: `${site.name} | Singapore`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <ToastProvider>
          <NewsStrip />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingMobileCTA />
          <ChatBot />
        </ToastProvider>
      </body>
    </html>
  );
}
