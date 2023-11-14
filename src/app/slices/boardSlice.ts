import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface BoardSlice {
  HEIGHT: number | null;
  WIDTH: number | null;
  showNumbers: boolean;
  numbersSize: number;
  circleRadius: number;
  edgeColor: string;
  edgeThickness: number;
  updateRate: number;
}

const DEFAULT_SETTINGS = {
  showNumbers: false,
  numbersSize: 10,
  circleRadius: 2,
  edgeColor: '#ff0000',
  edgeThickness: 1,
  updateRate: 10,
};

const initialState: BoardSlice = {
  HEIGHT: null,
  WIDTH: null,
  ...DEFAULT_SETTINGS,
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
    setEdgeColor: (state, action: PayloadAction<string>) => {
      state.edgeColor = action.payload;
    },
    setEdgeThickness: (state, action: PayloadAction<number>) => {
      state.edgeThickness = action.payload;
    },
    setUpdateRate: (state, action: PayloadAction<number>) => {
      state.updateRate = action.payload;
    },
    resetToDefault: (state) => {
      // eslint-disable-next-line
      return { ...state, ...DEFAULT_SETTINGS };
    },
  },
});

export const {
  init,
  toggleShowNumbers,
  setNumbersSize,
  setCircleRadius,
  setEdgeColor,
  setEdgeThickness,
  setUpdateRate,
  resetToDefault,
} = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;
export const selectUpdateRate = (state: RootState) => state.board.updateRate;

export default boardSlice.reducer;
