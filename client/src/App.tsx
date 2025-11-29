import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/organisms/NotFound";
import SpaceBackdrop from "./components/atoms/SpaceBackdrop";
import { useMemo } from "react";
import "./App.css";

const App = () => {
  const stars = useMemo(
    () => [
      { className: "w-2 h-2 bg-white rounded-full animate-pulse blur-[1px]", style: { top: "25%", left: "25%" } },
      { className: "w-1 h-1 bg-cyan-400 rounded-full animate-pulse", style: { top: "33%", left: "66%", animationDelay: "700ms" } },
      { className: "w-1 h-1 bg-purple-400 rounded-full animate-pulse", style: { top: "75%", left: "16%", animationDelay: "150ms" } },
    ],
    []
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route 
          path="*" 
          element={
            <div className="min-h-screen bg-slate-950 overflow-x-hidden">
              <SpaceBackdrop stars={stars} />
              <div className="relative z-10">
                <NotFound />
              </div>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
