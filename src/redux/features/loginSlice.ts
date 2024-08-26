import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setLoginEmail, setLoginPassword } = loginSlice.actions;
export default loginSlice.reducer;
