import assert from 'node:assert';
import test, { describe } from 'node:test';
import { Injector } from '../../classes/injector/injector';
import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';
import { Injectable } from './injectable.decorator';

const LOCAL_INJECTOR: Injector = new Injector();
const GLOBAL_INJECTION_TEST_TOKEN: Token = new Token();
const LOCAL_INJECTION_TEST_TOKEN: Token = new Token();

@Injectable(GLOBAL_INJECTION_TEST_TOKEN)
class GlobalInjectionTestClass {}

@Injectable(LOCAL_INJECTION_TEST_TOKEN, LOCAL_INJECTOR)
class LocalInjectionTestClass {}

describe('Global Injector with Decorator', () => {
    test('it should inject the injectable for the token', () => {
        const globalInjected = GLOBAL_INJECTOR.get<GlobalInjectionTestClass>(GLOBAL_INJECTION_TEST_TOKEN);
        assert.strictEqual(globalInjected instanceof GlobalInjectionTestClass, true);

        const localInjected = LOCAL_INJECTOR.get<null>(GLOBAL_INJECTION_TEST_TOKEN);
        assert.strictEqual(localInjected, null);
    });
});

describe('Local Injector with Decorator', () => {
    test('it should inject the injectable for the token', () => {
        const localInjected = LOCAL_INJECTOR.get<LocalInjectionTestClass>(LOCAL_INJECTION_TEST_TOKEN);
        assert.strictEqual(localInjected instanceof LocalInjectionTestClass, true);

        const globalInjected = GLOBAL_INJECTOR.get<null>(LOCAL_INJECTION_TEST_TOKEN);
        assert.strictEqual(globalInjected, null);
    });
});
