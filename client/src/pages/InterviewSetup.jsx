import { useState } from "react";
import {
  FaPlayCircle,
  FaBriefcase,
  FaLayerGroup,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [questions, setQuestions] =
    useState(10);

  const [interviewType, setInterviewType] =
    useState("Technical");

  const roles = [
    "Java Developer",
    "Python Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Data Analyst",
    "Business Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cyber Security Analyst",
    "QA Engineer",
    "System Design Engineer",
    "HR Interview",
    "Software Engineer",
    "SDE Intern"
  ];

  const handleGenerate = (e) => {
    e.preventDefault();

    if (!role) {
      toast.error(
        "Please select a role"
      );
      return;
    }

    if (
      questions < 5 ||
      questions > 50
    ) {
      toast.error(
        "Questions must be between 5 and 50"
      );
      return;
    }

    const config = {
      role,
      difficulty,
      questions:
        Number(questions),
      interviewType,
      createdAt:
        new Date().toLocaleString(),
    };

    localStorage.setItem(
      "interviewConfig",
      JSON.stringify(config)
    );

    toast.success(
      "Interview Generated 🚀"
    );

    navigate("/interview");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          {/* Header */}
          <div className="text-center">

            <h1 className="text-4xl font-bold text-white">
              Interview Setup
            </h1>

            <p className="text-slate-400 mt-3">
              Customize your AI mock interview experience
            </p>

          </div>

          <form
            onSubmit={handleGenerate}
            className="space-y-8 mt-10"
          >

            {/* Role */}
            <div>

              <label className="text-slate-300 flex items-center gap-2 mb-2">
                <FaBriefcase />
                Job Role
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              >
                <option value="">
                  Select Role
                </option>

                {roles.map(
                  (item) => (
                    <option
                      key={item}
                    >
                      {item}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* Interview Type */}
            <div>

              <label className="text-slate-300 flex items-center gap-2 mb-2">
                <FaLayerGroup />
                Interview Type
              </label>

              <select
                value={
                  interviewType
                }
                onChange={(e) =>
                  setInterviewType(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              >
                <option>
                  Technical
                </option>

                <option>
                  HR
                </option>

                <option>
                  Coding
                </option>

                <option>
                  System Design
                </option>

                <option>
                  Company Specific
                </option>
              </select>

            </div>

            {/* Difficulty */}
            <div>

              <label className="text-slate-300 block mb-3">
                Difficulty Level
              </label>

              <div className="grid md:grid-cols-3 gap-4">

                {[
                  "Easy",
                  "Medium",
                  "Hard",
                ].map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() =>
                      setDifficulty(
                        level
                      )
                    }
                    className={`p-4 rounded-xl border transition ${
                      difficulty ===
                      level
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-300"
                    }`}
                  >
                    {level}
                  </button>
                ))}

              </div>

            </div>

            {/* Questions */}
            <div>

              <label className="text-slate-300">
                Number of Questions
              </label>

              <input
                type="number"
                min="5"
                max="50"
                value={questions}
                onChange={(e) =>
                  setQuestions(
                    e.target.value
                  )
                }
                className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />

            </div>

            {/* Preview */}
            <div className="bg-slate-800 rounded-2xl p-5">

              <h3 className="text-white text-lg font-semibold">
                Interview Preview
              </h3>

              <div className="mt-4 space-y-2 text-slate-300">

                <p>
                  Role:
                  {" "}
                  {role ||
                    "Not Selected"}
                </p>

                <p>
                  Type:
                  {" "}
                  {interviewType}
                </p>

                <p>
                  Difficulty:
                  {" "}
                  {difficulty}
                </p>

                <p>
                  Questions:
                  {" "}
                  {questions}
                </p>

                <p>
                  Estimated Time:
                  {" "}
                  {questions * 2}
                  {" "}
                  mins
                </p>

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-3 transition shadow-lg shadow-indigo-500/30"
            >
              <FaPlayCircle />
              Start Interview
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default InterviewSetup;