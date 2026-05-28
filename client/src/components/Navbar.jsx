import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] =
    useState(false);

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navLinkClass = ({
    isActive,
  }) =>
    `transition font-medium ${
      isActive
        ? "text-indigo-400"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <nav
      className="
      sticky top-0 z-50
      bg-slate-950/70
      backdrop-blur-xl
      border-b border-white/10
    "
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div
              className="
              w-10 h-10
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              flex items-center justify-center
              text-white font-bold
            "
            >
              AI
            </div>

            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Intervo
              <span className="text-indigo-400">
                AI
              </span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">

            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>

            {token && (
              <>
                <NavLink
                  to="/dashboard"
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/analytics"
                  className={navLinkClass}
                >
                  Analytics
                </NavLink>

                <NavLink
                  to="/history"
                  className={navLinkClass}
                >
                  History
                </NavLink>
              </>
            )}

          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">

            {token ? (
              <>
                <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-2">

                  <FaUserCircle className="text-2xl text-indigo-400" />

                  <div>
                    <p className="text-white text-sm font-semibold">
                      {user?.name ||
                        "User"}
                    </p>

                    <p className="text-slate-400 text-xs">
                      {user?.email ||
                        ""}
                    </p>
                  </div>

                </div>

                <button
                  onClick={logout}
                  className="
                    flex items-center gap-2
                    px-5 py-3
                    rounded-xl
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    transition
                  "
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    px-5 py-3
                    rounded-xl
                    border border-slate-700
                    text-white
                    hover:bg-slate-800
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    px-6 py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-600
                    to-purple-600
                    hover:scale-105
                    transition
                    text-white
                    font-semibold
                    shadow-lg
                  "
                >
                  Get Started
                </Link>
              </>
            )}

          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >
            {isOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="
            lg:hidden
            mb-4
            bg-slate-900/95
            backdrop-blur-xl
            border border-slate-800
            rounded-2xl
            p-5
          "
          >
            <div className="flex flex-col gap-4">

              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                Home
              </NavLink>

              {token && (
                <>
                  <NavLink
                    to="/dashboard"
                    className={navLinkClass}
                    onClick={() =>
                      setIsOpen(false)
                    }
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/analytics"
                    className={navLinkClass}
                    onClick={() =>
                      setIsOpen(false)
                    }
                  >
                    Analytics
                  </NavLink>

                  <NavLink
                    to="/history"
                    className={navLinkClass}
                    onClick={() =>
                      setIsOpen(false)
                    }
                  >
                    History
                  </NavLink>
                </>
              )}

              {token ? (
                <>
                  <div className="bg-slate-800 rounded-xl p-4">

                    <p className="text-white font-semibold">
                      {user?.name ||
                        "User"}
                    </p>

                    <p className="text-slate-400 text-sm">
                      {user?.email ||
                        ""}
                    </p>

                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="
                      flex items-center
                      justify-center
                      gap-2
                      bg-red-600
                      text-white
                      rounded-xl
                      py-3
                    "
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="
                      text-center
                      border border-slate-700
                      rounded-xl
                      py-3
                      text-white
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="
                      text-center
                      rounded-xl
                      py-3
                      text-white
                      bg-gradient-to-r
                      from-indigo-600
                      to-purple-600
                    "
                  >
                    Get Started
                  </Link>
                </>
              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;