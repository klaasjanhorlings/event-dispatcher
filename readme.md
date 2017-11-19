# EventDispatcher

## Why EventDispatcher
*Todo*

## Changelog
*Todo*

## Examples
```Javascript
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
```