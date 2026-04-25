import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
      <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-[11px] tracking-[0.4em] text-accent">
            ⌖ SELECTED WORK / 2024 — 2026
          </p>
          <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
            Project <span className="italic text-muted-foreground">Pages</span>
          </h2>
        </div>
        <p className="max-w-md text-base text-muted-foreground md:text-lg">
          A curated set of cinematic brand systems, campaigns, and editorial
          experiments built for ambitious clients.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProjectCard
          featured
          tag="FEATURED"
          title="Offline Campaign Series"
          description="Outdoor branding story with cinematic motion and bold visuals built for citywide impact."
          blocks={[
            { label: "OVERVIEW", text: "Campaign goals and concept." },
            { label: "PROCESS", text: "Research and execution." },
            { label: "RESULTS", text: "Premium attention impact." },
          ]}
        />
        <ProjectCard
          tag="TRENDING"
          title="Brand Poster Collection"
          description="Editorial poster system designed like a premium visual series."
        />
        <ProjectCard
          tag="TOP PICKS"
          title="Social Media Ads"
          description="Fast-paced campaign visuals engineered for attention."
        />
        <ProjectCard
          featured
          tag="NEW RELEASE"
          title="Packaging Explorations"
          description="Luxury packaging concepts with shelf-impact storytelling and tactile detailing."
        />
      </div>
    </section>
  );
};

export default Projects;
