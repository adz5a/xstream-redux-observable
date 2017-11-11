"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fold = function (stream, reducer, initial) {
    return new Promise(function (resolve, reject) {
        var accumulator = initial;
        stream.addListener({
            complete: function () {
                resolve(accumulator);
            },
            error: function (error) {
                reject(error);
            },
            next: function (value) {
                accumulator = reducer(accumulator, value);
            }
        });
    });
};
exports.toArray = function (stream) {
    return exports.fold(stream, function (acc, v) {
        acc.push(v);
        return acc;
    }, []);
};
exports.withType = function (type) { return function (data) {
    return {
        type: type,
        data: data
    };
}; };
exports.ofType = function (type) { return function (action) {
    return type === action.type;
}; };
//# sourceMappingURL=extra.js.map