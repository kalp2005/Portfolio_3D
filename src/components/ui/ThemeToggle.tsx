import { useThemeStore } from "../../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-5 right-5 z-50
        px-4 py-2
        bg-white/40 dark:bg-white/10 
        backdrop-blur-md
        border border-slate-300 dark:border-white/10
        rounded-xl
        text-slate-900 dark:text-white
        hover:bg-white/60 dark:hover:bg-white/20
        transition-all duration-300
      "
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}