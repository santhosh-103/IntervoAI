import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaRobot,
  FaChartLine,
  FaMicrophone,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  loginUser,
} from "../api/authApi";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    console.log(
      "Existing Token:",
      token
    );

    if (token) {

      navigate(
        "/dashboard"
      );

    }

  }, [navigate]);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !email ||
        !password
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      try {

        setLoading(true);

        const res =
          await loginUser({
            email,
            password,
          });

        console.log(
          "FULL RESPONSE:",
          res
        );

        console.log(
          "RESPONSE DATA:",
          res.data
        );

        const token =
          res?.data?.token;

        const user =
          res?.data?.user;

        if (!token) {

          toast.error(
            "Token not received from server"
          );

          return;

        }

        localStorage.setItem(
          "token",
          token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            user
          )
        );

        toast.success(
          "Login Successful 🚀"
        );

        navigate(
          "/dashboard"
        );

      } catch (err) {

        console.error(
          "LOGIN ERROR:",
          err
        );

        toast.error(
          err.response?.data
            ?.message ||
            "Login Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen px-6 flex items-center justify-center">

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}

        <div className="hidden lg:block">

          <span className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm">

            AI Powered Interview Platform

          </span>

          <h1 className="text-6xl font-extrabold text-white mt-8 leading-tight">

            Crack Interviews

            <span className="block text-indigo-400">

              With Confidence

            </span>

          </h1>

          <p className="text-slate-400 text-xl mt-6 leading-8">

            Practice technical,
            HR, coding and company
            specific interviews with
            AI powered feedback.

          </p>

          <div className="grid grid-cols-3 gap-4 mt-10">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 text-center">

              <FaRobot className="mx-auto text-3xl text-indigo-400" />

              <p className="text-white mt-3">

                AI Questions

              </p>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 text-center">

              <FaMicrophone className="mx-auto text-3xl text-green-400" />

              <p className="text-white mt-3">

                Voice AI

              </p>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 text-center">

              <FaChartLine className="mx-auto text-3xl text-purple-400" />

              <p className="text-white mt-3">

                Analytics

              </p>

            </div>

          </div>

        </div>

        {/* Login Card */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl max-w-lg mx-auto w-full">

          <h1 className="text-4xl font-bold text-white text-center">

            Welcome Back 👋

          </h1>

          <p className="text-slate-400 text-center mt-3">

            Login to continue your
            interview journey

          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6 mt-8"
          >

            <div>

              <label className="text-slate-300 text-sm">

                Email Address

              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Enter your email"
                className="w-full mt-2 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />

            </div>

            <div>

              <label className="text-slate-300 text-sm">

                Password

              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  className="w-full mt-2 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-6 text-slate-400"
                >

                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}

                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition disabled:opacity-50"
            >

              {loading
                ? "Logging In..."
                : "Login"}

            </button>

            <p className="text-center text-slate-400">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300"
              >

                Register

              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Login;