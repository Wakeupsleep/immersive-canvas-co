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
    <section id="work" className="relative isolate overflow-hidden">

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
            <div
              key={p.slug}
              id={`project-${p.slug}`}
              className={`scroll-mt-24 ${i === 0 || i === 3 ? "md:col-span-2" : ""}`}
            >
              <ProjectCard
                slug={p.slug}
                title={p.title}
                description={p.description}
                backgroundImage={cardBackgrounds[p.slug] ?? p.gallery?.[0]}
                featured={i === 0 || i === 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
