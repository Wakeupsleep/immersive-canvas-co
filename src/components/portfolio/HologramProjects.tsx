import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, ScrollControls, useScroll, Float } from "@react-three/drei";
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
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.15;
    }
    if (glow.current) {
      const target = hovered ? 1.6 : 0.8;
      glow.current.material.opacity += (target - glow.current.material.opacity) * 0.1;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Outer energy glow */}
      <mesh ref={glow} position={[0, 0, -0.05]}>
        <planeGeometry args={[3.6, 4.6]} />
        <meshBasicMaterial
          color={hovered ? "#ff2244" : "#3aaaff"}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Frame */}
      <mesh>
        <planeGeometry args={[3.2, 4.2]} />
        <meshBasicMaterial
          color={hovered ? "#ff3355" : "#0af"}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Holographic content via HTML overlay */}
      <Html
        transform
        distanceFactor={4}
        position={[0, 0, 0.01]}
        occlude={false}
        style={{ pointerEvents: "auto" }}
      >
        <div
          onPointerEnter={() => {
            setHovered(true);
            playWoosh();
          }}
          onPointerLeave={() => setHovered(false)}
          onClick={() => {
            playSwish();
            onOpen(project.slug);
          }}
          className={`hologram-panel ${hovered ? "is-hot" : ""}`}
        >
          <div className="hologram-scan" />
          <div className="hologram-grid" />
          <p className="hologram-tag">⌖ {project.category}</p>
          <h3 className="hologram-title">{project.title}</h3>
          <p className="hologram-desc">{project.description}</p>
          <div className="hologram-meta">
            <span>{project.year}</span>
            <span>{project.role}</span>
          </div>
          <div className="hologram-cta">ENTER DIMENSION →</div>
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

  useFrame(() => {
    const offset = scroll.offset; // 0..1
    const z = 6 - offset * totalLength;
    // Slight S-curve sway
    const x = Math.sin(offset * Math.PI * 2) * 1.2;
    const y = Math.cos(offset * Math.PI * 1.5) * 0.4;
    camera.position.lerp(target.set(x, y, z), 0.08);
    camera.lookAt(0, 0, z - 4);
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

const Scene = ({ onOpen }: { onOpen: (slug: string) => void }) => {
  const spacing = 7;
  const totalLength = projects.length * spacing;

  return (
    <>
      <fog attach="fog" args={["#02030a", 6, 26]} />
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 4, 4]} intensity={1.2} color="#3aaaff" />
      <pointLight position={[0, -4, -4]} intensity={0.8} color="#ff2244" />

      <Dust />

      <ScrollControls pages={projects.length} damping={0.25}>
        <CameraRig totalLength={totalLength} />
        {projects.map((p, i) => {
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
        <p className="text-[11px] tracking-[0.4em] text-accent">⌖ DIMENSIONAL ARCHIVE</p>
        <h2 className="font-display text-3xl tracking-tight md:text-5xl">
          Project<span className="italic text-muted-foreground"> Hologram</span>
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">scroll to travel between dimensions</p>
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
