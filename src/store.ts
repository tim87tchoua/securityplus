import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { demoAnswerSet } from "./demoAnswers"
import type { AnswerSet } from "./types"

const answersSlice = createSlice({
  name: "answers",
  initialState: demoAnswerSet as AnswerSet,
  reducers: {
    setAnswerSet: (_state, action: PayloadAction<AnswerSet>) => action.payload,
  },
})

export const { setAnswerSet } = answersSlice.actions
export const store = configureStore({ reducer: { answers: answersSlice.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()