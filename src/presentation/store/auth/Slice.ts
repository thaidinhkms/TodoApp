import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  loginWithCredentials,
  loginWithBiometrics,
  logout,
  registerBiometrics,
  register,
} from './Thunks';
import { AuthState } from './Type';

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  error: null,
};

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
