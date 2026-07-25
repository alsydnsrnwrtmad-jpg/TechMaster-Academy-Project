import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing, { VISITED_KEY } from "./pages/Landing.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFound from "./pages/NotFound.jsx";

// First-time visitors are sent to /welcome (Landing) before the
// Dashboard, matching the deck's Application Flow: Landing → Dashboard.
// Returning visitors go straight to the Dashboard. This does NOT change
// the required route: "/" still renders Dashboard, exactly as specified.
function DashboardEntry() {
  const hasVisited = sessionStorage.getItem(VISITED_KEY) === "1";
  if (!hasVisited) return <Navigate to="/welcome" replace />;
  return <Dashboard />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardEntry />} />
        <Route
          path="/tasks"
          element={<PlaceholderPage title="Tasks" owner="Developer 2" />}
        />
        <Route
          path="/notes"
          element={<PlaceholderPage title="Notes" owner="Developer 2" />}
        />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
