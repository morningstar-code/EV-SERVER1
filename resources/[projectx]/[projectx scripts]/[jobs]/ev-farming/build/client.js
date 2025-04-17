;(() => {
  'use strict'
  var _0x84559e = {
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x17ffa9) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
  }
  ;(() => {})()
  var _0x1a257c = {}
  const _0x1087eb = globalThis.CPX,
    _0x2a6035 = _0x1087eb.Hud,
    _0x163ffc = _0x1087eb.Utils,
    _0x493921 = _0x1087eb.Zones,
    _0x8da8ac = _0x1087eb.Events,
    _0x138d24 = _0x1087eb.Streaming,
    _0x3526d8 = _0x1087eb.Procedures,
    _0xaaa19f = _0x1087eb.Interface,
    _0x40be61 = null && _0x1087eb
  let _0x236712 =
      'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict',
    _0x5688a5 = (_0x5e07ba, _0x2da5b3) => {
      return () => {
        let _0x4f7b17 = '',
          _0x2e91d6 = _0x2da5b3
        while (_0x2e91d6--) {
          _0x4f7b17 += _0x5e07ba[(Math.random() * _0x5e07ba.length) | 0]
        }
        return _0x4f7b17
      }
    },
    _0x22f8b1 = (_0x2e45b1 = 21) => {
      let _0x426d3d = '',
        _0x33e956 = _0x2e45b1
      while (_0x33e956--) {
        _0x426d3d += _0x236712[(Math.random() * 64) | 0]
      }
      return _0x426d3d
    }
  const _0x2dd212 = GetConvar('sv_environment', 'prod') === 'debug'
  let _0x5752ec = 0.0017,
    _0x5ab760 = 0.06,
    _0x591555 = 28
  const _0x4cca34 = null && (_0x2dd212 ? 100 : 2500),
    _0x1fce4e = () => _0x5752ec,
    _0x2cfcae = () => _0x5ab760,
    _0x176440 = () => _0x591555,
    _0x37860b = (_0x5bff78) => (_0x5752ec = _0x5bff78),
    _0x3db66d = (_0x2aa093) => (_0x5ab760 = _0x2aa093),
    _0x5f4ed6 = (_0x1e08ed) => (_0x591555 = _0x1e08ed),
    _0x48ac0f = {
      name: 'seeds',
      ordering: [
        ['T', 'G', 'C', 'A'],
        ['A', 'C', 'G', 'T'],
        ['T', 'A', 'G', 'C'],
        ['G', 'T', 'C', 'A'],
        ['C', 'G', 'T', 'A'],
        ['C', 'T', 'A', 'G'],
      ],
      min: 1,
      max: 5,
    }
  const _0x1788f4 = {
    name: 'yield',
    ordering: [
      ['T', 'A', 'C', 'G'],
      ['T', 'C', 'A', 'G'],
      ['G', 'A', 'C', 'T'],
      ['T', 'C', 'G', 'A'],
      ['G', 'C', 'A', 'T'],
      ['G', 'A', 'T', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x375775 = {
    name: 'growth',
    ordering: [
      ['C', 'T', 'G', 'A'],
      ['A', 'G', 'C', 'T'],
      ['C', 'T', 'A', 'G'],
      ['G', 'A', 'C', 'T'],
      ['T', 'A', 'C', 'G'],
      ['A', 'T', 'C', 'G'],
      ['T', 'G', 'C', 'A'],
    ],
    min: 0,
    max: 100,
  }
  const _0x3d15c2 = {
    name: 'grade',
    ordering: [
      ['C', 'G', 'T', 'A'],
      ['A', 'G', 'T', 'C'],
      ['G', 'T', 'C', 'A'],
      ['T', 'G', 'C', 'A'],
      ['G', 'A', 'T', 'C'],
      ['A', 'C', 'G', 'T'],
      ['A', 'T', 'C', 'G'],
    ],
    min: 20,
    max: 100,
  }
  const _0x2456cc = {
    name: 'drought',
    ordering: [
      ['A', 'G', 'C', 'T'],
      ['C', 'A', 'G', 'T'],
      ['C', 'T', 'G', 'A'],
      ['C', 'A', 'T', 'G'],
      ['A', 'G', 'T', 'C'],
      ['G', 'C', 'A', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0x47f035 = {
    seed: 'pumpkinseed',
    item: 'pumpkin',
    name: 'Pumpkin',
    models: ['sm_pumpkin_01', 'sm_pumpkin_02', 'sm_pumpkin_03'],
    deadModel: 'sm_pumpkin_04',
    restricted: true,
    traits: [_0x48ac0f, _0x1788f4, _0x375775, _0x3d15c2, _0x2456cc],
  }
  const _0x2ccd39 = {
    name: 'seeds',
    ordering: [
      ['T', 'G', 'C', 'A'],
      ['A', 'C', 'G', 'T'],
      ['T', 'A', 'G', 'C'],
      ['G', 'T', 'C', 'A'],
      ['C', 'G', 'T', 'A'],
      ['C', 'T', 'A', 'G'],
    ],
    min: 1,
    max: 5,
  }
  const _0x59ab04 = {
    name: 'yield',
    ordering: [
      ['T', 'A', 'C', 'G'],
      ['T', 'C', 'A', 'G'],
      ['G', 'A', 'C', 'T'],
      ['T', 'C', 'G', 'A'],
      ['G', 'C', 'A', 'T'],
      ['G', 'A', 'T', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x1e2b33 = {
    name: 'growth',
    ordering: [
      ['C', 'T', 'G', 'A'],
      ['A', 'G', 'C', 'T'],
      ['C', 'T', 'A', 'G'],
      ['G', 'A', 'C', 'T'],
      ['T', 'A', 'C', 'G'],
      ['A', 'T', 'C', 'G'],
      ['T', 'G', 'C', 'A'],
    ],
    min: 0,
    max: 100,
  }
  const _0x1ae953 = {
    name: 'grade',
    ordering: [
      ['C', 'G', 'T', 'A'],
      ['A', 'G', 'T', 'C'],
      ['G', 'T', 'C', 'A'],
      ['T', 'G', 'C', 'A'],
      ['G', 'A', 'T', 'C'],
      ['A', 'C', 'G', 'T'],
      ['A', 'T', 'C', 'G'],
    ],
    min: 20,
    max: 100,
  }
  const _0xe3ab7b = {
    name: 'drought',
    ordering: [
      ['A', 'G', 'C', 'T'],
      ['C', 'A', 'G', 'T'],
      ['C', 'T', 'G', 'A'],
      ['C', 'A', 'T', 'G'],
      ['A', 'G', 'T', 'C'],
      ['G', 'C', 'A', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0xf3e1f4 = {
    seed: 'tomatoseed',
    item: 'tomato',
    name: 'Tomato',
    restricted: false,
    models: ['sm_tomato_01', 'sm_tomato_02', 'sm_tomato_03'],
    deadModel: 'sm_tomato_04',
    traits: [_0x2ccd39, _0x59ab04, _0x1e2b33, _0x1ae953, _0xe3ab7b],
  }
  const _0x206ada = {
    name: 'seeds',
    ordering: [
      ['A', 'G', 'T', 'C'],
      ['T', 'C', 'G', 'A'],
      ['C', 'T', 'G', 'A'],
      ['A', 'C', 'T', 'G'],
      ['C', 'G', 'A', 'T'],
      ['T', 'A', 'G', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x3e1f29 = {
    name: 'yield',
    ordering: [
      ['G', 'T', 'A', 'C'],
      ['C', 'G', 'T', 'A'],
      ['T', 'C', 'A', 'G'],
      ['A', 'T', 'G', 'C'],
      ['G', 'T', 'C', 'A'],
      ['T', 'C', 'A', 'G'],
    ],
    min: 1,
    max: 5,
  }
  const _0x41e0fb = {
    name: 'growth',
    ordering: [
      ['C', 'A', 'T', 'G'],
      ['A', 'T', 'C', 'G'],
      ['G', 'A', 'C', 'T'],
      ['T', 'C', 'G', 'A'],
      ['A', 'C', 'T', 'G'],
      ['C', 'A', 'G', 'T'],
      ['A', 'T', 'G', 'C'],
    ],
    min: 0,
    max: 100,
  }
  const _0x1308c1 = {
    name: 'grade',
    ordering: [
      ['A', 'G', 'C', 'T'],
      ['A', 'T', 'G', 'C'],
      ['A', 'T', 'G', 'C'],
      ['C', 'A', 'T', 'G'],
      ['G', 'T', 'C', 'A'],
      ['C', 'G', 'A', 'T'],
      ['A', 'C', 'G', 'T'],
    ],
    min: 20,
    max: 100,
  }
  const _0x404cfd = {
    name: 'drought',
    ordering: [
      ['C', 'A', 'G', 'T'],
      ['T', 'A', 'G', 'C'],
      ['T', 'A', 'C', 'G'],
      ['G', 'C', 'A', 'T'],
      ['A', 'T', 'C', 'G'],
      ['T', 'A', 'C', 'G'],
    ],
    min: 0,
    max: 100,
  }
  const _0x2ed453 = {
    seed: 'carrotseed',
    item: 'carrot',
    name: 'Carrot',
    restricted: false,
    models: ['sm_carrot_01', 'sm_carrot_02', 'sm_carrot_03'],
    deadModel: 'sm_carrot_04',
    traits: [_0x206ada, _0x3e1f29, _0x41e0fb, _0x1308c1, _0x404cfd],
  }
  const _0x4c18ce = {
    name: 'seeds',
    ordering: [
      ['C', 'T', 'A', 'G'],
      ['C', 'A', 'T', 'G'],
      ['C', 'T', 'A', 'G'],
      ['A', 'C', 'G', 'T'],
      ['G', 'C', 'A', 'T'],
      ['A', 'T', 'G', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x17c5a1 = {
    name: 'yield',
    ordering: [
      ['T', 'A', 'C', 'G'],
      ['A', 'G', 'C', 'T'],
      ['A', 'T', 'C', 'G'],
      ['G', 'A', 'C', 'T'],
      ['C', 'T', 'G', 'A'],
      ['A', 'C', 'G', 'T'],
    ],
    min: 1,
    max: 5,
  }
  const _0x14985e = {
    name: 'growth',
    ordering: [
      ['T', 'A', 'C', 'G'],
      ['C', 'A', 'T', 'G'],
      ['G', 'A', 'C', 'T'],
      ['A', 'T', 'C', 'G'],
      ['C', 'G', 'T', 'A'],
      ['A', 'G', 'C', 'T'],
      ['G', 'T', 'A', 'C'],
    ],
    min: 0,
    max: 100,
  }
  const _0x436fd0 = {
    name: 'grade',
    ordering: [
      ['A', 'C', 'T', 'G'],
      ['G', 'C', 'T', 'A'],
      ['A', 'C', 'G', 'T'],
      ['T', 'G', 'A', 'C'],
      ['T', 'C', 'G', 'A'],
      ['C', 'A', 'T', 'G'],
      ['T', 'G', 'A', 'C'],
    ],
    min: 20,
    max: 100,
  }
  const _0x36d412 = {
    name: 'drought',
    ordering: [
      ['G', 'C', 'T', 'A'],
      ['C', 'G', 'T', 'A'],
      ['A', 'T', 'G', 'C'],
      ['T', 'G', 'C', 'A'],
      ['G', 'T', 'C', 'A'],
      ['A', 'C', 'T', 'G'],
    ],
    min: 0,
    max: 100,
  }
  const _0x38c222 = {
    seed: 'potatoseed',
    item: 'potato',
    name: 'Potato',
    restricted: false,
    models: ['sm_potato_01', 'sm_potato_02', 'sm_potato_03'],
    deadModel: 'sm_potato_04',
    traits: [_0x4c18ce, _0x17c5a1, _0x14985e, _0x436fd0, _0x36d412],
  }
  const _0x4195f1 = {
    name: 'seeds',
    ordering: [
      ['C', 'G', 'A', 'T'],
      ['A', 'T', 'G', 'C'],
      ['C', 'A', 'T', 'G'],
      ['T', 'C', 'A', 'G'],
      ['C', 'G', 'A', 'T'],
      ['C', 'G', 'T', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x16481a = {
    name: 'yield',
    ordering: [
      ['T', 'C', 'A', 'G'],
      ['C', 'G', 'T', 'A'],
      ['T', 'C', 'A', 'G'],
      ['G', 'C', 'T', 'A'],
      ['A', 'C', 'G', 'T'],
      ['A', 'G', 'C', 'T'],
    ],
    min: 1,
    max: 5,
  }
  const _0x869e42 = {
    name: 'growth',
    ordering: [
      ['G', 'T', 'C', 'A'],
      ['A', 'G', 'T', 'C'],
      ['C', 'T', 'G', 'A'],
      ['G', 'A', 'C', 'T'],
      ['G', 'A', 'T', 'C'],
      ['G', 'A', 'C', 'T'],
      ['T', 'G', 'A', 'C'],
    ],
    min: 0,
    max: 100,
  }
  const _0x4b28a7 = {
    name: 'grade',
    ordering: [
      ['A', 'T', 'G', 'C'],
      ['A', 'T', 'C', 'G'],
      ['C', 'T', 'G', 'A'],
      ['G', 'A', 'T', 'C'],
      ['A', 'C', 'T', 'G'],
      ['C', 'A', 'T', 'G'],
      ['T', 'G', 'A', 'C'],
    ],
    min: 20,
    max: 100,
  }
  const _0x1ae91b = {
    name: 'drought',
    ordering: [
      ['G', 'T', 'A', 'C'],
      ['G', 'C', 'T', 'A'],
      ['C', 'A', 'T', 'G'],
      ['T', 'A', 'G', 'C'],
      ['T', 'C', 'G', 'A'],
      ['G', 'A', 'T', 'C'],
    ],
    min: 0,
    max: 100,
  }
  const _0x3be1b5 = {
    seed: 'cabbageseed',
    item: 'cabbage',
    name: 'Cabbage',
    restricted: false,
    models: ['sm_cabbage_01', 'sm_cabbage_02', 'sm_cabbage_03'],
    deadModel: 'sm_cabbage_04',
    traits: [_0x4195f1, _0x16481a, _0x869e42, _0x4b28a7, _0x1ae91b],
  }
  const _0x34fc95 = {
    name: 'seeds',
    ordering: [
      ['T', 'A', 'C', 'G'],
      ['A', 'T', 'C', 'G'],
      ['A', 'C', 'T', 'G'],
      ['C', 'T', 'A', 'G'],
      ['A', 'C', 'G', 'T'],
      ['T', 'A', 'G', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x7c56f4 = {
    name: 'yield',
    ordering: [
      ['C', 'G', 'A', 'T'],
      ['A', 'T', 'C', 'G'],
      ['T', 'C', 'G', 'A'],
      ['G', 'C', 'A', 'T'],
      ['C', 'A', 'T', 'G'],
      ['T', 'C', 'G', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x101c87 = {
    name: 'growth',
    ordering: [
      ['C', 'G', 'T', 'A'],
      ['A', 'T', 'G', 'C'],
      ['G', 'A', 'T', 'C'],
      ['T', 'G', 'C', 'A'],
      ['G', 'C', 'A', 'T'],
      ['A', 'C', 'T', 'G'],
      ['T', 'G', 'C', 'A'],
    ],
    min: 0,
    max: 100,
  }
  const _0x22c4f8 = {
    name: 'grade',
    ordering: [
      ['G', 'C', 'T', 'A'],
      ['C', 'A', 'G', 'T'],
      ['T', 'G', 'C', 'A'],
      ['C', 'G', 'T', 'A'],
      ['C', 'G', 'T', 'A'],
      ['T', 'C', 'A', 'G'],
      ['G', 'C', 'T', 'A'],
    ],
    min: 20,
    max: 100,
  }
  const _0xa65c67 = {
    name: 'drought',
    ordering: [
      ['G', 'A', 'C', 'T'],
      ['A', 'T', 'C', 'G'],
      ['A', 'G', 'C', 'T'],
      ['G', 'C', 'T', 'A'],
      ['T', 'A', 'G', 'C'],
      ['C', 'G', 'A', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0xd0174c = {
    seed: 'cucumberseed',
    item: 'cucumber',
    name: 'Cucumber',
    restricted: false,
    models: ['sm_cucumber_01', 'sm_cucumber_02', 'sm_cucumber_03'],
    deadModel: 'sm_cucumber_04',
    traits: [_0x34fc95, _0x7c56f4, _0x101c87, _0x22c4f8, _0xa65c67],
  }
  const _0x16cdee = {
    name: 'seeds',
    ordering: [
      ['T', 'G', 'C', 'A'],
      ['A', 'C', 'G', 'T'],
      ['T', 'C', 'G', 'A'],
      ['G', 'T', 'C', 'A'],
      ['G', 'T', 'C', 'A'],
      ['G', 'A', 'T', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x2fa509 = {
    name: 'yield',
    ordering: [
      ['A', 'C', 'T', 'G'],
      ['A', 'C', 'G', 'T'],
      ['G', 'C', 'A', 'T'],
      ['G', 'C', 'A', 'T'],
      ['G', 'A', 'C', 'T'],
      ['T', 'G', 'C', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x114da9 = {
    name: 'growth',
    ordering: [
      ['C', 'T', 'A', 'G'],
      ['A', 'C', 'G', 'T'],
      ['G', 'T', 'A', 'C'],
      ['T', 'G', 'A', 'C'],
      ['C', 'A', 'G', 'T'],
      ['G', 'A', 'T', 'C'],
      ['T', 'G', 'A', 'C'],
    ],
    min: 0,
    max: 100,
  }
  const _0x4c3582 = {
    name: 'grade',
    ordering: [
      ['G', 'C', 'T', 'A'],
      ['A', 'T', 'G', 'C'],
      ['T', 'C', 'G', 'A'],
      ['T', 'A', 'G', 'C'],
      ['T', 'C', 'A', 'G'],
      ['T', 'C', 'A', 'G'],
      ['G', 'T', 'C', 'A'],
    ],
    min: 20,
    max: 60,
  }
  const _0x3b9cee = {
    name: 'drought',
    ordering: [
      ['G', 'T', 'C', 'A'],
      ['C', 'G', 'A', 'T'],
      ['A', 'G', 'T', 'C'],
      ['C', 'A', 'T', 'G'],
      ['C', 'G', 'T', 'A'],
      ['T', 'A', 'C', 'G'],
    ],
    min: 0,
    max: 100,
  }
  const _0x3e6ae9 = {
    seed: 'watermelonseed',
    item: 'watermelon',
    name: 'Watermelon',
    restricted: false,
    models: ['sm_watermelon_01', 'sm_watermelon_02', 'sm_watermelon_03'],
    deadModel: 'sm_watermelon_04',
    traits: [_0x16cdee, _0x2fa509, _0x114da9, _0x4c3582, _0x3b9cee],
  }
  const _0x281ebf = {
    name: 'seeds',
    ordering: [
      ['T', 'G', 'C', 'A'],
      ['C', 'A', 'G', 'T'],
      ['T', 'C', 'G', 'A'],
      ['T', 'C', 'G', 'A'],
      ['G', 'T', 'A', 'C'],
      ['G', 'C', 'T', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x294688 = {
    name: 'yield',
    ordering: [
      ['C', 'G', 'A', 'T'],
      ['G', 'C', 'T', 'A'],
      ['C', 'T', 'A', 'G'],
      ['T', 'A', 'G', 'C'],
      ['T', 'A', 'C', 'G'],
      ['G', 'C', 'T', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x407094 = {
    name: 'growth',
    ordering: [
      ['A', 'T', 'C', 'G'],
      ['T', 'C', 'A', 'G'],
      ['A', 'T', 'C', 'G'],
      ['C', 'T', 'A', 'G'],
      ['G', 'T', 'C', 'A'],
      ['G', 'A', 'C', 'T'],
      ['G', 'C', 'A', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0x4767f7 = {
    name: 'grade',
    ordering: [
      ['G', 'C', 'T', 'A'],
      ['G', 'C', 'T', 'A'],
      ['G', 'T', 'A', 'C'],
      ['A', 'T', 'C', 'G'],
      ['C', 'G', 'T', 'A'],
      ['A', 'C', 'T', 'G'],
      ['C', 'G', 'T', 'A'],
    ],
    min: 20,
    max: 100,
  }
  const _0x3d9661 = {
    name: 'drought',
    ordering: [
      ['A', 'T', 'G', 'C'],
      ['T', 'C', 'G', 'A'],
      ['T', 'G', 'A', 'C'],
      ['C', 'A', 'T', 'G'],
      ['A', 'C', 'T', 'G'],
      ['A', 'G', 'C', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0xbfd14a = {
    seed: 'onionseed',
    item: 'onion',
    name: 'Onion',
    restricted: false,
    models: ['sm_onion_01', 'sm_onion_02', 'sm_onion_03a'],
    deadModel: 'sm_onion_04',
    traits: [_0x281ebf, _0x294688, _0x407094, _0x4767f7, _0x3d9661],
  }
  const _0xa406cc = {
    name: 'seeds',
    ordering: [
      ['T', 'G', 'A', 'C'],
      ['G', 'A', 'T', 'C'],
      ['G', 'C', 'T', 'A'],
      ['G', 'C', 'A', 'T'],
      ['T', 'A', 'G', 'C'],
      ['G', 'A', 'T', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x1d840f = {
    name: 'yield',
    ordering: [
      ['T', 'C', 'G', 'A'],
      ['G', 'C', 'T', 'A'],
      ['T', 'C', 'G', 'A'],
      ['C', 'G', 'T', 'A'],
      ['T', 'C', 'G', 'A'],
      ['G', 'C', 'A', 'T'],
    ],
    min: 1,
    max: 5,
  }
  const _0x3299a2 = {
    name: 'growth',
    ordering: [
      ['C', 'G', 'A', 'T'],
      ['G', 'T', 'A', 'C'],
      ['C', 'G', 'T', 'A'],
      ['T', 'C', 'A', 'G'],
      ['C', 'A', 'G', 'T'],
      ['C', 'A', 'G', 'T'],
      ['A', 'T', 'G', 'C'],
    ],
    min: 0,
    max: 100,
  }
  const _0x5c9166 = {
    name: 'grade',
    ordering: [
      ['T', 'G', 'A', 'C'],
      ['A', 'T', 'C', 'G'],
      ['A', 'C', 'G', 'T'],
      ['T', 'G', 'A', 'C'],
      ['C', 'T', 'G', 'A'],
      ['A', 'C', 'G', 'T'],
      ['T', 'A', 'G', 'C'],
    ],
    min: 20,
    max: 100,
  }
  const _0x251aa8 = {
    name: 'drought',
    ordering: [
      ['A', 'C', 'T', 'G'],
      ['A', 'C', 'T', 'G'],
      ['C', 'A', 'G', 'T'],
      ['C', 'G', 'T', 'A'],
      ['C', 'A', 'T', 'G'],
      ['A', 'T', 'G', 'C'],
    ],
    min: 0,
    max: 100,
  }
  const _0x136c57 = {
    seed: 'sunflowerseed',
    item: 'sunfloweroil',
    name: 'Sunflower',
    restricted: false,
    models: ['sm_sunflower_01', 'sm_sunflower_02', 'sm_sunflower_03'],
    deadModel: 'sm_sunflower_04',
    traits: [_0xa406cc, _0x1d840f, _0x3299a2, _0x5c9166, _0x251aa8],
  }
  const _0x3f64c1 = {
    name: 'seeds',
    ordering: [
      ['G', 'C', 'T', 'A'],
      ['A', 'G', 'C', 'T'],
      ['G', 'T', 'A', 'C'],
      ['T', 'A', 'C', 'G'],
      ['G', 'C', 'A', 'T'],
      ['C', 'A', 'T', 'G'],
    ],
    min: 1,
    max: 5,
  }
  const _0x235f31 = {
    name: 'yield',
    ordering: [
      ['G', 'C', 'T', 'A'],
      ['C', 'G', 'T', 'A'],
      ['G', 'C', 'T', 'A'],
      ['A', 'C', 'G', 'T'],
      ['G', 'T', 'A', 'C'],
      ['T', 'C', 'G', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x1fc930 = {
    name: 'growth',
    ordering: [
      ['A', 'G', 'T', 'C'],
      ['G', 'C', 'A', 'T'],
      ['G', 'C', 'A', 'T'],
      ['T', 'A', 'C', 'G'],
      ['A', 'T', 'G', 'C'],
      ['A', 'T', 'G', 'C'],
      ['T', 'G', 'C', 'A'],
    ],
    min: 0,
    max: 100,
  }
  const _0x562f6c = {
    name: 'grade',
    ordering: [
      ['G', 'A', 'C', 'T'],
      ['T', 'G', 'C', 'A'],
      ['A', 'G', 'C', 'T'],
      ['G', 'T', 'C', 'A'],
      ['C', 'T', 'G', 'A'],
      ['C', 'T', 'G', 'A'],
      ['C', 'T', 'G', 'A'],
    ],
    min: 20,
    max: 100,
  }
  const _0x3ed650 = {
    name: 'drought',
    ordering: [
      ['C', 'T', 'G', 'A'],
      ['G', 'A', 'T', 'C'],
      ['G', 'T', 'A', 'C'],
      ['A', 'T', 'G', 'C'],
      ['A', 'T', 'C', 'G'],
      ['C', 'A', 'G', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0x3c0412 = {
    seed: 'garlicseed',
    item: 'garlic',
    name: 'Garlic',
    restricted: false,
    models: ['sm_garlic_01', 'sm_garlic_02', 'sm_garlic_03'],
    deadModel: 'sm_garlic_04',
    traits: [_0x3f64c1, _0x235f31, _0x1fc930, _0x562f6c, _0x3ed650],
  }
  const _0x45d6dd = {
    name: 'seeds',
    ordering: [
      ['C', 'T', 'G', 'A'],
      ['G', 'C', 'A', 'T'],
      ['C', 'G', 'T', 'A'],
      ['G', 'T', 'A', 'C'],
      ['G', 'A', 'C', 'T'],
      ['C', 'A', 'T', 'G'],
    ],
    min: 1,
    max: 5,
  }
  const _0x35e9c7 = {
    name: 'yield',
    ordering: [
      ['C', 'G', 'T', 'A'],
      ['A', 'C', 'G', 'T'],
      ['G', 'C', 'T', 'A'],
      ['G', 'T', 'C', 'A'],
      ['A', 'G', 'C', 'T'],
      ['C', 'A', 'T', 'G'],
    ],
    min: 1,
    max: 5,
  }
  const _0x4afdbb = {
    name: 'growth',
    ordering: [
      ['A', 'G', 'T', 'C'],
      ['G', 'C', 'T', 'A'],
      ['A', 'T', 'C', 'G'],
      ['G', 'A', 'C', 'T'],
      ['G', 'A', 'T', 'C'],
      ['G', 'T', 'C', 'A'],
      ['C', 'A', 'G', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0x24dc05 = {
    name: 'grade',
    ordering: [
      ['G', 'C', 'A', 'T'],
      ['G', 'A', 'T', 'C'],
      ['G', 'A', 'C', 'T'],
      ['A', 'C', 'G', 'T'],
      ['T', 'G', 'C', 'A'],
      ['C', 'A', 'G', 'T'],
      ['T', 'A', 'C', 'G'],
    ],
    min: 20,
    max: 100,
  }
  const _0x269d0f = {
    name: 'drought',
    ordering: [
      ['G', 'A', 'T', 'C'],
      ['A', 'T', 'C', 'G'],
      ['C', 'A', 'T', 'G'],
      ['T', 'C', 'A', 'G'],
      ['T', 'C', 'A', 'G'],
      ['T', 'A', 'C', 'G'],
    ],
    min: 0,
    max: 100,
  }
  const _0x199c32 = {
    seed: 'wheatseed',
    item: 'grain',
    name: 'Wheat',
    restricted: false,
    models: ['sm_wheat_01a', 'sm_wheat_02a', 'sm_wheat_03a'],
    deadModel: 'sm_wheat_04a',
    traits: [_0x45d6dd, _0x35e9c7, _0x4afdbb, _0x24dc05, _0x269d0f],
  }
  const _0x289529 = {
    name: 'growth',
    ordering: [
      ['G', 'A', 'C', 'T'],
      ['A', 'T', 'G', 'C'],
      ['C', 'A', 'T', 'G'],
      ['T', 'A', 'G', 'C'],
      ['G', 'A', 'C', 'T'],
      ['T', 'C', 'G', 'A'],
      ['C', 'T', 'G', 'A'],
    ],
    min: 0,
    max: 100,
  }
  const _0x597858 = {
    name: 'seeds',
    ordering: [
      ['T', 'A', 'G', 'C'],
      ['G', 'C', 'T', 'A'],
      ['T', 'C', 'G', 'A'],
      ['G', 'C', 'T', 'A'],
      ['C', 'G', 'A', 'T'],
      ['A', 'T', 'G', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x43b09c = {
    name: 'grade',
    ordering: [
      ['C', 'G', 'T', 'A'],
      ['T', 'A', 'G', 'C'],
      ['A', 'G', 'C', 'T'],
      ['C', 'T', 'A', 'G'],
      ['T', 'C', 'A', 'G'],
      ['C', 'G', 'A', 'T'],
      ['G', 'C', 'T', 'A'],
    ],
    min: 20,
    max: 100,
  }
  const _0xe2f22 = {
    name: 'yield',
    ordering: [
      ['C', 'G', 'T', 'A'],
      ['C', 'G', 'A', 'T'],
      ['C', 'T', 'G', 'A'],
      ['T', 'C', 'A', 'G'],
      ['G', 'A', 'T', 'C'],
      ['C', 'G', 'T', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x9825d7 = {
    name: 'drought',
    ordering: [
      ['A', 'G', 'T', 'C'],
      ['T', 'G', 'A', 'C'],
      ['T', 'C', 'G', 'A'],
      ['C', 'A', 'T', 'G'],
      ['A', 'T', 'G', 'C'],
      ['T', 'C', 'A', 'G'],
    ],
    min: 0,
    max: 100,
  }
  const _0x43582f = {
    seed: 'radishseed',
    item: 'radish',
    name: 'Radish',
    restricted: false,
    models: ['sm_radish_01', 'sm_radish_02', 'sm_radish_03'],
    deadModel: 'sm_radish_04',
    traits: [_0x289529, _0x597858, _0x43b09c, _0xe2f22, _0x9825d7],
  }
  const _0x118c43 = {
    name: 'yield',
    ordering: [
      ['G', 'T', 'C', 'A'],
      ['C', 'T', 'A', 'G'],
      ['A', 'G', 'T', 'C'],
      ['T', 'G', 'C', 'A'],
      ['T', 'G', 'A', 'C'],
      ['G', 'A', 'T', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x315b0c = {
    name: 'seeds',
    ordering: [
      ['C', 'G', 'T', 'A'],
      ['A', 'G', 'C', 'T'],
      ['A', 'T', 'C', 'G'],
      ['A', 'T', 'G', 'C'],
      ['A', 'C', 'G', 'T'],
      ['G', 'A', 'T', 'C'],
    ],
    min: 1,
    max: 5,
  }
  const _0x4d209e = {
    name: 'growth',
    ordering: [
      ['G', 'C', 'T', 'A'],
      ['G', 'T', 'A', 'C'],
      ['A', 'T', 'G', 'C'],
      ['T', 'C', 'A', 'G'],
      ['C', 'T', 'G', 'A'],
      ['A', 'T', 'G', 'C'],
      ['A', 'C', 'G', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0x19adc5 = {
    name: 'drought',
    ordering: [
      ['C', 'T', 'G', 'A'],
      ['T', 'C', 'A', 'G'],
      ['C', 'A', 'G', 'T'],
      ['T', 'C', 'A', 'G'],
      ['G', 'A', 'C', 'T'],
      ['T', 'A', 'C', 'G'],
    ],
    min: 0,
    max: 100,
  }
  const _0x2213d0 = {
    name: 'grade',
    ordering: [
      ['C', 'A', 'G', 'T'],
      ['C', 'A', 'T', 'G'],
      ['G', 'C', 'T', 'A'],
      ['T', 'G', 'C', 'A'],
      ['C', 'A', 'G', 'T'],
      ['C', 'G', 'A', 'T'],
      ['C', 'T', 'A', 'G'],
    ],
    min: 20,
    max: 100,
  }
  const _0x158597 = {
    seed: 'cornkernel',
    item: 'corn',
    name: 'Corn',
    restricted: false,
    models: ['sm_cornplant_01', 'sm_cornplant_02', 'sm_cornplant_03'],
    deadModel: 'sm_cornplant_04',
    traits: [_0x118c43, _0x315b0c, _0x4d209e, _0x19adc5, _0x2213d0],
  }
  const _0x361fdc = {
    name: 'seeds',
    ordering: [
      ['C', 'G', 'A', 'T'],
      ['G', 'T', 'A', 'C'],
      ['C', 'A', 'T', 'G'],
      ['T', 'A', 'C', 'G'],
      ['C', 'A', 'T', 'G'],
      ['G', 'C', 'T', 'A'],
    ],
    min: 1,
    max: 5,
  }
  const _0x1aeb28 = {
    name: 'grade',
    ordering: [
      ['G', 'A', 'T', 'C'],
      ['T', 'G', 'C', 'A'],
      ['A', 'G', 'T', 'C'],
      ['T', 'G', 'A', 'C'],
      ['A', 'C', 'T', 'G'],
      ['A', 'T', 'G', 'C'],
      ['C', 'G', 'A', 'T'],
    ],
    min: 20,
    max: 100,
  }
  const _0x170831 = {
    name: 'yield',
    ordering: [
      ['T', 'A', 'C', 'G'],
      ['T', 'A', 'C', 'G'],
      ['G', 'A', 'C', 'T'],
      ['G', 'C', 'T', 'A'],
      ['T', 'C', 'A', 'G'],
      ['C', 'T', 'A', 'G'],
    ],
    min: 1,
    max: 5,
  }
  const _0x4c60a4 = {
    name: 'drought',
    ordering: [
      ['A', 'C', 'T', 'G'],
      ['C', 'T', 'G', 'A'],
      ['A', 'T', 'G', 'C'],
      ['C', 'T', 'G', 'A'],
      ['A', 'C', 'T', 'G'],
      ['G', 'T', 'C', 'A'],
    ],
    min: 0,
    max: 100,
  }
  const _0x1b94ed = {
    name: 'growth',
    ordering: [
      ['C', 'G', 'A', 'T'],
      ['T', 'G', 'A', 'C'],
      ['G', 'A', 'T', 'C'],
      ['G', 'T', 'A', 'C'],
      ['T', 'G', 'C', 'A'],
      ['G', 'C', 'T', 'A'],
      ['A', 'C', 'G', 'T'],
    ],
    min: 0,
    max: 100,
  }
  const _0x3a6a27 = {
    seed: 'beetrootseed',
    item: 'beetroot',
    name: 'Beet',
    restricted: false,
    models: ['sm_redbeet_01', 'sm_redbeet_02', 'sm_redbeet_03'],
    deadModel: 'sm_redbeet_04',
    traits: [_0x361fdc, _0x1aeb28, _0x170831, _0x4c60a4, _0x1b94ed],
  }
  const _0xca2050 = {
    pumpkin: _0x47f035,
    tomato: _0xf3e1f4,
    carrot: _0x2ed453,
    potato: _0x38c222,
    cabbage: _0x3be1b5,
    cucumber: _0xd0174c,
    watermelon: _0x3e6ae9,
    onion: _0xbfd14a,
    sunflower: _0x136c57,
    garlic: _0x3c0412,
    wheat: _0x199c32,
    radish: _0x43582f,
    corn: _0x158597,
    beetroot: _0x3a6a27,
  }
  const _0x540230 = _0xca2050,
    _0x402912 = null && [
      'Weeping',
      'Ocean',
      'Grim',
      'Glow',
      'Corrupting',
      'Raven',
      'Whomping',
      'Spicy',
      'Crawling',
      'Frozen',
      'Shadow',
      'Funky',
      'Wicked',
      'Glowing',
      'Chilling',
      'Blood',
      'Barbed',
      'Royal',
      'Horned',
      'Thorned',
      'Bouncing',
      'Sweet',
      'Creepy',
      'Cold',
      'Imperial',
      'Harmless',
      'Mammoth',
      'Bright',
      'Nightmare',
      'Anxious',
      'Miracle',
      'Smooth',
      'Wild',
      'Smelly',
      'Bleeding',
      'Velvet',
      'Stinking',
      'Hanging',
      'Bitter',
      'Aromatic',
      'Grubby',
      'Hapless',
      'Puny',
      'Shaggy',
      'Curved',
      'Cumbersome',
      'Jazzy',
      'Resolute',
      'Vulgar',
      'Pure',
      'Black',
      'Shocking',
      'Fluffy',
      'Cool',
      'Clear',
      'Rustic',
      'Stiff',
      'Craven',
      'Sticky',
      'Dizzy',
      'Greasy',
      'Sharp',
      'Messy',
      'Deep',
      'Mushy',
      'Ludicrous',
      'Lovely',
      'Spooky',
      'Ugly',
      'Acidic',
      'Scarce',
      'Flaky',
      'Chunky',
      'Tacky',
      'Bizarre',
      'Acrid',
      'Earthy',
      'Assorted',
      'Rough',
      'Splendid',
      'Lavish',
      'Measly',
      'Dark',
      'Light',
      'Nutty',
      'Enchanting',
      'Innocent',
      'Goofy',
      'Curly',
      'Short',
      'Confident',
      'Jaded',
      'Amazing',
      'Severe',
      'Ethereal',
      'Dapper',
      'Giant',
      'Kawaii',
      'Saiaku',
      'Oishii',
      'Kimoi',
      'Okii',
    ],
    _0x549af7 = null && [
      'White',
      'Pearl',
      'Alabaster',
      'Snow',
      'Ivory',
      'Cream',
      'Egg shell',
      'Cotton',
      'Chiffon',
      'Salt',
      'Lace',
      'Coconut',
      'Linen',
      'Bone',
      'Daisy',
      'Powder',
      'Frost',
      'Porcelain',
      'Parchment',
      'Rice',
      'Tan',
      'Beige',
      'Macaroon',
      'Hazle wood',
      'Granola',
      'Oat',
      'Egg nog',
      'Fawn',
      'Sugar',
      'Sand',
      'Sepia',
      'Latte',
      'Oyster',
      'Biscotti',
      'Parmesean',
      'Hazlenut',
      'Sandcastle',
      'Buttermilk',
      'Shortbread',
      'Yellow',
      'Canary',
      'Gold',
      'Daffodil',
      'Flaxen',
      'Butter',
      'Lemon',
      'Mustard',
      'Corn',
      'Medallion',
      'Dandelion',
      'Fire',
      'Bumblebee',
      'Banana',
      'Butterscotch',
      'Dijon',
      'Honey',
      'Blonde',
      'Pineapple',
      'Tuscan sun',
      'Orange',
      'Tangerine',
      'Merigold',
      'Cider',
      'Rust',
      'Ginger',
      'Tiger',
      'Fire',
      'Bronze',
      'Cantalouple',
      'Apricot',
      'Clay',
      'Carrot',
      'Squash',
      'Spice',
      'Marmalade',
      'Amber',
      'Sandstone',
      'Yam',
      'Red',
      'Cherry',
      'Rose',
      'Jam',
      'Merlot',
      'Garnet',
      'Crimson',
      'Ruby',
      'Scarlet',
      'Wine',
      'Brick',
      'Apple',
      'Mahogany',
      'Bloody',
      'Sangrina',
      'Berry',
      'Currant',
      'Blush',
      'Candy',
      'Lipstick',
      'Pink',
      'Fuscia',
      'Punch',
      'Blush',
      'Watermelon',
      'Flamingo',
      'Rouge',
      'Salmon',
      'Coral',
      'Peach',
      'Strawberry',
      'Rosewood',
      'Lemonade',
      'Taffy',
      'Bubblegum',
      'Crepe',
      'Magenta',
      'Hot pink',
      'Purple',
      'Mauve',
      'Violet',
      'Boysenberry',
      'Lavendar',
      'Plum',
      'Magenta',
      'Lilca',
      'Grape',
      'Periwinkle',
      'Sangria',
      'Eggplant',
      'Jam',
      'Iris',
      'Heather',
      'Amethyst',
      'Rasin',
      'Orchid',
      'Mulberry',
      'Wine',
      'Blue',
      'Slate',
      'Sky',
      'Navy',
      'Indigo',
      'Cobalt',
      'Teal',
      'Ocean',
      'Peacock',
      'Azure',
      'Cerulean',
      'Lapis',
      'Spruce',
      'Stone',
      'Aegean',
      'Berry',
      'Denim',
      'Admiral',
      'Sapphire',
      'Arctic',
      'Green',
      'Chartreuse',
      'Juniper',
      'Sage',
      'Lime',
      'Fern',
      'Olive',
      'Emerald',
      'Pear',
      'Moss',
      'Shamrock',
      'Seafoam',
      'Pine',
      'Parakeet',
      'Mint',
      'Seaweed',
      'Pickle',
      'Pistachio',
      'Basil',
      'Crocodile',
      'Brown',
      'Coffee',
      'Mocha',
      'Peanut',
      'Carob',
      'Hickory',
      'Wood',
      'Pecan',
      'Walnut',
      'Caramel',
      'Gingerbread',
      'Syrup',
      'Chocolate',
      'Penny',
      'Cedar',
      'Grey',
      'Shadow',
      'Graphite',
      'Iron',
      'Pewter',
      'Cloud',
      'Silver',
      'Smoke',
      'Slate',
      'Anchor',
      'Ash',
      'Porpoise',
      'Dove',
      'Fog',
      'Flint',
      'Charcoal',
      'Pebble',
      'Lead',
      'Coin',
      'Fossil',
      'Black',
      'Ebony',
      'Crow',
      'Charcoal',
      'Midnight',
      'Ink',
      'Raven',
      'Oil',
      'Grease',
      'Onyx',
      'Pitch',
      'Soot',
      'Sable',
      'Coal',
      'Metal',
      'Obsidian',
      'Spider',
      'Leather',
      'Senpai',
      'Niichan',
      'Momo',
    ],
    _0x19c9cf = null && [
      'Blossom',
      'Bloom',
      'Floret',
      'Floweret',
      'Posy',
      'Spike',
      'Bud',
      'Cluster',
      'Vine',
      'Flower',
      'Herb',
      'Plant',
      'Queen',
      'Eyes',
      'Bell',
      'Splendor',
      'Angela',
      'Boy',
      'Girl',
      'Noisette',
      'Dazzler',
      'Beauty',
      'Brunner',
      'Beauty',
      'Bear',
      'House',
      'Sister',
      'Heights',
      'Days',
      'Delight',
      'Tide',
      'Enchantress',
      'Climber',
      'Sunset',
      'Sunshine',
      'Celebration',
      'Glory',
      'Delight',
      'Blues',
      'Wish',
      'Kiss',
      'Morning',
      'Owl',
      'Flame',
      'Love',
      'Lane',
      'Skyliner',
      'Royale',
      'Dawn',
      'Romance',
      'Flourish',
      'Wishes',
      'Sparkle',
      'Symphony',
      'Spice',
      'Sky',
      'Fairy',
      'Dreams',
      'Wishes',
      'Trust',
      'Marks',
      'Sunset',
      'Masquerade',
      'Moon',
      'Sun',
      'Planet',
      'Life',
      'Queen',
      'King',
      'Maiden',
      'Storm',
      'Wings',
      'Jewel',
      'Magesty',
      'Iceberg',
      'Stone',
      'Wishes',
      'Moments',
      'Surprise',
      'Magic',
      'Heaven',
      'Special',
      'Perfume',
      'Fever',
      'Sweetheart',
      'Wonder',
      'Gent',
      'Lady',
      'Heart',
      'Kiss',
      'Knight',
      'Thanks',
      'Daisuki',
      'Nameru',
    ]
  const _0x2a6326 = _0x84559e.g.exports,
    _0x5b916b = (_0x3db869) => {
      const _0x34ce3f = _0x2a6326['ev-objects'].GetObjectByEntity(_0x3db869)
      if (!_0x34ce3f) {
        throw new Error('Unable to find world object for entity id ' + _0x3db869)
      }
      return (_0x4bae7c) => _0x4bae7c(_0x34ce3f)
    },
    _0x1620b2 = (_0x5438a4) =>
      (_0x5438a4.data.metadata.ownedUntil || 0) > Date.now()
        ? _0x5438a4.data.metadata.owner || null
        : null,
    _0x5b268d = (_0x3d8b90) => {
      const _0xd218fa = _0x84559e.g.exports.isPed.isPed('cid')
      return _0x1620b2(_0x3d8b90) === _0xd218fa
    },
    _0x2602e5 = (_0x4fc19b) => {
      var _0x4806d1, _0x7c4ca4
      return (
        _0x4fc19b.data.metadata.free ||
        _0x5b268d(_0x4fc19b) ||
        ((_0x4fc19b.data.metadata.ownedUntil || 0) &&
          ((_0x7c4ca4 =
            (_0x4806d1 = _0x4fc19b.data.metadata) === null ||
            _0x4806d1 === void 0
              ? void 0
              : _0x4806d1.workers) === null || _0x7c4ca4 === void 0
            ? void 0
            : _0x7c4ca4.includes(_0x84559e.g.exports.isPed.isPed('cid'))))
      )
    },
    _0x551989 = (_0x48c1a3, _0x400b1e, _0x5b07b2) => {
      if (!DoesEntityExist(_0x48c1a3)) {
        return false
      }
      const _0x1f92fe = GetEntityCoords(_0x48c1a3, true)
      return (
        _0x400b1e.reduce(
          (_0x383243, _0x169b45, _0x176296) =>
            (_0x383243 += (_0x169b45 - _0x1f92fe[_0x176296]) ** 2),
          0
        ) <=
        _0x5b07b2 ** 2
      )
    },
    _0x33de49 = (_0x2ef599, _0x528989, _0xd9d147) => {
      if (!DoesEntityExist(_0x2ef599)) {
        return false
      }
      const _0xfd5b83 = GetEntityCoords(_0x2ef599, true)
      return (
        (_0x528989[0] - _0xfd5b83[0]) ** 2 +
          (_0x528989[1] - _0xfd5b83[1]) ** 2 <=
        _0xd9d147 ** 2
      )
    },
    _0x1ada44 = (_0x3c6b59, _0x61196, _0xce88c6, _0x16faed) =>
      (_0x2a6326['ev-objects'].GetVisibleEntities() || [])
        .filter((_0x152b65) =>
          _0x551989(_0x152b65, [_0x3c6b59, _0x61196, _0xce88c6], _0x16faed)
        )
        .map((_0x1113a1) =>
          _0x2a6326['ev-objects'].GetObjectByEntity(_0x1113a1)
        )
        .filter((_0x5a8fde) => _0x5a8fde && _0x5a8fde.ns === 'crops')
  const _0x659618 = () =>
    setImmediate(() => {
      const _0xeabc73 = {
        event: 'ev-farming:water',
        id: 'crop_water',
        icon: 'tint',
        label: 'Water',
        parameters: {},
      }
      const _0x1536b3 = { time: 30000 }
      const _0x1b071f = {
        event: 'ev-farming:destroy',
        id: 'crop_destroy',
        icon: 'angry',
        label: 'Destroy',
        parameters: _0x1536b3,
      }
      const _0x185892 = {
        event: 'ev-farming:checkStrain',
        id: 'crop_check_strain',
        icon: 'align-justify',
        label: 'Check Strain',
        parameters: {},
      }
      const _0x4da474 = { radius: 4 }
      _0x84559e.g.exports['ev-interact'].AddPeekEntryByModel(
        Object.values(_0x540230).reduce((_0x4ad2af, { models: _0x8362ec }) => {
          return (
            _0x8362ec.slice(0, _0x8362ec.length - 1).forEach((_0x1f639d) => {
              _0x4ad2af.push(GetHashKey(_0x1f639d))
            }),
            _0x4ad2af
          )
        }, []),
        [_0xeabc73, _0x1b071f, _0x185892],
        {
          distance: _0x4da474,
          isEnabled: (_0x6ce2cf) => {
            return _0x5b916b(_0x6ce2cf)((_0x4f37b4) => !!_0x4f37b4)
          },
        }
      )
      const _0x5375f6 = { time: 4000 }
      const _0x28cfe7 = {
        event: 'ev-farming:destroy',
        id: 'crop_destroy_dead',
        icon: 'angry',
        label: 'Destroy dead crop',
        parameters: _0x5375f6,
      }
      const _0x585eda = {
        event: 'ev-farming:checkStrain',
        id: 'crop_dead_check_strain',
        icon: 'align-justify',
        label: 'Check Strain',
        parameters: {},
      }
      const _0x3b2d0b = { radius: 4 }
      _0x84559e.g.exports['ev-interact'].AddPeekEntryByModel(
        Object.values(_0x540230).map(({ deadModel: _0x476a0a }) =>
          GetHashKey(_0x476a0a)
        ),
        [_0x28cfe7, _0x585eda],
        {
          distance: _0x3b2d0b,
          isEnabled: (_0x2ba534) => {
            return _0x5b916b(_0x2ba534)((_0x1c5826) => !!_0x1c5826)
          },
        }
      )
      const _0x1b5a87 = Object.values(_0x540230).map(({ models: _0x45bdac }) =>
          GetHashKey(_0x45bdac[_0x45bdac.length - 1])
        ),
        _0x347bf2 = {
          event: 'ev-farming:harvest',
          id: 'crop_harvest',
          icon: 'carrot',
          label: 'Harvest',
          parameters: {},
        }
      const _0x36ea87 = { radius: 4 }
      _0x84559e.g.exports['ev-interact'].AddPeekEntryByModel(
        _0x1b5a87,
        [_0x347bf2],
        {
          distance: _0x36ea87,
          isEnabled: (_0x41f543) => {
            return _0x5b916b(_0x41f543)((_0x54e54e) => !!_0x54e54e)
          },
        }
      )
      const _0x40df01 = {
        event: 'ev-farming:steal',
        id: 'crop_steal',
        icon: 'cut',
        label: 'Steal',
        parameters: {},
      }
      const _0x307a35 = {
        event: 'ev-farming:checkStrain',
        id: 'crop_grown_check_strain',
        icon: 'align-justify',
        label: 'Check Strain',
        parameters: {},
      }
      const _0x21ad2c = { radius: 4 }
      _0x84559e.g.exports['ev-interact'].AddPeekEntryByModel(
        _0x1b5a87,
        [_0x40df01, _0x307a35],
        {
          distance: _0x21ad2c,
          isEnabled: (_0x1068bb) => {
            let _0x553a91 = false
            try {
              _0x553a91 = _0x5b916b(_0x1068bb)(
                (_0x206d79) => _0x206d79.ns !== 'crops_wild'
              )
            } catch (_0xf0a279) {
              console.error(_0xf0a279)
            }
            return _0x553a91
          },
        }
      )
      const _0x4b7c21 = {
        hours: 3,
        cost: 250,
      }
      const _0x223e1a = {
        event: 'ev-farming:rentFarm',
        id: 'farm_rent_3',
        icon: 'dollar-sign',
        label: 'Rent this farm for 3 hours ($250)',
        parameters: _0x4b7c21,
      }
      const _0x59b967 = {
        hours: 6,
        cost: 500,
      }
      const _0x1a0b29 = {
        event: 'ev-farming:rentFarm',
        id: 'farm_rent_6',
        icon: 'dollar-sign',
        label: 'Rent this farm for 6 hours ($500)',
        parameters: _0x59b967,
      }
      const _0x251ea4 = {
        hours: 12,
        cost: 1000,
      }
      const _0x4d3176 = {
        event: 'ev-farming:rentFarm',
        id: 'farm_rent_12',
        icon: 'dollar-sign',
        label: 'Rent this farm for 12 hours ($1,000)',
        parameters: _0x251ea4,
      }
      const _0x5c2729 = { radius: 6 }
      _0x84559e.g.exports['ev-interact'].AddPeekEntryByModel(
        [GetHashKey('np_garden_001')],
        [_0x223e1a, _0x1a0b29, _0x4d3176],
        {
          distance: _0x5c2729,
          isEnabled: (_0x281282) => {
            let _0x5e4c99 = false
            try {
              _0x5e4c99 = _0x5b916b(_0x281282)((_0x168f4b) => {
                if (_0x168f4b.data.metadata.free) {
                  return false
                }
                if ((_0x168f4b.data.metadata.ownedUntil || 0) < Date.now()) {
                  return true
                }
                return false
              })
            } catch (_0x2f1269) {
              console.error(_0x2f1269)
            }
            return _0x5e4c99
          },
        }
      )
      const _0x3b6b81 = {
        event: 'ev-farming:addWorker',
        id: 'farm_add_worker',
        icon: 'user-plus',
        label: 'Add additional worker',
        parameters: {},
      }
      const _0x173fd8 = {
        event: 'ev-farming:removeWorker',
        id: 'farm_remove_worker',
        icon: 'user-times',
        label: 'Remove additional worker',
        parameters: {},
      }
      const _0x58ae78 = {
        event: 'ev-farming:releaseFarm',
        id: 'farm_release',
        icon: 'minus',
        label: 'Release control of this farm',
        parameters: {},
      }
      const _0xe96bd2 = { radius: 6 }
      _0x84559e.g.exports['ev-interact'].AddPeekEntryByModel(
        [GetHashKey('np_garden_001')],
        [_0x3b6b81, _0x173fd8, _0x58ae78],
        {
          distance: _0xe96bd2,
          isEnabled: (_0x43e354) => {
            let _0x47002f = false
            try {
              _0x47002f = _0x5b916b(_0x43e354)((_0x48688a) => {
                const _0x4f260b = _0x84559e.g.exports.isPed.isPed('cid'),
                  { metadata: _0x322f58 } = _0x48688a.data
                return (
                  !_0x322f58.free &&
                  (_0x322f58.ownedUntil || 0) > Date.now() &&
                  _0x322f58.owner === _0x4f260b
                )
              })
            } catch (_0x96be3d) {
              console.error(_0x96be3d)
            }
            return _0x47002f
          },
        }
      )
      const _0x37cba8 = {
        x: 3536.92,
        y: 3664.5,
        z: 28.12,
      }
      const _0x34b5a6 = {
        heading: 350,
        minZ: 27.12,
        maxZ: 30.72,
      }
      _0x84559e.g.exports['ev-polyzone'].AddBoxZone(
        'humane_lab1',
        _0x37cba8,
        9.6,
        8.2,
        _0x34b5a6
      )
    })
  const _0x474315 = Object.entries(_0x540230).reduce(
    (_0x52a568, [_0x47e689, { seed: _0x3bdca3 }]) => {
      return (_0x52a568[_0x3bdca3] = _0x47e689), _0x52a568
    },
    {}
  )
  var _0x5af08a =
    (undefined && undefined['__rest']) ||
    function (_0x32a7f2, _0x5f0f70) {
      var _0x46f964 = { _0x438b73: _0x32a7f2[_0x438b73] }
      for (var _0x438b73 in _0x32a7f2)
        if (
          Object.prototype.hasOwnProperty.call(_0x32a7f2, _0x438b73) &&
          _0x5f0f70.indexOf(_0x438b73) < 0
        ) {
        }
      if (
        _0x32a7f2 != null &&
        typeof Object.getOwnPropertySymbols === 'function'
      ) {
        for (
          var _0x43f940 = 0,
            _0x438b73 = Object.getOwnPropertySymbols(_0x32a7f2);
          _0x43f940 < _0x438b73.length;
          _0x43f940++
        ) {
          if (
            _0x5f0f70.indexOf(_0x438b73[_0x43f940]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(
              _0x32a7f2,
              _0x438b73[_0x43f940]
            )
          ) {
            _0x46f964[_0x438b73[_0x43f940]] = _0x32a7f2[_0x438b73[_0x43f940]]
          }
        }
      }
      return _0x46f964
    }
  const _0xfa09f2 = _0x84559e.g.exports,
    _0x54e265 = GetHashKey('np_garden_001'),
    _0x2b5530 = () => {
      on('ev-inventory:itemUsed',
        async (_0x151380, _0x3dadbf, _0x37b2da, _0x147ebe) => {
          const _0xf08148 = _0x474315[_0x151380]
          if (!_0xf08148) {
            _0x151380 === 'farmhoe' &&
              emit('DoLHudText', 1, 'farm-crop-hoe', 'Plant 2 or more seeds to use')
            return
          }
          const { models: _0x139c0c, restricted: _0x1ca879 } =
            _0x540230[_0xf08148]
          let _0x42ffac = null,
            _0x2087bf = null,
            _0xbecfa5 = null,
            _0x5c9fbe = false,
            _0x4a31ad = {}
          try {
            _0x4a31ad = JSON.parse(_0x3dadbf)
          } catch (_0x3e213f) {}
          const _0x1d13ae = exports['ev-inventory'].getItemsOfType(_0x151380, 16, true),
            _0x55cfa4 = _0x1d13ae.find(
              (_0x34a5df) => _0x34a5df.slot === _0x147ebe
            ),
            _0x53c726 = GetHashKey(_0x139c0c[0])
          if (
            exports['ev-inventory'].hasEnoughOfItem(
              'farmhoe',
              1,
              false,
              true
            ) &&
            (_0x55cfa4 === null || _0x55cfa4 === void 0
              ? void 0
              : _0x55cfa4.amount) > 1
          ) {
            emit(
              'DoLHudText',
              1,
              'farm-crop-multi-place',
              'Scroll to increase # of seeds planted, E to plant'
            )
            const [_0x3f2659, _0x4edabf] = await _0xfa09f2['ev-objects'].MultiPlaceObject(
              _0x53c726,
              {
                maxPoints: Math.min(_0x55cfa4.amount - 1, 16),
                minDistBetweenPoints: 0.76,
                maxLineDistance: 12.5,
              },
              (
                { x: _0xd09d9d, y: _0x35699b, z: _0x11e31a },
                _0x3870b4,
                _0x5af8f5,
                _0x361e4c
              ) => {
                if (
                  _0x3870b4 === -700658213 &&
                  GetEntityModel(_0x361e4c) === _0x54e265
                ) {
                  const _0x50d144 = _0x1ada44(
                    _0xd09d9d,
                    _0x35699b,
                    _0x11e31a,
                    0.76
                  )
                  if (_0x42ffac && _0x42ffac !== _0x361e4c) {
                    return false
                  }
                  return (_0x42ffac = _0x361e4c), _0x50d144.length === 0
                }
                return false
              }
            )
            if (!_0x3f2659 || !_0x42ffac) {
              return
            }
            _0x5c9fbe = true
            _0x2087bf = _0x4edabf.coords
            _0xbecfa5 = _0x4edabf.rotations
          } else {
            emit(
              'DoLHudText',
              1,
              'farm-crop-look-down',
              'Look down and plant your crop.'
            )
            const _0x491fcc = {
              collision: false,
              groundSnap: false,
              adjustZ: false,
              distance: 1.8,
            }
            const [_0x4fdf93, _0x8cace6] = await _0xfa09f2[
              'ev-objects'
            ].PlaceObject(
              _0x53c726,
              _0x491fcc,
              (
                { x: _0x209b3f, y: _0x385e04, z: _0x5a1c09 },
                _0x4e8132,
                _0x44529b,
                _0x24b363
              ) => {
                if (
                  _0x4e8132 === -700658213 &&
                  GetEntityModel(_0x24b363) === _0x54e265
                ) {
                  const _0xcfa586 = _0x1ada44(
                    _0x209b3f,
                    _0x385e04,
                    _0x5a1c09,
                    0.76
                  )
                  return (_0x42ffac = _0x24b363), _0xcfa586.length === 0
                }
                return false
              }
            )
            if (!_0x4fdf93 || !_0x42ffac) {
              return
            }
            _0x2087bf = _0x8cace6.coords
            _0xbecfa5 = _0x8cace6.rotation
          }
          _0x5b916b(_0x42ffac)(async (_0x344a41) => {
            if (_0x1ca879 && !_0x344a41.data.metadata.restricted) {
              return emit(
                'DoLHudText',
                2,
                'farm-crop-restricted',
                "This particular crop can't be grown here."
              )
            }
            const _0x38fb8d = PlayerPedId()
            if (!_0x2602e5(_0x344a41)) {
              return emit(
                'DoLHudText',
                2,
                'farm-no-permission',
                'You do not have permission to do this.'
              )
            }
            const _0x3fbf36 = async (_0x28869d, _0x3880a6, _0x1911ce) => {
              const { x: _0x5b5f83, y: _0x198bde, z: _0x6db767 } = _0x28869d,
                [, _0x4d3963] = await Promise.all([
                  (async () => {
                    TaskTurnPedToFaceCoord(
                      _0x38fb8d,
                      _0x5b5f83,
                      _0x198bde,
                      _0x6db767,
                      -1
                    )
                    await new Promise((_0x1f9d6a) =>
                      setTimeout(_0x1f9d6a, 1000)
                    )
                    TaskStartScenarioInPlace(
                      _0x38fb8d,
                      'WORLD_HUMAN_GARDENER_PLANT',
                      0,
                      false
                    )
                  })(),
                  new Promise((_0x72330e) =>
                    _0x84559e.g.exports['ev-taskbar'].taskBar(
                      2500,
                      'Planting...',
                      false,
                      true,
                      null,
                      false,
                      _0x72330e
                    )
                  ),
                ])
              ClearPedTasksImmediately(_0x38fb8d)
              ClearPedSecondaryTask(_0x38fb8d)
              const _0x198588 = _0x1911ce,
                { _hideKeys: _0x30d486 } = _0x198588,
                _0xea3e3c = _0x5af08a(_0x198588, ['_hideKeys']),
                _0xbba2e5 = _0x84559e.g.exports['ev-inventory'].hasEnoughOfItem(
                  _0x151380,
                  1,
                  false,
                  true,
                  _0xea3e3c
                )
              if (_0x4d3963 === 100 && _0xbba2e5) {
                const _0x127e2e = _0x1ada44(
                  _0x5b5f83,
                  _0x198bde,
                  _0x6db767,
                  3
                ).map((_0x47f105) => _0x47f105.id)
                if (
                  await _0x3526d8.execute(
                    'ev-farming:plant',
                    _0x5b5f83,
                    _0x198bde,
                    _0x6db767,
                    _0xf08148,
                    _0x344a41.id,
                    _0x4a31ad || {},
                    _0x127e2e,
                    _0x3880a6
                  )
                ) {
                  return (
                    emit(
                      'inventory:removeItemByMultipleMetaKV',
                      _0x151380,
                      1,
                      _0xea3e3c !== null && _0xea3e3c !== void 0
                        ? _0xea3e3c
                        : {},
                      true
                    ),
                    true
                  )
                }
                emit(
                  'DoLHudText',
                  2,
                  'farm-no-permission',
                  'You do not have permission to do this.'
                )
              }
              return false
            }
            if (_0x5c9fbe) {
              const _0x5a4c3f = _0x2087bf,
                _0x1ac3f7 = _0xbecfa5
              for (
                let _0x2403e0 = _0x5a4c3f.length - 1;
                _0x2403e0 >= (_0x5a4c3f.length > 2 ? 1 : 0);
                _0x2403e0--
              ) {
                const _0x524c97 = _0x5a4c3f[_0x2403e0],
                  _0x112d67 = _0x1ac3f7[_0x2403e0]
                if (!_0x524c97 || !_0x112d67) {
                  continue
                }
                TaskGoStraightToCoord(
                  _0x38fb8d,
                  _0x5a4c3f[_0x2403e0].x,
                  _0x5a4c3f[_0x2403e0].y,
                  _0x5a4c3f[_0x2403e0].z,
                  1,
                  3000,
                  0,
                  0.2
                )
                await new Promise((_0x55cd87) => setTimeout(_0x55cd87, 1000))
                const _0x5d4167 = await _0x3fbf36(
                  _0x5a4c3f[_0x2403e0],
                  _0x1ac3f7[_0x2403e0],
                  _0x4a31ad
                )
                if (!_0x5d4167) {
                  break
                }
              }
              return
            }
            await _0x3fbf36(_0x2087bf, _0xbecfa5, _0x4a31ad)
          })
        }
      )
    }
  const _0x16b3e4 = () => {
    on('ev-farming:addWorker', async (_0x223de, _0x353d8f) =>
      _0x5b916b(_0x353d8f)(async (_0x374387) => {
        if (!_0x5b268d(_0x374387)) {
          return emit(
            'DoLHudText',
            2,
            'farm-no-permission',
            'You are not the current owner of this farm.'
          )
        }
        const _0x180188 = {
          icon: 'user-edit',
          label: 'Citizen ID',
          name: 'cid',
        }
        const _0x149e7e = {
          callbackUrl: 'ev-farming:ui:addWorker',
          key: _0x374387.id,
          items: [_0x180188],
          show: true,
        }
        _0x84559e.g.exports['ev-ui'].openApplication('textbox', _0x149e7e)
      })
    )
    RegisterUICallback('ev-farming:ui:addWorker', async (_0x30fa9d, _0x5d8203) => {
        const _0x2db3d4 = {
          ok: true,
          message: '',
        }
        const _0x16d099 = {
          data: {},
          meta: _0x2db3d4,
        }
        _0x5d8203(_0x16d099)
        _0x84559e.g.exports['ev-ui'].closeApplication('textbox')
        const { cid: _0x4c4665 } = _0x30fa9d.values
        if (String(Number(_0x4c4665)) !== _0x4c4665) {
          return emit(
            'DoLHudText',
            2,
            'farm-invaid-state-id',
            'Please enter a valid Citizen Id.'
          )
        }
        if (
          await _0x3526d8.execute(
            'ev-farming:addWorker',
            _0x30fa9d.key,
            _0x4c4665
          )
        ) {
          return emit(
            'DoLHudText',
            1,
            'farm-worker-added',
            'You have added an additional worker to the farm.'
          )
        }
        emit(
          'DoLHudText',
          2,
          'farm-worker-not-added',
          'This worker could not be added.'
        )
      }
    )
  }
  const _0x23bd5f = () => {
    on('ev-farming:destroy', async ({ time: _0x1b8b59 }, _0x56c520) =>
      _0x5b916b(_0x56c520)(async (_0x2a2cdb) => {
        const _0x541914 = PlayerPedId(),
          [, _0x113e74] = await Promise.all([
            (async () => {
              TaskTurnPedToFaceEntity(_0x541914, _0x56c520, 0)
              await new Promise((_0x2e77b6) => setTimeout(_0x2e77b6, 1000))
              TaskStartScenarioInPlace(
                _0x541914,
                'WORLD_HUMAN_GARDENER_PLANT',
                0,
                true
              )
            })(),
            new Promise((_0x490676) =>
              _0x84559e.g.exports['ev-taskbar'].taskBar(
                _0x1b8b59,
                'Destroying...',
                false,
                true,
                null,
                false,
                _0x490676
              )
            ),
          ])
        ClearPedTasksImmediately(_0x541914)
        ClearPedSecondaryTask(_0x541914)
        if (_0x113e74 === 100) {
          if (!(await _0x3526d8.execute('ev-farming:destroy', _0x2a2cdb.id))) {
            return emit(
              'DoLHudText',
              2,
              'farm-no-permission',
              'You do not have permission to do this.'
            )
          }
        }
      })
    )
  }
  const _0x1ad666 = _0x84559e.g.exports,
    _0x2c6f4d = () => {
      on('ev-inventory:itemUsed', async (_0x3b6724, _0x1e65a6, _0x3b229c) => {
        if (_0x3b6724 !== 'pitchfork') {
          return
        }
        const _0x2cee4c = { size: 2.5 }
        const [_0x198125, _0xc742c7] = await _0x1ad666['ev-objects'].GroupSelect(_0x2cee4c, (_0xbc729d) => {
          try {
            return _0x5b916b(_0xbc729d)((_0xfe5b5b) => !!_0xfe5b5b)
          } catch (_0x14f7d8) {}
          return false
        })
        if (!_0x198125) {
          return
        }
        const _0x19c04c = Object.values(_0x540230).map(
          ({ models: _0x4e1b9d }) => GetHashKey(_0x4e1b9d[_0x4e1b9d.length - 1])
        )
        for (let _0x472f7a = 0; _0x472f7a < _0xc742c7.length; _0x472f7a++) {
          const _0xe69fc9 = _0xc742c7[_0x472f7a]
          await _0x5b916b(_0xe69fc9)(async (_0x3f3551) => {
            if (!_0x19c04c.includes(_0x3f3551.data.model)) {
              return
            }
            emit('ev-farming:harvest', {}, _0xe69fc9)
            await new Promise((_0x217ce6) => setTimeout(_0x217ce6, 3000))
          })
        }
      })
      on('ev-farming:harvest', async (_0x5c0eff, _0x43e16e) =>
        _0x5b916b(_0x43e16e)(async (_0x1a55a3) => {
          const _0x4593c1 = PlayerPedId(),
            [, _0x419ca3] = await Promise.all([
              (async () => {
                TaskTurnPedToFaceEntity(_0x4593c1, _0x43e16e, 0)
                await new Promise((_0x38ab39) => setTimeout(_0x38ab39, 1000))
                TaskStartScenarioInPlace(
                  _0x4593c1,
                  'WORLD_HUMAN_GARDENER_PLANT',
                  0,
                  false
                )
              })(),
              new Promise((_0xd57c7f) =>
                _0x84559e.g.exports['ev-taskbar'].taskBar(
                  2500,
                  'Harvesting...',
                  false,
                  true,
                  null,
                  false,
                  _0xd57c7f
                )
              ),
            ])
          ClearPedTasksImmediately(_0x4593c1)
          ClearPedSecondaryTask(_0x4593c1)
          if (_0x419ca3 === 100) {
            const [_0x275eb2, _0x508f9a, _0x2ffec2] = GetEntityCoords(
                _0x43e16e,
                false
              ),
              _0x483c00 = _0x1ada44(_0x275eb2, _0x508f9a, _0x2ffec2, 3).map(
                (_0x9554d) => _0x9554d.id
              )
            if (
              !(await _0x3526d8.execute(
                'ev-farming:harvest',
                _0x1a55a3.id,
                _0x483c00
              ))
            ) {
              return emit(
                'DoLHudText',
                2,
                'farm-no-permission',
                'You do not have permission to do this.'
              )
            }
          }
        })
      )
    }
  const _0x5d0545 = () => {
    on('ev-farming:removeWorker', async (_0x5964bb, _0x18b9fc) =>
      _0x5b916b(_0x18b9fc)(async (_0x2386fa) => {
        var _0xa71d14
        if (!_0x5b268d(_0x2386fa)) {
          return emit(
            'DoLHudText',
            2,
            'farm-no-permission',
            'You are not the current owner of this farm.'
          )
        }
        const _0x797098 = (
          ((_0xa71d14 = _0x2386fa.data.metadata) === null ||
          _0xa71d14 === void 0
            ? void 0
            : _0xa71d14.workers) || []
        ).filter((_0x5af144) => typeof _0x5af144 === 'number')
        if (_0x797098.length === 0) {
          return emit(
            'DoLHudText',
            2,
            'farm-no-workers',
            'There are currently no addiitonal workers on this farm.'
          )
        }
        _0x84559e.g.exports['ev-ui'].openApplication('textbox', {
          callbackUrl: 'ev-farming:ui:removeWorker',
          key: _0x2386fa.id,
          items: [
            {
              _type: 'select',
              options: _0x797098.map((_0x3b5ce9) => ({
                id: _0x3b5ce9,
                name: _0x3b5ce9,
              })),
              icon: 'user-edit',
              label: 'Worker',
              name: 'cid',
            },
          ],
          show: true,
        })
      })
    )
    RegisterUICallback('ev-farming:ui:removeWorker', async (_0x56fe87, _0x473374) => {
        const _0x31e545 = {
          ok: true,
          message: '',
        }
        const _0x177805 = {
          data: {},
          meta: _0x31e545,
        }
        _0x473374(_0x177805)
        _0x84559e.g.exports['ev-ui'].closeApplication('textbox')
        if (
          await _0x3526d8.execute(
            'ev-farming:removeWorker',
            _0x56fe87.key,
            _0x56fe87.values.cid
          )
        ) {
          return emit(
            'DoLHudText',
            1,
            'farm-worker-removed',
            'You have successfully removed a worker from this farm.'
          )
        }
        emit(
          'DoLHudText',
          2,
          'farm-worker-not-removed',
          'This worker could not be removed.'
        )
      }
    )
  }
  const _0x8e0ee6 = () => {
    on('ev-farming:rentFarm', async ({ hours: _0x169736, cost: _0x57d7f2 }, _0x14a25e) => {
        _0x5b916b(_0x14a25e)(async (_0x140891) => {
          const _0x1526e2 = _0x1620b2(_0x140891)
          if (_0x1526e2) {
            if (!_0x5b268d(_0x140891)) {
              return emit(
                'DoLHudText',
                2,
                'farm-already-owned',
                'This farm is already being rented by someone else.'
              )
            }
            return emit(
              'DoLHudText',
              2,
              'farm-already-owner',
              'You are already renting this farm.'
            )
          }
          const { success: _0x1a85b7, reason: _0x287152 } =
            await _0x3526d8.execute(
              'ev-farming:rentFarm',
              _0x140891.id,
              _0x169736,
              _0x57d7f2
            )
          if (_0x1a85b7) {
            return emit(
              'DoLHudText',
              1,
              'farm-successful-rent',
              'Congratulations! You are now renting this farm.'
            )
          }
          if (_0x287152 === 'cash') {
            return emit(
              'DoLHudText',
              2,
              'farm-rent-failure-cash',
              'You do not have enough cash.'
            )
          }
          return emit(
            'DoLHudText',
            2,
            'farm-rent-failure',
            'You can not rent this farm right now.'
          )
        })
      }
    )
  }
  const _0x2fb725 = () => {
    on('ev-farming:water', async (_0x3d5262, _0xe6ebca) =>
      _0x5b916b(_0xe6ebca)(async (_0x1e4ec3) => {
        const _0x1f9371 = _0x84559e.g.exports['ev-inventory'].getItemsOfType(
          'wateringcan',
          1,
          2
        )
        if (_0x1f9371.length === 0) {
          return emit(
            'DoLHudText',
            2,
            'farm-no-water',
            'You do not have a filled watering can'
          )
        }
        const _0x4ea83c = _0x1f9371[0].id,
          _0x41563c = PlayerPedId(),
          _0x132b7f = 'weapon@w_sp_jerrycan',
          _0x130366 = 'fire'
        await _0x138d24.loadAnim(_0x132b7f)
        const [, _0x24941e] = await Promise.all([
          (async () => {
            TaskTurnPedToFaceEntity(_0x41563c, _0xe6ebca, 0)
            await new Promise((_0x583809) => setTimeout(_0x583809, 1000))
            emit('attachItem', 'wateringcan2')
            TaskPlayAnim(
              _0x41563c,
              _0x132b7f,
              _0x130366,
              8,
              -8,
              -1,
              49,
              0,
              false,
              false,
              false
            )
            const _0x552ff5 =
              _0x84559e.g.exports['ev-propattach'].GetAttachedProp()
            if (_0x552ff5) {
              emitNet('fx:waterPour', NetworkGetNetworkIdFromEntity(_0x552ff5))
            }
          })(),
          new Promise((_0x28998b) =>
            _0x84559e.g.exports['ev-taskbar'].taskBar(
              4000,
              'Watering...',
              false,
              true,
              null,
              false,
              _0x28998b
            )
          ),
        ])
        if (_0x24941e === 100) {
          if (!(await _0x3526d8.execute('ev-farming:water', _0x1e4ec3.id))) {
            emit(
              'DoLHudText',
              2,
              'farm-no-permission',
              'You do not have permission to do this.'
            )
          } else {
            const _0x55a128 = _0x84559e.g.exports.isPed.isPed('cid')
            emit('ev-farming:plantWatered')
            emitNet('inventory:degItem', _0x4ea83c, 1, 'wateringcan', _0x55a128)
          }
        }
        ClearPedTasks(_0x41563c)
        emit('destroyProp')
      })
    )
  }
  const _0x1b7010 = () => {
    on('ev-farming:steal', async (_0x4b7fa4, _0x44b1b7) =>
      _0x5b916b(_0x44b1b7)(async (_0x202512) => {
        const _0xe92697 = PlayerPedId(),
          [, _0x49bc8d] = await Promise.all([
            (async () => {
              TaskTurnPedToFaceEntity(_0xe92697, _0x44b1b7, 0)
              await new Promise((_0x512b24) => setTimeout(_0x512b24, 1000))
              TaskStartScenarioInPlace(
                _0xe92697,
                'WORLD_HUMAN_GARDENER_PLANT',
                0,
                true
              )
            })(),
            new Promise((_0x48b243) =>
              _0x84559e.g.exports['ev-taskbar'].taskBar(
                30000,
                'Stealing...',
                false,
                true,
                null,
                false,
                _0x48b243
              )
            ),
          ])
        _0x49bc8d === 100 &&
          (await _0x3526d8.execute('ev-farming:steal', _0x202512.id))
        ClearPedTasksImmediately(_0xe92697)
        ClearPedSecondaryTask(_0xe92697)
      })
    )
  }
  const _0x9adf16 = () => {
    on('ev-farming:releaseFarm', async (_0x58f95f, _0x43aaf9) => {
      _0x5b916b(_0x43aaf9)(async (_0x2b434e) => {
        if (!_0x5b268d(_0x2b434e)) {
          return emit(
            'DoLHudText',
            2,
            'farm-no-permission',
            'You are not the current owner of this farm.'
          )
        }
        const _0x4d7838 = await _0x3526d8.execute(
          'ev-farming:releaseFarm',
          _0x2b434e.id
        )
        if (_0x4d7838) {
          return emit(
            'DoLHudText',
            1,
            'farm-successful-rent',
            'You no longer have control of this farm.'
          )
        }
        return emit(
          'DoLHudText',
          2,
          'farm-release-failure',
          'You can not do this right now.'
        )
      })
    })
  }
  const _0x13b3b1 = () => {
    on('ev-farming:checkStrain', async (_0x375fb3, _0xe2e41b) =>
      _0x5b916b(_0xe2e41b)(async (_0x25e86d) => {
        const _0x20541d = await _0x3526d8.execute(
          'ev-farming:checkStrain',
          _0x25e86d.id
        )
        if (_0x20541d) {
          return emit(
            'DoLongHudText',
            _0x20541d.name + ' - ' + _0x20541d.genomeName,
            1,
            12000,
            { i18n: [_0x20541d.name] }
          )
        }
      })
    )
  }
  const _0x1bc27c = () => {
    _0x2b5530()
    _0x16b3e4()
    _0x23bd5f()
    _0x2c6f4d()
    _0x5d0545()
    _0x8e0ee6()
    _0x2fb725()
    _0x1b7010()
    _0x9adf16()
    _0x13b3b1()
  }
  const _0x5db52f = new Map(),
    _0x1eb1b2 = GetHashKey('mud_decal_farming')
  _0x659618()
  _0x1bc27c()
  setImmediate(() => {
    _0x3526d8.execute('ev-datagrid:subscribe', 'crops')
    _0x3526d8.execute('ev-datagrid:subscribe', 'crops_wild')
  })
  const _0x41ec8f = async (_0x491cda, _0x52a0a8, _0x142b25 = false) => {
    await _0x138d24.loadModel(_0x1eb1b2)
    const [_0x4a863f, _0x45c390, _0x45adf8] = GetEntityCoords(_0x491cda, false),
      _0x270fce = CreateObjectNoOffset(
        _0x1eb1b2,
        _0x4a863f,
        _0x45c390,
        _0x45adf8 + (_0x142b25 ? 0.55 : 0.05),
        false,
        false,
        false
      )
    return (
      SetEntityAlpha(
        _0x270fce,
        Math.round(25.5 * (_0x142b25 ? _0x52a0a8 / 10 : _0x52a0a8)),
        false
      ),
      SetEntityHeading(_0x270fce, Math.random() * 360),
      _0x270fce
    )
  }
  on('ev-objects:objectCreated', async (_0x2bb4f0, _0x23e3cd) => {
    if (_0x2bb4f0.ns !== 'crops' && _0x2bb4f0.ns !== 'weed') {
      return
    }
    const _0x4acb44 = _0x5db52f.get(_0x2bb4f0.id)
    if (_0x4acb44) {
      DeleteEntity(await _0x4acb44)
    }
    _0x5db52f.set(
      _0x2bb4f0.id,
      _0x41ec8f(
        _0x23e3cd,
        _0x2bb4f0.data.metadata.water,
        _0x2bb4f0.ns === 'weed'
      )
    )
  })
  on('ev-objects:objectDeleted', async (_0x232d42) => {
    if (_0x232d42.ns !== 'crops' && _0x232d42.ns !== 'weed') {
      return
    }
    const _0x5335e7 = _0x5db52f.get(_0x232d42.id)
    if (_0x5335e7) {
      DeleteEntity(await _0x5335e7)
    }
    _0x5db52f.delete(_0x232d42.id)
  })
  on('ev-objects:objectUpdated', async (_0x327898) => {
    if (_0x327898.ns !== 'crops' && _0x327898.ns !== 'weed') {
      return
    }
    const _0x4c69a2 = _0x327898.data.metadata.water
    if (_0x5db52f.has(_0x327898.id)) {
      const _0x47dd8a = await _0x5db52f.get(_0x327898.id)
      SetEntityAlpha(
        _0x47dd8a,
        Math.round(
          25.5 * (_0x327898.ns === 'weed' ? _0x4c69a2 / 10 : _0x4c69a2)
        ),
        false
      )
    }
  })
  RegisterUICallback('ev-farming:requestClone', async (data, cbcb) => {
      const _0x2a2380 = await _0x3526d8.execute('ev-farming:requestClone', data.seed.id, data.seed.genomeFull)
      if (_0x2a2380) {
        const _0x5dc998 =
          'Thank you for your order. Your clone will be available for collection from Laboratory 1 in 24 hours.'
        emit('phone:emailReceived', 'Humane Labs', 'Order received', _0x5dc998)
      }
      const _0x49f8ed = {}
      return (
        (_0x49f8ed.data = _0x2a2380),
        (_0x49f8ed.meta = {}),
        (_0x49f8ed.meta.ok = _0x2a2380),
        cb(_0x49f8ed)
      )
    }
  )
  RegisterUICallback('ev-farming:getSeedsForLaptop', async (data, cb) => {
      const _0x444315 = _0x84559e.g.exports['ev-inventory'].getItemsOfType('seedbag', 1000).map(({ information: _0xf40ba2 }) => {
            let _0x4a52aa = null
            try {
              _0x4a52aa = JSON.parse(_0xf40ba2)
            } catch (_0x44628f) {}
            return (
              (_0x4a52aa === null || _0x4a52aa === void 0
                ? void 0
                : _0x4a52aa.inventoryId) || null
            )
          })
          .filter((_0x5ee69a) => !!_0x5ee69a),
        _0x2b309e = await _0x3526d8.execute('ev-farming:getSeedsForLaptop', _0x444315),
        _0x36cfcb = {
          ok: true,
          message: '',
        }
      cb({
        data: _0x2b309e.sort((_0x9d44ce, _0x294229) =>
          _0x9d44ce.genome < _0x294229.genome
            ? -1
            : _0x9d44ce.genome > _0x294229.genome
            ? 1
            : 0
        ),
        meta: _0x36cfcb,
      })
    }
  )
  on('ev-polyzone:enter', async (_0x26167f) => {
    if (_0x26167f !== 'humane_lab1') {
      return
    }
    await _0x3526d8.execute('ev-farming:collectDNA')
  })
  const _0x103de1 = _0x5688a5(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz',
      10
    ),
    _0x2bd5e8 = (_0x1194c5, _0xa961bc, _0x2d3877, _0x34962b) => {
      let _0x529159 = {}
      try {
        _0x529159 = JSON.parse(_0x2d3877)
      } catch (_0x42e64a) {}
      const _0x2ffa57 =
        _0x529159.inventoryId ||
        'container-' + _0x103de1() + '-' + _0x1194c5 + '-' + _0xa961bc
      if (Object.keys(_0x529159).length === 0) {
        emit('inventory:removeItemBySlot', _0xa961bc, 1, _0x34962b)
        const _0x282ab8 = { inventoryId: _0x2ffa57 }
        _0x282ab8['_hideKeys'] = ['inventoryId']
        emit('player:receiveItem', _0xa961bc, 1, false, _0x282ab8)
      }
      return _0x2ffa57
    }
  on('ev-inventory:itemUsed', async (_0x3cafab, _0x164fd1, _0xa5be7f, _0x464778) => {
      if (_0x3cafab !== 'seedbag') {
        return
      }
      const _0x60ae68 = _0x2bd5e8('seeds', 'seedbag', _0x164fd1, _0x464778)
      emit('inventory-open-container', _0x60ae68, 500, 500)
    }
  )
  on('ev-inventory:itemUsed', async (_0x142d01, _0x1a1d18, _0x2da4b5, _0x444797) => {
      if (_0x142d01 !== 'producebasket') {
        return
      }
      const _0x57bcd9 = _0x2bd5e8(
        'produce',
        'producebasket',
        _0x1a1d18,
        _0x444797
      )
      emit('inventory-open-container', _0x57bcd9, 500, 200)
    }
  )
  on('ev-inventory:itemUsed', async (_0x59f089, _0x2a8588, _0x177c87, _0x3cccc0) => {
      if (_0x59f089 !== 'wateringcan') {
        return
      }
      const _0x446c25 = PlayerPedId(),
        [_0x1fb83d, _0x51afcd, _0x3bd343] = GetEntityCoords(
          PlayerPedId(),
          false
        ),
        [_0x18aa98] = TestVerticalProbeAgainstAllWater(
          _0x1fb83d,
          _0x51afcd,
          _0x3bd343,
          32,
          -1
        )
      if (
        (_0x18aa98 &&
          (_0x33de49(_0x446c25, [371, 3207], 2636) ||
            _0x33de49(_0x446c25, [-28, 1692], 2777) ||
            _0x33de49(_0x446c25, [434, -468], 1778))) ||
        GetClosestObjectOfType(
          _0x1fb83d,
          _0x51afcd,
          _0x3bd343,
          0.8,
          GetHashKey('prop_birdbathtap'),
          false,
          false,
          false
        )
      ) {
        emit('attachItem', 'wateringcan2')
        const _0x1805cd = 'weapon@w_sp_jerrycan',
          _0x59be8e = 'fire'
        await _0x138d24.loadAnim(_0x1805cd)
        TaskPlayAnim(
          _0x446c25,
          _0x1805cd,
          _0x59be8e,
          8,
          -8,
          -1,
          49,
          0,
          false,
          false,
          false
        )
        const _0x134ac9 = await new Promise((_0x4ccefd) =>
          _0x84559e.g.exports['ev-taskbar'].taskBar(
            5000,
            'Filling...',
            false,
            true,
            null,
            false,
            _0x4ccefd
          )
        )
        ClearPedTasks(_0x446c25)
        emit('destroyProp')
        if (_0x134ac9 === 100) {
          const _0x5d794b =
              _0x84559e.g.exports['ev-inventory'].GetItemInfo(_0x3cccc0),
            _0x351e83 = _0x84559e.g.exports.isPed.isPed('cid')
          return (
            emitNet(
              'inventory:repairItem',
              _0x5d794b.id,
              100,
              _0x5d794b.item_id,
              _0x351e83
            ),
            emit(
              'DoLHudText',
              1,
              'farm-wateringcan-filled',
              'Your watering can has filled up.'
            )
          )
        }
        return
      }
      emit(
        'DoLHudText',
        2,
        'farm-wateringcan-bad-location',
        "You can't fill this here. Find some fresh water."
      )
    }
  )
  on('ev-farming:create-farm', async (_0x5dad4c, _0x411f96) => {
    const _0x146605 = _0x84559e.g.exports,
      _0x416979 = { free: true }
    const _0x4d276b = _0x5dad4c ? _0x416979 : {}
    _0x411f96 && (_0x4d276b.restricted = true)
    const _0x20a24b = {
      groundSnap: false,
      useModelOffset: true,
      adjustZ: true,
      distance: 25,
      zOffset: -0.2,
      allowHousePlacement: true,
    }
    _0x146605['ev-objects'].PlaceAndSaveObject(
      GetHashKey('np_garden_001'),
      _0x4d276b,
      _0x20a24b
    )
  })
  on('ev-farming:destroy-farm', async () => {
    const _0x92cda1 = _0x84559e.g.exports,
      _0x30f624 = PlayerPedId(),
      _0x2b4e84 = GetEntityCoords(_0x30f624, false),
      _0xcc07f1 = [_0x2b4e84[0], _0x2b4e84[1], _0x2b4e84[2] - 2],
      _0x48bc56 = StartExpensiveSynchronousShapeTestLosProbe(
        ..._0x2b4e84,
        ..._0xcc07f1,
        16,
        _0x30f624,
        4
      ),
      [, _0x390eab, , , _0x2cfdba] = GetShapeTestResult(_0x48bc56)
    _0x390eab &&
      _0x2cfdba &&
      GetEntityType(_0x2cfdba) === 3 &&
      GetEntityModel(_0x2cfdba) === GetHashKey('np_garden_001') &&
      _0x5b916b(_0x2cfdba)(async (_0x1a61b7) => {
        if (_0x1a61b7) {
          _0x92cda1['ev-objects'].DeleteObject(_0x1a61b7.id)
        }
      })
  })
})()
