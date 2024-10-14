import { Injector } from '../../classes/injector/injector';
import { Token } from '../../classes/token/token';

export function Injectable<T>(token: Token<T>, injector: Injector): ClassDecorator {
    return (Target: Function): void => {
        injector.setFactory(token, () => {
            return new (Target as any)();
        });
    };
}
