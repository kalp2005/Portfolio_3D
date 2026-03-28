import { useFrame } from "@react-three/fiber";
import { useScroll, Float, Stars } from "@react-three/drei";

export default function SceneContent() {
  const scroll = useScroll();

    useFrame((state) => {
        const targetZ = 5 - scroll.offset * 6;
        state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
    });

  return (
    <>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#06B6D4" />
        <pointLight position={[-3, -3, 2]} intensity={1.5} color="#7C3AED" />

      {/* Background stars */}
      <Stars radius={50} depth={50} count={2000} factor={4} fade />

      {/* Main object */}
      <Float speed={2} rotationIntensity={1.5}>
        <mesh position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Depth objects */}
      <mesh position={[1.5, 0.5, -5]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#06B6D4" />
      </mesh>

      <mesh position={[-1.5, -0.5, -8]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#7C3AED" />
      </mesh>
    </>
  );
}