import { Result } from '../../common/Result';
import { UserRecord } from '../entities/Auth';

export default interface IAuthService {
  init(): Promise<Result<void>>;
  register(username: string, password: string): Promise<Result<UserRecord>>;
  registerBiometrics(username: string): Promise<Result<void>>;
  loginWithCredentials(
    username: string,
    password: string,
  ): Promise<Result<void>>;
  loginWithBiometrics(): Promise<Result<void>>;
  logout(): Promise<Result<void>>;
}
