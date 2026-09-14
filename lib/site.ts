import type { Metadata } from "next";

export const SITE = {
  name: "Release to Service",
  tagline: "EASA maintenance guide",
  description:
    "An illustrated guide to aircraft maintenance engineering under EASA Part-147, Part-66 and Part-145.",
  url: "https://mhmdnab.github.io/release-to-service",
  revision: "2026-09",
  sampleDate: "2026-09-14",
} as const;

/** Metadata for a content page: title template from the root layout, plus Open Graph tags. */
export function pageMetadata(title: string, description: string, href: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: `${title} · ${SITE.name}`,
      description,
      url: href,
    },
  };
}
