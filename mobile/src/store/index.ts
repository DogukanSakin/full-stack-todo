import { configureStore } from '@reduxjs/toolkit'

import todoReducer from './features/toDoSlice';
import modalReducer from './features/modalSlice';
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    modal: modalReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch