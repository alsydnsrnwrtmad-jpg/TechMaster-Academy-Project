import * as Icons from "lucide-react";
import Card from "../ui/Card.jsx";
import "./StatCard.css";

export default function StatCard({ label, value, icon, tint = "primary" }) {
  const Icon = Icons[icon] || Icons.Circle;
  return (
    <Card className={`stat-card stat-card--${tint}`}>
      <div className="stat-card__icon">
        <Icon size={20} />
      </div>
      <div>
        <p className="stat-card__value mono">{value}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </Card>
  );
}
