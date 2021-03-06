"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
function createMiddleware(run, name = null) {
    /*
     * Will serve as subkect to dispatch the actions.
     */
    const orignalActionSubject$ = xstream_1.default.create();
    const NAME = name === null ?
        "UNKNOWN_MIDDLEWARE" :
        name;
    if (typeof run !== "function") {
        throw new TypeError("createMiddleware : first arg must be a function :: Stream<Action> -> Stream<Action>");
    }
    return (api) => {
        const action$ = run.length > 1 ?
            run(orignalActionSubject$, api) :
            run(orignalActionSubject$);
        action$
            .addListener({
            // for each new received action
            // dispatch it
            // Warning : this will result in infinite loops
            // if you just returns the original stream
            next: action => {
                api.dispatch(action);
            },
            error(e) {
                console.error(e);
                console.error("Terminal error in middleware " + NAME + "\n", "stream will now close...");
            },
            complete() {
                console.log("middleware " + NAME +
                    "\njust completed...");
            }
        });
        return next => {
            return action => {
                // process firt, store is always up to date,
                // so using the `getState` function of the API
                // is up to date.
                const returnValue = next(action);
                orignalActionSubject$.shamefullySendNext(action);
                return returnValue;
            };
        };
    };
}
exports.createMiddleware = createMiddleware;
//# sourceMappingURL=createMiddleware.js.map