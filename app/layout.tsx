import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./styles/globals.css";
import { Nav } from "./components/nav";
import { SITE_NAME, SITE_TAGLINE, siteUrl } from "./lib/site";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || siteUrl("/")),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`
  },
  description: SITE_TAGLINE,
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    url: siteUrl("/"),
    siteName: SITE_NAME,
    images: [{ url: siteUrl("/api/og"), width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE,
    images: [siteUrl("/api/og")]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <Nav />
        {children}
        <footer className="mt-20 border-t border-ink-900/10 bg-white/50 py-10">
          <div className="mx-auto w-full max-w-6xl px-5 text-sm text-ink-700">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Built for people who stop walking just to look up.
              </p>
              <p className="text-ink-600">© {new Date().getFullYear()} {SITE_NAME}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
