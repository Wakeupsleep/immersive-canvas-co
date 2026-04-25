import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, projects } from "@/data/projects";
import Cursor from "@/components/portfolio/Cursor";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <p className="mb-3 text-[11px] tracking-[0.4em] text-accent">
          ⌖ 404 / NOT FOUND
        </p>
        <h1 className="font-display text-5xl tracking-tight md:text-7xl">
          Project not found
        </h1>
        <Link to="/" className="mt-8">
          <Button variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Button>
        </Link>
      </main>
    );
  }

  const nextProject =
    projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

  return (
    <>
      <Cursor />
      <main className="min-h-screen bg-background text-foreground">
        {/* Top bar */}
        <header className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <span className="text-[11px] tracking-[0.4em] text-accent">
            ⌖ PROJECT / {project.slug.toUpperCase()}
          </span>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-12 md:px-12 md:pb-24 md:pt-20">
          <p className="mb-4 text-[11px] tracking-[0.4em] text-accent">
            ⌖ {project.category}
          </p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight md:text-9xl">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {project.description}
          </p>
        </section>

        {/* Hero visual */}
        <section className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div
            className={`relative h-[60vh] overflow-hidden rounded-[28px] border border-border bg-gradient-to-br ${project.hero}`}
          >
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <span className="text-[11px] tracking-[0.4em] text-muted-foreground">
                ⌖ FEATURED VISUAL
              </span>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
          <p className="mb-8 text-[11px] tracking-[0.4em] text-accent">
            ⌖ GALLERY
          </p>
          <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:auto-rows-[260px] md:grid-cols-3">
            {project.gallery.map((src, i) => (
              <div
                key={src}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  window.setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 120);
                }}
                className="group/img relative overflow-hidden rounded-2xl border border-border bg-secondary/30 row-span-2 transition-all duration-500 ease-out hover:z-10 hover:shadow-card md:hover:col-span-3 md:hover:row-span-3"
              >
                <img
                  src={src}
                  alt={`${project.title} visual ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Next project */}
        <section className="border-t border-border bg-gradient-hero">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-24 md:flex-row md:items-center md:justify-between md:px-12 md:py-32">
            <div>
              <p className="mb-3 text-[11px] tracking-[0.4em] text-accent">
                ⌖ NEXT PROJECT
              </p>
              <h2 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
                {nextProject.title}
              </h2>
            </div>
            <Link to={`/projects/${nextProject.slug}`}>
              <Button size="lg" className="h-16 rounded-2xl px-10 text-base font-semibold">
                View Next
                <ArrowUpRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-2 text-[10px] tracking-[0.3em] text-muted-foreground">
      {label}
    </p>
    <p className="text-sm text-foreground/90 md:text-base">{value}</p>
  </div>
);

export default ProjectDetail;
