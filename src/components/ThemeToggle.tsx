"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => { setLight(document.documentElement.classList.contains("light")); }, []);

  function set(l: boolean) {
    setLight(l);
    document.documentElement.classList.toggle("light", l);
    try { localStorage.setItem("theme", l ? "light" : "dark"); } catch {}
  }
  const b = (active: boolean) =>
    `grid h-8 w-8 place-items-center rounded-full transition ${active ? "bg-gradient-to-br from-green-500 to-lime-500 text-white" : "text-white/60 hover:text-white"}`;

  return (
    <div className="glass flex items-center rounded-full p-0.5" role="group" aria-label="Theme">
      <button type="button" onClick={() => set(false)} aria-label="Night mode" aria-pressed={!light} className={b(!light)}><Moon className="h-4 w-4" /></button>
      <button type="button" onClick={() => set(true)} aria-label="Light mode" aria-pressed={light} className={b(light)}><Sun className="h-4 w-4" /></button>
    </div>
  );
}
