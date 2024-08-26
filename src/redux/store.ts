import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import searchReducer from "./features/searchSlice";
import signUpReducer from "./features/signup";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    search: searchReducer,
    signUp: signUpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
