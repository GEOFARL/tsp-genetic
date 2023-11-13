import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/boardSlice';
import GAReducer from './slices/GASlice';
import algorithmParametersReducer from './slices/algorithmParametersSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    GA: GAReducer,
    algorithmParameters: algorithmParametersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
