import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getContent();
  const paths = ["", "/pricing", "/faq", "/guides", "/contact", ...c.guides.map((x) => `/guides/${x.slug}`), ...c.usCities.map((x) => `/us/${x.slug}`), ...c.ukCities.map((x) => `/uk/${x.slug}`)];
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() }));
}
