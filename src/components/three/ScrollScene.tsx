import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import SceneContent from "./SceneContent";

export default function ScrollScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ScrollControls pages={3} damping={0.2}>
        <SceneContent />
      </ScrollControls>
    </Canvas>
  );
}