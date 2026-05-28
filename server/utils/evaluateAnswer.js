const evaluateAnswer = (
  answer,
  keywords
) => {
  let score = 0;

  const text =
    answer.toLowerCase();

  keywords.forEach(
    (word) => {
      if (
        text.includes(
          word.toLowerCase()
        )
      ) {
        score +=
          100 /
          keywords.length;
      }
    }
  );

  if (answer.length < 20) {
    score -= 20;
  }

  score = Math.max(
    0,
    Math.min(100, score)
  );

  let feedback =
    "Good Answer";

  if (score < 40) {
    feedback =
      "Need Improvement";
  } else if (score < 70) {
    feedback =
      "Average Answer";
  }

  return {
    score:
      Math.round(score),
    feedback,
  };
};

module.exports =
  evaluateAnswer;