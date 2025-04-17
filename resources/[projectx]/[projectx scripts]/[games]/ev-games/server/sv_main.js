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

    CPX.Procedures.register("ev-games:getLobbies", async (src, pGame) => {
        console.log(pGame)
        // let currentGame = getGame(pGame) 
        // let currentGame = Lobbies[pGame]
        // if (!currentGame) {
        //     return []
        // }

        return Lobbies
    })

    CPX.Procedures.register("ev-games:getLobby", async (src, pGame, pId) => {
        // let currentGame = getGame(pGame) 
        // let currentGame = Lobbies[pGame]
        if (Lobbies == "[]") {
            return false
        }

        return Lobbies
    })
    
    CPX.Procedures.register("ev-games:createLobby", async (src, pGame, pData) => {
        let user = exports["ev-lib"].getCharacter(src)
        // createLobby(pData)
        let tempLobby = {}
        tempLobby = {
            name: pData.name,
            id: src,
            code: pData.code,
            started : false,
            cid : user.cid,
        }

        Lobbies.push(tempLobby)

        return await Lobbies
    })

    CPX.Events.onNet("ev-games:joinGame", async (pGame, pId) => {
        
        let src = source
        let user = exports["ev-lib"].getCharacter(src)

        let tempGameData = {}

        tempGameData = {
            cid : user.cid,
            is_playing : false,
            players : {
                src
            }
        }
        Lobbies.push(tempGameData)
    })

    CPX.Events.onNet("ev-games:cancelLobby", async (pGame, pId) => {
        let src = source
        let user = exports["ev-lib"].getCharacter(src)

   
        tempGameData[pGame][pId] = null
        Lobbies.push(tempGameData)
    })

    function getGame(pGame) {
        return Lobbies.get(pGame);
    }

    function createLobby(pAction, pValue) {
        Lobbies.set(pAction, pValue);
        return;
    };

    exports("getGame", getGame)
})();