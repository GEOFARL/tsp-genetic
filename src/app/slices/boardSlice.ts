import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface BoardSlice {
  HEIGHT: number | null;
  WIDTH: number | null;
}

const initialState: BoardSlice = {
  HEIGHT: null,
  WIDTH: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<BoardSlice>) => {
      state.HEIGHT = action.payload.HEIGHT;
      state.WIDTH = action.payload.WIDTH;
    },
  },
});

export const { init } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
