import {
  FaClipboardList,
  FaChartLine,
  FaRobot,
  FaPlus,
  FaArrowUp,
  FaTrophy,
  FaBrain,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const history = JSON.parse(
    localStorage.getItem("interviewHistory") || "[]"
  );

  const totalInterviews =
    history.length;

  const avgScore =
    history.length > 0
      ? Math.round(
          history.reduce(
            (sum, item) =>
              sum + (item.score || 0),
            0
          ) / history.length
        )
      : 0;

  const totalReports =
    history.length;

  const bestScore =
    history.length > 0
      ? Math.max(
          ...history.map(
            (item) =>
              item.score || 0
          )
        )
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div
          className="
          relative overflow-hidden
          bg-slate-900/70
          backdrop-blur-xl
          border border-slate-800
          rounded-3xl
          p-8 md:p-10
          shadow-2xl
          shadow-indigo-500/10
        "
        >

          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 items-center">

            <div>

              <p className="text-indigo-400 font-medium mb-3">
                AI Powered Interview Platform
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Welcome Back,
                <span className="text-indigo-400">
                  {" "}
                  {user?.name || "User"}
                </span>{" "}
                👋
              </h1>

              <p className="text-slate-400 mt-4 text-lg max-w-2xl">
                Track your interview performance,
                improve your communication skills,
                and crack your dream job with
                AI-powered mock interviews.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <div className="bg-slate-800 px-4 py-2 rounded-xl text-white">
                  📋 {totalInterviews} Interviews
                </div>

                <div className="bg-slate-800 px-4 py-2 rounded-xl text-green-400">
                  📈 {avgScore}% Avg Score
                </div>

                <div className="bg-slate-800 px-4 py-2 rounded-xl text-yellow-400">
                  🏆 {bestScore}% Best Score
                </div>

              </div>

            </div>

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  navigate("/setup")
                }
                className="
                  flex items-center gap-3
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  hover:scale-105
                  transition-all
                  duration-300
                  px-7 py-4
                  rounded-xl
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-indigo-500/30
                "
              >
                <FaPlus />
                Start Interview
              </button>

              <button
                onClick={handleLogout}
                className="
                  px-7 py-4
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-semibold
                  transition
                "
              >
                Logout
              </button>

            </div>

          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <div
            className="
            bg-slate-900/70
            backdrop-blur-xl
            border border-slate-800
            rounded-3xl
            p-6
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:border-indigo-500
            hover:shadow-xl
            hover:shadow-indigo-500/20
          "
          >
            <FaClipboardList className="text-4xl text-indigo-400 mb-4" />

            <h2 className="text-4xl font-bold text-white">
              {totalInterviews}
            </h2>

            <p className="text-slate-400 mt-2">
              Interviews Completed
            </p>
          </div>

          <div
            className="
            bg-slate-900/70
            backdrop-blur-xl
            border border-slate-800
            rounded-3xl
            p-6
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:border-green-500
            hover:shadow-xl
            hover:shadow-green-500/20
          "
          >
            <FaChartLine className="text-4xl text-green-400 mb-4" />

            <h2 className="text-4xl font-bold text-white">
              {avgScore}%
            </h2>

            <p className="text-slate-400 mt-2">
              Average Score
            </p>
          </div>

          <div
            className="
            bg-slate-900/70
            backdrop-blur-xl
            border border-slate-800
            rounded-3xl
            p-6
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:border-purple-500
            hover:shadow-xl
            hover:shadow-purple-500/20
          "
          >
            <FaRobot className="text-4xl text-purple-400 mb-4" />

            <h2 className="text-4xl font-bold text-white">
              {totalReports}
            </h2>

            <p className="text-slate-400 mt-2">
              AI Reports
            </p>
          </div>

          <div
            className="
            bg-slate-900/70
            backdrop-blur-xl
            border border-slate-800
            rounded-3xl
            p-6
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:border-yellow-500
            hover:shadow-xl
            hover:shadow-yellow-500/20
          "
          >
            <FaTrophy className="text-4xl text-yellow-400 mb-4" />

            <h2 className="text-4xl font-bold text-white">
              {bestScore}%
            </h2>

            <p className="text-slate-400 mt-2">
              Best Score
            </p>
          </div>

        </div>        {/* Performance + AI Suggestions */}
        <div className="grid lg:grid-cols-2 gap-6 mt-10">

          {/* Performance Card */}
          <div
            className="
            bg-slate-900/70
            backdrop-blur-xl
            border border-slate-800
            rounded-3xl
            p-8
          "
          >
            <div className="flex items-center gap-3 mb-5">

              <FaArrowUp className="text-green-400 text-2xl" />

              <h2 className="text-2xl font-bold text-white">
                Performance Growth
              </h2>

            </div>

            <p className="text-slate-400 leading-8">
              Complete more interviews regularly
              to improve communication,
              technical skills and confidence.
            </p>

            <div className="mt-8">

              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Current Level</span>
                <span>Goal 90%</span>
              </div>

              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="
                  h-full
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  rounded-full
                "
                  style={{
                    width: `${avgScore}%`,
                  }}
                />

              </div>

              <p className="text-white mt-4 font-semibold">
                Overall Progress: {avgScore}%
              </p>

            </div>

          </div>

          {/* AI Suggestions */}
          <div
            className="
            bg-slate-900/70
            backdrop-blur-xl
            border border-slate-800
            rounded-3xl
            p-8
          "
          >
            <div className="flex items-center gap-3 mb-6">

              <FaBrain className="text-indigo-400 text-2xl" />

              <h2 className="text-2xl font-bold text-white">
                AI Suggestions
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
                ✓ Improve HR Communication
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
                ✓ Explain Projects Clearly
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
                ✓ Practice Coding Daily
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
                ✓ Focus On System Design
              </div>

            </div>

          </div>

        </div>

        {/* Recent Interviews */}
        <div
          className="
          bg-slate-900/70
          backdrop-blur-xl
          border border-slate-800
          rounded-3xl
          p-8
          mt-10
        "
        >

          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Interviews
          </h2>

          {history.length === 0 ? (

            <div className="text-center py-12 text-slate-400">
              No interview history available yet.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-800">

                    <th className="py-4 text-left text-slate-400">
                      Role
                    </th>

                    <th className="py-4 text-left text-slate-400">
                      Difficulty
                    </th>

                    <th className="py-4 text-left text-slate-400">
                      Score
                    </th>

                    <th className="py-4 text-left text-slate-400">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {history
                    .slice(0, 5)
                    .map(
                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={index}
                          className="border-b border-slate-800"
                        >

                          <td className="py-4 text-white">
                            {item.role}
                          </td>

                          <td className="py-4">

                            <span
                              className={`
                              px-3 py-1 rounded-full text-sm
                              ${
                                item.difficulty === "Easy"
                                  ? "bg-green-500/20 text-green-400"
                                  : item.difficulty === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }
                            `}
                            >
                              {item.difficulty}
                            </span>

                          </td>

                          <td className="py-4">

                            <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full">
                              {item.score}%
                            </span>

                          </td>

                          <td className="py-4 text-slate-400">
                            {item.completedAt}
                          </td>

                        </tr>

                      )
                    )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;