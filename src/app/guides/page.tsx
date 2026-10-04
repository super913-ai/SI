import type { Metadata } from "next";
import GuideCards from "@/components/GuideCards";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Higgsfield & AI Video Tool Guides: Pricing, Discounts, Alternatives",
  description: "Guides on Higgsfield pricing, discounts, free plan, alternatives and cheap AI tools for video editing and UGC ads.",
  alternates: { canonical: "/guides" },
};

export default async function Guides() {
  const c = await getContent();
  return (
    <div className="pt-12">
      <h1 className="mx-auto max-w-3xl px-4 text-center text-4xl font-bold">Guides for video editors, creators and ad makers</h1>
      <GuideCards guides={c.guides} title="" />
    </div>
  );
}
