export const fold = (stream, reducer, initial) => {
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