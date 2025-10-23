import { container } from '@/di/Container';
import { UserRecord } from '@/domain/entities';
import { Result, AppError, toAppError } from '@/utils/Result';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginWithCredentials = createAsyncThunk<
  Result<void>,
  { username: string; password: string },
  { rejectValue: AppError }
>(
  'auth/loginWithCredentials',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const uc = container.resolve('LOGIN_WITH_CREDENTIALS');
      const result: Result<void> = await uc.execute(username, password);
      return result;
    } catch (err) {
      return rejectWithValue(toAppError(err));
    }
  },
);

export const loginWithBiometrics = createAsyncThunk<
  Result<void>,
  void,
  { rejectValue: AppError }
>('auth/loginWithBiometrics', async (_, { rejectWithValue }) => {
  try {
    const uc = container.resolve('LOGIN_WITH_BIOMETRICS');
    const result: Result<void> = await uc.execute();
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});

export const register = createAsyncThunk<
  Result<UserRecord>,
  { username: string; password: string },
  { rejectValue: AppError }
>('auth/register', async ({ username, password }, { rejectWithValue }) => {
  try {
    const uc = container.resolve('REGISTER');
    const result: Result<UserRecord> = await uc.execute(username, password);
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});

export const registerBiometrics = createAsyncThunk<
  Result<void>,
  { username: string },
  { rejectValue: AppError }
>('auth/registerBiometrics', async ({ username }, { rejectWithValue }) => {
  try {
    const uc = container.resolve('REGISTER_BIOMETRIC');
    const result: Result<void> = await uc.execute(username);
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});

export const logout = createAsyncThunk<
  Result<void>,
  void,
  { rejectValue: AppError }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const uc = container.resolve('LOGOUT');
    const result: Result<void> = await uc.execute();
    return result;
  } catch (err) {
    return rejectWithValue(toAppError(err));
  }
});
