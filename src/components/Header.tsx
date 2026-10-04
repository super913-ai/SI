"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type Panel = "tools" | "us" | "uk" | null;

const Badge = () => (
  <span className="ml-auto rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">50% OFF</span>
);

type CityLite = { slug: string; name: string };
export default function Header({ topBar, siteName, tools: TOOLS, usCities: US_CITIES, ukCities: UK_CITIES }: {
  topBar: string; siteName: string; tools: string[]; usCities: CityLite[]; ukCities: CityLite[];
}) {
  const [open, setOpen] = useState<Panel>(null);
  const [mobile, setMobile] = useState(false);
  const [acc, setAcc] = useState<"us" | "uk" | "tools" | null>("us");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const toggle = (p: Exclude<Panel, null>) => setOpen(open === p ? null : p);
  const navBtn = "flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition";

  return (
    <header ref={ref} className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-lime-600 via-green-600 to-emerald-500 py-2 text-center text-xs sm:text-sm font-medium">
        {topBar}
      </div>

      <div className="glass border-x-0 border-t-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-bold tracking-tight">
            {siteName}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className={navBtn}>Home</Link>
            <button onClick={() => toggle("tools")} className={navBtn} aria-expanded={open === "tools"}>
              Higgsfield Tools <ChevronDown className="h-4 w-4" />
            </button>
            <button onClick={() => toggle("us")} className={navBtn} aria-expanded={open === "us"}>
              USA <ChevronDown className="h-4 w-4" />
            </button>
            <button onClick={() => toggle("uk")} className={navBtn} aria-expanded={open === "uk"}>
              UK <ChevronDown className="h-4 w-4" />
            </button>
            <Link href="/pricing" className={navBtn}>Pricing</Link>
            <Link href="/guides" className={navBtn}>Guides</Link>
            <Link href="/contact" className={navBtn}>Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="/#lead-form"
               className="hidden sm:inline-flex rounded-xl bg-gradient-to-r from-green-500 to-lime-500 px-4 py-2 text-sm font-semibold hover:brightness-110">
              Get 50% OFF
            </a>
            <button className="lg:hidden p-2" onClick={() => setMobile(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Desktop mega panels */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="hidden lg:block border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
            >
              <div className="mx-auto max-w-7xl px-4 py-8">
                {open === "tools" && (
                  <div className="grid grid-cols-3 gap-2">
                    {TOOLS.map((t) => (
                      <Link key={t} href="/#tools" onClick={() => setOpen(null)}
                        className="flex items-center rounded-xl p-3 hover:bg-white/5 text-sm">
                        {t}<Badge />
                      </Link>
                    ))}
                  </div>
                )}
                {(open === "us" || open === "uk") && (
                  <div>
                    <p className="mb-4 text-sm text-white/60">
                      {open === "us" ? "Pick your US city" : "Pick your UK city"} to see local offer details.
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {(open === "us" ? US_CITIES : UK_CITIES).map((c) => (
                        <Link key={c.slug} href={`/${open}/${c.slug}`} onClick={() => setOpen(null)}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-lime-400/50 hover:bg-white/[0.07] transition">
                          <div className="font-medium">{c.name}</div>
                          <div className="mt-1 text-xs text-emerald-300">Higgsfield 50% OFF</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#050505] lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-lg font-bold">{siteName}</span>
              <div className="flex items-center gap-2"><ThemeToggle /><button onClick={() => setMobile(false)} aria-label="Close menu" className="p-2"><X className="h-6 w-6" /></button></div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1">
              <Link href="/" onClick={() => setMobile(false)} className="block rounded-xl px-3 py-3 text-lg">Home</Link>

              {([
                ["tools", "Higgsfield Tools"],
                ["us", "USA"],
                ["uk", "UK"],
              ] as const).map(([key, label]) => (
                <div key={key} className="rounded-xl">
                  <button onClick={() => setAcc(acc === key ? null : key)}
                    className="flex w-full items-center justify-between px-3 py-3 text-lg">
                    {label}
                    <ChevronDown className={`h-5 w-5 transition ${acc === key ? "rotate-180" : ""}`} />
                  </button>
                  {acc === key && (
                    <div className="grid grid-cols-2 gap-2 px-2 pb-3">
                      {key === "tools"
                        ? TOOLS.map((t) => (
                            <Link key={t} href="/#tools" onClick={() => setMobile(false)}
                              className="rounded-lg bg-white/5 px-3 py-2.5 text-sm">{t}</Link>
                          ))
                        : (key === "us" ? US_CITIES : UK_CITIES).map((c) => (
                            <Link key={c.slug} href={`/${key}/${c.slug}`} onClick={() => setMobile(false)}
                              className="rounded-lg bg-white/5 px-3 py-2.5 text-sm">{c.name}</Link>
                          ))}
                    </div>
                  )}
                </div>
              ))}

              <Link href="/pricing" onClick={() => setMobile(false)} className="block px-3 py-3 text-lg">Pricing</Link>
              <Link href="/guides" onClick={() => setMobile(false)} className="block px-3 py-3 text-lg">Guides</Link>
              <Link href="/contact" onClick={() => setMobile(false)} className="block px-3 py-3 text-lg">Contact</Link>
            </div>

            <div className="border-t border-white/10 p-4">
              <a href="/#lead-form"
                 onClick={() => setMobile(false)}
                 className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 py-3.5 font-semibold">
                Get 50% OFF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
