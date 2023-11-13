import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/boardSlice';
import GAReducer from './slices/GASlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    GA: GAReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
