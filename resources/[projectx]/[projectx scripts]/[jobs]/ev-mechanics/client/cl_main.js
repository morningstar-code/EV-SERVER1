;(() => {
    'use strict'
    var _0x4100fe = {
      g: (function () {
        if (typeof globalThis === 'object') {
          return globalThis
        }
        try {
          return this || new Function('return this')()
        } catch (_0x16ff56) {
          if (typeof window === 'object') {
            return window
          }
        }
      })(),
    }
    ;(() => {})()
    var _0x3c69b9 = {}
    const _0x2ce802 = globalThis.CPX,
      _0x50276a = _0x2ce802.Hud,
      _0xb3b860 = _0x2ce802.Utils,
      _0x4d26c4 = _0x2ce802.Zones,
      _0x130a6d = _0x2ce802.Events,
      _0x47c209 = _0x2ce802.Streaming,
      _0x253f2c = _0x2ce802.Procedures,
      _0x216242 = _0x2ce802.Interface,
      _0x217914 = null && _0x2ce802
    const _0x1c0568 = { distance: 3.5 };
    const _0x3deb51 = {
        type: 'skill',
        text: 'Installing part to Vehicle...',
        duration: _0x9cb61(6, [
            10000,
            4000,
            10000,
            4000,
            10000,
            4000
        ], 8, 15),
        dictionary: 'WORLD_HUMAN_WELDING',
        animation: '',
        data: _0x1c0568
    };
    const _0x2b03b0 = {
        name: 'vehicle:cosmetic',
        animation: _0x3deb51
    };
    const _0x4789c5 = { distance: 3.5 };
    const _0x2617d1 = {
        type: 'skill',
        text: 'Installing part to Vehicle...',
        duration: _0x9cb61(6, [
            10000,
            4000,
            10000,
            4000,
            10000,
            4000
        ], 8, 15),
        dictionary: 'mini@repair',
        animation: 'fixing_a_player',
        data: _0x4789c5
    };

    const _0x15a843 = {
        name: 'vehicle:performance',
        animation: _0x2617d1
    };

    const _0x29a2b4 = { distance: 3.5 };
    const _0x49258b = {
        type: 'skill',
        text: 'Spraying Vehicle...',
        duration: _0x9cb61(6, [
            10000,
            4000,
            10000,
            4000,
            10000,
            4000
        ], 8, 15),
        dictionary: 'anim@amb@business@weed@weed_inspecting_lo_med_hi@',
        animation: 'weed_spraybottle_crouch_spraying_01_inspector',
        flag: 49,
        data: _0x29a2b4
    };

    const _0x8be746 = {
        name: 'vehicle:respray',
        animation: _0x49258b
    };

    const _0x518048 = [
        _0x2b03b0,
        _0x15a843,
        _0x8be746
    ];

    async function _0x887630() {
        _0x518048.forEach(_0x309113 => {
            _0xf3b165(_0x309113.name, _0x309113.animation);
        });
    }

    class AnimationTask {
        constructor(pPed, pType, pTxt, pDur, pDict, pAnim, pFlag = 1) {
            this.ped = pPed;
            this.type = pType;
            this.flag = pFlag;
            this.text = pTxt;
            this.active = false;
            this.duration = pDur;
            this.dictionary = pDict;
            this.animation = pAnim;
        }
        start(pTask) {
            if (this.active)
                return;
            this.active = true;
            if (pTask) {
                pTask(this);
            }
            this.tickId = setTick(async () => {
                if (this.animation && !IsEntityPlayingAnim(this.ped, this.dictionary, this.animation, 3)) {
                    await CPX.Streaming.loadAnim(this.dictionary);
                    TaskPlayAnim(this.ped, this.dictionary, this.animation, -8.0, -8.0, -1, this.flag, 0, false, false, false);
                }
                else if (!this.animation && !IsPedUsingScenario(this.ped, this.dictionary)) {
                    TaskStartScenarioInPlace(this.ped, this.dictionary, 0, true);
                }
                await new Promise((resolve) => setTimeout(resolve, 100));
            });
            let task;
            if (this.type === 'skill' && this.duration instanceof Array) {
                task = new Promise(async (resolve) => {
                    const skills = this.duration;
                    for (const skill of skills) {
                        const progress = await TaskbarMiniGame(skill.difficulty, skill.gap);
                        if (progress !== 100)
                            return resolve(0);
                    }
                    resolve(100);
                });
            }
            else if (this.type === 'normal' && typeof this.duration === 'number') {
                task = Taskbar(this.duration, this.text);
            }
            task.then(() => {
                this.stop();
            });
            return task;
        }
        stop() {
            if (!this.active)
                return;
            this.active = false;
            clearTick(this.tickId);
            if (!this.animation && IsPedUsingScenario(this.ped, this.dictionary)) {
                ClearPedTasks(this.ped);
            }
            else {
                StopAnimTask(this.ped, this.dictionary, this.animation, 3.0);
            }
        }
        abort() {
            if (this.active) {
                exports['ev-taskbar'].taskCancel();
                this.stop();
            }
        }
    }
    
    function Taskbar(pLength, pName, pRunCheck = false) {
        return new Promise((resolve) => {
            if (pName) {
                exports['ev-taskbar'].taskBar(pLength, pName, pRunCheck, true, null, false, resolve);
            }
            else {
                setTimeout(() => resolve(100), pLength);
            }
        });
    }
    function TaskbarMiniGame(pDifficulty, pGap) {
        return new Promise((resolve) => {
            exports['ev-ui'].taskBarSkill(pDifficulty, pGap, resolve);
        });
    }
    function _0x77a084([_0x5ddb0e, _0x4b4bad, _0x191a31], [_0x413e67, _0xc7979d, _0x2e048f], _0x62ab3e = false) {
        return GetDistanceBetweenCoords(_0x5ddb0e, _0x4b4bad, _0x191a31, _0x413e67, _0xc7979d, _0x2e048f, _0x62ab3e);
    }

    function _0x3a0ef4(_0x17defd, _0x440923, _0x3a0997) {
        let _0x24dc86;
        if (_0x440923 === 1 && typeof _0x3a0997 === 'number') {
            _0x24dc86 = GetPedBoneIndex(_0x17defd, _0x3a0997);
        } else {
            if (_0x440923 === 2 && typeof _0x3a0997 === 'string') {
                _0x24dc86 = GetEntityBoneIndexByName(_0x17defd, _0x3a0997);
            }
        }
        return GetWorldPositionOfEntityBone(_0x17defd, _0x24dc86);
    }
    function _0x4f6656(_0x38ed55, _0x1843dd, _0x1f96bd, _0x3d9a9e) {
        const _0x4b2d6d = _0x3d9a9e ? _0x3d9a9e : GetEntityCoords(PlayerPedId(), false);
        return _0x77a084(_0x3a0ef4(_0x38ed55, _0x1843dd, _0x1f96bd), _0x4b2d6d);
    }
    function _0x4e5140(_0xf4180c, _0x3fc65a) {
        let _0x137e17;
        let _0x107903;
        let _0x48f8c6;
        let _0x36c531;
        const _0x50319c = GetEntityCoords(PlayerPedId(), false);
        _0x3fc65a.forEach(_0x2d446b => {
            const _0xdeede8 = GetEntityBoneIndexByName(_0xf4180c, _0x2d446b);
            if (_0xdeede8 === -1) {
                return;
            }
            const _0x3da416 = GetWorldPositionOfEntityBone(_0xf4180c, _0xdeede8);
            const _0x5c5516 = _0x77a084(_0x50319c, _0x3da416, false);
            if (!_0x137e17 || _0x5c5516 < _0x48f8c6) {
                _0x137e17 = _0xdeede8;
                _0x107903 = _0x2d446b;
                _0x36c531 = _0x3da416;
                _0x48f8c6 = _0x5c5516;
            }
        });
        return [
            _0x137e17,
            _0x107903,
            _0x48f8c6,
            _0x36c531
        ];
    }
    async function _0x5a942c(_0x1f36c5, [_0x65bf60, _0x1a77ff, _0x4f0919]) {
        TaskTurnPedToFaceCoord(_0x1f36c5, _0x65bf60, _0x1a77ff, _0x4f0919, 0);
        await new Promise((_0x38ab39) => setTimeout(_0x38ab39, 100))
        while (GetScriptTaskStatus(_0x1f36c5, 1464580341) === 1) {
            await new Promise((_0x38ab39) => setTimeout(_0x38ab39, 1000))
        }
    }
    async function _0x2437bb(_0x2f50c0, _0x167c32) {
        TaskTurnPedToFaceEntity(_0x2f50c0, _0x167c32, 0);
        await new Promise((_0x38ab39) => setTimeout(_0x38ab39, 100))
        while (GetScriptTaskStatus(_0x2f50c0, 3419293077) === 1) {
            await new Promise((_0x38ab39) => setTimeout(_0x38ab39, 0))
        }
    }
    const _0x4f99da = new Map();
    function _0x493785(_0x758f3f) {
        return _0x4f99da.get(_0x758f3f);
    }

    function _0xf3b165(_0x258e6b, _0x23435e) {
        _0x4f99da.set(_0x258e6b, _0x23435e);
    }

    function _0x294b1a(_0x264ed7) {
        return _0x4f99da.has(_0x264ed7);
    }

    function _0x9cb61(_0x1ce44f, _0x11cbf6, _0x220d9f, _0x46aa7c) {
        const _0x5112d7 = [];
        for (let _0x5ddb86 = 0; _0x5ddb86 < _0x1ce44f; _0x5ddb86 += 1) {
            const _0x5082bf = typeof _0x11cbf6 === 'number' ? _0x11cbf6 / _0x1ce44f : _0x11cbf6[_0x5ddb86];
            const _0x2fe0a8 = {
                get gap() {
                    return _0x220d9f, _0x46aa7c;
                },
                difficulty: _0x5082bf
            };
            _0x5112d7.push(_0x2fe0a8);
        }
        return _0x5112d7;
    }

    async function _0x3784e6(_0x346813, _0x589b79, _0x1392e7) {
        const _0x161ff6 = typeof _0x1392e7 === 'string' ? _0x493785(_0x1392e7) : _0x1392e7;
        if (!_0x161ff6) {
            return;
        }
        const _0xb8e9ae = new AnimationTask(PlayerPedId(), _0x161ff6.type, _0x161ff6.text, _0x161ff6.duration, _0x161ff6.dictionary, _0x161ff6.animation, _0x161ff6.flag);
        let _0x58b728 = _0x161ff6.callback;
        if (!_0x58b728 && _0x161ff6.data) {
            const _0x3cb1f6 = _0x161ff6.data;
            _0x58b728 = (_0x4703b4, _0x5be403) => {
                let _0x36818d;
                if (_0x3cb1f6.bones) {
                    const _0x8b8e71 = _0x4e5140(_0x5be403, _0x3cb1f6.bones);
                    _0x36818d = _0x8b8e71[2];
                } else {
                    _0x36818d = _0x77a084(GetEntityCoords(PlayerPedId(), false), GetEntityCoords(_0x5be403, false));
                }
                if (_0x36818d && _0x36818d > _0x3cb1f6.distance) {
                    _0x4703b4.abort();
                }
            };
        }
        return await _0xb8e9ae.start(_0x19d0af => {
            if (!_0x58b728) {
                return;
            }
            const _0x2b98d0 = setInterval(() => {
                if (!_0x19d0af.active) {
                    clearInterval(_0x2b98d0);
                    _0x19d0af.abort();
                }
                _0x58b728(_0x19d0af, _0x589b79);
            }, 1000);
        });
    }

    async function _0x519ace() {
        await _0x887630();
    }

    let _0x533a9c;
    async function _0x4fbd72() {
    }

    exports("getBeenysSettings", _0x493785)
    exports("applyBennysSettings", _0x3784e6)
    _0x519ace()
})()