"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (r.ok) { window.location.reload(); return; }
    const j = await r.json().catch(() => ({}));
    setErr(j.error || "Login failed"); setBusy(false);
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-sm space-y-4 rounded-2xl p-8">
        <h1 className="text-xl font-semibold">Admin login</h1>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" autoFocus
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-lime-400/70" />
        {err && <p className="text-sm text-rose-300">{err}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-gradient-to-r from-green-500 to-lime-500 py-3 font-semibold disabled:opacity-60">
          {busy ? "..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
