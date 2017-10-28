"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = (stream, reducer, initial) => {
    return new Promise((resolve, reject) => {
        let accumulator = initial;
        stream.addListener({
            complete() {
                resolve(accumulator);
            },
            error(error) {
                reject(error);
            },
            next(value) {
                accumulator = reducer(accumulator, value);
            }
        });
    });
};
exports.toArray = (stream) => {
    return exports.fold(stream, (acc, v) => {
        acc.push(v);
        return acc;
    }, []);
};
exports.withType = (type) => (data) => {
    return {
        type,
        data
    };
};
exports.ofType = (type) => (action) => {
    return type === action.type;
};
//# sourceMappingURL=extra.js.map