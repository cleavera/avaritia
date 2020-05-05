import { Token } from '../../classes/token/token';
import { GLOBAL_INJECTOR } from '../../constants/global-injector.constant';

export function Injectable<T>(token: Token<T>): ClassDecorator {
    return (Target: Function): void => {
        GLOBAL_INJECTOR.setFactory(token, () => {
            return new (Target as any)(); // eslint-disable-line @typescript-eslint/no-explicit-any
        });
    };
}
