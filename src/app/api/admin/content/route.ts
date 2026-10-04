import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAuthed } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { CONTENT_KEY, readStoredContent, sanitize } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ content: await readStoredContent() });
}

export async function POST(req: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (body?.reset) await redis(["DEL", CONTENT_KEY]);
  else await redis(["SET", CONTENT_KEY, JSON.stringify(sanitize(body?.content))]);
  revalidateTag("content");
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
