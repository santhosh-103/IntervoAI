import {
  FaHome,
  FaChartLine,
  FaMicrophone,
  FaVideo,
  FaCode,
  FaBuilding,
  FaFileAlt,
  FaProjectDiagram,
  FaHistory,
  FaUser,
  FaCog,
  FaBell,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-72 min-h-screen bg-slate-900
          border-r border-slate-800
          transform transition-transform duration-300
          flex flex-col
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold text-white">
              Intervo
              <span className="text-indigo-500">
                AI
              </span>
            </h1>

            <button
              className="lg:hidden text-white"
              onClick={() =>
                setIsOpen(false)
              }
            >
              <FaTimes />
            </button>

          </div>

        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-5">

          <div className="flex flex-col gap-2">

            <NavLink
              to="/dashboard"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/analytics"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaChartLine />
              Analytics
            </NavLink>

            <NavLink
              to="/voice-interview"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaMicrophone />
              Voice AI
            </NavLink>

            <NavLink
              to="/video-interview"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaVideo />
              Video AI
            </NavLink>

            <NavLink
              to="/coding-round"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaCode />
              Coding Round
            </NavLink>

            <NavLink
              to="/company-interview"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaBuilding />
              Company Interviews
            </NavLink>

            <NavLink
              to="/resume-interview"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaFileAlt />
              Resume AI
            </NavLink>

            <NavLink
              to="/system-design"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaProjectDiagram />
              System Design
            </NavLink>

            <NavLink
              to="/history"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaHistory />
              History
            </NavLink>

            <NavLink
              to="/profile"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaUser />
              Profile
            </NavLink>

            <NavLink
              to="/settings"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaCog />
              Settings
            </NavLink>

            <NavLink
              to="/notifications"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <FaBell />
              Notifications
            </NavLink>

          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800">

          {/* User Info */}
          <div className="mb-4 bg-slate-800 rounded-xl p-4">

            <h3 className="text-white font-semibold">
              {user?.name || "User"}
            </h3>

            <p className="text-slate-400 text-sm mt-1 break-all">
              {user?.email || "No Email"}
            </p>

          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;