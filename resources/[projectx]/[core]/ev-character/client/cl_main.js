;(() => {
    'use strict'
    var _0x205146 = {
      g: (function () {
        if (typeof globalThis === 'object') {
          return globalThis
        }
        try {
          return this || new Function('return this')()
        } catch (_0x40f1eb) {
          if (typeof window === 'object') {
            return window
          }
        }
      })(),
    }
    ;(() => {})()
    var _0x502549 = {}
    let _0x4e297f = exports['ev-config'].GetModuleConfig('main')
    const _0x25c780 = new Map(),
      _0x4e7fb5 = GetCurrentResourceName()
    async function _0x5a6d76() {}
    on('ev-config:configLoaded', (_0x5e8c28, _0x14756) => {
      if (_0x5e8c28 === 'main') {
        _0x4e297f = _0x14756
      } else {
        if (_0x25c780.has(_0x5e8c28)) {
          _0x25c780.set(_0x5e8c28, _0x14756)
        }
      }
    })
    function _0x7a910a(_0x35554a) {
      return _0x4e297f[_0x35554a]
    }
    function _0x39449b(_0x20eb00, _0x28f9ed) {
      if (!_0x25c780.has(_0x20eb00)) {
        const _0x5a8a7d = exports['ev-config'].GetModuleConfig(_0x20eb00)
        if (_0x5a8a7d === undefined) {
          return
        }
        _0x25c780.set(_0x20eb00, _0x5a8a7d)
      }
      const _0x5e07b0 = _0x25c780.get(_0x20eb00)
      return _0x28f9ed
        ? _0x5e07b0 === null || _0x5e07b0 === void 0
          ? void 0
          : _0x5e07b0[_0x28f9ed]
        : _0x5e07b0
    }
    function _0x1bbadb(_0x3a69ee) {
      return _0x39449b(_0x4e7fb5, _0x3a69ee)
    }
    const _0x3b48e8 = (_0x146ed8) => {
        const _0x223f6a = _0x39449b('ev-character:types', _0x146ed8)
        if (!_0x223f6a) {
          return 1
        }
        return _0x223f6a.factors.fineAmount
      },
      _0x5a616f = (_0x4c3819) => {
        const _0x234994 = _0x39449b('ev-character:types', _0x4c3819)
        if (!_0x234994) {
          return 1
        }
        return _0x234994.factors.jailTime
      },
      _0x43f391 = (_0x286294) => {
        const _0x1e2e5d = _0x39449b('ev-character:types', _0x286294)
        if (!_0x1e2e5d) {
          return 1
        }
        return _0x1e2e5d.factors.heistPayout
      },
      _0x2812df = (_0x21af71) => {
        const _0x1610f7 = _0x39449b('ev-character:types', _0x21af71)
        if (!_0x1610f7) {
          return 1
        }
        return _0x1610f7.factors.drugPayout
      }
    const _0x127c81 = globalThis.CPX,
      _0x2d7e61 = _0x127c81.Hud,
      _0x4719cb = _0x127c81.Utils,
      _0x4f357d = _0x127c81.Zones,
      _0x2255db = _0x127c81.Events,
      _0x1943be = _0x127c81.Streaming,
      _0x205237 = _0x127c81.Procedures,
      _0xc712fb = _0x127c81.Interface,
      _0x13b565 = null && _0x127c81
    async function _0x40032b(_0x20dd30) {
      return new Promise((_0x5bc4d2) => setTimeout(() => _0x5bc4d2(), _0x20dd30))
    }
    const _0x299096 = (_0x102e4c) => {
      return _0x102e4c[Math.floor(Math.random() * _0x102e4c.length)]
    }
    let _0x253c9d = 0.1,
      _0x4052ba = 25,
      _0x58b804
    const _0x4b0504 = async () => {
      on('ev-spawn:characterSpawned', async () => {
        const _0x7624bf = (await _0x466bd6()) === 'hardcore',
          _0x30ac9e = { isHardcore: _0x7624bf }
        _0x205146.g.exports['ev-ui'].sendAppEvent('game', _0x30ac9e)
        if (!_0x7624bf) {
          return
        }
        const _0x55e262 = await _0x205237.execute('ev-character:isICUPatient')
        if (_0x55e262) {
          _0x1a8d01(false)
          return
        }
        _0x58b804 = setTick(async () => {
          const _0x14c1eb = _0x5cd63d()
          _0x205146.g.exports['ev-ui'].sendAppEvent('hud', {
            hardcoreScore: 100 - Math.min(100, _0x14c1eb / 10),
          })
          if (_0x14c1eb >= 10) {
            _0x547969(_0x4052ba)
          }
          await _0x40032b(600000)
        })
      })
    }
    on('ev-config:configReady', () => {
      var _0x2f6e18, _0xd0935e
      _0x4052ba =
        (_0x2f6e18 = _0x39449b('ev-character', 'falloffPer10Min')) !== null &&
        _0x2f6e18 !== void 0
          ? _0x2f6e18
          : 25
      _0x253c9d =
        (_0xd0935e = _0x39449b('ev-character', 'icuChancePer100')) !== null &&
        _0xd0935e !== void 0
          ? _0xd0935e
          : 0.1
    })
    const _0x5cd63d = () => {
        var _0x187fad
        return (_0x187fad =
          _0x205146.g.exports['ev-progression'].GetProgression('hardcore:score')) !== null && _0x187fad !== void 0
          ? _0x187fad
          : 0
      },
      _0x458afa = (_0x3fdfe2) => {
        _0x2255db.emitNet('ev-character:addHCScore', _0x3fdfe2)
      },
      _0x547969 = (_0x92d726) => {
        _0x2255db.emitNet('ev-character:reduceHCScore', _0x92d726)
      },
      _0x237d36 = async () => {
        const _0x56476c = _0x5cd63d(),
          _0x21ffde =
            _0x56476c <= 100
              ? false
              : Math.random() < _0x253c9d * (_0x56476c / 100)
        if (!_0x21ffde) {
          return false
        }
        return (
          await _0x205237.execute('ev-character:dropICUCrate'), _0x1a8d01(), true
        )
      },
      _0x25c1f6 = {
        x: 361.41,
        y: -582.21,
        z: 43.29,
      }
    const _0x206f00 = {
      x: 358.8,
      y: -586.97,
      z: 43.29,
    }
    const _0x2e9215 = {
      x: 353.8,
      y: -600.94,
      z: 43.29,
    }
    const _0x251769 = {
      x: 365.89,
      y: -582.44,
      z: 43.29,
    }
    const _0xf55b98 = {
      x: 364.62,
      y: -586.81,
      z: 43.29,
    }
    const _0x5d5ef5 = {
      x: 364.13,
      y: -588.24,
      z: 43.29,
    }
    const _0x2e3e42 = [
        _0x25c1f6,
        _0x206f00,
        _0x2e9215,
        _0x251769,
        _0xf55b98,
        _0x5d5ef5,
      ],
      _0x1a8d01 = async (_0x5c7b91 = true) => {
        DoScreenFadeOut(500)
        await _0x40032b(500)
        const _0x2115f3 = _0x299096(_0x2e3e42)
        if (_0x5c7b91) {
          emit('DoLongHudText', 'You have been placed in the ICU for 24 hours.', 2)
        }
        SetEntityVisible(PlayerPedId(), false, false)
        FreezeEntityPosition(PlayerPedId(), true)
        SetEntityCoords(
          PlayerPedId(),
          _0x2115f3.x,
          _0x2115f3.y,
          _0x2115f3.z,
          false,
          false,
          false,
          false
        )
        await _0x40032b(1000)
        while (IsEntityWaitingForWorldCollision(PlayerPedId())) {
          await _0x40032b(10)
        }
        emit('client:bed', true)
        FreezeEntityPosition(PlayerPedId(), false)
        SetEntityVisible(PlayerPedId(), true, false)
        DoScreenFadeIn(500)
        _0x205146.g.exports['ev-taskbar'].taskbarDisableInventory(true)
        _0x205146.g.exports['ev-actionbar'].disableActionBar(true)
        _0x205146.g.exports['ev-ui'].showInteraction('[E] Swap Characters')
        const _0x600e53 = setTick(async () => {
          DrawRect(0, 0, 10, 10, 1, 1, 1, 128)
          DrawRect(0, 0, 10, 10, 1, 1, 1, 128)
          for (let _0x118d4d = 8; _0x118d4d <= 143; _0x118d4d++) {
            DisableControlAction(0, _0x118d4d, true)
          }
          ;(IsControlJustPressed(0, 38) || IsDisabledControlJustPressed(0, 38)) &&
            (clearTick(_0x600e53),
            emit('client:leavebed'),
            await _0x40032b(1000),
            emit('apartments:Logout'),
            _0x205146.g.exports['ev-taskbar'].taskbarDisableInventory(false),
            _0x205146.g.exports['ev-actionbar'].disableActionBar(false),
            _0x205146.g.exports['ev-ui'].hideInteraction())
        })
      }
    _0x205146.g.exports('GetHCScore', _0x5cd63d)
    _0x205146.g.exports('AddHCScore', _0x458afa)
    _0x205146.g.exports('ReduceHCScore', _0x547969)
    _0x205146.g.exports('RollICU', _0x237d36)
    const _0x27f592 = { timeToLive: 43200000 }
    const _0xff7303 = Cacheable(async () => {
      const _0x3b47cb = await _0x205237.execute('ev-character:getCharacterType')
      if (!_0x3b47cb) {
        return [false, 'normal']
      }
      return [true, _0x3b47cb]
    }, _0x27f592)
    on('ev-base:spawnInitialized', () => {
      _0xff7303.reset()
      clearTick(_0x58b804)
    })
    async function _0x14a188() {
      await _0x5a6d76()
      await _0x4b0504()
    }
    const _0x466bd6 = async () => {
        const _0x1e18c3 = await _0xff7303.get()
        if (!_0x1e18c3) {
          return 'normal'
        }
        return _0x1e18c3
      },
      _0xfc2d3f = async (_0x43f111) => {
        const _0x171bdf = await _0x466bd6()
        switch (_0x43f111) {
          case 'FINE_AMOUNT':
            return _0x3b48e8(_0x171bdf)
          case 'JAIL_TIME':
            return _0x5a616f(_0x171bdf)
          case 'HEIST_PAYOUT':
            return _0x43f391(_0x171bdf)
          case 'DRUG_PAYOUT':
            return _0x2812df(_0x171bdf)
          default:
            console.log('[CHARACTER] Tried to fetch invalid factor (' + _0x43f111 + ')')
            return 1
        }
      }
    _0x205146.g.exports('GetFactor', _0xfc2d3f)
    _0x205146.g.exports('GetCharacterType', _0x466bd6)
    ;(async () => {
      await _0x14a188()
    })()
  })()
  