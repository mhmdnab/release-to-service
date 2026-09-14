import type { MetadataRoute } from "next";
import { SECTIONS } from "@/lib/sections";
import { SITE } from "@/lib/site";

/** Required for `output: "export"`: metadata routes are rendered once at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return SECTIONS.map((s) => ({
    url: `${SITE.url}${s.href === "/" ? "/" : `${s.href}/`}`,
    changeFrequency: "yearly",
    priority: s.href === "/" ? 1 : 0.8,
  }));
}
