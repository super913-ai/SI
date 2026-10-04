import Link from "next/link";

export default function FaqList({ items, title, showAllLink }: { items: { q: string; a: string }[]; title: string; showAllLink?: boolean }) {
  if (!items.length) return null;
  const ld = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className="space-y-3">
        {items.map(({ q, a }) => (
          <details key={q} className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium">{q}</summary>
            <p className="mt-2 text-sm text-white/70">{a}</p>
          </details>
        ))}
      </div>
      {showAllLink && <Link href="/faq" className="mt-6 inline-block text-sm text-lime-300 hover:text-lime-200">See all questions →</Link>}
    </section>
  );
}
