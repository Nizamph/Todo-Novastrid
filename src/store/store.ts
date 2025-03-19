import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
const store = configureStore({
  reducer: {
    todoStore: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
