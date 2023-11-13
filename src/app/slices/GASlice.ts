import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPoint } from '../../types';
import { RootState } from '../store';

export interface GASlice {
  points: IPoint[];
}

const initialState: GASlice = {
  points: [],
};

export const GASlice = createSlice({
  name: 'GA',
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<IPoint[]>) => {
      state.points = [...state.points, ...action.payload];
    },
    removePoints: (state) => {
      state.points = [];
    },
  },
});

export const { addPoints, removePoints } = GASlice.actions;

export const selectPoints = (state: RootState) => state.GA.points;

export default GASlice.reducer;
