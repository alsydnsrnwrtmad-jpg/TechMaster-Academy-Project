// import { useEffect, useState } from "react";

// // Creative feature: Greeting by time of day
// export default function useGreeting(name = "Student") {
//   const [greeting, setGreeting] = useState(getGreeting());

//   useEffect(() => {
//     const id = setInterval(() => setGreeting(getGreeting()), 60_000);
//     return () => clearInterval(id);
//   }, []);

//   function getGreeting() {
//     const hour = new Date().getHours();
//     if (hour < 5) return `Still up, ${name}? 🌙`;
//     if (hour < 12) return `Good morning, ${name} ☀️`;
//     if (hour < 18) return `Good afternoon, ${name} 🌤️`;
//     return `Good evening, ${name} 🌆`;
//   }

//   return greeting;
// }
import { useEffect, useState } from "react";

// Creative feature: Greeting by time of day
export default function useGreeting(name = "Student") {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(id);
  }, []);

  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 5) return `☾ Still up, ${name}?`;
    if (hour < 12) return `✦ Good morning, ${name}`;
    if (hour < 18) return `◉ Good afternoon, ${name}`;
    return `❋ Good evening, ${name}`;
  }

  return greeting;
}