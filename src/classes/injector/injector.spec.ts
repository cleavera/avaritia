import * as assert from 'node:assert';
import test, { beforeEach, describe } from 'node:test';
import { Token } from '../token/token';
import { Injector } from './injector';

class MockClass {}

describe('Injector', () => {
    let injector: Injector;

    beforeEach(() => {
        injector = new Injector();
    });

    describe('when creating a token', () => {
        test('it should register an injectable with value (MockClass)', () => {
            const value = new MockClass();
            const token = new Token(value);

            injector.setValue(token, value);
            assert.strictEqual(injector.get(token), value);
        });

        test('it should register an injectable with value (TestString)', () => {
            const value = 'TestString';
            const token = new Token(value);

            injector.setValue(token, value);
            assert.strictEqual(injector.get(token), value);
        });

        test('it should register an injectable with value (null)', () => {
            const value = null;
            const token = new Token(value);

            injector.setValue(token, value);
            assert.strictEqual(injector.get(token), value);
        });

        test('it should register an injectable with a factory (MockClass)', () => {
            const value = new MockClass();
            const token = new Token(value);

            injector.setFactory(token, () => value);
            assert.strictEqual(injector.get(token), value);
        });

        test('it should register an injectable with a factory (TestString)', () => {
            const value = 'TestString';
            const token = new Token(value);

            injector.setFactory(token, () => value);
            assert.strictEqual(injector.get(token), value);
        });

        test('it should register an injectable with a factory (null)', () => {
            const value = null;
            const token = new Token(value);

            injector.setFactory(token, () => value);
            assert.strictEqual(injector.get(token), value);
        });

        test('it should return null for a missing value', () => {
            const token = new Token<string>('');
            assert.strictEqual(injector.get(token), null);
        });
    });
});

