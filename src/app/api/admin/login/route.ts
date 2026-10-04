import { NextResponse } from "next/server";
import { makeToken, passwordOk, rateLimit } from "@/lib/auth";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!(await rateLimit(`rl:login:${ip}`, 10, 900))) return NextResponse.json({ error: "Too many attempts, try later" }, { status: 429 });
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!passwordOk(String(password || ""))) return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", makeToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 7 * 24 * 3600 });
  return res;
}
