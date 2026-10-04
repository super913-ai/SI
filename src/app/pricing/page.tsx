import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing - Higgsfield 50% OFF",
  description: "Higgsfield plans at 50% OFF for creators and editors in the USA and UK.",
  alternates: { canonical: "/pricing" },
};

export default async function Pricing() {
  const c = await getContent();
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-center text-4xl font-bold">Pricing, now 50% OFF</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-white/60">Pick a plan and send us the form to get started.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {c.plans.map((p) => (
          <div key={p.name} className={`glass rounded-3xl p-8 ${p.popular ? "border-lime-400/60 shadow-xl shadow-lime-900/30" : ""}`}>
            {p.popular && <div className="mb-3 inline-block rounded-full bg-lime-500/20 px-3 py-0.5 text-xs font-semibold text-lime-200">Most popular</div>}
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold">{c.currency}{(p.listPrice / 2).toFixed(0)}</span>
              <span className="text-white/40 line-through">{c.currency}{p.listPrice}</span>
              <span className="text-sm text-white/50">/ month</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-emerald-300" />{f}</li>)}
            </ul>
            <a href="/contact" className="mt-8 block rounded-xl bg-gradient-to-r from-green-500 to-lime-500 py-3 text-center font-semibold">
              Get {p.name} at 50% OFF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
