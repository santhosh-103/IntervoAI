const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { exec } = require("child_process");

const runCode = async (req, res) => {
  try {
    const { sourceCode, language } =
      req.body;

    const id =
      crypto.randomUUID();

    const tempDir = path.join(
      __dirname,
      "../temp",
      id
    );

    fs.mkdirSync(tempDir, {
      recursive: true,
    });

    let fileName = "";
    let command = "";

    if (
      language === "javascript"
    ) {
      fileName = "main.js";

      command =
        "node main.js";
    } else if (
      language === "java"
    ) {
      fileName = "Main.java";

      command =
        "javac Main.java && java Main";
    } else {
      return res.status(400).json({
        message:
          "Only Java and JavaScript supported",
      });
    }

    fs.writeFileSync(
      path.join(
        tempDir,
        fileName
      ),
      sourceCode
    );

    exec(
      command,
      {
        cwd: tempDir,
        timeout: 10000,
      },
      (
        error,
        stdout,
        stderr
      ) => {
        fs.rmSync(
          tempDir,
          {
            recursive: true,
            force: true,
          }
        );

        if (error) {
          return res.json({
            stderr:
              stderr ||
              error.message,
          });
        }

        res.json({
          stdout,
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  runCode,
};