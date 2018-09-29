import { Stream } from "xstream";
import { Action } from "redux";
export interface Reducer<T, R> {
    (r: R, v: T): R;
}
export declare const fold: <T, R>(stream: Stream<T>, reducer: Reducer<T, R>, initial: R) => Promise<R>;
export declare const toArray: <T>(stream: Stream<T>) => Promise<T[]>;
export declare const withType: <T>(type: string) => (data: T) => {
    type: string;
    data: T;
};
export declare const ofType: <T extends string>(type: T) => (action: Action<any>) => boolean;
