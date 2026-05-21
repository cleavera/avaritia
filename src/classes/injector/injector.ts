import { Token } from '../token/token';

const UNINITIALISED: unique symbol = Symbol('uninitialised');

const noop: () => null = (): null => {
  return null;
};

export class Injector {
  private _registry: any;

  constructor() {
    this.clear();
  }

  public setValue<T>(token: Token<T>, value: T): void {
    this._set(token, () => {
      return value;
    });
  }

  public setFactory<T>(token: Token<T>, factory: () => T): void {
    let value: T | typeof UNINITIALISED = UNINITIALISED;

    this._set(token, () => {
      if (value === UNINITIALISED) {
        value = factory();
      }

      return value;
    });
  }

  public get<T>(token: Token<T>): T | null {
    return (this._registry[token.symbol as any] ?? noop)();
  }

  public clear(): void {
    this._registry = {};
  }

  private _set<T>(token: Token<T>, func: () => T): void {
    this._registry[token.symbol as any] = func;
  }
}
