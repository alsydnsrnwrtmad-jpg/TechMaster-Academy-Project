import Card from "../ui/Card.jsx";
import CircularProgress from "../ui/CircularProgress.jsx";

export default function TodayProgress({ value }) {
  return (
    <Card className="today-progress">
      <h3>Today's Progress</h3>
      <div style={{ display: "flex", justifyContent: "center", padding: "18px 0 6px" }}>
        <CircularProgress value={value} label="on track" />
      </div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center" }}>
        Keep going — you're doing great today.
      </p>
    </Card>
  );
}
