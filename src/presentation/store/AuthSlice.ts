import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { container } from '@/di/Container';
import { UserRecord } from '@/domain/entities/Auth';
import { AppError, Result, toAppError } from '@/utils/Result';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './';
import { useCallback } from 'react';

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  error?: AppError | null;
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  error: null,
};

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.authenticated = action.payload;
      if (!action.payload) state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    const handlePending = (state: AuthState) => {
      state.loading = true;
      state.error = null;
    };

    // loginWithCredentials
    builder.addCase(loginWithCredentials.pending, handlePending);
    builder.addCase(loginWithCredentials.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.ok) {
        state.authenticated = true;
      } else {
        state.error = action.payload.error ?? { message: 'Login failed' };
      }
    });
    builder.addCase(loginWithCredentials.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Login error' };
    });

    // loginWithBiometrics
    builder.addCase(loginWithBiometrics.pending, handlePending);
    builder.addCase(loginWithBiometrics.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.ok) state.authenticated = true;
      else
        state.error = action.payload.error ?? {
          message: 'Biometric login failed',
        };
    });
    builder.addCase(loginWithBiometrics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Biometric login error' };
    });

    // logout
    builder.addCase(logout.pending, handlePending);
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.authenticated = false;
      if (!action.payload.ok)
        state.error = action.payload.error ?? { message: 'Logout failed' };
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.authenticated = false;
      state.error = action.payload ?? { message: 'Logout error' };
    });

    // register
    builder.addCase(register.pending, handlePending);
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.ok) state.authenticated = true;
      else state.error = action.payload.error ?? { message: 'Register failed' };
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Register error' };
    });

    // registerBiometrics
    builder.addCase(registerBiometrics.pending, handlePending);
    builder.addCase(registerBiometrics.fulfilled, (state, action) => {
      state.loading = false;
      if (!action.payload.ok)
        state.error = action.payload.error ?? {
          message: 'Register biometric failed',
        };
    });
    builder.addCase(registerBiometrics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? { message: 'Register biometric error' };
    });
  },
});

export const { setAuthenticated, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated,
  );
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const loginWithCredentialsCb = useCallback(
    async (username: string, password: string) => {
      const action = await dispatch(
        loginWithCredentials({ username, password }),
      );
      if (loginWithCredentials.fulfilled.match(action)) {
        return action.payload;
      } else {
        return {
          ok: false,
          error: action.payload ?? { message: 'Unexpected error' },
        } as Result<void>;
      }
    },
    [dispatch],
  );

  const loginWithBiometricsCb = useCallback(async () => {
    const action = await dispatch(loginWithBiometrics());
    if (loginWithBiometrics.fulfilled.match(action)) return action.payload;
    return {
      ok: false,
      error: action.payload ?? { message: 'Unexpected error' },
    } as Result<void>;
  }, [dispatch]);

  const registerCb = useCallback(
    async (username: string, password: string) => {
      const action = await dispatch(register({ username, password }));
      if (register.fulfilled.match(action)) return action.payload;
      return {
        ok: false,
        error: action.payload ?? { message: 'Unexpected error' },
      } as Result<UserRecord>;
    },
    [dispatch],
  );

  const registerBiometricsCb = useCallback(
    async (username: string) => {
      const action = await dispatch(registerBiometrics({ username }));
      if (registerBiometrics.fulfilled.match(action)) return action.payload;
      return {
        ok: false,
        error: action.payload ?? { message: 'Unexpected error' },
      } as Result<void>;
    },
    [dispatch],
  );

  const logoutCb = useCallback(async () => {
    const action = await dispatch(logout());
    if (logout.fulfilled.match(action)) return action.payload;
    return {
      ok: false,
      error: action.payload ?? { message: 'Unexpected error' },
    } as Result<void>;
  }, [dispatch]);

  return {
    authenticated,
    loading,
    error,
    register: registerCb,
    registerBiometrics: registerBiometricsCb,
    loginWithCredentials: loginWithCredentialsCb,
    loginWithBiometrics: loginWithBiometricsCb,
    logout: logoutCb,
  };
};
