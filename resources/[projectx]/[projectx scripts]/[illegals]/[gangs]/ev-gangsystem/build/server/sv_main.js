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

    CPX.Procedures.register("ev-gangsystem:getCostOfSpray", async (src, gangId) => {
        return 500
    })

    CPX.Procedures.register("ev-gangsystem:getFoundGraffiti", async (src, gangId) => {
        //  return graffiti coords + blip color
    })

    CPX.Procedures.register("ev-gangsystem:getGanginfo", async (src) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:removeGangMember", async (src, gangId, cid) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:addGangMember", async (src, gangId, cid) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:fetchGangProgression", async (src, gangId) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:fetchIsStaff", async (src) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:fetchStaffInformation", async (src) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:staffRemoveMember", async (src, groupId, cid) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:staffFetchGangLogs", async (src, groupId) => {
        //  return gang data
        return {}
    })

    CPX.Procedures.register("ev-gangsystem:getGangsPedModels", async (src) => {
        let GangModels = {
            hoa : {
                model : 'g_m_y_lost_01',
                model : 'g_m_y_lost_02',
                model : 'g_m_y_lost_03',
            }
        }
        return GangModels
    })

    CPX.Procedures.register("ev-gangsystem:getGangNPCWeapon", async (src, gangId) => {
        return {}
    })

    CPX.Procedures.register("ev-gangsystem:getCurrentGang", async (src) => {
        return {}
    })

    CPX.Procedures.register("ev-gangsystem:getGanginfo", async (src) => {
        //  return gang data
        return {}

    })

    CPX.Procedures.register("ev-gangsystem:getGangFlagLocation", async (src) => {
        //  return gang data
        return {}

    })

    CPX.Procedures.register("ev-gangs:addFlag", async (src, objId, gangId, model) => {
        //  return gang data
    })

    CPX.Procedures.register("ev-gangsystem:openTrapInventory", async (src, gangId) => {
        //  return gang data
    })

})();