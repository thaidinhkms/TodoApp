import IBiometric from '../contracts/IBiometric';
import ReactNativeBiometrics from 'react-native-biometrics';

export class RNBiometrics implements IBiometric {
  private readonly biometrics = new ReactNativeBiometrics();

  async isAvailable(): Promise<boolean> {
    try {
      const { available } = await this.biometrics.isSensorAvailable();
      return !!available;
    } catch {
      return false;
    }
  }

  async authenticate(
    payload: string,
    promptMessage = 'Authenticate',
  ): Promise<string | null> {
    try {
      const result = await this.biometrics.createSignature({
        payload,
        promptMessage,
      });
      if (result.success) {
        return result.signature ?? null;
      } else {
        console.error('Error signing in: ', result.error);
        return null;
      }
    } catch {
      return null;
    }
  }

  async createKeys(): Promise<string | null> {
    try {
      const result = await this.biometrics.createKeys();
      return result.publicKey;
    } catch {
      return null;
    }
  }

  async deleteKeys(): Promise<void> {
    try {
      await this.biometrics.deleteKeys();
    } catch {
      // ignore
    }
  }
}
