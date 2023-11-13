import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface BoardSlice {
  ctx: CanvasRenderingContext2D | null;
  HEIGHT: number | null;
  WIDTH: number | null;
}

const initialState: BoardSlice = {
  ctx: null,
  HEIGHT: null,
  WIDTH: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

// export const {  } = boardSlice.actions;

export default boardSlice.reducer;
