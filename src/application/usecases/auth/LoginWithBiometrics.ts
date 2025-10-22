import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { Result } from '@/utils/Result';

export class LoginWithBiometrics {
  constructor(private readonly auth: IAuthRepository) {}
  async execute(): Promise<Result<void>> {
    return this.auth.loginWithBiometrics();
  }
}
