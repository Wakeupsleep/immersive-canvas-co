import { useEffect, useState } from "react";

const Loader = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 2900);
    return () => clearTimeout(t);
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background animate-loader-slide">
      <p className="mb-5 text-[11px] tracking-[0.4em] text-muted-foreground animate-fade-blur" style={{ animationDelay: "0.2s" }}>
        CREATIVE PORTFOLIO
      </p>
      <h1 className="font-display text-6xl md:text-8xl tracking-tight animate-fade-blur" style={{ animationDelay: "0.5s" }}>
        Ashok Thapa
      </h1>
    </div>
  );
};

export default Loader;
