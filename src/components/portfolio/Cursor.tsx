import { useEffect, useRef } from "react";

const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 9}px, ${e.clientY - 9}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-[18px] w-[18px] rounded-full border border-foreground mix-blend-difference md:block"
      aria-hidden
    />
  );
};

export default Cursor;
