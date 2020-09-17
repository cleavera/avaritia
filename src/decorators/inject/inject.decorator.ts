import { Maybe } from '@cleavera/types';

import { Injector } from '../../classes/injector/injector';
import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';

export function Inject<T>(token: Token<T>, injector: Injector = GLOBAL_INJECTOR): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        Object.defineProperty(target, propertyKey, {
            get(): Maybe<T> {
                return injector.get(token);
            }
        });
    };
}
