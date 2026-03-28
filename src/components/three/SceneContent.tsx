import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float, Stars, Icosahedron, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useThemeStore } from "../../store/themeStore";
import * as THREE from "three";

// --- CUSTOM COMPONENT: Orbiting Technology Orbs ---
function TechOrb({ 
  name, 
  color, 
  radius, 
  speed, 
  offset, 
  isDark 
}: { 
  name: string, color: string, radius: number, speed: number, offset: number, isDark: boolean 
}) {
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!orbitRef.current) return;
    // Calculate continuous circular orbit path
    const time = state.clock.getElapsedTime() * speed + offset;
    orbitRef.current.position.x = Math.cos(time) * radius;
    orbitRef.current.position.z = Math.sin(time) * radius;
    
    // Add a slight vertical bobbing effect
    orbitRef.current.position.y = Math.sin(time * 2) * 0.5;
  });

  return (
    <group ref={orbitRef}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        {/* The Glass Orb */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial 
            color={color}
            metalness={0.2}
            roughness={0.1}
            transmission={0.9} 
            thickness={0.5}
            emissive={color}
            emissiveIntensity={isDark ? 1.5 : 0.2}
          />
        </mesh>
        {/* The 3D Text Label */}
        <Text 
          position={[0, 0, 0.5]} 
          fontSize={0.2} 
          color={isDark ? "#ffffff" : "#0f172a"}
          anchorX="center" 
          anchorY="middle"
          outlineWidth={isDark ? 0 : 0.02}
          outlineColor="#ffffff"
        >
          {name}
        </Text>
      </Float>
    </group>
  );
}

// --- MAIN SCENE ---
export default function SceneContent() {
  const scroll = useScroll();
  const isDark = useThemeStore((state) => state.theme) === "dark";
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // 1. Scroll Zoom Logic (Moves camera back as you scroll through the 7 pages)
    const targetZ = 5 - scroll.offset * 20; 
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;

    // 2. Parallax & Scroll Rotation
    if (groupRef.current) {
      // Rotate the centerpiece based on scroll progress
      groupRef.current.rotation.x = scroll.offset * Math.PI * 2;
      groupRef.current.rotation.z = scroll.offset * Math.PI;

      // Subtle Mouse Parallax
      const targetX = (state.pointer.x * state.viewport.width) / 10;
      const targetY = (state.pointer.y * state.viewport.height) / 10;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={isDark ? 0.2 : 0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, -5, -5]} color={isDark ? "#7C3AED" : "#3b82f6"} intensity={5} />

      {/* Stars (Only in Dark Mode) */}
      {isDark && <Stars radius={50} depth={50} count={3000} factor={3} fade speed={1} />}

      {/* Centerpiece Group */}
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Icosahedron args={[1.5, 0]} position={[0, 0, 0]}>
            <meshPhysicalMaterial 
              color={isDark ? "#ffffff" : "#e0f2fe"}
              metalness={0.1}
              roughness={0.2}
              transmission={0.9} 
              thickness={1.5}
              ior={1.5}
              emissive={isDark ? "#7C3AED" : "#000000"}
              emissiveIntensity={isDark ? 0.5 : 0}
            />
          </Icosahedron>
        </Float>
      </group>

      {/* Orbiting Tech Icons */}
      <TechOrb name="React" color="#06B6D4" radius={3} speed={0.5} offset={0} isDark={isDark} />
      <TechOrb name="Three.js" color="#a855f7" radius={3.5} speed={0.4} offset={Math.PI * 0.66} isDark={isDark} />
      <TechOrb name="Node.js" color="#22c55e" radius={2.5} speed={0.6} offset={Math.PI * 1.33} isDark={isDark} />

      {/* Post-Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={isDark ? 0.5 : 1} mipmapBlur intensity={isDark ? 1.2 : 0} />
        <Vignette eskil={false} offset={0.1} darkness={isDark ? 1.1 : 0.4} />
      </EffectComposer>
    </>
  );
}