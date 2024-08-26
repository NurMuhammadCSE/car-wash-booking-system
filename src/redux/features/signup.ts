import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  address: "",
  phone: "",
  password: "",
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setName, setEmail, setPassword, setAddress, setPhone } =
  signUpSlice.actions;
export default signUpSlice.reducer;
