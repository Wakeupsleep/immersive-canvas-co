import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, ScrollControls, useScroll, Float, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { useWooshSound } from "@/hooks/useWooshSound";
import { useSwishSound } from "@/hooks/useSwishSound";

/**
 * Floating holographic project panel.
 * Pure presentation: renders a glowing plane with project info.
 */
const Panel = ({
  position,
  rotation,
  project,
  onOpen,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  project: (typeof projects)[number];
  onOpen: (slug: string) => void;
}) => {
  const group = useRef<any>(null);
  const glow = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const playWoosh = useWooshSound();
  const playSwish = useSwishSound();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = state.pointer.x;
    const my = state.pointer.y;
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.15;
      // Cursor-reactive parallax tilt
      const targetRX = rotation[0] + my * 0.25;
      const targetRY = rotation[1] + mx * 0.35;
      group.current.rotation.x += (targetRX - group.current.rotation.x) * 0.06;
      group.current.rotation.y += (targetRY - group.current.rotation.y) * 0.06;
    }
    if (glow.current) {
      const target = hovered ? 1.0 : 0.0;
      glow.current.material.opacity += (target - glow.current.material.opacity) * 0.12;
    }
  });

  const texture = useTexture(project.gallery?.[0] || "https://picsum.photos/seed/" + project.slug + "/800/1000");

  // Preserve original aspect ratio of the uploaded thumbnail
  const img: any = (texture as any).image;
  const aspect = img && img.width && img.height ? img.width / img.height : 0.8;
  const baseHeight = 4.2;
  const planeW = baseHeight * aspect;
  const planeH = baseHeight;

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Outer energy glow (red on hover) */}
      <mesh ref={glow} position={[0, 0, -0.05]}>
        <planeGeometry args={[planeW + 0.4, planeH + 0.4]} />
        <meshBasicMaterial
          color={hovered ? "#ff2244" : "#ffffff"}
          transparent
          opacity={0.0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Project image — exact aspect, no crop */}
      <mesh
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          playWoosh();
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          playSwish();
          onOpen(project.slug);
        }}
      >
        <planeGeometry args={[planeW, planeH]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Title overlay below */}
      <Html
        transform
        distanceFactor={4}
        position={[0, -2.45, 0.01]}
        occlude={false}
        style={{ pointerEvents: "none" }}
      >
        <div className={`floating-label ${hovered ? "is-hot" : ""}`}>
          <p className="floating-tag">{project.category} · {project.year}</p>
          <h3 className="floating-title">{project.title}</h3>
        </div>
      </Html>
    </group>
  );
};

/**
 * Camera travels through panels based on scroll progress.
 */
const CameraRig = ({ totalLength }: { totalLength: number }) => {
  const scroll = useScroll();
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    const offset = scroll.offset; // 0..1
    const z = 6 - offset * totalLength;
    // Dramatic left-to-right sweep across the archive
    const x = Math.sin(offset * Math.PI * 4) * 5.5;
    const y = Math.sin(offset * Math.PI * 2) * 0.6;
    // Smooth cinematic easing (frame-rate independent)
    const k = 1 - Math.pow(0.001, delta);
    camera.position.lerp(target.set(x, y, z), k * 0.5);
    camera.lookAt(-x * 0.3, 0, z - 4);
  });
  return null;
};

/**
 * Drifting particle dust for depth/fog atmosphere.
 */
const Dust = () => {
  const pts = useRef<any>(null);
  const { positions } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return { positions };
  }, []);
  useFrame((_, d) => {
    if (pts.current) pts.current.rotation.y += d * 0.01;
  });
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#88c2ff"
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const FLOATING_SLUGS = ["illustrations", "motions", "branding", "research"];

const Scene = ({ onOpen }: { onOpen: (slug: string) => void }) => {
  const visible = projects.filter((p) => FLOATING_SLUGS.includes(p.slug));
  const spacing = 7;
  const totalLength = visible.length * spacing;

  return (
    <>
      <fog attach="fog" args={["#02030a", 6, 26]} />
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 4, 4]} intensity={1.2} color="#3aaaff" />
      <pointLight position={[0, -4, -4]} intensity={0.8} color="#ff2244" />

      <Dust />

      <ScrollControls pages={visible.length} damping={0.25}>
        <CameraRig totalLength={totalLength} />
        {visible.map((p, i) => {
          const z = -i * spacing;
          const x = i % 2 === 0 ? -1.8 : 1.8;
          const y = i % 2 === 0 ? 0.3 : -0.3;
          const ry = i % 2 === 0 ? 0.25 : -0.25;
          return (
            <Float key={p.slug} speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
              <Panel
                position={[x, y, z]}
                rotation={[0, ry, 0]}
                project={p}
                onOpen={onOpen}
              />
            </Float>
          );
        })}
      </ScrollControls>
    </>
  );
};

const HologramProjects = () => {
  const navigate = useNavigate();
  const onOpen = (slug: string) => navigate(`/projects/${slug}`);

  return (
    <section
      id="work"
      className="relative isolate w-full"
      style={{ height: "100vh" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 text-center">
        <p className="text-[11px] tracking-[0.4em] text-accent">⌖ SELECTED WORK</p>
        <p className="mt-1 text-xs text-muted-foreground">scroll to travel through the archive</p>
      </div>

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Scene onOpen={onOpen} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default HologramProjects;
