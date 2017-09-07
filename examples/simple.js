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
