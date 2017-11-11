import { Stream } from "xstream";
export interface Reducer<T, R> {
    (r: R, v: T): R;
}
export declare const fold: <T, R>(stream: Stream<T>, reducer: Reducer<T, R>, initial: R) => Promise<R>;
export declare const toArray: <T>(stream: Stream<T>) => Promise<T[]>;
export declare const withType: <T>(type: string) => (data: T) => {
    type: string;
    data: T;
};
export interface Action {
    type: string;
    data: any;
}
export declare const ofType: (type: string) => (action: Action) => boolean;
