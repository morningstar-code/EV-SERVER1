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
    // done
    CPX.Procedures.register("ev-hoimports:ClockedIn", async(src) => {
        let cid = exports["ev-lib"].getCharacter(src).id
        let canUse = exports["ev-business"].IsEmployedAt(src, cid, "digital_den")
        if (canUse) {
            return true
        } else {
            return false
        }
    })
    // done
    CPX.Procedures.register("ev-hoimports:ClockedOut", async(src) => {
        return false
    })
    // done
    CPX.Procedures.register("ev-hoimports:GiveGNE", async(src, pAmount, pCid) => {
        if (exports["ev-phone"].addCrypto(src, pCid, pAmount, 1)) {
            return true
        } else {
            return false
        }
    })
    // done
    CPX.Procedures.register("ev-hoimports:ChargeGNE", async(src, pAmount) => {
        let cid = exports["ev-lib"].getCharacter(src).id
        let temp = {
            success : false,
            message : "not enough GNE",
        }

        if (exports["ev-phone"].takeCrypto(src, cid, pAmount, 1)) {
            temp.success = true
            return temp
        }
        return temp
    })

    CPX.Procedures.register("ev-hoimports:DeliverSticks", async(src) => {

    })

    CPX.Procedures.register("ev-hoimports:PickupOrder", async(src) => {

    })

    CPX.Procedures.register("ev-hoimports:ClaimEarnedTax", async(src) => {

    })

    CPX.Procedures.register("ev-hoimports:CreateOrder", async(src, pCart) => {

    })

    CPX.Procedures.register("ev-hoimports:GetCurrentStock", async(src) => {

    })

    CPX.Procedures.register("ev-hoimports:ApplyCurrentUpgrades", async(src, pNetId, pVin) => {

    })
    // done
    CPX.Procedures.register("ev-hoimports:RepairVehicleDeg", async(src, pNetId) => {
        let veh = NetworkGetEntityFromNetworkId(pNetId)
        exports["ev-vehicles"].FixVehicleDegredation(veh)
        return true
    })

    CPX.Procedures.register("ev-hoimports:CrushVehicle", async(src, pNetId) => {

    })

    CPX.Procedures.register("ev-hoimports:ConvertVehicle", async(src, pNetId, pHandling) => {

    })

    CPX.Procedures.register("ev-hoimports:ClaimRentalProfit", async(src) => {

    })

    CPX.Procedures.register("ev-hoimports:CreateListing", async(src, pPayload) => {

    })

    CPX.Procedures.register("ev-hoimports:FetchListings", async(src) => {

    })

    CPX.Procedures.register("ev-hoimports:UpdateListing", async(src, pPayload, pId) => {

    })

    CPX.Procedures.register("ev-hoimports:RemoveListing", async(src, pId) => {

    })

    CPX.Procedures.register("ev-hoimports:RentVehicle", async(src, pId) => {

    })

    CPX.Procedures.register("ev-hoimports:FetchListingInfo", async(src, pId) => {

    })

    CPX.Procedures.register("ev-hoimports:CompleteListing", async(src, pId) => {

    })

})();
