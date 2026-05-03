import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playWhoosh = () => {
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      const duration = 0.5;

      const bufferSize = ctx.sampleRate * duration;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 0.9;
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero px-6 pt-32 md:px-20 md:pt-40">
      <HeroBackground />
      <a
        href="/CV.pdf"
        download="Ashok-Thapa-CV.pdf"
        onMouseEnter={playWhoosh}
        className="absolute right-6 top-6 z-10 gap-2 tracking-[0.4em] md:right-20 md:top-10 bg-muted flex-row text-accent text-xs font-light flex items-center justify-center rounded-md px-4 py-2 hover:bg-secondary transition-colors"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        ➜] Download CV
      </a>

      <div className="absolute left-6 top-6 z-10 text-[11px] tracking-[0.4em] text-muted-foreground md:left-20 md:top-10">
        {"\n"}
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
