import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import todoReducer from './TodoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export * from './AuthSlice';
export * from './TodoSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
