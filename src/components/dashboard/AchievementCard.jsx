import * as Icons from "lucide-react";
import "./AchievementCard.css";

export default function AchievementCard({ title, description, icon, unlocked }) {
  const Icon = Icons[icon] || Icons.Award;
  return (
    <div className={`achievement ${unlocked ? "" : "achievement--locked"}`}>
      <div className="achievement__icon">
        <Icon size={18} />
      </div>
      <div>
        <p className="achievement__title">{title}</p>
        <p className="achievement__desc">{description}</p>
      </div>
    </div>
  );
}
