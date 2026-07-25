import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing, { VISITED_KEY } from "./pages/Landing.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";

// First-time visitors are sent to /welcome (Landing) before the
// Dashboard, matching the deck's Application Flow: Landing → Dashboard.
// Returning visitors go straight to the Dashboard. This does NOT change
// the required route: "/" still renders Dashboard, exactly as specified.
function DashboardEntry() {
  const hasVisited = sessionStorage.getItem(VISITED_KEY) === "1";
  if (!hasVisited) return <Navigate to="/welcome" replace />;
  return <Dashboard />;
}

// NOTE for the team:
// Routes below match the architecture agreed in the project deck.
// /tasks, /notes, /resources, /profile are placeholders here —
// Developer 2 and Developer 3 will drop their real pages into
// src/pages/ and swap them in without touching this file's structure.
export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardEntry />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route
          path="/resources"
          element={<PlaceholderPage title="Resources" owner="Developer 3" />}
        />
        <Route
          path="/profile"
          element={<PlaceholderPage title="Profile" owner="Developer 3" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
