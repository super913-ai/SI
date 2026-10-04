import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage from "@/components/CityPage";
import { DEFAULT_CONTENT, getContent } from "@/lib/content";

export const dynamicParams = true;

export function generateStaticParams() {
  return DEFAULT_CONTENT.ukCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const content = await getContent();
  const c = content.ukCities.find((x) => x.slug === params.city);
  if (!c) return {};
  const path = "/uk/" + c.slug;
  return {
    title: "Higgsfield 50% OFF in " + c.name + " | AI Video Tools",
    description: "AI video generator, UGC, talking avatar and image to video tools at 50% OFF for creators in " + c.areas.join(", ") + ". UK offer.",
    alternates: { canonical: path, languages: { "en-GB": path } },
    openGraph: { title: "Higgsfield 50% OFF in " + c.name, locale: "en-GB".replace("-", "_") },
  };
}

export default async function Page({ params }: { params: { city: string } }) {
  const content = await getContent();
  const city = content.ukCities.find((x) => x.slug === params.city);
  if (!city) notFound();
  return <CityPage region="uk" city={city} others={content.ukCities.filter((x) => x.slug !== city.slug)} c={content} />;
}
