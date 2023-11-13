import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPoint } from '../../types';
import { RootState } from '../store';

export interface GASlice {
  points: IPoint[];
  running: boolean;
  config: {
    populationSize: number;
    crossoverProbability: number;
    mutationProbability: number;
  };
}

const initialState: GASlice = {
  points: [],
  running: false,
  config: {
    populationSize: 30,
    crossoverProbability: 0.9,
    mutationProbability: 0.01,
  },
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
    setRunning: (state, action: PayloadAction<boolean>) => {
      state.running = action.payload;
    },
    setPopulationSize: (state, action: PayloadAction<number>) => {
      state.config.populationSize = action.payload;
    },
    setCrossoverProbability: (state, action: PayloadAction<number>) => {
      state.config.crossoverProbability = action.payload;
    },
    setMutationProbability: (state, action: PayloadAction<number>) => {
      state.config.mutationProbability = action.payload;
    },
  },
});

export const {
  addPoints,
  removePoints,
  setRunning,
  setCrossoverProbability,
  setMutationProbability,
  setPopulationSize,
} = GASlice.actions;

export const selectPoints = (state: RootState) => state.GA.points;
export const selectRunning = (state: RootState) => state.GA.running;
export const selectConfig = (state: RootState) => state.GA.config;

export default GASlice.reducer;
