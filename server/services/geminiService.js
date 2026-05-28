const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateQuestions = async (
  role,
  difficulty,
  count
) => {
  try {
    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

    const prompt = `
Generate exactly ${count} interview questions.

Role: ${role}
Difficulty: ${difficulty}

Rules:
- Return only a JSON array.
- No explanation.
- No markdown.
- No headings.
- No numbering.

Example:
[
  "Question 1",
  "Question 2",
  "Question 3"
]
`;

    const result =
      await model.generateContent(
        prompt
      );

    const text =
      result.response
        .text()
        .trim();

    try {
      return JSON.parse(text);
    } catch {
      return text
        .split("\n")
        .filter(
          (q) => q.trim() !== ""
        );
    }
  } catch (error) {
    console.error(
      "Gemini Error:",
      error.message
    );

    throw new Error(
      "Failed to generate interview questions"
    );
  }
};

module.exports = {
  generateQuestions,
};