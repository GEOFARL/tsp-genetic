import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface BoardSlice {
  HEIGHT: number | null;
  WIDTH: number | null;
  showNumbers: boolean;
  numbersSize: number;
  circleRadius: number;
}

const initialState: BoardSlice = {
  HEIGHT: null,
  WIDTH: null,
  showNumbers: false,
  numbersSize: 10,
  circleRadius: 2,
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
    setNumbersSize: (state, action: PayloadAction<number>) => {
      state.numbersSize = action.payload;
    },
    setCircleRadius: (state, action: PayloadAction<number>) => {
      state.circleRadius = action.payload;
    },
  },
});

export const { init, toggleShowNumbers, setNumbersSize, setCircleRadius } =
  boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
