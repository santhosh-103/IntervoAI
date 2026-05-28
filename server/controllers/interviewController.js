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

      return res
        .status(400)
        .json({
          success: false,
          message:
            "Role, difficulty and questions are required",
        });

    }

    const sampleQuestions = [

      `Tell me about yourself as a ${role}`,

      `Explain one project related to ${role}`,

      `What are your strengths?`,

      `Why should we hire you?`,

      `Explain your technical skills`,

    ];

    res
      .status(200)
      .json({
        success: true,
        questions:
          sampleQuestions,
      });

  } catch (error) {

    console.error(
      error
    );

    res
      .status(500)
      .json({
        success: false,
        message:
          "Failed to generate interview",
      });

  }

};

module.exports = {
  createInterview,
};