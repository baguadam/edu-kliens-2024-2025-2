export const calculateScore = (answers, questions) => {
  return answers.reduce((score, answer, index) => {
    if (answer === questions[index].correct) score++;
    return score;
  }, 0);
};
