import { useThemeStore } from "../../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-50 px-4 py-2 bg-primary text-white rounded-xl"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}