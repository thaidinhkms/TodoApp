import { Result } from '../../../common/Result';
import IAuthService from '../../../domain/auth/IAuthService';

export default class LoginWithCredentials {
  constructor(private readonly auth: IAuthService) {}
  async execute(username: string, password: string): Promise<Result<void>> {
    return this.auth.loginWithCredentials(username, password);
  }
}
