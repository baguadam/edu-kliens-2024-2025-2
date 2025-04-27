import { questions } from "../data/questions";
import { useQuiz } from "../hooks/useQuiz";
import AnswerButton from "./AnswerButton";

const QuestionStep = () => {
  const { currentStep } = useQuiz();
  const question = questions[currentStep];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <AnswerButton key={option} option={option} />
        ))}
      </div>
    </div>
  );
};

export default QuestionStep;
