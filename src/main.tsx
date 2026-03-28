import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { useThemeStore } from "./store/themeStore";

function Root() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <App />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);