import { UserRecord } from '@/domain/entities';
import { IAuthRepository } from '@/domain/repositories';
import { IBiometric } from '@/infrastructure/contracts/IBiometric';
import { IStorage } from '@/infrastructure/contracts/IStorage';
import { err, ok, Result } from '@/utils/Result';
import forge from 'node-forge';
import { v4 as uuidv4 } from 'uuid';
import { USERS_KEY, BIOMETRIC_STORE_KEY } from '../constants/Keys';

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    private readonly storage: IStorage,
    private readonly biometric: IBiometric,
  ) {}

  private async readUsers(): Promise<Record<string, UserRecord>> {
    return (
      (await this.storage.getObject<Record<string, UserRecord>>(USERS_KEY)) ??
      {}
    );
  }
  private async writeUsers(users: Record<string, UserRecord>) {
    await this.storage.setObject(USERS_KEY, users);
  }

  private async readBiometricStore(): Promise<{
    username: string;
    publicKey: string;
  } | null> {
    return await this.storage.getObject<{
      username: string;
      publicKey: string;
    }>(BIOMETRIC_STORE_KEY);
  }
  private async writeBiometricStore(username: string, publicKey: string) {
    await this.storage.setObject(BIOMETRIC_STORE_KEY, { username, publicKey });
  }

  async register(
    username: string,
    password: string,
  ): Promise<Result<UserRecord>> {
    const users = await this.readUsers();
    if (users[username]) return err('User already exists');
    const publicKey = uuidv4();
    const user: UserRecord = {
      username,
      password,
      publicKey,
      createdAt: new Date().toISOString(),
    };
    users[username] = user;
    await this.writeUsers(users);
    await this.registerBiometrics(username);
    return ok(user);
  }

  async registerBiometrics(username: string): Promise<Result<void>> {
    const users = await this.readUsers();
    const u = users[username];
    if (!u) return err('User not found');

    const available = await this.biometric.isAvailable();
    if (!available) return err('Biometric not available on this device');

    const publicKey = await this.biometric.createKeys();
    if (!publicKey) return err('Public key could not be created');

    await this.writeBiometricStore(username, publicKey);

    return ok();
  }

  async loginWithCredentials(
    username: string,
    password: string,
  ): Promise<Result<void>> {
    const users = await this.readUsers();
    const user = users[username];
    if (!user) return err('Incorrect username or password');
    if (user.password !== password) err('Incorrect username or password');
    const biometricStore = await this.readBiometricStore();
    if (!biometricStore) await this.registerBiometrics(username);
    return ok();
  }

  async loginWithBiometrics(): Promise<Result<void>> {
    const user = await this.readBiometricStore();
    if (!user)
      return err(
        'Biometrics authentication not set up yet, please login using credentials first',
      );

    const available = await this.biometric.isAvailable();
    if (!available) return err('Biometrics not available on this device');

    const nonce = uuidv4();

    const signature = await this.biometric.authenticate(
      nonce,
      'Sign in with biometrics',
    );
    if (!signature) return err('Could not sign in with biometrics');

    // Simulate backend verification
    const derBytes = forge.util.decode64(user.publicKey);
    const asn1 = forge.asn1.fromDer(derBytes);
    const pub = forge.pki.publicKeyFromAsn1(asn1);
    const md = forge.md.sha256.create();
    md.update(nonce, 'utf8');
    const signatureBytes = forge.util.decode64(signature);

    const verified = pub.verify(md.digest().getBytes(), signatureBytes);
    if (!verified) return err('Biometrics verification failed');
    return ok();
  }

  async logout(): Promise<Result<void>> {
    return ok();
  }

  async listUsers(): Promise<UserRecord[]> {
    return Object.values(await this.readUsers());
  }
}
