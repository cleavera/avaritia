import { $isNull, Maybe } from '@cleavera/utils';
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
        this._set(token, () => value);
    }

    public setFactory<T>(token: Token<T>, factory: () => T): void {
        let value: Maybe<T> = null;

        this._set(token, () => {
            if ($isNull(value)) {
                value = factory();
            }

            return value;
        });
    }

    public get<T>(token: Token<T>): Maybe<T> {
        return (this._registry[token.symbol as any] || noop)();
    }

    public clear(): void {
        this._registry = {};
    }

    private _set<T>(token: Token<T>, func: () => T): void {
        this._registry[token.symbol as any] = func;
    }
}
