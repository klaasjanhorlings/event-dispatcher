"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dispatcher {
    constructor(thisArg) {
        this.thisArg = thisArg;
        this.definitions = [];
    }
    dispatch(event) {
        this.definitions.forEach((def) => def.handler.call(def.thisArg || this.thisArg, event));
    }
    add(handler, thisArg) {
        if (this._getIndex(handler, thisArg) >= 0) {
            return false;
        }
        this.definitions.push({ handler, thisArg });
        return true;
    }
    has(handler, thisArg) {
        return this._getIndex(handler, thisArg) >= 0;
    }
    remove(handler, thisArg) {
        const idx = this._getIndex(handler, thisArg);
        if (idx < 0) {
            return false;
        }
        this.definitions.splice(idx, 1);
        return true;
    }
    clear() {
        this.definitions.length = 0;
    }
    _getIndex(listener, thisArg) {
        for (let i = 0; i < this.definitions.length; i++) {
            const def = this.definitions[i];
            if (def.handler === listener && def.thisArg === thisArg) {
                return i;
            }
        }
        return -1;
    }
}
exports.Dispatcher = Dispatcher;
