import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";

function DashboardLayout() {
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
      <div className="flex-1 flex flex-col">

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">

          <button
            onClick={() =>
              setIsOpen(true)
            }
            className="text-white text-2xl"
          >
            <FaBars />
          </button>

          <h2 className="text-xl font-bold text-white">
            IntervoAI
          </h2>

          {/* Empty space for balance */}
          <div className="w-6" />

        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;