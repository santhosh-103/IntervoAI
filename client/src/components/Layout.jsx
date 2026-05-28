import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content */}
      <div className="flex-1">

        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-slate-800">

          <button
            onClick={() =>
              setIsOpen(true)
            }
            className="text-white text-xl"
          >
            <FaBars />
          </button>

        </div>

        {/* Page Content */}
        <main>
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;