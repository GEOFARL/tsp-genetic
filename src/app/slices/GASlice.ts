import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPoint } from '../../types';
import { RootState } from '../store';

export interface GASlice {
  points: IPoint[];
  route: number[];
  intervalId: number | null;
  isPaused: boolean;
  numberPointsToGenerate: number;
  config: {
    populationSize: number;
    crossoverProbability: number;
    mutationProbability: number;
    localImprovementProbability: number;
  };
  stats: {
    generationCount: number;
    totalDistance: number;
    plotData: {
      [key: string]: [number, number][];
    };
  };
}

const initialState: GASlice = {
  points: [],
  route: [],
  intervalId: null,
  isPaused: false,
  numberPointsToGenerate: 50,
  config: {
    populationSize: 30,
    crossoverProbability: 0.9,
    mutationProbability: 0.01,
    localImprovementProbability: 0.2,
  },
  stats: {
    generationCount: 0,
    totalDistance: 0,
    plotData: {},
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
    setLocalImprovementProbability: (state, action: PayloadAction<number>) => {
      state.config.localImprovementProbability = action.payload;
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
    setGenerationCount: (state, action: PayloadAction<number>) => {
      state.stats.generationCount = action.payload;
    },
    setTotalDistance: (state, action: PayloadAction<number>) => {
      state.stats.totalDistance = action.payload;
    },
    clearAllStats: (state) => {
      state.stats = {
        generationCount: 0,
        totalDistance: 0,
        plotData: {},
      };
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    addGenerationDistance: (
      state,
      action: PayloadAction<[string, [number, number]]>
    ) => {
      const [key, value] = action.payload;
      if (state.stats.plotData[key]) {
        state.stats.plotData[key] = [...state.stats.plotData[key], value];
      } else {
        state.stats.plotData[key] = [value];
      }
    },
  },
});

export const {
  addPoints,
  removePoints,
  setCrossoverProbability,
  setMutationProbability,
  setLocalImprovementProbability,
  setPopulationSize,
  setRoute,
  clearAll,
  removeRoute,
  setIntervalId,
  setNumberOfPointsToGenerate,
  setTotalDistance,
  setGenerationCount,
  clearAllStats,
  setIsPaused,
  addGenerationDistance,
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
export const selectGenerationCount = (state: RootState) =>
  state.GA.stats.generationCount;
export const selectTotalDistance = (state: RootState) =>
  state.GA.stats.totalDistance;
export const selectIsPaused = (state: RootState) => state.GA.isPaused;
export const selectPlotData = (state: RootState) => state.GA.stats.plotData;

export default GASlice.reducer;
