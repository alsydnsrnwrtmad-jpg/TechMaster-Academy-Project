import { PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import Confetti from "../components/ui/Confetti.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import TodayProgress from "../components/dashboard/TodayProgress.jsx";
import QuoteOfTheDay from "../components/dashboard/QuoteOfTheDay.jsx";
import CalendarWidget from "../components/dashboard/CalendarWidget.jsx";
import RecentTasks from "../components/dashboard/RecentTasks.jsx";
import QuickActions from "../components/dashboard/QuickActions.jsx";
import AchievementsPreview from "../components/dashboard/AchievementsPreview.jsx";
import { useToast } from "../context/ToastContext.jsx";
import {
  stats,
  todayProgress,
  recentTasks,
  defaultQuickActions,
} from "../data/mockDashboard.js";
import achievements from "../data/achievements.js";
import "./Dashboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(id);
  }, []);

  // Bonus feature: celebrate when today's progress is high
  // useEffect(() => {
  //   if (!loading && todayProgress >= 60) {
  //     setCelebrate(true);
  //     showToast("Amazing! You're crushing today 🎉", "success");
  //     const id = setTimeout(() => setCelebrate(false), 3000);
  //     return () => clearTimeout(id);
  //   }
  // }, [loading, showToast]);
  useEffect(() => {
  const hasCelebrated = sessionStorage.getItem("dashboard-celebrated");

  if (!loading && todayProgress >= 60 && !hasCelebrated) {
    setCelebrate(true);
   showToast(
  <div className="toast-message">
    <PartyPopper className="toast-icon" />
    <span>Amazing! You're crushing today!</span>
  </div>,
  "success"
);

    sessionStorage.setItem("dashboard-celebrated", "1");

    const id = setTimeout(() => setCelebrate(false), 3000);
    return () => clearTimeout(id);
  }
}, [loading, showToast]);

  if (loading) return <LoadingSpinner label="Loading your dashboard..." />;

  return (
    <div className="dashboard">
      {celebrate && <Confetti />}
      <div className="dashboard__stats">
        {stats.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      <div className="dashboard__row">
        <TodayProgress value={todayProgress} />
        <QuoteOfTheDay />
        <CalendarWidget />
      </div>

      <div className="dashboard__row dashboard__row--wide">
        <RecentTasks tasks={recentTasks} />
        <QuickActions actions={defaultQuickActions} />
      </div>

      <AchievementsPreview achievements={achievements} />
    </div>
  );
}
