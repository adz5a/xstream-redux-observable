export var fold = function (stream, reducer, initial) {
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
export var toArray = function (stream) {
    return fold(stream, function (acc, v) {
        acc.push(v);
        return acc;
    }, []);
};
export var withType = function (type) { return function (data) {
    return {
        type: type,
        data: data
    };
}; };
export var ofType = function (type) { return function (action) {
    return type === action.type;
}; };
//# sourceMappingURL=extra.js.map