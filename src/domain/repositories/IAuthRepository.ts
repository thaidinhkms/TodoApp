import { UserRecord } from '@/domain/entities/Auth';
import { Result } from '@/utils/Result';

export interface IAuthRepository {
  register(username: string, password: string): Promise<Result<UserRecord>>;
  registerBiometrics(username: string): Promise<Result<void>>;
  loginWithCredentials(
    username: string,
    password: string,
  ): Promise<Result<void>>;
  loginWithBiometrics(): Promise<Result<void>>;
  logout(): Promise<Result<void>>;
}
