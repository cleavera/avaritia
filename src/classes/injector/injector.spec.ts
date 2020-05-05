import { Expect, Test, TestCase, TestFixture } from 'alsatian';

import { MockClass } from '../mock-class/mock-class';
import { Token } from '../token/token';
import { Injector } from './injector';

@TestFixture('when creating a token')
export class InjectorSpec {
    public injector: Injector;

    constructor() {
        this.injector = new Injector();
    }

    @TestCase(new MockClass())
    @TestCase('TestString')
    @TestCase(null)
    @Test('it should register an injectable')
    public setValue<T>(value: T): void {
        const token: Token<T> = new Token<T>(value);

        this.injector.setValue(token, value);

        Expect(this.injector.get(token)).toBe(value);
    }

    @TestCase(new MockClass())
    @TestCase('TestString')
    @TestCase(null)
    @Test('it should register an injectable')
    public setFactory<T>(value: T): void {
        const token: Token<T> = new Token<T>(value);

        this.injector.setFactory(token, () => {
            return value;
        });

        Expect(this.injector.get(token)).toBe(value);
    }

    @Test('it should register an injectable')
    public getMissingValue(): void {
        const token: Token<string> = new Token<string>('');

        Expect(this.injector.get(token)).toBe(null);
    }
}
