import Link from "next/link";
import {
  Clapperboard, Users, Mic2, Image as ImageIcon, Move3d, Type, Megaphone, ShoppingBag,
  AudioLines, ArrowUpFromLine, Palette, UserCheck, Globe, Zap, ShieldCheck, Headphones,
  BadgePercent, Rocket, Star, Play,
} from "lucide-react";
import type { SiteContent } from "@/lib/content";

const Title = ({ h, p }: { h: string; p?: string }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{h}</h2>
    {p && <p className="mt-3 text-white/60">{p}</p>}
  </div>
);

export function PlatformStrip() {
  const items = ["TikTok", "Instagram", "YouTube", "Shopify", "Meta Ads", "Google Ads"];
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-8">
      <p className="mb-4 text-center text-sm text-white/50">Made for the platforms you publish on</p>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-lg font-semibold text-white/40">
        {items.map((i) => <span key={i}>{i}</span>)}
      </div>
    </section>
  );
}

const toolStyles = [
  [Clapperboard, "from-lime-400 to-green-500"], [Users, "from-green-400 to-emerald-500"],
  [Mic2, "from-emerald-400 to-teal-500"], [ImageIcon, "from-lime-300 to-lime-500"],
  [Move3d, "from-green-300 to-green-600"], [Type, "from-teal-300 to-emerald-500"],
  [Megaphone, "from-lime-400 to-green-500"], [ShoppingBag, "from-green-400 to-emerald-500"],
  [AudioLines, "from-emerald-400 to-teal-500"], [ArrowUpFromLine, "from-lime-300 to-lime-500"],
  [Palette, "from-green-300 to-green-600"], [UserCheck, "from-teal-300 to-emerald-500"],
] as const;
const whyIcons = [BadgePercent, Zap, Headphones, ShieldCheck, Globe, Rocket];

export function ToolsGrid({ c }: { c: SiteContent }) {
  return (
    <section id="tools" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20">
      <Title h={c.toolsTitle} p={c.toolsSubtitle} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.tools.map((name, i) => { const [Icon, g] = toolStyles[i % toolStyles.length]; return (
          <div key={name} className="glass group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-lime-400/40">
            <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${g}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="font-semibold">{name}</div>
            <div className="mt-2 inline-block rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
              50% OFF Available
            </div>
          </div>
        ); })}
      </div>
    </section>
  );
}

export function Stats({ c }: { c: SiteContent }) {
  if (!c.stats.enabled) return null;
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="glass grid gap-6 rounded-3xl p-8 text-center sm:grid-cols-3">
        {c.stats.items.map((s) => (
          <div key={s.label}>
            <div className="grad-text text-4xl font-bold">{s.value}</div>
            <div className="mt-1 text-sm text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Portfolio() {
  const items = [
    ["UGC ad", "from-green-700 to-lime-500"], ["Talking avatar", "from-emerald-700 to-green-400"],
    ["Product video", "from-lime-600 to-green-500"], ["Image to video", "from-teal-700 to-emerald-400"],
    ["Motion control", "from-green-600 to-lime-400"], ["Social ad", "from-emerald-600 to-lime-500"],
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <Title h="What you can create" p="Example formats. Replace these tiles with your own work in src/components/Sections.tsx." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, g]) => (
          <div key={label} className={`relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${g}`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="glass grid h-14 w-14 place-items-center rounded-full"><Play className="h-6 w-6" /></div>
            </div>
            <div className="glass absolute bottom-3 left-3 rounded-lg px-3 py-1 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhyUs({ c }: { c: SiteContent }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <Title h={c.whyTitle} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.whyUs.map((p, i) => {
          const Icon = whyIcons[i % whyIcons.length];
          return (
            <div key={p.title + i} className="glass rounded-2xl p-6">
              <Icon className="mb-3 h-6 w-6 text-lime-300" />
              <div className="font-semibold">{p.title}</div>
              <p className="mt-1 text-sm text-white/60">{p.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Testimonials({ c }: { c: SiteContent }) {
  if (!c.testimonials.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <Title h="What customers say" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {c.testimonials.map((t) => (
          <figure key={t.name + t.text} className="glass rounded-2xl p-6">
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
            </div>
            <blockquote className="text-white/80">{t.text}</blockquote>
            <figcaption className="mt-4 text-sm text-white/50">{t.name}, {t.location}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FinalCta({ c }: { c: SiteContent }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center">
      <div className="rounded-3xl bg-gradient-to-r from-green-600 via-lime-600 to-emerald-500 p-10">
        <h2 className="text-3xl font-bold">{c.finalTitle}</h2>
        <p className="mt-2 text-white/80">{c.finalText}</p>
        <Link href="#lead-form" className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black">
          {c.cta1}
        </Link>
      </div>
    </section>
  );
}
