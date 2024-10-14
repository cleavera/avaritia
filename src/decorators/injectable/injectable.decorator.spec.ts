import assert from 'node:assert';
import test, { describe } from 'node:test';
import { Injector } from '../../classes/injector/injector';
import { Token } from '../../classes/token/token';
import { Injectable } from './injectable.decorator';

const INJECTOR: Injector = new Injector();
const INJECTION_TEST_TOKEN: Token = new Token();

@Injectable(INJECTION_TEST_TOKEN, INJECTOR)
class InjectionTestClass {}

describe('Injector with Decorator', () => {
    test('it should inject the injectable for the token', () => {
        const localInjected = INJECTOR.get<InjectionTestClass>(INJECTION_TEST_TOKEN);
        assert.strictEqual(localInjected instanceof InjectionTestClass, true);
    });
});
