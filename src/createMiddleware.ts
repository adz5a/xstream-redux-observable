import xs, {
  Stream
} from "xstream";
import delay from "xstream/extra/delay";
import {
  Middleware,
  MiddlewareAPI,
  Store,
  Action,
  Dispatch
} from "redux";

export type Action$ = Stream<Action>;

export interface Run {
  <D extends Dispatch = Dispatch, S = any> ( action$: Stream<Action>, api: MiddlewareAPI<D, S> ): Stream<Action>
    ( action$: Stream<Action> ): Stream<Action>
}
export function createMiddleware ( run: Run, name: string | null = null ): Middleware {
  /*
   * Will serve as subkect to dispatch the actions.
   */
  const orignalActionSubject$ = xs.create() as Stream<Action>;

  const NAME = name === null ?
    "UNKNOWN_MIDDLEWARE":
    name;

  if ( typeof run !== "function" ) {
    throw new TypeError("createMiddleware : first arg must be a function :: Stream<Action> -> Stream<Action>");
  }

  return <S>( api: MiddlewareAPI<Dispatch, S> ) =>  {

    const action$ = run.length > 1 ?
      run(orignalActionSubject$, api):
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
        error (e) {
          console.error(e);
          console.error(
            "Terminal error in middleware " + NAME + "\n",
            "stream will now close..."
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

        // process firt, store is always up to date,
        // so using the `getState` function of the API
        // is up to date.
        const returnValue = next(action);
        orignalActionSubject$.shamefullySendNext(action);

        return returnValue;

      };

    }

  };



}
