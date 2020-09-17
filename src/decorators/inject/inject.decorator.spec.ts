/* eslint max-classes-per-file: 0 */

import { Expect, Test, TestFixture } from 'alsatian';

import { Injector } from '../../classes/injector/injector';
import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';
import { Inject } from './inject.decorator';

const GLOBAL_INJECTOR_TEST_STRING: string = 'Global injector test string';
const GLOBAL_INJECTOR_TEST_TOKEN: Token<string> = new Token<string>(GLOBAL_INJECTOR_TEST_STRING);

GLOBAL_INJECTOR.setValue(GLOBAL_INJECTOR_TEST_TOKEN, GLOBAL_INJECTOR_TEST_STRING);

const LOCAL_INJECTOR: Injector = new Injector();
const LOCAL_INJECTOR_TEST_STRING: string = 'Global injector test string';
const LOCAL_INJECTOR_TEST_TOKEN: Token<string> = new Token<string>(LOCAL_INJECTOR_TEST_STRING);

LOCAL_INJECTOR.setValue(LOCAL_INJECTOR_TEST_TOKEN, LOCAL_INJECTOR_TEST_STRING);

class GlobalInjectorTestClass {
    @Inject(GLOBAL_INJECTOR_TEST_TOKEN)
    public globalInGlobalTestProperty!: string;

    @Inject(GLOBAL_INJECTOR_TEST_TOKEN, LOCAL_INJECTOR)
    public globalInLocalTestProperty!: null;

    @Inject(LOCAL_INJECTOR_TEST_TOKEN)
    public localInGlobalTestProperty!: null;
}

class LocalInjectorTestClass {
    @Inject(LOCAL_INJECTOR_TEST_TOKEN, LOCAL_INJECTOR)
    public localInLocalTestProperty!: string;

    @Inject(GLOBAL_INJECTOR_TEST_TOKEN, LOCAL_INJECTOR)
    public globalInLocalTestProperty!: null;

    @Inject(LOCAL_INJECTOR_TEST_TOKEN)
    public localInGlobalTestProperty!: null;
}

@TestFixture('when injecting with the decorator using the global injector')
export class GlobalInjectDecoratorSpec {
    @Test('it should inject the injectable for the token')
    public inject(): void {
        const testClass: GlobalInjectorTestClass = new GlobalInjectorTestClass();
        Expect(testClass.globalInGlobalTestProperty).toBe(GLOBAL_INJECTOR_TEST_STRING);
        Expect(testClass.globalInLocalTestProperty).toBe(null);
        Expect(testClass.localInGlobalTestProperty).toBe(null);
    }
}

@TestFixture('when injecting with the decorator using the local injector')
export class LocalInjectDecoratorSpec {
    @Test('it should inject the injectable for the token')
    public inject(): void {
        const testClass: LocalInjectorTestClass = new LocalInjectorTestClass();
        Expect(testClass.localInLocalTestProperty).toBe(LOCAL_INJECTOR_TEST_STRING);
        Expect(testClass.globalInLocalTestProperty).toBe(null);
        Expect(testClass.localInGlobalTestProperty).toBe(null);
    }
}
