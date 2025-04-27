import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  // Methods
  const addAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
    setCurrentStep((prev) => prev + 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const finish = () => setIsFinished(true);

  // Service
  const service = {
    currentStep,
    answers,
    isFinished,
    addAnswer,
    reset,
    finish,
  };

  return (
    <QuizContext.Provider value={service}>{children}</QuizContext.Provider>
  );
};
