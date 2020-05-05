export class Token<T = unknown> {
    public readonly symbol: symbol;

    constructor(obj?: T) {
        this.symbol = Symbol((obj as any)?.constructor?.name ?? 'AvaritiaToken'); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
}
