import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import SceneContent from "./SceneContent";
import IntroUI from "../sections/IntroUI";
import AboutUI from "../sections/AboutUI";

export default function ScrollScene() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ScrollControls pages={2} damping={0.2}>
          
          {/* 3D */}
          <SceneContent />

          {/* UI */}
          <Scroll html>
            <IntroUI />
            <AboutUI />
          </Scroll>

        </ScrollControls>
      </Canvas>
    </div>
  );
}