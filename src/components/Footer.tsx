import Link from "next/link";
import type { SiteContent } from "@/lib/content";

export default function Footer({ c }: { c: SiteContent }) {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <div className="font-bold">{c.siteName}</div>
          <p className="mt-2 text-sm text-white/50">{c.footerNote}</p>
        </div>
        <div>
          <div className="mb-2 font-semibold">USA</div>
          <ul className="space-y-1 text-sm text-white/60">
            {c.usCities.map((x) => <li key={x.slug}><Link href={`/us/${x.slug}`} className="hover:text-white">{x.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <div className="mb-2 font-semibold">UK</div>
          <ul className="space-y-1 text-sm text-white/60">
            {c.ukCities.map((x) => <li key={x.slug}><Link href={`/uk/${x.slug}`} className="hover:text-white">{x.name}</Link></li>)}
          </ul>
          <div className="mt-4 space-x-4 text-sm text-white/60">
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
