import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  axes: ["opsz"],
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Clinical Psychology & Corporate Wellbeing`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "clinical psychologist",
    "RCI registered psychologist",
    "online therapy",
    "child psychologist",
    "school counsellor",
    "EAP services",
    "POSH training",
    "corporate wellbeing",
    "mental health India",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — A safe space to understand, connect and grow.`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Clinical Psychology & Corporate Wellbeing`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#1A3636",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    // `suppressHydrationWarning` covers browser extensions that inject
    // data-* attributes into <html>/<body> before React hydrates (Grammarly
    // adds data-gr-ext-installed, Tabbit adds data-tabbit-tray-*). Those
    // attributes are not in the server HTML, so React reports a mismatch it
    // cannot patch. The flag is one level deep, so <body> needs it too.
    // Every attribute on these two elements is static and server-owned, so
    // nothing real is being hidden.
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-dvh bg-background text-foreground"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only rounded-lg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lift"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
