import { Result } from '../../../common/Result';
import IAuthService from '../../../domain/auth/IAuthService';
import { UserRecord } from '../../../domain/entities/Auth';

export default class Register {
  constructor(private readonly auth: IAuthService) {}
  async execute(
    username: string,
    password: string,
  ): Promise<Result<UserRecord>> {
    return await this.auth.register(username, password);
  }
}
