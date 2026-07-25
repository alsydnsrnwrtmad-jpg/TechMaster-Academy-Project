export const stats = [
  { id: "s1", label: "Total Tasks", value: 12, icon: "ListChecks", tint: "primary" },
  { id: "s2", label: "Completed", value: 8, icon: "CheckCircle2", tint: "accent" },
  { id: "s3", label: "In Progress", value: 3, icon: "Clock3", tint: "amber" },
  { id: "s4", label: "Day Streak", value: 6, icon: "Flame", tint: "warm" },
];

export const todayProgress = 67;

export const recentTasks = [
  { id: "t1", title: "Finish React Hooks lesson", priority: "High", status: "In Progress" },
  { id: "t2", title: "Submit Portfolio project", priority: "Medium", status: "Pending" },
  { id: "t3", title: "Review JavaScript ES6+", priority: "Low", status: "Done" },
  { id: "t4", title: "Watch React Router video", priority: "Medium", status: "Pending" },
];

export const defaultQuickActions = [
  { id: "qa1", label: "Add Task", icon: "ListPlus", to: "/tasks" },
  { id: "qa2", label: "Add Note", icon: "StickyNote", to: "/notes" },
  { id: "qa3", label: "Browse Resources", icon: "BookOpen", to: "/resources" },
  { id: "qa4", label: "View Profile", icon: "UserCircle2", to: "/profile" },
];
