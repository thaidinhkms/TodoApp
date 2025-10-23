import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/Slice';
import todoReducer from './todo/Slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export * from './auth';
export * from './todo';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
