import { Quote } from "lucide-react";
import Card from "../ui/Card.jsx";
import { getQuoteOfTheDay } from "../../data/quotes.js";

// Creative feature: Quote of the Day
export default function QuoteOfTheDay() {
  const quote = getQuoteOfTheDay();
  return (
    <Card className="quote-card">
      <Quote size={20} color="var(--primary)" />
      <p style={{ margin: "10px 0 8px", fontSize: 14.5, lineHeight: 1.5 }}>
        “{quote.text}”
      </p>
      <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>— {quote.author}</p>
    </Card>
  );
}
