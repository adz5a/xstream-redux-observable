import { Stream } from "xstream";
import { Action } from "redux";


export interface Reducer<T, R>{
  (r: R, v: T): R;
}
export const fold = <T, R>( stream: Stream<T>, reducer: Reducer<T, R>, initial: R ): Promise<R> => {
  return new Promise(( resolve, reject ) => {

    let accumulator: R = initial;

    stream.addListener({
      complete () {
        resolve(accumulator);
      },
      error ( error ) {
        reject (error);
      },
      next ( value ) {
        accumulator = reducer(accumulator, value);
      }
    });

  });
};

export const toArray = <T>( stream: Stream<T> ): Promise<T[]> => {
  return fold(stream, (acc: T[], v: T) => {
    acc.push(v);
    return acc;
  }, []);
};


export const withType = <T>( type: string ) => ( data: T ) => {
  return {
    type,
    data
  };
};

export const ofType = <T extends string>( type: T ) => ( action: Action ) => {
  return type === action.type;
};
