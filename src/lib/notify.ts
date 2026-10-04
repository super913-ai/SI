// Sends the lead to the OWNER's WhatsApp only, via CallMeBot. Keys live in server env vars (never sent to the browser).
type Lead = { name: string; email: string; city: string; service: string; source?: string };

export async function notifyOwner(l: Lead): Promise<boolean> {
  const phone = process.env.OWNER_WHATSAPP;
  const key = process.env.CALLMEBOT_API_KEY;
  if (!phone || !key) return false;
  const text = `New Lead: Name: ${l.name}, Email: ${l.email}, City: ${l.city}, Need: ${l.service} - Wants 50% OFF Higgsfield Offer\nPage: ${l.source || "/"}`;
  try {
    const u = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent("+" + phone.replace(/\D/g, ""))}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`;
    const r = await fetch(u, { cache: "no-store" });
    return r.ok;
  } catch { return false; }
}
