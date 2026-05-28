import { useState, useEffect } from "react";
import {
  FaBell,
  FaMoon,
  FaUserShield,
  FaSave,
  FaUndo,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(true);

  const [twoFactor, setTwoFactor] =
    useState(false);

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("settings") || "{}"
    );

    if (Object.keys(savedSettings).length) {
      setNotifications(
        savedSettings.notifications ?? true
      );

      setDarkMode(
        savedSettings.darkMode ?? true
      );

      setTwoFactor(
        savedSettings.twoFactor ?? false
      );
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      notifications,
      darkMode,
      twoFactor,
    };

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    toast.success(
      "Settings Saved Successfully ✅"
    );
  };

  const resetSettings = () => {
    setNotifications(true);
    setDarkMode(true);
    setTwoFactor(false);

    localStorage.removeItem("settings");

    toast.success(
      "Settings Reset Successfully 🔄"
    );
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your account preferences
          </p>
        </div>

        <div className="space-y-6">

          {/* Notifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center">

            <div className="flex items-center gap-4">

              <FaBell className="text-indigo-400 text-2xl" />

              <div>
                <h3 className="text-white text-lg font-medium">
                  Notifications
                </h3>

                <p className="text-slate-400 text-sm">
                  Enable interview reminders
                </p>
              </div>

            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(
                  !notifications
                )
              }
              className="w-5 h-5 cursor-pointer"
            />

          </div>

          {/* Dark Mode */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center">

            <div className="flex items-center gap-4">

              <FaMoon className="text-yellow-400 text-2xl" />

              <div>
                <h3 className="text-white text-lg font-medium">
                  Dark Mode
                </h3>

                <p className="text-slate-400 text-sm">
                  Toggle dark theme
                </p>
              </div>

            </div>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className="w-5 h-5 cursor-pointer"
            />

          </div>

          {/* Two Factor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center">

            <div className="flex items-center gap-4">

              <FaUserShield className="text-green-400 text-2xl" />

              <div>
                <h3 className="text-white text-lg font-medium">
                  Two Factor Authentication
                </h3>

                <p className="text-slate-400 text-sm">
                  Extra security for account
                </p>
              </div>

            </div>

            <input
              type="checkbox"
              checked={twoFactor}
              onChange={() =>
                setTwoFactor(
                  !twoFactor
                )
              }
              className="w-5 h-5 cursor-pointer"
            />

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-end gap-4">

            <button
              onClick={resetSettings}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-3"
            >
              <FaUndo />
              Reset
            </button>

            <button
              onClick={saveSettings}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl text-white font-semibold flex items-center gap-3"
            >
              <FaSave />
              Save Settings
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;