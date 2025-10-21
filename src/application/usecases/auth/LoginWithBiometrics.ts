import { Result } from '../../../common/Result';
import IAuthService from '../../../domain/auth/IAuthService';

export default class LoginWithBiometrics {
  constructor(private readonly auth: IAuthService) {}
  async execute(): Promise<Result<void>> {
    return this.auth.loginWithBiometrics();
  }
}
