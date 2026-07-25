import Card from "../ui/Card.jsx";
import "./RecentTasks.css";

const statusTint = {
  Done: "done",
  "In Progress": "progress",
  Pending: "pending",
};

export default function RecentTasks({ tasks }) {
  return (
    <Card className="recent-tasks">
      <h3>Recent Tasks</h3>
      <ul className="recent-tasks__list">
        {tasks.map((task) => (
          <li key={task.id} className="recent-tasks__item">
            <span className="recent-tasks__title">{task.title}</span>
            <div className="recent-tasks__tags">
              <span className={`tag tag--${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`tag tag--${statusTint[task.status]}`}>
                {task.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
