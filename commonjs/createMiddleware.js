"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = require("xstream");
const delay_1 = require("xstream/extra/delay");
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
        action$.compose(delay_1.default(1))
            .addListener({
            // for each new received action
            // dispatch it
            // Warning : this will result in infinite loops
            // if you just returns the original stream
            next: action => {
                api.dispatch(action);
            },
            error() {
                console.error("Terminal error in middleware " + NAME + "\n", "stream will now close...");
            },
            complete() {
                console.log("middleware " + NAME +
                    "\njust completed...");
            }
        });
        return next => {
            return action => {
                // process firt, store is always up to date
                const returnValue = next(action);
                // if your run function throws
                // synchronously then send the
                // error and close the stream
                try {
                    orignalActionSubject$.shamefullySendNext(action);
                }
                catch (e) {
                    orignalActionSubject$.shamefullySendError(action);
                }
                return returnValue;
            };
        };
    };
}
exports.createMiddleware = createMiddleware;
//# sourceMappingURL=createMiddleware.js.map