import {
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaChartLine,
  FaRedo,
  FaHome,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

function Result() {

  const navigate =
    useNavigate();

  const result =
    JSON.parse(
      localStorage.getItem(
        "interviewResult"
      ) || "{}"
    );

  // FIXED SCORE BUG

  const score =
    result.score ?? 0;

  const attemptedQuestions =
    result.answeredCount ?? 0;

  const totalQuestions =
    result.totalQuestions ?? 10;

  const scoreColor =
    score >= 80
      ? "text-green-400"
      : score >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const progressColor =
    score >= 80
      ? "stroke-green-500"
      : score >= 60
      ? "stroke-yellow-500"
      : "stroke-red-500";

  const technicalScore =
    Math.max(
      score - 5,
      0
    );

  const communicationScore =
    Math.max(
      score - 8,
      0
    );

  const hrScore =
    Math.max(
      score - 3,
      0
    );

  const grammar =
    (
      score / 10
    ).toFixed(1);

  const vocabulary =
    (
      score / 11
    ).toFixed(1);

  const confidence =
    (
      score / 9.5
    ).toFixed(1);

  const speakingSpeed =
    (
      score / 12
    ).toFixed(1);

  const downloadReport =
    () => {

      toast.success(
        "PDF Download Feature Coming Soon 🚀"
      );

    };

  const retakeInterview =
    () => {

      navigate(
        "/setup"
      );

    };

  const goDashboard =
    () => {

      navigate(
        "/dashboard"
      );

    };

  return (

    <div className="min-h-screen px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center">

          <h1 className="text-5xl font-bold text-white">

            Interview Report

          </h1>

          <p className="text-slate-400 mt-4">

            Detailed AI evaluation of your interview performance

          </p>

        </div>

        {/* Overall Score */}

        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Circular Chart */}

            <div className="relative w-64 h-64 flex items-center justify-center">

              <svg className="w-64 h-64 rotate-[-90deg]">

                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  strokeWidth="15"
                  className="stroke-slate-700 fill-none"
                />

                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  strokeWidth="15"
                  strokeLinecap="round"
                  className={`${progressColor} fill-none`}
                  strokeDasharray="628"
                  strokeDashoffset={
                    628 -
                    (628 *
                      score) /
                      100
                  }
                />

              </svg>

              <div className="absolute text-center">

                <h1 className={`text-6xl font-bold ${scoreColor}`}>

                  {score}%

                </h1>

                <p className="text-slate-400 mt-2">

                  Overall Score

                </p>

              </div>

            </div>

            {/* Details */}

            <div className="flex-1">

              <h2 className={`text-3xl font-bold ${scoreColor}`}>

                {score >= 90
                  ? "Outstanding Performance 🚀"
                  : score >= 80
                  ? "Excellent Performance 🎉"
                  : score >= 70
                  ? "Good Performance 👍"
                  : score >= 40
                  ? "Average Performance 📚"
                  : "Needs Improvement ❌"}

              </h2>

              <div className="mt-6 space-y-3 text-slate-300 text-lg">

                <p>

                  <strong>Role:</strong>{" "}

                  {result.role ||
                    "MERN Developer"}

                </p>

                <p>

                  <strong>Difficulty:</strong>{" "}

                  {result.difficulty ||
                    "Medium"}

                </p>

                <p>

                  <strong>Total Questions:</strong>{" "}

                  {totalQuestions}

                </p>

                <p>

                  <strong>Attempted Questions:</strong>{" "}

                  {attemptedQuestions}

                </p>

                <p>

                  <strong>Feedback:</strong>{" "}

                  {result.feedback ||
                    "No Feedback"}

                </p>

                <p>

                  <strong>Completed:</strong>{" "}

                  {result.completedAt ||
                    new Date().toLocaleDateString()}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Score Cards */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-white text-xl font-semibold">

              Technical Score

            </h3>

            <p className="text-5xl font-bold text-indigo-500 mt-4">

              {technicalScore}

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-white text-xl font-semibold">

              Communication

            </h3>

            <p className="text-5xl font-bold text-green-500 mt-4">

              {communicationScore}

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-white text-xl font-semibold">

              HR Round

            </h3>

            <p className="text-5xl font-bold text-yellow-500 mt-4">

              {hrScore}

            </p>

          </div>

        </div>

        {/* Analysis */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Strengths */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-white flex items-center gap-3">

              <FaCheckCircle className="text-green-500" />

              Strengths

            </h2>

            <ul className="mt-6 space-y-3 text-slate-300">

              {score >= 80 && (
                <>
                  <li>
                    Strong technical understanding
                  </li>

                  <li>
                    Excellent communication skills
                  </li>

                  <li>
                    Good confidence level
                  </li>
                </>
              )}

              {score >= 60 &&
                score < 80 && (
                  <>
                    <li>
                      Good problem-solving approach
                    </li>

                    <li>
                      Decent communication
                    </li>
                  </>
                )}

              {score < 60 && (
                <>
                  <li>
                    Willingness to learn
                  </li>

                  <li>
                    Improving technical skills
                  </li>
                </>
              )}

            </ul>

          </div>

          {/* Weakness */}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-white flex items-center gap-3">

              <FaTimesCircle className="text-red-500" />

              Weaknesses

            </h2>

            <ul className="mt-6 space-y-3 text-slate-300">

              {score < 80 && (
                <>
                  <li>
                    Need deeper concept explanations
                  </li>

                  <li>
                    Improve confidence while answering
                  </li>
                </>
              )}

              {score < 60 && (
                <>
                  <li>
                    Practice technical fundamentals
                  </li>

                  <li>
                    Improve communication clarity
                  </li>
                </>
              )}

              {score >= 80 && (
                <li>
                  Continue practicing advanced topics
                </li>
              )}

            </ul>

          </div>

        </div>

        {/* Communication Analysis */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-10">

          <h2 className="text-2xl font-bold text-white flex items-center gap-3">

            <FaChartLine />

            Communication Analysis

          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div>

              <p className="text-slate-400">

                Grammar

              </p>

              <h3 className="text-3xl text-white font-bold mt-2">

                {grammar}

              </h3>

            </div>

            <div>

              <p className="text-slate-400">

                Vocabulary

              </p>

              <h3 className="text-3xl text-white font-bold mt-2">

                {vocabulary}

              </h3>

            </div>

            <div>

              <p className="text-slate-400">

                Confidence

              </p>

              <h3 className="text-3xl text-white font-bold mt-2">

                {confidence}

              </h3>

            </div>

            <div>

              <p className="text-slate-400">

                Speaking Speed

              </p>

              <h3 className="text-3xl text-white font-bold mt-2">

                {speakingSpeed}

              </h3>

            </div>

          </div>

        </div>

        {/* Suggestions */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-10">

          <h2 className="text-2xl font-bold text-white">

            AI Suggested Improvements

          </h2>

          <p className="text-slate-300 mt-6 leading-8">

            {score >= 80
              ? "Excellent work! Continue practicing advanced concepts, system design, and real-world project discussions to become interview ready."
              : score >= 60
              ? "Focus on improving technical explanations and confidence while answering interview questions."
              : "Practice more mock interviews, improve technical fundamentals, and answer questions with detailed explanations and examples."}

          </p>

        </div>

        {/* Actions */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <button
            onClick={
              downloadReport
            }
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition"
          >

            <FaDownload />

            Download PDF Report

          </button>

          <button
            onClick={
              retakeInterview
            }
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition"
          >

            <FaRedo />

            Retake Interview

          </button>

          <button
            onClick={
              goDashboard
            }
            className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition"
          >

            <FaHome />

            Dashboard

          </button>

        </div>

      </div>

    </div>

  );

}

export default Result;