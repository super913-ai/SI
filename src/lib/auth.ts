import crypto from "crypto";
import { cookies } from "next/headers";

const secret = () => process.env.SESSION_SECRET || "dev-secret-change-me";
const sign = (v: string) => crypto.createHmac("sha256", secret()).update(v).digest("hex");

export function makeToken() {
  const exp = String(Date.now() + 7 * 24 * 3600 * 1000);
  return `${exp}.${sign(exp)}`;
}
export function isAuthed(): boolean {
  const t = cookies().get("admin")?.value;
  if (!t) return false;
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}
export function passwordOk(input: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}
export async function rateLimit(key: string, max: number, windowSec: number) {
  try {
    const n = await (await import("./redis")).redis(["INCR", key]);
    if (n === 1) await (await import("./redis")).redis(["EXPIRE", key, windowSec]);
    return n <= max;
  } catch { return true; }
}
