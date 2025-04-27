import { questions } from "../data/questions";
import { useQuiz } from "../hooks/useQuiz";
import { calculateScore } from "../utils/calculateScore";

const ResultScreen = () => {
  const { answers, reset } = useQuiz();
  const score = calculateScore(answers, questions);

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-green-600">🎉 Quiz Complete!</h2>
      <p className="text-xl">
        Your score: <span className="font-semibold">{score}</span> /{" "}
        {questions.length}
      </p>
      <button
        onClick={reset}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ResultScreen;
