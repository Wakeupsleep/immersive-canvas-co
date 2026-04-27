import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive particle field that gently follows the mouse.
 * Pure presentation — no business logic.
 */
const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const accent = new THREE.Color("hsl(0, 100%, 62%)");
    const white = new THREE.Color("hsl(0, 0%, 100%)");

    for (let i = 0; i < count; i++) {
      // Distribute in a wide flattened sphere
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const mix = Math.random();
      const c = white.clone().lerp(accent, mix * 0.35);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    // Read normalized pointer (-1..1)
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;

    if (group.current) {
      // Smooth easing toward mouse target
      const targetY = mouse.current.x * 0.6;
      const targetX = -mouse.current.y * 0.4;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    }

    if (points.current) {
      points.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

const HeroBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
