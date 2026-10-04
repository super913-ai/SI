"use client";
import { motion } from "framer-motion";
import { Play, Sparkles, Wand2, Mic2 } from "lucide-react";
import LeadForm from "./LeadForm";
import Rich from "./Rich";
import type { SiteContent } from "@/lib/content";

const floats = [
  { icon: Play, label: "UGC ad", cls: "left-[4%] top-[18%]", g: "from-lime-400 to-green-500", d: 0 },
  { icon: Mic2, label: "Talking avatar", cls: "right-[46%] top-[8%]", g: "from-green-400 to-emerald-500", d: 1.2 },
  { icon: Wand2, label: "Image to video", cls: "left-[10%] bottom-[10%]", g: "from-lime-300 to-lime-500", d: 2.1 },
];

export default function Hero({ c, city, formCity, tagline }: { c: SiteContent; city?: string; formCity?: string; tagline?: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(132,204,22,.28),transparent),radial-gradient(50%_40%_at_90%_30%,rgba(34,197,94,.22),transparent),radial-gradient(40%_40%_at_50%_100%,rgba(16,185,129,.16),transparent)]" />
      <div className="absolute inset-0 -z-10 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      {floats.map(({ icon: Icon, label, cls, g, d }) => (
        <motion.div key={label}
          className={`glass absolute hidden xl:flex items-center gap-3 rounded-2xl p-3 ${cls}`}
          animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, delay: d, ease: "easeInOut" }}>
          <div className={`grid h-14 w-20 place-items-center rounded-xl bg-gradient-to-br ${g}`}><Icon className="h-6 w-6" /></div>
          <div className="pr-2 text-xs"><div className="font-medium">{label}</div><div className="text-emerald-300">50% OFF</div></div>
        </motion.div>
      ))}

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
        <div>
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <Sparkles className="h-4 w-4 text-lime-300" />
            {city ? `Now serving creators in ${city}` : c.heroBadge}
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <Rich text={city ? `Higgsfield 50% OFF in ${city}` : c.heroHeadline} />
          </h1>
          {tagline && <p className="mt-4 text-xl text-lime-200">{tagline}</p>}
          <p className="mt-5 max-w-xl text-lg text-white/80"><Rich text={c.heroSub} /></p>
          <p className="mt-4 max-w-xl text-white/60">{c.heroParagraph}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#lead-form" className="rounded-xl bg-gradient-to-r from-green-500 via-lime-500 to-emerald-400 px-6 py-3.5 font-semibold shadow-lg shadow-lime-600/30 hover:brightness-110 transition">{c.cta1}</a>
            <a href="#tools" className="glass rounded-xl px-6 py-3.5 font-semibold hover:bg-white/10 transition">{c.cta2}</a>
          </div>
        </div>
        <motion.div id="lead-form" className="scroll-mt-32" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <LeadForm defaultCity={formCity ?? ""} c={c} />
        </motion.div>
      </div>
    </section>
  );
}
