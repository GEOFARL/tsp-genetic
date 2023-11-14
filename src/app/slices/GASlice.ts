import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPoint } from '../../types';
import { RootState } from '../store';

export interface GASlice {
  points: IPoint[];
  route: number[];
  intervalId: number | null;
  numberPointsToGenerate: number;
  config: {
    populationSize: number;
    crossoverProbability: number;
    mutationProbability: number;
  };
}

const initialState: GASlice = {
  points: [],
  route: [],
  intervalId: null,
  numberPointsToGenerate: 50,
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
    setPopulationSize: (state, action: PayloadAction<number>) => {
      state.config.populationSize = action.payload;
    },
    setCrossoverProbability: (state, action: PayloadAction<number>) => {
      state.config.crossoverProbability = action.payload;
    },
    setMutationProbability: (state, action: PayloadAction<number>) => {
      state.config.mutationProbability = action.payload;
    },
    setRoute: (state, action: PayloadAction<number[]>) => {
      state.route = action.payload;
    },
    clearAll: (state) => {
      state.route = [];
      state.points = [];
    },
    removeRoute: (state) => {
      state.route = [];
    },
    setIntervalId: (state, action: PayloadAction<number | null>) => {
      if (action.payload === null && state.intervalId) {
        clearInterval(state.intervalId);
      }
      state.intervalId = action.payload;
    },
    setNumberOfPointsToGenerate: (state, action: PayloadAction<number>) => {
      state.numberPointsToGenerate = action.payload;
    },
  },
});

export const {
  addPoints,
  removePoints,
  setCrossoverProbability,
  setMutationProbability,
  setPopulationSize,
  setRoute,
  clearAll,
  removeRoute,
  setIntervalId,
  setNumberOfPointsToGenerate,
} = GASlice.actions;

export const selectPoints = (state: RootState) => state.GA.points;
export const selectConfig = (state: RootState) => state.GA.config;
export const selectRoute = (state: RootState) => state.GA.route;
export const selectIntervalId = (state: RootState) => state.GA.intervalId;
export const selectNumberOfPointsToGenerate = (state: RootState) =>
  state.GA.numberPointsToGenerate;
export const selectTotalPointsGenerated = createSelector(
  (state: RootState) => state.GA.points,
  (points) => points.length
);

export default GASlice.reducer;
