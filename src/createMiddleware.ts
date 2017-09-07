import xs, {
    Stream
} from "xstream";
import delay from "xstream/extra/delay";
import {
    Middleware,
    MiddlewareAPI,
    Store,
    Action
} from "redux";

export type Action$ = Stream<Action>;

export interface Run {
    <S> ( action$: Stream<Action>, api: MiddlewareAPI<S> ): Stream<Action>
    <S> ( action$: Stream<Action> ): Stream<Action>
}
export function createMiddleware ( run: Run, name: string | null = null ): Middleware {


    const orignalActionSubject$ = xs.create() as Stream<Action>;

    const NAME = name === null ?
        "UNKNOWN_MIDDLEWARE":
        name;

    if ( typeof run !== "function" ) {
        throw new TypeError("createMiddleware : first arg must be a function :: Stream<Action> -> Stream<Action>");
    }


    return <S>( api: MiddlewareAPI<S> ) =>  {


        const action$ = run.length > 1 ?
            run(orignalActionSubject$, api):
            run(orignalActionSubject$);



        action$.compose(delay(1))
            .addListener({
                // for each new received action
                // dispatch it
                // Warning : this will result in infinite loops
                // if you just returns the original stream
                next: action => {
                    console.log(action);
                    api.dispatch(action);
                },
                error () {
                    console.error(
                        "Terminal error in middleware " + NAME +
                        "\n, stream will now close..."
                    );
                },
                complete () {
                    console.log(
                        "middleware " + NAME +
                        "\njust completed..."
                    );
                }
            });


        return next => {

            return action => {

                // if your run function throws
                // synchronously then send the
                // error and close the stream
                try {
                    orignalActionSubject$.shamefullySendNext(action);
                } catch ( e ) {
                    orignalActionSubject$.shamefullySendError(action);
                }

                return next(action);

            };

        }

    };



}
