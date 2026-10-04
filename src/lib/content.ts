import { unstable_cache } from "next/cache";
import { redis } from "./redis";

export type City = { slug: string; name: string; formName: string; areas: string[]; hook: string };
export type SiteContent = {
  siteName: string; topBar: string; heroBadge: string; heroHeadline: string; heroSub: string; heroParagraph: string;
  cta1: string; cta2: string; formTitle: string; formSubtitle: string; formButton: string; formSuccess: string;
  toolsTitle: string; toolsSubtitle: string; whyTitle: string; finalTitle: string; finalText: string;
  footerNote: string; currency: string;
  tools: string[]; services: string[]; formCities: string[];
  stats: { enabled: boolean; items: { value: string; label: string }[] };
  testimonials: { name: string; location: string; text: string; rating: number }[];
  plans: { name: string; listPrice: number; popular?: boolean; features: string[] }[];
  whyUs: { title: string; text: string }[];
  usCities: City[]; ukCities: City[];
  faqs: { q: string; a: string }[];
  guides: { slug: string; title: string; description: string; updated: string; intro: string; sections: { h: string; p: string[] }[] }[];
};

export const DEFAULT_CONTENT: SiteContent = {
  siteName: "Higgsfield Offer Hub",
  topBar: "🔥 HIGGSFIELD 50% OFF - All Tools Available - Limited Time",
  heroBadge: "Serving creators in the USA & UK",
  heroHeadline: "All Higgsfield Tools Available Here - 50% OFF",
  heroSub: "If You Are An Editor, You Are Missing One Thing... That's *HIGGSFIELD*",
  heroParagraph: "Access Higgsfield AI Video Generator, UGC Generator, Talking Avatar, Image to Video, Motion Control and 20+ premium tools. All available at 50% OFF for USA & UK.",
  cta1: "Claim 50% OFF Now", cta2: "View All Tools",
  formTitle: "Claim your 50% OFF",
  formSubtitle: "Takes 20 seconds. Our team will contact you with the next steps.",
  formButton: "Claim 50% OFF",
  formSuccess: "Thank you! We received your details and will contact you shortly.",
  toolsTitle: "Every Higgsfield tool, 50% OFF",
  toolsSubtitle: "Pick the tool you need and send us the form.",
  whyTitle: "Why choose us",
  finalTitle: "Ready for 50% OFF Higgsfield?",
  finalText: "Fill the form and our team will contact you.",
  footerNote: "Independent Higgsfield offer provider. Not affiliated with Higgsfield AI unless stated.",
  currency: "$",
  tools: ["AI Video Generator", "UGC Generator", "Talking Avatar", "Image to Video", "Motion Control", "Text to Video", "AI Ad Creator", "Product Video Maker", "Lip Sync", "Video Upscaler", "Style Transfer", "Character Consistency"],
  services: ["AI Video Generator", "UGC Generator", "Talking Avatar", "Image to Video", "Motion Control", "Other Higgsfield tool"],
  formCities: ["New York", "LA", "Houston", "Miami", "Chicago", "SF", "Austin", "Dallas", "Seattle", "Atlanta", "London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
  stats: { enabled: false, items: [{ value: "10,000+", label: "Videos created" }, { value: "500+", label: "USA/UK clients" }, { value: "4.9/5", label: "Average rating" }] },
  testimonials: [],
  plans: [
    { name: "Starter", listPrice: 20, features: ["Core video tools", "Image to Video", "Standard support"] },
    { name: "Creator", listPrice: 50, popular: true, features: ["UGC Generator", "Talking Avatar", "Motion Control", "Priority support"] },
    { name: "Pro", listPrice: 120, features: ["All 20+ tools", "Highest limits", "Team onboarding help"] },
  ],
  whyUs: [
    { title: "50% OFF every tool", text: "One offer across the full Higgsfield toolset." },
    { title: "Fast setup", text: "Send the form and hear back quickly." },
    { title: "Direct support", text: "Talk to a person, not a ticket queue." },
    { title: "Clear terms", text: "You know exactly what you pay before you start." },
    { title: "Built for USA & UK", text: "Support hours and examples for your market." },
    { title: "Made for editors and ad creators", text: "UGC ads, avatars and product videos in minutes." },
  ],
  faqs: [
    { q: "What is the Higgsfield membership and how do I get it at 50% OFF?", a: "Higgsfield is an AI platform for video and image creation. Through our offer you can get access to its tools at 50% OFF. Send the form on this page and our team will contact you with the next steps." },
    { q: "How much does a Higgsfield subscription cost with your offer?", a: "Our pricing page shows every plan at half of the list price. Our team confirms the exact amount with you before you pay, so there are no surprises." },
    { q: "Is there a cheap Higgsfield subscription for video editors and creators?", a: "Yes. Our 50% OFF offer is built for editors, creators and ad makers who want Higgsfield tools at a lower monthly price." },
    { q: "How can I get a discounted Higgsfield AI subscription in the USA?", a: "Fill in the form and choose your US city. We serve creators across the United States, from New York and Los Angeles to Miami, Chicago, Austin and Seattle." },
    { q: "How can I get a discounted Higgsfield AI subscription in the UK?", a: "Fill in the form and choose your UK city. We serve creators in London, Manchester, Birmingham, Leeds, Glasgow and across the United Kingdom." },
    { q: "Which Higgsfield tools are included in the 50% OFF offer?", a: "The offer covers the Higgsfield toolset, including the AI Video Generator, UGC Generator, Talking Avatar, Image to Video, Motion Control and more. Tell us which tools you need in the form." },
    { q: "Can I make UGC ads with Higgsfield?", a: "Yes. The UGC Generator helps you create creator-style video ads for TikTok, Instagram and Facebook without hiring actors or filming each version." },
    { q: "What is a talking avatar and how do I create one?", a: "A talking avatar is an AI character that speaks your script on camera. With the Talking Avatar tool you add a script and generate a spokesperson video for ads, explainers or social posts." },
    { q: "How does image to video AI work?", a: "You upload a still image, describe the movement you want, and the AI turns it into a short video clip. It is useful for product shots, portraits and social content." },
    { q: "What is Motion Control in Higgsfield?", a: "Motion Control lets you guide how a subject or camera moves in a generated video, so you get more predictable results than with a plain text prompt." },
    { q: "Is Higgsfield good for TikTok and Instagram Reels?", a: "Many creators use AI video tools to produce short vertical clips for TikTok, Reels and Shorts quickly. You can test several hooks and versions in less time." },
    { q: "Can video editors use Higgsfield in their workflow?", a: "Yes. Editors use AI tools to create b-roll, backgrounds, avatars and motion clips, then finish the edit in their usual editing software." },
    { q: "Can I use it to make product videos for Shopify or e-commerce ads?", a: "Yes. The Product Video Maker and Image to Video tools help you turn product photos into short promo clips for your store and ad campaigns." },
    { q: "Is this suitable for agencies and marketing teams?", a: "Yes. Agencies use AI video tools to produce more ad variations for clients. Tell us your team size in the form and we will advise on the right plan." },
    { q: "Which AI video generator is best for making ads?", a: "It depends on your style and budget. Higgsfield is popular with creators for UGC-style ads, avatars and motion effects, and our offer lowers the cost of trying it." },
    { q: "How do I make AI UGC ads step by step?", a: "Pick a product, write a short script, choose an avatar or UGC style, generate the video, then add captions and music in your editor. Repeat with different hooks to see what performs." },
    { q: "Can I use an AI lip sync tool for my videos?", a: "Yes. Lip sync tools match mouth movement to your audio or script, which is useful for avatars, dubbing and multi-language ads." },
    { q: "How does payment work after I submit the form?", a: "Our team contacts you after you submit the form and explains the available payment steps. You only pay once you agree to the price and plan." },
    { q: "How quickly will I hear back from your team?", a: "We aim to reply as soon as possible after you submit the form. Make sure your email address is correct so we can reach you." },
    { q: "Is the 50% OFF price real?", a: "The 50% OFF applies to the plan prices shown on our pricing page. Our team confirms the exact price and what is included before you pay." },
    { q: "Are you the official Higgsfield company?", a: "No. We are an independent provider of this offer. Higgsfield is a trademark of its respective owner, and we are not affiliated with it unless stated on this site." },
    { q: "Can I get a refund or cancel my plan?", a: "Cancellation and refund terms depend on the plan you choose. Ask our team before you pay and they will explain the terms clearly." },
    { q: "Do I need editing or design experience?", a: "No. The tools are built so beginners can create videos from text or images. Experienced editors can go further by combining them with their existing workflow." },
    { q: "Can I use the videos for commercial work and client projects?", a: "Usage rights depend on the plan and the platform's terms. Ask our team which plan fits commercial or client work before you buy." },
    { q: "How do I choose between plans?", a: "Starter suits light use, Creator suits regular UGC and avatar work, and Pro suits heavy or team use. Tell us how many videos you make each month and we will suggest one." },
    { q: "Do you serve cities that are not listed on your site?", a: "Yes. We help creators across the USA and UK. Pick the closest city in the form or send us your details and we will get in touch." },
    { q: "What do you do with the details I send in the form?", a: "We use your name, email, city and the service you need only to contact you about the offer." },
    { q: "Why choose your offer over buying directly?", a: "Our offer gives you 50% OFF the plan prices shown on this site, with a real person to help you choose a plan and get started." },
  ],
  guides: [
  {
    "slug": "higgsfield-pricing-explained",
    "title": "Higgsfield Pricing Explained: Plans, Credits and Real Cost",
    "description": "How Higgsfield plans and credits work, why the sticker price is not the real cost, and how to choose a plan without wasting credits.",
    "updated": "October 2026",
    "intro": "Higgsfield is a credit-based AI platform. You pay a monthly fee and spend credits each time you generate an image or a video. Once you understand credits, you understand what you will really pay.",
    "sections": [
      {
        "h": "How Higgsfield credits work",
        "p": [
          "Every generation spends credits. The cost depends on the model you choose, the resolution and the length of the clip, and the credit cost is shown before you confirm.",
          "Images cost far fewer credits than video, and premium video models cost much more than lighter ones."
        ]
      },
      {
        "h": "Plan names and prices change often",
        "p": [
          "Higgsfield has changed its plan names, prices and credit amounts more than once, and different websites list different numbers. Always read the official pricing page and the final checkout screen before you pay.",
          "Compare plans by monthly credits and included models, not by the plan name."
        ]
      },
      {
        "h": "Why the sticker price is not the real cost",
        "p": [
          "Most creators need several attempts before one clip is usable. If you need three attempts per final clip, your real cost per clip is roughly three times the cost of one generation.",
          "Subscription credits reset every billing cycle and generally do not roll over, so pick an allowance you will actually use."
        ]
      },
      {
        "h": "How to choose a plan",
        "p": [
          "Light users who test now and then need a small plan. Regular creators and small brands usually need a mid-level plan. Studios and daily producers need the highest credit tier or a team plan.",
          "Estimate your month first: how many final clips you need, how many attempts each takes and which model you will use."
        ]
      },
      {
        "h": "Where our 50% OFF offer fits",
        "p": [
          "Our offer is designed to lower what you pay for access to Higgsfield tools. Send the form and our team will confirm the exact price, what is included and the billing terms before you pay."
        ]
      }
    ]
  },
  {
    "slug": "higgsfield-discount-promo-code",
    "title": "Higgsfield Discount and Promo Code: How to Pay Less",
    "description": "Honest ways to pay less for Higgsfield: annual billing, promotions, checking promo codes and what to ask any seller of discounted access.",
    "updated": "October 2026",
    "intro": "People search for a Higgsfield discount code every day. Here is what usually works, what usually does not, and how to avoid wasting money.",
    "sections": [
      {
        "h": "Ways people lower the price",
        "p": [
          "Annual billing is usually cheaper per month than paying monthly. New-account promotions and welcome offers appear from time to time. Check the pricing page for what is available today."
        ]
      },
      {
        "h": "Be careful with coupon sites",
        "p": [
          "Many coupon pages list codes that expired long ago, and no code is guaranteed to work. A real discount shows up in the total at checkout, so always check the final amount before you pay."
        ]
      },
      {
        "h": "Check renewal and credit terms",
        "p": [
          "A lower first payment can renew at a higher price. Read the billing period, renewal terms and monthly credits. Remember that subscription credits generally reset each cycle."
        ]
      },
      {
        "h": "Questions to ask any seller of discounted access",
        "p": [
          "Ask exactly what you receive, for how long, under what terms, how support works and what happens if something goes wrong. A trustworthy seller answers clearly before you pay."
        ]
      },
      {
        "h": "Our 50% OFF offer",
        "p": [
          "We offer Higgsfield tools at 50% OFF the plan prices shown on our pricing page. Our team confirms the exact price and terms before you pay. Send the form to start."
        ]
      }
    ]
  },
  {
    "slug": "is-higgsfield-free",
    "title": "Is Higgsfield AI Free? Free Plan vs Paid Plans",
    "description": "Is Higgsfield free? A plain explanation of the free plan, its limits, and when a paid plan makes sense for creators and editors.",
    "updated": "October 2026",
    "intro": "Short answer: you can try the platform for free, but serious video work needs a paid plan.",
    "sections": [
      {
        "h": "What the free plan is for",
        "p": [
          "The free plan is meant for exploring the interface. According to published pricing details it has very limited use, little or no video generation and restricted commercial rights. Terms change, so check the official site."
        ]
      },
      {
        "h": "Why video is rarely free",
        "p": [
          "Generating video uses expensive computing power, so almost every AI video service limits free use. This is true across the industry, not only for Higgsfield."
        ]
      },
      {
        "h": "When to move to a paid plan",
        "p": [
          "Upgrade when you need video generation, higher resolution, more parallel generations or commercial use for clients and ads."
        ]
      },
      {
        "h": "Paying less for a paid plan",
        "p": [
          "Compare annual and monthly billing, look for current promotions, and pick the smallest plan that covers your real monthly use. Our 50% OFF offer can also lower the price. Send the form and our team will explain the details."
        ]
      }
    ]
  },
  {
    "slug": "higgsfield-alternatives",
    "title": "Higgsfield Alternatives: Cheaper AI Video Tools Compared",
    "description": "A fair look at Higgsfield alternatives for editors and ad creators, and how to choose the right AI video tool for your budget.",
    "updated": "October 2026",
    "intro": "Higgsfield is popular, but it is not the only option. The right tool depends on what you make and how much you want to spend.",
    "sections": [
      {
        "h": "What Higgsfield is good at",
        "p": [
          "Higgsfield brings many image and video models into one subscription and adds its own tools, such as Cinema Studio and Soul ID. Many creators like having everything in one place."
        ]
      },
      {
        "h": "Other tools people compare",
        "p": [
          "Runway is a well-known choice for editors. Kling is often used for animating portraits and short clips. Luma is known for realistic motion. HeyGen focuses on AI avatars. Creatify focuses on turning a product link into video ads."
        ]
      },
      {
        "h": "How to choose",
        "p": [
          "Pick by use case. UGC-style ads and avatars point to avatar-focused tools. Cinematic clips point to multi-model platforms. Product ads point to URL-to-video tools. Test with a small plan first."
        ]
      },
      {
        "h": "Check prices yourself",
        "p": [
          "Plans and prices for all of these tools change often. Check each official pricing page before you decide."
        ]
      },
      {
        "h": "Want Higgsfield for less?",
        "p": [
          "If Higgsfield fits your work, our 50% OFF offer can lower the cost. Send the form and we will confirm the details."
        ]
      }
    ]
  },
  {
    "slug": "cheap-ai-tools-for-video-editing",
    "title": "Cheap AI Tools for Video Editing: A Practical Guide",
    "description": "How video editors and creators can use affordable AI tools for b-roll, avatars, captions and upscaling without overspending.",
    "updated": "October 2026",
    "intro": "You do not need an expensive stack to add AI to your editing workflow. Start with the jobs that cost you the most time.",
    "sections": [
      {
        "h": "Tool types worth paying for",
        "p": [
          "AI video generators create b-roll and short clips. Avatar and UGC tools create spokespeople. Upscalers sharpen footage. Caption tools save hours on subtitles. Audio cleanup tools fix poor recordings."
        ]
      },
      {
        "h": "How to keep costs down",
        "p": [
          "Start with one tool, not five. Draft at lower resolution and render only the final version in high quality. Use annual billing if you are sure you will keep using the tool."
        ]
      },
      {
        "h": "Avoid wasting credits",
        "p": [
          "Write clear prompts, generate short clips and reuse good results. Credit-based tools charge for every attempt, so planning saves money."
        ]
      },
      {
        "h": "A simple workflow",
        "p": [
          "Plan the shots, generate clips with an AI video tool, finish the edit in your editor, then add captions and sound. Test two or three hooks and keep what performs."
        ]
      },
      {
        "h": "Get Higgsfield tools at 50% OFF",
        "p": [
          "If you want a multi-tool platform for video, UGC ads and avatars, our offer gives you 50% OFF the plan prices on our site. Send the form to get started."
        ]
      }
    ]
  },
  {
    "slug": "ai-ugc-ads-guide",
    "title": "How to Make AI UGC Ads Step by Step",
    "description": "A step-by-step guide to making UGC-style video ads with AI for TikTok, Instagram and Facebook.",
    "updated": "October 2026",
    "intro": "UGC-style ads feel like a real person talking to the camera. AI tools let you make many versions quickly.",
    "sections": [
      {
        "h": "Step 1: Pick one product and one promise",
        "p": [
          "Choose a single product and one clear benefit. Focused ads perform better than ads that try to say everything."
        ]
      },
      {
        "h": "Step 2: Write a short script",
        "p": [
          "Open with a hook in the first three seconds, show the problem, show the product, then end with one clear call to action. Keep it under 30 seconds."
        ]
      },
      {
        "h": "Step 3: Choose an avatar or UGC style",
        "p": [
          "Pick a presenter that fits your audience and match tone and setting to your brand. Use a UGC generator or talking avatar tool to produce the video."
        ]
      },
      {
        "h": "Step 4: Finish in your editor",
        "p": [
          "Add captions, music and your logo. Most viewers watch without sound, so captions matter."
        ]
      },
      {
        "h": "Step 5: Test and improve",
        "p": [
          "Make several versions with different hooks, run them with a small budget and keep the best ones. Follow each platform's advertising rules."
        ]
      },
      {
        "h": "Make more versions for less",
        "p": [
          "Our offer gives you the Higgsfield UGC Generator and other tools at 50% OFF the plan prices on our site. Send the form to get started."
        ]
      }
    ]
  },
  {
    "slug": "is-higgsfield-worth-it",
    "title": "Is Higgsfield Worth It? Pros, Cons and Who It Is For",
    "description": "An honest look at Higgsfield for video editors, creators and ad makers: strengths, weaknesses and who should skip it.",
    "updated": "October 2026",
    "intro": "Whether Higgsfield is worth it depends on how much you create and how you manage credits.",
    "sections": [
      {
        "h": "Pros",
        "p": [
          "Many models and tools in one subscription. Strong tools for cinematic clips, avatars and ads. Fast for testing several ad versions."
        ]
      },
      {
        "h": "Cons",
        "p": [
          "Credits can run out quickly when you iterate. Subscription credits generally reset each cycle. Premium video models use many credits per clip."
        ]
      },
      {
        "h": "Who it suits",
        "p": [
          "Editors, creators, e-commerce brands and agencies that produce video ads often and want many tools in one place."
        ]
      },
      {
        "h": "Who should skip it",
        "p": [
          "Very occasional users may not need a paid plan. If you only need one narrow tool, a single-purpose app may cost less."
        ]
      },
      {
        "h": "Lower the cost",
        "p": [
          "The same plans can cost less through our 50% OFF offer. Send the form and our team will explain the price, terms and what is included."
        ]
      }
    ]
  }
],
  usCities: [
    { slug: "new-york", name: "New York", formName: "New York", areas: ["Brooklyn", "Manhattan", "Queens"], hook: "fast-moving ad agencies, real estate teams and DTC brands" },
    { slug: "los-angeles", name: "Los Angeles", formName: "LA", areas: ["Hollywood", "Santa Monica", "Silver Lake"], hook: "the entertainment, fashion and influencer content scene" },
    { slug: "houston", name: "Houston", formName: "Houston", areas: ["Montrose", "The Heights", "Katy"], hook: "healthcare, energy and local service businesses" },
    { slug: "miami", name: "Miami", formName: "Miami", areas: ["Wynwood", "Brickell", "South Beach"], hook: "lifestyle, tourism and luxury real estate brands" },
    { slug: "chicago", name: "Chicago", formName: "Chicago", areas: ["The Loop", "Wicker Park", "West Loop"], hook: "marketing agencies and e-commerce teams" },
    { slug: "san-francisco", name: "San Francisco", formName: "SF", areas: ["SoMa", "Mission District", "Oakland"], hook: "startups and SaaS teams that need launch videos fast" },
    { slug: "austin", name: "Austin", formName: "Austin", areas: ["South Congress", "East Austin", "Round Rock"], hook: "the startup and festival creator community" },
    { slug: "dallas", name: "Dallas", formName: "Dallas", areas: ["Deep Ellum", "Uptown", "Plano"], hook: "real estate, retail and franchise marketing" },
    { slug: "seattle", name: "Seattle", formName: "Seattle", areas: ["Capitol Hill", "Ballard", "Bellevue"], hook: "tech and outdoor brands" },
    { slug: "atlanta", name: "Atlanta", formName: "Atlanta", areas: ["Midtown", "Buckhead", "Decatur"], hook: "music, film and the creator economy" },
  ],
  ukCities: [
    { slug: "london", name: "London", formName: "London", areas: ["Shoreditch", "Soho", "Camden"], hook: "agencies, fashion labels and fintech brands" },
    { slug: "manchester", name: "Manchester", formName: "Manchester", areas: ["Northern Quarter", "Salford Quays", "Ancoats"], hook: "digital agencies and media production" },
    { slug: "birmingham", name: "Birmingham", formName: "Birmingham", areas: ["Digbeth", "Jewellery Quarter", "Edgbaston"], hook: "retail, manufacturing and local service brands" },
    { slug: "leeds", name: "Leeds", formName: "Leeds", areas: ["Leeds Dock", "Headingley", "Chapel Allerton"], hook: "digital, retail and financial services brands" },
    { slug: "glasgow", name: "Glasgow", formName: "Glasgow", areas: ["West End", "Merchant City", "Finnieston"], hook: "creative studios and hospitality businesses" },
  ],
};

export const CONTENT_KEY = "site:content";

export function sanitize(input: any): SiteContent {
  const out: any = { ...DEFAULT_CONTENT };
  for (const k of Object.keys(DEFAULT_CONTENT)) {
    const d = (DEFAULT_CONTENT as any)[k], v = input?.[k];
    if (v === undefined) continue;
    if (Array.isArray(d) ? Array.isArray(v) : typeof v === typeof d) out[k] = v;
  }
  return out;
}

export async function readStoredContent(): Promise<SiteContent> {
  try {
    const raw = await redis(["GET", CONTENT_KEY]);
    if (raw) return sanitize(JSON.parse(raw));
  } catch {}
  return DEFAULT_CONTENT;
}

export const getContent = unstable_cache(readStoredContent, ["site-content"], { tags: ["content"], revalidate: 300 });
