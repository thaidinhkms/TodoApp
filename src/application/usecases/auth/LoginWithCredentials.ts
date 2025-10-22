import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { Result } from '@/utils/Result';

export class LoginWithCredentials {
  constructor(private readonly auth: IAuthRepository) {}
  async execute(username: string, password: string): Promise<Result<void>> {
    return this.auth.loginWithCredentials(username, password);
  }
}
