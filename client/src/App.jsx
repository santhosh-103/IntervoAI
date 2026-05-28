import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* Public Components */
import Navbar from "./components/Navbar";

/* Layout */
import DashboardLayout from "./layouts/DashboardLayout";

/* Public Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Dashboard Pages */
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import VoiceInterview from "./pages/VoiceInterview";
import VideoInterview from "./pages/VideoInterview";
import CodingRound from "./pages/CodingRound";
import CompanyInterview from "./pages/CompanyInterview";
import ResumeInterview from "./pages/ResumeInterview";
import SystemDesign from "./pages/SystemDesign";
import History from "./pages/History";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";

/* Protected Route */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />

        {/* Protected Dashboard Routes */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/setup"
            element={<InterviewSetup />}
          />

          <Route
            path="/interview"
            element={<Interview />}
          />

          <Route
            path="/voice-interview"
            element={<VoiceInterview />}
          />

          <Route
            path="/video-interview"
            element={<VideoInterview />}
          />

          <Route
            path="/coding-round"
            element={<CodingRound />}
          />

          <Route
            path="/company-interview"
            element={<CompanyInterview />}
          />

          <Route
            path="/resume-interview"
            element={<ResumeInterview />}
          />

          <Route
            path="/system-design"
            element={<SystemDesign />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/result"
            element={<Result />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

        </Route>

        {/* 404 Route */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;