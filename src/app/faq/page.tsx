import type { Metadata } from "next";
import FaqList from "@/components/Faq";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Higgsfield Membership, Subscription & Pricing FAQ | 50% OFF",
  description: "Answers about Higgsfield membership, subscription price, UGC ads, talking avatars, image to video and the 50% OFF offer for creators in the USA and UK.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const c = await getContent();
  return (
    <div className="pt-10">
      <h1 className="mx-auto max-w-3xl px-4 text-4xl font-bold">Higgsfield FAQ: membership, subscription and pricing</h1>
      <FaqList items={c.faqs} title="All questions" />
    </div>
  );
}
