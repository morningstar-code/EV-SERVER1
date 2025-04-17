;(() => {
    'use strict'
    var _0x115c9b = {
      g: (function () {
        if (typeof globalThis === 'object') {
          return globalThis
        }
        try {
          return this || new Function('return this')()
        } catch (_0x1eb7b6) {
          if (typeof window === 'object') {
            return window
          }
        }
      })(),
    }
    ;(() => {})()
    var _0x256754 = {}
    let _0x942bbc = exports['ev-config'].GetModuleConfig('main')
    const _0xe3ff44 = new Map(),
      _0x248e27 = GetCurrentResourceName()
    async function _0x2abc90() {}
    on('ev-config:configLoaded', (_0x3dccc4, _0x5868f1) => {
      if (_0x3dccc4 === 'main') {
        _0x942bbc = _0x5868f1
      } else {
        _0xe3ff44.has(_0x3dccc4) && _0xe3ff44.set(_0x3dccc4, _0x5868f1)
      }
    })
    function _0x2912f8(_0x4237d4) {
      return _0x942bbc[_0x4237d4]
    }
    function _0x3cc044(_0x1d1c1b, _0x333ab3) {
      if (!_0xe3ff44.has(_0x1d1c1b)) {
        const _0x19ce3b = exports['ev-config'].GetModuleConfig(_0x1d1c1b)
        if (_0x19ce3b === undefined) {
        }
        _0xe3ff44.set(_0x1d1c1b, _0x19ce3b)
      }
      const _0x4f4193 = _0xe3ff44.get(_0x1d1c1b)
      return _0x333ab3
        ? _0x4f4193 === null || _0x4f4193 === void 0
          ? void 0
          : _0x4f4193[_0x333ab3]
        : _0x4f4193
    }
    function _0x3f5e64(_0x39c145) {
      return _0x3cc044(_0x248e27, _0x39c145)
    }
    const _0x20eb58 = globalThis.CPX,
      _0x5f0bfc = _0x20eb58.Hud,
      _0x1e41a1 = _0x20eb58.Utils,
      _0x5403df = _0x20eb58.Zones,
      _0x501a81 = _0x20eb58.Events,
      _0x3fcf3c = _0x20eb58.Streaming,
      _0x32035f = _0x20eb58.Procedures,
      _0x1fb8f2 = _0x20eb58.Interface,
      _0x585a3d = null && _0x20eb58
    async function _0x3f9230(_0x50a059) {
      return new Promise((_0x3131b5) => setTimeout(() => _0x3131b5(), _0x50a059))
    }
    function _0x3d3c9d(_0x1fd958 = 0) {
      return '' + new Intl.NumberFormat().format(_0x1fd958)
    }
    function _0x2e2214(_0xf8aa7d) {
      if (typeof _0xf8aa7d !== 'string') {
        return
      }
      return _0xf8aa7d.toLowerCase().replace(/^\w|\s\w/g, function (_0x235ef2) {
        return _0x235ef2.toUpperCase()
      })
    }
    const _0x39ffb5 = (_0x1351e4) => {
        if (_0x1351e4 === 0) {
          return 0
        }
        const _0xbd30cf = _0x3f5e64('speedRange'),
          _0xc4ccc3 = _0x1351e4 / 100,
          _0x18b8ac = _0xc4ccc3 * _0xbd30cf[1]
        return _0x18b8ac + _0xbd30cf[0]
      },
      _0x2295fb = (_0x3c93a1) => {
        if (_0x3c93a1 === 0) {
          return 0
        }
        const _0xe2dbe6 = _0x3f5e64('mpgRange'),
          _0x2967ad = _0x3c93a1 / 100,
          _0x32774d = _0x2967ad * _0xe2dbe6[1],
          _0x320e30 =
            _0x32774d < _0xe2dbe6[0] ? _0x32774d + _0xe2dbe6[0] : _0x32774d
        return Math.floor(_0x320e30)
      },
      _0x944df8 = (_0x3be899) => {
        const _0x143e21 = Math.floor((Date.now() - _0x3be899) / 1000)
        let _0x104802 = _0x143e21 / 31536000
        _0x104802 = _0x143e21 / 2592000
        if (_0x104802 > 1) {
          return Math.floor(_0x104802) + ' Months'
        }
        _0x104802 = _0x143e21 / 86400
        if (_0x104802 > 1) {
          return Math.floor(_0x104802) + ' Days'
        }
        _0x104802 = _0x143e21 / 3600
        if (_0x104802 > 1) {
          return Math.floor(_0x104802) + ' Hours'
        }
        _0x104802 = _0x143e21 / 60
        if (_0x104802 > 1) {
          return Math.floor(_0x104802) + ' Minutes'
        }
        return Math.floor(_0x143e21) + ' Seconds'
      },
      _0x529759 = (_0x3b9eaf, _0x378f5c) => {
        return Math.floor(
          _0x378f5c
            ? Math.random() * (_0x378f5c - _0x3b9eaf) + _0x3b9eaf
            : Math.random() * _0x3b9eaf
        )
      },
      _0x8f58e4 = (_0x3a8b51) => {
        const _0x4c48d2 = Number((Math.abs(_0x3a8b51) * 100).toPrecision(15))
        return (Math.round(_0x4c48d2) / 100) * Math.sign(_0x3a8b51)
      },
      _0x6d8783 = (_0x292530, _0x38aec5) => {
        return Number(_0x292530.toFixed(_0x38aec5))
      },
      _0x2e9fb2 = () => {
        const _0x1bfc31 = new Date(),
          _0x2626f3 = new Date(_0x1bfc31.getFullYear(), 0, 1),
          _0x38cdb0 = Math.floor(
            (_0x1bfc31.getTime() - _0x2626f3.getTime()) / 86400000
          )
        return Math.ceil((_0x1bfc31.getDay() + 1 + _0x38cdb0) / 7)
      },
      _0x3613f3 = (_0x213714, _0x25eab7) => {
        for (let _0x3157e4 = _0x25eab7.length - 1; _0x3157e4 > 0; _0x3157e4--) {
          const _0x39b0a1 = Math.floor(_0x213714() * (_0x3157e4 + 1))
          ;[_0x25eab7[_0x3157e4], _0x25eab7[_0x39b0a1]] = [
            _0x25eab7[_0x39b0a1],
            _0x25eab7[_0x3157e4],
          ]
        }
        return _0x25eab7
      },
      _0x8f7913 = (_0x1a98e0, _0x490c57) => {
        let _0x37269a = 0,
          _0x1520ce = []
        for (let _0x29509b = 0; _0x29509b < _0x490c57 - 1; _0x29509b++) {
          const _0x14b7e4 = _0x1a98e0() * (1 - _0x37269a)
          _0x1520ce.push(_0x14b7e4)
          _0x37269a += _0x14b7e4
        }
        return (
          (_0x1520ce = _0x1520ce.map((_0x5b88f9) => _0x6d8783(_0x5b88f9, 2))),
          (_0x37269a = _0x1520ce.reduce(
            (_0x316af5, _0x48a4ef) => _0x316af5 + _0x48a4ef,
            0
          )),
          _0x1520ce.push(_0x6d8783(1 - _0x37269a, 2)),
          _0x3613f3(_0x1a98e0, _0x1520ce)
        )
      }
    const _0x319a4b = { timeToLive: 60000 }
    const _0x4bd344 = Cacheable(async(_0x3d49a1, _0x922732) => {
        const _0x505962 = exports['ev-business'].IsEmployedAt(_0x922732)
        return [true, _0x505962]
      }, _0x319a4b),
      _0x5655c2 = { timeToLive: 60000 }
    const _0x5eb91b = Cacheable(async (_0x261ed7, _0x5d1139, _0x3b3fb4, _0x275fa0) => {
          const _0x25a94e = exports['ev-business'].HasPermission(
            _0x3b3fb4,
            _0x275fa0
          )
          return [true, _0x25a94e]
        },
        _0x5655c2
      ),
      _0x5390e4 = { timeToLive: 60000 }
    const _0x3a3250 = Cacheable(async (_0x968006, _0x427474) => {
      const _0x3f0bcf = await _0x32035f.execute('GetTaxLevel', _0x427474)
      if (isNaN(_0x3f0bcf)) {
        return [false, undefined]
      }
      return [true, _0x3f0bcf]
    }, _0x5390e4)
    function _0x144a86(_0x1962f3, _0x2559e3, _0x165abe = false) {
      return new Promise((_0x334c87) => {
        if (_0x2559e3) {
          exports['ev-taskbar'].taskBar(
            _0x1962f3,
            _0x2559e3,
            _0x165abe,
            true,
            null,
            false,
            _0x334c87
          )
        } else {
          setTimeout(() => _0x334c87(100), _0x1962f3)
        }
      })
    }
    function _0x3c3bff(_0x290165, _0x2d1d66) {
      return new Promise((_0x53a798) => {
        exports['ev-ui'].taskBarSkill(_0x290165, _0x2d1d66, _0x53a798)
      })
    }
    const _0x21525f = async (_0xdc3f6) => {
        let _0x12e2dd = false
        setTimeout(() => (_0x12e2dd = true), 10000)
        while (
          !RequestScriptAudioBank('DLC_NIKEZ_GENERAL/GENERAL_GENERAL', false) &&
          !_0x12e2dd
        ) {
          await _0x3f9230(0)
        }
        const _0xbbbd79 = GetSoundId()
        PlaySoundFromCoord(
          _0xbbbd79,
          'klaxon',
          _0xdc3f6[0],
          _0xdc3f6[1],
          _0xdc3f6[2],
          'DLC_NIKEZ_GENERAL',
          false,
          1,
          false
        )
        setTimeout(() => {
          StopSound(_0xbbbd79)
          ReleaseSoundId(_0xbbbd79)
        }, 30000)
      },
      _0x2b0ff5 = (_0x2016cd, _0x10d823, _0x5ac22f, _0x424d6e, _0x48c8e5) => {
        const _0x4a0a0c = AddBlipForCoord(
          _0x10d823[0],
          _0x10d823[1],
          _0x10d823[2]
        )
        return (
          SetBlipScale(_0x4a0a0c, 0.65),
          _0x5ac22f && SetBlipSprite(_0x4a0a0c, _0x5ac22f),
          _0x424d6e && SetBlipColour(_0x4a0a0c, _0x424d6e),
          _0x48c8e5 && SetBlipAsShortRange(_0x4a0a0c, _0x48c8e5),
          BeginTextCommandSetBlipName('STRING'),
          AddTextComponentString(_0x2016cd),
          EndTextCommandSetBlipName(_0x4a0a0c),
          _0x4a0a0c
        )
      }
    const _0x4d9784 = GetCurrentResourceName(),
      _0x1bc62d = new Map()
    let _0x427059 = 0
    RegisterUICallback('ev-ui:menu:confirmation', ({ key: data }, cb) => {
        const _0x28c170 =
          _0x4d9784 +
          ':' +
          (data === null || data === void 0 ? void 0 : data.id)
        if (!_0x1bc62d.has(_0x28c170)) {
          return
        }
        _0x1bc62d.get(_0x28c170)(data.accept)
        _0x1bc62d.delete(_0x28c170)
        const _0x296a2b = {
          ok: true,
          message: '',
        }
        const _0x7f00a8 = {
          data: {},
          meta: _0x296a2b,
        }
        cb(_0x7f00a8)
      }
    )
    function _0x166873(_0x326a2c, _0x207efb) {
      const _0x312122 = ++_0x427059,
        _0xdf572f = {
          title: _0x326a2c,
          description: _0x207efb,
        }
      const _0x1d1168 = {
        id: _0x312122,
        accept: true,
      }
      const _0x120700 = {
        title: 'Accept',
        action: 'ev-ui:menu:confirmation',
        key: _0x1d1168,
      }
      const _0x244a42 = {
        id: _0x312122,
        accept: false,
      }
      const _0xc952e5 = {
        title: 'Decline',
        action: 'ev-ui:menu:confirmation',
        key: _0x244a42,
      }
      const _0x5847fc = [_0xdf572f, _0x120700, _0xc952e5],
        _0x4dbeee = new Promise((_0x3e9c23) => {
          _0x1bc62d.set(_0x4d9784 + ':' + _0x312122, _0x3e9c23)
          setTimeout(() => _0x3e9c23(false), 30000)
        })
      return exports['ev-ui'].showContextMenu(_0x5847fc), _0x4dbeee
    }
    let _0x554237 = 0
    const _0x33ac5a = new Map()
    RegisterUICallback('ev-ui:applicationClosed', (_0x5ee05f, _0x9bcd69) => {
      if (
        _0x5ee05f.name !== 'textbox' ||
        (_0x5ee05f === null || _0x5ee05f === void 0
          ? void 0
          : _0x5ee05f.callbackUrl) !== 'ev-ui:menu:input'
      ) {
        return
      }
      const _0x58384d = _0x33ac5a.get(_0x5ee05f.key)
      if (!_0x58384d) {
        return
      }
      _0x58384d.resolve(null)
      _0x33ac5a.delete(_0x5ee05f.key)
    })
    RegisterUICallback('ev-ui:menu:input', (_0x205442, _0x28e728) => {
      const _0x21deff = {
        ok: true,
        message: '',
      }
      const _0x263902 = {
        data: {},
        meta: _0x21deff,
      }
      _0x28e728(_0x263902)
      const _0x57d79a = _0x33ac5a.get(_0x205442.key)
      if (!_0x57d79a) {
        return
      }
      const _0x2e46b1 = _0x57d79a.validation
        ? _0x57d79a.validation(
            _0x205442 === null || _0x205442 === void 0 ? void 0 : _0x205442.values
          )
        : true
      if (!_0x2e46b1) {
        return
      }
      _0x57d79a.resolve(
        _0x205442 === null || _0x205442 === void 0 ? void 0 : _0x205442.values
      )
      _0x33ac5a.delete(_0x205442.key)
      exports['ev-ui'].closeApplication('textbox')
    })
    function _0x5c57a2(_0x19a4eb, _0x35f6ac) {
      const _0x13fe80 = ++_0x554237,
        _0x122c39 = new Promise((_0x1a911b) => {
          const _0x36a74c = {
            resolve: _0x1a911b,
            validation: _0x35f6ac,
          }
          _0x33ac5a.set(_0x13fe80, _0x36a74c)
        }),
        _0x18fbef = {}
      return (
        (_0x18fbef.callbackUrl = 'ev-ui:menu:input'),
        (_0x18fbef.key = _0x13fe80),
        (_0x18fbef.items = _0x19a4eb),
        (_0x18fbef.show = true),
        exports['ev-ui'].openApplication('textbox', _0x18fbef),
        _0x122c39
      )
    }
    function _0x24fb4c(_0x2621a1, _0x32cb0c, _0x41c0f5) {
      return new Promise((_0x1924ed) => {
        exports['ev-phone'].DoPhoneConfirmation(
          _0x2621a1,
          _0x32cb0c,
          _0x41c0f5,
          _0x1924ed
        )
      })
    }
    RegisterUICallback('ev-oilers:storage:withdrawOil', async (data, cb) => {
        const _0x24c959 = {
          ok: true,
          message: '',
        }
        const _0x22c0e1 = {
          data: {},
          meta: _0x24c959,
        }
        cb(_0x22c0e1)
        const _0x34bd9b = data.key.method,
          _0x4a3d35 = data.key.meta,
          _0x3252c3 = data.key.capacity,
          _0x399311 = data.key.available
        await _0x3f9230(500)
        const _0x5b6f6b = { i18n: ['Available'] }
        emit('DoLongHudText', _0x3d3c9d(_0x399311) + ' Available', 1, 12000, _0x5b6f6b)
        const _0x5bf5fa = {
          name: 'quantity',
          label: 'Quantity to Withdraw',
          icon: 'minus-circle',
        }
        const _0x3a642c = await _0x5c57a2([_0x5bf5fa], (_0x4a5b64) => {
          if (!_0x4a5b64.quantity || _0x4a5b64.quantity.length === 0) {
            return false
          }
          return (
            (_0x4a5b64.quantity = Number(
              _0x4a5b64 === null || _0x4a5b64 === void 0
                ? void 0
                : _0x4a5b64.quantity
            )),
            !isNaN(
              _0x4a5b64 === null || _0x4a5b64 === void 0
                ? void 0
                : _0x4a5b64.quantity
            )
          )
        })
        let _0xe61579 = _0x3a642c === null || _0x3a642c === void 0 ? void 0 : _0x3a642c.quantity
        if (!_0xe61579 || _0xe61579 <= 0) {
          return emit('DoLongHudText', 'Invalid Quantity', 2)
        }
        if (_0xe61579 > _0x399311) {
          _0xe61579 = _0x399311
        }
        if (_0xe61579 > _0x3252c3) {
          _0xe61579 = _0x3252c3
        }
        if (
          _0x34bd9b === 'tanker' &&
          IsAnyVehicleNearPoint(1736.7, -1538.03, 114.53, 10)
        ) {
          return emit('DoLongHudText', 'A vehicle is blocking the cargo area', 2)
        }
        const _0xfbc8a3 = await _0x32035f.execute(
          'ev-oilers:storage:withdrawOil',
          _0x34bd9b,
          _0x4a3d35,
          _0xe61579
        )
        emit('DoLongHudText',
          _0xfbc8a3
            ? _0x34bd9b + ' ready to be collected'
            : 'Unable to prepare ' + _0x34bd9b,
          _0xfbc8a3 ? 1 : 2
        )
      }
    )
    on('ev-oilers:storage:showBarrelInv', async (_0x1b3afa, _0x2c0bdb, _0x1590dd) => {
        const _0x123ae0 = exports.isPed.isPed('cid')
        emit(
          'server-inventory-open',
          '1',
          'container-' + _0x123ae0 + '-barrels-barrelpile',
          750,
          5
        )
      }
    )
    on('ev-oilers:storage:returnBarrel', async () => {
      const _0x5f2002 = exports['ev-inventory'].getItemsOfType(
          'barrel_fuel',
          1,
          true
        ),
        _0x117b35 = _0x5f2002[0],
        _0x3a3f72 = _0x117b35 ? JSON.parse(_0x117b35.information) : undefined
      if (
        _0x5f2002.length === 0 ||
        (_0x3a3f72 === null || _0x3a3f72 === void 0 ? void 0 : _0x3a3f72.type) ===
          undefined
      ) {
        return emit('DoLongHudText', 'You need an oil barrel', 2)
      }
      const _0x46de96 = await _0x32035f.execute('ev-oilers:storage:returnBarrel', _0x3a3f72)
      emit('DoLongHudText',
        _0x46de96 ? 'Returned Barrel Successfully' : 'Failed to return barrel',
        _0x46de96 ? 1 : 2
      )
    })
    on(
      'ev-oilers:storage:returnTanker',
      async (_0x1bef76, _0x2d3a7e, _0xfb9e7b) => {
        const _0x4debdb = NetworkGetNetworkIdFromEntity(_0x2d3a7e),
          _0x4fa2d1 = await _0x32035f.execute(
            'ev-oilers:storage:returnTanker',
            _0x4debdb
          )
        emit(
          'DoLongHudText',
          _0x4fa2d1 ? 'Returned Tanker Successfully' : 'Failed to Return Tanker',
          _0x4fa2d1 ? 1 : 2
        )
      }
    )
    on('ev-oilers:storage:openTankerInfoMenu', (_0x5c011c, _0x1bd1bf, _0x4fd2cc) => {
        var _0x334812
        const _0x36fad8 =
          (_0x334812 =
            _0x4fd2cc === null || _0x4fd2cc === void 0
              ? void 0
              : _0x4fd2cc.meta) === null || _0x334812 === void 0
            ? void 0
            : _0x334812.oil
        _0x22a8bb(_0x36fad8)
      }
    )
    const _0x35bda8 = (_0x58a80f, _0x425205 = 0) => {
        const _0x2b55a6 = {
          barrel: 5000,
          tanker: 100000,
        }
        const _0x21ef64 = _0x2b55a6,
          _0xe95eec = {
            barrel: 3000,
            tanker: 5000,
          }
        const _0x37757f = _0xe95eec,
          _0x26e1fe = {
            title: 'Withdraw from Storage',
            description: '',
            icon: 'minus-circle',
            children: [
              {
                title: 'Store in Barrel',
                description: 'Deposit: $' + _0x3d3c9d(_0x37757f.barrel) + ' | Capacity: ' + _0x3d3c9d(_0x21ef64.barrel) + ' gallons',
                icon: 'dolly-flatbed',
                key: {
                  method: 'barrel',
                  meta: _0x58a80f,
                  available: _0x425205,
                  capacity: _0x21ef64.barrel,
                  deposit: _0x37757f.barrel,
                },
                action: 'ev-oilers:storage:withdrawOil',
              },
              {
                title: 'Load into Tanker',
                description: 'Deposit: $' + _0x3d3c9d(_0x37757f.tanker) + ' | Capacity: ' + _0x3d3c9d(_0x21ef64.tanker) + ' gallons',
                icon: 'truck-moving',
                key: {
                  method: 'tanker',
                  meta: _0x58a80f,
                  available: _0x425205,
                  capacity: _0x21ef64.tanker,
                  deposit: _0x37757f.tanker,
                },
                action: 'ev-oilers:storage:withdrawOil',
              },
            ],
          }
        return _0x26e1fe
      },
      _0x37021c = (_0x55f3f8, _0x15af26) => {
        const _0x5a6ff1 = {
          title: 'Storage Actions',
          description: '',
          icon: 'info-circle',
          children: [],
        }
        const _0x49b573 = [_0x5a6ff1]
        return _0x49b573.push(_0x35bda8(_0x55f3f8, _0x15af26)), _0x49b573
      },
      _0x5b40ae = async () => {
        const _0x25b255 = exports.isPed.isPed('cid'),
          _0xab10f8 = await _0x32035f.execute('ev-oilers:getStorageInfo', _0x25b255),
          _0x86b9f2 = {
            icon: 'info-circle',
            title: 'Ron Oil Storage',
            description: '',
            action: '',
            key: {},
          }
        const _0x37fd0b = { type: 'crudeOil' }
        const _0x1491f5 = {
          type: 'regular',
          octane: 87,
          grade: 4,
        }
        const _0x1ef891 = [
          _0x86b9f2,
          {
            icon: 'oil-can',
            title: 'Crude Oil',
            description:
              (_0xab10f8 === null || _0xab10f8 === void 0
                ? void 0
                : _0xab10f8.crudeOil.toFixed(2)) + ' Gallons',
            action: '',
            key: {},
            children: _0x37021c(
              _0x37fd0b,
              _0xab10f8 === null || _0xab10f8 === void 0
                ? void 0
                : _0xab10f8.crudeOil
            ),
          },
          {
            icon: 'burn',
            title: 'Gasoline (Regular)',
            description:
              (_0xab10f8 === null || _0xab10f8 === void 0
                ? void 0
                : _0xab10f8.regularGas.toFixed(2)) + ' Gallons',
            action: '',
            key: {},
            children: _0x37021c(
              _0x1491f5,
              _0xab10f8 === null || _0xab10f8 === void 0
                ? void 0
                : _0xab10f8.regularGas
            ),
          },
        ]
        _0x115c9b.g.exports['ev-ui'].showContextMenu(_0x1ef891)
      },
      _0x22a8bb = (_0xec68ae) => {
        let _0x5f32f1 = ''
        for (const [_0x461f20, _0xe6e589] of Object.entries(_0xec68ae)) {
          if (_0x461f20 === 'type' || _0x461f20 === 'owner') {
            continue
          }
          _0x5f32f1 += _0x2e2214(_0x461f20) + ': ' + _0xe6e589 + ' | '
        }
        _0x5f32f1 = _0x5f32f1.slice(0, -2)
        const _0x112127 = {
          icon: 'info-circle',
          title: 'Tanker Information',
          description: '',
          action: '',
          key: {},
        }
        const _0x7a7a0d = [
          _0x112127,
          {
            icon: 'info-circle',
            title: 'Stored Oil: ' + _0x2e2214(_0xec68ae.type),
            description: _0x5f32f1,
            action: '',
            key: {},
          },
        ]
        _0x115c9b.g.exports['ev-ui'].showContextMenu(_0x7a7a0d)
      }
    async function _0x5d2b57() {
      await _0x32035f.execute('ev-datagrid:subscribe', 'oilers')
      _0x501a81.on('ev-oilers:openCrafting', () => {
        emit('server-inventory-open', '42128', 'Craft')
      })
      _0x501a81.on('ev-oilers:viewStorage', () => {
        return _0x5b40ae()
      })
      onNet('ev-oilers:playMachineAlarm', async (coords) => {
        return _0x21525f(coords)
      })
    }
    const _0x2ca867 = () => {
      const _0x5b6eec = {
        CPXEvent: 'ev-oilers:viewPumpInfo',
        id: 'view_pump_info',
        icon: 'search',
        label: 'View Pump Info',
        parameters: {},
      }
      const _0x859c4a = {
        CPXEvent: 'ev-oilers:updatePumpSettings',
        id: 'update_pump_settings',
        icon: 'wrench',
        label: 'Modify Pump Settings',
        parameters: {},
      }
      const _0x28ddb2 = {
        CPXEvent: 'ev-oilers:openPartsInventory',
        id: 'open_parts_inventory',
        icon: 'hammer',
        label: 'Manage Parts',
        parameters: {},
      }
      const _0x93f3e4 = { radius: 4 }
      exports['ev-interact'].AddPeekEntryByModel(
        [GetHashKey('p_oil_pjack_03_s')],
        [_0x5b6eec, _0x859c4a, _0x28ddb2],
        {
          distance: _0x93f3e4,
          isEnabled: (_0xfc070f) => {
            const _0x406d21 = exports['ev-objects'].GetObjectByEntity(_0xfc070f),
              _0x308735 = IsPedInAnyVehicle(PlayerPedId(), false)
            return (
              _0x406d21 &&
              _0x406d21.data.metadata &&
              _0x406d21.data.metadata.pumpId &&
              !_0x308735
            )
          },
        }
      )
    }
    const _0x1aa241 = {
      id: 'oilers:storage:barrelInvMenu',
      label: 'barrel inventory',
      icon: 'boxes',
      event: 'ev-oilers:storage:showBarrelInv',
      parameters: {},
    }
    const _0x4f8c17 = {
      id: 'oilers:storage:returnBarrel',
      label: 'return barrel',
      icon: 'exchange-alt',
      event: 'ev-oilers:storage:returnBarrel',
      parameters: {},
    }
    const _0x430ba3 = { radius: 2.5 }
    const _0x5cbc5c = { oilers: true }
    const _0x3a73e4 = {
      distance: _0x430ba3,
      meta: _0x5cbc5c,
      isEnabled: async () => {
        return true
      },
    }
    const _0xe2876 = {
      type: 'model',
      group: [-28420472],
      data: [_0x1aa241, _0x4f8c17],
      options: _0x3a73e4,
    }
    const _0x12c596 = {
      id: 'oilers:storage:returnTanker',
      label: 'return tanker',
      icon: 'exchange-alt',
      event: 'ev-oilers:storage:returnTanker',
      parameters: {},
    }
    const _0x51abd9 = {
      id: 'oilers:storage:tankerInfo',
      label: 'tanker information',
      icon: 'info-circle',
      event: 'ev-oilers:storage:openTankerInfoMenu',
      parameters: {},
    }
    const _0x2304eb = { radius: 8 }
    const _0x4972f1 = {
      distance: _0x2304eb,
      isEnabled: (_0x48d2bb, _0x2c1626) => {
        var _0x261168
        return (
          ((_0x261168 =
            _0x2c1626 === null || _0x2c1626 === void 0
              ? void 0
              : _0x2c1626.meta) === null || _0x261168 === void 0
            ? void 0
            : _0x261168.oil) !== undefined
        )
      },
    }
    const _0x23ba9f = {
      type: 'model',
      group: [-1320147046],
      data: [_0x51abd9],
      options: _0x4972f1,
    }
    const _0x19ebf9 = [
      _0xe2876,
      {
        type: 'model',
        group: [-1320147046],
        data: [_0x12c596],
        options: {
          isEnabled: async () => {
            return _0x5403df.isActive('oilers_tanker_dropoff')
          },
        },
      },
      _0x23ba9f,
    ]
    function _0x2555b4() {
      _0x19ebf9.forEach((_0x3f04d8) => {
        if (_0x3f04d8.type === 'entity') {
          exports['ev-interact'].AddPeekEntryByEntityType(
            _0x3f04d8.group,
            _0x3f04d8.data,
            _0x3f04d8.options
          )
        } else {
          if (_0x3f04d8.type === 'polytarget') {
            exports['ev-interact'].AddPeekEntryByPolyTarget(
              _0x3f04d8.group,
              _0x3f04d8.data,
              _0x3f04d8.options
            )
          } else {
            if (_0x3f04d8.type === 'model') {
              exports['ev-interact'].AddPeekEntryByModel(
                _0x3f04d8.group,
                _0x3f04d8.data,
                _0x3f04d8.options
              )
            }
          }
        }
      })
      const _0x5d5df1 = {
        x: 1737.37,
        y: -1538.27,
        z: 112.62,
      }
      const _0x534a7f = {
        heading: 341,
        minZ: 111.12,
        maxZ: 116.32,
      }
      _0x5403df.addBoxZone(
        'tanker_01',
        'oilers_tanker_dropoff',
        _0x5d5df1,
        20.4,
        16.6,
        _0x534a7f
      )
    }
    on('ev-inventory:itemUsed', async (_0x1369cf, _0x1c3cf0) => {
      if (_0x1369cf !== 'oilpump') {
        return
      }
      const _0x3c59ae = await exports['ev-business'].HasPermission('ron_oil', 'craft_access')
      if (!_0x3c59ae) {
        return
      }
      const _0x2f5e64 = {
        name: 'pumpId',
        label: 'Pump Name',
        icon: 'signature',
      }
      _0x2f5e64['_type'] = 'string'
      _0x2f5e64['_defaultValue'] = ''
      const _0x23fcc5 = [_0x2f5e64],
        _0x28a544 = await exports['ev-ui'].OpenInputMenu(_0x23fcc5)
      if (!_0x28a544) {
        return
      }
      if (
        !(_0x28a544 === null || _0x28a544 === void 0
          ? void 0
          : _0x28a544.pumpId) ||
        (_0x28a544 === null || _0x28a544 === void 0
          ? void 0
          : _0x28a544.pumpId.length) < 3
      ) {
        return emit('DoLongHudText', 'Invalid pump id', 2)
      }
      const _0x4547bf = {
          createdAt: Date.now(),
          speed: 1,
          oilStorage: 0,
          belt: 0,
          clutch: 0,
          polishedRod: 0,
          pumpId:
            _0x28a544 === null || _0x28a544 === void 0
              ? void 0
              : _0x28a544.pumpId,
        },
        _0x3cb5bf = () => true,
        _0x2edb30 = {
          collision: false,
          groundSnap: false,
          forceGroundSnap: false,
          useModelOffset: false,
          adjustZ: true,
        }
      const _0x3eeed0 = await exports['ev-objects'].PlaceAndSaveObject(
          'p_oil_pjack_03_s',
          _0x4547bf,
          _0x2edb30,
          _0x3cb5bf,
          'oilers'
        ),
        [_0x56363f, _0x5a7c02] = await _0x32035f.execute(
          'ev-oilers:createPump',
          _0x3eeed0
        )
      if (!_0x56363f) {
        await exports['ev-objects'].DeleteObject(_0x3eeed0)
      } else {
        emit('inventory:removeItem', 'oilpump', 1)
      }
      return emit('DoLongHudText', _0x5a7c02, _0x56363f ? 1 : 2)
    })
    _0x501a81.on('ev-oilers:viewPumpInfo', (_0x593a51, _0x278209, _0x2adf5b) => {
      return _0x5dee00(_0x2adf5b.meta.data.metadata.pumpId)
    })
    _0x501a81.on('ev-oilers:updatePumpSettings', (_0x1d2c69, _0xd1d24, _0x28b6da) => {
        var _0x257877, _0x1e1f91
        const _0x2fe56f =
            (_0x1e1f91 =
              (_0x257877 = _0x28b6da.meta.data) === null || _0x257877 === void 0
                ? void 0
                : _0x257877.metadata) === null || _0x1e1f91 === void 0
              ? void 0
              : _0x1e1f91.assignedTo,
          _0x578b6a = exports.isPed.isPed('cid')
        if (!_0x2fe56f || _0x2fe56f.id !== _0x578b6a) {
          return emit('DoLongHudText', 'Seems like I cant do this...', 2)
        }
        return _0x270df3(_0x28b6da.meta.data.metadata.pumpId)
      }
    )
    RegisterUICallback('ev-oilers:pumpOilToStorage', async (_0x29b437, _0x516a99) => {
        var _0x71a58e
        const _0x459fa6 = {
          ok: false,
          message: '',
        }
        const _0xb61733 = {
          data: [],
          meta: _0x459fa6,
        }
        _0x516a99(_0xb61733)
        const _0x300a33 =
          (_0x71a58e = _0x29b437.key) === null || _0x71a58e === void 0
            ? void 0
            : _0x71a58e.pumpId
        if (!_0x300a33) {
          return emit('DoLongHudText', 'Unkown pump', 2)
        }
        const [_0x5dec0c, _0x5a5144] = await _0x32035f.execute('ev-oilers:pumpToStorage', _0x300a33)
        emit('DoLongHudText', _0x5a5144, _0x5dec0c ? 1 : 2)
      }
    )
    RegisterUICallback('ev-oilers:assignPump', async (data, cb) => {
      var _0x131222
      const _0x415e5d = {
        ok: false,
        message: '',
      }
      const _0x43d720 = {
        data: [],
        meta: _0x415e5d,
      }
      cb(_0x43d720)
      await _0x3f9230(200)
      const _0x278c63 =
        (_0x131222 = data.key) === null || _0x131222 === void 0
          ? void 0
          : _0x131222.pumpId
      if (!_0x278c63) {
        return emit('DoLongHudText', 'Unkown pump', 2)
      }
      const _0x225505 = {
        name: 'cid',
        label: 'State ID',
        icon: 'id-card',
      }
      _0x225505['_type'] = 'number'
      const _0x331ffa = [_0x225505],
        _0x4e2245 = await exports['ev-ui'].OpenInputMenu(_0x331ffa)
      if (!_0x4e2245) {
        return
      }
      const [_0x2f6ac2, _0x3bfc8c] = await _0x32035f.execute('ev-oilers:assignPump', _0x278c63, Number(_0x4e2245.cid))
      emit('DoLongHudText', _0x3bfc8c, _0x2f6ac2 ? 1 : 2)
    })
    RegisterUICallback('ev-oilers:viewWeeklyReport', async (data, cb) => {
        var _0x3ef00c
        const _0x172976 = {
          ok: false,
          message: '',
        }
        const _0x255e88 = {
          data: [],
          meta: _0x172976,
        }
        cb(_0x255e88)
        const _0x397690 =
          (_0x3ef00c = data.key) === null || _0x3ef00c === void 0
            ? void 0
            : _0x3ef00c.pumpId
        if (!_0x397690) {
          return emit('DoLongHudText', 'Unkown pump', 2)
        }
        const [_0x2b96d9, _0x38e743, _0x3b9b53] = await _0x32035f.execute('ev-oilers:viewWeeklyReport', _0x397690)
        emit('DoLongHudText', _0x38e743, _0x2b96d9 ? 1 : 2, 12000, _0x3b9b53)
      }
    )
    _0x501a81.on('ev-oilers:openPartsInventory', (_0x2ed456, _0x62cf66) => {
      var _0x17510c, _0x1da1ef, _0x229fbe, _0x4a9510
      const _0x478a9e = exports['ev-objects'].GetObjectByEntity(_0x62cf66),
        _0x5ea496 =
          (_0x1da1ef =
            (_0x17510c =
              _0x478a9e === null || _0x478a9e === void 0
                ? void 0
                : _0x478a9e.data) === null || _0x17510c === void 0
              ? void 0
              : _0x17510c.metadata) === null || _0x1da1ef === void 0
            ? void 0
            : _0x1da1ef.pumpId
      if (!_0x5ea496) {
        return
      }
      const _0x5059ea =
          (_0x4a9510 =
            (_0x229fbe = _0x478a9e.data) === null || _0x229fbe === void 0
              ? void 0
              : _0x229fbe.metadata) === null || _0x4a9510 === void 0
            ? void 0
            : _0x4a9510.assignedTo,
        _0x733b4a = exports.isPed.isPed('cid')
      if (!_0x5059ea || _0x5059ea.id !== _0x733b4a) {
        return emit('DoLongHudText', 'Seems like I cant do this...', 2)
      }
      return emit('inventory-open-container', 'container_' + _0x5ea496 + '_Oil-pumpinventory', 5, 30)
    })
    on('ev-inventory:closed', async (_0x355102) => {
      if (!_0x355102.endsWith('_Oil-pumpinventory')) {
        return
      }
      const _0x35af9a = _0x355102.split('_')[1]
      if (!_0x35af9a) {
        return
      }
      const [_0x4543a0, _0x3b6628] = await _0x32035f.execute('ev-oilers:applyPumpParts', _0x35af9a)
      emit('DoLongHudText', _0x3b6628, _0x4543a0 ? 1 : 2)
    })
    const _0x212a1a = new Map()
    on('ev-objects:objectCreated', async (_0x567515, _0x1eae7a) => {
      if (_0x567515.ns !== 'oilers') {
        return
      }
      _0x3f5b55(_0x567515.data.metadata, _0x1eae7a)
      _0x212a1a.set(_0x567515.id, _0x1eae7a)
    })
    on('ev-objects:objectUpdated', async (_0x56b54b) => {
      if (_0x56b54b.ns !== 'oilers') {
        return
      }
      _0x3f5b55(_0x56b54b.data.metadata, _0x212a1a.get(_0x56b54b.id))
    })
    on('ev-objects:objectDeleted', async (_0x3429f1) => {
      if (_0x3429f1.ns !== 'oilers') {
        return
      }
      DeleteEntity(_0x212a1a.get(_0x3429f1.id))
      _0x212a1a.delete(_0x3429f1.id)
    })
    const _0x5dee00 = async (_0xdc7dec) => {
        var _0xabdbd8, _0x37bdfc, _0x23b8aa
        if (!_0xdc7dec) {
          return
        }
        const _0x3719d3 = await _0x32035f.execute('ev-oilers:getPumpInfo', _0xdc7dec),
          _0x24349e = await exports['ev-objects'].GetObject(_0x3719d3.objUUID),
          _0x7a1787 = [
            {
              icon: 'hard-hat',
              title: _0xdc7dec.split('-').join(' ') + ' Information',
              action: '',
              key: {},
            },
            {
              icon: 'tachometer-alt',
              title: 'Speed',
              description:
                _0x2295fb(
                  (_0xabdbd8 =
                    _0x3719d3 === null || _0x3719d3 === void 0
                      ? void 0
                      : _0x3719d3.settings) === null || _0xabdbd8 === void 0
                    ? void 0
                    : _0xabdbd8.speed
                ) + ' MPH',
              action: '',
              key: {},
            },
            {
              icon: 'clock',
              title: 'Duration',
              description: _0x944df8(
                (_0x23b8aa =
                  (_0x37bdfc =
                    _0x24349e === null || _0x24349e === void 0
                      ? void 0
                      : _0x24349e.data) === null || _0x37bdfc === void 0
                    ? void 0
                    : _0x37bdfc.metadata) === null || _0x23b8aa === void 0
                  ? void 0
                  : _0x23b8aa.createdAt
              ),
              action: '',
              key: {},
            },
            {
              icon: 'thermometer-three-quarters',
              title: 'Tempature',
              description:
                (_0x3719d3 === null || _0x3719d3 === void 0
                  ? void 0
                  : _0x3719d3.tempature) + ' \xB0C',
              action: '',
              key: {},
            },
            {
              icon: 'oil-can',
              title: 'Oil Storage',
              description:
                (_0x3719d3 === null || _0x3719d3 === void 0
                  ? void 0
                  : _0x3719d3.oilStorage
                ).toFixed(2) + ' Gallons (1000 Gallons Max)',
              action: '',
              key: {},
            },
            {
              icon: 'oil-can',
              title: 'Part Information',
              description: _0x3719d3.partInformation,
              action: '',
              key: {},
            },
          ],
          _0x28dcdd = await exports['ev-business'].HasPermission('ron_oil', 'craft_access')
        if (_0x28dcdd) {
          const _0xa3927a = { pumpId: _0xdc7dec }
          const _0x15787a = {
            icon: 'user',
            title: 'Assign Pump',
            description: '',
            action: 'ev-oilers:assignPump',
            key: _0xa3927a,
          }
          _0x7a1787.push(_0x15787a)
          const _0x587c33 = { pumpId: _0xdc7dec }
          const _0x5cb0c8 = {
            icon: 'info',
            title: 'View Weekly Report',
            description: '',
            action: 'ev-oilers:viewWeeklyReport',
            key: _0x587c33,
          }
          _0x7a1787.push(_0x5cb0c8)
        }
        const _0x27aa41 = exports.isPed.isPed('cid')
        if (
          (_0x3719d3.assignedTo &&
            _0x3719d3.assignedTo.id === Number(_0x27aa41)) ||
          _0x28dcdd
        ) {
          const _0x50f22f = { pumpId: _0xdc7dec }
          const _0x5b6d04 = {
            icon: 'oil-can',
            title: 'Pump Oil To Storage',
            description: '',
            action: 'ev-oilers:pumpOilToStorage',
            key: _0x50f22f,
          }
          _0x7a1787.push(_0x5b6d04)
        }
        exports['ev-ui'].showContextMenu(_0x7a1787)
      },
      _0x3f5b55 = async (_0x33af56, _0x1ee962) => {
        const _0x16a366 =
          _0x33af56 === null || _0x33af56 === void 0 ? void 0 : _0x33af56.speed
        SetEntityAnimSpeed(
          _0x1ee962,
          'p_v_lev_des_skin',
          'p_oil_pjack_03_s',
          _0x39ffb5(_0x16a366)
        )
      },
      _0x270df3 = async (_0x39676f) => {
        if (!_0x39676f) {
          return
        }
        const _0x253767 = await _0x32035f.execute('ev-oilers:getPumpInfo', _0x39676f)
        if (!_0x253767) {
          return
        }
        const _0x23cd24 = {
          name: 'pumpSpeed',
          label: 'Pump Speed (0-100%)',
          icon: 'time',
        }
        _0x23cd24['_type'] = 'number'
        _0x23cd24['_defaultValue'] = _0x253767.settings.speed
        const _0x29e486 = [_0x23cd24],
          _0x487fe8 = await exports['ev-ui'].OpenInputMenu(_0x29e486)
        if (!_0x487fe8) {
          return
        }
        if (
          !_0x487fe8.pumpSpeed ||
          isNaN(_0x487fe8.pumpSpeed) ||
          _0x487fe8.pumpSpeed < 0 ||
          _0x487fe8.pumpSpeed > 100
        ) {
          return emit('DoLongHudText', 'Please enter a valid pump speed.', 2)
        }
        const _0x1039cf = parseInt(_0x487fe8.pumpSpeed),
          _0x10b579 = { speed: _0x1039cf }
        const _0x5519e2 = await _0x32035f.execute('ev-oiler:updatePumpInfo', _0x39676f, _0x10b579)
        _0x5519e2 && emit('DoLongHudText', 'Pump has successfully updated', 1)
      }
    RegisterUICallback('ev-oilers:startBlending', (data, cb) => {
      _0x34a3dd()
      const _0x27fe74 = {
        ok: false,
        message: '',
      }
      const _0x53b085 = {}
      return (
        (_0x53b085.data = []), (_0x53b085.meta = _0x27fe74), cb(_0x53b085)
      )
    })
    _0x501a81.on('ev-oilers:viewBlendingPool', () => {
      return _0x249434()
    })
    const _0x34a3dd = async () => {
        const _0x1ec7ab = exports.isPed.isPed('cid'),
          _0x5ae21d = await _0x32035f.execute('ev-oilers:getBlenderInfo', _0x1ec7ab)
        if (_0x5ae21d.active) {
          return emit('DoLongHudText', 'Blending pool is already running', 2)
        }
        const _0x1ceff7 = {
          name: 'heavyNaphtha',
          label: 'Heavy Naphtha (0-100%)',
          icon: 'burn',
        }
        _0x1ceff7['_type'] = 'number'
        const _0x5d8dd1 = {
          name: 'lightNaphtha',
          label: 'Light Naphtha (0-100%)',
          icon: 'burn',
        }
        _0x5d8dd1['_type'] = 'number'
        const _0x36959a = {
          name: 'gas',
          label: 'Other Gases (0-100%)',
          icon: 'burn',
        }
        _0x36959a['_type'] = 'number'
        const _0x25341c = {
          name: 'amount',
          label: 'Output Amount (gallons)',
          icon: 'burn',
        }
        _0x25341c['_type'] = 'number'
        const _0x57464c = [_0x1ceff7, _0x5d8dd1, _0x36959a, _0x25341c],
          _0x3af5b5 = await exports['ev-ui'].OpenInputMenu(_0x57464c)
        if (!_0x3af5b5) {
          return
        }
        const _0x5e6394 = Number(_0x3af5b5.gas),
          _0x67970d = Number(_0x3af5b5.heavyNaphtha),
          _0x8828ba = Number(_0x3af5b5.lightNaphtha),
          _0x5617d5 = _0x3af5b5.amount,
          _0x23876c = _0x5e6394 + _0x67970d + _0x8828ba
        if (_0x23876c !== 100) {
          return emit('DoLongHudText', 'Total between all amounts must be 100%', 2)
        }
        if (_0x5617d5 < 100) {
          return emit('DoLongHudText', 'Amount must be at least 100 gallons', 2)
        }
        const _0x434145 = {
          gas: _0x5e6394,
          heavyNaphtha: _0x67970d,
          lightNaphtha: _0x8828ba,
          amount: _0x5617d5,
        }
        const [_0x169291, _0x260996] = await _0x32035f.execute('ev-oilers:startBlending', _0x1ec7ab, _0x434145)
        emit('DoLongHudText', _0x260996, _0x169291 ? 1 : 2)
      },
      _0x249434 = async () => {
        const _0x1b88c0 = exports.isPed.isPed('cid'),
          _0xe268e7 = await _0x32035f.execute('ev-oilers:getBlenderInfo', _0x1b88c0)
        if (!_0xe268e7) {
          return emit('DoLongHudText', 'Seems like you dont have a blending pool currently...', 2)
        }
        const _0x4f7f5b = {
          icon: 'info-circle',
          title:
            'Blending Pool Info (' +
            (_0xe268e7.active ? 'Active' : 'Inactive') +
            ')',
          description: '',
          action: '',
          key: {},
        }
        const _0x190a43 = {
          icon: 'circle',
          title: 'Heavy Naphtha',
          description:
            'Current Level: ' + _0xe268e7.heavyNaphthaLevel + ' Gallons',
          action: '',
          key: {},
        }
        const _0x1e9008 = {
          icon: 'circle',
          title: 'Light Naphtha',
          description:
            'Current Level: ' + _0xe268e7.lightNaphthaLevel + ' Gallons',
          action: '',
          key: {},
        }
        const _0x305a61 = {
          icon: 'circle',
          title: 'Other Gases',
          description: 'Current Level: ' + _0xe268e7.otherGasLevel + ' Gallons',
          action: '',
          key: {},
        }
        const _0x21e6cb = {
          icon: 'sync',
          title: 'Start Blending',
          description: '',
          disabled: _0xe268e7.active,
          action: 'ev-oilers:startBlending',
          key: {},
        }
        const _0x342f80 = [_0x4f7f5b, _0x190a43, _0x1e9008, _0x305a61, _0x21e6cb]
        _0x115c9b.g.exports['ev-ui'].showContextMenu(_0x342f80)
      }
    _0x501a81.on('ev-oilers:viewDistillation', () => {
      return _0x30506d()
    })
    RegisterUICallback('ev-oilers:pumpDistillation', async (data, cb) => {
        _0x24c54f()
        const _0x284db0 = {
          ok: false,
          message: '',
        }
        const _0x4af01c = {
          data: [],
          meta: _0x284db0,
        }
        cb(_0x4af01c)
      }
    )
    RegisterUICallback('ev-oilers:forceStopPumping', async (data, cb) => {
        const _0x345338 = exports.isPed.isPed('cid')
        _0x501a81.emitNet('ev-oilers:forceStopPump', _0x345338)
        const _0x1a4bf5 = {
          ok: false,
          message: '',
        }
        const _0x553c63 = {
          data: [],
          meta: _0x1a4bf5,
        }
        cb(_0x553c63)
      }
    )
    RegisterUICallback('ev-oilers:changeDistillationTemp', async (data, cb) => {
        _0x1f6e63()
        const _0xb4e822 = {
          ok: false,
          message: '',
        }
        const _0x1f6224 = {
          data: [],
          meta: _0xb4e822,
        }
        cb(_0x1f6224)
      }
    )
    RegisterUICallback('ev-oilers:toggleDistillation', async (data, cb) => {
        const _0x2c6889 = exports.isPed.isPed('cid')
        _0x501a81.emitNet('ev-oilers:toggleDistillation', _0x2c6889)
        const _0x16a518 = {
          ok: false,
          message: '',
        }
        const _0x3d211d = {
          data: [],
          meta: _0x16a518,
        }
        cb(_0x3d211d)
      }
    )
    const _0x30506d = async () => {
        const _0x4e22d5 = exports.isPed.isPed('cid'),
          _0x37b6da = await _0x32035f.execute('ev-oilers:getDistillationInfo', _0x4e22d5)
        if (!_0x37b6da) {
          return emit('DoLongHudText', 'Seems like you dont have a distillation machine.', 2)
        }
        const _0x3c99ac = {
          icon: 'info-circle',
          title:
            'Atmospheric Distillation (' +
            (_0x37b6da.active ? 'Active' : 'Inactive') +
            ')',
          description: '',
          action: '',
          key: {},
        }
        const _0x45d21a = {
          icon: 'thermometer-three-quarters',
          title: 'Tempature',
          description:
            (_0x37b6da === null || _0x37b6da === void 0
              ? void 0
              : _0x37b6da.tempature) + ' \xB0C',
          action: '',
          key: {},
        }
        const _0x2bc6b2 = {
          icon: 'oil-can',
          title: 'Crude Oil',
          description:
            (_0x37b6da === null || _0x37b6da === void 0
              ? void 0
              : _0x37b6da.crudeOil) + ' Gallons',
          action: '',
          key: {},
        }
        const _0x44093d = {
          icon: 'sync',
          title: 'Pump Crude Oil',
          description: '',
          action: 'ev-oilers:pumpDistillation',
          key: {},
        }
        const _0x33f704 = {
          icon: 'thermometer-three-quarters',
          title: 'Change Tempature',
          description: '',
          action: 'ev-oilers:changeDistillationTemp',
          key: {},
        }
        const _0x38233d = {
          icon: 'sync',
          title: 'Toggle Distillation',
          description: '',
          action: 'ev-oilers:toggleDistillation',
          key: {},
        }
        const _0x101151 = {
          icon: 'exclamation-circle',
          title: 'Force Stop Pumping',
          description: '',
          action: 'ev-oilers:forceStopPumping',
          key: {},
        }
        const _0x17fb19 = [
          _0x3c99ac,
          _0x45d21a,
          _0x2bc6b2,
          _0x44093d,
          _0x33f704,
          _0x38233d,
          _0x101151,
        ]
        _0x115c9b.g.exports['ev-ui'].showContextMenu(_0x17fb19)
      },
      _0x24c54f = async () => {
        await _0x3f9230(200)
        const _0x57dffc = {
          name: 'amount',
          label: 'Amount of gallons to pump',
          icon: 'time',
        }
        _0x57dffc['_type'] = 'number'
        _0x57dffc['_defaultValue'] = 0
        const _0x5173e6 = [_0x57dffc],
          _0x289e86 = await exports['ev-ui'].OpenInputMenu(_0x5173e6)
        if (!_0x289e86) {
          return
        }
        const _0x15c3a5 = exports.isPed.isPed('cid')
        _0x501a81.emitNet('ev-oilers:pumpOilToDistillation', _0x15c3a5, Number(_0x289e86.amount))
      },
      _0x1f6e63 = async () => {
        await _0x3f9230(200)
        const _0x1243f9 = exports.isPed.isPed('cid'),
          _0x346102 = await _0x32035f.execute('ev-oilers:getDistillationInfo', _0x1243f9)
        if (!_0x346102) {
          return emit('DoLongHudText', 'Seems like you have a distillation machine.', 2)
        }
        const _0x3e6171 = {
          name: 'temperature',
          label: 'Temperature \xB0C',
          icon: 'thermometer-three-quarters',
        }
        _0x3e6171['_type'] = 'number'
        _0x3e6171['_defaultValue'] = _0x346102.tempature
        const _0x876bd3 = [_0x3e6171],
          _0x4ab9eb = await exports['ev-ui'].OpenInputMenu(_0x876bd3)
        if (!_0x4ab9eb) {
          return
        }
        _0x501a81.emitNet('ev-oilers:changeDistillationTemp', _0x1243f9, Math.round(Number(_0x4ab9eb.temperature)))
      }
    RegisterCommand('ev-oilers:updatePump', async (_0xd8ae95, _0x2f3155) => {
        const _0x4c29bc = await _0x4bd344('ron_corp')
        if (!_0x4c29bc) {
          return console.log('not employed')
        }
        if (!_0x2f3155[0]) {
          return console.log('No model passed')
        }
        const { selectedEntity: _0x324df1 } =
          _0x115c9b.g.exports['ev-selector'].getCurrentSelection()
        _0x115c9b.g.exports['ev-selector'].deselect()
        if (!_0x324df1) {
          return console.log('No entity selected')
        }
        const _0x5896f9 =
          _0x115c9b.g.exports['ev-objects'].GetObjectByEntity(_0x324df1)
        if (!_0x5896f9) {
          return console.log('No object found')
        }
        if (_0x5896f9.data.metadata.type !== 'pump') {
          return console.log('Not a pump')
        }
        const _0x50f36f = await _0x115c9b.g.exports['ev-objects'].UpdateObject(
          _0x5896f9.id,
          {},
          _0x2f3155[0]
        )
        console.log(_0x50f36f, _0x5896f9.id)
      },
      false
    )
    RegisterCommand('ev-oilers:selectEntity', async () => {
        const _0x49a3b5 = await _0x4bd344('ron_corp')
        if (!_0x49a3b5) {
          return console.log('not employed')
        }
        _0x115c9b.g.exports['ev-selector'].startSelecting(
          -1,
          PlayerPedId(),
          () => true
        )
      },
      false
    )
    const _0x42ef89 = () => {
      const _0x3c3be8 = {
        x: 1682.71,
        y: -1699.85,
        z: 112.54,
      }
      const _0x6aae43 = { id: 'roncorp_blender' }
      const _0xeeabc = {
        heading: 12,
        minZ: 111.39,
        maxZ: 112.99,
        data: _0x6aae43,
      }
      _0x115c9b.g.exports['ev-polytarget'].AddBoxZone(
        'roncorp_blender',
        _0x3c3be8,
        1.6,
        1,
        _0xeeabc
      )
      const _0x4ce93a = {
        CPXEvent: 'ev-oilers:viewBlendingPool',
        id: 'roncorp_blending_view',
        icon: 'sync',
        label: 'View Blending Pool',
      }
      const _0x1ad970 = { radius: 3.5 }
      const _0x1a86c2 = {
        distance: _0x1ad970,
        isEnabled: async () => {
          return true
        },
      }
      _0x115c9b.g.exports['ev-interact'].AddPeekEntryByPolyTarget('roncorp_blender',
        [_0x4ce93a],
        _0x1a86c2
      )
      const _0x309507 = {
        x: 1673.36,
        y: -1649.92,
        z: 111.35,
      }
      const _0x550831 = { id: 'roncorp_distillation' }
      const _0x587d9c = {
        heading: 10,
        minZ: 110.35,
        maxZ: 111.75,
        data: _0x550831,
      }
      _0x115c9b.g.exports['ev-polytarget'].AddBoxZone('roncorp_distillation',
        _0x309507,
        0.8,
        1.6,
        _0x587d9c
      )
      const _0x3bccb4 = {
        CPXEvent: 'ev-oilers:viewDistillation',
        id: 'roncorp_distillation_view',
        icon: 'sync',
        label: 'View Distillation',
      }
      const _0x54c354 = { radius: 3.5 }
      _0x115c9b.g.exports['ev-interact'].AddPeekEntryByPolyTarget('roncorp_distillation',
        [_0x3bccb4],
        {
          distance: _0x54c354,
          isEnabled: async () => {
            return true
          },
        }
      )
      const _0xbb33f = {
        x: 1750.57,
        y: -1610.64,
        z: 112.63,
      }
      const _0xc58208 = { id: 'roncorp_crafting' }
      const _0x3406e6 = {
        heading: 11,
        minZ: 111.63,
        maxZ: 113.83,
        data: _0xc58208,
      }
      _0x115c9b.g.exports['ev-polytarget'].AddBoxZone('roncorp_crafting',
        _0xbb33f,
        4,
        1.4,
        _0x3406e6
      )
      const _0x50ef60 = {
        CPXEvent: 'ev-oilers:openCrafting',
        id: 'roncorp_craft',
        icon: 'hammer',
        label: 'Open Workstation',
      }
      const _0x3ee3ff = { radius: 3.5 }
      _0x115c9b.g.exports['ev-interact'].AddPeekEntryByPolyTarget(
        'roncorp_crafting',
        [_0x50ef60],
        {
          distance: _0x3ee3ff,
          isEnabled: async () => {
            const _0x5dfbfa = await exports['ev-business'].HasPermission('ron_oil', 'craft_access')
            return _0x5dfbfa
          },
        }
      )
      const _0x5c1af7 = {
        x: 1699.17,
        y: -1611.33,
        z: 112.47,
      }
      const _0x5f2129 = { id: 'roncorp_storage' }
      const _0x5b5e1e = {
        heading: 10,
        minZ: 111.47,
        maxZ: 113.27,
        data: _0x5f2129,
      }
      _0x115c9b.g.exports['ev-polytarget'].AddBoxZone('roncorp_storage',
        _0x5c1af7,
        0.8,
        1.65,
        _0x5b5e1e
      )
      const _0x411395 = {
        CPXEvent: 'ev-oilers:viewStorage',
        id: 'roncorp_storage',
        icon: 'info',
        label: 'View Storage',
      }
      const _0x48a9bd = { radius: 3.5 }
      const _0x42965b = {
        distance: _0x48a9bd,
        isEnabled: async () => {
          return true
        },
      }
      _0x115c9b.g.exports['ev-interact'].AddPeekEntryByPolyTarget('roncorp_storage',
        [_0x411395],
        _0x42965b
      )
    }
    const _0x1dd6ce = new Set(),
      _0x367436 = () => {
        const _0x40212e = _0x3cc044('ev-oilers:gasStationSeed', 'stations')
        for (const _0x1819dc of _0x40212e) {
          const _0x3529e5 = _0x2b0ff5('Gas Station',
            [
              _0x1819dc.tank.vectors.x,
              _0x1819dc.tank.vectors.y,
              _0x1819dc.tank.vectors.z,
            ],
            361,
            59,
            true
          )
          _0x1dd6ce.add(_0x3529e5)
        }
      }
    function _0x908b05(_0x1d9c50, _0x2726c8) {
      if (_0x2726c8) {
        SetBlipAlpha(_0x1d9c50, 0)
        SetBlipHiddenOnLegend(_0x1d9c50, true)
      } else {
        SetBlipAlpha(_0x1d9c50, 255)
        SetBlipHiddenOnLegend(_0x1d9c50, false)
      }
    }
    on('ev-island:hideBlips', async (_0x4b303f) => {
      for (const _0x4f7889 of _0x1dd6ce) {
        _0x908b05(_0x4f7889, _0x4b303f)
      }
    })
    async function _0x525718() {
      await _0x2abc90()
      await _0x5d2b57()
      _0x2ca867()
      _0x2555b4()
      _0x42ef89()
      _0x367436()
    }
    const _0x44dd4b = new Map()
    function _0xb6ba3f(_0x118141) {
      console.log("_0x118141", _0x118141)
      const _0x3d877a = _0x118141
          ? _0x118141
          : _0x3cc044('ev-oilers:gasStations'),
        _0x140f74 = _0x3d877a.upgrades
      for (const [_0x5d30bf, _0x14c1a1] of Object.entries(_0x140f74)) {
        _0x44dd4b.set(_0x5d30bf, _0x14c1a1)
      }
    }
    function _0x5c69e1(_0x2cfa4a, _0x52b993) {
      const _0x26d2e0 = _0x44dd4b.get(_0x2cfa4a)
      console.log(_0x26d2e0)
      if (_0x26d2e0 === undefined || _0x26d2e0[_0x52b993] === undefined) {
        return
      }
      return _0x26d2e0[_0x52b993]
    }
    function _0x14093d(_0x28d9b5, _0x493098, _0x43870c) {
      var _0x5218b9
      const _0x43370e = _0x5c69e1(_0x28d9b5, _0x493098)
      if (_0x43370e === undefined) {
        return
      }
      return (_0x5218b9 = _0x43370e.find(
        (_0x294a51) => _0x294a51.tier === _0x43870c[_0x28d9b5][_0x493098]
      )) === null || _0x5218b9 === void 0
        ? void 0
        : _0x5218b9.value
    }
    on('ev-config:configLoaded', (_0x1c0964, _0x4733f9) => {
      if (_0x1c0964 !== 'ev-oilers:gasStations') {
        return
      }
      _0xb6ba3f(_0x4733f9)
    })
    const _0x19ae13 = new Map(),
      _0x163bb2 = new Map(),
      _0x32fd8f = new WeakMap(),
      _0x3fd651 = new WeakMap(),
      _0x397fd7 = new Set()
    async function _0x3e8389() {}
    function _0x287f47(_0x165ad9) {
      const _0x4cf2c4 = _0x19ae13.get(_0x165ad9)
      if (_0x4cf2c4 === undefined) {
        return true
      }
      return RemoveBlip(_0x4cf2c4), _0x19ae13.delete(_0x165ad9)
    }
    function _0x5901e7() {
      _0x19ae13.forEach((_0x3573da) => RemoveBlip(_0x3573da))
      _0x19ae13.clear()
    }
    const _0x53525d = { timeToLive: 900000 }
    const _0x4dd2af = Cacheable(
      async (_0x2806f7, _0x87e0ef, _0x4394c9) => {
        const _0x53376e = await _0x32035f.execute('ev-oilers:getStationBusiness', _0x87e0ef)
        if (
          typeof (_0x53376e === null || _0x53376e === void 0
            ? void 0
            : _0x53376e.id) !== 'string'
        ) {
          return [false, undefined]
        }
        return [true, _0x53376e]
      },
      _0x53525d
    )
    function _0x2d20ce(_0x3d90df) {
      const _0x59794c = [..._0x163bb2.values()].find(
        (_0x2bb5f1) => _0x2bb5f1.type === 'panel' && _0x2bb5f1.station === _0x3d90df
      )
      return _0x59794c === null || _0x59794c === void 0
        ? void 0
        : _0x59794c.upgrades
    }
    function _0x3ff036(_0x25e5d0, _0x2122e3, _0x1ee38b) {
      const _0x105c0a = _0x2d20ce(_0x25e5d0)
      if (_0x105c0a === undefined) {
        return
      }
      return _0x14093d(_0x2122e3, _0x1ee38b, _0x105c0a)
    }
    function _0x4a9791(_0x3e4873, _0x62671b, _0x352c10) {
      if (_0x397fd7.has(_0x3e4873)) {
        return
      }
      const _0x566afa = GetEntityModel(_0x62671b),
        _0x5decb4 = GetEntityHeading(_0x62671b),
        [_0x5b7bc9, _0x3a597c, _0x1c8b1c] = GetEntityCoords(_0x62671b, false),
        [_0xca1ab5, _0x325ca3] = GetModelDimensions(_0x566afa),
        [_0x57fa55, _0x426b75, _0x2323fa] = _0x325ca3,
        _0x5d9c16 = { station: _0x352c10.station }
      const _0x4b075d = _0x5d9c16,
        _0x15e69d = {
          heading: _0x5decb4,
          minZ: _0x1c8b1c - _0x2323fa,
          maxZ: _0x1c8b1c + _0x2323fa,
        }
      const _0x35b22d = _0x15e69d,
        _0x5be650 = {
          x: _0x5b7bc9,
          y: _0x3a597c,
          z: _0x1c8b1c,
        }
      _0x5403df.addBoxTarget(
        _0x3e4873,
        'gas_station_tank',
        _0x5be650,
        _0x426b75 * 2,
        _0x57fa55 * 2,
        _0x35b22d,
        _0x4b075d
      )
      _0x397fd7.add(_0x3e4873)
    }
    function _0x25c87(_0xecdae2, _0xb816a4, _0x4d8080) {
      _0x163bb2.set(_0xecdae2, _0x4d8080)
      _0x32fd8f.set(_0x4d8080, _0xecdae2)
      if (_0xb816a4 === undefined) {
        return
      }
      _0x3fd651.set(_0x4d8080, _0xb816a4)
      if (_0x4d8080.type === 'tank' && DoesEntityExist(_0xb816a4)) {
        _0x4a9791(_0xecdae2, _0xb816a4, _0x4d8080)
      }
    }
    function _0x50f8cf(_0xbcfeb3) {
      return _0x163bb2.get(_0xbcfeb3)
    }
    function _0x45da1e(_0x4b3918) {
      return _0x3fd651.get(_0x163bb2.get(_0x4b3918))
    }
    function _0x4099c6(_0x55e826) {
      return _0x32fd8f.get(_0x55e826)
    }
    function _0x2b3294(_0x4b4fec) {
      return _0x163bb2.delete(_0x4b4fec)
    }
    function _0x9122e6(_0x7459f5, _0x18c923) {
      return [..._0x163bb2.values()].filter(
        (_0x420567) => _0x420567.station === _0x7459f5 && _0x420567.type === _0x18c923
      )
    }
    function _0x566945() {
      _0x32035f.execute('ev-datagrid:subscribe', 'gas_stations')
      const _0x266138 = exports['ev-objects'].GetObjectsByNamespace('gas_stations')
      _0x266138.forEach((_0x2aa7ac) => {
        const _0x3e7ba7 = exports['ev-objects'].GetEntityByObjectId(_0x2aa7ac.id)
        _0x25c87(_0x2aa7ac.id, _0x3e7ba7, _0x2aa7ac.metaData)
      })
    }
    on('ev-spawn:characterSpawned', async () => {
      await _0x3e8389()
    })
    on('ev-oilers:hotreload', async () => {
      await _0x3e8389()
    })
    on('ev-config:configLoaded', async (_0x5a8589) => {
      if (_0x5a8589 !== 'ev-oilers:gasStations') {
        return
      }
      await _0x3e8389()
    })
    on('ev-objects:objectCreated', (_0x45ddd8, _0x4254ae) => {
      if (_0x45ddd8.ns !== 'gas_stations') {
        return
      }
      const _0x1bd737 = _0x45ddd8.data.metadata
      _0x25c87(_0x45ddd8.id, _0x4254ae, _0x1bd737)
    })
    on('ev-objects:objectDeleted', (_0x460894, _0x5bb664) => {
      if (_0x460894.ns !== 'gas_stations') {
        return
      }
      _0x2b3294(_0x460894.id)
    })
    on('ev-objects:objectUpdated', (_0x4ead7c, _0x45bbd1) => {
      if (_0x4ead7c.ns !== 'gas_stations') {
        return
      }
      const _0x4b5e9a = _0x4ead7c.data.metadata
      _0x25c87(_0x4ead7c.id, _0x45bbd1, _0x4b5e9a)
    })
    class _0x26a7ba {
      constructor(
        _0x730b1d,
        _0x303c9f,
        _0x952d5d,
        _0x404e5b,
        _0x39b665,
        _0x1dc0e6,
        _0x386d3f = 1
      ) {
        this.ped = _0x730b1d
        this.type = _0x303c9f
        this.flag = _0x386d3f
        this.text = _0x952d5d
        this.active = false
        this.duration = _0x404e5b
        this.dictionary = _0x39b665
        this.animation = _0x1dc0e6
      }
      ['start'](_0x11cd5c) {
        if (this.active) {
          return
        }
        this.active = true
        _0x11cd5c && _0x11cd5c(this)
        this.tickId = setTick(async () => {
          if (
            this.animation &&
            !IsEntityPlayingAnim(this.ped, this.dictionary, this.animation, 3)
          ) {
            await _0x3fcf3c.loadAnim(this.dictionary)
            TaskPlayAnim(
              this.ped,
              this.dictionary,
              this.animation,
              -8,
              -8,
              -1,
              this.flag,
              0,
              false,
              false,
              false
            )
          } else {
            !this.animation &&
              !IsPedUsingScenario(this.ped, this.dictionary) &&
              TaskStartScenarioInPlace(this.ped, this.dictionary, 0, true)
          }
          await Wait(100)
        })
        let _0x148001
        if (this.type === 'skill' && this.duration instanceof Array) {
          _0x148001 = new Promise(async (_0x572941) => {
            const _0xd83b21 = this.duration
            for (const _0x52a20e of _0xd83b21) {
              const _0x47255b = await _0x3c3bff(
                _0x52a20e.difficulty,
                _0x52a20e.gap
              )
              if (_0x47255b !== 100) {
                return _0x572941(0)
              }
            }
            _0x572941(100)
          })
        } else {
          if (this.type === 'normal' && typeof this.duration === 'number') {
            _0x148001 = _0x144a86(this.duration, this.text)
          }
        }
        return (
          _0x148001.then(() => {
            this.stop()
          }),
          _0x148001
        )
      }
      ['stop']() {
        if (!this.active) {
          return
        }
        this.active = false
        clearTick(this.tickId)
        if (!this.animation && IsPedUsingScenario(this.ped, this.dictionary)) {
          ClearPedTasks(this.ped)
        } else {
          StopAnimTask(this.ped, this.dictionary, this.animation, 3)
        }
      }
      ['abort']() {
        this.active && (exports['ev-taskbar'].taskCancel(), this.stop())
      }
    }
    function _0x125da8() {}
    _0x501a81.onNet('ev-oilers:stations:billRequest', async (_0x3091f3, _0x31be65) => {
        const _0x24ec71 = await _0x3a3250.get('Gas'),
          _0x42d331 = _0x31be65 + (_0x31be65 * _0x24ec71) / 100,
          _0xcb4b26 = await _0x24fb4c(
            'Gas Station',
            '$' + _0x3d3c9d(_0x42d331) + ' tax included.',
            'gas-pump'
          )
        _0x32035f.execute('ev-oilers:stations:completeBill', _0x3091f3, _0xcb4b26)
      }
    )
    async function _0x2b5263(_0x9afa15, _0x565e44) {
      const _0x3f893d = NetworkGetNetworkIdFromEntity(_0x565e44),
        _0x4a5e3f = await _0x32035f.execute('ev-oilers:stations:getPurchasedFuel', _0x9afa15, _0x3f893d)
      return typeof _0x4a5e3f === 'number' ? _0x4a5e3f : 0
    }
    class _0x2a14b6 {
      static async ['tankFuelList'](_0xe54c0e, _0x2b3251) {
        const _0x1aef6d = _0x3ff036(_0xe54c0e.station, 'tank', 'tanks'),
          _0x5c5042 = []
        for (let _0x2bc544 = 0; _0x2bc544 < _0x1aef6d; _0x2bc544 += 1) {
          const _0x17d062 = _0xe54c0e.fuel[_0x2bc544]
          _0x5c5042.push(
            await this.tankFuelEntry(
              _0xe54c0e,
              _0x2b3251,
              _0x2bc544 + 1,
              _0x17d062
            )
          )
        }
        return _0x5c5042
      }
      static async ['tankFuelEntry'](_0xe892dd, _0x15dafa, _0x49ac4d, _0x490fce) {
        const _0x44632b = await Cacheable(
            _0x15dafa.id + ':craft_access',
            _0x15dafa.id,
            'craft_access'
          ),
          _0x1c5998 = {
            quantity: 0,
            price: 0,
            type: 'empty',
            octane: 'N/A',
            grade: 'N/A',
          }
        const _0x1d8401 = (
            _0x490fce === null || _0x490fce === void 0 ? void 0 : _0x490fce.type
          )
            ? _0x490fce
            : _0x1c5998,
          _0x34f67c = _0x3d3c9d(_0x3ff036(_0xe892dd.station, 'tank', 'capacity')),
          _0x37db02 = _0x3d3c9d(_0x1d8401.quantity >= 0 ? _0x1d8401.quantity : 0)
        return {
          title: ('Fuel Tank | #{0}', _0x49ac4d),
          icon: 'gas-pump',
          children: [
            {
              title: 'Tank Readings',
              description: ('Available: {0}/{1}',
                _0x37db02,
                _0x34f67c
              ),
              icon: 'info-circle',
            },
            {
              title: 'Fuel Information',
              description: ('Type: {type} | Octane: {octane} | Grade: {grade}',
                _0x1d8401
              ),
              icon: 'gas-pump',
            },
            {
              title: 'Refill Tank',
              icon: 'fill-drip',
              disabled: _0x37db02 === _0x34f67c,
              action: 'ev-oilers:stations:refillFuelTank',
              key: {
                fuel: _0x1d8401,
                business: _0x15dafa,
                tank: _0xe892dd,
              },
            },
            {
              title: 'Purge Tank',
              icon: 'minus-circle',
              action: 'ev-oilers:stations:purgeFuelTank',
              disabled: !_0x44632b || _0x1d8401.type === 'empty',
              key: {
                fuel: _0x1d8401,
                tank: _0xe892dd,
              },
            },
          ],
        }
      }
      static ['pumpFuelList'](_0x1c69ea, _0x1e2013, _0x35d1ec, _0x4d04bb) {
        const _0x27778c = [],
          _0x9717e8 = _0x3ff036(_0x1e2013.station, 'tank', 'tanks')
        for (let _0x1fc26b = 0; _0x1fc26b < _0x9717e8; _0x1fc26b += 1) {
          const _0x4e6cd3 = _0x35d1ec.fuel[_0x1fc26b]
          _0x27778c.push(
            _0x2a14b6.pumpFuel(
              _0x1c69ea,
              _0x1e2013,
              _0x35d1ec,
              _0x4e6cd3,
              _0x4d04bb
            )
          )
        }
        return _0x27778c
      }
      static ['pumpFuel'](_0x37c3b5, _0x410166, _0x3d1e00, _0x46966d, _0x41e883) {
        const _0x2f76dc = {
          quantity: 0,
          price: 0,
          type: 'empty',
          octane: 'N/A',
          grade: 'N/A',
        }
        const _0x46ad88 = (
            _0x46966d === null || _0x46966d === void 0 ? void 0 : _0x46966d.type
          )
            ? _0x46966d
            : _0x2f76dc,
          _0x339588 = _0x3d3c9d(_0x46ad88.price)
        return {
          title: ('{0}', _0x2e2214(_0x46ad88.type)),
          description: ('Octane: {0} | Price: ${1}', _0x46ad88.octane, _0x339588),
          icon: 'gas-pump',
          disabled: _0x46ad88.type === 'empty',
          action: 'ev-oilers:stations:pickUpHose',
          key: {
            id: _0x37c3b5,
            fuel: _0x46ad88,
            business: _0x41e883,
            pump: _0x410166,
            tank: _0x3d1e00,
          },
        }
      }
      static async ['panelTanksList'](_0x21af24, _0x4e6bec) {
        const _0x5605fd = _0x3ff036(_0x21af24.station, 'tank', 'tanks'),
          _0xba5158 = {
            title: 'Station Tanks',
            icon: 'burn',
            disabled: false,
            children: [
              {
                title: 'Fuel Tanks',
                description: 'List of fuel tanks installed in the station',
                icon: 'info-circle',
              },
            ],
          }
        for (let _0x35a526 = 0; _0x35a526 < _0x5605fd; _0x35a526 += 1) {
          const _0xe2ea63 = _0x21af24.fuel[_0x35a526]
          _0xba5158.children.push(
            await this.panelTankEntry(
              _0x21af24,
              _0x35a526 + 1,
              _0xe2ea63,
              _0x4e6bec
            )
          )
        }
        return _0xba5158
      }
      static async ['panelTankEntry'](
        _0x4d9645,
        _0x282f00,
        _0x199e75,
        _0x58c4bb
      ) {
        const _0x299e18 = await Cacheable(
            _0x58c4bb.id + ':craft_access',
            _0x58c4bb.id,
            'craft_access'
          ),
          _0x29ead8 = {
            quantity: 0,
            price: 0,
            type: 'empty',
            octane: 'N/A',
            grade: 'N/A',
          }
        const _0x77d9e2 = (
            _0x199e75 === null || _0x199e75 === void 0 ? void 0 : _0x199e75.type
          )
            ? _0x199e75
            : _0x29ead8,
          _0x159618 = _0x3d3c9d(_0x77d9e2.price),
          _0x3d0305 = _0x3d3c9d(_0x3ff036(_0x4d9645.station, 'tank', 'capacity')),
          _0x427f98 = _0x3d3c9d(_0x77d9e2.quantity >= 0 ? _0x77d9e2.quantity : 0)
        return {
          title: ('Fuel Tank | #{0}', _0x282f00),
          icon: 'gas-pump',
          children: [
            {
              title: 'Tank Readings',
              description: ('Price: ${0} | Available: {1}/{2}',
                _0x159618,
                _0x427f98,
                _0x3d0305
              ),
              icon: 'info-circle',
            },
            {
              title: 'Fuel Information',
              description: ('Type: {type} | Octane: {octane} | Grade: {grade}', _0x77d9e2),
              icon: 'gas-pump',
            },
            {
              title: 'Change Fuel Price',
              icon: 'money-check-alt',
              action: 'ev-oilers:stations:changeFuelPrice',
              disabled: !_0x299e18 || _0x77d9e2.type === 'empty',
              key: {
                fuel: _0x77d9e2,
                business: _0x58c4bb,
                tank: _0x4d9645,
              },
            },
          ],
        }
      }
      static async ['panelPumpsList'](_0x18607f, _0x4ae0b1) {
        const _0x3c66fb = {
          title: 'Station Pumps',
          icon: 'gas-pump',
          disabled: false,
          children: [
            {
              title: 'Fuel Pumps',
              description: 'List of fuel pumps installed in the station',
              icon: 'info-circle',
            },
          ],
        }
        for (let _0x4a70f2 = 0; _0x4a70f2 < _0x18607f.length; _0x4a70f2 += 1) {
          const _0x415855 = _0x18607f[_0x4a70f2],
            _0x59bc15 = _0x4099c6(_0x415855)
          _0x3c66fb.children.push(
            await this.panelPumpEntry(
              _0x59bc15,
              _0x415855,
              _0x4a70f2 + 1,
              _0x4ae0b1
            )
          )
        }
        return _0x3c66fb
      }
      static async ['panelPumpEntry'](_0x2809cf, _0x19422b, _0x57e0e8,  _0x527d97) {
        const _0x153849 = await Cacheable(
          _0x527d97.id + ':craft_access',
          _0x527d97.id,
          'craft_access'
        )
        return {
          title: ('Fuel Pump | #{0}', _0x57e0e8),
          icon: 'gas-pump',
          children: [
            {
              title: 'Pump Information',
              description: ('Access: {0} | Condition: {1}', _0x19422b.access, _0x19422b.health > 0 ? 'Good' : 'Bad'),
              icon: 'info-circle',
            },
            {
              title: 'Change Access',
              icon: 'lock',
              disabled: !_0x153849,
              children: [
                {
                  title: 'Public Access',
                  icon: 'lock-open',
                  key: {
                    id: _0x2809cf,
                    station: _0x19422b.station,
                    access: 'public',
                  },
                  action: 'ev-oilers:stations:setPumpAccess',
                },
                {
                  title: 'Restricted Access',
                  icon: 'lock',
                  key: {
                    id: _0x2809cf,
                    station: _0x19422b.station,
                    access: 'employee',
                  },
                  action: 'ev-oilers:stations:setPumpAccess',
                },
              ],
            },
          ],
        }
      }
      static ['panelUpgradeList'](_0x4a26aa) {
        const _0x2ff561 = _0x2d20ce(_0x4a26aa),
          _0x1bfa88 = {
            title: 'Station Upgrades',
            icon: 'plus-circle',
            children: [
              {
                title: 'Station Upgrades',
                description: 'List of currently installed upgrades',
                icon: 'info-circle',
              },
            ],
          }
        return (
          _0x1bfa88.children.push(
            this.panelTankUpgradeStatus(_0x4a26aa, _0x2ff561)
          ),
          _0x1bfa88.children.push(
            this.panelPumpUpgradeStatus(_0x4a26aa, _0x2ff561)
          ),
          _0x1bfa88
        )
      }
      static ['panelTankUpgradeStatus'](_0x1338ec, _0x546a8d) {
        const _0x16ba5b = {
            tier: _0x546a8d.tank.tanks,
            value: _0x3d3c9d(_0x14093d('tank', 'tanks', _0x546a8d)),
          },
          _0x38d72c = {
            tier: _0x546a8d.tank.capacity,
            value: _0x3d3c9d(_0x14093d('tank', 'capacity', _0x546a8d)),
          },
          _0x4e0623 = {
            title: 'Tank Upgrades',
            icon: 'burn',
            children: [
              {
                title: 'Installed Tanks',
                description: ('Tier: {0} | Installed: {1} unit/s', _0x16ba5b.tier, _0x16ba5b.value),
                icon: 'plus-circle',
                children: [],
              },
              {
                title: 'Tank Capacity',
                description: ('Tier: {0} | Capacity: {1} gallons', _0x38d72c.tier, _0x38d72c.value),
                icon: 'plus-circle',
                children: [],
              },
            ],
          }
        return _0x4e0623
      }
      static ['panelPumpUpgradeStatus'](_0x3361c2, _0x977609) {
        const _0x6e1e03 = {
            tier: _0x977609.pump.safety,
            value: _0x3d3c9d(_0x14093d('pump', 'safety', _0x977609)),
          },
          _0x5d1769 = {
            tier: _0x977609.pump.speed,
            value: _0x3d3c9d(_0x14093d('pump', 'speed', _0x977609)),
          },
          _0x54e061 = {
            title: 'Pump Upgrades',
            icon: 'gas-pump',
            children: [
              {
                title: 'Safety Features',
                description: ('Tier: {0} | Features: {1}', _0x6e1e03.tier, _0x6e1e03.value),
                icon: 'plus-circle',
                children: [],
              },
              {
                title: 'Pump Speed',
                description: ('Tier: {0} | Speed: {1}x', _0x5d1769.tier, _0x5d1769.value),
                icon: 'plus-circle',
                children: [],
              },
            ],
          }
        return _0x54e061
      }
    }
    class _0x12b54c {
      static async ['management'](_0x2df70f, _0x38b577) {
        const _0xfcf19e = [
          {
            title: 'Fuel Tanks',
            description: 'List of fuel tanks installed in the station',
            icon: 'info-circle',
          },
        ]
        return (
          _0xfcf19e.push(...(await _0x2a14b6.tankFuelList(_0x2df70f, _0x38b577))),
          _0xfcf19e
        )
      }
    }
    class _0x2b715d {
      static async ['usePump'](_0x4b0f17, _0x1a6b3e, _0x4c7463, _0x45fe72) {
        const _0x45e61f = await _0x4bd344.get(_0x45fe72.id),
          _0x4a620e = _0x1a6b3e.access === 'employee',
          _0x48e6be = [
            {
              title: 'Gas Pump',
              description: 'Select the kind of fuel you want to use',
              icon: 'info-circle',
            },
          ]
        if (_0x4a620e && !_0x45e61f) {
          return [
            {
              title: 'Unauthorized Access',
              description: 'This Pump can only be operated by employees.',
              icon: 'ban',
            },
          ]
        }
        return (
          _0x48e6be.push(
            ..._0x2a14b6.pumpFuelList(_0x4b0f17, _0x1a6b3e, _0x4c7463, _0x45fe72)
          ),
          _0x48e6be
        )
      }
      static async ['refuelVehicle'](
        _0x593151,
        _0x1edc68,
        _0x464bbc,
        _0x2a64c8,
        _0x4c2b29
      ) {
        const _0xc1e8a5 = [
          {
            title: 'Refuel Vehicle',
            icon: 'info-circle',
            description: 'Fuel Amount: {0} | Total Cost: ${1}',
              _0x464bbc,
              _0x2a64c8,
          },
          {
            title: 'Start Refueling',
            icon: 'gas-pump',
            action: 'ev-oilers:stations:refuelVehicle',
            disabled: _0x4c2b29 <= 0,
            key: {
              vehicle: _0x593151,
              pump: _0x1edc68,
              amount: _0x464bbc,
              purchased: _0x4c2b29,
            },
          },
          {
            title: 'Pay By Bank',
            icon: 'credit-card',
            action: 'ev-oilers:stations:sendRefuelBill',
            key: {
              vehicle: _0x593151,
              pump: _0x1edc68,
              amount: _0x464bbc,
              type: 'bank',
            },
          },
          {
            title: 'Pay By Cash',
            icon: 'money-bill',
            action: 'ev-oilers:stations:sendRefuelBill',
            key: {
              vehicle: _0x593151,
              pump: _0x1edc68,
              amount: _0x464bbc,
              type: 'cash',
            },
          },
          {
            title: 'Self Serve',
            icon: 'portrait',
            action: 'ev-oilers:stations:selfServe',
            disabled: _0x4c2b29 > 0,
            key: {
              vehicle: _0x593151,
              pump: _0x1edc68,
              amount: _0x464bbc,
              type: 'bank',
            },
          },
        ]
        return _0xc1e8a5
      }
    }
    class _0x1e3029 {
      static async ['usePanel'](_0x2a5492, _0x4e22ef, _0x410ce0) {
        const _0x242ea7 = await _0x4bd344.get(_0x410ce0.id),
          _0x546458 = [
            {
              title: 'Gas Station Management',
              description: ('Business: {0}', _0x410ce0.name),
              icon: 'info-circle',
            },
          ]
        if (!_0x242ea7) {
          return [
            {
              title: 'Unauthorized Access',
              description: 'This Panel can only be accessed by employees.',
              icon: 'ban',
            },
          ]
        }
        return (
          _0x546458.push(await _0x2a14b6.panelTanksList(_0x2a5492, _0x410ce0)),
          _0x546458.push(await _0x2a14b6.panelPumpsList(_0x4e22ef, _0x410ce0)),
          _0x546458.push(await _0x2a14b6.panelUpgradeList(_0x2a5492.station)),
          _0x546458
        )
      }
    }
    const _0x475f75 = {
      Pump: _0x2b715d,
      Tank: _0x12b54c,
      Panel: _0x1e3029,
    }
    const _0x175e86 = _0x475f75
    let _0x28b08f, _0x4837d2, _0x4d86bd, _0x54c601, _0xcb819e, _0x3e70b0
    function _0x48002f() {}
    on('ev-oilers:stations:showPumpMenu', async (_0x22fcd4, _0x4ba032, _0x4bfed3) => {
        const _0x50ff91 =
          _0x4bfed3 === null || _0x4bfed3 === void 0 ? void 0 : _0x4bfed3.meta
        if (_0x50ff91 === undefined) {
          return
        }
        const _0x1a9741 = _0x50ff91.data.metadata,
          _0xf14f1b = await _0x4dd2af.get(_0x1a9741.station),
          _0x461dfb = _0x9122e6(_0x1a9741.station, 'tank')
        if (_0x3f5e64('infiniteGasStationFuel')) {
          _0x461dfb.forEach((_0x2c9804) =>
            _0x2c9804.fuel.forEach((_0x62f254) => (_0x62f254.quantity = 10000))
          )
        }
        const _0x420638 = await _0x175e86.Pump.usePump(
          _0x50ff91.id,
          _0x1a9741,
          _0x461dfb[0],
          _0xf14f1b
        )
        exports['ev-ui'].showContextMenu(_0x420638)
      }
    )
    RegisterUICallback('ev-oilers:stations:pickUpHose',  async (data, cb) => {
        const _0x44e3ff = {
          ok: true,
          message: '',
        }
        const _0x25adc7 = {
          data: {},
          meta: _0x44e3ff,
        }
        cb(_0x25adc7)
        const _0x15fcf9 = data.key.id,
          _0xd3fbaa = _0x45da1e(_0x15fcf9),
          _0x438159 = data.key.fuel,
          _0xa2c206 = data.key.pump,
          _0x381cf4 = GetEntityCoords(_0xd3fbaa, false)
        if (_0x3e70b0) {
          return
        }
        _0x3e70b0 = true
        _0x4837d2 = _0xa2c206
        _0x4d86bd = _0xd3fbaa
        _0x54c601 = _0x438159
        if (_0xcb819e && DoesEntityExist(_0xcb819e)) {
          DeleteEntity(_0xcb819e)
        }
        const _0x27f9be = GetHashKey('prop_cs_fuel_nozle')
        await _0x3fcf3c.loadModel(_0x27f9be)
        const [_0x5ed94e, _0x14d370, _0x20b270] = GetEntityCoords(
            PlayerPedId(),
            false
          ),
          _0x286a79 = PlayerPedId(),
          _0x211012 = GetPedBoneIndex(_0x286a79, 57005),
          _0x1543d2 = CreateObject(
            _0x27f9be,
            _0x5ed94e,
            _0x14d370,
            _0x20b270,
            true,
            false,
            false
          )
        _0xcb819e = _0x1543d2
        AttachEntityToEntity(
          _0x1543d2,
          _0x286a79,
          _0x211012,
          0.09,
          0.05,
          -0.01,
          -93,
          -84,
          1,
          true,
          true,
          false,
          true,
          0,
          true
        )
        const _0x7ea020 = setTick(async () => {
          const _0x4cb49f = GetEntityCoords(PlayerPedId(), false),
            _0x3e5c10 = _0x1e41a1.getDistance(_0x4cb49f, _0x381cf4)
          if (_0x3e5c10 > 8) {
            emit('ev-oilers:stations:returnHose')
          }
          if (!_0x3e70b0) {
            clearTick(_0x7ea020)
          }
        })
      }
    )
    on('ev-oilers:stations:returnHose', (_0xa28bd5, _0x56cb8e, _0x59cbc2) => {
      _0x3e70b0 = false
      DeleteEntity(_0xcb819e)
      _0xcb819e = undefined
      _0x4837d2 = undefined
      _0x54c601 = undefined
    })
    on('ev-oilers:stations:showRefuelMenu',  async (_0x451877, _0x1fdd1b, _0x9e50e4) => {
        const _0x475928 = exports['ev-vehicles'].GetVehicleFuel(_0x1fdd1b),
          _0x5717e2 = await _0x2b5263(_0x4837d2.station, _0x1fdd1b),
          _0x323e01 = _0x54c601.quantity > 0 ? _0x54c601.quantity : 0,
          _0x4b3268 = +(100 - _0x475928).toFixed(0),
          _0x36c62 = Math.round(
            _0x4b3268 > _0x323e01 ? _0x323e01 : _0x4b3268 > 0 ? _0x4b3268 : 0
          ),
          _0x57040f = await _0x3a3250.get('Gas'),
          _0x48dc97 = +(
            _0x54c601.price * _0x36c62 +
            (_0x54c601.price * _0x36c62 * _0x57040f) / 100
          ).toFixed(0),
          _0x298901 = await _0x175e86.Pump.refuelVehicle(
            _0x1fdd1b,
            _0x4837d2,
            _0x4b3268,
            _0x48dc97,
            _0x5717e2
          )
        exports['ev-ui'].showContextMenu(_0x298901)
      }
    )
    RegisterUICallback('ev-oilers:stations:sendRefuelBill', async (data, cb) => {
        const _0x7e7e3 = {
          ok: true,
          message: '',
        }
        const _0x457715 = {
          data: {},
          meta: _0x7e7e3,
        }
        cb(_0x457715)
        const _0x445d3a = data.key,
          _0x247326 = _0x445d3a.pump,
          _0x32f854 = _0x54c601,
          _0x4b48fe = _0x445d3a.vehicle,
          _0x37f7c4 = _0x445d3a.amount,
          _0x984759 = _0x445d3a.type,
          _0x210b1b = NetworkGetNetworkIdFromEntity(_0x4b48fe)
        await _0x3f9230(500)
        if (_0x984759 === 'bank') {
          const _0x1fe73c = {
            name: 'stateId',
            label: 'State ID',
            icon: 'id-card',
          }
          const _0x1c8ca0 = await _0x5c57a2([_0x1fe73c], (_0x1bcf4b) => {
              if (!_0x1bcf4b.stateId || _0x1bcf4b.stateId.length === 0) {
                return false
              }
              return (
                (_0x1bcf4b.stateId = Number(
                  _0x1bcf4b === null || _0x1bcf4b === void 0
                    ? void 0
                    : _0x1bcf4b.stateId
                )),
                !isNaN(
                  _0x1bcf4b === null || _0x1bcf4b === void 0
                    ? void 0
                    : _0x1bcf4b.stateId
                )
              )
            }),
            _0x51ac39 =
              _0x1c8ca0 === null || _0x1c8ca0 === void 0
                ? void 0
                : _0x1c8ca0.stateId
          if (!_0x51ac39) {
            return emit('DoLongHudText', 'Invalid State ID', 2)
          }
          _0x32035f.execute(
            'ev-oilers:stations:sendBill',
            _0x247326.station,
            _0x32f854.id,
            _0x51ac39,
            _0x37f7c4,
            _0x210b1b,
            'bank'
          )
        }
        if (_0x984759 === 'cash') {
          const _0x3b19c7 = exports.isPed.isPed('cid')
          _0x32035f.execute(
            'ev-oilers:stations:sendBill',
            _0x247326.station,
            _0x32f854.id,
            _0x3b19c7,
            _0x37f7c4,
            _0x210b1b,
            'cash'
          )
        }
      }
    )
    RegisterUICallback('ev-oilers:stations:selfServe', async (data, cb) => {
        const _0x5679bb = {
          ok: true,
          message: '',
        }
        const _0x2ec118 = {
          data: {},
          meta: _0x5679bb,
        }
        cb(_0x2ec118)
        const _0x5bbf63 = data.key,
          _0x535d51 = _0x5bbf63.pump,
          _0x589e49 = _0x54c601,
          _0x19b55e = _0x5bbf63.vehicle,
          _0x23116b = _0x5bbf63.amount,
          _0x5dd434 = _0x5bbf63.type,
          _0x4653e2 = NetworkGetNetworkIdFromEntity(_0x19b55e),
          _0xfaa1cf = exports.isPed.isPed('cid'),
          _0x37e74d = await _0x32035f.execute(
            'ev-oilers:stations:sendBill',
            _0x535d51.station,
            _0x589e49.id,
            _0xfaa1cf,
            _0x23116b,
            _0x4653e2,
            _0x5dd434,
            true
          )
        _0x5dd434 === 'bank' &&
          (await _0x32035f.execute('ev-oilers:stations:completeBill', _0x37e74d, true))
        await _0x3f9230(137)
        emit('ev-oilers:stations:showRefuelMenu', null, _0x19b55e)
      }
    )
    RegisterUICallback('ev-oilers:stations:refuelVehicle', async (data, cb) => {
        const _0x2d2fab = {
          ok: true,
          message: '',
        }
        const _0x3da1e2 = {
          data: {},
          meta: _0x2d2fab,
        }
        cb(_0x3da1e2)
        const _0x4dab22 = data.key,
          _0x47a73f = _0x4dab22.pump,
          _0x490b91 = _0x4dab22.vehicle,
          _0x461895 = _0x4dab22.amount,
          _0x413ae7 = _0x4dab22.purchased
        if (!_0x490b91) {
          return
        }
        const _0x12e042 = NetworkGetNetworkIdFromEntity(_0x490b91),
          _0x13c27f = _0x413ae7 * 500,
          _0x111096 = new _0x26a7ba(
            PlayerPedId(),
            'normal',
            'Refueling Vehicle',
            _0x13c27f,
            'anim@heists@keycard@',
            'idle_a'
          )
        _0x28b08f = true
        const _0x3b9f14 = await _0x111096.start((_0x2af3ae) => {
          const _0x1cac0f = setInterval(() => {
            if (!_0x2af3ae.active) {
              clearInterval(_0x1cac0f)
            }
            IsVehicleEngineOn(_0x490b91) &&
              _0x1e41a1.getRandomNumber(100) > 98 &&
              (exports['ev-sync'].SyncedExecution(
                'NetworkExplodeVehicle',
                _0x490b91,
                1,
                0,
                0
              ),
              _0x2af3ae.abort())
          }, 2000)
        })
        _0x28b08f = false
        const _0x2abec5 = (_0x3b9f14 * _0x461895) / 100
        await _0x32035f.execute('ev-oilers:stations:completeRefueling',
          _0x47a73f.station,
          _0x12e042,
          _0x2abec5
        )
      }
    )
    RegisterUICallback('ev-oilers:stations:setPumpAccess', async (data, cb) => {
        const _0x2cb2af = {
          ok: true,
          message: '',
        }
        const _0x462084 = {
          data: {},
          meta: _0x2cb2af,
        }
        cb(_0x462084)
        const _0x5c5a47 = data.key,
          _0x3433cc = _0x5c5a47.id,
          _0x5c31f6 = _0x5c5a47.access,
          _0x5db473 = _0x5c5a47.station,
          _0x4f57f3 = await _0x32035f.execute(
            'ev-oilers:stations:setPumpAccess',
            _0x5db473,
            _0x3433cc,
            _0x5c31f6
          )
        emit('DoLongHudText', _0x4f57f3 ? 'Pump Access Updated' : 'Failed to Update Pump Access',  _0x4f57f3 ? 1 : 2)
      }
    )
    on('onResourceStop', (_0x162a6c) => {
      if (_0x162a6c !== GetCurrentResourceName()) {
        return
      }
      DeleteEntity(_0xcb819e)
    })
    let _0x24f0c6,
      _0x3614dc = false,
      _0x29adcb,
      _0x44985d,
      _0x6e0101
    function _0x5b7433() {}
    on('ev-oilers:stations:pickUpTankerHose', async (_0x3714a9, _0x4529b7, _0x2f6f64) => {
        const _0x4bcf7f = _0x2f6f64.meta.oil
        if (_0x3614dc) {
          return
        }
        _0x3614dc = true
        _0x29adcb = _0x4529b7
        _0x44985d = _0x4bcf7f
        if (_0x6e0101 && DoesEntityExist(_0x6e0101)) {
          DeleteEntity(_0x6e0101)
        }
        const _0x188f12 = GetHashKey('prop_hose_nozzle')
        await _0x3fcf3c.loadModel(_0x188f12)
        const [_0x5402d2, _0x456425, _0x453293] = GetEntityCoords(
            PlayerPedId(),
            false
          ),
          _0x396daf = PlayerPedId(),
          _0x2a052d = GetPedBoneIndex(_0x396daf, 57005),
          _0x5d8844 = CreateObject(
            _0x188f12,
            _0x5402d2,
            _0x456425,
            _0x453293,
            true,
            false,
            false
          )
        _0x6e0101 = _0x5d8844
        AttachEntityToEntity(
          _0x5d8844,
          _0x396daf,
          _0x2a052d,
          0.09,
          0.05,
          -0.01,
          -93,
          -84,
          1,
          true,
          true,
          false,
          true,
          0,
          true
        )
        const _0x17faf8 = setTick(async () => {
          const _0xb6972f = GetEntityCoords(_0x4529b7, false),
            _0x5a99a3 = GetEntityCoords(PlayerPedId(), false),
            _0x6f1074 = _0x1e41a1.getDistance(_0x5a99a3, _0xb6972f)
          if (_0x6f1074 > 20) {
            emit('ev-oilers:stations:returnTankerHose')
          }
          if (!_0x3614dc) {
            clearTick(_0x17faf8)
          }
        })
      }
    )
    on('ev-oilers:stations:returnTankerHose', (_0x3bd326, _0x3c78b3, _0x271a80) => {
        _0x3614dc = false
        DeleteEntity(_0x6e0101)
        _0x6e0101 = undefined
        _0x29adcb = undefined
        _0x44985d = undefined
      }
    )
    on('onResourceStop', (_0x1595cc) => {
      if (_0x1595cc !== GetCurrentResourceName()) {
        return
      }
      DeleteEntity(_0x6e0101)
    })
    const _0x433351 = {
      id: 'oilers:stations:tankMenu',
      label: 'manage gas tank',
      icon: 'gas-pump',
      event: 'ev-oilers:stations:showTankMenu',
      parameters: {},
    }
    const _0x1267c2 = { radius: 2.5 }
    const _0x56fb09 = {
      distance: _0x1267c2,
      isEnabled: () => true,
    }
    const _0xe2f64 = {
      type: 'polytarget',
      group: ['gas_station_tank'],
      data: [_0x433351],
      options: _0x56fb09,
    }
    const _0x2e7468 = {
      id: 'oilers:stations:pumpMenu',
      label: 'use gas pump',
      icon: 'gas-pump',
      event: 'ev-oilers:stations:showPumpMenu',
      parameters: {},
    }
    const _0x23c9c3 = { radius: 1.5 }
    const _0x13d81b = { type: 'pump' }
    const _0x46b1e6 = {
      distance: _0x23c9c3,
      ns: 'gas_stations',
      meta: _0x13d81b,
      isEnabled: () => !_0x3e70b0 && !_0x28b08f,
    }
    const _0x5ad307 = {
      type: 'entity',
      group: [3],
      data: [_0x2e7468],
      options: _0x46b1e6,
    }
    const _0x325ace = {
      id: 'oilers:stations:returnHose',
      label: 'Return Hose',
      icon: 'hand-holding',
      event: 'ev-oilers:stations:returnHose',
      parameters: {},
    }
    const _0x379d9a = { radius: 1.5 }
    const _0x55cd3c = { type: 'pump' }
    const _0x5bbdbb = {
      distance: _0x379d9a,
      ns: 'gas_stations',
      meta: _0x55cd3c,
      isEnabled: (_0x8b6943, _0x7edf7e) => {
        return _0x3e70b0 && !_0x28b08f && _0x4d86bd === _0x8b6943
      },
    }
    const _0x34a60e = {
      type: 'entity',
      group: [3],
      data: [_0x325ace],
      options: _0x5bbdbb,
    }
    const _0x20fb4d = {
      id: 'vehicle_refuel_pump',
      label: 'Refuel Vehicle',
      icon: 'gas-pump',
      event: 'ev-oilers:stations:showRefuelMenu',
      parameters: {},
    }
    const _0x51fbcf = { isEnabled: () => _0x3e70b0 && !_0x28b08f }
    const _0x4dfe26 = {
      type: 'entity',
      group: [2],
      data: [_0x20fb4d],
      options: _0x51fbcf,
    }
    const _0x22ed0e = {
      id: 'oilers:stations:pumpManagementMenu',
      label: 'manage gas station',
      icon: 'tablet-alt',
      event: 'ev-oilers:stations:showManagementMenu',
      parameters: {},
    }
    const _0x410a1c = { radius: 1.5 }
    const _0x416701 = { type: 'panel' }
    const _0xb6c4b7 = {
      distance: _0x410a1c,
      ns: 'gas_stations',
      meta: _0x416701,
    }
    const _0x5702e1 = {
      type: 'entity',
      group: [3],
      data: [_0x22ed0e],
      options: _0xb6c4b7,
    }
    const _0x1d6ab6 = {
      id: 'oilers:stations:pickUpTankerHose',
      label: 'tanker hose',
      icon: 'burn',
      event: 'ev-oilers:stations:pickUpTankerHose',
      parameters: {},
    }
    const _0x511c76 = { radius: 8 }
    const _0x310489 = {
      distance: _0x511c76,
      isEnabled: (_0x467f4c, _0xbd99b4) => {
        var _0x74c5af
        return (
          ((_0x74c5af =
            _0xbd99b4 === null || _0xbd99b4 === void 0
              ? void 0
              : _0xbd99b4.meta) === null || _0x74c5af === void 0
            ? void 0
            : _0x74c5af.oil) !== undefined &&
          !_0x3614dc &&
          !_0x24f0c6
        )
      },
    }
    const _0x2aa74f = {
      type: 'model',
      group: [-1320147046],
      data: [_0x1d6ab6],
      options: _0x310489,
    }
    const _0x289ef7 = {
      id: 'oilers:stations:returnTankerHose',
      label: 'Return Hose',
      icon: 'hand-holding',
      event: 'ev-oilers:stations:returnTankerHose',
      parameters: {},
    }
    const _0x2aca2a = { radius: 8 }
    const _0x1f974d = [
      _0xe2f64,
      _0x5ad307,
      _0x34a60e,
      _0x4dfe26,
      _0x5702e1,
      _0x2aa74f,
      {
        type: 'model',
        group: [-1320147046],
        data: [_0x289ef7],
        options: {
          distance: _0x2aca2a,
          isEnabled: (_0x4c6b04, _0xcc513e) => {
            return _0x3614dc && !_0x28b08f && _0x29adcb === _0x4c6b04
          },
        },
      },
    ]
    async function _0x36e0e1() {
      _0x1f974d.forEach((_0x1d0e63) => {
        if (_0x1d0e63.type === 'entity') {
          exports['ev-interact'].AddPeekEntryByEntityType(
            _0x1d0e63.group,
            _0x1d0e63.data,
            _0x1d0e63.options
          )
        } else {
          if (_0x1d0e63.type === 'polytarget') {
            exports['ev-interact'].AddPeekEntryByPolyTarget(
              _0x1d0e63.group,
              _0x1d0e63.data,
              _0x1d0e63.options
            )
          } else {
            _0x1d0e63.type === 'model' &&
              exports['ev-interact'].AddPeekEntryByModel(
                _0x1d0e63.group,
                _0x1d0e63.data,
                _0x1d0e63.options
              )
          }
        }
      })
    }
    function _0x5d599d() {}
    on('ev-oilers:stations:showTankMenu', async (_0x4b7f44, _0x4759a4, _0x4e4871) => {
        var _0x1436f0
        const _0x4ab881 =
          (_0x1436f0 =
            _0x4e4871 === null || _0x4e4871 === void 0
              ? void 0
              : _0x4e4871.zones) === null || _0x1436f0 === void 0
            ? void 0
            : _0x1436f0.gas_station_tank
        if (
          (_0x4ab881 === null || _0x4ab881 === void 0 ? void 0 : _0x4ab881.id) ===
          undefined
        ) {
          return
        }
        const _0x1269a6 = _0x50f8cf(_0x4ab881.id),
        _0x514ba4 = await _0x4dd2af(_0x1269a6.station)
        _0x32749c = await _0x175e86.Tank.management(_0x1269a6, _0x514ba4)
        exports['ev-ui'].showContextMenu(_0x32749c)
      }
    )
    RegisterUICallback('ev-oilers:stations:changeFuelPrice', async (data, cb) => {
        const _0x4de909 = {
          ok: true,
          message: '',
        }
        const _0x6d9b2a = {
          data: {},
          meta: _0x4de909,
        }
        cb(_0x6d9b2a)
        await _0x3f9230(500)
        const _0x9a839a = data.key.fuel,
          _0x157785 = data.key.tank,
          _0x3ea473 = data.key.business,
          _0x54b446 = await Cacheable(
            _0x3ea473.id + ':craft_access',
            _0x3ea473.id,
            'craft_access'
          )
        if (!_0x54b446) {
          return emit('DoLongHudText', 'fuel-pump-no-permission', 2)
        }
        await Wait(500)
        const _0x1eddc0 = {
          name: 'price',
          label: 'Fuel Price',
          icon: 'dollar-sign',
        }
        const _0x56bbe3 = await _0x5c57a2([_0x1eddc0], (_0x33add2) => {
            if (!_0x33add2.price || _0x33add2.price.length === 0) {
              return false
            }
            return (
              (_0x33add2.price = Number(
                _0x33add2 === null || _0x33add2 === void 0
                  ? void 0
                  : _0x33add2.price
              )),
              !isNaN(
                _0x33add2 === null || _0x33add2 === void 0
                  ? void 0
                  : _0x33add2.price
              )
            )
          }),
          _0x1734aa = _0x56bbe3 === null || _0x56bbe3 === void 0 ? void 0 : _0x56bbe3.price
        if (!_0x1734aa) {
          return emit('DoLongHudText', 'fuel-pump-invalid-price', 2)
        }
        const [_0x5c5b52, _0x80b831] = await _0x32035f.execute(
          'ev-oilers:stations:changeFuelPrice',
          _0x157785.station,
          _0x9a839a.id,
          _0x1734aa
        )
        emit('DoLongHudText', _0x80b831, _0x5c5b52 ? 1 : 2)
      }
    )
    RegisterUICallback('ev-oilers:stations:purgeFuelTank', async (data, cb) => {
        const _0x1562e6 = {
          ok: true,
          message: '',
        }
        const _0x48db04 = {
          data: {},
          meta: _0x1562e6,
        }
        cb(_0x48db04)
        const _0x218c56 = data.key.tank,
          _0x5140a8 = data.key.fuel,
          _0x47cd1b = new _0x26a7ba(
            PlayerPedId(),
            'normal',
            'Purging Fuel Tank',
            10000,
            'mp_car_bomb',
            'car_bomb_mechanic',
            17
          ),
          _0x4e5607 = await _0x47cd1b.start()
        if (_0x4e5607 !== 100) {
          return
        }
        const [_0x330ae3, _0x57ad63] = await _0x32035f.execute(
          'ev-oilers:stations:purgeTank',
          _0x218c56.station,
          _0x5140a8.id
        )
        emit('DoLongHudText', _0x57ad63, _0x330ae3 ? 1 : 2)
      }
    )
    RegisterUICallback('ev-oilers:stations:refillFuelTank', async (data, cb) => {
        const _0x183e64 = {
          ok: true,
          message: '',
        }
        const _0x6893a0 = {
          data: {},
          meta: _0x183e64,
        }
        cb(_0x6893a0)
        const _0x116ecf = data.key.fuel,
          _0x3f8ad2 = data.key.tank,
          _0x37bd9b = _0x116ecf.id
        let _0x40c32e, _0x5287e8
        if (_0x3614dc) {
          const _0x26d7d5 = NetworkGetNetworkIdFromEntity(_0x29adcb)
          _0x40c32e = _0x44985d
          if (
            (_0x40c32e === null || _0x40c32e === void 0
              ? void 0
              : _0x40c32e.type) === undefined
          ) {
            return emit('DoLongHudText', 'The tanker must contain enough fuel', 2)
          }
          _0x5287e8 = (_0x4f511d) => {
            _0x40c32e.quantity -= _0x4f511d
            _0x32035f.execute(
              'ev-oilers:stations:updateTankerFuel',
              _0x26d7d5,
              _0x40c32e
            )
          }
        } else {
          const _0x182232 = exports['ev-inventory'].getItemsOfType(
              'barrel_fuel',
              1,
              true
            ),
            _0x30c3a3 = _0x182232[0]
          _0x40c32e = _0x30c3a3 ? JSON.parse(_0x30c3a3.information) : undefined
          if (
            _0x182232.length === 0 ||
            (_0x40c32e === null || _0x40c32e === void 0
              ? void 0
              : _0x40c32e.type) === undefined ||
            (_0x40c32e === null || _0x40c32e === void 0
              ? void 0
              : _0x40c32e.quantity) <= 0
          ) {
            return emit('DoLongHudText', 'You need a barrel with enough fuel', 2)
          }
          _0x5287e8 = (_0x4f8609) => {
            _0x40c32e.quantity -= _0x4f8609
            emit(
              'inventory:updateItem',
              'barrel_fuel',
              _0x30c3a3.slot,
              JSON.stringify(_0x40c32e)
            )
          }
        }
        if (
          _0x116ecf.type !== 'empty' &&
          (_0x116ecf.type !== _0x40c32e.type ||
            _0x116ecf.octane !== _0x40c32e.octane ||
            _0x116ecf.grade !== _0x40c32e.grade)
        ) {
          return emit('DoLongHudText', 'Cannot mix and match different fuels', 2)
        }
        const _0x588ba5 = {
          type: _0x40c32e.type,
          octane: _0x40c32e.octane,
          grade: _0x40c32e.grade,
        }
        const _0x59d26a = _0x588ba5,
          _0x2a39f1 = _0x3ff036(_0x3f8ad2.station, 'tank', 'capacity'),
          _0x2572f3 = _0x116ecf.quantity,
          _0x545bb1 =
            _0x40c32e.quantity + _0x2572f3 > _0x2a39f1
              ? _0x2a39f1 - _0x2572f3
              : _0x40c32e.quantity,
          _0x4685b0 = _0x545bb1 * 50,
          _0x5af129 = new _0x26a7ba(
            PlayerPedId(),
            'normal',
            'Refilling Fuel Tank',
            _0x4685b0,
            'anim@heists@keycard@',
            'idle_a'
          ),
          _0x105722 = await _0x5af129.start(),
          _0x1b47c9 = (_0x545bb1 * _0x105722) / 100,
          [_0x1ba7c1, _0x173b0b] = await _0x32035f.execute(
            'ev-oilers:stations:refillTank',
            _0x3f8ad2.station,
            _0x37bd9b,
            _0x59d26a,
            _0x1b47c9
          )
        if (_0x1ba7c1) {
          _0x5287e8(_0x1b47c9)
        }
        emit('DoLongHudText', _0x173b0b, _0x1ba7c1 ? 1 : 2)
      }
    )
    async function _0x37681c() {}
    on('ev-oilers:stations:showManagementMenu', async (_0x46470d, _0xeee952, _0x4903b4) => {
        const _0x38951d = _0x4903b4 === null || _0x4903b4 === void 0 ? void 0 : _0x4903b4.meta
        if (_0x38951d === undefined) {
          return
        }
        const _0x45fb68 = _0x38951d.data.metadata,
          _0x3b211c = _0x9122e6(_0x45fb68.station, 'tank'),
          _0x5e5135 = _0x9122e6(_0x45fb68.station, 'pump'),
          _0x3e6f5d = await _0x4dd2af.get(_0x45fb68.station),
          _0x109292 = await _0x175e86.Panel.usePanel(
            _0x3b211c[0],
            _0x5e5135,
            _0x3e6f5d
          )
        exports['ev-ui'].showContextMenu(_0x109292)
      }
    )
    async function _0xc3618() {
      await _0xb6ba3f()
      await _0x566945()
      await _0x36e0e1()
      await _0x37681c()
      await _0x5d599d()
      await _0x48002f()
      await _0x5b7433()
      await _0x125da8()
    }
    const _0x6a19e7 = _0xc3618
    async function _0x99d9cc() {
      await _0x2abc90()
      await _0x6a19e7()
    }
    ;(async () => {
      await _0x525718()
      await _0x99d9cc()
    })()
  })()
  