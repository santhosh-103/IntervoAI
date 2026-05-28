import { useState } from "react";
import {
  FaProjectDiagram,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SystemDesign() {
  const navigate = useNavigate();

  const topics = [
    "Design URL Shortener",
    "Design Netflix",
    "Design WhatsApp",
    "Design Instagram",
    "Design Google Drive",
    "Design Chat Application",
    "Design Food Delivery App",
    "Design Ride Sharing App",
    "Design YouTube",
    "Design Amazon",
    "Design Uber",
    "Design Twitter/X",
  ];

  const [selectedTopic, setSelectedTopic] =
    useState(topics[0]);

  const [answer, setAnswer] =
    useState("");

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast.error(
        "Please enter your design solution"
      );
      return;
    }

    localStorage.setItem(
      "systemDesignAnswer",
      answer
    );

    localStorage.setItem(
      "systemDesignTopic",
      selectedTopic
    );

    toast.success(
      "Design Submitted Successfully 🚀"
    );

    navigate("/result");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center">

          <h1 className="text-5xl font-bold text-white">
            System Design Interview
          </h1>

          <p className="text-slate-400 mt-4">
            Practice real-world system design interviews
            with AI evaluation.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* Topics */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold text-white mb-6">
              Topics
            </h2>

            <div className="space-y-3">

              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() =>
                    setSelectedTopic(topic)
                  }
                  className={`w-full text-left p-4 rounded-xl transition ${
                    selectedTopic === topic
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {topic}
                </button>
              ))}

            </div>

          </div>

          {/* Question Section */}
          <div className="lg:col-span-2">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

              <div className="flex items-center gap-3">

                <FaProjectDiagram className="text-indigo-500 text-3xl" />

                <h2 className="text-3xl font-bold text-white">
                  {selectedTopic}
                </h2>

              </div>

              <p className="text-slate-400 mt-6 leading-8">
                Explain the architecture,
                database design,
                scalability approach,
                caching strategy,
                load balancing,
                API structure and
                fault tolerance mechanisms.
              </p>

              <textarea
                rows="12"
                value={answer}
                onChange={(e) =>
                  setAnswer(
                    e.target.value
                  )
                }
                placeholder="Explain your system design..."
                className="w-full mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 resize-none"
              />

              <div className="flex justify-end mt-6">

                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-3 transition shadow-lg shadow-indigo-500/30"
                >
                  Submit Design
                  <FaArrowRight />
                </button>

              </div>

            </div>

            {/* Evaluation Criteria */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8">

              <h2 className="text-2xl font-bold text-white">
                AI Evaluation Criteria
              </h2>

              <div className="grid md:grid-cols-2 gap-5 mt-6">

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  Scalability
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  Database Design
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  API Design
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  Security
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  Caching Strategy
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  Load Balancing
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  Fault Tolerance
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <FaCheckCircle className="text-green-500" />
                  Microservices Design
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default SystemDesign;