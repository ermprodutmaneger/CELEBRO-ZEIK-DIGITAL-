import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

const positions: [number, number, number][] = [
  [-0.8, 0.8, 0.65],
  [0, 1, 0.65],
  [0.8, 0.65, 0.65],
  [-1, 0, 0.85],
  [0, 0.15, 1.05],
  [0.9, -0.15, 0.7],
  [0, -0.65, 0.8],
  [0.58, -0.65, 0.8],
];
function Model({
  quality,
  selected,
  onSelect,
  reducedMotion,
}: {
  quality: string;
  selected: number;
  onSelect: (i: number) => void;
  reducedMotion: boolean;
}) {
  const gltf = useGLTF("/models/brain.glb", "/draco/");
  const group = useRef<THREE.Group>(null!);
  const scene = useMemo(() => {
    const s = gltf.scene.clone();
    const meshes: THREE.Mesh[] = [];
    s.traverse((o) => {
      if (o instanceof THREE.Mesh) meshes.push(o);
    });
    meshes.forEach((o) => {
      {
        o.material = new THREE.MeshPhysicalMaterial({
          color: "#5c4ba8",
          emissive: "#30226c",
          emissiveIntensity: 0.7,
          metalness: 0.45,
          roughness: 0.25,
          transparent: true,
          opacity: 0.8,
        });
        const wire = new THREE.Mesh(
          o.geometry,
          new THREE.MeshBasicMaterial({
            color: "#9a8cff",
            wireframe: true,
            transparent: true,
            opacity: quality === "low" ? 0.04 : 0.1,
          }),
        );
        o.add(wire);
      }
    });
    return s;
  }, [gltf, quality]);
  useFrame((_, delta) => {
    if (group.current && !reducedMotion)
      group.current.rotation.y += delta * 0.1;
  });
  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={2.65} rotation={[-0.12, 0, 0]} />
      </Center>
      {positions.map((position, i) => (
        <mesh
          key={i}
          position={position}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(i);
          }}
        >
          <sphereGeometry args={[selected === i ? 0.09 : 0.055, 16, 16]} />
          <meshBasicMaterial color={selected === i ? "#ffffff" : "#a491ff"} />
        </mesh>
      ))}
    </group>
  );
}
function Stars() {
  const points = useMemo(() => {
    const a = [];
    for (let i = 0; i < 160; i++) {
      const r = 2 + Math.random() * 1.8,
        t = Math.random() * Math.PI * 2,
        p = Math.acos(2 * Math.random() - 1);
      a.push(
        r * Math.sin(p) * Math.cos(t),
        r * Math.cos(p) * 0.65,
        r * Math.sin(p) * Math.sin(t),
      );
    }
    return new Float32Array(a);
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a692ff" size={0.018} transparent opacity={0.65} />
    </points>
  );
}
export default function Brain({
  quality,
  selected,
  onSelect,
}: {
  quality: string;
  selected: number;
  onSelect: (i: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(media.matches);
    const onVisibility = () => setPageVisible(!document.hidden);
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => setInView(entries[0]?.isIntersecting ?? true),
            { rootMargin: "100px" },
          )
        : null;
    if (container.current) observer?.observe(container.current);
    return () => {
      media.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, []);
  return (
    <div className="brain-canvas-container" ref={container}>
      <Canvas
        frameloop={inView && pageVisible ? "always" : "never"}
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={quality === "low" ? 1 : [1, 1.5]}
        gl={{ antialias: quality !== "low", alpha: true }}
      >
        <ambientLight intensity={1.3} />
        <pointLight position={[3, 3, 4]} color="#a7b5ff" intensity={35} />
        <pointLight position={[-3, -1, 2]} color="#794cff" intensity={25} />
        <Suspense fallback={null}>
          <Model
            quality={quality}
            selected={selected}
            onSelect={onSelect}
            reducedMotion={reducedMotion}
          />
          <Stars />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
