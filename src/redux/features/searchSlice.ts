import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  sort: "",
  filter: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearch, setSort, setFilter } = searchSlice.actions;
export default searchSlice.reducer;
