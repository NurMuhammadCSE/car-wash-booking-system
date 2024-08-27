import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SlotState {
  selectedSlots: string[]; // Array to store selected slot IDs or startTime
}

const initialState: SlotState = {
  selectedSlots: [],
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    selectSlot: (state, action: PayloadAction<string>) => {
      // Clear any previously selected slots and add the new one
      state.selectedSlots = [action.payload];
    },
    deselectSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlots = state.selectedSlots.filter(
        (slot) => slot !== action.payload
      );
    },
    resetSlots: (state) => {
      state.selectedSlots = [];
    },
    clearSlots(state) {
      state.selectedSlots = [];
    },
  },
});

export const { selectSlot, deselectSlot, resetSlots, clearSlots } = slotSlice.actions;
export default slotSlice.reducer;
