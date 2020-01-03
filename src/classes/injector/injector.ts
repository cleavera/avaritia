import { Maybe } from '@cleavera/utils';
import { Token } from '../token/token';

// tslint:disable no-any
// As typescript doesn't play nice with symbols

export class Injector {
    private _registry: any;

    constructor() {
        this.clear();
    }

    public set<T>(token: Token<T>, value: T): void {
        this._registry[token.symbol as any] = value;
    }

    public get<T>(token: Token<T>): Maybe<T> {
        return this._registry[token.symbol as any] || null;
    }

    public clear(): void {
        this._registry = {};
    }
}
