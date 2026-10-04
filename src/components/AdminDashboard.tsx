"use client";
import { useEffect, useMemo, useState } from "react";
import { Download, LogOut, RefreshCw, Save, Trash2, RotateCcw } from "lucide-react";
import type { SiteContent } from "@/lib/content";

type Lead = { id: string; name: string; email: string; city: string; service: string; source: string; createdAt: string; notified: boolean };

const TEXT: [keyof SiteContent, string, boolean?][] = [
  ["siteName", "Site name (header + footer)"], ["topBar", "Top bar text"], ["heroBadge", "Hero badge"],
  ["heroHeadline", "Hero headline (\"50% OFF\" is highlighted automatically)"],
  ["heroSub", "Hero sub-headline (wrap a word in *stars* to highlight it)"],
  ["heroParagraph", "Hero paragraph", true], ["cta1", "Main button label"], ["cta2", "Second button label"],
  ["formTitle", "Form title"], ["formSubtitle", "Form subtitle"], ["formButton", "Form button label"],
  ["formSuccess", "Message shown after submit", true],
  ["toolsTitle", "Tools section title"], ["toolsSubtitle", "Tools section subtitle"], ["whyTitle", "Why-us title"],
  ["finalTitle", "Bottom banner title"], ["finalText", "Bottom banner text"], ["footerNote", "Footer note", true], ["currency", "Currency symbol"],
];
const LINES: [keyof SiteContent, string][] = [
  ["tools", "Tools (one per line)"], ["services", "Form: services dropdown (one per line)"], ["formCities", "Form: cities dropdown (one per line)"],
];
const JSONS: [keyof SiteContent, string][] = [
  ["stats", "Stats (set enabled to true only when numbers are real)"], ["testimonials", "Testimonials (real customer reviews only)"],
  ["plans", "Pricing plans (listPrice = full price, site shows 50% off)"], ["whyUs", "Why choose us points"],
  ["faqs", "FAQs (q = question, a = answer; first 10 show on homepage, first 6 on every city page)"],
  ["guides", "Guides / blog posts (add new ones: slug, title, description, updated, intro, sections)"],
  ["usCities", "USA city pages"], ["ukCities", "UK city pages"],
];

const box = "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-lime-400/70";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"leads" | "content">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  const [c, setC] = useState<SiteContent | null>(null);
  const [json, setJson] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  async function loadLeads() {
    const r = await fetch("/api/admin/leads");
    if (r.status === 401) return window.location.reload();
    setLeads((await r.json()).leads || []);
  }
  async function loadContent() {
    const r = await fetch("/api/admin/content");
    const { content } = await r.json();
    setC(content);
    setJson(Object.fromEntries(JSONS.map(([k]) => [k, JSON.stringify(content[k], null, 2)])));
  }
  useEffect(() => { loadLeads(); loadContent(); }, []);

  const shown = useMemo(() => {
    const t = q.toLowerCase();
    return leads.filter((l) => !t || [l.name, l.email, l.city, l.service].join(" ").toLowerCase().includes(t));
  }, [leads, q]);

  async function del(id: string) {
    if (!confirm("Delete this lead?")) return;
    await fetch("/api/admin/leads", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    loadLeads();
  }
  function exportCsv() {
    const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = [["Date", "Name", "Email", "City", "Service", "Page"], ...shown.map((l) => [l.createdAt, l.name, l.email, l.city, l.service, l.source])];
    const blob = new Blob([rows.map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "leads.csv"; a.click();
  }

  async function save() {
    if (!c) return;
    const next: any = { ...c };
    for (const [k, label] of JSONS) {
      try { next[k] = JSON.parse(json[k]); } catch { setMsg(`Fix the JSON in: ${label}`); return; }
    }
    for (const [k] of LINES) next[k] = (next[k] as string[]).map((s) => s.trim()).filter(Boolean);
    const r = await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: next }) });
    setMsg(r.ok ? "Saved. The website is updated." : "Save failed");
    if (r.ok) loadContent();
  }
  async function reset() {
    if (!confirm("Reset ALL website text to the defaults?")) return;
    await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reset: true }) });
    setMsg("Reset to defaults."); loadContent();
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  const tabBtn = (t: "leads" | "content", label: string) => (
    <button onClick={() => setTab(t)} className={`rounded-lg px-4 py-2 text-sm font-medium ${tab === t ? "bg-white/10" : "text-white/60 hover:text-white"}`}>{label}</button>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">{tabBtn("leads", `Leads (${leads.length})`)}{tabBtn("content", "Website content")}</div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-white/60 hover:text-white"><LogOut className="h-4 w-4" />Log out</button>
      </div>

      {tab === "leads" && (
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, city..." className={box + " max-w-xs"} />
            <button onClick={loadLeads} className="glass flex items-center gap-2 rounded-xl px-4 text-sm"><RefreshCw className="h-4 w-4" />Refresh</button>
            <button onClick={exportCsv} className="glass flex items-center gap-2 rounded-xl px-4 text-sm"><Download className="h-4 w-4" />CSV</button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-white/5 text-white/60">
                <tr><th className="p-3">Date</th><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">City</th><th className="p-3">Service</th><th className="p-3">WhatsApp</th><th className="p-3" /></tr>
              </thead>
              <tbody>
                {shown.map((l) => (
                  <tr key={l.id} className="border-t border-white/10">
                    <td className="p-3 whitespace-nowrap text-white/60">{new Date(l.createdAt).toLocaleString()}</td>
                    <td className="p-3">{l.name}</td>
                    <td className="p-3"><a href={`mailto:${l.email}`} className="text-lime-300">{l.email}</a></td>
                    <td className="p-3">{l.city}</td><td className="p-3">{l.service}</td>
                    <td className="p-3">{l.notified ? "Sent" : <span className="text-amber-300">Not sent</span>}</td>
                    <td className="p-3"><button onClick={() => del(l.id)} aria-label="Delete"><Trash2 className="h-4 w-4 text-rose-300" /></button></td>
                  </tr>
                ))}
                {!shown.length && <tr><td colSpan={7} className="p-8 text-center text-white/50">No leads yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "content" && c && (
        <div className="space-y-8">
          <div className="sticky top-0 z-10 -mx-4 flex items-center gap-3 bg-[#050505]/90 px-4 py-3 backdrop-blur">
            <button onClick={save} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 px-5 py-2.5 text-sm font-semibold"><Save className="h-4 w-4" />Save changes</button>
            <button onClick={reset} className="glass flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm"><RotateCcw className="h-4 w-4" />Reset</button>
            <span className="text-sm text-emerald-300">{msg}</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {TEXT.map(([k, label, multi]) => (
              <label key={k} className={`block text-sm ${multi ? "sm:col-span-2" : ""}`}>
                <span className="mb-1 block text-white/60">{label}</span>
                {multi
                  ? <textarea rows={3} className={box} value={c[k] as string} onChange={(e) => setC({ ...c, [k]: e.target.value })} />
                  : <input className={box} value={c[k] as string} onChange={(e) => setC({ ...c, [k]: e.target.value })} />}
              </label>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {LINES.map(([k, label]) => (
              <label key={k} className="block text-sm">
                <span className="mb-1 block text-white/60">{label}</span>
                <textarea rows={10} className={box} value={(c[k] as string[]).join("\n")} onChange={(e) => setC({ ...c, [k]: e.target.value.split("\n") })} />
              </label>
            ))}
          </div>

          <div className="space-y-4">
            {JSONS.map(([k, label]) => (
              <label key={k} className="block text-sm">
                <span className="mb-1 block text-white/60">{label}</span>
                <textarea rows={8} spellCheck={false} className={box + " font-mono text-xs"} value={json[k] ?? ""} onChange={(e) => setJson({ ...json, [k]: e.target.value })} />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
