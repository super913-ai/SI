import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { rateLimit } from "@/lib/auth";
import { notifyOwner } from "@/lib/notify";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!(await rateLimit(`rl:lead:${ip}`, 10, 3600))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this

  const s = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);
  const lead = {
    id: crypto.randomUUID(),
    name: s(b.name, 100), email: s(b.email, 150), city: s(b.city, 60),
    service: s(b.service, 100), source: s(b.source, 120),
    createdAt: new Date().toISOString(), notified: false,
  };
  if (!lead.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email) || !lead.city || !lead.service) {
    return NextResponse.json({ error: "Please fill all fields correctly" }, { status: 400 });
  }

  lead.notified = await notifyOwner(lead);
  try {
    await redis(["LPUSH", "leads", JSON.stringify(lead)]);
  } catch {
    // saved nowhere; only succeed if the owner got the WhatsApp message
    if (!lead.notified) return NextResponse.json({ error: "Server error, please try again" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
