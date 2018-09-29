"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = (stream, reducer, initial) => {
    return new Promise((resolve, reject) => {
        stream
            .fold(reducer, initial)
            .last()
            .addListener({
            error(error) {
                reject(error);
            },
            next(value) {
                resolve(value);
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