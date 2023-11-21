import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from '../reducers/quiz'

import { Summary } from './Summary'
import "../css/CurrentQuestion.css";

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
    <div className="current-question" style={{backgroundColor: `${question.bgColor}`}}>
      <div className="quiz-progress">{question.id}/5</div>
      
      <h1 className="question">{question.id}. {question.questionText}</h1>
      <div className="options">
        {question.options.map((option, index) => (
          <button key="index" onClick={()=> { submitAnswer(question.id, index)}}>{option}</button>
        ))}
      </div>
      { answer &&
        <div className="answer">
          <p className="answer-text">{`The answer is ${statusAnswer()}`}. {question.answerText}</p>
          <button onClick={handleNext}>Go to the next question!</button>
        </div>
      }
    </div>
  );
};
