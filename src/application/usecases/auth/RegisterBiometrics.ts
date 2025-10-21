import { Result } from '../../../common/Result';
import IAuthService from '../../../domain/auth/IAuthService';

export default class RegisterBiometrics {
  constructor(private readonly auth: IAuthService) {}
  async execute(username: string): Promise<Result<void>> {
    return await this.auth.registerBiometrics(username);
  }
}
