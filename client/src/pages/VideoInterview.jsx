import {
  useEffect,
  useRef,
  useState,
} from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  FaVideo,
  FaStop,
  FaPlay,
  FaArrowRight,
  FaCamera,
  FaBrain,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function VideoInterview() {
  const navigate = useNavigate();
  const videoRef =
    useRef(null);

  const [recording, setRecording] =
    useState(false);

  const [cameraOn, setCameraOn] =
    useState(false);

  const [seconds, setSeconds] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [feedback, setFeedback] =
    useState("");

  const [liveScore, setLiveScore] =
    useState(0);

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

    let interval;

    if (recording) {

      interval =
        setInterval(() => {

          setSeconds(
            (prev) =>
              prev + 1
          );

        }, 1000);

    }

    return () => {

      clearInterval(
        interval
      );

    };

  }, [recording]);

  useEffect(() => {

    calculateLiveScore(
      transcript
    );

  }, [transcript]);

  useEffect(() => {

    return () => {

      stopCamera();

    };

  }, []);

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

      if (seconds >= 30)
        score += 10;

      if (seconds >= 60)
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

  const startCamera =
    async () => {

      try {

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
              audio: true,
            }
          );

        if (
          videoRef.current
        ) {

          videoRef.current.srcObject =
            stream;

        }

        setCameraOn(
          true
        );

        toast.success(
          "Camera Started 📷"
        );

      } catch (error) {

        toast.error(
          "Camera access denied"
        );

      }

    };

  const stopCamera =
    () => {

      const stream =
        videoRef.current
          ?.srcObject;

      if (stream) {

        stream
          .getTracks()
          .forEach(
            (track) =>
              track.stop()
          );

      }

      if (
        videoRef.current
      ) {

        videoRef.current.srcObject =
          null;

      }

      setCameraOn(
        false
      );

      if (recording) {

        setRecording(
          false
        );

      }

      toast.success(
        "Camera Stopped"
      );

    };

  const startRecording =
    () => {

      if (
        !cameraOn
      ) {

        toast.error(
          "Start camera first"
        );

        return;
      }

      resetTranscript();

      SpeechRecognition.startListening(
        {
          continuous: true,
        }
      );

      setSeconds(0);

      setRecording(
        true
      );

      toast.success(
        "Recording Started 🎥"
      );

    };

  const stopRecording =
    () => {

      setRecording(
        false
      );

      SpeechRecognition.stopListening();

      const text =
        transcript
          .toLowerCase()
          .trim();

      if (
        text === ""
      ) {

        setScore(0);

        setFeedback(
          "No answer provided"
        );

        return;
      }

      let answerScore = 0;

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

      // Duration Score

      if (seconds >= 30)
        answerScore += 10;

      if (seconds >= 60)
        answerScore += 10;

      answerScore =
        Math.max(
          0,
          Math.min(
            100,
            answerScore
          )
        );

      setScore(
        answerScore
      );

      let finalFeedback =
        "";

      if (
        answerScore >= 80
      ) {

        finalFeedback =
          "Excellent Performance 🚀";

      } else if (
        answerScore >= 60
      ) {

        finalFeedback =
          "Good Performance 👍";

      } else if (
        answerScore >= 40
      ) {

        finalFeedback =
          "Average Performance 📚";

      } else {

        finalFeedback =
          "Needs Improvement ❌";

      }

      setFeedback(
        finalFeedback
      );

      const result = {

        role:
          "Video Interview",

        difficulty:
          "Medium",

        totalQuestions: 1,

        answeredCount:
          text
            .trim() !== ""
            ? 1
            : 0,

        answers: [
          transcript,
        ],

        score:
          answerScore,

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

      toast.success(
        "Recording Saved ✅"
      );

    };

  const formatTime =
    (sec) => {

      const mins =
        Math.floor(
          sec / 60
        );

      const secs =
        sec % 60;

      return `${mins
        .toString()
        .padStart(
          2,
          "0"
        )}:${secs
        .toString()
        .padStart(
          2,
          "0"
        )}`;

    };

  return (

    <div className="min-h-screen px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center">

          <h1 className="text-5xl font-bold text-white">

            Video Interview

          </h1>

          <p className="text-slate-400 mt-4">

            Practice AI-powered mock interviews with real-time video interaction.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Question Panel */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <span className="text-indigo-400">

              Question 1 of 1

            </span>

            <h2 className="text-3xl font-semibold text-white mt-4">

              Tell me about yourself and your recent projects.

            </h2>

            <div className="mt-8 bg-slate-800 rounded-2xl p-6">

              <p className="text-slate-300">

                AI Interviewer is waiting for your answer...

              </p>

            </div>

            <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white flex items-center gap-2">

              <FaPlay />
              Play Question

            </button>

          </div>

          {/* Camera Section */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-[350px] bg-black rounded-2xl object-cover"
            />

            <div className="mt-5 text-center">

              {cameraOn ? (

                <span className="text-green-400 font-semibold">

                  🟢 Camera Active

                </span>

              ) : (

                <span className="text-red-400 font-semibold">

                  🔴 Camera Off

                </span>

              )}

            </div>

            {recording && (

              <div className="text-center mt-3 text-red-400 font-bold">

                🎥 Recording...
                {" "}
                {formatTime(
                  seconds
                )}

              </div>

            )}

            <div className="mt-3 text-center">

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

            <div className="flex flex-wrap justify-center gap-4 mt-8">

              {!cameraOn ? (

                <button
                  onClick={
                    startCamera
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white flex items-center gap-2"
                >

                  <FaCamera />
                  Start Camera

                </button>

              ) : (

                <button
                  onClick={
                    stopCamera
                  }
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white flex items-center gap-2"
                >

                  <FaStop />
                  Stop Camera

                </button>

              )}

              {!recording ? (

                <button
                  onClick={
                    startRecording
                  }
                  disabled={
                    !cameraOn
                  }
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-6 py-3 rounded-xl text-white flex items-center gap-2"
                >

                  <FaVideo />
                  Start Recording

                </button>

              ) : (

                <button
                  onClick={
                    stopRecording
                  }
                  className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl text-white flex items-center gap-2"
                >

                  <FaStop />
                  Stop Recording

                </button>

              )}

            </div>

          </div>

        </div>

        {/* Transcript */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-white">

            AI Transcript

          </h2>

          <div className="bg-slate-800 rounded-2xl p-6 mt-5 min-h-[150px] text-slate-300">

            {transcript ||
              "Start recording and speak..."}

          </div>

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

          <div className="mt-6 grid md:grid-cols-2 gap-4">

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

        </div>

        {/* Navigation */}

        <div className="flex justify-end mt-8">

          <button
            onClick={() => navigate("/result")}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-3"
          >

            View Result
            <FaArrowRight />

          </button>

        </div>

      </div>

    </div>

  );

}

export default VideoInterview;