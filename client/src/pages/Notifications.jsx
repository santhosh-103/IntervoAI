import { useState, useEffect } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaUserEdit,
  FaCode,
  FaTrash,
  FaCheck,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Notifications() {
  const defaultNotifications = [
    {
      id: 1,
      message:
        "Interview completed successfully 🎉",
      time: "2 mins ago",
      type: "success",
      unread: true,
    },
    {
      id: 2,
      message:
        "New Java interview questions added 🚀",
      time: "1 hour ago",
      type: "code",
      unread: true,
    },
    {
      id: 3,
      message:
        "Profile updated successfully ✅",
      time: "Yesterday",
      type: "profile",
      unread: false,
    },
  ];

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    const savedNotifications =
      JSON.parse(
        localStorage.getItem(
          "notifications"
        ) || "null"
      );

    if (savedNotifications) {
      setNotifications(
        savedNotifications
      );
    } else {
      setNotifications(
        defaultNotifications
      );

      localStorage.setItem(
        "notifications",
        JSON.stringify(
          defaultNotifications
        )
      );
    }
  }, []);

  const updateStorage = (data) => {
    setNotifications(data);

    localStorage.setItem(
      "notifications",
      JSON.stringify(data)
    );
  };

  const markAsRead = (id) => {
    const updated =
      notifications.map((item) =>
        item.id === id
          ? {
              ...item,
              unread: false,
            }
          : item
      );

    updateStorage(updated);

    toast.success(
      "Notification marked as read"
    );
  };

  const deleteNotification = (id) => {
    const updated =
      notifications.filter(
        (item) => item.id !== id
      );

    updateStorage(updated);

    toast.success(
      "Notification deleted"
    );
  };

  const clearAll = () => {
    updateStorage([]);

    toast.success(
      "All notifications cleared"
    );
  };

  const unreadCount =
    notifications.filter(
      (item) => item.unread
    ).length;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <FaCheckCircle />
        );

      case "profile":
        return <FaUserEdit />;

      case "code":
        return <FaCode />;

      default:
        return <FaBell />;
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-indigo-600 p-4 rounded-2xl">
              <FaBell className="text-white text-2xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                Notifications
              </h1>

              <p className="text-slate-400 mt-1">
                Stay updated with your
                interview activities
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-white">
              Unread:
              {" "}
              {unreadCount}
            </div>

            {notifications.length >
              0 && (
              <button
                onClick={clearAll}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white flex items-center gap-2"
              >
                <FaTrash />
                Clear All
              </button>
            )}

          </div>

        </div>

        {/* Empty State */}
        {notifications.length ===
        0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

            <p className="text-slate-400">
              No notifications
              available.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {notifications.map(
              (item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-4"
                >

                  <div className="flex items-center gap-4">

                    <div className="text-indigo-400 text-2xl">
                      {getIcon(
                        item.type
                      )}
                    </div>

                    <div>
                      <h3 className="text-white">
                        {
                          item.message
                        }
                      </h3>

                      <p className="text-slate-500 text-sm mt-1">
                        {item.time}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    {item.unread && (
                      <>
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                          New
                        </span>

                        <button
                          onClick={() =>
                            markAsRead(
                              item.id
                            )
                          }
                          className="bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-lg text-white"
                        >
                          <FaCheck />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() =>
                        deleteNotification(
                          item.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Notifications;