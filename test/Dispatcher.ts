import { expect } from "chai";
import "mocha";
import { SinonSpy, spy } from "sinon";
import { Dispatcher, IDispatcher } from "../src";

// tslint:disable:typedef no-string-literal no-unused-expression

describe(`EventDispatcher`, function() {
    let dispatcher: IDispatcher<any, any>;
    let handler: SinonSpy;
    let thisArg: any;

    interface Message {
        hoi;
    }

    class TestEventDispatcher {
        onMessage: IDispatcher<Message, TestEventDispatcher> = new Dispatcher(this);
    }

    beforeEach(function() {
        handler = spy();
        thisArg = {test: "hallo"};
        dispatcher = new Dispatcher();
    });

    describe(`add()`, function() {
        it(`should add the passed method and thisArg`, function() {
            // Act
            dispatcher.add(handler, thisArg);
            const expected = [{ handler, thisArg }];

            // Assert
            expect(dispatcher["definitions"]).to.be.deep.equal(expected);
        });

        it(`should not add duplicate method and thisArg twice`, function() {
            // Act
            dispatcher.add(handler, thisArg);
            dispatcher.add(handler, thisArg);

            // Assert
            const expected = [{ handler, thisArg }];
            expect(dispatcher["definitions"]).to.be.deep.equal(expected);
        });
    });

    describe(`has()`, function() {
        it(`should return true if listener and thisArg are added before`, function() {
            // Arrange
            dispatcher.add(handler, thisArg);

            // Assert
            expect(dispatcher.has(handler, thisArg)).to.be.true;
        });

        it(`should return false if listener and thisArg are not added before`, function() {
            // Assert
            expect(dispatcher.has(handler, thisArg)).to.be.false;
        });

        it(`should distinguish between different thisArgs`, function() {
            // Arrange
            dispatcher.add(handler, thisArg);

            // Assert
            expect(dispatcher.has(handler, thisArg)).to.be.true;
            expect(dispatcher.has(handler, {})).to.be.false;
        });
    });

    describe(`remove()`, function() {
        it(`should remove passed listener`, function() {
            // Arrange
            dispatcher.add(handler, thisArg);

            // Act
            dispatcher.remove(handler, thisArg);

            // Assert
            expect(dispatcher.has(handler, thisArg)).to.be.false;
        });
    });

    describe(`dispatch()`, function() {
        it(`should call the added method`, function() {
            // Arrange
            dispatcher.add(handler, thisArg);

            // Act
            dispatcher.dispatch({});

            // Assert
            expect(handler.called).to.be.true;
        });

        it(`should use the passed thisArg or the default thisArg as this argument`, function() {
            // Arrange
            const localThis = {};
            dispatcher = new Dispatcher(thisArg);
            dispatcher.add(handler);
            dispatcher.add(handler, localThis);

            // Act
            dispatcher.dispatch({});

            // Assert
            expect(handler.calledTwice).to.be.true;
            expect(handler.firstCall.thisValue).to.be.equal(thisArg);
            expect(handler.secondCall.thisValue).to.be.equal(localThis);
        });

        it(`should pass the passed argument to the listener`, function() {
            // Arrange
            const arg = {};
            dispatcher.add(handler);

            // Act
            dispatcher.dispatch(arg);

            // Assert
            expect(handler.firstCall.args[0]).to.be.equal(arg);
        });
    });

    describe(`clear()`, function() {
        it(`should clear all listeners`, function() {
            // Arrange
            dispatcher.add(handler, {});
            dispatcher.add(handler, {});

            // Act
            dispatcher.clear();
            dispatcher.dispatch({});

            // Assert
            expect(handler.called).to.be.false;
        });
    });
});
