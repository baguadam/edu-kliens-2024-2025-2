import { useQuiz } from "../hooks/useQuiz";

const AnswerButton = ({ option }) => {
  const { addAnswer } = useQuiz();

  return (
    <button
      onClick={() => addAnswer(option)}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
    >
      {option}
    </button>
  );
};

export default AnswerButton;
