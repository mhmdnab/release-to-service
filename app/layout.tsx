import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/Shell";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/site";
import { fontClassName } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: "/",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontClassName}>
      <body>
        <Shell>
          {children}
          <SiteFooter />
        </Shell>
      </body>
    </html>
  );
}
