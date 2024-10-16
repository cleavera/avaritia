# Avaritia

Avaritia is a lightweight DI framework for dependency injection.

## Quickstart

Create an injector and then use the Injectable decorator to register classes, call injector.get(TOKEN) to then inject the dependencies

```typescript
import { Injector } from 'avaritia';

const INJECTOR: Injector = new Injector();

import { Token } from 'avaritia'; 

const LOGGER: Token = new Token();

import { Injectable } from 'avaritia';

@Injectable(LOGGER, INJECTOR)
class ConsoleLogger implements ILogger {
    public log(message: string): void {
        console.log(message);
    }
}

class Counter {
    private _count: number = 0;

    private _logger!: ILogger = INJECTOR.get(LOGGER);

    public count() {
        this._count++;
        this._logger.log(`New count ${this._count} `);
    }
}
```

## Why dependency injection

Dependency injection is a pattern whereby you separate a class from it dependencies, instead of a class depending directly on a concrete implementation of a class it can instead rely on an abstract, something else is then responsible for interpreting that abstract and giving the class a concrete implementation to use - this is where Avaritia comes in. Apart from the more vague benefits of generally decopuling your code it enables mocking when unit testing, as your code is reliant only on abstract concepts you can provide mocks to fill these concepts which allows you to avoid unwanted side effects when testing your unit and avoid coupling your tests for one component to the implementation of another.

### Example

Lets go through a classic logger example.

```typescript
class Logger {
    public static log(message: string): void {
        console.log(message);
    }
}

class Counter {
    private _count: number = 0;

    public count() {
        this._count++;
        Logger.log(`New count ${this._count} `);
    }
}
```

This example works fine, but lets say you scaled this up so you had thousands of places logging code. Now lets say that you want to start logging to the file system rather than the console, let also say that your file system logger now takes an argument for the file path, with the above code you would have to potentially refactor thousands of lines of code for a small change.

```typescript
class ConsoleLogger implements ILogger {
    public log(message: string): void {
        console.log(message);
    }
}

class FSLogger implements ILogger {
    // ...
    public log(message: string): void {
        fs.write(this.filename, message);
    }
}

import { Injector, Token } from 'avaritia';

const LOGGER_TOKEN: Token<ILogger> = new Token<ILogger>();
const INJECTOR: Injector = new Injector();

INJECTOR.set(LOGGER_TOKEN, new ConsoleLogger());

class Counter {
    private _count: number = 0;
    private _logger: ILogger;

    constructor() {
        this._logger = INJECTOR.get(LOGGER_TOKEN);
    }

    public count() {
        this._count++;
        this._logger.log(`New count ${this._count} `);
    }
}
```
