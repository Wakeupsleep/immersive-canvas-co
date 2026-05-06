import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgIllustrations from "@/assets/ill-buddha.png";
import bgMotions from "@/assets/card-bg-motions.jpg";
import bgProjects from "@/assets/proj-branding-1.jpg";
import bgResearch from "@/assets/proj-research-1.jpg";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  slug: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  span: "featured" | "medium" | "wide";
}

const CARDS: Card[] = [
  {
    slug: "illustrations",
    title: "Illustrations",
    tag: "Cultural Series",
    description:
      "A visual diary of culture and lifestyle — illustrations that capture tradition, ritual, and the small moments of daily life.",
    image: bgIllustrations,
    span: "featured",
  },
  {
    slug: "motions",
    title: "Motions",
    tag: "Motion Design",
    description:
      "Editorial motion built like a kinetic identity system — for social, broadcast, and product.",
    image: bgMotions,
    span: "medium",
  },
  {
    slug: "projects",
    title: "Projects",
    tag: "Selected Work",
    description:
      "Campaign visuals engineered for attention across social, OOH, and editorial.",
    image: bgProjects,
    span: "medium",
  },
  {
    slug: "research",
    title: "Research",
    tag: "Design Research",
    description:
      "Exploratory studies on packaging, typography, and material — a sandbox for ideas that shape future work.",
    image: bgResearch,
    span: "wide",
  },
];

const CinematicProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      // Cards fade-up stagger
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".scene-card");
      if (cards && cards.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          scale: 0.96,
          filter: "blur(12px)",
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative isolate overflow-hidden py-32 md:py-48"
    >
      {/* Cinematic ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, hsl(210 100% 60% / 0.10), transparent 55%), radial-gradient(ellipse at 80% 100%, hsl(0 100% 62% / 0.08), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <div
          ref={headerRef}
          className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-[11px] tracking-[0.4em] text-accent">
              ⌖ SELECTED WORK
            </p>
            <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
              A second <span className="italic text-muted-foreground">scene.</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            A visual exploration of identity and motion — built to communicate, engage, and stand apart.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        >
          {CARDS.map((c) => (
            <Link
              key={c.slug}
              to={`/projects/${c.slug}`}
              className={`scene-card group relative block overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-700 ease-out hover:-translate-y-2 hover:border-white/25 ${
                c.span === "featured" || c.span === "wide" ? "md:col-span-2" : ""
              }`}
              style={{
                minHeight:
                  c.span === "featured"
                    ? "560px"
                    : c.span === "wide"
                    ? "440px"
                    : "440px",
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0" aria-hidden>
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center blur-md opacity-80 transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:blur-[2px] group-hover:opacity-100"
                  style={{ backgroundImage: `url(${c.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
                <div className="absolute inset-0 bg-background/20" />
              </div>

              {/* Soft hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px z-0 rounded-[28px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "0 0 60px hsl(210 100% 70% / 0.25), inset 0 0 60px hsl(210 100% 70% / 0.08)",
                }}
              />

              <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
                <div className="flex items-start justify-between">
                  <p className="text-[10px] tracking-[0.4em] text-foreground/60">
                    {c.tag.toUpperCase()}
                  </p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-white/60 group-hover:bg-white group-hover:text-background">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
                    {c.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm text-muted-foreground md:text-base">
                    {c.description}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.3em] text-foreground/70 transition-colors group-hover:text-accent">
                    ⌖ VIEW PROJECT
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicProjects;
