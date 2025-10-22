import { UserRecord } from '@/domain/entities/Auth';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { Result } from '@/utils/Result';

export class Register {
  constructor(private readonly auth: IAuthRepository) {}
  async execute(
    username: string,
    password: string,
  ): Promise<Result<UserRecord>> {
    return await this.auth.register(username, password);
  }
}
