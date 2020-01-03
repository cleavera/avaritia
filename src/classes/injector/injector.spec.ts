import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { Token } from '../token/token';
import { Injector } from './injector';

// tslint:disable max-classes-per-file

@TestFixture('when creating a token')
export class InjectorSpec {
    public injector: Injector;

    constructor() {
        this.injector = new Injector();
    }

    @TestCase(new (class TestClass {})())
    @TestCase('TestString')
    @TestCase(null)
    @Test('it should register an injectable')
    public register<T>(value: T): void {
        const token: Token<T> = this.injector.register(value);

        Expect(this.injector.get(token)).toBe(value);
    }

    @TestCase(new (class TestClass {})())
    @TestCase('TestString')
    @TestCase(null)
    @Test('it should register an injectable')
    public set<T>(value: T): void {
        const token: Token<T> = new Token<T>(value);

        this.injector.set(token, value);

        Expect(this.injector.get(token)).toBe(value);
    }

    @Test('it should register an injectable')
    public getMissingValue(): void {
        const token: Token<string> = new Token<string>('');

        Expect(this.injector.get(token)).toBe(null);
    }
}
