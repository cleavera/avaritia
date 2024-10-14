import { Expect, Test, TestFixture } from 'alsatian';

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

@TestFixture('when injecting with the decorator using the global injector')
export class GlobalInjectDecoratorSpec {
    @Test('it should inject the injectable for the token')
    public inject(): void {
        Expect(GLOBAL_INJECTOR.get<GlobalInjectionTestClass>(GLOBAL_INJECTION_TEST_TOKEN) instanceof GlobalInjectionTestClass).toBe(true);
        Expect(LOCAL_INJECTOR.get<null>(GLOBAL_INJECTION_TEST_TOKEN)).toBe(null);
    }
}

@TestFixture('when injecting with the decorator using a local injector')
export class LocalInjectDecoratorSpec {
    @Test('it should inject the injectable for the token')
    public inject(): void {
        Expect(LOCAL_INJECTOR.get<LocalInjectionTestClass>(LOCAL_INJECTION_TEST_TOKEN) instanceof LocalInjectionTestClass).toBe(true);
        Expect(GLOBAL_INJECTOR.get<null>(LOCAL_INJECTION_TEST_TOKEN)).toBe(null);
    }
}
