import { useEffect, useState } from "react";

const Loader = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // ---- Cinematic Marvel-style opening sound (Web Audio, no asset needed) ----
    let ctx: AudioContext | null = null;
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      ctx = new Ctx();
      const ac = ctx;

      // Deep sub rumble — universe entry
      const playRumble = (start: number, dur = 2.2) => {
        const t = ac.currentTime + start;
        const osc = ac.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(35, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + dur);
        const filter = ac.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 180;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.35, t + dur * 0.6);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(filter);
        filter.connect(g);
        g.connect(ac.destination);
        osc.start(t);
        osc.stop(t + dur);
      };

      // Energy charge — rising whoosh
      const playCharge = (start: number, dur = 1.4) => {
        const t = ac.currentTime + start;
        const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const src = ac.createBufferSource();
        src.buffer = buf;
        const filter = ac.createBiquadFilter();
        filter.type = "bandpass";
        filter.Q.value = 4;
        filter.frequency.setValueAtTime(200, t);
        filter.frequency.exponentialRampToValueAtTime(6000, t + dur);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.3, t + dur * 0.85);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(filter);
        filter.connect(g);
        g.connect(ac.destination);
        src.start(t);
        src.stop(t + dur);
      };

      // Impact boom
      const playBoom = (start: number) => {
        const t = ac.currentTime + start;
        // Low thud
        const osc = ac.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.6);
        const og = ac.createGain();
        og.gain.setValueAtTime(0.9, t);
        og.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
        osc.connect(og);
        og.connect(ac.destination);
        osc.start(t);
        osc.stop(t + 1.2);

        // Noise crack
        const buf = ac.createBuffer(1, ac.sampleRate * 0.4, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++)
          d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        const src = ac.createBufferSource();
        src.buffer = buf;
        const f = ac.createBiquadFilter();
        f.type = "highpass";
        f.frequency.value = 1200;
        const g = ac.createGain();
        g.gain.value = 0.5;
        src.connect(f);
        f.connect(g);
        g.connect(ac.destination);
        src.start(t);
      };

      // Hero swell — final push-in
      const playSwell = (start: number) => {
        const t = ac.currentTime + start;
        const freqs = [110, 165, 220, 330];
        freqs.forEach((f) => {
          const osc = ac.createOscillator();
          osc.type = "sine";
          osc.frequency.value = f;
          const g = ac.createGain();
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(0.12, t + 0.6);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 2);
          osc.connect(g);
          g.connect(ac.destination);
          osc.start(t);
          osc.stop(t + 2);
        });
      };

      // Sequence
      playRumble(0.0, 1.8);     // 1. Universe entry
      playCharge(1.2, 1.2);     // 2. Energy build-up
      playBoom(2.35);           // 3. Impact
      playSwell(2.45);          // 4. Hero push-in
    } catch {
      // ignore audio failures
    }

    const t = setTimeout(() => setHide(true), 4600);
    return () => {
      clearTimeout(t);
      try {
        ctx?.close();
      } catch {
        /* noop */
      }
    };
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black animate-loader-slide">
      {/* 1. UNIVERSE — starfield zoom */}
      <div className="absolute inset-0 animate-universe-zoom">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(220_80%_15%/0.6),transparent_70%)]" />
        <div className="absolute inset-0 stars" />
        <div className="absolute inset-0 stars stars-2" />
        <div className="absolute inset-0 stars stars-3" />
      </div>

      {/* 2. ENERGY — charging particles + ring */}
      <div className="absolute inset-0 flex items-center justify-center animate-energy-fade">
        <div className="relative h-[40vmin] w-[40vmin]">
          {/* converging streaks */}
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-[2px] w-[60vmin] origin-left animate-energy-streak"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--accent)) 70%, hsl(0 0% 100%) 100%)",
                transform: `translate(-50%,-50%) rotate(${(i * 360) / 18}deg)`,
                animationDelay: `${(i % 6) * 0.05}s`,
              }}
            />
          ))}
          {/* charging core */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,hsl(var(--accent))_0%,hsl(var(--accent)/0.4)_30%,transparent_70%)] animate-core-pulse" />
          {/* expanding ring */}
          <div className="absolute inset-0 rounded-full border-2 border-accent animate-energy-ring" />
          <div className="absolute inset-0 rounded-full border border-accent/60 animate-energy-ring" style={{ animationDelay: "0.25s" }} />
        </div>
      </div>

      {/* 3. IMPACT — white flash */}
      <div className="absolute inset-0 bg-white animate-impact-flash pointer-events-none" />

      {/* 4. HERO — push-in title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center animate-hero-pushin">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.35),transparent_60%)]" />
        <p className="relative z-10 mb-5 text-[11px] tracking-[0.4em] text-muted-foreground">
          ENTER THE PORTFOLIO
        </p>
        <h1 className="relative z-10 font-display text-6xl md:text-9xl tracking-tight">
          Ashok <span className="italic text-accent">Thapa</span>
        </h1>
        <p className="relative z-10 mt-6 text-[11px] tracking-[0.4em] text-muted-foreground">
          ⌖ CREATIVE · DESIGNER · ANIMATOR
        </p>
      </div>
    </div>
  );
};

export default Loader;
