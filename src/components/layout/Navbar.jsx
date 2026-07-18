import { Menu, Sun, Moon, Bell, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import useGreeting from "../../hooks/useGreeting.js";
import useClock from "../../hooks/useClock.js";
import "./Navbar.css";

export default function Navbar({ onMenuClick, onSearchClick }) {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const greeting = useGreeting("Mohamed");
  const clock = useClock();

  const handleBell = () => {
    showToast("You have 3 new updates 🎉", "info");
  };

  const handleThemeToggle = () => {
    toggleTheme();
    showToast(
      theme === "light" ? "Dark mode on 🌙" : "Light mode on ☀️",
      "success"
    );
  };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button
          className="navbar__icon-btn navbar__hamburger"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="navbar__brand">
          <span className="navbar__logo">❉</span>
          <span className="navbar__brand-text">TechMaster Academy</span>
        </div>
      </div>

      <p className="navbar__greeting">{greeting}</p>

      <div className="navbar__right">
        <span className="navbar__clock mono">{clock}</span>
        <button
          className="navbar__search-btn"
          onClick={onSearchClick}
          aria-label="Open quick search (Ctrl+K)"
        >
          <Search size={14} />
          <span>Quick jump</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button
          className="navbar__icon-btn"
          onClick={handleBell}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="navbar__dot" />
        </button>
        <button
          className="navbar__icon-btn"
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div className="navbar__avatar" title="Mohamed Ahmed">
          MA
        </div>
      </div>
    </header>
  );
}
