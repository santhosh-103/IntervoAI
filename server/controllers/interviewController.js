const {
  generateQuestions,
} = require("../services/geminiService");

const createInterview = async (
  req,
  res
) => {
  try {
    const {
      role,
      difficulty,
      questions,
    } = req.body;

    if (
      !role ||
      !difficulty ||
      !questions
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Role, difficulty and questions are required",
      });
    }

    const aiQuestions =
      await generateQuestions(
        role,
        difficulty,
        questions
      );

    res.status(200).json({
      success: true,
      questions: aiQuestions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate interview",
    });
  }
};

module.exports = {
  createInterview,
};