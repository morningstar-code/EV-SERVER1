
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

    const _0x26ae9f = globalThis.CPX,
    _0x4d0962 = _0x26ae9f.Hud,
    _0x374e76 = _0x26ae9f.Utils,
    _0x3ae7a7 = _0x26ae9f.Zones,
    _0x38712e = _0x26ae9f.Events,
    _0x36cbd5 = _0x26ae9f.Streaming,
    _0x2bb009 = _0x26ae9f.Procedures,
    _0x4a91cd = _0x26ae9f.Interface,
    _0x1b7621 = null && _0x26ae9f
  const _0x26f201 = globalThis
    let USE_VOICE_RTC = true;
    let ActiveConnections = [];

    RegisterServerEvent("ev:fiber:startCall:phone")
    onNet("ev:fiber:startCall:phone", async (caller,calling,RTCInfo) => {
        emitNet("ev:fiber:startCall", calling, caller, RTCInfo)
        ActiveConnections[RTCInfo] == true;
    });

    RegisterServerEvent("ev:fiber:stopCall:phone")
    onNet("ev:fiber:stopCall:phone", async (caller,calling,RTCInfo) => {
        emitNet("ev:fiber:stopCall", calling, caller, RTCInfo)
        emitNet("ev:fiber:stopCall", caller, calling, RTCInfo)
        ActiveConnections[RTCInfo] == null;
    });

    _0x2bb009.register("ev-fiber:verify:userRank", async(src, pRank) => {
        let rank = exports['ev-lib'].getUserRank(src)

        if (rank == pRank) {
            return true
        } else {
            return false
        }
    })
    // CPX.Procedures.register("ev:fiber:player:init", async(src) => {
    //     return []
    // })
})();
