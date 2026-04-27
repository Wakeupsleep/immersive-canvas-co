import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero px-6 pt-32 md:px-20 md:pt-40">
      <HeroBackground />
      <div className="absolute right-6 top-6 z-10 flex items-center gap-2 text-[11px] tracking-[0.4em] text-muted-foreground md:right-20 md:top-10">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        AVAILABLE FOR WORK · 2026
      </div>

      <div className="absolute left-6 top-6 z-10 text-[11px] tracking-[0.4em] text-muted-foreground md:left-20 md:top-10">
        PORTFOLIO
      </div>

      <div className="relative z-10 max-w-6xl">
        <p className="mb-6 text-[11px] tracking-[0.4em] text-accent">
          ⌖ Creative Designer/Animator
        </p>
        <h1 className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[10rem]">
          Ashok
          <br />
          <span className="italic text-muted-foreground">Thapa</span>
        </h1>
        <p className="mt-8 max-w-xl text-balance text-lg text-muted-foreground md:text-sm font-normal border border-none rounded">
          Graphic & Motion designer with 6+ years of experience in branding, social media, & motion graphics, delivering impactful visually striking designs.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-14 rounded-2xl px-8 text-base font-semibold">
            <a href="mailto:ashokthapa.np@gmail.com">
              Hire Me
              <ArrowUpRight className="ml-1 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 rounded-2xl border-border bg-transparent px-8 text-base font-semibold hover:bg-secondary"
          >
            <a href="#work">View Projects</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 right-6 hidden text-right text-[11px] tracking-[0.4em] text-muted-foreground md:block md:right-20">
        SCROLL ↓<br />
        <span className="mt-2 block text-foreground/40">TO EXPLORE</span>
      </div>
    </section>
  );
};

export default Hero;
