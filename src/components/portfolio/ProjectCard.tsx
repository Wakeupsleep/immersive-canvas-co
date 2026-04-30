import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useWooshSound } from "@/hooks/useWooshSound";
import { useSwishSound } from "@/hooks/useSwishSound";

interface SubBlock {
  label: string;
  text: string;
}

interface ProjectCardProps {
  slug: string;
  tag?: string;
  title: string;
  description: string;
  blocks?: SubBlock[];
  featured?: boolean;
  backgroundImage?: string;
}

const ProjectCard = ({ slug, title, description, blocks, featured, backgroundImage }: ProjectCardProps) => {
  const playWoosh = useWooshSound();
  const playSwish = useSwishSound();

  return (
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={playWoosh}
      onClick={playSwish}
      className={`group relative block cursor-pointer overflow-hidden rounded-[28px] border border-border bg-gradient-card p-8 transition-smooth hover:-translate-y-2 hover:border-foreground/30 hover:shadow-card md:p-12 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Blurred cinematic background image */}
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl opacity-60 transition-smooth group-hover:opacity-80 group-hover:scale-125"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>
      )}

      <div className="relative z-10 mb-8 flex items-start justify-end">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-smooth group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <h3 className="relative z-10 font-display text-4xl leading-[1] tracking-tight md:text-6xl">
        {title}
      </h3>
      <p className="relative z-10 mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
        {description}
      </p>

      <div className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm text-foreground/70 transition-smooth group-hover:text-accent">
        ⌖ View Project
      </div>

      {blocks && (
        <div className="mt-10 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-3">
          {blocks.map((b) => (
            <div
              key={b.label}
              className="rounded-2xl border border-border bg-secondary/50 p-5"
            >
              <h4 className="mb-2 text-[10px] font-semibold tracking-[0.3em] text-muted-foreground">
                {b.label}
              </h4>
              <p className="text-sm text-foreground/90">{b.text}</p>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
