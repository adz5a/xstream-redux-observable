# xstream-redux-observable


This package is inspired by *redux-observable*. It provides a factory function
to create redux middleware.

This package is written in *Typescript* and uses *xstream* instead of Rx (
redux-obserable ).

The main reason for choosing xstream over RxJS or Most.js is it's simplicity : 
- it targets UI use cases
- is used in *cycle js* so lots of examples
- hot obserables by default, removing lots of cause of errors. Moreover for many
  use cases you want hot observables anyway.


*Note* : this package does not have any dependencies. It has redux & xstream as
peerDependencies with specific version number.


## Documentation


The api is pretty simple, it consists in one function : 

```javascript
import { createMiddleware } from "xstream-redux-obserable";


/*
 * this middleware receives a stream of actions. For each action it returns a 
 * "noop" action.
 * It does not "transform" the original action but merely dispatches another
 */
export const simpleMiddleware = createMiddleware(( action$ ) => {
    return action$.mapTo({ type: "noop" });
});


/*
 * when the function passed as argument specifies more than one arg then it 
 * receives the MiddlewareAPI that redux passes to each middleware. In this
 * example for each action dispatched another is emitted with the current
 * observable state.
 *
 */
export const moreAdvancedMiddleware = createMiddleware(( action$, api ) => {

    return action$.mapTo({
        type: "currentState",
        data: api.getState()
    });

});
```

## Signatures 

```
*createMiddleware* :: Run -> Middleware



*Run* :: ( action$: Stream<Action> ) -> Stream<Action>
*Run* :: <S>( action$: Stream<Action>, api: MiddlewareAPI<S> ) -> Stream<Action>
```
