import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TechMaster Academy — Student Hub</p>
      <p className="footer__muted">React Fundamentals · Phase 2</p>
    </footer>
  );
}
