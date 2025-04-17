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

    // const Lobbies = new Map();
    const Lobbies = []
    
    CPX.Procedures.register("ev-games-airsoft:getLobbies", async (src, pGame) => {
        // let currentGame = getGame(pGame) 
        // let currentGame = Lobbies[pGame]
        // if (!currentGame) {
        //     return []
        // }

        return Lobbies
    })
    
    CPX.Procedures.register("ev-games-airsoft:createLobby", async (src, pLobbyName, pCode) => {
        // createLobby(pLobbyName, pCode)
        let tempLobby = {
            name: pLobbyName,
            id: pCode,
            started : false
        }

        Lobbies.push(tempLobby)

        return await Lobbies
    })

    function getGame(pGame) {
        return Lobbies.get(pGame);
    }

    function createLobby(pAction, pValue) {
        Lobbies.set(pAction, pValue);
        return;
    };
})();