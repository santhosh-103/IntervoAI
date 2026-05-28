import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import toast from "react-hot-toast";

function Interview() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const config =
    location.state || {};

  const role =
    config.role ||
    "Software Developer";

  const totalQuestions =
    config.questions || 10;

  const generatedQuestions =
    config.generatedQuestions || [];

  const defaultQuestions = [
    "Tell me about yourself.",
    "What is React?",
    "Explain Virtual DOM.",
    "What is Node.js?",
    "Difference between SQL and NoSQL?",
    "What is REST API?",
    "Explain useState Hook.",
    "What are your strengths?",
    "Why should we hire you?",
    "Explain OOP concepts.",
  ];

  const questions =
    generatedQuestions.length >
    0
      ? generatedQuestions
      : defaultQuestions;

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [answers, setAnswers] =
    useState(
      Array(
        totalQuestions
      ).fill("")
    );

  const [
    currentAnswer,
    setCurrentAnswer,
  ] = useState("");

  const [timeLeft, setTimeLeft] =
    useState(30 * 60);

  const [liveScore, setLiveScore] =
    useState(0);

  const [
    liveFeedback,
    setLiveFeedback,
  ] = useState(
    "Start answering..."
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      submitInterview();
      return;
    }

    const timer =
      setInterval(() => {
        setTimeLeft(
          (prev) => prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    calculateLiveScore(
      currentAnswer
    );
  }, [currentAnswer]);

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  const keywords = [
    "class",
    "object",
    "method",
    "function",
    "algorithm",
    "database",
    "react",
    "java",
    "javascript",
    "api",
    "sql",
    "inheritance",
    "polymorphism",
    "encapsulation",
    "node",
    "express",
    "mongodb",
  ];

  const calculateLiveScore =
    (answer) => {
      if (
        answer.trim() === ""
      ) {
        setLiveScore(0);

        setLiveFeedback(
          "No answer provided"
        );

        return;
      }

      let score = 0;

      const text =
        answer
          .toLowerCase()
          .trim();

      // Length Scoring

      if (
        text.length >= 20
      )
        score += 20;

      if (
        text.length >= 50
      )
        score += 20;

      if (
        text.length >= 100
      )
        score += 20;

      // Keyword Scoring

      let keywordCount = 0;

      keywords.forEach(
        (word) => {
          if (
            text.includes(
              word
            )
          ) {
            keywordCount++;
          }
        }
      );

      score += Math.min(
        40,
        keywordCount * 5
      );

      score = Math.min(
        100,
        score
      );

      setLiveScore(
        score
      );

      if (score >= 80) {
        setLiveFeedback(
          "Excellent Answer 🚀"
        );
      } else if (
        score >= 60
      ) {
        setLiveFeedback(
          "Good Answer 👍"
        );
      } else if (
        score >= 40
      ) {
        setLiveFeedback(
          "Average Answer 📚"
        );
      } else {
        setLiveFeedback(
          "Needs Improvement ❌"
        );
      }
    };

  const saveCurrentAnswer =
    () => {
      const updatedAnswers = [
        ...answers,
      ];

      updatedAnswers[
        currentQuestion
      ] = currentAnswer;

      setAnswers(
        updatedAnswers
      );

      return updatedAnswers;
    };

  const nextQuestion = () => {
    const updatedAnswers =
      saveCurrentAnswer();

    if (
      currentQuestion <
      totalQuestions - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );

      setCurrentAnswer(
        updatedAnswers[
          currentQuestion +
            1
        ] || ""
      );
    }
  };

  const previousQuestion =
    () => {
      const updatedAnswers =
        saveCurrentAnswer();

      if (
        currentQuestion > 0
      ) {
        setCurrentQuestion(
          currentQuestion - 1
        );

        setCurrentAnswer(
          updatedAnswers[
            currentQuestion -
              1
          ] || ""
        );
      }
    };

  const submitInterview =
    () => {
      const updatedAnswers =
        saveCurrentAnswer();

      const answeredCount =
        updatedAnswers.filter(
          (item) =>
            item.trim() !==
            ""
        ).length;

      let totalScore = 0;

      updatedAnswers.forEach(
        (answer) => {

          if (
            answer.trim() ===
            ""
          ) {
            return;
          }

          let answerScore = 0;

          const text =
            answer
              .toLowerCase()
              .trim();

          if (
            text.length >= 20
          )
            answerScore += 20;

          if (
            text.length >= 50
          )
            answerScore += 20;

          if (
            text.length >= 100
          )
            answerScore += 20;

          let keywordCount = 0;

          keywords.forEach(
            (word) => {
              if (
                text.includes(
                  word
                )
              ) {
                keywordCount++;
              }
            }
          );

          answerScore +=
            Math.min(
              40,
              keywordCount *
                5
            );

          totalScore +=
            answerScore;
        }
      );

    let score = 0;

if (
  answeredCount > 0
) {

  const averageScore =
    totalScore /
    answeredCount;

  const completionRatio =
    answeredCount /
    totalQuestions;

  score =
    Math.round(
      averageScore *
        completionRatio
    );
}

score = Math.max(
  0,
  Math.min(
    100,
    score
  )
);

      let feedback =
        "Needs Improvement";

      if (score >= 80) {
        feedback =
          "Excellent Performance";
      } else if (
        score >= 60
      ) {
        feedback =
          "Good Performance";
      } else if (
        score >= 40
      ) {
        feedback =
          "Average Performance";
      }

      const result = {
        role,

        difficulty:
          config.difficulty ||
          "Medium",

        interviewType:
          config.interviewType ||
          "Technical",

        totalQuestions,

        answeredCount,

        answers:
          updatedAnswers,

        score,

        feedback,

        completedAt:
          new Date().toLocaleString(),
      };

      localStorage.setItem(
        "interviewResult",
        JSON.stringify(
          result
        )
      );

      const history =
        JSON.parse(
          localStorage.getItem(
            "interviewHistory"
          ) || "[]"
        );

      history.unshift(
        result
      );

      localStorage.setItem(
        "interviewHistory",
        JSON.stringify(
          history
        )
      );

      toast.success(
        "Interview Submitted Successfully 🎉"
      );

      navigate("/result");
    };

  return (
    <div className="min-h-screen px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          {/* Header */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold text-white">
                AI Mock Interview
              </h1>

              <p className="text-slate-400 mt-2">
                Role: {role}
              </p>

            </div>

            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-white">

              <FaClock />

              {minutes
                .toString()
                .padStart(
                  2,
                  "0"
                )}
              :
              {seconds
                .toString()
                .padStart(
                  2,
                  "0"
                )}

            </div>

          </div>

          {/* Question */}

          <div className="mt-8">

            <span className="text-indigo-400">

              Question{" "}
              {currentQuestion +
                1}
              {" of "}
              {
                totalQuestions
              }

            </span>

            <h2 className="text-2xl text-white font-semibold mt-3 leading-relaxed">

              {
                questions[
                  currentQuestion
                ]
              }

            </h2>

          </div>

          {/* Answer */}

          <textarea
            value={
              currentAnswer
            }
            onChange={(e) =>
              setCurrentAnswer(
                e.target.value
              )
            }
            rows="10"
            placeholder="Type your answer here..."
            className="w-full mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-5 text-white outline-none"
          />

          {/* Live Analysis */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-slate-800 rounded-2xl p-6">

              <h3 className="text-white text-xl font-semibold">

                Live Score

              </h3>

              <p className={`text-5xl font-bold mt-4 ${
                liveScore >= 80
                  ? "text-green-400"
                  : liveScore >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}>

                {liveScore}%

              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6">

              <h3 className="text-white text-xl font-semibold">

                AI Feedback

              </h3>

              <p className="text-slate-300 mt-4 text-lg">

                {liveFeedback}

              </p>

            </div>

          </div>

          {/* Progress */}

          <div className="w-full bg-slate-800 rounded-full h-3 mt-8">

            <div
              className="bg-indigo-600 h-3 rounded-full"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    totalQuestions) *
                  100
                }%`,
              }}
            />

          </div>

          {/* Footer */}

          <div className="flex justify-between items-center mt-8">

            <button
              onClick={
                previousQuestion
              }
              disabled={
                currentQuestion ===
                0
              }
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white disabled:opacity-50"
            >

              <FaArrowLeft />
              Previous

            </button>

            <div className="flex items-center gap-2 text-green-400">

              <FaCheckCircle />

              {
                answers.filter(
                  (item) =>
                    item.trim() !==
                    ""
                ).length
              }
              {" "}
              Answered

            </div>

            {currentQuestion ===
            totalQuestions -
              1 ? (

              <button
                onClick={
                  submitInterview
                }
                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-white font-semibold"
              >
                Submit Interview
              </button>

            ) : (

              <button
                onClick={
                  nextQuestion
                }
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
              >

                Next
                <FaArrowRight />

              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Interview;