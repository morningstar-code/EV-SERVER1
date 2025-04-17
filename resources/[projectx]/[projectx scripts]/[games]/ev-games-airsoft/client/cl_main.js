;(() => {
  'use strict'
  var _0x5eb74f = {
    d: (_0x29b1e6, _0x481abc) => {
      for (var _0x1a3cca in _0x481abc) {
        _0x5eb74f.o(_0x481abc, _0x1a3cca) &&
          !_0x5eb74f.o(_0x29b1e6, _0x1a3cca) &&
          Object.defineProperty(_0x29b1e6, _0x1a3cca, {
            enumerable: true,
            get: _0x481abc[_0x1a3cca],
          })
      }
    },
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x46656a) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
    o: (_0x8f0664, _0x955c69) =>
      Object.prototype.hasOwnProperty.call(_0x8f0664, _0x955c69),
  }
  ;(() => {})()
  ;(() => {})()
  ;(() => {})()
  var _0x40fa72 = {}
  const _0x2bed0a = {
    uA: () => _0x57369f,
    tb: () => _0x49b1e8,
    ES: () => _0x3d204f,
    KR: () => _0x5941f2,
    xJ: () => _0x209320,
    Bn: () => _0x13cc6f,
    fZ: () => _0x36bfac,
    d3: () => _0x35100f,
    Nl: () => _0x4c15b6,
    b: () => _0x50eff2,
    H7: () => _0x56e799,
    Um: () => _0x1c9cc1,
    CU: () => _0xfe97eb,
    s4: () => _0x2082f0,
  }
  _0x5eb74f.d(_0x40fa72, _0x2bed0a)
  let _0x3b2def = exports['ev-config'].GetModuleConfig('main'),
    _0x390739 = null,
    _0x9cf8be = null
  const _0x3bd085 = new Map(),
    _0x50d719 = GetCurrentResourceName()
  async function _0x1da60f() {
    while (_0x390739 == null) {
      await new Promise((_0x216568) => setTimeout(_0x216568, 1000))
      _0x390739 = _0x3a2ace('ev-games:airsoft:tdm')
      _0x9cf8be = _0x3a2ace('ev-games:airsoft:snd')
    }
  }
  on('ev-config:configLoaded', async (_0x1a52f9, _0xdb0096) => {
    if (_0x1a52f9 === 'main') {
      _0x3b2def = _0xdb0096
    } else {
      if (_0x1a52f9 === 'ev-games:airsoft:tdm') {
        await _0x1da60f()
      } else {
        _0x3bd085.has(_0x1a52f9) && _0x3bd085.set(_0x1a52f9, _0xdb0096)
      }
    }
  })
  function _0x33b217(_0x2cbbd5) {
    return _0x3b2def[_0x2cbbd5]
  }
  function _0x3a2ace(_0x4e1a0d, _0x3e9b2c) {
    if (!_0x3bd085.has(_0x4e1a0d)) {
      const _0x224363 = exports['ev-config'].GetModuleConfig(_0x4e1a0d)
      if (_0x224363 === undefined) {
        return
      }
      _0x3bd085.set(_0x4e1a0d, _0x224363)
    }
    const _0x5d2a81 = _0x3bd085.get(_0x4e1a0d)
    return _0x3e9b2c
      ? _0x5d2a81 === null || _0x5d2a81 === void 0
        ? void 0
        : _0x5d2a81[_0x3e9b2c]
      : _0x5d2a81
  }
  function _0x51f874(_0x2575d7) {
    return _0x3a2ace(_0x50d719, _0x2575d7)
  }
  exports('getMapsTDM', () => {
    const _0x59af45 = _0x390739.maps.map((_0x125051, _0x21ee83) => {
        const _0x3bcfe1 = {}
        return (
          (_0x3bcfe1.id = _0x125051.id),
          (_0x3bcfe1.name = _0x125051.name),
          _0x3bcfe1
        )
      }),
      _0x4ecc6f = {}
    return (
      (_0x4ecc6f.id = 'random'),
      (_0x4ecc6f.name = 'Random Map'),
      _0x59af45.unshift(_0x4ecc6f),
      _0x59af45
    )
  })
  exports('getMapsSND', () => {
    const _0x387ead = _0x9cf8be.maps.map((_0x3771ee, _0x5b3625) => {
        const _0x366c5a = {}
        return (
          (_0x366c5a.id = _0x3771ee.id),
          (_0x366c5a.name = _0x3771ee.name),
          _0x366c5a
        )
      }),
      _0x3ce9e0 = {}
    return (
      (_0x3ce9e0.id = 'random'),
      (_0x3ce9e0.name = 'Random Map'),
      _0x387ead.unshift(_0x3ce9e0),
      _0x387ead
    )
  })
  async function _0x4a5967() {}
  const _0x483a81 = globalThis.CPX,
    _0x23fce6 = _0x483a81.Hud,
    _0xd0a155 = _0x483a81.Utils,
    _0x501003 = _0x483a81.Zones,
    _0x5db1e3 = _0x483a81.Events,
    _0x4b1e90 = _0x483a81.Streaming,
    _0x32bac7 = _0x483a81.Procedures,
    _0x22bc50 = _0x483a81.Interface,
    _0x498b8d = null && _0x483a81
  async function _0x3ea216(_0x18db0b) {
    return new Promise((_0x4b80f0) => setTimeout(() => _0x4b80f0(), _0x18db0b))
  }
  function _0x360075(_0x479ceb, _0x7bf864) {
    return Math.floor(Math.random() * (_0x7bf864 - _0x479ceb + 1)) + _0x479ceb
  }
  function _0x4e690c(_0x22aeb4, _0x20328c) {
    const [_0x6e66dc, _0x3f8276, _0x39283b] = [
      _0x22aeb4[0] - _0x20328c[0],
      _0x22aeb4[1] - _0x20328c[1],
      _0x22aeb4[2] - _0x20328c[2],
    ]
    return Math.sqrt(
      _0x6e66dc * _0x6e66dc + _0x3f8276 * _0x3f8276 + _0x39283b * _0x39283b
    )
  }
  const _0x5521ce = (_0x529358, _0x15aa1c, _0x23fd6f) => {
    if (_0x15aa1c === _0x23fd6f) {
      return _0x15aa1c
    }
    let _0x40d5fd = _0x360075(_0x15aa1c, _0x23fd6f)
    while (_0x40d5fd === _0x529358) {
      _0x40d5fd = _0x360075(_0x15aa1c, _0x23fd6f)
    }
    return _0x40d5fd
  }
  function _0x22b1f8(_0x1367ea, _0x368a42, _0x43bdb7 = false) {
    return new Promise((_0x263828) => {
      _0x368a42
        ? exports['ev-taskbar'].taskBar(
            _0x1367ea,
            _0x368a42,
            _0x43bdb7,
            true,
            null,
            false,
            _0x263828
          )
        : setTimeout(() => _0x263828(100), _0x1367ea)
    })
  }
  const _0x1d935b = (_0x4de4fe, _0x51e5ec, _0x22db11) =>
      Math.min(Math.max(_0x4de4fe, _0x51e5ec), _0x22db11),
    _0x521324 = (
      _0x5c47b7,
      _0x565f32,
      _0x58f1dd,
      _0x27724d,
      _0x2b1c54,
      _0x50b820,
      _0x3d7657
    ) => {
      DrawMarker(
        _0x5c47b7,
        _0x565f32[0],
        _0x565f32[1],
        _0x565f32[2],
        0,
        0,
        0,
        _0x58f1dd[0],
        _0x58f1dd[1],
        _0x58f1dd[2],
        _0x27724d,
        _0x27724d,
        _0x27724d,
        _0x2b1c54.r,
        _0x2b1c54.g,
        _0x2b1c54.b,
        _0x2b1c54.a,
        _0x50b820,
        false,
        0,
        _0x3d7657,
        null,
        null,
        false
      )
    },
    _0x2db2bc = async (_0x32d596, _0x499929) => {
      if (_0x32d596) {
        DoScreenFadeOut(_0x499929)
        await _0x3ea216(_0x499929)
        return
      }
      DoScreenFadeIn(_0x499929)
      await _0x3ea216(_0x499929)
    },
    _0x34dd5c = (_0x4c0810) => {
      const _0x3790a4 = Math.floor(_0x4c0810 / 60),
        _0x3d695a = (((_0x4c0810 * 1000) % 60000) / 1000).toFixed(0)
      return _0x3790a4 + ':' + (parseInt(_0x3d695a) < 10 ? '0' : '') + _0x3d695a
    },
    _0x47c122 = (_0x8d4069, _0x10317d, _0x14ad15) =>
      (1 - _0x14ad15) * _0x8d4069 + _0x14ad15 * _0x10317d,
    _0x53fa71 = (_0x13ea30, _0x196e39, _0x551361, _0x47f9ab) => {
      const _0x3e6249 = (_0x551361 * Math.PI) / 180,
        _0x572040 = (_0x47f9ab * Math.PI) / 180
      return [
        _0x13ea30[0] + _0x196e39 * (Math.sin(_0x572040) * Math.cos(_0x3e6249)),
        _0x13ea30[1] - _0x196e39 * (Math.sin(_0x572040) * Math.sin(_0x3e6249)),
        _0x13ea30[2] - _0x196e39 * Math.cos(_0x572040),
      ]
    },
    _0x546813 = (_0x347cc6, _0x1f6f07, _0x2fe65a, _0x904f58, _0x30c39f) => {
      const _0x694d37 = AddBlipForCoord(
        _0x1f6f07[0],
        _0x1f6f07[1],
        _0x1f6f07[2]
      )
      SetBlipScale(_0x694d37, 0.65)
      _0x2fe65a && SetBlipSprite(_0x694d37, _0x2fe65a)
      _0x904f58 && SetBlipColour(_0x694d37, _0x904f58)
      if (_0x30c39f) {
        SetBlipAsShortRange(_0x694d37, _0x30c39f)
      }
      return (
        BeginTextCommandSetBlipName('STRING'),
        AddTextComponentString(_0x347cc6),
        EndTextCommandSetBlipName(_0x694d37),
        _0x694d37
      )
    }
  const _0x320a49 = async (_0x11f838, _0x5de264) => {
      if (_0x11f838 !== 'contextmenu') {
        return
      }
      if (!_0x5de264.fromEscape) {
        return
      }
      if (_0x2082f0) {
        await _0x3ea216(100)
        _0x2a7a9a(_0x390739.id, _0x2082f0.isSpawned())
        return
      }
      if (_0xfe97eb) {
        await _0x3ea216(100)
        _0x2a7a9a(_0x9cf8be.id, false)
        return
      }
    },
    _0x28c85d = (_0x897188, _0x511a9b, _0x3e25f7) => {
      if (_0x511a9b === _0x390739.id) {
        const _0x3112ba = _0x2082f0.getTeamID(),
          _0x397073 = _0x2082f0.getTotalPoints(),
          _0x40e96d = 'TDM',
          _0x44177b = [
            'Your team points: ' + _0x3e25f7[_0x3112ba] + ' / ' + _0x397073,
            'Enemy team points: ' +
              _0x3e25f7[_0x3112ba === 0 ? 1 : 0] +
              ' / ' +
              _0x397073,
          ],
          _0x461644 = {
            show: _0x897188,
            title: _0x40e96d,
          }
        exports['ev-ui'].sendAppEvent('status-hud', _0x461644)
        return
      }
      if (_0x511a9b === _0x9cf8be.id) {
        const _0x4eb92c = _0xfe97eb.isDefending(),
          _0x4f45b9 = _0xfe97eb.getTeamID(),
          _0x384bac = 'SND | ' + (_0x4eb92c ? 'Defenders' : 'Attackers'),
          _0x2f8f85 = [
            '' +
              (_0xfe97eb.isBombActive()
                ? 'BOMB PLANTED | Site ' +
                  _0xfe97eb.getBombSite() +
                  ' | ' +
                  _0x34dd5c(_0xfe97eb.getBombTimer())
                : 'Round Timer: ' + _0x34dd5c(_0xfe97eb.getRoundTimer())),
            'Rounds Won: ' + _0x3e25f7[_0x4f45b9],
            'Rounds Lost: ' + _0x3e25f7[_0x4f45b9 === 0 ? 1 : 0],
          ],
          _0x4ad85b = {
            show: _0x897188,
            title: _0x384bac,
            values: _0x2f8f85,
            i18nTitle: ['Defenders', 'Attackers'],
            i18nValues: [
              'BOMB PLANTED',
              'Site',
              'Round Timer',
              'Rounds Won',
              'Rounds Lost',
            ],
          }
        exports['ev-ui'].sendAppEvent('status-hud', _0x4ad85b)
      }
    },
    _0x47bc5a = (_0x1d778a, _0x5b32c9, _0x20096b) => {
      if (_0x5b32c9 === _0x390739.id) {
        const _0x20df08 = _0x1c9cc1.getTotalPoints(),
          _0x304d39 = 'TDM | Scores',
          _0x1baa8f = [
            'Points | Team 1: ' + _0x20096b[0] + ' / ' + _0x20df08,
            'Points | Team 2: ' + _0x20096b[1] + ' / ' + _0x20df08,
          ],
          _0x597977 = {
            show: _0x1d778a,
            title: _0x304d39,
            values: _0x1baa8f,
          }
        exports['ev-ui'].sendAppEvent('status-hud', _0x597977)
        return
      }
      if (_0x5b32c9 === _0x9cf8be.id) {
        const _0x5252cb = 'SND | Scores',
          _0x15e038 = [
            '' +
              (_0x56e799.isBombActive()
                ? 'BOMB PLANTED | Site ' +
                  _0x56e799.getBombSite() +
                  ' | ' +
                  _0x34dd5c(_0x56e799.getBombTimer())
                : 'Round Timer: ' + _0x34dd5c(_0x56e799.getRoundTimer())),
            'Team 1: ' + _0x20096b[0],
            'Team 2: ' + _0x20096b[1],
          ],
          _0x36336b = {
            show: _0x1d778a,
            title: _0x5252cb,
            values: _0x15e038,
          }
        exports['ev-ui'].sendAppEvent('status-hud', _0x36336b)
        return
      }
    },
    _0x2a7a9a = (_0x4c3ce0, _0x4a2a52) => {
      const _0x5d61c1 = {
        action: undefined,
        title: 'Loadouts',
      }
      const _0x51c5f7 = { gameType: _0x4c3ce0 }
      const _0x2cb93f = {
        action:
          '' +
          (!_0x4a2a52
            ? 'ev-games-airsoft:loadoutSpawn'
            : 'ev-games-airsoft:loadoutClose'),
        title: '' + (!_0x4a2a52 ? 'Spawn' : 'Return to Game'),
        key: _0x51c5f7,
      }
      const _0x3b6187 = {
        gameType: _0x4c3ce0,
        blockSpawn: _0x4a2a52,
      }
      const _0x41aa48 = {
        action: 'ev-games-airsoft:clearEquippedWeapons',
        title: 'Clear Equipped Weapons',
        key: _0x3b6187,
      }
      const _0x3a1f9c = [_0x5d61c1, _0x2cb93f, _0x41aa48]
      if (_0x4c3ce0 === _0x9cf8be.id) {
        for (const _0x11c11c in _0x9cf8be.weapons) {
          _0x3a1f9c.push({
            action: 'ev-games-airsoft:showLoadout',
            title: _0x11c11c.toUpperCase() + ' Weapons',
            description: 'View all ' + _0x11c11c.toUpperCase() + ' weapons',
            key: {
              gameType: _0x4c3ce0,
              id: _0x11c11c,
              blockSpawn: _0x4a2a52,
            },
          })
        }
        exports['ev-ui'].showContextMenu(_0x3a1f9c)
        return
      }
      for (const _0x455df9 in _0x390739.weapons) {
        _0x3a1f9c.push({
          action: 'ev-games-airsoft:showLoadout',
          title: _0x455df9.toUpperCase() + ' Weapons',
          description: 'View all ' + _0x455df9.toUpperCase() + ' weapons',
          key: {
            gameType: _0x4c3ce0,
            id: _0x455df9,
            blockSpawn: _0x4a2a52,
          },
        })
      }
      exports['ev-ui'].showContextMenu(_0x3a1f9c)
    },
    _0x5c14bc = (_0x349a12, _0xc983a3, _0xb7ca00) => {
      const _0x587447 = _0x390739.weapons[_0xc983a3],
        _0x24fba2 = {
          gameType: _0x349a12,
          blockSpawn: _0xb7ca00,
        }
      const _0x3d555c = {
        action: 'ev-games-airsoft:showLoadouts',
        title: 'Back',
        key: _0x24fba2,
      }
      const _0x407719 = [
        {
          action: undefined,
          title: _0xc983a3.toUpperCase() + ' Weapons',
        },
        _0x3d555c,
      ]
      for (const _0x45979b of _0x587447) {
        const _0x136514 = {
          action: 'ev-games-airsoft:equipWeapon',
          title: _0x45979b.name,
          key: {},
        }
        _0x136514.key.gameType = _0x349a12
        _0x136514.key.id = _0xc983a3
        _0x136514.key.weapon = _0x45979b.id
        _0x136514.key.name = _0x45979b.name
        _0x136514.key.blockSpawn = _0xb7ca00
        _0x407719.push(_0x136514)
      }
      exports['ev-ui'].showContextMenu(_0x407719)
    }
  RegisterUICallback('ev-games-airsoft:loadoutSpawn', async (_0x4ec196, _0x4b8d96) => {
      _0x4ec196.key.gameType === _0x9cf8be.id &&
        _0xfe97eb &&
        _0xfe97eb.spawnPlayer()
      _0x4ec196.key.gameType === _0x390739.id &&
        _0x2082f0 &&
        _0x2082f0.spawnPlayer()
      const _0x587297 = {
        ok: true,
        message: '',
      }
      const _0x5900ab = {
        data: {},
        meta: _0x587297,
      }
      _0x4b8d96(_0x5900ab)
    }
  )
  RegisterUICallback('ev-games-airsoft:loadoutClose', async (_0x566590, _0x99ae8e) => {
      const _0x2b05a6 = {
        ok: true,
        message: '',
      }
      const _0x3ca591 = {
        data: {},
        meta: _0x2b05a6,
      }
      _0x99ae8e(_0x3ca591)
    }
  )
  RegisterUICallback('ev-games-airsoft:showLoadouts', async (_0x1b96c3, _0x447b88) => {
      await _0x3ea216(100)
      _0x2a7a9a(_0x1b96c3.key.gameType, _0x1b96c3.key.blockSpawn)
      const _0x3d8433 = {
        ok: true,
        message: '',
      }
      const _0x38b4da = {
        data: {},
        meta: _0x3d8433,
      }
      _0x447b88(_0x38b4da)
    }
  )
  RegisterUICallback('ev-games-airsoft:showLoadout', async (_0x4004dc, _0x5c3247) => {
      await _0x3ea216(100)
      _0x5c14bc(
        _0x4004dc.key.gameType,
        _0x4004dc.key.id,
        _0x4004dc.key.blockSpawn
      )
      const _0x100668 = {
        ok: true,
        message: '',
      }
      const _0x1fd0e0 = {
        data: {},
        meta: _0x100668,
      }
      _0x5c3247(_0x1fd0e0)
    }
  )
  RegisterUICallback('ev-games-airsoft:equipWeapon', async (_0x40d881, _0x2e252b) => {
      _0x40d881.key.gameType === _0x9cf8be.id &&
        _0xfe97eb &&
        (_0xfe97eb.equipWeapon(
          _0x40d881.key.id,
          _0x40d881.key.weapon,
          _0x40d881.key.name
        ),
        await _0x3ea216(100),
        _0x5c14bc(
          _0x40d881.key.gameType,
          _0x40d881.key.id,
          _0x40d881.key.blockSpawn
        ))
      if (_0x40d881.key.gameType === _0x390739.id && _0x2082f0) {
        _0x2082f0.equipWeapon(
          _0x40d881.key.id,
          _0x40d881.key.weapon,
          _0x40d881.key.name
        )
        await _0x3ea216(100)
        _0x5c14bc(
          _0x40d881.key.gameType,
          _0x40d881.key.id,
          _0x40d881.key.blockSpawn
        )
      }
      const _0x5c13f2 = {
        ok: true,
        message: '',
      }
      const _0x6913a9 = {
        data: {},
        meta: _0x5c13f2,
      }
      _0x2e252b(_0x6913a9)
    }
  )
  RegisterUICallback('ev-games-airsoft:clearEquippedWeapons', async (_0x27e50b, _0x4aa495) => {
      _0x27e50b.key.gameType === _0x9cf8be.id &&
        _0xfe97eb &&
        (_0xfe97eb.unequipWeapons(),
        await _0x3ea216(100),
        _0x2a7a9a(_0x27e50b.key.gameType, _0x27e50b.key.blockSpawn))
      _0x27e50b.key.gameType === _0x390739.id &&
        _0x2082f0 &&
        (_0x2082f0.unequipWeapons(),
        await _0x3ea216(100),
        _0x2a7a9a(_0x27e50b.key.gameType, _0x27e50b.key.blockSpawn))
      const _0x4f10cc = {
        ok: true,
        message: '',
      }
      const _0x5eaf20 = {
        data: {},
        meta: _0x4f10cc,
      }
      _0x4aa495(_0x5eaf20)
    }
  )
  const _0x4d4082 = async () => {
    await _0x32bac7.execute('ev-datagrid:subscribe', 'arcade_airsoft_maps')
    const _0x209d9f = {
      event: 'ev-games:airsoft:snd:defuseBomb',
      id: 'games_airsoft_snd_defusebomb',
      icon: 'cut',
      label: 'Defuse Bomb',
      parameters: [],
    }
    const _0x4b961a = { radius: 3 }
    exports['ev-interact'].AddPeekEntryByModel(
      [GetHashKey('h4_prop_h4_ld_bomb_01a')],
      [_0x209d9f],
      {
        distance: _0x4b961a,
        isEnabled: () => {
          if (!_0xfe97eb) {
            return false
          }
          return _0xfe97eb.isDefending() && _0xfe97eb.isBombActive()
        },
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:tdm:init', _0x5941f2)
    _0x5db1e3.onNet('ev-games:airsoft:tdm:end', _0x35100f)
    _0x5db1e3.onNet('ev-games:airsoft:tdm:relogged', _0x50eff2)
    _0x5db1e3.onNet('ev-games:airsoft:tdm:start', () => {
      if (!_0x2082f0) {
        return
      }
      _0x2082f0.start()
    })
    _0x5db1e3.onNet('ev-games:airsoft:tdm:updateScores', (_0x502996) => {
      if (!_0x2082f0) {
        return
      }
      _0x28c85d(true, _0x390739.id, _0x502996)
    })
    _0x5db1e3.onNet('ev-games:airsoft:tdm:swapTeams', (_0x26606e, _0x967528) => {
        if (!_0x2082f0) {
          return
        }
        _0x2082f0.swapTeams(_0x26606e, _0x967528)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:tdm:playerRelogged', (_0x3a6ec7, _0x4615fb) => {
        if (!_0x2082f0) {
          return
        }
        _0x2082f0.playerRelogged(_0x3a6ec7, _0x4615fb)
      }
    )
    on('ev-games:airsoft:tdm:showLoadoutMenu', () => {
      if (!_0x2082f0) {
        return
      }
      _0x2a7a9a(_0x390739.id, true)
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:init', _0x3d204f)
    _0x5db1e3.onNet('ev-games:airsoft:snd:end', _0x36bfac)
    _0x5db1e3.onNet('ev-games:airsoft:snd:relogged', _0x4c15b6)
    _0x5db1e3.onNet('ev-games:airsoft:snd:roundState', (_0x308e8d) => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.setRoundState(_0x308e8d)
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:createBomb', (_0x104ce9, _0x44f541) => {
        if (!_0xfe97eb) {
          return
        }
        _0xfe97eb.createBomb(_0x104ce9, _0x44f541)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:snd:destroyBomb', (_0x3f3e2e) => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.destroyBomb(_0x3f3e2e)
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:bombDropped', (_0xc02b8b) => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.bombDropped(_0xc02b8b)
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:bombPickedUp', () => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.bombPickedUp()
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:updateScores', (_0x18c765) => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.updateScores(_0x18c765)
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:roundHalfTime', (_0x242438, _0x544fbd) => {
        if (!_0xfe97eb) {
          return
        }
        _0xfe97eb.roundHalfTime(_0x242438, _0x544fbd)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:snd:teammateDied', (_0x5af7d4) => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.teammateDied(_0x5af7d4)
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:playerLeft', (_0x4b6488) => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.playerLeft(_0x4b6488)
    })
    _0x5db1e3.onNet('ev-games:airsoft:snd:playerRelogged', (_0x11e301, _0x1872a8) => {
        if (!_0xfe97eb) {
          return
        }
        _0xfe97eb.playerRelogged(_0x11e301, _0x1872a8)
      }
    )
    on('ev-games:airsoft:snd:defuseBomb', () => {
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.defuseBomb()
    })
    on('ev-inventory:itemUsed', (_0x4f1ea7) => {
      if (_0x4f1ea7 !== 'C4_arcade') {
        return
      }
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.checkBombSite()
    })
    on('pd:deathcheck', () => {
      if (_0x2082f0) {
        _0x2082f0.handleDeath()
        return
      }
      if (_0xfe97eb) {
        _0xfe97eb.handleDeath()
        return
      }
    })
    on('DamageEvents:PlayerKilledByPlayer', (_0x5def9c, _0xb69919) => {
      if (_0x2082f0) {
        _0x2082f0.handleKill(_0x5def9c, _0xb69919)
        return
      }
      if (_0xfe97eb) {
        _0xfe97eb.handleKill(_0x5def9c, _0xb69919)
        return
      }
    })
    on('ev-ui:application-closed', _0x320a49)
    on('onResourceStop', (_0x3dae01) => {
      if (_0x3dae01 !== GetCurrentResourceName()) {
        return
      }
      if (!_0xfe97eb) {
        return
      }
      _0xfe97eb.destroyBomb(true)
    })
    _0x5db1e3.onNet('ev-games:airsoft:tdm:externalSpectating:add', _0x49b1e8)
    _0x5db1e3.onNet('ev-games:airsoft:tdm:externalSpectating:remove', _0x13cc6f)
    _0x5db1e3.onNet('ev-games:airsoft:tdm:externalSpectating:setGameState', (_0x1b5eee) => {
        if (!_0x1c9cc1) {
          return
        }
        _0x1c9cc1.setGameState(_0x1b5eee)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:tdm:externalSpectating:updatePlayerList', (_0x13fe7a) => {
        if (!_0x1c9cc1) {
          return
        }
        _0x1c9cc1.updatePlayerList(_0x13fe7a)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:tdm:externalSpectating:updateScores', (_0x3ce7c9) => {
        if (!_0x1c9cc1) {
          return
        }
        _0x1c9cc1.updateScores(_0x3ce7c9)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:snd:externalSpectating:add', _0x57369f)
    _0x5db1e3.onNet('ev-games:airsoft:snd:externalSpectating:remove', _0x209320)
    _0x5db1e3.onNet('ev-games:airsoft:snd:externalSpectating:setGameState', (_0xf9cf04) => {
        if (!_0x56e799) {
          return
        }
        _0x56e799.setGameState(_0xf9cf04)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:snd:externalSpectating:updatePlayerList', (_0xa72e1e) => {
        if (!_0x56e799) {
          return
        }
        _0x56e799.updatePlayerList(_0xa72e1e)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:snd:externalSpectating:createBomb', (_0x1a1b47, _0x2981f3) => {
        if (!_0x56e799) {
          return
        }
        _0x56e799.createBomb(_0x1a1b47, _0x2981f3)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:snd:externalSpectating:destroyBomb', (_0x2b05e5) => {
        if (!_0x56e799) {
          return
        }
        _0x56e799.destroyBomb(_0x2b05e5)
      }
    )
    _0x5db1e3.onNet('ev-games:airsoft:snd:externalSpectating:updateScores', (_0x3c4056) => {
        if (!_0x56e799) {
          return
        }
        _0x56e799.updateScores(_0x3c4056)
      }
    )
  }
  async function _0x481ec7() {
    await _0x1da60f()
    await _0x4a5967()
    await _0x4d4082()
  }
  class _0x5a0616 {
    constructor() {
      this.bombItem = 'C4_arcade'
      this.bombModel = GetHashKey('h4_prop_h4_ld_bomb_01a')
      this.lightTick = null
      const _0x30f820 = {
        active: false,
        hasBomb: false,
        exploded: false,
        obj: null,
        sfx: null,
        dropped: false,
        dropPos: [],
        pos: [],
        site: '',
      }
      this.bomb = _0x30f820
    }
    ['removeBombItem']() {
      const _0x24b55b = exports['ev-inventory'].getQuantity(this.bombItem)
      if (_0x24b55b < 1) {
        return
      }
      emit('inventory:removeItem', this.bombItem, _0x24b55b)
    }
    ['createLight'](_0x246502) {
      let _0x176ec9 = 0,
        _0x397384 = _0x176ec9,
        _0x3cbfbe = 0.01,
        _0x26e934 = true,
        _0x1f4b0e = _0x246502,
        _0x14a36b = 0
      const _0x16b6c5 = setInterval(() => {
        _0x1f4b0e--
        _0x3cbfbe += 0.005
        _0x14a36b = _0x1f4b0e / 45
        _0x14a36b = _0x14a36b * _0x14a36b * (3 - 2 * _0x14a36b)
        if (_0x1f4b0e <= 0) {
          clearInterval(_0x16b6c5)
        }
      }, 1000)
      this.lightTick = setTick(() => {
        _0x26e934
          ? ((_0x176ec9 += _0x3cbfbe), _0x176ec9 >= 5 && (_0x26e934 = false))
          : ((_0x176ec9 -= _0x3cbfbe), _0x176ec9 <= 1 && (_0x26e934 = true))
        DrawLightWithRangeAndShadow(
          this.bomb.pos[0],
          this.bomb.pos[1],
          this.bomb.pos[2] + 0.3,
          255,
          0,
          0,
          5,
          _0x47c122(_0x397384, _0x176ec9, _0x14a36b),
          5
        )
        _0x397384 = _0x176ec9
      })
    }
    ['setBombDropped'](_0x3040e2, _0x5a9dc9) {
      this.bomb.dropPos = _0x5a9dc9
      this.bomb.dropped = _0x3040e2
    }
    ['checkIfPlayerHasBomb']() {
      const _0x13868a = exports['ev-inventory'].hasEnoughOfItem(
        'C4_arcade',
        1,
        false,
        false
      )
      if (!_0x13868a) {
        this.bomb.hasBomb = false
        return
      }
      this.bomb.hasBomb = true
    }
    ['setActive'](_0x409ecb) {
      this.bomb.active = _0x409ecb
    }
    ['setExploded'](_0x44650a) {
      this.bomb.exploded = _0x44650a
    }
    async ['defuse'](_0x102383) {
      if (!this.bomb.active) {
        return
      }
      TaskPlayAnim(
        PlayerPedId(),
        'amb@world_human_bum_wash@male@low@idle_a',
        'idle_a',
        8,
        -8,
        -1,
        1,
        1,
        false,
        false,
        false
      )
      await _0x22b1f8(_0x102383, 'Defusing bomb...', true)
      ClearPedTasks(PlayerPedId())
    }
    async ['plant'](_0x5aca11) {
      if (this.bomb.active) {
        return
      }
      TaskPlayAnim(
        PlayerPedId(),
        'amb@world_human_bum_wash@male@low@idle_a',
        'idle_a',
        8,
        -8,
        -1,
        1,
        1,
        false,
        false,
        false
      )
      await _0x22b1f8(_0x5aca11, 'Planting bomb...', true)
      ClearPedTasks(PlayerPedId())
      this.removeBombItem()
    }
    async ['create'](_0x54916f, _0x2be0b2, _0x3319a9) {
      return (
        (this.bomb.site = _0x3319a9),
        await _0x4b1e90.loadModel(this.bombModel),
        (this.bomb.obj = CreateObject(
          this.bombModel,
          _0x54916f[0],
          _0x54916f[1],
          _0x54916f[2] - 0.1,
          false,
          false,
          false
        )),
        SetEntityLodDist(this.bomb.obj, 1000),
        SetEntityRotation(this.bomb.obj, -90, 0, 0, 2, false),
        FreezeEntityPosition(this.bomb.obj, true),
        (this.bomb.sfx = await exports['ev-fx'].PlayEntitySound(
          this.bomb.obj,
          'bomb',
          'DLC_NIKEZ_ROS_GENERAL',
          0,
          'ROS_GENERAL'
        )),
        (this.bomb.pos = _0x54916f),
        this.createLight(_0x2be0b2),
        this.bomb.obj
      )
    }
    async ['explode']() {
      if (this.bomb.obj == null) {
        return
      }
      const _0x3d2314 = GetEntityCoords(this.bomb.obj, false)
      AddExplosion(
        _0x3d2314[0],
        _0x3d2314[1],
        _0x3d2314[2],
        8,
        0.1,
        true,
        false,
        0.5
      )
      await _0x3ea216(1000)
    }
    ['destroy']() {
      this.bomb.sfx != null &&
        (exports['ev-fx'].StopEntitySound(this.bomb.obj, this.bomb.sfx),
        (this.bomb.sfx = null))
      this.bomb.obj != null &&
        (DeleteEntity(this.bomb.obj), (this.bomb.obj = null))
      clearTick(this.lightTick)
      this.bomb.pos = []
      this.bomb.site = ''
      this.lightTick = null
    }
    ['hasBomb']() {
      return this.bomb.hasBomb
    }
    ['isExploded']() {
      return this.bomb.exploded
    }
    ['isActive']() {
      return this.bomb.active
    }
    ['isDropped']() {
      return this.bomb.dropped
    }
    ['getDropPos']() {
      return this.bomb.dropPos
    }
    ['getBombSite']() {
      return this.bomb.site
    }
  }
  class _0x185eec {
    constructor(_0x222184) {
      const _0x15598f = {
        id: null,
        radius: -3.5,
        polarAngleDeg: 0,
        azimuthAngleDeg: 90,
      }
      const _0x5d560a = {
        isExternal: _0x222184,
        isSpectating: false,
        tick: 0,
        playerList: [],
        object: null,
        defaultPos: [0, 0, 0],
        target: -1,
        cam: _0x15598f,
      }
      this.spectate = _0x5d560a
    }
    ['findNextTarget'](_0x542263) {
      let _0x2e0ab0 = null
      if (_0x542263) {
        this.spectate.target++
      } else {
        this.spectate.target--
      }
      if (this.spectate.target < 0) {
        this.spectate.target = this.spectate.playerList.length - 1
      }
      if (this.spectate.target >= this.spectate.playerList.length) {
        this.spectate.target = 0
      }
      const _0x2746f2 = this.spectate.playerList[this.spectate.target]
      if (
        !_0x2746f2.dead &&
        _0x2746f2.playing &&
        _0x2746f2.source !== GetPlayerServerId(PlayerId())
      ) {
        return (_0x2e0ab0 = this.spectate.target), _0x2e0ab0
      }
      for (
        let _0x18f56c = this.spectate.target;
        _0x542263
          ? _0x18f56c < this.spectate.playerList.length
          : _0x18f56c > -1;
        _0x542263 ? _0x18f56c++ : _0x18f56c--
      ) {
        const _0x5a0071 = this.spectate.playerList[_0x18f56c]
        if (
          !_0x5a0071.dead &&
          _0x5a0071.playing &&
          _0x5a0071.source !== GetPlayerServerId(PlayerId())
        ) {
          _0x2e0ab0 = _0x18f56c
          break
        }
      }
      if (_0x2e0ab0 != null) {
        return _0x2e0ab0
      }
      for (
        let _0x29f60d = _0x542263 ? 0 : this.spectate.playerList.length - 1;
        _0x542263
          ? _0x29f60d < this.spectate.target
          : _0x29f60d > this.spectate.target;
        _0x542263 ? _0x29f60d++ : _0x29f60d--
      ) {
        const _0x352934 = this.spectate.playerList[_0x29f60d]
        if (
          !_0x352934.dead &&
          _0x352934.playing &&
          _0x352934.source !== GetPlayerServerId(PlayerId())
        ) {
          _0x2e0ab0 = _0x29f60d
          break
        }
      }
      return _0x2e0ab0
    }
    ['populatePlayerList'](_0x592ad2) {
      this.spectate.playerList = _0x592ad2
    }
    ['setObject'](_0x3576ad) {
      this.spectate.object = _0x3576ad
    }
    ['setDefaultPos'](_0x42b745) {
      this.spectate.defaultPos = _0x42b745
    }
    ['create']() {
      this.spectate.isSpectating = true
      this.spectate.target = this.findNextTarget(true)
      this.spectate.cam.id = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
      SetCamCoord(
        this.spectate.cam.id,
        this.spectate.defaultPos[0],
        this.spectate.defaultPos[1],
        this.spectate.defaultPos[2]
      )
      SetCamActive(this.spectate.cam.id, true)
      RenderScriptCams(true, false, 0, true, true)
      this.spectate.tick = setTick(() => {
        let _0x5e190e = [],
          _0x30cba4 = null
        if (this.spectate.target != null) {
          if (this.spectate.playerList[this.spectate.target].dead) {
            this.spectate.target = this.findNextTarget(true)
            return
          }
          _0x30cba4 = GetPlayerPed(
            GetPlayerFromServerId(
              this.spectate.playerList[this.spectate.target].source
            )
          )
          _0x5e190e = GetEntityCoords(_0x30cba4, true)
        } else {
          this.spectate.object != null
            ? ((_0x30cba4 = this.spectate.object),
              (_0x5e190e = GetEntityCoords(_0x30cba4, false)))
            : ((_0x30cba4 = null), (_0x5e190e = this.spectate.defaultPos))
        }
        SetEntityInvincible(PlayerPedId(), true)
        SetEntityVisible(PlayerPedId(), false, false)
        SetEntityCollision(PlayerPedId(), false, false)
        for (const _0x364d76 of GetActivePlayers()) {
          if (_0x364d76 === PlayerId()) {
            continue
          }
          SetEntityNoCollisionEntity(
            PlayerPedId(),
            GetPlayerPed(_0x364d76),
            true
          )
        }
        DisableControlAction(1, 14, true)
        DisableControlAction(1, 15, true)
        DisableControlAction(1, 16, true)
        DisableControlAction(1, 17, true)
        IsControlJustPressed(1, 189) &&
          (this.spectate.target = this.findNextTarget(false))
        IsControlJustPressed(1, 190) &&
          (this.spectate.target = this.findNextTarget(true))
        if (IsControlPressed(2, 241)) {
          this.spectate.cam.radius = this.spectate.cam.radius + 2
        }
        if (IsControlPressed(2, 242)) {
          this.spectate.cam.radius = this.spectate.cam.radius - 2
        }
        if (this.spectate.cam.radius > -1) {
          this.spectate.cam.radius = -1
        }
        const _0x35d00f = GetDisabledControlNormal(0, 1),
          _0x1c61a9 = GetDisabledControlNormal(0, 2)
        this.spectate.cam.polarAngleDeg =
          this.spectate.cam.polarAngleDeg + _0x35d00f * 10
        if (this.spectate.cam.polarAngleDeg >= 360) {
          this.spectate.cam.polarAngleDeg = 0
        }
        this.spectate.cam.azimuthAngleDeg =
          this.spectate.cam.azimuthAngleDeg + _0x1c61a9 * 10
        if (this.spectate.cam.azimuthAngleDeg >= 360) {
          this.spectate.cam.azimuthAngleDeg = 0
        }
        const _0x4df994 = _0x53fa71(
            _0x5e190e,
            this.spectate.cam.radius,
            this.spectate.cam.polarAngleDeg,
            this.spectate.cam.azimuthAngleDeg
          ),
          _0x1a4355 = GetCamCoord(this.spectate.cam.id)
        _0x4df994[0] = _0x47c122(_0x1a4355[0], _0x4df994[0], 0.09)
        _0x4df994[1] = _0x47c122(_0x1a4355[1], _0x4df994[1], 0.09)
        _0x4df994[2] = _0x47c122(_0x1a4355[2], _0x4df994[2], 0.09)
        SetCamCoord(
          this.spectate.cam.id,
          _0x4df994[0],
          _0x4df994[1],
          _0x4df994[2]
        )
        if (_0x30cba4 == null) {
          PointCamAtCoord(
            this.spectate.cam.id,
            _0x5e190e[0],
            _0x5e190e[1],
            _0x5e190e[2]
          )
        } else {
          PointCamAtEntity(this.spectate.cam.id, _0x30cba4, 0, 0, 0, true)
        }
        SetEntityCoords(
          PlayerPedId(),
          _0x5e190e[0],
          _0x5e190e[1],
          _0x5e190e[2] - 5,
          true,
          false,
          false,
          false
        )
      })
    }
    ['destroy']() {
      clearTick(this.spectate.tick)
      SetEntityCollision(PlayerPedId(), true, true)
      SetEntityVisible(PlayerPedId(), true, false)
      SetEntityInvincible(PlayerPedId(), false)
      SetCamActive(this.spectate.cam.id, false)
      RenderScriptCams(false, false, 0, true, true)
      this.spectate.isSpectating = false
      this.spectate.target = -1
      this.spectate.cam.id = null
      this.spectate.cam.radius = -3.5
      this.spectate.cam.polarAngleDeg = 0
      this.spectate.cam.azimuthAngleDeg = 90
    }
    ['isSpectating']() {
      return this.spectate.isSpectating
    }
  }
  class _0x47920e {
    constructor(_0x58e378, _0x23a25a, _0x586843, _0x3d208d) {
      this.playerList = null
      this.gameState = false
      this.overviewCam = null
      this.roundTimer = 0
      this.bombTimer = 0
      this.bombTimerTick = null
      this.timerTick = null
      this.markerTick = null
      this.bombSiteBlips = []
      this.spectator = new _0x185eec(true)
      this.code = _0x58e378
      this.map = _0x23a25a
      this.playerList = _0x586843
      this.gameState = _0x3d208d
      this.arcadePos = _0x9cf8be.arcadePos
      this.bomb = new _0x5a0616()
      this.scores = [0, 0]
      this.roundTimer = _0x9cf8be.roundTime * 60
      this.bombTimer = _0x9cf8be.bombTime / 1000
      RPC.execute('ev-infinity:setWorld', this.code, 'inactive', false)
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(true)
      exports.ragdoll.DisableReduceFactor(true)
      exports.ragdoll.OverrideMaxHealth(true, _0x9cf8be.playerHealth)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      for (const _0x232477 of _0x9cf8be.maps[this.map].bombSites) {
        this.bombSiteBlips.push(
          _0x546813(
            'Bomb Site ' + _0x232477.name,
            [_0x232477.pos[0], _0x232477.pos[1], _0x232477.pos[2]],
            _0x232477.sprite,
            _0x232477.spriteColour,
            true
          )
        )
      }
      this.spectator.setDefaultPos(_0x9cf8be.maps[this.map].spawnCameraPos)
      this.spectator.populatePlayerList(_0x586843)
      this.setOverviewCam()
      setTimeout(() => {
        _0x47bc5a(true, _0x9cf8be.id, this.scores)
        this.markerTick = setTick(async () => {
          for (const _0x6db134 of this.playerList) {
            if (!_0x6db134.playing) {
              continue
            }
            if (_0x6db134.dead) {
              continue
            }
            const _0x5183ea = GetPlayerFromServerId(_0x6db134.source),
              _0x12b6c9 = GetPlayerPed(_0x5183ea)
            if (_0x5183ea === PlayerId()) {
              continue
            }
            if (_0x12b6c9 === 0) {
              continue
            }
            if (!IsPedAPlayer(_0x12b6c9)) {
              continue
            }
            const _0x487c23 = GetOffsetFromEntityInWorldCoords(
                _0x12b6c9,
                0,
                0,
                1.1
              ),
              _0x4fdad7 = {
                r: 52,
                g: 152,
                b: 219,
                a: 200,
              }
            const _0x50a120 = {
              r: 231,
              g: 76,
              b: 60,
              a: 200,
            }
            const _0x518732 = _0x6db134.team === 0 ? _0x4fdad7 : _0x50a120
            if (this.gameState) {
              _0x521324(20, _0x487c23, [180, 0, 0], 0.3, _0x518732, false, true)
            }
          }
          for (const _0x11c431 of _0x9cf8be.maps[this.map].bombSites) {
            const _0x4c586f = [
                _0x11c431.pos[0],
                _0x11c431.pos[1],
                _0x11c431.pos[2] - 1,
              ],
              _0x4115ff = {
                r: 46,
                g: 204,
                b: 113,
                a: 200,
              }
            _0x521324(
              23,
              _0x4c586f,
              [0, 0, 0],
              _0x11c431.radius,
              _0x4115ff,
              false,
              false
            )
          }
        })
      }, 2000)
    }
    async ['setOverviewCam']() {
      await _0x2db2bc(true, 1000)
      const _0x2da6a4 = _0x9cf8be.maps[this.map].spawns[0].points[0].pos
      SetEntityCoords(
        PlayerPedId(),
        _0x2da6a4[0],
        _0x2da6a4[1],
        _0x2da6a4[2] - 100,
        true,
        false,
        false,
        false
      )
      SetEntityHeading(PlayerPedId(), _0x2da6a4[3])
      FreezeEntityPosition(PlayerPedId(), true)
      if (this.gameState) {
        if (this.overviewCam != null) {
          RenderScriptCams(false, false, 0, true, true)
          DestroyCam(this.overviewCam, false)
          this.overviewCam = null
        }
        this.spectator.create()
        this.timerTick = setInterval(() => {
          this.roundTimer--
          _0x47bc5a(true, _0x9cf8be.id, this.scores)
        }, 1000)
        await _0x2db2bc(false, 1000)
        return
      }
      if (this.spectator.isSpectating()) {
        this.spectator.destroy()
      }
      clearInterval(this.timerTick)
      this.bombTimerTick != null &&
        (clearInterval(this.bombTimerTick), (this.bombTimerTick = null))
      this.bombTimer = _0x9cf8be.bombTime / 1000
      this.timerTick = null
      this.roundTimer = _0x9cf8be.roundTime * 60
      const _0x3780f7 = _0x9cf8be.maps[this.map].spawnCameraPos
      this.overviewCam = CreateCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        _0x3780f7[0],
        _0x3780f7[1],
        _0x3780f7[2],
        0,
        0,
        _0x3780f7[3],
        50,
        false,
        0
      )
      SetCamActive(this.overviewCam, true)
      RenderScriptCams(true, false, 0, true, true)
      await _0x2db2bc(false, 1000)
    }
    ['updatePlayerList'](_0x321550) {
      this.playerList = _0x321550
      this.spectator.populatePlayerList(this.playerList)
    }
    ['setGameState'](_0x3cd2b0) {
      this.gameState = _0x3cd2b0
      this.setOverviewCam()
    }
    async ['createBomb'](_0x32a1ef, _0x71caec) {
      this.bomb.setActive(true)
      const _0x5c4c07 = await this.bomb.create(
        _0x32a1ef,
        _0x9cf8be.bombTime / 1000,
        _0x71caec
      )
      this.bombTimerTick == null &&
        (this.bombTimerTick = setInterval(() => {
          this.bombTimer--
          _0x47bc5a(true, _0x9cf8be.id, this.scores)
        }, 1000))
      this.spectator.setObject(_0x5c4c07)
    }
    async ['destroyBomb'](_0x55046e) {
      if (_0x55046e) {
        await this.bomb.explode()
      }
      this.bombTimerTick != null &&
        (clearInterval(this.bombTimerTick), (this.bombTimerTick = null))
      this.bomb.setActive(false)
      this.bomb.destroy()
      this.spectator.setObject(null)
    }
    ['isBombActive']() {
      return this.bomb.isActive()
    }
    ['getRoundTimer']() {
      return this.roundTimer
    }
    ['getBombTimer']() {
      return this.bombTimer
    }
    ['getBombSite']() {
      return this.bomb.getBombSite()
    }
    ['updateScores'](_0x412d9d) {
      this.scores = _0x412d9d
      _0x47bc5a(true, _0x9cf8be.id, this.scores)
    }
    async ['destroy']() {
      if (this.timerTick != null) {
        clearInterval(this.timerTick)
      }
      if (this.markerTick != null) {
        clearTick(this.markerTick)
      }
      _0x47bc5a(false, _0x9cf8be.id, this.scores)
      for (const _0x4c5fe6 of this.bombSiteBlips) {
        RemoveBlip(_0x4c5fe6)
      }
      await _0x2db2bc(true, 1000)
      if (this.spectator.isSpectating()) {
        this.spectator.destroy()
      }
      this.overviewCam != null &&
        (RenderScriptCams(false, false, 0, true, true),
        DestroyCam(this.overviewCam, false),
        (this.overviewCam = null))
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(false)
      await RPC.execute('ev-infinity:setWorld', 'default')
      exports.ragdoll.DisableReduceFactor(false)
      exports.ragdoll.OverrideMaxHealth(false)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      FreezeEntityPosition(PlayerPedId(), false)
      SetEntityCoords(
        PlayerPedId(),
        this.arcadePos[0],
        this.arcadePos[1],
        this.arcadePos[2],
        true,
        false,
        false,
        false
      )
      this.spectator = null
      this.bomb = null
      await _0x2db2bc(false, 1000)
    }
  }
  class _0x3e9d08 {
    constructor(_0x49902f, _0x470911, _0x134e4d, _0x4c9466, _0xad9780) {
      this.playerList = null
      this.gameState = false
      this.overviewCam = null
      this.totalPoints = 0
      this.markerTick = null
      this.spectator = new _0x185eec(true)
      this.code = _0x49902f
      this.map = _0x470911
      this.playerList = _0x134e4d
      this.gameState = _0x4c9466
      this.arcadePos = _0x390739.arcadePos
      this.scores = [0, 0]
      this.totalPoints = _0xad9780
      RPC.execute('ev-infinity:setWorld', this.code, 'inactive', false)
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(true)
      exports.ragdoll.DisableReduceFactor(true)
      exports.ragdoll.OverrideMaxHealth(true, _0x390739.playerHealth)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      this.spectator.setDefaultPos(_0x390739.maps[this.map].spawnCameraPos)
      this.spectator.populatePlayerList(_0x134e4d)
      this.setOverviewCam()
      setTimeout(() => {
        _0x47bc5a(true, _0x390739.id, this.scores)
        this.markerTick = setTick(async () => {
          for (const _0x5a7592 of this.playerList) {
            if (!_0x5a7592.playing) {
              continue
            }
            if (_0x5a7592.dead) {
              continue
            }
            const _0xde4d3c = GetPlayerFromServerId(_0x5a7592.source),
              _0x224b40 = GetPlayerPed(_0xde4d3c)
            if (_0xde4d3c === PlayerId()) {
              continue
            }
            if (_0x224b40 === 0) {
              continue
            }
            if (!IsPedAPlayer(_0x224b40)) {
              continue
            }
            const _0x2a94d8 = GetOffsetFromEntityInWorldCoords(
                _0x224b40,
                0,
                0,
                1.1
              ),
              _0x34a364 = {
                r: 52,
                g: 152,
                b: 219,
                a: 200,
              }
            const _0x5acdc7 = {
              r: 231,
              g: 76,
              b: 60,
              a: 200,
            }
            const _0x55d57a = _0x5a7592.team === 0 ? _0x34a364 : _0x5acdc7
            if (this.gameState) {
              _0x521324(20, _0x2a94d8, [180, 0, 0], 0.3, _0x55d57a, false, true)
            }
          }
        })
      }, 2000)
    }
    async ['setOverviewCam']() {
      await _0x2db2bc(true, 1000)
      const _0x1b80cc = _0x390739.maps[this.map].spawns[0].points[0].pos
      SetEntityCoords(
        PlayerPedId(),
        _0x1b80cc[0],
        _0x1b80cc[1],
        _0x1b80cc[2] - 100,
        true,
        false,
        false,
        false
      )
      SetEntityHeading(PlayerPedId(), _0x1b80cc[3])
      FreezeEntityPosition(PlayerPedId(), true)
      if (this.gameState) {
        if (this.overviewCam != null) {
          RenderScriptCams(false, false, 0, true, true)
          DestroyCam(this.overviewCam, false)
          this.overviewCam = null
        }
        this.spectator.create()
        await _0x2db2bc(false, 1000)
        return
      }
      if (this.spectator.isSpectating()) {
        this.spectator.destroy()
      }
      const _0x8b9bf6 = _0x390739.maps[this.map].spawnCameraPos
      this.overviewCam = CreateCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        _0x8b9bf6[0],
        _0x8b9bf6[1],
        _0x8b9bf6[2],
        0,
        0,
        _0x8b9bf6[3],
        50,
        false,
        0
      )
      SetCamActive(this.overviewCam, true)
      RenderScriptCams(true, false, 0, true, true)
      await _0x2db2bc(false, 1000)
    }
    ['updatePlayerList'](_0x1e8798) {
      this.playerList = _0x1e8798
      this.spectator.populatePlayerList(this.playerList)
    }
    ['setGameState'](_0x15e208) {
      this.gameState = _0x15e208
      this.setOverviewCam()
    }
    ['updateScores'](_0x3d3757) {
      this.scores = _0x3d3757
      _0x47bc5a(true, _0x390739.id, this.scores)
    }
    ['getTotalPoints']() {
      return this.totalPoints
    }
    async ['destroy']() {
      if (this.markerTick != null) {
        clearTick(this.markerTick)
      }
      _0x47bc5a(false, _0x390739.id, this.scores)
      await _0x2db2bc(true, 1000)
      if (this.spectator.isSpectating()) {
        this.spectator.destroy()
      }
      if (this.overviewCam != null) {
        RenderScriptCams(false, false, 0, true, true)
        DestroyCam(this.overviewCam, false)
        this.overviewCam = null
      }
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(false)
      await RPC.execute('ev-infinity:setWorld', 'default')
      exports.ragdoll.DisableReduceFactor(false)
      exports.ragdoll.OverrideMaxHealth(false)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      FreezeEntityPosition(PlayerPedId(), false)
      SetEntityCoords(
        PlayerPedId(),
        this.arcadePos[0],
        this.arcadePos[1],
        this.arcadePos[2],
        true,
        false,
        false,
        false
      )
      this.spectator = null
      await _0x2db2bc(false, 1000)
    }
  }
  class _0x1a2872 {
    constructor(_0x40d2b0) {
      this.originalAmmo = []
      const _0x102465 = {
        sniper: null,
        dmr: null,
        ar: null,
        mg: null,
        smg: null,
        shotgun: null,
        pistol: null,
        melee: null,
        explosives: null,
      }
      this.equippedWeapons = _0x102465
      this.gameID = _0x40d2b0
      const _0xbc53ac = {}
      _0xbc53ac['_arcadeSource'] = _0x40d2b0
      this.itemMeta = _0xbc53ac
      if (_0x40d2b0 === _0x390739.id) {
        this.config = _0x9cf8be
      }
      if (_0x40d2b0 === _0x9cf8be.id) {
        this.config = _0x9cf8be
      }
    }
    async ['init']() {
      this.originalAmmo = await RPC.execute('weapons:getAmmo')
    }
    ['restoreOriginalAmmo']() {
      for (const _0x2724ac of this.originalAmmo) {
        if (_0x2724ac == null) {
          continue
        }
        for (const _0x453001 in _0x2724ac) {
          const _0x5f02f5 = _0x2724ac[_0x453001]
          emit('actionbar:ammo', _0x5f02f5.type, _0x5f02f5.ammo, true)
        }
      }
    }
    ['unequipAmmo'](_0x4082bc) {
      if (!this.config.ammos[_0x4082bc]) {
        return
      }
      const _0x27d84e = this.config.ammos[_0x4082bc].id,
        _0x28a4be = this.config.ammos[_0x4082bc].type,
        _0x371b78 = _0x5eb74f.g.exports['ev-inventory'].getQuantity(_0x27d84e)
      if (_0x27d84e == null) {
        return
      }
      if (_0x28a4be == null) {
        return
      }
      if (_0x371b78 < 1) {
        return
      }
      emit('actionbar:ammo', _0x28a4be, 1000, false)
      emit('inventory:removeItem', _0x27d84e, _0x371b78)
    }
    ['unequipWeapon'](_0x129b99, _0x492bd3) {
      this.equippedWeapons[_0x129b99] &&
        (this.equippedWeapons[_0x129b99] = null)
      if (!this.config.weapons[_0x129b99]) {
        return
      }
      let _0x24dc75 = null
      for (const _0x1827eb of this.config.weapons[_0x129b99]) {
        if (_0x1827eb.id !== _0x492bd3) {
          continue
        }
        _0x24dc75 = _0x1827eb
        break
      }
      if (!_0x24dc75) {
        return
      }
      const _0x36fd91 = _0x5eb74f.g.exports['ev-inventory'].getQuantity(
        _0x24dc75.id
      )
      if (_0x36fd91 < 1) {
        return
      }
      emit('inventory:removeItem', _0x24dc75.id, _0x36fd91)
    }
    ['unequipAmmoTypes']() {
      for (const _0xe6e0eb in this.config.ammos) {
        const _0x194b89 = this.config.ammos[_0xe6e0eb]
        emit('actionbar:ammo', _0x194b89.type, 1000, false)
      }
      this.restoreOriginalAmmo()
    }
    ['replenishAmmo']() {
      for (const _0x3cdddc in this.equippedWeapons) {
        const _0x5f44c6 = this.equippedWeapons[_0x3cdddc]
        if (!_0x5f44c6) {
          continue
        }
        if (!this.config.ammos[_0x3cdddc]) {
          continue
        }
        this.equipAmmo(true, _0x3cdddc)
      }
    }
    ['unequipWeapons'](_0x3a188b) {
      for (const _0x512062 in this.config.weapons) {
        const _0x4523e3 = this.config.weapons[_0x512062]
        for (const _0x2c0ca6 of _0x4523e3) {
          this.unequipWeapon(_0x512062, _0x2c0ca6.id)
        }
        if (!_0x3a188b) {
          continue
        }
        this.unequipAmmo(_0x512062)
      }
    }
    ['equipAmmo'](_0x163b47, _0x6a256e) {
      let _0x3fa930 = 0
      if (!this.config.ammos[_0x6a256e]) {
        return
      }
      const _0x424f99 = this.config.ammos[_0x6a256e].id,
        _0x120271 = this.config.ammos[_0x6a256e].type
      _0x3fa930 = _0x5eb74f.g.exports['ev-inventory'].getQuantity(_0x424f99)
      if (_0x424f99 == null) {
        return
      }
      if (_0x120271 == null) {
        return
      }
      _0x163b47 &&
        _0x3fa930 > 0 &&
        emit('inventory:removeItem', _0x424f99, _0x3fa930)
      emit('actionbar:ammo', _0x120271, 150, true)
      emit('player:receiveItem', _0x424f99, 5, this.itemMeta, this.itemMeta)
    }
    ['equipWeapon'](_0x1e901e, _0x2e100a, _0x3b45b2) {
      const _0x372d50 = this.config.secondaryWeapons.find(
        (_0x4a80af) => _0x4a80af === _0x1e901e
      )
      if (!_0x372d50) {
        for (const _0x3fd2f7 in this.config.weapons) {
          const _0x142139 = this.config.secondaryWeapons.find(
            (_0x22cba3) => _0x22cba3 === _0x3fd2f7
          )
          if (_0x142139) {
            continue
          }
          const _0x1419a5 = this.config.weapons[_0x3fd2f7]
          for (const _0x1224b3 of _0x1419a5) {
            this.unequipWeapon(_0x3fd2f7, _0x1224b3.id)
          }
          this.unequipAmmo(_0x3fd2f7)
        }
      }
      if (!this.equippedWeapons[_0x1e901e]) {
        const _0xe236c3 = {
          id: _0x2e100a,
          name: _0x3b45b2,
        }
        this.equippedWeapons[_0x1e901e] = _0xe236c3
        this.equipAmmo(true, _0x1e901e)
        emit('player:receiveItem', _0x2e100a, 1, this.itemMeta, this.itemMeta)
        return
      }
      const _0x55a399 = this.equippedWeapons[_0x1e901e].id,
        _0x1e4639 = {
          id: _0x2e100a,
          name: _0x3b45b2,
        }
      this.equippedWeapons[_0x1e901e] = _0x1e4639
      this.equipAmmo(true, _0x1e901e)
      emit('inventory:removeItem', _0x55a399, 1)
      emit('player:receiveItem', _0x2e100a, 1, this.itemMeta, this.itemMeta)
    }
  }
  class _0x1a99e8 {
    constructor(
      _0x43b693,
      _0x3a96f5,
      _0x3237c7,
      _0x56cc47,
      _0x523ed8,
      _0x3cc47f,
      _0x196fef,
      _0x541f11,
      _0x11e809
    ) {
      this.spawnCam = null
      this.loadouts = new _0x1a2872(_0x9cf8be.id)
      this.bomb = new _0x5a0616()
      this.spectator = new _0x185eec(false)
      const _0x1fee97 = {
        code: _0x43b693,
        map: _0x3a96f5,
        players: _0x3237c7,
        teams: _0x56cc47,
        teammates: _0x523ed8,
        teamID: _0x3cc47f,
        isDefender: _0x196fef,
        state: _0x541f11 ? _0x11e809 : false,
        arcadePos: _0x9cf8be.arcadePos,
        spawned: _0x541f11 ? true : false,
        dead: false,
        deadTimeout: false,
        markerTick: null,
        waitTick: 0,
        roundTimer: _0x9cf8be.roundTime * 60,
        timerTick: null,
        bombTimer: _0x9cf8be.bombTime / 1000,
        bombTimerTick: null,
        bombSiteBlips: [],
        scores: [0, 0],
      }
      this.game = _0x1fee97
      this.loadouts.init()
      RPC.execute('ev-infinity:setWorld', this.game.code, 'inactive', false)
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(true)
      this.populateSpectateList()
      this.spectator.setDefaultPos(
        _0x9cf8be.maps[this.game.map].bombSites[0].pos
      )
      for (const _0x596e13 of _0x9cf8be.maps[this.game.map].bombSites) {
        this.game.bombSiteBlips.push(
          _0x546813(
            'Bomb Site ' + _0x596e13.name,
            [_0x596e13.pos[0], _0x596e13.pos[1], _0x596e13.pos[2]],
            _0x596e13.sprite,
            _0x596e13.spriteColour,
            true
          )
        )
      }
      _0x541f11 &&
        (this.spectator.create(),
        setTimeout(() => {
          this.markerTick()
        }, 2000))
    }
    ['isPlayerPlaying'](_0x25fd98) {
      const _0x353aa1 = this.game.players.find((_0x29d57c) => {
        return _0x29d57c.source === _0x25fd98
      })
      if (!_0x353aa1) {
        return
      }
      return _0x353aa1.is_playing
    }
    ['markerTick']() {
      const _0x5f2200 = _0x9cf8be.maps[this.game.map].centerPos,
        _0x24a444 = _0x9cf8be.maps[this.game.map].playZoneRadius,
        _0x20c277 = {
          r: 231,
          g: 76,
          b: 60,
          a: 0,
        }
      const _0x20b181 = _0x20c277,
        _0x3221c9 = _0x24a444 - 5
      let _0xb835a3 = false,
        _0x56841a = null
      this.game.markerTick = setTick(async () => {
        if (this.bomb.isDropped()) {
          const _0x371a87 = this.bomb.getDropPos(),
            _0x425a84 = {
              r: 26,
              g: 188,
              b: 156,
              a: 200,
            }
          const _0x1fe192 = _0x425a84
          _0x521324(21, _0x371a87, [180, 0, 0], 0.7, _0x1fe192, true, true)
        }
        for (
          let _0x5b3bd1 = 0;
          _0x5b3bd1 < this.game.teams.length;
          _0x5b3bd1++
        ) {
          const _0x3f84c1 = this.game.teams[_0x5b3bd1]
          for (const _0xd02bd4 of _0x3f84c1.players) {
            if (!this.isPlayerPlaying(_0xd02bd4.source)) {
              continue
            }
            const _0x2f5de5 = GetPlayerFromServerId(_0xd02bd4.source),
              _0x4cd66c = GetPlayerPed(_0x2f5de5)
            if (_0x2f5de5 === PlayerId()) {
              continue
            }
            if (_0x4cd66c === 0) {
              continue
            }
            if (!IsPedAPlayer(_0x4cd66c)) {
              continue
            }
            const _0x27ed19 = GetOffsetFromEntityInWorldCoords(
                _0x4cd66c,
                0,
                0,
                1.1
              ),
              _0x58fdac = {
                r: 52,
                g: 152,
                b: 219,
                a: 200,
              }
            const _0x488142 = {
              r: 231,
              g: 76,
              b: 60,
              a: 200,
            }
            const _0x596c87 =
              _0x5b3bd1 === this.game.teamID ? _0x58fdac : _0x488142
            if (this.game.state) {
              _0x521324(20, _0x27ed19, [180, 0, 0], 0.3, _0x596c87, false, true)
            }
          }
        }
        for (const _0x11ceff of _0x9cf8be.maps[this.game.map].bombSites) {
          const _0x38e22d = [
              _0x11ceff.pos[0],
              _0x11ceff.pos[1],
              _0x11ceff.pos[2] - 0.9,
            ],
            _0x453e8e = {
              r: 46,
              g: 204,
              b: 113,
              a: 200,
            }
          _0x521324(
            23,
            _0x38e22d,
            [0, 0, 0],
            _0x11ceff.radius,
            _0x453e8e,
            false,
            false
          )
        }
        const _0x3e4698 = GetEntityCoords(PlayerPedId(), true),
          _0x2a7690 = _0x4e690c(_0x3e4698, _0x5f2200)
        _0x2a7690 < _0x24a444 &&
          _0xb835a3 &&
          (clearTimeout(_0x56841a), (_0x56841a = null), (_0xb835a3 = false))
        if (!this.game.spawned) {
          return
        }
        if (!this.game.state) {
          await _0x3ea216(1000)
          return
        }
        if (this.game.dead) {
          return
        }
        const _0x195727 = _0x2a7690 - _0x3221c9
        _0x20b181.a = Math.floor(_0x1d935b((_0x195727 / 10) * 255, 0, 255))
        if (_0x20b181.a <= 0) {
          return
        }
        _0x2a7690 > _0x24a444 &&
          !_0xb835a3 &&
            ((_0xb835a3 = true),
            emit(
              'DoLongHudText',
              "You are outside the playzone! Return in 10 seconds or you'll be killed.",
              2
            ),
            (_0x56841a = setTimeout(() => {
              if (!_0xb835a3) {
                return
              }
              ApplyDamageToPed(PlayerPedId(), 100000, false)
            }, _0x9cf8be.maps[this.game.map].totalTimeOutsidePlayZone * 1000)))
        _0x521324(28, _0x5f2200, [0, 0, 0], _0x24a444, _0x20b181, false, false)
      })
    }
    async ['setupRoundSpawn']() {
      clearTick(this.game.markerTick)
      this.game.markerTick = null
      this.game.spawned = false
      await _0x2db2bc(true, 1000)
      if (this.spectator.isSpectating()) {
        this.spectator.destroy()
      }
      if (this.game.dead) {
        emit('reviveFunction')
      }
      const _0x4079b2 = _0x9cf8be.maps[this.game.map].spawns[0].points[0].pos,
        _0x1add65 = _0x9cf8be.maps[this.game.map].spawnCameraPos
      SetEntityCoords(
        PlayerPedId(),
        _0x4079b2[0],
        _0x4079b2[1],
        _0x4079b2[2] - 100,
        true,
        false,
        false,
        false
      )
      SetEntityHeading(PlayerPedId(), _0x4079b2[3])
      FreezeEntityPosition(PlayerPedId(), true)
      this.spawnCam = CreateCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        _0x1add65[0],
        _0x1add65[1],
        _0x1add65[2],
        0,
        0,
        _0x1add65[3],
        50,
        false,
        0
      )
      SetCamActive(this.spawnCam, true)
      RenderScriptCams(true, false, 0, true, true)
      await _0x2db2bc(false, 1000)
      _0x2a7a9a(_0x9cf8be.id, false)
    }
    ['populateSpectateList']() {
      const _0xba551d = this.game.teammates.map((_0xe06588) => {
        const _0x5129f8 = this.game.players.find(
            (_0x36b26b) => _0x36b26b.source === _0xe06588.source
          ),
          _0x1f7db8 = {}
        return (
          (_0x1f7db8.source = _0xe06588.source),
          (_0x1f7db8.dead = _0xe06588.dead),
          (_0x1f7db8.playing = _0x5129f8
            ? _0x5129f8 === null || _0x5129f8 === void 0
              ? void 0
              : _0x5129f8.is_playing
            : false),
          _0x1f7db8
        )
      })
      this.spectator.populatePlayerList(_0xba551d)
    }
    ['playerRelogged'](_0x188de5, _0x1c6c34) {
      for (const _0x5d96f1 of this.game.teams) {
        for (const _0xf44521 of _0x5d96f1.players) {
          if (_0xf44521.cid !== _0x188de5) {
            continue
          }
          _0xf44521.source = _0x1c6c34
          break
        }
      }
      const _0x146b6d = this.game.players.find((_0x19ea17) => {
        return _0x19ea17.cid === _0x188de5
      })
      if (!_0x146b6d) {
        return
      }
      _0x146b6d.source = _0x1c6c34
      _0x146b6d.is_playing = true
      const _0x37e8ef = this.game.teammates.find((_0x4b091f) => {
        return _0x4b091f.cid === _0x146b6d.cid
      })
      if (!_0x37e8ef) {
        return
      }
      _0x37e8ef.source = _0x1c6c34
      _0x37e8ef.dead = true
      this.populateSpectateList()
    }
    ['playerLeft'](_0x8bc7c4) {
      const _0x1b8086 = this.game.players.find((_0x53a4b3) => {
        return _0x53a4b3.cid === _0x8bc7c4
      })
      if (!_0x1b8086) {
        return
      }
      _0x1b8086.is_playing = false
      this.populateSpectateList()
    }
    ['teammateDied'](_0x2509e2) {
      const _0x5c3cb4 = this.game.teammates.find((_0x176b32) => {
        return _0x176b32.source === _0x2509e2
      })
      if (!_0x5c3cb4) {
        return
      }
      _0x5c3cb4.dead = true
      this.populateSpectateList()
    }
    ['roundHalfTime'](_0x168be4, _0x409dcc) {
      this.game.teamID = _0x168be4
      this.game.isDefender = _0x409dcc
    }
    ['updateScores'](_0xd5c40f) {
      this.game.scores = _0xd5c40f
    }
    ['bombPickedUp']() {
      this.bomb.setBombDropped(false, [])
    }
    ['bombDropped'](_0xe41d9f) {
      this.bomb.setBombDropped(true, _0xe41d9f)
    }
    async ['defuseBomb']() {
      if (!this.game.isDefender) {
        return
      }
      if (!this.bomb.isActive()) {
        return
      }
      await this.bomb.defuse(_0x9cf8be.bombDefuseTime)
      if (this.game.dead) {
        return
      }
      if (!this.game.state) {
        return
      }
      _0x5db1e3.emitNet('ev-games:airsoft:snd:defuseBomb', this.game.code)
    }
    async ['createBomb'](_0xc75b6c, _0xc9c61) {
      this.bomb.setActive(true)
      const _0x65035f = await this.bomb.create(
        _0xc75b6c,
        _0x9cf8be.bombTime / 1000,
        _0xc9c61
      )
      this.game.bombTimerTick == null &&
        (this.game.bombTimerTick = setInterval(() => {
          this.game.bombTimer--
          _0x28c85d(true, _0x9cf8be.id, this.game.scores)
        }, 1000))
      this.spectator.setObject(_0x65035f)
    }
    async ['destroyBomb'](_0x2dc7ce) {
      _0x2dc7ce && (this.bomb.setExploded(true), await this.bomb.explode())
      this.game.bombTimerTick != null &&
        (clearInterval(this.game.bombTimerTick),
        (this.game.bombTimerTick = null))
      this.bomb.setActive(false)
      this.bomb.destroy()
      this.spectator.setObject(null)
    }
    async ['checkBombSite']() {
      if (!this.bomb.hasBomb) {
        return
      }
      if (this.game.isDefender) {
        return
      }
      const _0x149057 = _0x9cf8be.maps[this.game.map].bombSites,
        _0x54ce3a = GetEntityCoords(PlayerPedId(), true)
      for (const _0x380cd9 of _0x149057) {
        if (_0x4e690c(_0x54ce3a, _0x380cd9.pos) > _0x380cd9.radius) {
          continue
        }
        await this.bomb.plant(_0x9cf8be.bombPlantTime)
        if (this.game.dead) {
          return
        }
        if (!this.game.state) {
          return
        }
        const _0xcf3251 = GetGroundZAndNormalFor_3dCoord(
            _0x54ce3a[0],
            _0x54ce3a[1],
            _0x54ce3a[2]
          )[1],
          _0x1effde = [_0x54ce3a[0], _0x54ce3a[1], _0xcf3251]
        _0x5db1e3.emitNet(
          'ev-games:airsoft:snd:plantBomb',
          this.game.code,
          _0x1effde,
          _0x380cd9.name
        )
        break
      }
    }
    ['equipWeapon'](_0x19be2c, _0x13da60, _0x5356c7) {
      this.loadouts.equipWeapon(_0x19be2c, _0x13da60, _0x5356c7)
    }
    ['unequipWeapons']() {
      this.loadouts.unequipWeapons(true)
    }
    ['handleDeath']() {
      this.game.dead = !this.game.dead
      if (!this.game.dead) {
        return
      }
      const _0x408a9a = GetEntityCoords(PlayerPedId(), false)
      !this.bomb.isExploded() &&
        !this.game.deadTimeout &&
        ((this.game.deadTimeout = true),
        setTimeout(() => {
          this.game.deadTimeout = false
        }, 500),
        _0x5db1e3.emitNet(
          'ev-games:airsoft:snd:playerDied',
          this.game.code,
          this.game.isDefender,
          this.game.teamID,
          this.bomb.hasBomb(),
          _0x408a9a
        ))
      if (this.game.teammates.length <= 1) {
        return
      }
      emit('reviveFunction')
      if (!this.spectator.isSpectating()) {
        this.spectator.create()
      }
    }
    ['handleKill'](_0x20a929, _0x2c9d7b) {
      if (PlayerId() !== _0x2c9d7b) {
        return
      }
      if (PlayerId() === _0x20a929) {
        return
      }
      const _0x1b54ec = GetPlayerServerId(_0x20a929)
      if (_0x1b54ec === 0) {
        return
      }
      PlaySoundFrontend(-1, 'RANK_UP', 'HUD_AWARDS', false)
    }
    async ['spawnPlayer']() {
      this.game.spawned = true
      exports['ev-ui'].hideContextMenu()
      await _0x2db2bc(true, 1000)
      const _0x25e221 =
        _0x9cf8be.maps[this.game.map].spawns[this.game.isDefender ? 1 : 0]
          .points[
          _0x360075(
            0,
            _0x9cf8be.maps[this.game.map].spawns[this.game.isDefender ? 1 : 0]
              .points.length - 1
          )
        ].pos
      SetEntityCoords(
        PlayerPedId(),
        _0x25e221[0],
        _0x25e221[1],
        _0x25e221[2],
        true,
        false,
        false,
        false
      )
      SetEntityHeading(PlayerPedId(), _0x25e221[3])
      FreezeEntityPosition(PlayerPedId(), false)
      emit('reviveFunction')
      emit('ev-evidence:disable', true)
      exports.police.DisableBleeding(true)
      exports['ev-galleria'].toggleEffects(false)
      exports['ev-actionbar'].DisableGSR(true)
      exports['ev-actionbar'].EnableStressReliefWhenShooting(true)
      exports.ragdoll.DisableReduceFactor(true)
      exports.ragdoll.OverrideMaxHealth(true, _0x9cf8be.playerHealth)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      this.spawnCam != null &&
        (RenderScriptCams(false, false, 0, true, true),
        DestroyCam(this.spawnCam, false),
        (this.spawnCam = null))
      if (this.game.markerTick == null) {
        this.markerTick()
      }
      await _0x2db2bc(false, 1000)
      this.bomb.checkIfPlayerHasBomb()
      this.game.deadTimeout = false
    }
    ['setRoundState'](_0x4ce28d) {
      this.game.state = _0x4ce28d
      if (this.game.state) {
        if (!this.game.spawned) {
          this.spawnPlayer()
        }
        clearTick(this.game.waitTick)
        this.game.timerTick = setInterval(() => {
          this.game.roundTimer--
          _0x28c85d(true, _0x9cf8be.id, this.game.scores)
        }, 1000)
        return
      }
      this.game.waitTick = setTick(() => {
        DisableControlAction(0, 24, true)
        DisableControlAction(0, 257, true)
        DisableControlAction(0, 25, true)
        DisableControlAction(0, 263, true)
        DisableControlAction(0, 32, true)
        DisableControlAction(0, 34, true)
        DisableControlAction(0, 31, true)
        DisableControlAction(0, 30, true)
        DisableControlAction(0, 45, true)
        DisableControlAction(0, 22, true)
        DisableControlAction(0, 44, true)
        DisableControlAction(0, 288, true)
      })
      clearInterval(this.game.timerTick)
      this.game.bombTimerTick != null &&
        (clearInterval(this.game.bombTimerTick),
        (this.game.bombTimerTick = null))
      this.game.bombTimer = _0x9cf8be.bombTime / 1000
      this.game.timerTick = null
      this.game.roundTimer = _0x9cf8be.roundTime * 60
      _0x28c85d(true, _0x9cf8be.id, this.game.scores)
      for (const _0x9f1807 of this.game.teammates) {
        _0x9f1807.dead = false
      }
      this.populateSpectateList()
      this.bomb.setExploded(false)
      this.bomb.setBombDropped(false, [])
      this.setupRoundSpawn()
    }
    async ['end']() {
      if (this.game.timerTick != null) {
        clearInterval(this.game.timerTick)
      }
      _0x28c85d(false, _0x9cf8be.id, [])
      for (const _0xccc412 of this.game.bombSiteBlips) {
        RemoveBlip(_0xccc412)
      }
      await _0x2db2bc(true, 1000)
      clearTick(this.game.markerTick)
      this.game.markerTick = null
      this.unequipWeapons()
      this.loadouts.unequipAmmoTypes()
      this.loadouts = null
      emit('actionbar:setEmptyHanded', true)
      if (this.spectator.isSpectating()) {
        this.spectator.destroy()
      }
      if (this.game.dead) {
        emit('reviveFunction')
      }
      emit('ev-evidence:disable', false)
      exports['ev-ui'].hideContextMenu()
      exports.police.DisableBleeding(false)
      exports['ev-galleria'].toggleEffects(true)
      exports['ev-actionbar'].DisableGSR(false)
      exports['ev-actionbar'].EnableStressReliefWhenShooting(false)
      exports.ragdoll.DisableReduceFactor(false)
      exports.ragdoll.OverrideMaxHealth(false)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      this.spawnCam != null &&
        (RenderScriptCams(false, false, 0, true, true),
        DestroyCam(this.spawnCam, false),
        (this.spawnCam = null))
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(false)
      await RPC.execute('ev-infinity:setWorld', 'default')
      FreezeEntityPosition(PlayerPedId(), false)
      SetEntityCoords(
        PlayerPedId(),
        this.game.arcadePos[0],
        this.game.arcadePos[1],
        this.game.arcadePos[2],
        true,
        false,
        false,
        false
      )
      this.bomb = null
      this.spectator = null
      await _0x2db2bc(false, 1000)
    }
    ['getCode']() {
      return this.game.code
    }
    ['isBombActive']() {
      return this.bomb.isActive()
    }
    ['isDefending']() {
      return this.game.isDefender
    }
    ['getRoundTimer']() {
      return this.game.roundTimer
    }
    ['getBombTimer']() {
      return this.game.bombTimer
    }
    ['getBombSite']() {
      return this.bomb.getBombSite()
    }
    ['getTeamID']() {
      return this.game.teamID
    }
  }
  class _0x83ee32 {
    constructor(
      _0x183e32,
      _0x33926e,
      _0x18ad6b,
      _0x260cb4,
      _0x18fd91,
      _0x2e3def,
      _0xda78c5,
      _0x1e2ef9
    ) {
      this.spawnCam = null
      this.lastSpawn = 0
      this.loadouts = new _0x1a2872(_0x390739.id)
      const _0x5388b8 = {
        code: _0x183e32,
        map: _0x33926e,
        totalPoints: _0x18ad6b,
        teams: _0x260cb4,
        teammates: _0x18fd91,
        teamID: _0x2e3def,
        isRed: _0xda78c5,
        state: false,
        arcadePos: _0x390739.arcadePos,
        spawned: false,
        dead: false,
        deadTimeout: false,
        killTimeout: false,
        killTimeoutID: null,
        previousKill: 0,
        markerTick: null,
        scores: [0, 0],
      }
      this.game = _0x5388b8
      this.loadouts.init()
      RPC.execute('ev-infinity:setWorld', this.game.code, 'inactive', false)
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(true)
      if (_0x1e2ef9) {
        this.start(true)
      }
    }
    ['markerTick']() {
      const _0x1927c5 = _0x390739.maps[this.game.map].centerPos,
        _0x562959 = _0x390739.maps[this.game.map].playZoneRadius,
        _0xfa2fbc = {
          r: 231,
          g: 76,
          b: 60,
          a: 0,
        }
      const _0x7dd746 = _0xfa2fbc,
        _0x35eae9 = _0x562959 - 5
      let _0x356909 = false,
        _0x1a7efc = null
      this.game.markerTick = setTick(async () => {
        for (
          let _0x46476d = 0;
          _0x46476d < this.game.teams.length;
          _0x46476d++
        ) {
          const _0xd2b189 = this.game.teams[_0x46476d]
          for (const _0x274b00 of _0xd2b189.players) {
            const _0x53d327 = GetPlayerFromServerId(_0x274b00.source),
              _0x26518c = GetPlayerPed(_0x53d327)
            if (_0x53d327 === -1) {
              continue
            }
            if (_0x53d327 === PlayerId()) {
              continue
            }
            if (_0x26518c === 0) {
              continue
            }
            if (!IsPedAPlayer(_0x26518c)) {
              continue
            }
            const _0x3ba04e = GetOffsetFromEntityInWorldCoords(
                _0x26518c,
                0,
                0,
                1.1
              ),
              _0x2ff694 = {
                r: 52,
                g: 152,
                b: 219,
                a: 200,
              }
            const _0x1c492a = {
              r: 231,
              g: 76,
              b: 60,
              a: 200,
            }
            const _0x49e239 =
              _0x46476d === this.game.teamID ? _0x2ff694 : _0x1c492a
            if (this.game.spawned) {
              _0x521324(20, _0x3ba04e, [180, 0, 0], 0.3, _0x49e239, false, true)
            }
          }
        }
        const _0x1fa88c = GetEntityCoords(PlayerPedId(), true),
          _0x19911d = _0x4e690c(_0x1fa88c, _0x1927c5)
        if (_0x19911d < _0x562959 && _0x356909) {
          clearTimeout(_0x1a7efc)
          _0x1a7efc = null
          _0x356909 = false
        }
        if (!this.game.spawned) {
          await _0x3ea216(1000)
          return
        }
        if (this.game.dead) {
          return
        }
        const _0x279123 = _0x19911d - _0x35eae9
        _0x7dd746.a = Math.floor(_0x1d935b((_0x279123 / 10) * 255, 0, 255))
        if (_0x7dd746.a <= 0) {
          return
        }
        _0x19911d > _0x562959 &&
          !_0x356909 &&
            ((_0x356909 = true),
            emit('DoLongHudText', "You are outside the playzone! Return in 10 seconds or you'll be killed.", 2),
            (_0x1a7efc = setTimeout(() => {
              if (!_0x356909) {
                return
              }
              ApplyDamageToPed(PlayerPedId(), 100000, false)
            }, _0x390739.maps[this.game.map].totalTimeOutsidePlayZone * 1000)))
        _0x521324(28, _0x1927c5, [0, 0, 0], _0x562959, _0x7dd746, false, false)
      })
    }
    async ['setupRoundSpawn']() {
      clearTick(this.game.markerTick)
      this.game.markerTick = null
      this.game.spawned = false
      await _0x2db2bc(true, 1000)
      if (this.game.dead) {
        emit('reviveFunction')
      }
      const _0x3f2144 = _0x390739.maps[this.game.map].spawns[0].points[0].pos,
        _0x177ac7 = _0x390739.maps[this.game.map].spawnCameraPos
      SetEntityCoords(
        PlayerPedId(),
        _0x3f2144[0],
        _0x3f2144[1],
        _0x3f2144[2] - 100,
        true,
        false,
        false,
        false
      )
      SetEntityHeading(PlayerPedId(), _0x3f2144[3])
      FreezeEntityPosition(PlayerPedId(), true)
      this.spawnCam = CreateCamWithParams(
        'DEFAULT_SCRIPTED_CAMERA',
        _0x177ac7[0],
        _0x177ac7[1],
        _0x177ac7[2],
        0,
        0,
        _0x177ac7[3],
        50,
        false,
        0
      )
      SetCamActive(this.spawnCam, true)
      RenderScriptCams(true, false, 0, true, true)
      await _0x2db2bc(false, 1000)
      _0x2a7a9a(_0x390739.id, false)
    }
    ['playerRelogged'](_0x36c5e8, _0x131150) {
      for (const _0x9ef0cf of this.game.teams) {
        for (const _0x44eeb5 of _0x9ef0cf.players) {
          if (_0x44eeb5.cid !== _0x36c5e8) {
            continue
          }
          _0x44eeb5.source = _0x131150
          break
        }
      }
      const _0x2246a8 = this.game.teammates.find((_0x679ff5) => {
        return _0x679ff5.cid === _0x36c5e8
      })
      if (!_0x2246a8) {
        return
      }
      _0x2246a8.source = _0x131150
    }
    ['swapTeams'](_0x4715ac, _0x49eb17) {
      this.game.teamID = _0x4715ac
      this.game.isRed = _0x49eb17
    }
    ['equipWeapon'](_0x2f763b, _0x5ed723, _0x510dc1) {
      this.loadouts.equipWeapon(_0x2f763b, _0x5ed723, _0x510dc1)
    }
    ['unequipWeapons']() {
      this.loadouts.unequipWeapons(true)
    }
    async ['handleDeath']() {
      this.game.dead = !this.game.dead
      if (!this.game.dead) {
        return
      }
      await _0x2db2bc(true, 1000)
      emit('reviveFunction')
      if (!this.game.deadTimeout) {
        this.game.deadTimeout = true
        setTimeout(() => {
          this.game.deadTimeout = false
        }, 500)
        this.loadouts.replenishAmmo()
        if (this.game.state) {
          this.spawnPlayer()
        }
      }
    }
    ['handleKill'](_0x241f9a, _0xcf7356) {
      if (PlayerId() !== _0xcf7356) {
        return
      }
      if (PlayerId() === _0x241f9a) {
        return
      }
      const _0x25408a = GetPlayerServerId(_0x241f9a)
      if (_0x25408a === 0) {
        return
      }
      this.game.killTimeout &&
        this.game.previousKill !== _0x25408a &&
        ((this.game.killTimeout = false),
        this.game.killTimeoutID != null &&
          (clearTimeout(this.game.killTimeoutID),
          (this.game.killTimeoutID = null)))
      this.game.previousKill = _0x25408a
      PlaySoundFrontend(-1, 'RANK_UP', 'HUD_AWARDS', false)
      !this.game.killTimeout &&
        ((this.game.killTimeout = true),
        (this.game.killTimeoutID = setTimeout(() => {
          this.game.killTimeout = false
          this.game.killTimeoutID = null
        }, 500)),
        _0x5db1e3.emitNet('ev-games:airsoft:tdm:playerKilled', this.game.code, this.game.isRed, _0x25408a))
    }
    async ['spawnPlayer']() {
      this.game.spawned = true
      exports['ev-ui'].hideContextMenu()
      await _0x2db2bc(true, 1000)
      const _0x7bc988 = _0x5521ce(
          this.lastSpawn,
          0,
          _0x390739.maps[this.game.map].spawns[this.game.isRed ? 1 : 0].points
            .length - 1
        ),
        _0x3551f4 =
          _0x390739.maps[this.game.map].spawns[this.game.isRed ? 1 : 0].points[
            _0x7bc988
          ].pos
      this.lastSpawn = _0x7bc988
      SetEntityCoords(
        PlayerPedId(),
        _0x3551f4[0],
        _0x3551f4[1],
        _0x3551f4[2],
        true,
        false,
        false,
        false
      )
      SetEntityHeading(PlayerPedId(), _0x3551f4[3])
      FreezeEntityPosition(PlayerPedId(), false)
      emit('reviveFunction')
      emit('ev-evidence:disable', true)
      exports.police.DisableBleeding(true)
      exports['ev-galleria'].toggleEffects(false)
      exports['ev-actionbar'].DisableGSR(true)
      exports['ev-actionbar'].EnableStressReliefWhenShooting(true)
      exports.ragdoll.DisableReduceFactor(true)
      exports.ragdoll.OverrideMaxHealth(true, _0x390739.playerHealth)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      this.spawnCam != null &&
        (RenderScriptCams(false, false, 0, true, true),
        DestroyCam(this.spawnCam, false),
        (this.spawnCam = null))
      if (this.game.markerTick == null) {
        this.markerTick()
      }
      await _0x2db2bc(false, 1000)
      this.game.deadTimeout = false
    }
    ['start'](_0x59da55) {
      this.game.state = true
      if (_0x59da55) {
        setTimeout(() => {
          _0x28c85d(true, _0x390739.id, this.game.scores)
        }, 5000)
      } else {
        _0x28c85d(true, _0x390739.id, this.game.scores)
      }
      this.setupRoundSpawn()
    }
    async ['end']() {
      this.game.state = false
      _0x28c85d(false, _0x390739.id, [])
      await _0x2db2bc(true, 1000)
      clearTick(this.game.markerTick)
      this.game.markerTick = null
      this.unequipWeapons()
      this.loadouts.unequipAmmoTypes()
      this.loadouts = null
      emit('actionbar:setEmptyHanded', true)
      if (this.game.dead) {
        emit('reviveFunction')
      }
      emit('ev-evidence:disable', false)
      exports['ev-ui'].hideContextMenu()
      exports.police.DisableBleeding(false)
      exports['ev-galleria'].toggleEffects(true)
      exports['ev-actionbar'].DisableGSR(false)
      exports['ev-actionbar'].EnableStressReliefWhenShooting(false)
      exports.ragdoll.DisableReduceFactor(false)
      exports.ragdoll.OverrideMaxHealth(false)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      this.spawnCam != null &&
        (RenderScriptCams(false, false, 0, true, true),
        DestroyCam(this.spawnCam, false),
        (this.spawnCam = null))
      _0x5eb74f.g.exports['ev-ai-aggression'].supressAlerts(false)
      await RPC.execute('ev-infinity:setWorld', 'default')
      FreezeEntityPosition(PlayerPedId(), false)
      SetEntityCoords(
        PlayerPedId(),
        this.game.arcadePos[0],
        this.game.arcadePos[1],
        this.game.arcadePos[2],
        true,
        false,
        false,
        false
      )
      await _0x2db2bc(false, 1000)
    }
    ['getCode']() {
      return this.game.code
    }
    ['isSpawned']() {
      return this.game.spawned
    }
    ['getTotalPoints']() {
      return this.game.totalPoints
    }
    ['getTeamID']() {
      return this.game.teamID
    }
  }
  let _0x2082f0 = null,
    _0xfe97eb = null,
    _0x1c9cc1 = null,
    _0x56e799 = null
  const _0x5941f2 = async (
      _0x4b2cac,
      _0x471034,
      _0x9f8c34,
      _0x4aff74,
      _0x40ce3d,
      _0x156368,
      _0x362aa4
    ) => {
      if (_0x2082f0 || _0xfe97eb) {
        return
      }
      _0x2082f0 = new _0x83ee32(
        _0x4b2cac,
        _0x471034,
        _0x9f8c34,
        _0x4aff74,
        _0x40ce3d,
        _0x156368,
        _0x362aa4,
        false
      )
    },
    _0x3d204f = async (
      _0xeb3c07,
      _0x5898e3,
      _0x196c9f,
      _0x1e3a1c,
      _0x57f401,
      _0x4bc648,
      _0x3339d1
    ) => {
      if (_0x2082f0 || _0xfe97eb) {
        return
      }
      _0xfe97eb = new _0x1a99e8(
        _0xeb3c07,
        _0x5898e3,
        _0x196c9f,
        _0x1e3a1c,
        _0x57f401,
        _0x4bc648,
        _0x3339d1,
        false
      )
    },
    _0x35100f = async (_0x2d78e4) => {
      if (!_0x2082f0) {
        return
      }
      if (_0x2082f0.getCode() !== _0x2d78e4) {
        return
      }
      await _0x2082f0.end()
      _0x2082f0 = null
    },
    _0x36bfac = async (_0x1a9c8a) => {
      if (!_0xfe97eb) {
        return
      }
      if (_0xfe97eb.getCode() !== _0x1a9c8a) {
        return
      }
      await _0xfe97eb.end()
      _0xfe97eb = null
    },
    _0x50eff2 = (
      _0x297cce,
      _0x57a97f,
      _0x539a08,
      _0x3faccb,
      _0x4d42b4,
      _0x57e684,
      _0x23d783
    ) => {
      if (_0x2082f0 || _0xfe97eb) {
        return
      }
      _0x2082f0 = new _0x83ee32(
        _0x297cce,
        _0x57a97f,
        _0x539a08,
        _0x3faccb,
        _0x4d42b4,
        _0x57e684,
        _0x23d783,
        true
      )
    },
    _0x4c15b6 = (
      _0x298fe0,
      _0x1672f9,
      _0x103230,
      _0x365903,
      _0x57dcb5,
      _0x138aa4,
      _0x25c11e,
      _0x590a31
    ) => {
      if (_0x2082f0 || _0xfe97eb) {
        return
      }
      _0xfe97eb = new _0x1a99e8(
        _0x298fe0,
        _0x1672f9,
        _0x103230,
        _0x365903,
        _0x57dcb5,
        _0x138aa4,
        _0x25c11e,
        true,
        _0x590a31
      )
    },
    _0x49b1e8 = async (
      _0x4fca03,
      _0x23a5b1,
      _0x48d675,
      _0x455a98,
      _0x22f95d
    ) => {
      if (_0x1c9cc1 || _0x56e799) {
        return
      }
      _0x1c9cc1 = new _0x3e9d08(
        _0x4fca03,
        _0x23a5b1,
        _0x48d675,
        _0x455a98,
        _0x22f95d
      )
    },
    _0x57369f = async (_0x5517c3, _0xa67b85, _0x539d08, _0x33b482) => {
      if (_0x1c9cc1 || _0x56e799) {
        return
      }
      _0x56e799 = new _0x47920e(_0x5517c3, _0xa67b85, _0x539d08, _0x33b482)
    },
    _0x13cc6f = async () => {
      if (!_0x1c9cc1) {
        return
      }
      await _0x1c9cc1.destroy()
      _0x1c9cc1 = null
    },
    _0x209320 = async () => {
      if (!_0x56e799) {
        return
      }
      await _0x56e799.destroy()
      _0x56e799 = null
    }
  exports('isInTDM', () => {
    if (!_0x2082f0) {
      return false
    }
    return true
  })
  exports('isSpawnedTDM', () => {
    if (!_0x2082f0) {
      return false
    }
    return _0x2082f0.isSpawned()
  })
  ;(async () => {
    await _0x481ec7()
  })()
})()
