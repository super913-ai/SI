# Higgsfield agency site (Next.js 14)

Leads -> saved in /admin dashboard + sent privately to the owner's WhatsApp (CallMeBot). Customers never see the number.

## Run locally
npm install
cp .env.example .env.local   (fill values)
npm run dev        -> site at http://localhost:3000, admin at /admin

## Deploy (Vercel)
1. Push to GitHub, import the repo in Vercel.
2. Storage -> Marketplace -> Upstash Redis -> connect to the project.
3. Add env vars: NEXT_PUBLIC_SITE_URL, ADMIN_PASSWORD, SESSION_SECRET, OWNER_WHATSAPP (digits only), CALLMEBOT_API_KEY.
4. Redeploy.

Leads are always saved in /admin even if WhatsApp fails (shown as "Not sent").
