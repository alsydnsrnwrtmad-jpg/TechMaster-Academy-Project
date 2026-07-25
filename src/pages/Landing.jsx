import { useNavigate } from "react-router-dom";
import { ArrowRight, ListChecks, NotebookPen, BookOpen, Flame } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import FloatingShapes from "../components/layout/FloatingShapes.jsx";
import "./Landing.css";

const VISITED_KEY = "student-hub:visited";

const highlights = [
  { icon: ListChecks, label: "Track tasks" },
  { icon: NotebookPen, label: "Capture notes" },
  { icon: BookOpen, label: "Browse resources" },
  { icon: Flame, label: "Build your streak" },
];

// Landing page — the entry screen before the Dashboard,
// matching the Application Flow: Landing → Dashboard → ...
export default function Landing() {
  const navigate = useNavigate();

  const enterHub = () => {
    sessionStorage.setItem(VISITED_KEY, "1");
    navigate("/");
  };

  return (
    <div className="landing">
      <FloatingShapes />
      <div className="landing__content">
        <span className="landing__eyebrow mono">TECHMASTER ACADEMY · PHASE 2</span>
        <h1 className="landing__title">
          Your whole learning journey,
          <br />
          <span className="landing__title-accent">in one calm hub.</span>
        </h1>
        <p className="landing__subtitle">
          Tasks, notes, resources and progress — organized in one place so you
          can focus on actually learning React.
        </p>

        <div className="landing__cta">
          <Button variant="primary" onClick={enterHub}>
            Enter your hub <ArrowRight size={16} />
          </Button>
        </div>

        <div className="landing__highlights">
          {highlights.map(({ icon: Icon, label }) => (
            <Card key={label} className="landing__highlight">
              <Icon size={18} />
              <span>{label}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export { VISITED_KEY };
