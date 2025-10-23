import { UserRecord } from '@/domain/entities';
import { Result } from '@/utils/Result';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '..';
import {
  loginWithCredentials,
  loginWithBiometrics,
  registerBiometrics,
  logout,
  register,
} from './Thunks';

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
