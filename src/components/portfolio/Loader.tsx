import { useEffect, useState } from "react";

const Loader = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // ---- Kung Fu style opening sound (Web Audio, no asset needed) ----
    let ctx: AudioContext | null = null;
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      ctx = new Ctx();
      const ac = ctx;

      const playWhoosh = (start: number, dur = 0.45, gainPeak = 0.25) => {
        const t = ac.currentTime + start;
        const buf = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const src = ac.createBufferSource();
        src.buffer = buf;
        const filter = ac.createBiquadFilter();
        filter.type = "bandpass";
        filter.Q.value = 0.9;
        filter.frequency.setValueAtTime(300, t);
        filter.frequency.exponentialRampToValueAtTime(3500, t + dur);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gainPeak, t + 0.07);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(filter);
        filter.connect(g);
        g.connect(ac.destination);
        src.start(t);
        src.stop(t + dur);
      };

      const playGong = (start: number) => {
        const t = ac.currentTime + start;
        const freqs = [82, 110, 165, 220, 277];
        const master = ac.createGain();
        master.gain.setValueAtTime(0.0001, t);
        master.gain.exponentialRampToValueAtTime(0.45, t + 0.04);
        master.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);
        master.connect(ac.destination);

        freqs.forEach((f, i) => {
          const osc = ac.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, t);
          osc.frequency.exponentialRampToValueAtTime(f * 0.96, t + 2.4);
          const g = ac.createGain();
          g.gain.value = 0.18 / (i + 1);
          osc.connect(g);
          g.connect(master);
          osc.start(t);
          osc.stop(t + 2.5);
        });

        // initial mallet thud
        const thudBuf = ac.createBuffer(1, ac.sampleRate * 0.15, ac.sampleRate);
        const td = thudBuf.getChannelData(0);
        for (let i = 0; i < td.length; i++)
          td[i] = (Math.random() * 2 - 1) * (1 - i / td.length);
        const thud = ac.createBufferSource();
        thud.buffer = thudBuf;
        const thudFilter = ac.createBiquadFilter();
        thudFilter.type = "lowpass";
        thudFilter.frequency.value = 220;
        const thudGain = ac.createGain();
        thudGain.gain.value = 0.5;
        thud.connect(thudFilter);
        thudFilter.connect(thudGain);
        thudGain.connect(ac.destination);
        thud.start(t);
      };

      // Sequence: two slashing whooshes, then gong on title slam
      playWhoosh(0.15, 0.35, 0.22);
      playWhoosh(0.55, 0.4, 0.25);
      playGong(1.05);
    } catch {
      // ignore audio failures (autoplay block, etc.)
    }

    const t = setTimeout(() => setHide(true), 3200);
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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-background animate-loader-slide">
      {/* Radial red glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.35),transparent_60%)]" />

      {/* Ink slash strokes */}
      <span className="absolute left-1/2 top-1/2 h-[3px] w-[140vw] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] bg-foreground/80 origin-left animate-slash-1" />
      <span className="absolute left-1/2 top-1/2 h-[3px] w-[140vw] -translate-x-1/2 -translate-y-1/2 rotate-[22deg] bg-accent origin-right animate-slash-2" />

      {/* Stamped seal */}
      <div
        className="absolute right-8 top-8 flex h-20 w-20 items-center justify-center rounded-md border-2 border-accent text-accent font-display text-2xl rotate-[-8deg] animate-stamp"
        style={{ animationDelay: "1.05s" }}
      >
        武
      </div>

      <p
        className="relative z-10 mb-5 text-[11px] tracking-[0.4em] text-muted-foreground animate-fade-blur"
        style={{ animationDelay: "0.2s" }}
      >
        ENTER THE PORTFOLIO
      </p>
      <h1
        className="relative z-10 font-display text-6xl md:text-9xl tracking-tight animate-title-slam"
        style={{ animationDelay: "1.05s" }}
      >
        Ashok <span className="italic text-accent">Thapa</span>
      </h1>
      <p
        className="relative z-10 mt-6 text-[11px] tracking-[0.4em] text-muted-foreground animate-fade-blur"
        style={{ animationDelay: "1.4s" }}
      >
        ⌖ CREATIVE · DESIGNER · ANIMATOR
      </p>
    </div>
  );
};

export default Loader;
