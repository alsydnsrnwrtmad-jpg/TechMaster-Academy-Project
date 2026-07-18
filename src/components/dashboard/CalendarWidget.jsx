import Card from "../ui/Card.jsx";
import "./CalendarWidget.css";

// Creative feature: Calendar Widget
export default function CalendarWidget() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = today.toLocaleString("en-US", { month: "long" });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Card className="calendar-widget">
      <div className="calendar-widget__header">
        <h3>{monthName} {year}</h3>
      </div>
      <div className="calendar-widget__grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="calendar-widget__dow">{d}</span>
        ))}
        {cells.map((day, i) => (
          <span
            key={i}
            className={`calendar-widget__cell ${
              day === today.getDate() ? "calendar-widget__cell--today" : ""
            } ${day ? "" : "calendar-widget__cell--empty"}`}
          >
            {day || ""}
          </span>
        ))}
      </div>
    </Card>
  );
}
