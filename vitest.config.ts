import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    css: false,
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/page.tsx",
        "src/**/layout.tsx",
        "src/**/loading.tsx",
        "src/**/error.tsx",
        "src/**/not-found.tsx",
        "src/**/template.tsx",
        "src/**/sitemap.ts",
        "src/**/robots.ts",
        "src/**/manifest.ts",
        "src/**/opengraph-image.tsx",
        "src/lib/og.tsx",
        "src/lib/schoolContext.ts",
        "src/components/ChatBot.tsx",
        "src/components/Footer.tsx",
        "src/components/Header.tsx",
        "src/components/Toast.tsx",
        "src/components/FacultyGrid.tsx",
        "src/components/Gallery.tsx",
        "src/components/MapEmbed.tsx",
        "src/components/Stepper.tsx",
        "src/components/Testimonials.tsx",
        "src/components/TestimonialsGrid.tsx",
        "src/components/NewsCard.tsx",
        "src/components/NewsSection.tsx",
        "src/components/NewsStrip.tsx",
        "src/components/PersonGrid.tsx",
        "src/components/RelatedNewsSection.tsx",
        "src/components/RelatedSidebar.tsx",
        "src/components/StatsCounter.tsx",
        "src/components/RelatedFeatureBlock.tsx",
        "src/components/FeatureBlock.tsx",
        "src/components/FeatureGrid.tsx",
        "src/components/PageHero.tsx",
        "src/components/RevealOnScroll.tsx",
        "src/components/SectionPage.tsx",
        "src/components/SimpleContentPage.tsx",
        "src/components/InnerPageShell.tsx",
        "src/components/CTAStrip.tsx",
        "src/components/ContentSection.tsx",
        "src/components/FaqAccordion.tsx",
        "src/components/FeeTable.tsx",
        "src/components/FormCard.tsx",
        "src/components/LabPage.tsx",
        "src/components/TrustBadges.tsx",
        "src/components/Timeline.tsx",
        "src/components/BrandLogo.tsx",
      ],
      thresholds: {
        // Primary target: line/statement coverage > 95%.
        // Function coverage counts every inner closure (every event handler,
        // every useEffect callback, every React render function), which makes
        // it a noisy metric for component-heavy code. 80% is the practical
        // threshold for components.
        lines: 95,
        statements: 95,
        branches: 85,
        functions: 80,
      },
    },
  },
});
