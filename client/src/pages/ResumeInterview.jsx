import { useState } from "react";
import {
  FaFileUpload,
  FaFilePdf,
  FaRobot,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ResumeInterview() {
  const navigate = useNavigate();

  const [fileName, setFileName] =
    useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      toast.error(
        "Only PDF, DOC, DOCX files allowed"
      );
      return;
    }

    setFileName(file.name);

    localStorage.setItem(
      "uploadedResume",
      file.name
    );

    toast.success(
      "Resume Uploaded Successfully 🚀"
    );
  };

  const removeFile = () => {
    setFileName("");

    localStorage.removeItem(
      "uploadedResume"
    );

    toast.success(
      "Resume Removed"
    );
  };

  const generateInterview = () => {
    if (!fileName) {
      toast.error(
        "Please upload your resume first"
      );
      return;
    }

    localStorage.setItem(
      "interviewConfig",
      JSON.stringify({
        role: "Resume Based Interview",
        difficulty: "Personalized",
        questions: 10,
      })
    );

    toast.success(
      "Interview Questions Generated 🚀"
    );

    navigate("/interview");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center">

          <h1 className="text-5xl font-bold text-white">
            Resume Based Interview
          </h1>

          <p className="text-slate-400 mt-4">
            Upload your resume and let AI
            generate personalized
            interview questions.
          </p>

        </div>

        {/* Upload Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 mt-10">

          <label
            htmlFor="resume"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-12 hover:border-indigo-500 transition"
          >

            <FaFileUpload className="text-5xl text-indigo-500" />

            <h2 className="text-white text-2xl font-semibold mt-6">
              Upload Resume
            </h2>

            <p className="text-slate-400 mt-3">
              PDF, DOC, DOCX Supported
            </p>

          </label>

          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={handleFileChange}
          />

          {fileName && (
            <div className="bg-slate-800 rounded-2xl p-5 mt-8 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <FaFilePdf className="text-red-500 text-2xl" />

                <span className="text-white">
                  {fileName}
                </span>

              </div>

              <button
                onClick={removeFile}
                className="text-red-400 hover:text-red-500"
              >
                <FaTrash />
              </button>

            </div>
          )}

        </div>

        {/* AI Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <FaRobot className="text-indigo-500 text-4xl mb-4" />

            <h3 className="text-white text-xl font-semibold">
              Resume Analysis
            </h3>

            <p className="text-slate-400 mt-3">
              AI extracts skills,
              projects and experience.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <FaRobot className="text-indigo-500 text-4xl mb-4" />

            <h3 className="text-white text-xl font-semibold">
              Personalized Questions
            </h3>

            <p className="text-slate-400 mt-3">
              Questions generated from
              your projects and skills.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <FaRobot className="text-indigo-500 text-4xl mb-4" />

            <h3 className="text-white text-xl font-semibold">
              Detailed Feedback
            </h3>

            <p className="text-slate-400 mt-3">
              AI evaluates answers and
              provides improvement tips.
            </p>

          </div>

        </div>

        {/* Start Button */}
        <div className="flex justify-center mt-10">

          <button
            onClick={generateInterview}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/30 transition flex items-center gap-3"
          >
            Generate Interview Questions
            <FaArrowRight />
          </button>

        </div>

      </div>
    </div>
  );
}

export default ResumeInterview;