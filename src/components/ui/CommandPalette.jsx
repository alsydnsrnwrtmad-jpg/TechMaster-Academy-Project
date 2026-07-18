import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  NotebookPen,
  BookOpen,
  UserCircle2,
  Sparkles,
  Search,
} from "lucide-react";
import "./CommandPalette.css";

const pages = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Tasks", to: "/tasks", icon: ListChecks },
  { label: "Notes", to: "/notes", icon: NotebookPen },
  { label: "Resources", to: "/resources", icon: BookOpen },
  { label: "Profile", to: "/profile", icon: UserCircle2 },
  { label: "Welcome page", to: "/welcome", icon: Sparkles },
];

// Bonus feature: Command Palette (Ctrl/Cmd + K) for quick navigation
export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const results = useMemo(
    () =>
      pages.filter((p) =>
        p.label.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  if (!open) return null;

  const go = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk__search">
          <Search size={16} />
          <input
            autoFocus
            placeholder="Jump to a page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) go(results[0].to);
            }}
          />
        </div>
        <div className="cmdk__list">
          {results.length === 0 && (
            <p className="cmdk__empty">No pages match “{query}”.</p>
          )}
          {results.map(({ label, to, icon: Icon }) => (
            <button key={to} className="cmdk__item" onClick={() => go(to)}>
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
