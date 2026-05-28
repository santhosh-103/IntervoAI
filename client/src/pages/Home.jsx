import { motion } from "framer-motion";
import {
  FaRobot,
  FaChartLine,
  FaMicrophone,
  FaVideo,
  FaCode,
} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  const token =
    localStorage.getItem("token");

  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center px-6">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 text-sm">
              🚀 AI Powered Interview Platform
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-8 leading-tight">

              Land Your

              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dream Job
              </span>

              With AI Interviews

            </h1>

            <p className="text-slate-400 text-xl mt-8 max-w-xl leading-8">
              Practice technical, HR,
              coding and company-specific
              interviews with AI generated
              questions and real-time
              feedback.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to={
                  token
                    ? "/dashboard"
                    : "/register"
                }
                className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                hover:scale-105
                transition
                px-8
                py-4
                rounded-xl
                text-white
                font-semibold
                shadow-xl
              "
              >
                {token
                  ? "Open Dashboard"
                  : "Get Started Free"}
              </Link>

              <Link
                to="/login"
                className="
                border
                border-slate-700
                hover:bg-slate-800
                px-8
                py-4
                rounded-xl
                text-white
                transition
              "
              >
                Login
              </Link>

            </div>

            <div className="flex gap-10 mt-14">

              <div>
                <h3 className="text-3xl font-bold text-white">
                  10K+
                </h3>

                <p className="text-slate-400">
                  Interviews
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  95%
                </h3>

                <p className="text-slate-400">
                  Success Rate
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  AI
                </h3>

                <p className="text-slate-400">
                  Feedback
                </p>
              </div>

            </div>

          </motion.div>

          {/* Right */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="
              bg-slate-900/60
              backdrop-blur-xl
              border
              border-slate-800
              rounded-3xl
              p-8
              shadow-2xl
            ">

              <div className="space-y-5">

                <div className="bg-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <FaMicrophone className="text-indigo-400 text-2xl" />

                    <span className="text-white font-semibold">
                      Voice Interview
                    </span>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <FaVideo className="text-indigo-400 text-2xl" />

                    <span className="text-white font-semibold">
                      Video Interview
                    </span>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <FaCode className="text-indigo-400 text-2xl" />

                    <span className="text-white font-semibold">
                      Coding Round
                    </span>
                  </div>
                </div>

                <div className="bg-indigo-600 rounded-2xl p-5">
                  <h3 className="text-white text-xl font-bold">
                    AI Score
                  </h3>

                  <p className="text-white text-4xl font-bold mt-3">
                    92%
                  </p>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center text-white">
            Why Choose IntervoAI?
          </h2>

          <p className="text-center text-slate-400 mt-4">
            Everything needed to crack
            interviews confidently.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="
              bg-slate-900/70
              backdrop-blur-xl
              border
              border-slate-800
              rounded-3xl
              p-8
              hover:-translate-y-2
              transition
            ">
              <FaRobot className="text-5xl text-indigo-500 mb-5" />

              <h3 className="text-2xl font-bold text-white">
                AI Questions
              </h3>

              <p className="text-slate-400 mt-4">
                Dynamic interview
                questions generated for
                your role.
              </p>
            </div>

            <div className="
              bg-slate-900/70
              backdrop-blur-xl
              border
              border-slate-800
              rounded-3xl
              p-8
              hover:-translate-y-2
              transition
            ">
              <MdFeedback className="text-5xl text-indigo-500 mb-5" />

              <h3 className="text-2xl font-bold text-white">
                Smart Feedback
              </h3>

              <p className="text-slate-400 mt-4">
                Personalized AI feedback
                and improvement tips.
              </p>
            </div>

            <div className="
              bg-slate-900/70
              backdrop-blur-xl
              border
              border-slate-800
              rounded-3xl
              p-8
              hover:-translate-y-2
              transition
            ">
              <FaChartLine className="text-5xl text-indigo-500 mb-5" />

              <h3 className="text-2xl font-bold text-white">
                Analytics
              </h3>

              <p className="text-slate-400 mt-4">
                Track progress and
                performance over time.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 px-6">

        <div className="
          max-w-5xl
          mx-auto
          text-center
          bg-slate-900/70
          backdrop-blur-xl
          border
          border-slate-800
          rounded-3xl
          p-12
        ">

          <h2 className="text-5xl font-bold text-white">
            Ready To Ace Interviews?
          </h2>

          <p className="text-slate-400 mt-5">
            Join thousands of students
            improving with AI.
          </p>

          <Link
            to={
              token
                ? "/dashboard"
                : "/register"
            }
            className="
              inline-block
              mt-8
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              px-8
              py-4
              rounded-xl
              text-white
              font-semibold
            "
          >
            Start Practicing Now
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <h2 className="text-2xl font-bold text-white">
            Intervo
            <span className="text-indigo-500">
              AI
            </span>
          </h2>

          <p className="text-slate-500 mt-4 md:mt-0">
            © 2026 IntervoAI. All Rights Reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;