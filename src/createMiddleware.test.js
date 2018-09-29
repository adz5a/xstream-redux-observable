import { createMiddleware } from "./createMiddleware";
import { createStore, applyMiddleware } from "redux";
import xs from "xstream";


describe("createMiddleware", () => {

  test("export should be a function", () => {
    expect( typeof createMiddleware === "function" ).toBe(true);
  });

  describe("run function", () => {

    test("should be called exactly once", () => {
      const run = jest.fn(( action$ ) => action$
        .take(1)
        .mapTo({
        type: "noop"
      }));

      const mw = createMiddleware(run);

      const reducer = ( state = [], action ) => [ ...state, action ];
      const store = createStore(reducer, applyMiddleware(mw));
      store.dispatch({ type: "an action" });

      expect(run.mock.calls.length).toBe(1);
    });

    describe("should throw if first arg is not a function", () => {
      [
        {},
        null,
        0,
        undefined,
        true
      ]
        .forEach( testee => test("should throw for " + typeof testee, () => {

          expect(() => createMiddleware(testee)).toThrow(TypeError);

        }))
    });

    describe("should receive second arg only if length > 1", () => {

      function run1 ( action$ ) {
        expect(arguments.length).toBe(1);
        return action$.take(1).mapTo({ type: "noop" });
      }
      function run2 ( action$, api ) {
        expect(arguments.length).toBe(2);
        return action$.take(1).mapTo({ type: "noop" });
      }

      [
        run1,
        run2,
      ].forEach(( run ) => test(run.length + " arg", () => {
        const mw = createMiddleware(run);

        const reducer = ( state = [], action ) => [ ...state, action ];
        const store = createStore(reducer, applyMiddleware(mw));
        store.dispatch({ type: "an action" });


      }));

    });

    test("does not swallow errors at startup", () => {
      const error = { message: "this is an error" };
      const mw = createMiddleware(action$ => {
        throw error;
      });


      const reducer = ( state = [], action ) => [ ...state, action ];


      try {
        const store = createStore(reducer, applyMiddleware(mw));
        store.dispatch({ type: "an action" });
        throw new Error("this should not happen");
      } catch ( e ) {
        expect(e).toBe(error);
      }
    });

    test("redux throws if you do not return an action", () => {
      const expectedAction = {
        type: "replace error"
      };
      const mw = createMiddleware(action$ => action$
        .mapTo({
          noType: "this object is not a valid action"
        }));

      const reducer = ( state = [], action ) => [ ...state, action ];
      const store = createStore(reducer, applyMiddleware(mw));

      expect(() => {
        store.dispatch({
          type: "valid action but invalid transformation"
        });
      })
        .toThrow();
    });

  });

});
