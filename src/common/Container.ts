import { ContainerTypes } from './ContainerTypes';

type Token = keyof ContainerTypes;

class Container {
  private readonly registry = new Map<
    Token,
    ContainerTypes[Token] | (() => ContainerTypes[Token])
  >();

  // register either a ready instance or a factory (lazy)
  register<K extends Token>(
    token: K,
    impl: ContainerTypes[K] | (() => ContainerTypes[K]),
  ) {
    this.registry.set(token, impl as any);
  }

  resolve<K extends Token>(token: K): ContainerTypes[K] {
    if (!this.registry.has(token)) {
      throw new Error(`Dependency ${String(token)} not registered`);
    }
    const raw = this.registry.get(token)!;
    // if it's a factory, call it and replace with instance
    if (typeof raw === 'function') {
      const instance = (raw as () => ContainerTypes[K])();
      this.registry.set(token, instance as any);
      return instance;
    }
    return raw as ContainerTypes[K];
  }

  isRegistered(token: Token) {
    return this.registry.has(token);
  }

  clear() {
    this.registry.clear();
  }
}

export const container = new Container();
export type { Token as ContainerKey };
