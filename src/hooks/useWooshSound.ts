import { useCallback, useRef } from "react";

/**
 * Plays a soft, smooth "woosh" sound on demand.
 * Filtered pink-ish noise via Web Audio API — no asset file required.
 * Tuned to be quiet and gentle for hover/click feedback.
 */
export const useWooshSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    try {
      if (typeof window === "undefined") return;

      if (!ctxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return;
        ctxRef.current = new AudioCtx();
      }

      const ctx = ctxRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const now = ctx.currentTime;
      const duration = 0.55;

      // Generate a short noise buffer
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Slight low-pass bias for softer noise
        data[i] = (Math.random() * 2 - 1) * 0.6;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Lowpass sweep high → low for a smooth airy woosh
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = 0.7;
      filter.frequency.setValueAtTime(3500, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      // Smooth fade-in then fade-out, very quiet
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Audio is non-critical — ignore failures.
    }
  }, []);

  return play;
};
