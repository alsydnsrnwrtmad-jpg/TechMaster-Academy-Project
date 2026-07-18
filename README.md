# Student Hub — Developer 1 Part (Layout & Dashboard)

This is Developer 1's part of the **TechMaster Student Hub** project,
built to match the architecture required in the project deck (folder
structure, component tree, routing) without changing it — so Developer 2
and Developer 3 can drop their pages straight in.

## What's included (Developer 1 scope)
- Project setup: Vite, folder structure, `App.jsx`, `main.jsx`
- `Navbar`, `Sidebar`, `Footer`
- `Dashboard` page: Statistics, Today's Progress, Recent Tasks, Quick Actions
- Greeting by time of day, Quote of the Day, Calendar Widget, Circular Progress
- Dark/Light Mode, Glassmorphism, Gradient background, Floating Shapes, Loading Spinner

## +6 extra creative features added
1. **Toast Notifications** — global toast system (`context/ToastContext.jsx`), triggered from the theme toggle and the notification bell in the Navbar
2. **Animations** — page-transition fade on route change, hover micro-interactions on cards/links, floating background shapes
3. **Achievement Cards** — `AchievementsPreview` widget on the Dashboard
4. **Mobile Drawer** — Sidebar becomes an off-canvas drawer with overlay below 960px, toggled from the Navbar hamburger
5. **Custom 404 Page** — `pages/NotFound.jsx`, wired into `App.jsx` via a catch-all route
6. **Drag & Drop** — Quick Actions shortcuts on the Dashboard can be reordered by dragging

## Landing Page (unassigned in the team doc, added here)
The deck's "Application Flow" slide lists **Landing → Dashboard → ...**, but
no one owned it in the team-division doc. Since it's part of app setup, it's
included here:
- `pages/Landing.jsx` — hero entry screen at `/welcome`
- First-time visitors are auto-redirected from `/` to `/welcome`
  (tracked in `localStorage`); once they click "Enter your hub," `/` always
  goes straight to the Dashboard. **The required route table is untouched** —
  `/` still renders the Dashboard, exactly as the deck specifies.

## Bonus polish features (beyond the required 6)
- **Command Palette (Ctrl/Cmd + K)** — jump to any page instantly from anywhere in the app
- **Live clock** in the Navbar
- **Collapsible sidebar** on desktop (icon-only rail), independent from the mobile drawer
- **Celebration confetti + toast** when today's progress is high
- **Back-to-top floating button** on scroll

## Folder structure (unchanged, per the deck)
```
src/
  assets/
  components/
    layout/    → Navbar, Sidebar, Footer, Layout, FloatingShapes
    ui/        → Card, Button, CircularProgress, LoadingSpinner, Toast
    dashboard/ → StatCard, TodayProgress, QuoteOfTheDay, CalendarWidget,
                 RecentTasks, QuickActions, AchievementCard, AchievementsPreview
  pages/       → Dashboard, NotFound, PlaceholderPage
  data/        → mock data (quotes, achievements, dashboard stats)
  hooks/       → useGreeting
  context/     → ThemeContext, ToastContext
  App.jsx
  main.jsx
```

## Routes (matches the deck, + Landing added on top)
| Path        | Page        | Status                          |
|-------------|-------------|----------------------------------|
| `/welcome`  | Landing     | ✅ built (new, unassigned in the doc) |
| `/`         | Dashboard   | ✅ built (required route, unchanged) |
| `/tasks`    | Tasks       | placeholder for Developer 2      |
| `/notes`    | Notes       | placeholder for Developer 2      |
| `/resources`| Resources   | placeholder for Developer 3      |
| `/profile`  | Profile     | placeholder for Developer 3      |
| `*`         | 404         | ✅ built                        |

## Handing off to teammates
- Developer 2: replace `PlaceholderPage` on `/tasks` and `/notes` with real
  `Tasks.jsx` / `Notes.jsx` pages, reusing `Card` / `Button` from `components/ui`.
- Developer 3: replace `PlaceholderPage` on `/resources` and `/profile`, and
  wire up React Router's `Active Links` / responsive layout details.
- Everyone: keep using the design tokens in `src/index.css`
  (`--primary`, `--accent`, fonts, radii) so the whole app stays visually consistent.

## Run it
```bash
npm install
npm run dev
```
