import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types";

export interface CounterState {
  list: Book[];
}

const initialState: CounterState = {
  list: [],
};

export const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.list = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { search } = bookListSlice.actions;

export default bookListSlice.reducer;
