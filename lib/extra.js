export const fold = (stream, reducer, initial) => {
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
export const toArray = (stream) => {
    return fold(stream, (acc, v) => {
        acc.push(v);
        return acc;
    }, []);
};
export const withType = (type) => (data) => {
    return {
        type,
        data
    };
};
export const ofType = (type) => (action) => {
    return type === action.type;
};
//# sourceMappingURL=extra.js.map