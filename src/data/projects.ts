export interface ProjectSection {
  label: string;
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  hero: string;
  sections: ProjectSection[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "illustrations",
    title: "Illustrations",
    category: "Cultural Illustration",
    year: "2024",
    client: "Personal Series",
    role: "Illustrator & Art Director",
    description:
      "Illustrations that convey culture and lifestyle by visually expressing traditions, daily life, and unique ways of living.",
    hero: "from-amber-500/20 via-rose-500/10 to-transparent",
    sections: [
      {
        label: "OVERVIEW",
        heading: "A visual diary of culture",
        body: "An ongoing illustration series exploring traditions, rituals, and the small moments that define daily life. Each frame is built around storytelling, color, and a sense of place.",
      },
      {
        label: "PROCESS",
        heading: "From sketch to scene",
        body: "Hand-drawn explorations are refined into vector compositions, layered with grain and texture to feel printed rather than digital. Color palettes draw from local landscapes and textiles.",
      },
      {
        label: "RESULTS",
        heading: "Stories that travel",
        body: "Featured across editorial articles and social campaigns, the series has become a recognizable visual language for cultural storytelling.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/ill1/800/1000",
      "https://picsum.photos/seed/ill2/800/1000",
      "https://picsum.photos/seed/ill3/800/1000",
    ],
  },
  {
    slug: "motions",
    title: "Motions",
    category: "Motion Design",
    year: "2025",
    client: "Various Brands",
    role: "Motion Designer",
    description:
      "Editorial motion system designed like a premium visual series — built for kinetic identity, social, and broadcast.",
    hero: "from-sky-500/20 via-indigo-500/10 to-transparent",
    sections: [
      {
        label: "OVERVIEW",
        heading: "Motion as identity",
        body: "Crafting kinetic systems that extend a brand beyond the static page — title cards, transitions, and looping idents designed to feel cohesive across every surface.",
      },
      {
        label: "PROCESS",
        heading: "Storyboard, animate, refine",
        body: "Each piece begins with a storyboard, moves through a rough animatic, then is polished frame-by-frame in After Effects with custom easing curves and sound design notes.",
      },
      {
        label: "RESULTS",
        heading: "Brands that move",
        body: "Delivered across launch campaigns, product reveals, and broadcast packages — increasing engagement and recall across social platforms.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/mo1/1200/700",
      "https://picsum.photos/seed/mo2/1200/700",
      "https://picsum.photos/seed/mo3/1200/700",
    ],
  },
  {
    slug: "projects",
    title: "Projects",
    category: "Selected Work",
    year: "2024 — 2026",
    client: "Multiple Clients",
    role: "Lead Designer",
    description:
      "Fast-paced campaign visuals engineered for attention — covering social, OOH, and editorial work for ambitious brands.",
    hero: "from-emerald-500/20 via-teal-500/10 to-transparent",
    sections: [
      {
        label: "OVERVIEW",
        heading: "Campaigns that cut through",
        body: "A curated set of campaign work spanning launches, product drops, and seasonal storytelling — each project tailored to its audience and channel.",
      },
      {
        label: "PROCESS",
        heading: "Insight to execution",
        body: "Strategy sessions inform the visual direction, then rapid prototyping turns concepts into production-ready assets across formats.",
      },
      {
        label: "RESULTS",
        heading: "Numbers that matter",
        body: "Increased reach, conversion, and brand consistency — measured across the campaigns delivered for partner brands.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/pr1/1000/800",
      "https://picsum.photos/seed/pr2/1000/800",
      "https://picsum.photos/seed/pr3/1000/800",
    ],
  },
  {
    slug: "research",
    title: "Research",
    category: "Design Research",
    year: "2025",
    client: "Independent",
    role: "Researcher & Designer",
    description:
      "Exploratory studies on packaging, typography, and material — a sandbox for the ideas that shape future client work.",
    hero: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    sections: [
      {
        label: "OVERVIEW",
        heading: "Curiosity as practice",
        body: "Self-initiated research projects probing how design choices behave on the shelf, on screen, and in motion. The goal is always to learn something transferable.",
      },
      {
        label: "PROCESS",
        heading: "Test, iterate, document",
        body: "Each study runs as a small experiment — set the question, prototype, capture results, and document findings in a way that future projects can build on.",
      },
      {
        label: "RESULTS",
        heading: "A library of ideas",
        body: "An evolving archive of explorations that informs every commercial brief — making the studio sharper, faster, and more original.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/re1/900/900",
      "https://picsum.photos/seed/re2/900/900",
      "https://picsum.photos/seed/re3/900/900",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    category: "Brand Identity",
    year: "2025",
    client: "Studio Clients",
    role: "Brand Designer",
    description:
      "Identity systems built around story, symbol, and a tight visual language — designed to scale from app icon to billboard.",
    hero: "from-orange-500/20 via-red-500/10 to-transparent",
    sections: [
      {
        label: "OVERVIEW",
        heading: "Identities with intent",
        body: "Brand systems crafted from the strategy outward — logo, type, color, and motion working as one cohesive voice.",
      },
      {
        label: "PROCESS",
        heading: "Strategy to system",
        body: "Workshops define the brand's core, then design explorations refine the marks, palette, and rules into a usable toolkit.",
      },
      {
        label: "RESULTS",
        heading: "Brands that endure",
        body: "Identities delivered as full guideline systems — flexible enough to grow, strict enough to stay recognizable.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/br1/1000/1000",
      "https://picsum.photos/seed/br2/1000/1000",
      "https://picsum.photos/seed/br3/1000/1000",
    ],
  },
  {
    slug: "typography",
    title: "Typography",
    category: "Type Design",
    year: "2026",
    client: "Independent",
    role: "Type Designer",
    description:
      "Custom type explorations and lettering experiments — building voice through letterforms tailored to each brand.",
    hero: "from-cyan-500/20 via-blue-500/10 to-transparent",
    sections: [
      {
        label: "OVERVIEW",
        heading: "Letters with character",
        body: "From display faces to bespoke wordmarks, every glyph is drawn to add a layer of meaning beyond the words themselves.",
      },
      {
        label: "PROCESS",
        heading: "Sketch to vector",
        body: "Concepts begin on paper, move into Glyphs for refinement, and ship as production-ready font files or lockups.",
      },
      {
        label: "RESULTS",
        heading: "Type that speaks",
        body: "Custom typefaces and lettering used across packaging, editorial, and digital — giving brands a voice no off-the-shelf font can match.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/ty1/1100/800",
      "https://picsum.photos/seed/ty2/1100/800",
      "https://picsum.photos/seed/ty3/1100/800",
    ],
  },
  {
    slug: "web-design",
    title: "Web Design",
    category: "Digital Product",
    year: "2026",
    client: "Tech & Studio Clients",
    role: "Product & Web Designer",
    description:
      "Immersive websites and product surfaces — interaction, motion, and 3D blended into experiences that feel alive.",
    hero: "from-violet-500/20 via-pink-500/10 to-transparent",
    sections: [
      {
        label: "OVERVIEW",
        heading: "Sites that feel like worlds",
        body: "Designing digital experiences that go beyond pages — rich with motion, sound, and depth, while staying fast and accessible.",
      },
      {
        label: "PROCESS",
        heading: "Prototype in the browser",
        body: "Wireframes evolve directly into coded prototypes, letting motion and interaction inform the final visual design.",
      },
      {
        label: "RESULTS",
        heading: "Experiences that convert",
        body: "Launches that earn attention, awards, and most importantly — the audience's time on the page.",
      },
    ],
    gallery: [
      "https://picsum.photos/seed/we1/1200/800",
      "https://picsum.photos/seed/we2/1200/800",
      "https://picsum.photos/seed/we3/1200/800",
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
