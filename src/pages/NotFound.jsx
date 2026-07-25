import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import "./NotFound.css";

// Creative feature: Custom 404 Page
export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__badge">
        <Compass size={28} />
      </div>
      <h1 className="not-found__code">404</h1>
      <h2>This page wandered off your study path</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button variant="primary">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
