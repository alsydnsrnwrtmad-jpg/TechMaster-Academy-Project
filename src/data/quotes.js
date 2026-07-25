// Static mock data — Quote of the Day widget
const quotes = [
  { text: "Small daily progress beats occasional bursts of motivation.", author: "Unknown" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
];

export function getQuoteOfTheDay() {
  const dayIndex = new Date().getDate() % quotes.length;
  return quotes[dayIndex];
}

export default quotes;
