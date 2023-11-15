import { createSlice } from "@reduxjs/toolkit";

// https://www.weareteachers.com/weird-fun-facts/
const questions = [
  {
    id: 1,
    questionText: "Which country prohibits the ownership of just one guinea pig?",
    options: ["Switzerland", "Mexico", "Brazil", "New Guinea"],
    answerText: "Since guinea pigs are such social creatures, one guinea pig would get lonely so having just one is considered animal abuse in Switzerland.",
    correctAnswerIndex: 0
  },
  {
    id: 2,
    questionText:
      "Which country chose the unicorn as its national animal?",
    options: ["Netherland", "Portugal", "Scotland", "Colombia"],
    answerText: "Scotland chose the unicorn as its national animal.",
    correctAnswerIndex: 2
  }, {
    id: 3,
    questionText:
      "Avocados are:",
    options: ["Legumes", "Fruits", "Grains", "Vegetables"],
    answerText: "Avocados are fruits because they are single-seeded berries.",
    correctAnswerIndex: 1
  },
  {
    id: 4,
    questionText:
      "What is the human part of the body that can’t heal themselves?",
    options: ["Nails", "Theet", "hair", "Tongue"],
    answerText: "Teeth are not made of live tissue and are coated in enamel, which can’t spontaneously regenerate.",
    correctAnswerIndex: 1
  },
  {
    id: 5,
    questionText:
      "In which country McDonald’s serves spaghetti?",
    options: ["Italia", "Philippines", "Spain", "Georgia"],
    answerText: "In Philippines you can buy the McSpaghetti meat sauce pasta comes with a side of “McDo” fried chicken.",
    correctAnswerIndex: 1
  }
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    }
  }
});
