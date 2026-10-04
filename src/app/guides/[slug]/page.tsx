import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { DEFAULT_CONTENT, getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/config";

export const dynamicParams = true;

export function generateStaticParams() {
  return DEFAULT_CONTENT.guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g = (await getContent()).guides.find((x) => x.slug === params.slug);
  if (!g) return {};
  return {
    title: g.title, description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.description },
  };
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const c = await getContent();
  const g = c.guides.find((x) => x.slug === params.slug);
  if (!g) notFound();
  const ld = {
    "@context": "https://schema.org", "@type": "Article",
    headline: g.title, description: g.description, dateModified: g.updated,
    mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
  };
  const related = c.guides.filter((x) => x.slug !== g.slug).slice(0, 3);
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <h1 className="text-4xl font-bold leading-tight">{g.title}</h1>
      <p className="mt-2 text-sm text-white/40">Last updated: {g.updated}</p>
      <p className="mt-6 text-lg text-white/80">{g.intro}</p>
      {g.sections.map((s) => (
        <section key={s.h} className="mt-10">
          <h2 className="text-2xl font-semibold">{s.h}</h2>
          {s.p.map((t, i) => <p key={i} className="mt-3 text-white/70">{t}</p>)}
        </section>
      ))}
      <div className="mt-12 flex flex-wrap gap-3 text-sm">
        <Link href="/pricing" className="glass rounded-full px-4 py-1.5 hover:bg-white/10">Pricing</Link>
        <Link href="/faq" className="glass rounded-full px-4 py-1.5 hover:bg-white/10">FAQ</Link>
        <Link href="/us/new-york" className="glass rounded-full px-4 py-1.5 hover:bg-white/10">USA</Link>
        <Link href="/uk/london" className="glass rounded-full px-4 py-1.5 hover:bg-white/10">UK</Link>
      </div>
      <div id="lead-form" className="mt-12 scroll-mt-32"><LeadForm c={c} /></div>
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">More guides</h2>
          <ul className="space-y-2 text-lime-300">
            {related.map((r) => <li key={r.slug}><Link href={`/guides/${r.slug}`}>{r.title}</Link></li>)}
          </ul>
        </div>
      )}
    </article>
  );
}
