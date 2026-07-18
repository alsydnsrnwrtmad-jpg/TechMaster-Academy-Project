import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  NotebookPen,
  BookOpen,
  UserCircle2,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import "./Sidebar.css";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/notes", label: "Notes", icon: NotebookPen },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: UserCircle2 },
];

const COLLAPSE_KEY = "student-hub:sidebar-collapsed";

// Creative feature: Mobile Drawer — Sidebar becomes an off-canvas
// drawer with an overlay below the 960px breakpoint.
// Bonus feature: on desktop it can also collapse to an icon-only rail.
export default function Sidebar({ isOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSE_KEY) === "1"
  );

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    <>
      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : ""} ${
          collapsed ? "sidebar--collapsed" : ""
        }`}
      >
        <button className="sidebar__close" onClick={onClose} aria-label="Close menu">
          <X size={18} />
        </button>
        <nav className="sidebar__nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              title={label}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          className="sidebar__collapse-btn"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </aside>
      {isOpen && <div className="sidebar__overlay" onClick={onClose} />}
    </>
  );
}
