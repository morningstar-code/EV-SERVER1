;(() => {
  var _0x55006d = {
      119: () => {
        on('ev-dodo:client:dropGoods', async () => {
          emitNet('ev-dodo:server:dropGoods')
        })
      },
    },
    _0x1a3a6d = {}
  function _0x446dc5(_0x4168e3) {
    var _0x32da67 = _0x1a3a6d[_0x4168e3]
    if (_0x32da67 !== undefined) {
      return _0x32da67.exports
    }
    const _0x298af6 = { exports: {} }
    var _0x74fa88 = (_0x1a3a6d[_0x4168e3] = _0x298af6)
    return (
      _0x55006d[_0x4168e3](_0x74fa88, _0x74fa88.exports, _0x446dc5),
      _0x74fa88.exports
    )
  }
  var _0x41c6c5 = {}
  ;(() => {
    'use strict'
    let _0x504675 = exports['ev-config'].GetModuleConfig('main')
    const _0x139805 = new Map(),
      _0x10a9eb = GetCurrentResourceName()
    async function _0x114d96() {}
    on('ev-config:configLoaded', (_0x56b9f0, _0x314650) => {
      if (_0x56b9f0 === 'main') {
        _0x504675 = _0x314650
      } else {
        _0x139805.has(_0x56b9f0) && _0x139805.set(_0x56b9f0, _0x314650)
      }
    })
    function _0x21cde2(_0x4fe0ce) {
      return _0x504675[_0x4fe0ce]
    }
    function _0x52fbdf(_0x267be5, _0x4620db) {
      if (!_0x139805.has(_0x267be5)) {
        const _0x3dc7fd = exports['ev-config'].GetModuleConfig(_0x267be5)
        if (_0x3dc7fd === undefined) {
          return
        }
        _0x139805.set(_0x267be5, _0x3dc7fd)
      }
      const _0x42eb81 = _0x139805.get(_0x267be5)
      return _0x4620db
        ? _0x42eb81 === null || _0x42eb81 === void 0
          ? void 0
          : _0x42eb81[_0x4620db]
        : _0x42eb81
    }
    function _0x54fb00(_0x22224d) {
      return _0x52fbdf(_0x10a9eb, _0x22224d)
    }
    const _0x355f92 = globalThis.CPX,
      _0x5455d2 = _0x355f92.Hud,
      _0x5e9892 = _0x355f92.Utils,
      _0x26131b = _0x355f92.Zones,
      _0x39f64e = _0x355f92.Events,
      _0x59db49 = _0x355f92.Streaming,
      _0xc0022b = _0x355f92.Procedures,
      _0xb70313 = _0x355f92.Interface,
      _0x2b0936 = _0x355f92
    async function _0x1d6fe3(_0x355a30, _0x22542b, _0x1b1f99) {
      const [_0x2e44f8] = await RPC.execute(
        'ev-business:hasPermission',
        _0x355a30,
        _0x22542b,
        _0x1b1f99
      )
      return _0x2e44f8
    }
    async function _0x1bbeb1() {
      on('ev-dodo:client:holdRandomBox', () => {
        const _0x19d3b7 = [
            'dodopackagesmall',
            'dodopackagemedium',
            'dodopackagelarge',
          ],
          _0x3dfe90 = _0x19d3b7[Math.floor(Math.random() * _0x19d3b7.length)]
        emit('animation:carry', _0x3dfe90, true)
      })
      RegisterUICallback('ev-dodo:ui:getWorkers', async (data, cb) => {
          const _0x4e1fb5 = await _0x2b0936.Procedures.execute('ev-dodo:server:getWorkers'),
            _0x1346d4 = { workers: _0x4e1fb5 }
          const _0x44c7e3 = {
            ok: true,
            message: 'OK',
          }
          const _0x2339d6 = {}
          return (
            (_0x2339d6.data = _0x1346d4),
            (_0x2339d6.meta = _0x44c7e3),
            cb(_0x2339d6)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:getStats', async (data, cb) => {
          const _0x4f87ef = await _0x2b0936.Procedures.execute('ev-dodo:server:getStats'),
            _0x136c9d = {
              ok: true,
              message: 'OK',
            }
          const _0x1d63fe = {}
          return (
            (_0x1d63fe.data = _0x4f87ef),
            (_0x1d63fe.meta = _0x136c9d),
            cb(_0x1d63fe)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:getJobs', async (data, cb) => {
        const _0x4dc902 = await _0x2b0936.Procedures.execute('ev-dodo:server:getJobs'),
          _0x46f758 = {
            ok: true,
            message: 'OK',
          }
        const _0x35bcfe = {}
        return (
          (_0x35bcfe.data = _0x4dc902),
          (_0x35bcfe.meta = _0x46f758),
          cb(_0x35bcfe)
        )
      })
      RegisterUICallback('ev-dodo:ui:startJob', async (data, cb) => {
          const [_0x5eb82d, _0x3d4ef2] = await _0x2b0936.Procedures.execute('ev-dodo:server:startJob', data.jobId),
            _0x574ef5 = {
              ok: true,
              message: _0x3d4ef2,
            }
          const _0x128403 = {}
          return (
            (_0x128403.data = _0x5eb82d),
            (_0x128403.meta = _0x574ef5),
            cb(_0x128403)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:cancelJob', async (data, cb) => {
          const [_0xec225, _0x4c5eec] = await _0x2b0936.Procedures.execute('ev-dodo:server:cancelJob', data.jobId),
            _0x2e36df = {
              ok: true,
              message: _0x4c5eec,
            }
          const _0x5ae2ce = {}
          return (
            (_0x5ae2ce.data = _0xec225),
            (_0x5ae2ce.meta = _0x2e36df),
            cb(_0x5ae2ce)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:isSignedIn', async (data, cb) => {
          const _0x21562c = await _0x2b0936.Procedures.execute('ev-dodo:server:isSignedIn'),
            _0x2ae148 = {
              ok: true,
              message: 'OK',
            }
          const _0x63ee25 = {}
          return (
            (_0x63ee25.data = _0x21562c),
            (_0x63ee25.meta = _0x2ae148),
            cb(_0x63ee25)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:updateStatus', async (data, cb) => {
          const [_0x49cfff, _0x41269b] = await _0x2b0936.Procedures.execute(
              data.signedIn
                ? 'ev-dodo:server:signIn'
                : 'ev-dodo:server:signOut'
            ),
            _0x325829 = {
              ok: true,
              message: _0x41269b,
            }
          const _0x251b33 = {}
          return (
            (_0x251b33.data = _0x49cfff),
            (_0x251b33.meta = _0x325829),
            cb(_0x251b33)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:fetchDelivery',  async (data, cb) => {
          const _0x29f30e = await _0x2b0936.Procedures.execute('ev-dodo:server:fetchDelivery', data.trackingId),
            _0x54467a = {
              ok: true,
              message: 'ok',
            }
          const _0x5e9a65 = {}
          return (
            (_0x5e9a65.data = _0x29f30e),
            (_0x5e9a65.meta = _0x54467a),
            cb(_0x5e9a65)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:fetchLogs', async (data, cb) => {
          const _0x3eaa5c = await _0x2b0936.Procedures.execute('ev-dodo:server:fetchLogs', data.stateId),
            _0x43d550 = {
              ok: true,
              message: 'ok',
            }
          const _0x6c8bd9 = {}
          return (
            (_0x6c8bd9.data = _0x3eaa5c),
            (_0x6c8bd9.meta = _0x43d550),
            cb(_0x6c8bd9)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:assignJob', async (data, cb) => {
          const [_0x1ac872, _0x4d8fbf] = await _0x2b0936.Procedures.execute('ev-dodo:server:assignJob',
              data.type,
              data.charId,
              data.companyCut
            ),
            _0x9ab086 = { success: _0x1ac872 }
          const _0x5b7c5b = {
            ok: true,
            message: _0x4d8fbf,
          }
          const _0x5340b1 = {}
          return (
            (_0x5340b1.data = _0x9ab086),
            (_0x5340b1.meta = _0x5b7c5b),
            cb(_0x5340b1)
          )
        }
      )
      RegisterUICallback('ev-dodo:ui:signOffDuty', async (data, cb) => {
          const [_0xd7f517, _0x4bd930] = await _0x2b0936.Procedures.execute('ev-dodo:ui:signOffDuty', data.charId),
            _0x36a1eb = { success: _0xd7f517 }
          const _0x4cd5d5 = {
            ok: true,
            message: _0x4bd930,
          }
          const _0x329477 = {}
          return (
            (_0x329477.data = _0x36a1eb),
            (_0x329477.meta = _0x4cd5d5),
            cb(_0x329477)
          )
        }
      )
      on('ev-dodo:client:openLaptop', async () => {
        const _0xb4fe74 = exports.isPed.isPed('cid'),
          _0x198470 = ['dodoApp'],
          _0x45e40a = [],
          _0x4ccb82 = await _0x1d6fe3('dodologistics', 'hire', _0xb4fe74)
        if (_0x4ccb82) {
          _0x45e40a.push('dodoApp:showManagement')
        }
        const _0x191677 = {
          laptopBackground: 'https://i.imgur.com/mroIcmL.png',
        }
        exports['ev-laptop'].OpenLaptop(_0x198470, _0x45e40a, _0x191677)
      })
    }
    class _0x33ebe5 {
      static ['AddPeekEntryByModel'](_0x3d853d, _0x5cf5a6, _0x77f571) {
        exports['ev-interact'].AddPeekEntryByModel(
          _0x3d853d,
          _0x5cf5a6,
          _0x77f571
        )
      }
      static ['AddPeekEntryByPolyTarget'](_0x34f63a, _0x3a35aa, _0x4223a9) {
        exports['ev-interact'].AddPeekEntryByPolyTarget(
          _0x34f63a,
          _0x3a35aa,
          _0x4223a9
        )
      }
      static ['AddPeekEntryByEntityType'](_0x59e975, _0x424b8c, _0x202909) {
        exports['ev-interact'].AddPeekEntryByEntityType(
          _0x59e975,
          _0x424b8c,
          _0x202909
        )
      }
    }
    async function _0x3dd93e() {
      const _0x391597 = {
        x: -442.41,
        y: -2819.8,
        z: 6,
      }
      const _0x122084 = {
        minZ: 5.45,
        maxZ: 6.45,
        heading: 315,
      }
      exports['ev-polytarget'].AddBoxZone(
        'dodo_warehouse_laptop',
        _0x391597,
        1,
        1.6,
        _0x122084
      )
      const _0x353b96 = {
        event: 'ev-dodo:client:openLaptop',
        id: 'dodo_warehouse_laptop_open',
        icon: 'laptop',
        label: 'Open laptop',
        parameters: {},
      }
      const _0x465199 = { radius: 2 }
      const _0x2bde89 = {
        distance: _0x465199,
        isEnabled: async () => {
          return true
        },
      }
      _0x33ebe5.AddPeekEntryByPolyTarget(
        'dodo_warehouse_laptop',
        [_0x353b96],
        _0x2bde89
      )
    }
    var _0x11e6d4 = _0x446dc5(119)
    async function _0xb884fa() {
      await _0x114d96()
      await _0x1bbeb1()
      await _0x3dd93e()
    }
    ;(async () => {
      await _0xb884fa()
    })()
  })()
})()
