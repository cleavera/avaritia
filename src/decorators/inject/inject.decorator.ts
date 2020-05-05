import { Maybe } from '@cleavera/types';

import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';

export function Inject<T>(token: Token<T>): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        Object.defineProperty(target, propertyKey, {
            get(): Maybe<T> {
                return GLOBAL_INJECTOR.get(token);
            }
        });
    };
}
