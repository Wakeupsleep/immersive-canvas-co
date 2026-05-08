import GlitchText from "./GlitchText";

const SectionShell = ({
  id,
  tag,
  subtitle,
  children,
}: {
  id: string;
  tag: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="relative flex min-h-screen w-full flex-col justify-center px-8 py-32 md:pl-56 md:pr-20"
  >
    <div className="mb-12 flex items-baseline gap-6">
      <span className="text-[11px] tracking-[0.4em] text-accent">— {tag}</span>
      {subtitle && (
        <span className="text-[11px] tracking-[0.3em] text-white/40">{subtitle}</span>
      )}
    </div>
    {children}
  </section>
);

export const OriginSection = () => (
  <SectionShell id="origin" tag="ORIGIN" subtitle="The foundation of our reality, purpose and capabilities.">
    <h2 className="font-display text-[12vw] leading-[0.9] md:text-[7rem]">
      A DIGITAL<br />
      <span className="italic text-white/60">CRAFTSMAN</span><br />
      BEYOND THE ORDINARY
    </h2>
    <div className="mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
      <GlitchText length={120} />
      <p className="text-sm leading-relaxed text-white/70">
        Six years of branding, motion and visual systems — translating ideas into striking,
        purposeful design that makes brands feel before they see.
      </p>
    </div>
  </SectionShell>
);

export const AboutSection = () => (
  <SectionShell id="about" tag="ABOUT" subtitle="The core of identity, values and perspective.">
    <h2 className="font-display text-[10vw] leading-[0.9] md:text-[6rem]">
      DRIFTING BETWEEN<br />
      <span className="italic text-white/60">FREQUENCIES</span>
    </h2>
    <div className="mt-12 grid max-w-5xl gap-10 md:grid-cols-3">
      {[
        { k: "VISION", v: "Design that anticipates the next move, not just the current trend." },
        { k: "TEAM", v: "Independent practice rooted in collaboration with selected studios." },
        { k: "INDUSTRY", v: "From sport and entertainment to fintech and lifestyle brands." },
      ].map((b) => (
        <div key={b.k} className="border-t border-white/10 pt-4">
          <p className="mb-3 text-[11px] tracking-[0.4em] text-accent">{b.k}</p>
          <p className="text-sm leading-relaxed text-white/70">{b.v}</p>
          <GlitchText length={60} className="mt-4" />
        </div>
      ))}
    </div>
  </SectionShell>
);

const SERVICES = [
  {
    title: "DESIGN",
    items: ["Brand Identity", "UX/UI Design", "3D / Graphic", "HMI Design"],
    body: "From concept to dimension. Ideas turn into visual systems that shape perception.",
  },
  {
    title: "MOTION",
    items: ["Motion Graphics", "Reels & Ads", "Title Sequences", "Loop Animations"],
    body: "Engineering rhythm. Movement designed to direct the eye and carry the message.",
  },
  {
    title: "DIRECTION",
    items: ["Creative Direction", "Art Direction", "Visual Strategy", "Brand Systems"],
    body: "A single point of ownership coordinating vision, execution and delivery.",
  },
  {
    title: "MARKETING",
    items: ["Social Campaigns", "Content Strategy", "Strategic Positioning", "Data-Driven Growth"],
    body: "Every interaction has a purpose. Every touchpoint drives action.",
  },
];

export const ServicesSection = () => (
  <SectionShell id="services" tag="SERVICES" subtitle="The engine of innovation, execution and craft.">
    <h2 className="font-display text-[10vw] leading-[0.9] md:text-[6rem]">
      WHERE NEW STATES<br />
      <span className="italic text-white/60">OF MATTER</span> CONVERGE.
    </h2>

    <div className="mt-16 grid max-w-5xl grid-cols-2 gap-12 md:grid-cols-4">
      {[
        { n: "6+", l: "YEARS" },
        { n: "145%", l: "AVG GROWTH" },
        { n: "60+", l: "PROJECTS" },
        { n: "20+", l: "BRANDS" },
      ].map((s) => (
        <div key={s.l}>
          <p className="font-display text-5xl md:text-6xl">{s.n}</p>
          <p className="mt-2 text-[10px] tracking-[0.4em] text-white/40">{s.l}</p>
        </div>
      ))}
    </div>

    <div className="mt-20 grid gap-px bg-white/10 md:grid-cols-2">
      {SERVICES.map((svc) => (
        <div key={svc.title} className="bg-background p-8 transition-colors hover:bg-white/5">
          <p className="text-[11px] tracking-[0.4em] text-accent">{svc.title}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{svc.body}</p>
          <ul className="mt-6 space-y-2 text-sm text-white/90">
            {svc.items.map((i) => (
              <li key={i} className="border-b border-white/10 pb-2">{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SectionShell>
);

const CASES = [
  ["NIKE-INSPIRED", "Sport Campaign"],
  ["LIFESTYLE BRAND", "Identity System"],
  ["FINTECH", "Product Launch"],
  ["MUSIC LABEL", "Motion Reel"],
  ["RESTAURANT", "Brand Direction"],
  ["FASHION", "Editorial Series"],
  ["AGENCY", "Visual Language"],
  ["STARTUP", "Pitch Deck Motion"],
];

export const UseCasesSection = () => (
  <SectionShell id="usecases" tag="USE CASES" subtitle="Selected execution, projects and results.">
    <h2 className="font-display text-[10vw] leading-[0.9] md:text-[6rem]">
      LIMITS<br />
      <span className="italic text-white/60">NOT FOUND</span>
    </h2>

    <div className="mt-16 max-w-5xl">
      <p className="mb-6 text-[11px] tracking-[0.4em] text-accent">— SELECTED WORK</p>
      <ul className="divide-y divide-white/10 border-y border-white/10">
        {CASES.map(([client, kind]) => (
          <li
            key={client}
            className="group flex items-center justify-between py-5 transition-colors hover:bg-white/5"
          >
            <span className="font-display text-2xl md:text-3xl">{client}</span>
            <span className="text-xs tracking-[0.3em] text-white/50 group-hover:text-accent">
              {kind} ↗
            </span>
          </li>
        ))}
      </ul>
    </div>
  </SectionShell>
);

export const ContactSection = () => (
  <SectionShell id="contact" tag="CONTACT" subtitle="Reach out. Start the conversation.">
    <h2 className="font-display text-[12vw] leading-[0.9] md:text-[8rem]">
      KEEP IN<br />
      <span className="italic text-white/60">TOUCH</span>
    </h2>

    <div className="mt-16 grid max-w-4xl gap-12 md:grid-cols-2">
      <a
        href="mailto:ashokthapa.np@gmail.com"
        className="group flex flex-col gap-3 border border-white/10 p-8 transition-colors hover:border-accent hover:bg-white/5"
      >
        <span className="text-[11px] tracking-[0.4em] text-accent">REACH ME</span>
        <span className="font-display text-3xl">Get contacted</span>
        <span className="text-sm text-white/60">ashokthapa.np@gmail.com ↗</span>
      </a>
      <a
        href="/CV.pdf"
        download
        className="group flex flex-col gap-3 border border-white/10 p-8 transition-colors hover:border-accent hover:bg-white/5"
      >
        <span className="text-[11px] tracking-[0.4em] text-accent">CV</span>
        <span className="font-display text-3xl">Download CV</span>
        <span className="text-sm text-white/60">PDF · Latest version ↗</span>
      </a>
    </div>

    <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[10px] tracking-[0.3em] text-white/40">
      <span>© {new Date().getFullYear()} ASHOK THAPA</span>
      <span>MOTION · 3D · VISUAL ARCHITECT</span>
    </footer>
  </SectionShell>
);
