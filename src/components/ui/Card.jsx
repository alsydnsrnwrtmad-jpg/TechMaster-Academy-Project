import "./Card.css";

// Reusable glassmorphism card used across the app
export default function Card({ children, className = "", as: As = "div", ...rest }) {
  return (
    <As className={`card ${className}`} {...rest}>
      {children}
    </As>
  );
}
