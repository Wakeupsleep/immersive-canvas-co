import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useHoverSound } from "@/hooks/useHoverSound";

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
}

const ProjectCard = ({ slug, title, description, blocks, featured }: ProjectCardProps) => {
  const playHoverSound = useHoverSound();

  return (
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={playHoverSound}
      className={`group relative block cursor-pointer overflow-hidden rounded-[28px] border border-border bg-gradient-card p-8 transition-smooth hover:-translate-y-2 hover:border-foreground/30 hover:shadow-card md:p-12 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="mb-8 flex items-start justify-end">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-smooth group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <h3 className="font-display text-4xl leading-[1] tracking-tight md:text-6xl">
        {title}
      </h3>
      <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
        {description}
      </p>

      <div className="mt-8 inline-flex items-center gap-2 text-sm text-foreground/70 transition-smooth group-hover:text-accent">
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
