import { createSlice } from '@reduxjs/toolkit';
import { Crossover, LocalImprovement, Mutation } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AlgorithmParameters {
  crossover: Crossover;
  mutation: Mutation;
  localImprovement: LocalImprovement;
  isAsymmetric: boolean;
}

const initialState: AlgorithmParameters = {
  crossover: Crossover.HEURISTIC,
  mutation: Mutation.SWAP,
  localImprovement: LocalImprovement.OFF,
  isAsymmetric: false,
};

export const algorithmParametersSlice = createSlice({
  name: 'algorithmParameters',
  initialState,
  reducers: {
    setCrossover: (state, action: PayloadAction<Crossover>) => {
      state.crossover = action.payload;
    },
    setMutation: (state, action: PayloadAction<Mutation>) => {
      state.mutation = action.payload;
    },
    setLocalImprovement: (state, action: PayloadAction<LocalImprovement>) => {
      state.localImprovement = action.payload;
    },
    setIsAsymmetric: (state, action: PayloadAction<boolean>) => {
      state.isAsymmetric = action.payload;
    },
  },
});

export const {
  setCrossover,
  setLocalImprovement,
  setMutation,
  setIsAsymmetric,
} = algorithmParametersSlice.actions;

export const selectParameters = (state: RootState) => state.algorithmParameters;

export default algorithmParametersSlice.reducer;
