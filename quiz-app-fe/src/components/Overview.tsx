import { useEffect, useState } from "react";
import { QuizWrapper, Quiz } from "../interfaces/Quiz";
import PopUp from "./PopUp";



function Overview() {
  const [quiz, setQuiz] = useState<Quiz>();
  const [isLoading, setLoading] = useState(true);
  const [played, setPlayed] = useState(false);
  const [won, setWon] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/quiz");
    const quizWrapper = await response.json() as QuizWrapper;
    setQuiz(quizWrapper.quiz);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuiz();
  }, [])

  function isCorrectAnswer(answer: string, correctAnswer: string) {
    return answer == correctAnswer;
  }

  const checkAnswer = (answer: string) => {
    if (quiz != undefined) {
      setPlayed(true);
      setWon(isCorrectAnswer(answer, quiz.correctAnswer));
    }
  }

  const getCorrectAnswer = () => {
    if (quiz == undefined) {
      return '';
    }
    return quiz.correctAnswer;
  }

  const playNewGame = (): void => {
    fetchQuiz();
    setPlayed(false)
    setWon(false);
  };

  if (isLoading) {
    return <h1> Loading... </h1>
  }

  return (
    <div className="align-top justify-start  relative ">
      <div>
        {played && <div className="absolute opacity-80 z-10 bg-base p-4 inset-0">
        </div>}
        <PopUp isVisible={played} won={won} correctAnswer={getCorrectAnswer()}
          playNewGame={playNewGame} />
        <div className="relative z-0">
          <div className="flex items-center justify-center mt-20 text-white text-3xl">
            {quiz && quiz.question && <h1 className="text-text"> {quiz.question.text}</h1>}
          </div>
          <div className="grid grid-cols-2 gap-4 my-40">
            <div className="flex items-center justify-center bg-iris row-span-10 ml-2 rounded-lg  scale-90 hover:scale-100">
              {quiz && quiz.incorrectAnswers && <button onClick={() => checkAnswer(quiz.incorrectAnswers[0])}> {quiz.incorrectAnswers[0]}</button>}
            </div>
            <div className="flex items-center justify-center bg-pien row-span-10 mr-2 rounded-lg scale-90 hover:scale-100">
              {quiz && quiz.incorrectAnswers && <button onClick={() => checkAnswer(quiz.incorrectAnswers[1])}> {quiz.incorrectAnswers[1]}</button>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center bg-rose row-span-10 ml-2 scale-90 rounded-lg hover:scale-100">
              {quiz && quiz.incorrectAnswers && <button onClick={() => checkAnswer(quiz.incorrectAnswers[2])}> {quiz.incorrectAnswers[2]}</button>}
            </div>
            <div className="flex items-center justify-center bg-love row-span-10 mr-2 rounded-lg scale-90 hover:scale-100">
              {quiz && quiz.incorrectAnswers && <button onClick={() => checkAnswer(quiz.incorrectAnswers[3])}> {quiz.incorrectAnswers[3]}</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview;
