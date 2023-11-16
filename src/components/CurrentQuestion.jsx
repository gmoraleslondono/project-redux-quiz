import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from '../reducers/quiz'

import { Summary } from './Summary'

export const CurrentQuestion = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex]);
  const answer = useSelector((state) => state.quiz.answers.find((a) => a.questionId === question.id))
  const isQuizOver = useSelector((state) => state.quiz.quizOver)

  const dispatch = useDispatch()

  const submitAnswer = (id, index) => {
    dispatch(quiz.actions.submitAnswer({
      questionId: id,
      answerIndex: index
    }))
  }

  const statusAnswer = () => {
    return answer.isCorrect ? 'right' : 'wrong'
  }

  const handleNext = () => {
    dispatch(quiz.actions.goToNextQuestion())
  }

  if(isQuizOver){
    return <Summary />
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div>
      <h1>Question: {question.questionText}</h1>
      <div className="options">
        {question.options.map((option, index) => (
          <button key="index" onClick={()=> { submitAnswer(question.id, index)}}>{option}</button>
        ))}
      </div>
      { answer &&
        <div>
          <p>{`The answer is ${statusAnswer()}`}</p>
          <p>{question.answerText}</p>
          <button onClick={handleNext}>Go to the next question!</button>
        </div>
      }
    </div>
  );
};
