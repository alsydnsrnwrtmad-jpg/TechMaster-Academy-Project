import { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { GripVertical } from "lucide-react";
import Card from "../ui/Card.jsx";
import "./QuickActions.css";

// Creative feature: Drag & Drop — reorder quick action shortcuts
export default function QuickActions({ actions: initialActions }) {
  const [actions, setActions] = useState(initialActions);
  const [dragId, setDragId] = useState(null);

  const handleDrop = (targetId) => {
    if (dragId === null || dragId === targetId) return;
    const items = [...actions];
    const fromIndex = items.findIndex((a) => a.id === dragId);
    const toIndex = items.findIndex((a) => a.id === targetId);
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    setActions(items);
    setDragId(null);
  };

  return (
    <Card className="quick-actions">
      <h3>Quick Actions</h3>
      <p className="quick-actions__hint">Drag to reorder your shortcuts</p>
      <div className="quick-actions__list">
        {actions.map((action) => {
          const Icon = Icons[action.icon] || Icons.Circle;
          return (
            <Link
              key={action.id}
              to={action.to}
              className={`quick-actions__item ${
                dragId === action.id ? "quick-actions__item--dragging" : ""
              }`}
              draggable
              onDragStart={() => setDragId(action.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(action.id)}
              onDragEnd={() => setDragId(null)}
            >
              <GripVertical size={14} className="quick-actions__grip" />
              <Icon size={16} />
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
