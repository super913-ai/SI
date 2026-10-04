// Upstash Redis over REST (no package needed). Falls back to in-memory for local dev only.
const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
export const hasRedis = !!(URL_ && TOKEN);

const g = globalThis as unknown as { __mem?: Map<string, any> };
const mem = (g.__mem ||= new Map<string, any>());

function memCmd(cmd: (string | number)[]): any {
  const [op, key, ...a] = cmd.map(String);
  switch (op.toUpperCase()) {
    case "GET": return mem.get(key) ?? null;
    case "SET": mem.set(key, a[0]); return "OK";
    case "DEL": mem.delete(key); return 1;
    case "LPUSH": { const l = mem.get(key) || []; l.unshift(a[0]); mem.set(key, l); return l.length; }
    case "LRANGE": { const l = mem.get(key) || []; return l.slice(Number(a[0]), a[1] === "-1" ? undefined : Number(a[1]) + 1); }
    case "LREM": { const l: string[] = mem.get(key) || []; const i = l.indexOf(a[1]); if (i >= 0) l.splice(i, 1); mem.set(key, l); return i >= 0 ? 1 : 0; }
    case "INCR": { const n = Number(mem.get(key) || 0) + 1; mem.set(key, n); return n; }
    default: return null;
  }
}

export async function redis(cmd: (string | number)[]): Promise<any> {
  if (!hasRedis) return memCmd(cmd);
  const r = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
