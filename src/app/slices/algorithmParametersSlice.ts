import { createSlice } from '@reduxjs/toolkit';
import { Crossover, LocalImprovement, Mutation } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AlgorithmParameters {
  crossover: Crossover;
  mutation: Mutation;
  localImprovement: LocalImprovement;
}

const initialState: AlgorithmParameters = {
  crossover: Crossover.HEURISTIC,
  mutation: Mutation.SWAP,
  localImprovement: LocalImprovement.OFF,
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
  },
});

export const { setCrossover, setLocalImprovement, setMutation } =
  algorithmParametersSlice.actions;

export const selectParameters = (state: RootState) => state.algorithmParameters;

export default algorithmParametersSlice.reducer;
