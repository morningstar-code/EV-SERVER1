(() => {
    'use strict';
    var globalList = {};
    (() => {
        globalList.d = (_0x41d5cf, _0x13fc28) => {
            for (var _0x508bfc in _0x13fc28) {
                if (globalList.o(_0x13fc28, _0x508bfc) && !globalList.o(_0x41d5cf, _0x508bfc)) {
                    Object.defineProperty(_0x41d5cf, _0x508bfc, {
                        enumerable: true,
                        get: _0x13fc28[_0x508bfc]
                    });
                }
            }
        };
    })();
    (() => {
        globalList.g = (function () {
            if (typeof globalThis === "object") {
                return globalThis;
            }
            try {
                return this || new Function("return this")();
            } catch (_0x3b8855) {
                if (typeof window === "object") {
                    return window;
                }
            }
        })();
    })();
    (() => {
        globalList.o = (_0x4d919f, _0xe37928) => Object.prototype.hasOwnProperty.call(_0x4d919f, _0xe37928);
    })();
    (() => {
        globalList.r = _0x1f3431 => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(_0x1f3431, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(_0x1f3431, "__esModule", {
                value: true
            });
        };
    });

    // CPX.Procedures.register("ev-mechanics:server:clockIn", async (src, pBiz) => {
    //     let cid = exports["ev-lib"].getCharacter(src).id
    //     let isEmployed = exports["ev-business"].IsEmployedAt(src, cid, pBiz)
    //     if (isEmployed) {
    //         CPX.Events.emitNet("ev-mechanics:client:clockedInState", true)
    //         return true, "You Clocked in"
    //     }
    // })

    // CPX.Procedures.register("ev-mechanics:server:clockOut", async (src, pBiz) => {
    //     let cid = exports["ev-lib"].getCharacter(src).id
    //     let isEmployed = exports["ev-business"].IsEmployedAt(src, cid, pBiz)
    //     if (isEmployed) {
    //         CPX.Events.emitNet("ev-mechanics:client:clockedInState", false)
    //         return false, "You Clocked out"
    //     }
    // })

    // CPX.Procedures.register("ev-mechanics:server:viewClockedIn", async (src, pBiz) => {

    // })
    const clockedIn = []

    // RPC.register("ev-mechanics:server:clockIn", async(tmep, pBiz) => {
    //     console.log(pBiz)
    //     let src = source
    //     let cid = exports["ev-lib"].getCharacter(src).id
    //     let isEmployed = exports["ev-business"].IsEmployedAt(src, cid, pBiz)
    //     if (isEmployed) {
    //         CPX.Events.emitNet("ev-mechanics:client:clockedInState", true)
    //         return true, "You Clocked in"
    //     }
    // })

    RPC.register("ev-mechanics:server:clockOut", async(pSource,pBiz) => {
        let src = source
        let cid = exports["ev-lib"].getCharacter(src).id
        let isEmployed = exports["ev-business"].IsEmployedAt(src, cid, pBiz)
        if (isEmployed) {
            CPX.Events.emitNet("ev-mechanics:client:clockedInState", false)
            return false, "You Clocked out"
        }
    })

    RPC.register("ev-mechanics:server:viewClockedIn", async (pSource,pBiz) => {
        let src = source
        let cid = exports["ev-lib"].getCharacter(src).id
        let isEmployed = exports["ev-business"].IsEmployedAt(src, cid, pBiz)
        if (isEmployed) {
            return false, "You Clocked out"
        }
    })

});

RPC.register("ev-mechanics:server:clockIn", async(pSource,pBiz) => {
    let src = source
    let cid = exports["ev-lib"].getCharacter(src).id
    let isEmployed = exports["ev-business"].IsEmployedAt(src, cid, pBiz)
    if (isEmployed) {
        CPX.Events.emitNet("ev-mechanics:client:clockedInState", true)
        return true, "You Clocked in"
    }
    
    return false, "You're not employed yet"
})

RPC.register("ev-jobs:bennys:createOrder", async(pSource,data) => {
    let src = source
    let cid = exports["ev-lib"].getCharacter(src).id
    let metadata = {
        orderId : data.orderId,
        model: data.vehicle,
        buyer: cid,
        rating: data.rating,
        details : data.details,
        _hideKeys: ["buyer", "rating", "details"]
    }
    emitNet('player:receiveItem', src, "bennysorder", 1, false, [], metadata)
})

RPC.register("ev-jobs:bennys:getPartsMenuData", async(pSource,data) => {
    let src = source

    return
})