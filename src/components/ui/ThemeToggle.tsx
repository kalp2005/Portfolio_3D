import { useThemeStore } from "../../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed top-5 right-5 z-50
        px-4 py-2
        bg-white/10 backdrop-blur-md
        border border-white/10
        rounded-xl
        text-white
        hover:bg-white/20
        transition
      "
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}