import { useFrame } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";

export default function SceneContent() {
  const scroll = useScroll();

  useFrame((state) => {
    state.camera.position.z = 5 - scroll.offset * 15;
  });

  return (
    <>
      <ambientLight intensity={0.5} />

      {/* Intro */}
      <Float>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#7C3AED" />
        </mesh>
      </Float>

      {/* About */}
      <mesh position={[0, 0, -5]}>
        <boxGeometry />
        <meshStandardMaterial color="#06B6D4" />
      </mesh>

      {/* Skills */}
      <mesh position={[0, 0, -10]}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}