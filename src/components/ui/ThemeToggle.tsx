import { motion } from "framer-motion";
import { useThemeStore } from "../../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed top-6 right-6 z-50
        w-20 h-10 rounded-full
        p-1 flex items-center
        transition-colors duration-500
        ${isDark ? "bg-slate-900/80 border-white/10" : "bg-white/80 border-slate-200"}
        backdrop-blur-md border shadow-lg cursor-pointer
      `}
      // This ensures the button aligns the inner circle to left or right
      style={{ justifyContent: isDark ? "flex-end" : "flex-start" }} 
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${isDark ? "bg-slate-800 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]" : "bg-slate-100 text-slate-900 shadow-md"}
        `}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}