import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
import bgIllustrations from "@/assets/ill-buddha.png";
import bgMotions from "@/assets/card-bg-motions.jpg";
import bgProjects from "@/assets/proj-branding-1.jpg";
import bgResearch from "@/assets/proj-research-1.jpg";

const cardBackgrounds: Record<string, string> = {
  illustrations: bgIllustrations,
  motions: bgMotions,
  projects: bgProjects,
  research: bgResearch,
};

const Projects = () => {
  return (
    <section id="work" className="relative isolate overflow-hidden bg-background">
      {/* Blurred ambient background — accent + primary blobs framing the bento cards */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* Side glows */}
        <div className="absolute -left-40 top-[5%] h-[70vh] w-[70vh] rounded-full bg-accent/60 blur-[140px]" />
        <div className="absolute -right-40 top-[15%] h-[75vh] w-[75vh] rounded-full bg-primary/55 blur-[150px]" />
        <div className="absolute -left-32 bottom-[-10%] h-[60vh] w-[80vh] rounded-full bg-accent/50 blur-[160px]" />
        <div className="absolute -right-32 bottom-[5%] h-[55vh] w-[70vh] rounded-full bg-primary/45 blur-[150px]" />
        {/* Center wash so glow seeps between the bento cards */}
        <div className="absolute left-1/2 top-1/2 h-[55vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/35 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[11px] tracking-[0.4em] text-accent">
              ⌖ SELECTED PROJECTS
            </p>
            <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
              Project <span className="italic text-muted-foreground"></span>
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            A visual exploration of identity and motion, Build to communicate, engage and stand apart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              description={p.description}
              backgroundImage={cardBackgrounds[p.slug] ?? p.gallery?.[0]}
              featured={i === 0 || i === 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
