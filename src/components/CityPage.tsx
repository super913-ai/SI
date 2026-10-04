import Link from "next/link";
import Hero from "./Hero";
import { ToolsGrid, WhyUs, FinalCta, Testimonials } from "./Sections";
import type { City, SiteContent } from "@/lib/content";

export default function CityPage({ region, city, others, c }: { region: "us" | "uk"; city: City; others: City[]; c: SiteContent }) {
  const uk = region === "uk";
  const ad = uk ? "advert" : "ad";
  const optimise = uk ? "optimise" : "optimize";
  const areas = city.areas.join(", ").replace(/, ([^,]*)$/, " and $1");
  const searches = [
    `AI video generator ${city.name}`, `AI UGC ${ad}s ${city.name}`, `${city.name} video editor tools`,
    `AI talking avatar ${city.name}`, `image to video AI ${city.name}`, `${ad} creator tools ${city.name}`,
  ];
  const faqs = [
    [`How do I get the 50% OFF Higgsfield offer in ${city.name}?`, `Fill in the form on this page. Our team receives your details and contacts you with the next steps.`],
    [`Which tools are included for ${city.name} creators?`, `AI Video Generator, UGC Generator, Talking Avatar, Image to Video, Motion Control and more are available at 50% OFF.`],
    [`Can I use Higgsfield to ${optimise} my ${ad}s?`, `Yes. Editors and ${ad} creators use it to make ${ad} variations quickly and test what works.`],
  ];
  const all = [...faqs.map(([q, a]) => ({ q, a })), ...c.faqs.slice(0, 6)];
  const ld = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: all.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Hero c={c} city={city.name} formCity={city.formName} tagline={`For creators in ${areas}`} />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">Higgsfield for {city.name} editors, creators and {ad} makers</h2>
        <p className="mt-4 text-white/70">
          {city.name} is home to {city.hook}. Video is how they win attention, and AI tools let one editor
          produce what used to need a full crew. From {areas}, our offer gives you every Higgsfield tool at 50% OFF.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {searches.map((s) => <span key={s} className="glass rounded-full px-4 py-1.5 text-sm text-white/70">{s}</span>)}
        </div>
      </section>

      <ToolsGrid c={c} />
      <Testimonials c={c} />
      <WhyUs c={c} />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">Questions from {city.name} creators</h2>
        <div className="space-y-3">
          {all.map(({ q, a }) => (
            <details key={q} className="glass rounded-xl p-4">
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="mt-2 text-sm text-white/70">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <p className="mb-3 text-sm text-white/50">Also available in</p>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/${region}/${o.slug}`} className="glass rounded-full px-4 py-1.5 text-sm hover:bg-white/10">{o.name}</Link>
          ))}
        </div>
      </section>
      <FinalCta c={c} />
    </>
  );
}
