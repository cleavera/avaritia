import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import { Token } from './token';

@TestFixture('when creating a token')
export class TokenSpec {
    @TestCase(new (class TestClass {})(), 'TestClass')
    @TestCase('', 'String')
    @TestCase(null, 'AvaritiaToken')
    @Test('it should create a symbol')
    public createSymbol<T>(value: T, label: string): void {
        const token: Token<T> = new Token<T>(value);

        Expect(token.symbol.toString()).toBe(`Symbol(${label})`);
    }
}
