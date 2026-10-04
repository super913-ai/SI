import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us about the 50% OFF Higgsfield offer for the USA and UK.",
  alternates: { canonical: "/contact" },
};

export default async function Contact() {
  const c = await getContent();
  return (
    <section className="mx-auto max-w-xl px-4 py-20">
      <h1 className="mb-6 text-3xl font-bold">Contact us</h1>
      <LeadForm c={c} />
    </section>
  );
}
