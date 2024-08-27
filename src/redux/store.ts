import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import searchReducer from "./features/searchSlice";
import signUpReducer from "./features/signupSlice";
import loginReducer from "./features/loginSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./features/userSlice";
import slotReducer from './features/slotSlice';

const persistUserConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    search: searchReducer,
    signUp: signUpReducer,
    login: loginReducer,
    user: persistedUserReducer,
    slot: slotReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
