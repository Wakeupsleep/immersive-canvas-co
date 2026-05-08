import { useMemo } from "react";

const CHARS = "%—=_#=*}%€+?#--/%]#$}/€/]+&%—€@-$&^@]+-%^€]@+}}?<>{[/\\!§£&";

/** Decorative encrypted-looking string — randomly generated each mount. */
const GlitchText = ({ length = 80, className = "" }: { length?: number; className?: string }) => {
  const text = useMemo(() => {
    let s = "";
    for (let i = 0; i < length; i++) s += CHARS[Math.floor(Math.random() * CHARS.length)];
    return s;
  }, [length]);
  return (
    <p className={`font-mono text-[11px] leading-relaxed tracking-wider text-white/30 break-all ${className}`}>
      {text}
    </p>
  );
};

export default GlitchText;
