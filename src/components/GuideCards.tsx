import Link from "next/link";
import type { SiteContent } from "@/lib/content";

export default function GuideCards({ guides, title }: { guides: SiteContent["guides"]; title: string }) {
  if (!guides.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-lime-400/40">
            <div className="font-semibold">{g.title}</div>
            <p className="mt-2 text-sm text-white/60">{g.description}</p>
            <div className="mt-4 text-sm text-lime-300">Read guide →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
