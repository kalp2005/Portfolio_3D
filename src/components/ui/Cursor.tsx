import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorStore } from "../../store/cursorStore";

export default function Cursor() {
  const variant = useCursorStore((state) => state.variant);

  // Framer motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics applied to the raw mouse position
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Offset by half the max width/height so it stays centered
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  // Define how the cursor looks in different states
  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "white",
      mixBlendMode: "difference" as const,
      scale: 1,
    },
    hover: {
      width: 32,
      height: 32,
      backgroundColor: "white",
      mixBlendMode: "difference" as const,
      scale: 2.5, // Blows up into a big circle for links
    },
    card: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255,255,255,0.4)",
      mixBlendMode: "normal" as const,
      backdropFilter: "blur(4px)",
      scale: 4, // Becomes a massive glass magnifying glass
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}