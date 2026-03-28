import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float, Stars, Icosahedron, Text, TorusKnot, Box, Tetrahedron, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useThemeStore } from "../../store/themeStore";
import * as THREE from "three";

// --- REUSABLE ORB COMPONENT ---
function FloatingOrb({ 
  text, color, radius, speed, offset, isDark, yPos = 0 
}: { 
  text: string, color: string, radius: number, speed: number, offset: number, isDark: boolean, yPos?: number 
}) {
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!orbitRef.current) return;
    const time = state.clock.getElapsedTime() * speed + offset;
    orbitRef.current.position.x = Math.cos(time) * radius;
    orbitRef.current.position.z = Math.sin(time) * radius;
    orbitRef.current.position.y = yPos + Math.sin(time * 2) * 0.5;
  });

  return (
    <group ref={orbitRef}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshPhysicalMaterial 
            color={color} metalness={0.2} roughness={0.1} transmission={0.9} thickness={0.5}
            emissive={color} emissiveIntensity={isDark ? 1.5 : 0.2}
          />
        </mesh>
        <Text 
          position={[0, 0, 0.6]} fontSize={0.25} color={isDark ? "#ffffff" : "#0f172a"}
          anchorX="center" anchorY="middle" outlineWidth={isDark ? 0 : 0.02} outlineColor="#ffffff"
        >
          {text}
        </Text>
      </Float>
    </group>
  );
}

// --- MAIN SCENE COMPONENT ---
export default function SceneContent() {
  const scroll = useScroll();
  const isDark = useThemeStore((state) => state.theme) === "dark";
  const cameraGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // 1. THE CAMERA DROP: Move the entire camera down based on scroll
    // 7 pages total. We'll drop 10 units of Y-space per page (Total -60)
    const targetY = -scroll.offset * 60; 
    state.camera.position.y += (targetY - state.camera.position.y) * 0.08;
    
    // Lock Z and X so we just go straight down
    state.camera.position.z = 6;
    state.camera.position.x = 0;

    // 2. Attach lights to camera so the scene is always illuminated where we look
    if (cameraGroupRef.current) {
      cameraGroupRef.current.position.y = state.camera.position.y;
    }
  });

  return (
    <>
      {/* --- DYNAMIC LIGHTING THAT FOLLOWS CAMERA --- */}
      <group ref={cameraGroupRef}>
        <ambientLight intensity={isDark ? 0.2 : 0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, 0, -5]} color={isDark ? "#7C3AED" : "#3b82f6"} intensity={5} />
      </group>

      {/* Background Environment */}
      {isDark && <Stars radius={50} depth={50} count={3000} factor={3} fade speed={1} />}

      {/* =========================================
          LEVEL 1: INTRO (Y = 0)
      ========================================= */}
      <group position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Icosahedron args={[1.5, 0]} position={[0, 0, 0]}>
            <meshPhysicalMaterial 
              color={isDark ? "#ffffff" : "#e0f2fe"} metalness={0.1} roughness={0.2}
              transmission={0.9} thickness={1.5} ior={1.5}
              emissive={isDark ? "#7C3AED" : "#000000"} emissiveIntensity={isDark ? 0.5 : 0}
            />
          </Icosahedron>
        </Float>
      </group>

      {/* =========================================
          LEVEL 2: ABOUT ME (Y = -10)
      ========================================= */}
      <group position={[-2, -10, -2]}>
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
          <TorusKnot args={[1, 0.3, 128, 16]}>
            <meshStandardMaterial color={isDark ? "#ec4899" : "#f472b6"} wireframe />
          </TorusKnot>
        </Float>
        <FloatingOrb text="Design" color="#ec4899" radius={3} speed={0.4} offset={0} isDark={isDark} yPos={-10} />
        <FloatingOrb text="Logic" color="#8b5cf6" radius={3} speed={0.4} offset={Math.PI * 0.66} isDark={isDark} yPos={-10} />
        <FloatingOrb text="Art" color="#06b6d4" radius={3} speed={0.4} offset={Math.PI * 1.33} isDark={isDark} yPos={-10} />
      </group>

      {/* =========================================
          LEVEL 3: SKILLS (Y = -20)
      ========================================= */}
      <group position={[2, -20, -2]}>
        <FloatingOrb text="React" color="#06B6D4" radius={2.5} speed={0.5} offset={0} isDark={isDark} yPos={-20} />
        <FloatingOrb text="Three.js" color="#a855f7" radius={3.5} speed={0.4} offset={Math.PI * 0.5} isDark={isDark} yPos={-20} />
        <FloatingOrb text="Node.js" color="#22c55e" radius={4.5} speed={0.3} offset={Math.PI} isDark={isDark} yPos={-20} />
        <FloatingOrb text="TypeScript" color="#3b82f6" radius={5.5} speed={0.2} offset={Math.PI * 1.5} isDark={isDark} yPos={-20} />
      </group>

      {/* =========================================
          LEVEL 4: PROJECTS (Y = -30)
      ========================================= */}
      <group position={[0, -30, -3]}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Box args={[1.5, 1.5, 1.5]} position={[-3, 0, 0]}>
            <meshPhysicalMaterial color="#3b82f6" transmission={0.8} opacity={1} transparent roughness={0.1} />
          </Box>
        </Float>
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={3}>
          <Box args={[2, 2, 2]} position={[3, 1, -1]}>
            <meshPhysicalMaterial color="#a855f7" transmission={0.8} opacity={1} transparent roughness={0.1} />
          </Box>
        </Float>
      </group>

      {/* =========================================
          LEVEL 5: EDUCATION (Y = -40)
      ========================================= */}
      <group position={[-2, -40, -1]}>
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
          <Tetrahedron args={[2, 0]}>
            <meshStandardMaterial color={isDark ? "#eab308" : "#fef08a"} emissive="#eab308" emissiveIntensity={isDark ? 0.8 : 0} />
          </Tetrahedron>
        </Float>
      </group>

      {/* =========================================
          LEVEL 6 & 7: CONTACT/CONNECT (Y = -50 to -60)
      ========================================= */}
      <group position={[0, -55, -4]}>
        <Float speed={3} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[2, 64, 64]}>
            <meshPhysicalMaterial 
              color={isDark ? "#ffffff" : "#000000"} 
              emissive={isDark ? "#7C3AED" : "#000000"}
              emissiveIntensity={isDark ? 2 : 0}
              wireframe={isDark}
              roughness={0}
            />
          </Sphere>
        </Float>
      </group>

      {/* Post-Processing Pipeline */}
      <EffectComposer>
        <Bloom luminanceThreshold={isDark ? 0.4 : 1} mipmapBlur intensity={isDark ? 1.5 : 0} />
        <Vignette eskil={false} offset={0.1} darkness={isDark ? 1.1 : 0.4} />
      </EffectComposer>
    </>
  );
}