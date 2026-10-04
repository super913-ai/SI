"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export default function LeadForm({ defaultCity = "", c }: { defaultCity?: string; c: SiteContent }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending"); setErr("");
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"), email: f.get("email"), city: f.get("city"), service: f.get("service"),
          website: f.get("website"), source: window.location.pathname,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong");
      setState("done");
    } catch (x: any) {
      setErr(x.message || "Something went wrong"); setState("idle");
    }
  }

  const field = "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-lime-400/70 focus:ring-2 focus:ring-lime-400/30";

  if (state === "done") {
    return (
      <div className="glass rounded-3xl p-8 text-center shadow-2xl shadow-lime-900/30">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
        <p className="mt-4 text-lg font-semibold">{c.formSuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8 shadow-2xl shadow-lime-900/30 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{c.formTitle}</h3>
        <p className="text-sm text-white/60 mt-1">{c.formSubtitle}</p>
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input name="name" required maxLength={100} placeholder="Full name" className={field} autoComplete="name" />
      <input name="email" type="email" required maxLength={150} placeholder="Email address" className={field} autoComplete="email" />
      <select name="city" required defaultValue={defaultCity} className={field}>
        <option value="" disabled className="text-black">Select your city</option>
        {c.formCities.map((x) => <option key={x} value={x} className="text-black">{x}</option>)}
      </select>
      <select name="service" required defaultValue="" className={field}>
        <option value="" disabled className="text-black">Service needed</option>
        {c.services.map((x) => <option key={x} value={x} className="text-black">{x}</option>)}
      </select>
      {err && <p className="text-sm text-rose-300">{err}</p>}
      <button type="submit" disabled={state === "sending"}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 via-lime-500 to-emerald-400 py-3.5 font-semibold text-white shadow-lg shadow-lime-600/30 hover:brightness-110 transition disabled:opacity-60">
        <Send className="h-5 w-5" />
        {state === "sending" ? "Sending..." : c.formButton}
      </button>
    </form>
  );
}
