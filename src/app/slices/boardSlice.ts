import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface BoardSlice {
  HEIGHT: number | null;
  WIDTH: number | null;
  showNumbers: boolean;
}

const initialState: BoardSlice = {
  HEIGHT: null,
  WIDTH: null,
  showNumbers: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<{ HEIGHT: number; WIDTH: number }>) => {
      state.HEIGHT = action.payload.HEIGHT;
      state.WIDTH = action.payload.WIDTH;
    },
    toggleShowNumbers: (state) => {
      state.showNumbers = !state.showNumbers;
    },
  },
});

export const { init, toggleShowNumbers } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
