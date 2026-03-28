import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import SceneContent from "./SceneContent";
import PortfolioUI from "../sections/PortfolioUI"; // We will create this next!

export default function ScrollScene() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Changed pages to 7 and adjusted damping for a heavier, premium scroll feel */}
        <ScrollControls pages={7} damping={0.15}>
          
          {/* 3D Environment */}
          <SceneContent />

          {/* HTML UI Overlay */}
          <Scroll html style={{ width: '100%' }}>
            <PortfolioUI />
          </Scroll>

        </ScrollControls>
      </Canvas>
    </div>
  );
}