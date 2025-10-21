import { Result } from '../../../common/Result';
import IAuthService from '../../../domain/auth/IAuthService';

export default class Logout {
  constructor(private readonly auth: IAuthService) {}
  async execute(): Promise<Result<void>> {
    return await this.auth.logout();
  }
}
