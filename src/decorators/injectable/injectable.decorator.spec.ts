// tslint:disable max-classes-per-file

import { Expect, Test, TestFixture } from 'alsatian';
import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';
import { Injectable } from './injectable.decorator';

const TEST_TOKEN: Token = new Token();

@Injectable(TEST_TOKEN)
class TestClass {}

@TestFixture('when injecting with the decorator')
export class InjectDecoratorSpec {
    @Test('it should inject the injectable for the token')
    public inject(): void {
        Expect(GLOBAL_INJECTOR.get<TestClass>(TEST_TOKEN) instanceof TestClass).toBe(true);
    }
}
