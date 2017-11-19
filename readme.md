# EventDispatcher

## Why EventDispatcher
*Todo*

## Changelog
1.0.0 Initial version

## Api docs
### constructor()
```typescript
constructor<TEvent, TThis>(thisArg?: TThis)
```
Returns a new Dispatcher object. If a thisArg argument is provided it will be used as **this** object on all subsequent dispatch calls, unless the listener has been added with it's own thisArg. 

### dispatch()
```typescript
dispatch(): void;
dispatch(event: TEvent): void;
```
Calls all added listeners, in the order they are added. All arguments provided to the dispatch method will be passed to the listener methods.

### add()
```typescript
add(handler: (this: TThis, event: TEvent) => void): boolean;
add<TMethod>(handler: (this: TThis, event: TEvent) => void, thisArg: TMethod): boolean;
```
Adds a new listener. The thisArg is provided it will be used as **this** object when the listener is dispatched instead of the default **this** object if set. If there are any listeners registered matching the listener and this object this method will do nothing and return false.

### has()
```typescript
has(handler: (this: TThis, event: TEvent) => void): boolean;
has<TMethod>(handler: (this: TThis, event: TEvent) => void, thisArg: TMethod): boolean;
```
Returns true if there are any listeners registered matching the listener and this object.

### remove()
```typescript
remove(handler: (this: TThis, event: TEvent) => void): boolean;
remove<TMethod>(handler: (this: TThis, event: TEvent) => void, thisArg: TMethod): boolean;
```
Remove any listeners registered matching the listener and this object. Returns true if any listeners were removed, false otherwise.

### clear()
```typescript
clear(): void;
```
Clears all set listeners.

## Examples
```typescript
import { IDispatcher, Dispatcher } from "eventdispatcher";

type ExampleEvent {
    message: string;
}

interface IExample {
    onExample: IDispatcher<ExampleEvent, IExample>;
}

class Example implements IExample {
    onExample = new Dispatcher(this);

    dispatchExample() {
        this.onExample.distach({ message: "Hallo!" });
    }
}

const e = new Example();
e.onExample.add((e) => console.log(e.message));
e.dispatchExample();
```