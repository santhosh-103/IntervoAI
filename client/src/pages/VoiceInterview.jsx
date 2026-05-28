import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  FaMicrophone,
  FaStop,
  FaArrowRight,
  FaArrowLeft,
  FaClock,
  FaBrain,
} from "react-icons/fa";

import toast from "react-hot-toast";

function VoiceInterview() {

  const navigate =
    useNavigate();

  const questions = [
    "Tell me about yourself.",
    "What is React?",
    "Explain Virtual DOM.",
    "What is Node.js?",
    "What are your strengths?",
    "What are your weaknesses?",
    "Explain useState Hook.",
    "Difference between SQL and NoSQL?",
    "What is REST API?",
    "Why should we hire you?",
  ];

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [answers, setAnswers] =
    useState(
      Array(
        questions.length
      ).fill("")
    );

  const [timeLeft, setTimeLeft] =
    useState(15 * 60);

  const [score, setScore] =
    useState(0);

  const [
    feedback,
    setFeedback,
  ] = useState("");

  const [
    liveScore,
    setLiveScore,
  ] = useState(0);

  const [
    liveFeedback,
    setLiveFeedback,
  ] = useState(
    "Start speaking..."
  );

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } =
    useSpeechRecognition();

  const keywords = [
    "java",
    "class",
    "object",
    "react",
    "api",
    "database",
    "sql",
    "project",
    "algorithm",
    "javascript",
    "inheritance",
    "polymorphism",
    "encapsulation",
    "node",
    "express",
    "mongodb",
  ];

  useEffect(() => {

    if (timeLeft <= 0) {

      submitInterview();

      return;
    }

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) =>
            prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(
        timer
      );

  }, [timeLeft]);

  useEffect(() => {

    calculateLiveScore(
      transcript
    );

  }, [transcript]);

  if (
    !browserSupportsSpeechRecognition
  ) {

    return (
      <h1 className="text-white text-center mt-10">

        Browser does not support speech recognition.

      </h1>
    );

  }

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

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

      // Length Score

      if (
        text.length >= 20
      )
        score += 10;

      if (
        text.length >= 50
      )
        score += 15;

      if (
        text.length >= 100
      )
        score += 15;

      // Keyword Score

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
        30,
        keywordCount * 3
      );

      // Sentence Score

      const sentences =
        text
          .split(".")
          .filter(
            (s) =>
              s.trim() !==
              ""
          ).length;

      score += Math.min(
        15,
        sentences * 3
      );

      // Duration Score

      if (text.length >= 200)
        score += 10;

      if (text.length >= 400)
        score += 10;

      score =
        Math.max(
          0,
          Math.min(
            100,
            score
          )
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

  const saveAnswer = () => {

    const updatedAnswers = [
      ...answers,
    ];

    updatedAnswers[
      currentQuestion
    ] = transcript;

    setAnswers(
      updatedAnswers
    );

    return updatedAnswers;

  };

  const nextQuestion = () => {

    saveAnswer();

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion +
          1
      );

      resetTranscript();

    }

  };

  const previousQuestion =
    () => {

      saveAnswer();

      if (
        currentQuestion >
        0
      ) {

        setCurrentQuestion(
          currentQuestion -
            1
        );

        resetTranscript();

      }

    };

  const submitInterview =
    () => {

      const updatedAnswers =
        saveAnswer();

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

          // Length Score

          if (
            text.length >= 20
          )
            answerScore += 10;

          if (
            text.length >= 50
          )
            answerScore += 15;

          if (
            text.length >= 100
          )
            answerScore += 15;

          // Keyword Score

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
              30,
              keywordCount * 3
            );

          // Sentence Score

          const sentences =
            text
              .split(".")
              .filter(
                (s) =>
                  s.trim() !==
                  ""
              ).length;

          answerScore +=
            Math.min(
              15,
              sentences * 3
            );

          // Detailed Answer Score

          if (
            text.length >=
            200
          )
            answerScore += 10;

          if (
            text.length >=
            400
          )
            answerScore += 10;

          answerScore =
            Math.max(
              0,
              Math.min(
                100,
                answerScore
              )
            );

          totalScore +=
            answerScore;

        }
      );

      let finalScore = 0;

      if (
        answeredCount > 0
      ) {

        const averageScore =
          totalScore /
          answeredCount;

        const completionRatio =
          answeredCount /
          questions.length;

        finalScore =
          Math.round(
            averageScore *
              completionRatio
          );

      }

      finalScore =
        Math.max(
          0,
          Math.min(
            100,
            finalScore
          )
        );

      let finalFeedback =
        "Needs Improvement ❌";

      if (
        finalScore >= 80
      ) {

        finalFeedback =
          "Excellent Performance 🚀";

      } else if (
        finalScore >= 60
      ) {

        finalFeedback =
          "Good Performance 👍";

      } else if (
        finalScore >= 40
      ) {

        finalFeedback =
          "Average Performance 📚";

      }

      setScore(
        finalScore
      );

      setFeedback(
        finalFeedback
      );

      const result = {

        role:
          "Voice Interview",

        difficulty:
          "Medium",

        totalQuestions:
          questions.length,

        answeredCount,

        answers:
          updatedAnswers,

        score:
          finalScore,

        feedback:
          finalFeedback,

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

      SpeechRecognition.stopListening();

      toast.success(
        "Voice Interview Submitted 🎉"
      );

      navigate(
        "/result"
      );

    };

  return (

    <div className="min-h-screen px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          {/* Header */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold text-white">

                Voice Interview 🎤

              </h1>

              <p className="text-slate-400 mt-2">

                Answer using your microphone.

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
                questions.length
              }

            </span>

            <h2 className="text-2xl text-white font-semibold mt-3">

              {
                questions[
                  currentQuestion
                ]
              }

            </h2>

          </div>

          {/* Controls */}

          <div className="flex flex-wrap gap-4 mt-8">

            <button
              onClick={() =>
                SpeechRecognition.startListening(
                  {
                    continuous: true,
                  }
                )
              }
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl text-white flex items-center gap-2"
            >

              <FaMicrophone />
              Start Mic

            </button>

            <button
              onClick={() =>
                SpeechRecognition.stopListening()
              }
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white flex items-center gap-2"
            >

              <FaStop />
              Stop Mic

            </button>

            <button
              onClick={
                resetTranscript
              }
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white"
            >

              Clear

            </button>

          </div>

          {/* Recording Status */}

          <div className="mt-5">

            <span
              className={`font-semibold ${
                listening
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >

              {listening
                ? "🎙 Listening..."
                : "⏹ Not Recording"}

            </span>

          </div>

          {/* Transcript */}

          <textarea
            value={
              transcript
            }
            readOnly
            rows="10"
            className="w-full mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white"
          />

          {/* Live AI Analysis */}

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-slate-800 rounded-2xl p-6">

              <h3 className="text-white text-xl font-semibold flex items-center gap-2">

                <FaBrain />
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

          {/* Final Result */}

          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <div className="bg-slate-800 rounded-2xl p-5">

              <h3 className="text-white font-semibold">

                Final Interview Score

              </h3>

              <p className={`text-4xl font-bold mt-3 ${
                score >= 80
                  ? "text-green-400"
                  : score >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}>

                {score}%

              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-5">

              <h3 className="text-white font-semibold">

                Final Feedback

              </h3>

              <p className="text-indigo-400 mt-3">

                {feedback ||
                  "Waiting for evaluation"}

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
                    questions.length) *
                  100
                }%`,
              }}
            />

          </div>

          {/* Footer */}

          <div className="flex justify-between mt-8">

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

            {currentQuestion ===
            questions.length -
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

export default VoiceInterview;