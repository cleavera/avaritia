import { Maybe } from '@cleavera/utils';
import { Token } from '../token/token';

const noop: () => null = (): null => null;

// tslint:disable no-any
// As typescript doesn't play nice with symbols

export class Injector {
    private _registry: any;

    constructor() {
        this.clear();
    }

    public setValue<T>(token: Token<T>, value: T): void {
        this.setFactory(token, () => value);
    }

    public setFactory<T>(token: Token<T>, factory: () => T): void {
        this._registry[token.symbol as any] = factory;
    }

    public get<T>(token: Token<T>): Maybe<T> {
        return (this._registry[token.symbol as any] || noop)();
    }

    public clear(): void {
        this._registry = {};
    }
}
