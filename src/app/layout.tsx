import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import ChromeGate from "@/components/ChromeGate";
import { SITE_URL } from "@/lib/config";
import { getContent } from "@/lib/content";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Higgsfield AI Tools at 50% OFF | USA & UK", template: "%s | Higgsfield 50% OFF" },
  description:
    "AI video generator, UGC ads, talking avatars, image to video and motion control at 50% OFF for video editors, creators and ad makers in the USA and UK.",
  keywords: ["AI video generator", "AI UGC ads", "AI talking avatar", "image to video AI", "AI ad creator", "video editing tools for creators", "Higgsfield 50% off"],
  openGraph: { type: "website", title: "Higgsfield AI Tools at 50% OFF" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}" }} />
      </head>
      <body className={`${sans.variable} font-sans`}>
        <ChromeGate>
          <Header topBar={c.topBar} siteName={c.siteName} tools={c.tools} usCities={c.usCities} ukCities={c.ukCities} />
        </ChromeGate>
        <main>{children}</main>
        <ChromeGate>
          <Footer c={c} />
          <FloatingCta label="Get 50% OFF" />
        </ChromeGate>
      </body>
    </html>
  );
}
