import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from '../reducers/quiz'

export const Summary = () => {
    const correctAnswers = useSelector((state) => state.quiz.answers.filter((answer) => answer.isCorrect === true ).length)
    
    const dispatch = useDispatch()

    const restart = () => {
        dispatch(quiz.actions.restart())
    }

    return (
        <div>
            <p>{`You've got ${correctAnswers} correct answers out of 5`}</p>
            <button onClick={restart}>Restart</button>
        </div>
    )
}