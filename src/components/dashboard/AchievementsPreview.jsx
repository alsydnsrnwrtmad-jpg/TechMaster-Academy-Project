import Card from "../ui/Card.jsx";
import AchievementCard from "./AchievementCard.jsx";
import "./AchievementsPreview.css";

// Creative feature: Achievement Cards
export default function AchievementsPreview({ achievements }) {
  return (
    <Card className="achievements-preview">
      <h3>Achievements</h3>
      <div className="achievements-preview__row">
        {achievements.map((a) => (
          <AchievementCard key={a.id} {...a} />
        ))}
      </div>
    </Card>
  );
}
