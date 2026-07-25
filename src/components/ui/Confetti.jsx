import "./Confetti.css";

const colors = ["var(--primary)", "var(--accent)", "var(--amber)", "var(--primary-2)"];

// Bonus feature: celebratory confetti burst for milestones
export default function Confetti({ count = 40 }) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2.4 + Math.random() * 1.4,
    color: colors[i % colors.length],
    rotate: Math.random() * 360,
  }));

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti__piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
