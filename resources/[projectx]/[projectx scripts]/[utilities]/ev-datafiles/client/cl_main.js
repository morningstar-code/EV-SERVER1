;(() => {
  'use strict'
  var _0x139fe3 = {}
  let _0x54d530 = exports['ev-config'].GetModuleConfig('main')
  const _0x265581 = new Map(),
    _0x1c2637 = GetCurrentResourceName()
  async function _0x2c0c97() {}
  on('ev-config:configLoaded', (_0x5dc821, _0x21350e) => {
    if (_0x5dc821 === 'main') {
      _0x54d530 = _0x21350e
    } else {
      _0x265581.has(_0x5dc821) && _0x265581.set(_0x5dc821, _0x21350e)
    }
  })
  function _0x5b1cb7(_0xbd85f7) {
    return _0x54d530[_0xbd85f7]
  }
  function _0x3172d1(_0x2b8f64, _0x5e3f03) {
    if (!_0x265581.has(_0x2b8f64)) {
      const _0x401ea0 = exports['ev-config'].GetModuleConfig(_0x2b8f64)
      if (_0x401ea0 === undefined) {
        return
      }
      _0x265581.set(_0x2b8f64, _0x401ea0)
    }
    const _0x31062f = _0x265581.get(_0x2b8f64)
    return _0x5e3f03
      ? _0x31062f === null || _0x31062f === void 0
        ? void 0
        : _0x31062f[_0x5e3f03]
      : _0x31062f
  }
  function _0x383d31(_0x3679fc) {
    return _0x3172d1(_0x1c2637, _0x3679fc)
  }
  const _0x21ac16 = globalThis.CPX,
    _0x21ff9c = _0x21ac16.Hud,
    _0x38720e = _0x21ac16.Utils,
    _0x450be5 = _0x21ac16.Zones,
    _0xf3fc8 = _0x21ac16.Events,
    _0x8ecc69 = _0x21ac16.Streaming,
    _0xdb3837 = _0x21ac16.Procedures,
    _0x639695 = _0x21ac16.Interface,
    _0x2857ab = _0x21ac16
  async function _0x5b6dc4() {}
  RegisterCommand('GetRandomPed', async () => {
      const _0x3b009d = await _0x2857ab.Procedures.execute('ev-datafiles:getRandomPed')
      console.log(_0x3b009d)
    },
    false
  )
  async function _0x224be4() {
    await _0x2c0c97()
    await _0x5b6dc4()
  }
  ;(async () => {
    await _0x224be4()
  })()
})()
