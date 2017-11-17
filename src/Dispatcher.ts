export type Handler<TEvent, TThis> = (this: TThis, event: TEvent) => void;

type ListenerDefinition<TEvent, TThis> = {
    thisArg: any;
    handler: Handler<TEvent, TThis>;
};

export interface IDispatcher<TEvent, TThis> {
    dispatch(event: TEvent): void;

    add(handler: Handler<TEvent, TThis>): boolean;
    add<TMethod>(handler: Handler<TEvent, TMethod>, thisArg: TMethod): boolean;

    has(handler: Handler<TEvent, TThis>): boolean;
    has<TMethod>(handler: Handler<TEvent, TMethod>, thisArg: TMethod): boolean;

    remove(handler: Handler<TEvent, TThis>): boolean;
    remove<TMethod>(handler: Handler<TEvent, TMethod>, thisArg: TMethod): boolean;

    clear(): void;
}

export class Dispatcher<TEvent, TThis> implements IDispatcher<TEvent, TThis> {
    private readonly definitions: Array<ListenerDefinition<TEvent, TThis>> = [];

    constructor(private readonly thisArg?: TThis) { }

    dispatch(event: TEvent): void {
        this.definitions.forEach(
            (def) => def.handler.call(def.thisArg || this.thisArg, event),
        );
    }

    add(handler: Handler<TEvent, TThis>, thisArg?: any): boolean {
        if (this._getIndex(handler, thisArg) >= 0) {
            return false;
        }

        this.definitions.push({ handler, thisArg });

        return true;
    }

    has(handler: Handler<TEvent, TThis>, thisArg?: any): boolean {
        return this._getIndex(handler, thisArg) >= 0;
    }

    remove(handler: Handler<TEvent, TThis>, thisArg?: any): boolean {
        const idx = this._getIndex(handler, thisArg);
        if (idx < 0) {
            return false;
        }

        this.definitions.splice(idx, 1);

        return true;
    }

    clear(): void {
        this.definitions.length = 0;
    }

    private _getIndex(listener: Handler<TEvent, TThis>, thisArg?: any): number {
        for (let i = 0; i < this.definitions.length; i++) {
            const def = this.definitions[i];
            if (def.handler === listener && def.thisArg === thisArg) {
                return i;
            }
        }

        return -1;
    }
}
