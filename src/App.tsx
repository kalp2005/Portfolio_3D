import ScrollScene from "./components/three/ScrollScene";
import ThemeToggle from "./components/ui/ThemeToggle";

function App() {
  return (
    <div className="h-[300vh] relative">
      <ThemeToggle />
      <ScrollScene />
    </div>
  );
}

export default App;