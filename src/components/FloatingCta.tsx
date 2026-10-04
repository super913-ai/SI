import { BadgePercent } from "lucide-react";
export default function FloatingCta({ label }: { label: string }) {
  return (
    <a href="/#lead-form"
       className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 via-lime-500 to-emerald-400 px-5 py-3 text-sm font-semibold shadow-lg shadow-lime-600/40 hover:scale-105 transition">
      <BadgePercent className="h-5 w-5" /> {label}
    </a>
  );
}
