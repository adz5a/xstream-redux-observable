import { Stream } from "xstream";
import { Middleware, MiddlewareAPI, Action } from "redux";
export declare type Action$ = Stream<Action>;
export interface Run {
    <S>(action$: Stream<Action>, api: MiddlewareAPI<S>): Stream<Action>;
    (action$: Stream<Action>): Stream<Action>;
}
export declare function createMiddleware(run: Run, name?: string | null): Middleware;
