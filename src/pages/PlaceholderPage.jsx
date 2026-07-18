import Card from "../components/ui/Card.jsx";

// Temporary stand-in for pages owned by other developers,
// so routing/navigation is fully testable today.
export default function PlaceholderPage({ title, owner }) {
  return (
    <Card style={{ textAlign: "center", padding: "60px 20px" }}>
      <h2 style={{ marginBottom: 8 }}>{title}</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
        🚧 This page is owned by {owner} and will be implemented separately.
      </p>
    </Card>
  );
}
