import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  FaChartLine,
  FaTrophy,
  FaClipboardList,
  FaRobot,
} from "react-icons/fa";

function Analytics() {
  const history = JSON.parse(
    localStorage.getItem(
      "interviewHistory"
    ) || "[]"
  );

  const totalInterviews =
    history.length;

  const averageScore =
    totalInterviews > 0
      ? Math.round(
          history.reduce(
            (sum, item) =>
              sum +
              (item.score || 0),
            0
          ) / totalInterviews
        )
      : 0;

  const highestScore =
    totalInterviews > 0
      ? Math.max(
          ...history.map(
            (item) =>
              item.score || 0
          )
        )
      : 0;

  const progressData =
    history.length > 0
      ? history
          .slice()
          .reverse()
          .map(
            (
              item,
              index
            ) => ({
              name: `#${index + 1}`,
              score:
                item.score || 0,
            })
          )
      : [
          {
            name: "No Data",
            score: 0,
          },
        ];

  const roleMap = {};

  history.forEach((item) => {
    const role =
      item.role ||
      "Interview";

    if (!roleMap[role]) {
      roleMap[role] = {
        total: 0,
        count: 0,
      };
    }

    roleMap[role].total +=
      item.score || 0;

    roleMap[role].count += 1;
  });

  const companyData =
    Object.keys(roleMap).map(
      (role) => ({
        company: role,
        score: Math.round(
          roleMap[role].total /
            roleMap[role].count
        ),
      })
    );

  const interviewTypes =
    Object.keys(roleMap).map(
      (role) => ({
        name: role,
        value:
          roleMap[role].count,
      })
    );

  const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
    "#8B5CF6",
  ];

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">
            Analytics Dashboard 📊
          </h1>

          <p className="text-slate-400 mt-3">
            Track your interview
            performance, growth and
            AI insights.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-indigo-500 transition-all">

            <FaClipboardList className="text-indigo-400 text-3xl mb-4" />

            <h3 className="text-slate-400">
              Interviews
            </h3>

            <p className="text-4xl font-bold text-white mt-2">
              {totalInterviews}
            </p>

            <span className="text-green-400 text-sm">
              Practice sessions
            </span>

          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-green-500 transition-all">

            <FaChartLine className="text-green-400 text-3xl mb-4" />

            <h3 className="text-slate-400">
              Average Score
            </h3>

            <p className="text-4xl font-bold text-green-400 mt-2">
              {averageScore}%
            </p>

            <span className="text-slate-400 text-sm">
              Overall performance
            </span>

          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-yellow-500 transition-all">

            <FaTrophy className="text-yellow-400 text-3xl mb-4" />

            <h3 className="text-slate-400">
              Highest Score
            </h3>

            <p className="text-4xl font-bold text-yellow-400 mt-2">
              {highestScore}%
            </p>

            <span className="text-slate-400 text-sm">
              Personal best
            </span>

          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-purple-500 transition-all">

            <FaRobot className="text-purple-400 text-3xl mb-4" />

            <h3 className="text-slate-400">
              Interview Types
            </h3>

            <p className="text-4xl font-bold text-purple-400 mt-2">
              {Object.keys(roleMap)
                .length}
            </p>

            <span className="text-slate-400 text-sm">
              Categories practiced
            </span>

          </div>

        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Line Chart */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl shadow-indigo-500/5">

            <h2 className="text-2xl font-bold text-white mb-6">
              Performance Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={progressData}
              >
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#0F172A",
                    border:
                      "1px solid #334155",
                    borderRadius:
                      "12px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366F1"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* Pie Chart */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl shadow-indigo-500/5">

            <h2 className="text-2xl font-bold text-white mb-6">
              Interview Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>

                <Pie
                  data={
                    interviewTypes
                  }
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  label
                >
                  {interviewTypes.map(
                    (
                      _,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background:
                      "#0F172A",
                    border:
                      "1px solid #334155",
                    borderRadius:
                      "12px",
                    color: "#fff",
                  }}
                />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* Role Wise Performance */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 mt-10 shadow-xl shadow-indigo-500/5">

          <h2 className="text-2xl font-bold text-white mb-6">
            Role Wise Performance
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              data={companyData}
            >
              <XAxis
                dataKey="company"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
              />

              <Tooltip
                contentStyle={{
                  background:
                    "#0F172A",
                  border:
                    "1px solid #334155",
                  borderRadius:
                    "12px",
                  color: "#fff",
                }}
                cursor={{
                  fill:
                    "rgba(99,102,241,0.15)",
                }}
              />

              <Legend />

              <Bar
                dataKey="score"
                fill="#6366F1"
                radius={[
                  12,
                  12,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* AI Suggestions */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 mt-10 shadow-xl shadow-indigo-500/5">

          <h2 className="text-2xl font-bold text-white">
            🤖 AI Suggestions
          </h2>

          <div className="mt-6 grid md:grid-cols-2 gap-4">

            <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
              ✓ Practice HR answers
              naturally.
            </div>

            <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
              ✓ Improve project
              explanation clarity.
            </div>

            <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
              ✓ Continue coding
              rounds daily.
            </div>

            <div className="bg-slate-800 rounded-2xl p-4 text-slate-300">
              ✓ Focus on system
              design concepts.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Analytics;