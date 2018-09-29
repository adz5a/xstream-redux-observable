import { Stream } from "xstream";
import { Middleware, MiddlewareAPI, Action, Dispatch } from "redux";
export declare type Action$ = Stream<Action>;
export interface Run {
    <D extends Dispatch = Dispatch, S = any>(action$: Stream<Action>, api: MiddlewareAPI<D, S>): Stream<Action>;
    (action$: Stream<Action>): Stream<Action>;
}
export declare function createMiddleware(run: Run, name?: string | null): Middleware;
