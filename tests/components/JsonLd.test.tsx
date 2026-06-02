import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JsonLd from "@/components/JsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/FaqJsonLd";
import CourseJsonLd from "@/components/CourseJsonLd";
import OrgJsonLd from "@/components/OrgJsonLd";

function parseLdJson(html: string) {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/);
  expect(m).toBeTruthy();
  // Reverse the < escape we apply in JsonLd
  return JSON.parse((m![1] as string).replace(/\\u003c/g, "<"));
}

describe("JsonLd", () => {
  it("escapes < to prevent XSS", () => {
    const { container } = render(<JsonLd data={{ "x": "<script>" }} />);
    expect(container.innerHTML).not.toContain("<script>");
    expect(container.innerHTML).toContain("\\u003c");
  });

  it("emits valid JSON", () => {
    const { container } = render(<JsonLd data={{ a: 1, b: "two" }} />);
    const parsed = parseLdJson(container.innerHTML);
    expect(parsed).toEqual({ a: 1, b: "two" });
  });
});

describe("BreadcrumbJsonLd", () => {
  it("emits a BreadcrumbList with items", () => {
    const { container } = render(
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about-us" },
        ]}
      />
    );
    const parsed = parseLdJson(container.innerHTML);
    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(parsed.itemListElement).toHaveLength(2);
    expect(parsed.itemListElement[0].position).toBe(1);
    expect(parsed.itemListElement[1].item).toContain("/about-us");
  });

  it("passes through absolute http URLs unchanged", () => {
    const { container } = render(
      <BreadcrumbJsonLd items={[{ label: "Ext", href: "https://example.com/x" }]} />
    );
    const parsed = parseLdJson(container.innerHTML);
    expect(parsed.itemListElement[0].item).toBe("https://example.com/x");
  });
});

describe("FaqJsonLd", () => {
  it("emits a FAQPage with QA pairs", () => {
    const { container } = render(
      <FaqJsonLd
        items={[
          { q: "Q1", a: "A1" },
          { q: "Q2", a: "A2" },
        ]}
      />
    );
    const parsed = parseLdJson(container.innerHTML);
    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity).toHaveLength(2);
    expect(parsed.mainEntity[0].acceptedAnswer.text).toBe("A1");
  });
});

describe("CourseJsonLd", () => {
  it("emits Course schema with all required fields", () => {
    const { container } = render(
      <CourseJsonLd
        name="English Lab"
        description="Reading, writing, fluency."
        path="/curriculum/english"
        grades="Grades 1–8"
      />
    );
    const parsed = parseLdJson(container.innerHTML);
    expect(parsed["@type"]).toBe("Course");
    expect(parsed.name).toBe("English Lab");
    expect(parsed.educationalLevel).toBe("Grades 1–8");
  });

  it("works without optional grades arg", () => {
    const { container } = render(
      <CourseJsonLd name="X" description="Y" path="/x" />
    );
    const parsed = parseLdJson(container.innerHTML);
    expect(parsed["@type"]).toBe("Course");
    expect(parsed.educationalLevel).toBeUndefined();
  });
});

describe("OrgJsonLd", () => {
  it("emits both School and WebSite schemas", () => {
    const { container } = render(<OrgJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(2);
    const schemas = Array.from(scripts).map((s) =>
      JSON.parse((s.textContent || "").replace(/\\u003c/g, "<"))
    );
    expect(schemas.some((s) => s["@type"] === "School")).toBe(true);
    expect(schemas.some((s) => s["@type"] === "WebSite")).toBe(true);
  });
});
