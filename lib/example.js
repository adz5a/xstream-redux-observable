import { createStore, applyMiddleware } from "redux";
import { createMiddleware } from "./createMiddleware";
const reducer = (state = [], action) => {
    return [...state, action];
};
const noop = (action$) => action$.mapTo({ type: "noop" });
const middleware = createMiddleware(noop);
export const store = createStore(reducer, applyMiddleware(middleware));
//# sourceMappingURL=example.js.map