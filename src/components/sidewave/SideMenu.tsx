import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "origin", label: "ORIGIN" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "SERVICES" },
  { id: "usecases", label: "USE CASES" },
  { id: "contact", label: "CONTACT" },
];

const SideMenu = () => {
  const [active, setActive] = useState("origin");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-44 flex-col items-start justify-between border-r border-white/5 bg-black/70 px-6 py-8 backdrop-blur-md md:flex">
      <a href="#origin" className="font-display text-2xl tracking-tight">
        ashok<span className="text-accent">.</span>
      </a>

      <nav className="flex flex-col gap-5">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`group flex items-center gap-3 text-[11px] tracking-[0.35em] transition-colors ${
              active === s.id ? "text-white" : "text-white/40 hover:text-white/80"
            }`}
          >
            <span
              className={`h-px transition-all ${
                active === s.id ? "w-8 bg-accent" : "w-3 bg-white/30"
              }`}
            />
            {s.label}
          </a>
        ))}
      </nav>

      <p className="text-[10px] leading-relaxed tracking-[0.2em] text-white/30">
        SCROLL<br />TO DISCOVER ↓
      </p>
    </aside>
  );
};

export default SideMenu;
