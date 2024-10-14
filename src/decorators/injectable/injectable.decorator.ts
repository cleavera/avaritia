import { Injector } from '../../classes/injector/injector';
import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';

export function Injectable<T>(token: Token<T>, injector: Injector = GLOBAL_INJECTOR): ClassDecorator {
    return (Target: Function): void => {
        injector.setFactory(token, () => {
            return new (Target as any)();
        });
    };
}
