import { container } from '@/di/Container';
import { UserRecord } from '@/domain/entities/Auth';
import { Result } from '@/utils/Result';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface AuthContextValue {
  authenticated: boolean;
  register(username: string, password: string): Promise<Result<UserRecord>>;
  registerBiometrics(username: string): Promise<Result<void>>;
  loginWithCredentials(
    username: string,
    password: string,
  ): Promise<Result<void>>;
  loginWithBiometrics(): Promise<Result<void>>;
  logout(): Promise<Result<void>>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('Auth not provided');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const loginWithBiometricsUC = container.resolve('LOGIN_WITH_BIOMETRICS');
  const loginWithCredentialsUC = container.resolve('LOGIN_WITH_CREDENTIALS');
  const logoutUC = container.resolve('LOGOUT');
  const registerUC = container.resolve('REGISTER');
  const registerBiometricsUC = container.resolve('REGISTER_BIOMETRIC');

  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const value = useMemo<AuthContextValue>(() => {
    const loginWithCredentials = async (username: string, password: string) => {
      const result = await loginWithCredentialsUC.execute(username, password);
      if (result.ok) setAuthenticated(true);
      return result;
    };

    const loginWithBiometrics = async () => {
      const result = await loginWithBiometricsUC.execute();
      if (result.ok) setAuthenticated(true);
      return result;
    };

    const register = async (username: string, password: string) => {
      const result = await registerUC.execute(username, password);
      if (result.ok) setAuthenticated(true);
      return result;
    };

    const registerBiometrics = async (username: string) =>
      await registerBiometricsUC.execute(username);

    const logout = async () => {
      const result = await logoutUC.execute();
      setAuthenticated(false);
      return result;
    };

    return {
      authenticated,
      loginWithCredentials,
      loginWithBiometrics,
      register,
      registerBiometrics,
      logout,
    };
  }, [
    authenticated,
    loginWithCredentialsUC,
    loginWithBiometricsUC,
    registerUC,
    registerBiometricsUC,
    logoutUC,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
