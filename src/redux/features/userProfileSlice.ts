// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  name: string;
  email: string;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const updateProfile = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    updateProfileStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
      state.isLoading = false;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} = updateProfile.actions;

export default updateProfile.reducer;
