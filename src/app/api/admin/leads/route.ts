import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const raw: string[] = (await redis(["LRANGE", "leads", 0, 999])) || [];
  const leads = raw.map((r) => { try { return JSON.parse(r); } catch { return null; } }).filter(Boolean);
  return NextResponse.json({ leads });
}

export async function DELETE(req: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json().catch(() => ({ id: "" }));
  const raw: string[] = (await redis(["LRANGE", "leads", 0, 999])) || [];
  const hit = raw.find((r) => { try { return JSON.parse(r).id === id; } catch { return false; } });
  if (hit) await redis(["LREM", "leads", 1, hit]);
  return NextResponse.json({ ok: !!hit });
}
