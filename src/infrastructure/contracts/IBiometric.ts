export default interface IBiometric {
  isAvailable(): Promise<boolean>;
  authenticate(payload: string, promptMessage?: string): Promise<string | null>;
  createKeys(): Promise<string | null>;
  deleteKeys(): Promise<void>;
}
