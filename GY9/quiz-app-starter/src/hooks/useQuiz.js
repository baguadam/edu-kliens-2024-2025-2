import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

export const useQuiz = () => useContext(QuizContext);