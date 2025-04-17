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
    })();

    CPX.Procedures.register("ev-oilers:stations:getPurchasedFuel", async(src, data1, data2) => {
        console.log(data1, data2)
    })

    CPX.Procedures.register("ev-oilers:storage:withdrawOil", async(src, pVeh, pData, data3) => {
        console.log(data1, data2, data3)
    })

    CPX.Procedures.register("ev-oilers:storage:returnBarrel", async(src, data1) => {
        console.log(data1)
    })

    CPX.Procedures.register("ev-oilers:storage:returnTanker", async(src, data1) => {
        console.log(data1)
    })

    CPX.Procedures.register("ev-oilers:getStorageInfo", async(src, cid) => {
        // crudeOil
        // regularGas
        // regularGas
    })

    CPX.Procedures.register("ev-oilers:createPump", async(src, data1) => {
        console.log(data1)
        // should return true, data
    })

    CPX.Procedures.register("ev-oilers:pumpToStorage", async(src, data1) => {
        console.log(data1)
        // should return true, data
    })

    CPX.Procedures.register("ev-oilers:assignPump", async(src, data1, cid) => {
        console.log(data1)
        // should return true, data
    })

    CPX.Procedures.register("ev-oilers:viewWeeklyReport", async(src, data1) => {
        console.log(data1)
        // should return true, data1, data2
    })

    CPX.Procedures.register("ev-oilers:applyPumpParts", async(src, data1) => {
        console.log(data1)
        // should return true, data1
    })

    CPX.Procedures.register("ev-oilers:getPumpInfo", async(src, pId) => {
        console.log(data1)
        // should return object data
    })

    CPX.Procedures.register("ev-oilers:updatePumpInfo", async(src, data1, data2) => {
        console.log(data1, data2)
        // should return object data
    })

    CPX.Procedures.register("ev-oilers:getBlenderInfo", async(src, data1) => {
        console.log(data1)
        // should return Blender state
    })

    CPX.Procedures.register("ev-oilers:getDistillationInfo", async(src, data1) => {
        console.log(data1)
        // should return Blender state
    })

    CPX.Procedures.register("ev-oilers:startBlending", async(src, data1, data2) => {
        console.log(data1, data2)
        // should return state, data
    })

    CPX.Procedures.register("ev-oilers:getStationBusiness", async(src, pStation) => {
        const info = await SQL.execute(
            'SELECT * FROM gas_stations WHERE `id` = @id',
            { id: pStation }
        )
        return info[0]
    })

    CPX.Procedures.register("ev-oilers:stations:completeBill", async(src, data1, data2) => {
        console.log(data1)
        // should return data
    })

    CPX.Procedures.register("ev-oilers:stations:getPurchasedFuel", async(src, data1, data2) => {
        console.log(data1)
        // should return number
    })

    CPX.Procedures.register("ev-oilers:stations:sendBill", async(src, pStation, pId, pCid, pAmount, pNetId, pType) => {
        console.log(data1)
        // should return number
    })

    CPX.Procedures.register("ev-oilers:stations:completeRefueling", async(src, pStation, pNetID, pAmount) => {
        console.log(data1)
        // should return number
    })

    CPX.Procedures.register("ev-oilers:stations:setPumpAccess", async(src, pStation, pId, pAccess) => {
        console.log(data1)
        // should return number
    })

    CPX.Procedures.register("ev-oilers:stations:changeFuelPrice", async(src, pStation, pId, pPrice) => {
        console.log(data1)

        // should return state, new price
    })

    CPX.Procedures.register("ev-oilers:stations:purgeTank", async(src, pStation, pId) => {

        // should return state, new data
    })

    CPX.Procedures.register("ev-oilers:stations:updateTankerFuel", async(src, pNetId, data) => {

        // should return state, new data
    })

    CPX.Procedures.register("ev-oilers:stations:refillTank", async(src, pStation, pId, pData, pAmount) => {

        // should return state, new data
    })

})();
