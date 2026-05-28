import { useState } from "react";
import {
  FaHistory,
  FaTrash,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function History() {
  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [history, setHistory] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "interviewHistory"
        ) || "[]"
      )
    );

  const filteredHistory =
    history.filter((item) =>
      item.role
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const clearHistory = () => {
    localStorage.removeItem(
      "interviewHistory"
    );

    setHistory([]);

    toast.success(
      "History Cleared 🗑️"
    );
  };

  const viewResult = (item) => {
    localStorage.setItem(
      "interviewResult",
      JSON.stringify(item)
    );

    navigate("/result");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div>

            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <FaHistory />
              Interview History
            </h1>

            <p className="text-slate-400 mt-2">
              View all your completed
              interview sessions
            </p>

          </div>

          <button
            onClick={clearHistory}
            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white flex items-center gap-2"
          >
            <FaTrash />
            Clear History
          </button>

        </div>

        {/* Search */}
        <div className="mt-8 relative">

          <FaSearch className="absolute left-4 top-4 text-slate-500" />

          <input
            type="text"
            placeholder="Search by role..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-indigo-500"
          />

        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400 mt-8">

            No interviews completed yet.

          </div>
        ) : (
          <div className="grid gap-6 mt-8">

            {filteredHistory.map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >

                  <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-semibold text-white">
                        {item.role}
                      </h2>

                      <p className="text-slate-400 mt-2">
                        Difficulty:
                        {" "}
                        {item.difficulty}
                      </p>

                      <p className="text-slate-400">
                        Questions:
                        {" "}
                        {item.totalQuestions}
                      </p>

                      <p className="text-slate-500 mt-2">
                        {
                          item.completedAt
                        }
                      </p>

                    </div>

                    <div className="flex flex-col items-end gap-3">

                      <div
                        className={`px-4 py-2 rounded-full font-semibold ${
                          item.score >= 80
                            ? "bg-green-600 text-white"
                            : item.score >= 60
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {item.score}/100
                      </div>

                      <button
                        onClick={() =>
                          viewResult(
                            item
                          )
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-white flex items-center gap-2"
                      >
                        <FaEye />
                        View Report
                      </button>

                    </div>

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

export default History;