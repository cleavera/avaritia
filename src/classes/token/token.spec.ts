import assert from 'node:assert';
import test, { describe } from 'node:test';
import { Token } from './token';

class MockClass {}

describe('Token', () => {
    describe('when creating a token', () => {
        test('it should create a symbol for MockClass', () => {
            const value = new MockClass();
            const label = 'MockClass';
            const token = new Token(value);

            assert.strictEqual(token.symbol.toString(), `Symbol(${label})`);
        });

        test('it should create a symbol for an empty string', () => {
            const value = '';
            const label = 'String';
            const token = new Token(value);

            assert.strictEqual(token.symbol.toString(), `Symbol(${label})`);
        });

        test('it should create a symbol for null', () => {
            const value = null;
            const label = 'AvaritiaToken';
            const token = new Token(value);

            assert.strictEqual(token.symbol.toString(), `Symbol(${label})`);
        });
    });
});
