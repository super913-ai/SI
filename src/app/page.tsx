import Hero from "@/components/Hero";
import { PlatformStrip, ToolsGrid, Stats, Portfolio, WhyUs, Testimonials, FinalCta } from "@/components/Sections";
import { getContent } from "@/lib/content";
import FaqList from "@/components/Faq";
import GuideCards from "@/components/GuideCards";

export default async function Home() {
  const c = await getContent();
  return (
    <>
      <Hero c={c} />
      <PlatformStrip />
      <ToolsGrid c={c} />
      <Stats c={c} />
      <Portfolio />
      <Testimonials c={c} />
      <WhyUs c={c} />
      <GuideCards guides={c.guides.slice(0, 6)} title="Popular guides: pricing, discounts and alternatives" />
      <FaqList items={c.faqs.slice(0, 10)} title="Higgsfield membership, subscription and pricing FAQ" showAllLink />
      <FinalCta c={c} />
    </>
  );
}
