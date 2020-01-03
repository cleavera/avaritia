export class Token<T> {
    public readonly symbol: symbol;

    constructor(obj: T) {
        this.symbol = Symbol((obj as any)?.constructor?.name || 'AvaritiaToken'); // tslint:disable-line no-any
    }
}
