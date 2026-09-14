import type { NextConfig } from "next";

/**
 * Set NEXT_BASE_PATH when the site is served from a sub-path,
 * e.g. "/release-to-service" on GitHub Pages. Leave it unset for Vercel or a custom domain.
 */
const basePath = process.env.NEXT_BASE_PATH?.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
