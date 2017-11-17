export declare type Handler<TEvent, TThis> = (this: TThis, event: TEvent) => void;
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
export declare class Dispatcher<TEvent, TThis> implements IDispatcher<TEvent, TThis> {
    private readonly thisArg;
    private readonly definitions;
    constructor(thisArg?: TThis | undefined);
    dispatch(event: TEvent): void;
    add(handler: Handler<TEvent, TThis>, thisArg?: any): boolean;
    has(handler: Handler<TEvent, TThis>, thisArg?: any): boolean;
    remove(handler: Handler<TEvent, TThis>, thisArg?: any): boolean;
    clear(): void;
    private _getIndex(listener, thisArg?);
}
