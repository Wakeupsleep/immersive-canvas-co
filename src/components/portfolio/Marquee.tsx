const items = [
  "Brand Identity",
  "★",
  "Campaign Design",
  "★",
  "Poster Art",
  "★",
  "Packaging",
  "★",
  "Motion Visuals",
  "★",
  "Editorial",
  "★",
];

const Marquee = () => {
  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-8">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-4xl md:text-6xl">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={item === "★" ? "text-accent" : "italic text-foreground/90"}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
