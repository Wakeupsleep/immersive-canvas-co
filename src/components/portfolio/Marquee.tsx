import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { projects } from "@/data/projects";

type IconConfig = {
  slug: string;
  label: string;
  x: number;
  geometry: "torus" | "octahedron" | "box" | "icosahedron";
  scale: number;
  detail?: number;
};

const iconConfigs: IconConfig[] = [
  { slug: "illustrations", label: "Illustrations", x: -4.8, geometry: "torus", scale: 1.05 },
  { slug: "motions", label: "Motions", x: -1.6, geometry: "octahedron", scale: 1.15, detail: 0 },
  { slug: "projects", label: "Projects", x: 1.6, geometry: "box", scale: 1.05 },
  { slug: "research", label: "Research", x: 4.8, geometry: "icosahedron", scale: 1.08, detail: 0 },
];

const useThemeColors = () => {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        foreground: "hsl(0 0% 100%)",
        accent: "hsl(0 100% 62%)",
        muted: "hsl(0 0% 60%)",
      };
    }

    const styles = getComputedStyle(document.documentElement);
    const getColor = (token: string, fallback: string) => {
      const value = styles.getPropertyValue(token).trim();
      return value ? `hsl(${value})` : fallback;
    };

    return {
      foreground: getColor("--foreground", "hsl(0 0% 100%)"),
      accent: getColor("--accent", "hsl(0 100% 62%)"),
      muted: getColor("--muted-foreground", "hsl(0 0% 60%)"),
    };
  }, []);
};

const scrollToProject = (slug: string) => {
  const element = document.getElementById(`project-${slug}`);
  if (!element) return;

  element.scrollIntoView({ behavior: "smooth", block: "center" });
  element.classList.remove("project-card-target");
  window.setTimeout(() => element.classList.add("project-card-target"), 20);
  window.setTimeout(() => element.classList.remove("project-card-target"), 1800);
};

const ProjectIcon = ({
  config,
  colors,
}: {
  config: IconConfig;
  colors: ReturnType<typeof useThemeColors>;
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = THREE.createRef<THREE.Mesh>();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7 + config.x) * 0.15;
    meshRef.current.rotation.y += hovered ? 0.03 : 0.012;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2 + config.x) * 0.08;
  });

  const sharedProps = {
    ref: meshRef,
    scale: hovered ? config.scale * 1.08 : config.scale,
    onClick: () => scrollToProject(config.slug),
    onPointerOver: () => {
      document.body.style.cursor = "pointer";
      setHovered(true);
    },
    onPointerOut: () => {
      document.body.style.cursor = "auto";
      setHovered(false);
    },
  };

  return (
    <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <group position={[config.x, 0, 0]}>
        {config.geometry === "torus" && (
          <mesh {...sharedProps}>
            <torusKnotGeometry args={[0.7, 0.22, 160, 24]} />
            <meshStandardMaterial color={hovered ? colors.accent : colors.foreground} metalness={0.55} roughness={0.18} emissive={hovered ? colors.accent : colors.foreground} emissiveIntensity={hovered ? 0.4 : 0.08} />
          </mesh>
        )}

        {config.geometry === "octahedron" && (
          <mesh {...sharedProps}>
            <octahedronGeometry args={[0.95, config.detail ?? 0]} />
            <meshStandardMaterial color={hovered ? colors.accent : colors.foreground} wireframe={hovered} metalness={0.4} roughness={0.22} emissive={hovered ? colors.accent : colors.foreground} emissiveIntensity={hovered ? 0.35 : 0.06} />
          </mesh>
        )}

        {config.geometry === "box" && (
          <mesh {...sharedProps}>
            <boxGeometry args={[1.3, 1.3, 1.3]} />
            <meshStandardMaterial color={hovered ? colors.accent : colors.foreground} metalness={0.5} roughness={0.18} emissive={hovered ? colors.accent : colors.foreground} emissiveIntensity={hovered ? 0.32 : 0.06} />
          </mesh>
        )}

        {config.geometry === "icosahedron" && (
          <mesh {...sharedProps}>
            <icosahedronGeometry args={[0.98, config.detail ?? 0]} />
            <meshStandardMaterial color={hovered ? colors.accent : colors.foreground} flatShading metalness={0.42} roughness={0.24} emissive={hovered ? colors.accent : colors.foreground} emissiveIntensity={hovered ? 0.35 : 0.05} />
          </mesh>
        )}

        <Text
          position={[0, -1.7, 0]}
          fontSize={0.34}
          color={hovered ? colors.accent : colors.muted}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0}
        >
          {config.label}
        </Text>
      </group>
    </Float>
  );
};

const Scene = () => {
  const colors = useThemeColors();

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 4, 5]} intensity={1.4} color={colors.foreground} />
      <pointLight position={[0, 1.5, 4]} intensity={18} distance={14} color={colors.accent} />
      {iconConfigs.map((config) => (
        <ProjectIcon key={config.slug} config={config} colors={colors} />
      ))}
    </>
  );
};

const Marquee = () => {
  return (
    <section className="relative overflow-hidden border-y border-border py-10 md:py-14" aria-labelledby="project-icons-heading">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] tracking-[0.4em] text-accent">⌖ EXPLORE WORK</p>
            <h2 id="project-icons-heading" className="font-display text-3xl leading-none md:text-5xl">
              3D Project Icons
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Click any icon to jump to the related project.
          </p>
        </div>

        <div className="h-[280px] w-full cursor-grab active:cursor-grabbing md:h-[360px]">
          <Canvas camera={{ position: [0, 0, 8.5], fov: 42 }} dpr={[1, 1.5]}>
            <Scene />
          </Canvas>
        </div>

        <div className="mt-5 flex flex-wrap gap-3" aria-label="Project quick links">
          {projects.map((project) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => scrollToProject(project.slug)}
              className="rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground transition-smooth hover:border-accent hover:text-accent"
            >
              {project.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
