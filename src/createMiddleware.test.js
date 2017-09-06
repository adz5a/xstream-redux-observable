import { noop } from "./createMiddleware";


describe("createMiddleware", () => {
    test("should pass", () => {

    });
    test("should not pass", () => {
        throw new Error("not passing here");
    });
});
