import xs from "xstream";
import delay from "xstream/extra/delay";
export function createMiddleware(run, name) {
    if (name === void 0) { name = null; }
    /*
     * Will serve as subkect to dispatch the actions.
     */
    var orignalActionSubject$ = xs.create();
    var NAME = name === null ?
        "UNKNOWN_MIDDLEWARE" :
        name;
    if (typeof run !== "function") {
        throw new TypeError("createMiddleware : first arg must be a function :: Stream<Action> -> Stream<Action>");
    }
    return function (api) {
        var action$ = run.length > 1 ?
            run(orignalActionSubject$, api) :
            run(orignalActionSubject$);
        action$.compose(delay(1))
            .addListener({
            // for each new received action
            // dispatch it
            // Warning : this will result in infinite loops
            // if you just returns the original stream
            next: function (action) {
                api.dispatch(action);
            },
            error: function () {
                console.error("Terminal error in middleware " + NAME + "\n", "stream will now close...");
            },
            complete: function () {
                console.log("middleware " + NAME +
                    "\njust completed...");
            }
        });
        return function (next) {
            return function (action) {
                // if your run function throws
                // synchronously then send the
                // error and close the stream
                try {
                    orignalActionSubject$.shamefullySendNext(action);
                }
                catch (e) {
                    orignalActionSubject$.shamefullySendError(action);
                }
                return next(action);
            };
        };
    };
}
//# sourceMappingURL=createMiddleware.js.map