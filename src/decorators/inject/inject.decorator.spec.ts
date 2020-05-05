/* eslint max-classes-per-file: 0 */

import { Expect, Test, TestFixture } from 'alsatian';

import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';
import { Inject } from './inject.decorator';

const TEST_STRING: string = 'Test string';
const TEST_TOKEN: Token<string> = new Token<string>(TEST_STRING);

GLOBAL_INJECTOR.setValue(TEST_TOKEN, TEST_STRING);

class TestClass {
    @Inject(TEST_TOKEN)
    public testProperty!: string;
}

@TestFixture('when injecting with the decorator')
export class InjectDecoratorSpec {
    @Test('it should inject the injectable for the token')
    public inject(): void {
        Expect(new TestClass().testProperty).toBe(TEST_STRING);
    }
}
