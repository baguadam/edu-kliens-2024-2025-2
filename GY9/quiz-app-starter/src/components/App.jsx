import QuestionStep from "./QuestionStep";
import ResultScreen from "./ResultScreen";
import { questions } from "../data/questions";
import { useQuiz } from "../hooks/useQuiz";

const App = () => {
  const { currentStep, isFinished } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        {isFinished || currentStep >= questions.length ? (
          <ResultScreen />
        ) : (
          <QuestionStep />
        )}
      </div>
    </div>
  );
};

export default App;
