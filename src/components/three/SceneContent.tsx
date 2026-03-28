import { useFrame } from "@react-three/fiber";
import { useScroll, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useThemeStore } from "../../store/themeStore";

export default function SceneContent() {
  const scroll = useScroll();
  const isDark = useThemeStore((state) => state.theme) === "dark";

  useFrame((state) => {
    const targetZ = 5 - scroll.offset * 6;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
  });

  return (
    <>
      {/* Dynamic Lighting */}
      <ambientLight intensity={isDark ? 0.3 : 0.8} />
      <pointLight 
        position={[3, 3, 3]} 
        intensity={isDark ? 2 : 1.5} 
        color={isDark ? "#06B6D4" : "#3b82f6"} 
      />
      <pointLight 
        position={[-3, -3, 2]} 
        intensity={isDark ? 1.5 : 1} 
        color={isDark ? "#7C3AED" : "#f43f5e"} 
      />

      {/* Only show stars in dark mode */}
      {isDark && <Stars radius={50} depth={50} count={2000} factor={4} fade />}

      {/* Main object */}
      <Float speed={2} rotationIntensity={1.5}>
        <mesh position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial
            color={isDark ? "#7C3AED" : "#6366f1"}
            emissive={isDark ? "#7C3AED" : "#000000"}
            emissiveIntensity={isDark ? 2.5 : 0} /* Boosted to 2.5 for a strong neon glow */
            metalness={isDark ? 0.8 : 0.1}
            roughness={isDark ? 0.2 : 0.3}
          />
        </mesh>
      </Float>

      {/* Depth objects */}
      <mesh position={[1.5, 0.5, -5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={isDark ? "#06B6D4" : "#38bdf8"} />
      </mesh>

      <mesh position={[-1.5, -0.5, -8]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={isDark ? "#7C3AED" : "#a855f7"} />
      </mesh>

      {/* Post-Processing Pipeline */}
      {/* Removed disableNormalPass here ↓ */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={isDark ? 0.2 : 1} 
          mipmapBlur 
          intensity={isDark ? 1.5 : 0} 
        />
        <Vignette 
          eskil={false} 
          offset={0.1} 
          darkness={isDark ? 1.1 : 0} 
        />
      </EffectComposer>
    </>
  );
}