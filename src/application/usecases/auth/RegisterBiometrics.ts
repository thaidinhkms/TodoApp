import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { Result } from '@/utils/Result';

export class RegisterBiometrics {
  constructor(private readonly auth: IAuthRepository) {}
  async execute(username: string): Promise<Result<void>> {
    return await this.auth.registerBiometrics(username);
  }
}
