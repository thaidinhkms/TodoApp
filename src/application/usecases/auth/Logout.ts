import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { Result } from '@/utils/Result';

export class Logout {
  constructor(private readonly auth: IAuthRepository) {}
  async execute(): Promise<Result<void>> {
    return await this.auth.logout();
  }
}
