(() => {
    'use strict';
    let _0x40709c = exports['ev-config'].GetModuleConfig('main');
    const _0x46d5e2 = new Map();
    const _0x46fbf8 = GetCurrentResourceName();
    async function _0x22c573() {
    }
    on('ev-config:configLoaded', (_0x333284, _0x2650ed) => {
        if (_0x333284 === 'main') {
            _0x40709c = _0x2650ed;
        } else {
            if (_0x46d5e2.has(_0x333284)) {
                _0x46d5e2.set(_0x333284, _0x2650ed);
            }
        }
    });
    function _0x4f85fe(_0x1f8179) {
        return _0x40709c[_0x1f8179];
    }
    function _0x112d0f(_0x3b7542, _0x48581e) {
        if (!_0x46d5e2.has(_0x3b7542)) {
            const _0x52b1e0 = exports['ev-config'].GetModuleConfig(_0x3b7542);
            if (_0x52b1e0 === undefined) {
                return;
            }
            _0x46d5e2.set(_0x3b7542, _0x52b1e0);
        }
        const _0x4c0ff0 = _0x46d5e2.get(_0x3b7542);
        if (_0x48581e) {
            if (_0x4c0ff0 === null || _0x4c0ff0 === void 0) {
                return void 0;
            } else {
                return _0x4c0ff0[_0x48581e];
            }
        } else {
            return _0x4c0ff0;
        }
    }
    function _0x1aefa2(_0x4dfb57) {
        return _0x112d0f(_0x46fbf8, _0x4dfb57);
    };
    const _0x169076 = globalThis;
    async function _0x3f9262(_0x3a9277) {
        return new Promise(_0x1a35f5 => setTimeout(() => _0x1a35f5(), _0x3a9277));
    };
    const _0x1fb750 = new Map();
    function _0xb75ea5(_0x4bb7aa, _0x14e4e2, _0x439af6 = 0, _0xc69dd4 = 0) {
        var _0x11361c;
        const _0x39c7c7 = _0x169076.GetSoundId();
        const _0x40c0e9 = (_0x11361c = _0x1fb750.get(_0x4bb7aa)) !== null && _0x11361c !== void 0 ? _0x11361c : [];
        _0x40c0e9.push(_0x39c7c7);
        _0x1fb750.set(_0x4bb7aa, _0x40c0e9);
        _0x169076.PlaySoundFromEntity(_0x39c7c7, _0x14e4e2, _0x4bb7aa, _0x439af6, false, _0xc69dd4);
        return _0x39c7c7;
    }
    exports('PlayEntitySound', _0xb75ea5);
    function _0x29d05b(_0x3f8617, _0x209c9a) {
        const _0x2d20a6 = _0x1fb750.get(_0x3f8617);
        if (_0x2d20a6 === undefined) {
            return;
        }
        const _0x13dd85 = _0x2d20a6.findIndex(_0x108356 => _0x108356 === _0x209c9a);
        if (_0x13dd85 === -1) {
            return;
        }
        _0x169076.StopSound(_0x209c9a);
        _0x169076.ReleaseSoundId(_0x209c9a);
        _0x2d20a6.splice(_0x13dd85, 1);
    }
    exports('StopEntitySound', _0x29d05b);
    function _0x23a1a6(_0x5a7c83) {
        const _0x58188c = _0x1fb750.get(_0x5a7c83);
        if (_0x58188c === undefined) {
            return;
        }
        _0x1fb750.set(_0x5a7c83, []);
        for (const _0x1ee46c of _0x58188c) {
            _0x169076.StopSound(_0x1ee46c);
            _0x169076.ReleaseSoundId(_0x1ee46c);
        }
    }
    exports('CleanUpEntitySounds', _0x23a1a6);
    async function _0x286f54() {
    }
    const _0x1a4110 = new Map();
    function _0x404a02(_0x21eb30, _0x4441ac) {
        let _0xd5a509;
        if (_0x4441ac === 'player') {
            const _0x9a0cea = GetPlayerFromServerId(_0x21eb30);
            if (_0x9a0cea === -1 && GetPlayerServerId(PlayerId()) !== _0x21eb30) {
                return;
            }
            _0xd5a509 = GetPlayerPed(_0x9a0cea);
        } else {
            if (!NetworkDoesEntityExistWithNetworkId(_0x21eb30)) {
                return;
            }
            _0xd5a509 = NetworkGetEntityFromNetworkId(_0x21eb30);
        }
        return _0xd5a509;
    }
    onNet('ev-fx:playEntitySound', async (_0x3c773d, _0x3409ee, _0x250d9a, _0x2a6777) => {
        const _0x57c068 = _0x404a02(_0x250d9a, _0x3409ee);
        if (!DoesEntityExist(_0x57c068)) {
            return;
        }
        const _0x544e7a = {
            active: true,
            sounds: [],
            entity: _0x57c068
        };
        _0x1a4110.set(_0x3c773d, _0x544e7a);
        const _0x24a13c = _0x4ac47a => {
            const _0x3aa31d = _0x4ac47a.data;
            const _0x498302 = _0xb75ea5(_0x57c068, _0x3aa31d.sound, _0x3aa31d.ref, _0x3aa31d.unk);
            if (_0x4ac47a.duration === undefined) {
                const _0x347d75 = setInterval(() => {
                    if (!HasSoundFinished(_0x498302)) {
                        return;
                    }
                    _0x29d05b(_0x57c068, _0x498302);
                    clearInterval(_0x347d75);
                }, 1000);
            } else {
                _0x3f9262(_0x4ac47a.duration).then(() => _0x29d05b(_0x57c068, _0x498302));
            }
            return _0x498302;
        };
        for (const _0x317ece of _0x2a6777) {
            if (!_0x544e7a.active) {
                return;
            }
            const _0x24e065 = _0x24a13c(_0x317ece);
            _0x544e7a.sounds.push(_0x24e065);
            if (_0x317ece.delay) {
                await _0x3f9262(_0x317ece.delay);
            }
        }
    });
    onNet('ev-fx:stopEntitySound', _0x501706 => {
        const _0x441cb5 = _0x1a4110.get(_0x501706);
        if (_0x441cb5 === undefined) {
            return;
        }
        _0x441cb5.active = false;
        for (const _0x56ba82 of _0x441cb5.sounds) {
            _0x29d05b(_0x441cb5.entity, _0x56ba82);
        }
        _0x1a4110.delete(_0x501706);
    });
    onNet('ev-fx:cleanUpEntitySounds', (_0x195e08, _0x534bbc) => {
        const _0x391bcf = _0x404a02(_0x195e08, _0x534bbc);
        if (_0x391bcf === undefined || _0x391bcf === -1) {
            return;
        }
        _0x23a1a6(_0x391bcf);
    });
    async function _0x16d2aa() {
        await _0x286f54();
    };
    async function _0x2c409d() {
        await _0x22c573();
        await _0x16d2aa();
    };
    const _0x1beda6 = []
    onNet('RunUseItem', (_0x447caf, _0x107f6c, _0x3b00c9, _0x1d00c7, _0x59cc35) => {
        const _0x4fae5b = _0x1beda6[_0x447caf];
        if (_0x4fae5b === undefined) {
            return;
        }
        for (const _0x3740f1 of _0x4fae5b) {
            try {
                _0x3740f1(_0x447caf, _0x107f6c, _0x3b00c9, _0x1d00c7, _0x59cc35);
            } catch (_0x36eb07) {
                console.error(_0x36eb07);
            }
        }
    });
    function _0x4a7060(_0x555e01, _0x2dfe43) {
        if (_0x1beda6[_0x555e01] === undefined) {
            _0x1beda6[_0x555e01] = [];
        }
        _0x1beda6[_0x555e01].push(_0x2dfe43);
    };
    function _0x27453a(_0x65f812, _0x5e7cda) {
        const _0x18539a = {
            count: 0,
            timer: 0
        };
        if (_0x44888f[_0x65f812] === undefined) {
            _0x44888f[_0x65f812] = _0x18539a;
        }
        const _0x5a8ed5 = GetGameTimer();
        const _0xcf9b8d = _0x44888f[_0x65f812];
        if (_0x5a8ed5 - _0xcf9b8d.timer > _0x5e7cda) {
            _0xcf9b8d.count = 0;
            _0xcf9b8d.timer = _0x5a8ed5;
        }
        return ++_0xcf9b8d.count;
    };
    async function _0x689126() {
    }
    _0x4a7060('gavel', async () => {
        const _0x37b002 = _0x27453a('playLabarreCatchPhrase', 2000);
        if (_0x37b002 > 1) {
            return;
        }
        await _0x3f9262(700);
        const _0x3fa587 = GetCurrentPedWeapon(PlayerPedId(), false);
        const _0x2a4f46 = _0x3fa587[1];
        if (_0x2a4f46 === 1317494643) {
            return;
        }
        let _0x14cc05 = false;
        const _0xc755a = setTimeout(() => _0x14cc05 = true, 5000);
        while (GetCurrentPedWeapon(PlayerPedId(), false)[1] !== 1317494643 && !_0x14cc05) {
            await _0x3f9262(100);
        }
        clearTimeout(_0xc755a);
        if (GetCurrentPedWeapon(PlayerPedId(), false)[1] !== 1317494643) {
            return;
        }
        emitNet('ev-fx:sound:playLabarreCatchPhrase');
    });

    async function _0x483228() {
        await _0x689126();
    };
    const _0x4189f8 = GetCurrentResourceName();
    RequestScriptAudioBank('dlc_nikez_general/general_general', 0)
    RequestScriptAudioBank('dlc_nikez_general/general_snake', 0)
    on('onClientResourceStart', async _0x59756c => {
        if (_0x59756c !== _0x4189f8) {
            return;
        }
        await _0x2c409d();
        await _0x483228();
    });
})();