import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { container } from '../../common/Container';
import { UserRecord } from '../../domain/entities/Auth';
import { Result } from '../../common/Result';

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
  const authService = container.resolve('AUTH_SERVICE');
  const loginWithCredentialsUC = container.resolve('LOGIN_WITH_CREDENTIALS');
  const loginWithBiometricsUC = container.resolve('LOGIN_WITH_BIOMETRICS');
  const registerUC = container.resolve('REGISTER');
  const registerBiometricsUC = container.resolve('REGISTER_BIOMETRIC');
  const logoutUC = container.resolve('LOGOUT');

  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await authService.init();
    })();
  }, [authService]);

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
