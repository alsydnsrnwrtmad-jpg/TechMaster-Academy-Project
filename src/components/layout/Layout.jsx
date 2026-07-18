import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import FloatingShapes from "./FloatingShapes.jsx";
import CommandPalette from "../ui/CommandPalette.jsx";
import BackToTopButton from "../ui/BackToTopButton.jsx";
import "./Layout.css";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  // Bonus feature: Ctrl/Cmd + K opens the command palette from anywhere
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="app-shell">
      <FloatingShapes />
      <Navbar
        onMenuClick={() => setSidebarOpen((v) => !v)}
        onSearchClick={() => setPaletteOpen(true)}
      />
      <div className="app-shell__body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-shell__main">
          {/* Animations: page transition fades/slides on route change */}
          <div key={location.pathname} className="page-fade">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <BackToTopButton />
    </div>
  );
}
