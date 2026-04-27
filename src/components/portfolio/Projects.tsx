import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <section id="work" className="relative overflow-hidden">
      {/* Blurred ambient background — accent + primary blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute -left-32 top-[10%] h-[55vh] w-[55vh] rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[40%] h-[60vh] w-[60vh] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[20%] h-[50vh] w-[70vh] rounded-full bg-accent/20 blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/0 to-background/60" />
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
              featured={i === 0 || i === 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
