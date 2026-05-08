import { useEffect, useState } from "react";

const SidewaveLoader = () => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2400);
    return () => clearTimeout(t);
  }, []);
  if (hidden) return null;
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black animate-loader-slide">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-[40%] border border-white/70 animate-[mobius-spin_2.4s_linear_infinite]" />
        <div className="absolute inset-2 rounded-[40%] border border-white/40 animate-[mobius-spin_3.4s_linear_infinite_reverse]" />
        <div className="absolute inset-0 rounded-[40%] blur-2xl bg-white/10" />
      </div>
      <p className="mt-8 text-[11px] tracking-[0.4em] text-white/70 font-mono">
        PREPARING THE CONTENT. GOOD THINGS TAKE A FEW MILLISECONDS.
      </p>
    </div>
  );
};

export default SidewaveLoader;
