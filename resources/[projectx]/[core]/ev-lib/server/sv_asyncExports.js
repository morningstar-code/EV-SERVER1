const AsyncExports = new Proxy(() => { }, {
    get(t, k) {
        const resource = k;

        return new Proxy(
            {},
            {
                get(t, k) {
                    return (...args) => {
                        return new Promise((resolve, reject) => {
                            let cb = (err, data) => {
                                if (err) reject(err);
                                else resolve(data);
                            };
                            exports[resource][k].apply(void 0, [cb, ...args]);
                        });
                    };
                },

                set() {
                    throw new Error("cannot set values on an export resource");
                },
            }
        );
    },

    apply(t, self, args) {
        if (args.length !== 2) {
            throw new Error("this needs 2 arguments");
        }

        const [exportName, func] = args;

        exports(exportName, (cb, ...args) => {
            if (typeof cb !== "function")
                throw Error("async export called without callback first");
            let promise = func.apply(void 0, args);
            if (!(promise instanceof Promise)) promise = Promise.resolve(promise);
            promise.then((r) => cb(null, r)).catch((err) => cb(err, null));
        });
    },

    set() {
        throw new Error("cannot set values on exports");
    },
});