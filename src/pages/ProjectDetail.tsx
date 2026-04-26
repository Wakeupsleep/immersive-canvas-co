import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getProjectBySlug, projects } from "@/data/projects";
import Cursor from "@/components/portfolio/Cursor";
import { useSwishSound } from "@/hooks/useSwishSound";
import motion1 from "@/assets/motion-1.mp4";
import motion2 from "@/assets/motion-2.mp4";
import motion3 from "@/assets/motion-3.mp4";
import illBuddha from "@/assets/ill-buddha.png";
import illDog from "@/assets/ill-dog.png";
import illArt3 from "@/assets/ill-art3.png";
import illNike from "@/assets/ill-nike.png";
import illOwl from "@/assets/ill-owl.png";
import illMusic from "@/assets/ill-music.png";
import illMusic2 from "@/assets/ill-music2.png";
import illBike1 from "@/assets/ill-bike1.png";
import illBike2 from "@/assets/ill-bike2.png";
import illArt2 from "@/assets/ill-art2.png";

const motionVideos: Record<string, string[]> = {
  motions: [motion1, motion2, motion3],
};

const illustrationImages: Record<string, { src: string; aspect: string; label: string }[]> = {
  illustrations: [
    { src: illBuddha, aspect: "aspect-[3/4]", label: "Buddha stupa illustration" },
    { src: illDog, aspect: "aspect-[2/3]", label: "Adoption poster" },
    { src: illArt3, aspect: "aspect-square", label: "Bhairav mask" },
    { src: illNike, aspect: "aspect-square", label: "Nike sneaker illustration" },
    { src: illOwl, aspect: "aspect-square", label: "Owl character" },
    { src: illMusic, aspect: "aspect-square", label: "Boombox figure" },
    { src: illMusic2, aspect: "aspect-square", label: "Cassette and pencil" },
    { src: illBike1, aspect: "aspect-square", label: "Motorcycle rider" },
    { src: illBike2, aspect: "aspect-square", label: "Bicycle rider" },
    { src: illArt2, aspect: "aspect-square", label: "Temple guardians" },
  ],
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const playSwish = useSwishSound();
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

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
            onClick={playSwish}
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

        {/* Gallery */}
        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
          <p className="mb-8 text-[11px] tracking-[0.4em] text-accent">
            ⌖ GALLERY
          </p>
          {motionVideos[project.slug] ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {motionVideos[project.slug].map((src, i) => (
                <div
                  key={src}
                  onMouseEnter={(e) => {
                    const v = e.currentTarget.querySelector("video");
                    if (v) {
                      v.muted = false;
                      v.volume = 1;
                      v.play().catch(() => {});
                    }
                  }}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget.querySelector("video");
                    if (v) v.muted = true;
                  }}
                  className="group/vid relative aspect-square overflow-hidden rounded-2xl border border-border bg-black transition-all duration-500 ease-out hover:z-10 hover:shadow-card"
                >
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={`${project.title} motion ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/vid:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          ) : illustrationImages[project.slug] ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {illustrationImages[project.slug].map((item) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setLightbox({ src: item.src, label: item.label })}
                  aria-label={`Open ${item.label}`}
                  className={`group/img relative w-full ${item.aspect} cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-secondary/30 transition-all duration-500 ease-out hover:z-10 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.02]"
                  />
                </button>
              ))}
            </div>
          ) : (
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
          )}
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
            <Link to={`/projects/${nextProject.slug}`} onClick={playSwish}>
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
