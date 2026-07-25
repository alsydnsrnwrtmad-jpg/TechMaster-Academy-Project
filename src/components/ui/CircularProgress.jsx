import "./CircularProgress.css";

// Creative feature: Circular Progress ring, this project's signature element
export default function CircularProgress({
  value = 0,
  size = 120,
  stroke = 10,
  label,
  color = "var(--primary)",
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="circular-progress__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="circular-progress__value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="circular-progress__center">
        <span className="circular-progress__number mono">{value}%</span>
        {label && <span className="circular-progress__label">{label}</span>}
      </div>
    </div>
  );
}
