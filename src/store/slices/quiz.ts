import { createSlice } from "@reduxjs/toolkit";
import { quizListInterface } from "../../interfaces/interfaces";

interface IQuizList {
  quizList: Array<quizListInterface>;
}

const initialQuizState: IQuizList = { quizList: [] };

const quizSlice = createSlice({
  name: "category",
  initialState: initialQuizState,
  reducers: {
    addQuiz(state, action) {
      state.quizList = [...state.quizList, action.payload.quiz];
    },
    setQuizzes(state, action) {
      state.quizList = action.payload.quizzes;
    },
  },
});
export const quizActions = quizSlice.actions;

export default quizSlice.reducer;
