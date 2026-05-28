import { useState } from "react";
import {
  FaPlay,
  FaPaperPlane,
  FaCode,
  FaUndo,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { runCode as executeCode } from "../api/codeApi";

function CodingRound() {
  const [language, setLanguage] =
    useState("java");

  const starterCode = {
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello IntervoAI");
    }
}`,

    javascript: `console.log("Hello IntervoAI");`,
  };

  const [code, setCode] =
    useState(
      starterCode.java
    );

  const [output, setOutput] =
    useState(
      "Waiting for execution..."
    );

  const handleLanguageChange = (
    e
  ) => {
    const selected =
      e.target.value;

    setLanguage(selected);

    setCode(
      starterCode[selected]
    );
  };

  const runCode = async () => {
    try {
      setOutput(
        "Running code..."
      );

      const res =
        await executeCode({
          sourceCode: code,
          language,
        });

      setOutput(
        res.data.stdout ||
        res.data.stderr ||
        "No Output"
      );

      toast.success(
        "Code Executed 🚀"
      );
    } catch (error) {
      console.error(error);

      setOutput(
        "Execution Failed ❌"
      );

      toast.error(
        "Execution Failed"
      );
    }
  };

  const submitCode = () => {
    toast.success(
      "Solution Submitted ✅"
    );

    setOutput(
      "Submission successful ✅"
    );
  };

  const resetCode = () => {
    setCode(
      starterCode[language]
    );

    setOutput(
      "Waiting for execution..."
    );

    toast.success(
      "Code Reset 🔄"
    );
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
                    {/* Question Panel */}
          <div className="lg:w-1/2 bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FaCode />
              Coding Challenge
            </h1>

            <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm mt-4">
              Easy
            </div>

            <h2 className="text-xl text-indigo-400 mt-6">
              Two Sum
            </h2>

            <p className="text-slate-300 mt-4 leading-7">
              Given an array of integers and a target value,
              return indices of the two numbers such that
              they add up to the target.
            </p>

            <div className="mt-8">

              <h3 className="text-white font-semibold">
                Example
              </h3>

              <div className="bg-slate-800 rounded-xl p-4 mt-3 text-slate-300">
                Input: nums = [2,7,11,15], target = 9
                <br />
                Output: [0,1]
              </div>

            </div>

          </div>

          {/* Editor Panel */}
          <div className="lg:w-1/2 bg-slate-900 border border-slate-800 rounded-3xl p-6">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">

              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="java">
                  Java
                </option>

                <option value="javascript">
                  JavaScript
                </option>
              </select>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={runCode}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
                >
                  <FaPlay />
                  Run
                </button>

                <button
                  onClick={submitCode}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white"
                >
                  <FaPaperPlane />
                  Submit
                </button>

                <button
                  onClick={resetCode}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-white"
                >
                  <FaUndo />
                  Reset
                </button>

              </div>

            </div>

            {/* Code Editor */}
            <textarea
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
              }
              className="
              w-full
              h-[400px]
              bg-slate-950
              border
              border-slate-800
              rounded-2xl
              p-4
              text-green-400
              font-mono
              outline-none
              resize-none
              "
            />

            {/* Output */}
            <div className="mt-4 bg-slate-950 border border-slate-800 rounded-2xl p-4">

              <h3 className="text-white font-semibold mb-3">
                Output
              </h3>

              <pre className="text-green-400 whitespace-pre-wrap">
                {output}
              </pre>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CodingRound;