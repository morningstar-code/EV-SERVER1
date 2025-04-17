;(() => {
  'use strict'
  var _0x25d568 = {
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x47b116) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
  }
  ;(() => {})()
  var _0x538747 = {}
  const _0x2d487a = globalThis.CPX,
    _0x284e3c = _0x2d487a.Hud,
    _0x5910e2 = _0x2d487a.Utils,
    _0x3c13ff = _0x2d487a.Zones,
    _0x6f53a1 = _0x2d487a.Events,
    _0x17218f = _0x2d487a.Streaming,
    _0x5dedd3 = _0x2d487a.Procedures,
    _0x49ecb0 = _0x2d487a.Interface,
    _0x1f6eef = null && _0x2d487a
  let _0x3b1143 = exports['ev-config'].GetModuleConfig('main')
  const _0x36d578 = new Map(),
    _0x5949f7 = GetCurrentResourceName()
  async function _0x5ba681() {}
  on('ev-config:configLoaded', (_0x45c64c, _0x52b2d0) => {
    if (_0x45c64c === 'main') {
      _0x3b1143 = _0x52b2d0
    } else {
      _0x36d578.has(_0x45c64c) && _0x36d578.set(_0x45c64c, _0x52b2d0)
    }
  })
  function _0x21ed9a(_0x5941da) {
    return _0x3b1143[_0x5941da]
  }
  function _0x94de97(_0x2a29ee, _0x283004) {
    if (!_0x36d578.has(_0x2a29ee)) {
      const _0x419496 = exports['ev-config'].GetModuleConfig(_0x2a29ee)
      if (_0x419496 === undefined) {
        return
      }
      _0x36d578.set(_0x2a29ee, _0x419496)
    }
    const _0x4487d8 = _0x36d578.get(_0x2a29ee)
    return _0x283004
      ? _0x4487d8 === null || _0x4487d8 === void 0
        ? void 0
        : _0x4487d8[_0x283004]
      : _0x4487d8
  }
  function _0x2766a8(_0x5bd8a5) {
    return _0x94de97(_0x5949f7, _0x5bd8a5)
  }
  async function _0x476bfd() {}
  async function _0x3607ae(_0x10578b) {
    return new Promise((_0x4428d7) => setTimeout(() => _0x4428d7(), _0x10578b))
  }
  const _0x2ae6e8 = (_0x2f10b0, _0x5c9d3c) => {
      const [_0x357ef5, _0x20c488, _0x1806fd] = [
        _0x2f10b0[0] - _0x5c9d3c[0],
        _0x2f10b0[1] - _0x5c9d3c[1],
        _0x2f10b0[2] - _0x5c9d3c[2],
      ]
      return Math.sqrt(
        _0x357ef5 * _0x357ef5 + _0x20c488 * _0x20c488 + _0x1806fd * _0x1806fd
      )
    },
    _0x1ee505 = () => Math.floor(Date.now() / 1000)
  function _0x32ac6e(_0x37adb3, _0x31d413, _0x216f1f) {
    return new Promise((_0xaf989) => {
      exports['ev-phone'].DoPhoneConfirmation(
        _0x37adb3,
        _0x31d413,
        _0x216f1f,
        _0xaf989
      )
    })
  }
  const _0x19586a = () => {
    return new Promise((_0x318144) => {
      let _0x53d2d0 = 0
      const _0x5387e2 = setInterval(() => {
        if (exports['ev-config'].IsConfigReady()) {
          clearInterval(_0x5387e2)
          _0x318144(true)
        } else {
          _0x53d2d0++
          if (_0x53d2d0 > 10) {
            clearInterval(_0x5387e2)
            _0x318144(false)
          }
        }
      }, 3000)
    })
  }
  let _0x5ef2d1 = null
  const _0xb81533 = {},
    _0x21d7d3 = async () => {
      await _0x19586a()
      const _0x4405ab = _0x94de97('ev-games:games')
      for (const _0x5d3e31 of _0x4405ab.games) {
        _0x7b11c6(_0x5d3e31)
        _0xb81533[_0x5d3e31.id] = true
      }
    },
    _0x7b11c6 = async (_0x52cfef) => {
      exports['ev-polytarget'].AddBoxZone('ev-games:game:' + _0x52cfef.id,
        _0x52cfef.zone.coords,
        _0x52cfef.zone.length,
        _0x52cfef.zone.width,
        {
          minZ: _0x52cfef.zone.minZ,
          maxZ: _0x52cfef.zone.maxZ,
          heading: _0x52cfef.zone.heading,
          data: {
            game: _0x52cfef.id,
            name: _0x52cfef.name,
            zone: _0x52cfef.zone.coords,
          },
        }
      )
      const _0x7f3c2b = { radius: 3.5 }
      exports['ev-interact'].AddPeekEntryByPolyTarget(
        'ev-games:game:' + _0x52cfef.id,
        [
          {
            CPXEvent: 'ev-games:startGame',
            id: 'games_start_game_' + _0x52cfef.id,
            icon: 'chess',
            label: 'Play ' + _0x52cfef.name,
            parameters: { game: _0x52cfef.id },
          },
        ],
        {
          distance: _0x7f3c2b,
          isEnabled: () => _0x2937ce(),
        }
      )
    }
  _0x6f53a1.on('ev-games:startGame', (_0x49c9cd) => {
    if (!_0xb81533[_0x49c9cd.game]) {
      return
    }
    _0x3ac2dd(_0x49c9cd.game)
  })
  RegisterUICallback('ev-games:viewGame', (_0x41a94d, _0x1f720e) => {
    const _0x54e136 = {
      ok: true,
      message: '',
    }
    const _0x25b3d1 = {
      data: {},
      meta: _0x54e136,
    }
    _0x1f720e(_0x25b3d1)
    _0x3ac2dd(_0x41a94d.key.game)
  })
  const _0x3ac2dd = async (_0x2f4559) => {
    const _0x33cacd = await _0x5dedd3.execute('ev-games:getLobbies', _0x2f4559),
      _0x43513c = {
        action: 'ev-games:createGame',
        title: 'Create new Lobby',
        description: 'Create your own lobby!',
        icon: 'user-plus',
        key: _0x2f4559,
        disabled: _0x5ef2d1 != null,
      }
    const _0x2a93f5 = [_0x43513c]
    for (const _0x1f65b1 of _0x33cacd) {
      const _0x4a0df8 = {
        action:
          (_0x5ef2d1 === null || _0x5ef2d1 === void 0
            ? void 0
            : _0x5ef2d1.id) == _0x1f65b1.id
            ? 'ev-games:viewLobby'
            : 'ev-games:joinGame',
        title: _0x1f65b1.name,
        description:
          (_0x5ef2d1 === null || _0x5ef2d1 === void 0
            ? void 0
            : _0x5ef2d1.id) == _0x1f65b1.id
            ? 'View lobby'
            : 'Join lobby',
        icon: 'users',
        key: {},
        disabled:
          _0x5ef2d1 != null &&
          (_0x5ef2d1 === null || _0x5ef2d1 === void 0
            ? void 0
            : _0x5ef2d1.id) != _0x1f65b1.id &&
          !_0x1f65b1.started,
      }
      _0x4a0df8.key.game = _0x2f4559
      _0x4a0df8.key.lobby = _0x1f65b1
      _0x2a93f5.push(_0x4a0df8)
    }
    exports['ev-ui'].showContextMenu(_0x2a93f5)
  }
  RegisterUICallback('ev-games:createGame', async (_0x1e829e, _0x428205) => {
    var _0x5b5fe6
    const _0x524c3c = {
      ok: true,
      message: '',
    }
    const _0x1ea9fc = {
      data: {},
      meta: _0x524c3c,
    }
    _0x428205(_0x1ea9fc)
    await _0x3607ae(100)
    const _0x30ff68 = {
      icon: 'file-signature',
      label: 'Lobby name',
      name: 'name',
    }
    const _0x19a8f8 = {
      icon: 'key',
      label: 'Lobby code',
      name: 'code',
      type: 'password',
    }
    const _0x5c4ea1 = [_0x30ff68, _0x19a8f8],
      _0x4e2756 = _0x42df3d(_0x1e829e.key),
      _0x923aa8 =
        _0x4e2756.gameData &&
        _0x4e2756.gameData.customData &&
        _0x4e2756.gameData.customData.length > 0
    if (_0x923aa8) {
      for (const _0x134342 of _0x4e2756.gameData.customData) {
        let _0x5667e0 =
          (_0x5b5fe6 = _0x134342.options) !== null && _0x5b5fe6 !== void 0
            ? _0x5b5fe6
            : []
        _0x134342.type === 'select' &&
          _0x134342.customOptions != null &&
          (_0x5667e0 =
            exports['ev-games-' + _0x4e2756.resource][
              _0x134342.customOptions.func
            ]())
        const _0x5afbb9 = {
          options: _0x5667e0,
          icon: 'tag',
          label: _0x134342.name,
          name: _0x134342.id,
        }
        _0x5afbb9['_type'] = _0x134342.type
        _0x5c4ea1.push(_0x5afbb9)
      }
    }
    const _0x13f562 = await exports['ev-ui'].OpenInputMenu(
      _0x5c4ea1,
      (_0x58f153) => {
        let _0x5c8191 = true
        if (_0x923aa8) {
          for (const _0x2f410d of _0x4e2756.gameData.customData) {
            if (
              !_0x58f153[_0x2f410d.id] ||
              _0x58f153[_0x2f410d.id].length == 0
            ) {
              _0x5c8191 = false
              break
            }
          }
        }
        return (
          _0x58f153.name &&
          _0x58f153.name.length > 0 &&
          _0x58f153.code &&
          _0x58f153.code.length > 0 &&
          _0x5c8191
        )
      }
    )
    if (!_0x13f562) {
      return
    }
    const _0x2d2d35 = await _0x5dedd3.execute('ev-games:createLobby', _0x1e829e.key, _0x13f562)
    if (!_0x2d2d35) {
      return emit('DoLongHudText', 'Lobby was unable to be created.', 2)
    }
    emit('DoLongHudText', 'Lobby created!')
    _0x3ac2dd(_0x1e829e.key)
  })
  RegisterUICallback('ev-games:joinGame', async (_0x20d84b, _0x568fe1) => {
    await _0x3607ae(100)
    const _0x98321e = {
      ok: true,
      message: '',
    }
    const _0xc86dfe = {
      data: {},
      meta: _0x98321e,
    }
    _0x568fe1(_0xc86dfe)
    const _0x3133b8 = {
      icon: 'key',
      label: 'Lobby code',
      name: 'code',
      type: 'password',
    }
    const _0x5bdbb7 = await exports['ev-ui'].OpenInputMenu(
      [_0x3133b8],
      (_0x51f812) => _0x51f812.code && _0x51f812.code.length > 0
    )
    if (!_0x5bdbb7) {
      return
    }
    if (_0x5bdbb7.code !== _0x20d84b.key.lobby.code) {
      return emit('DoLongHudText', 'Incorrect code.', 2)
    }
    _0x6f53a1.emitNet('ev-games:joinGame', _0x20d84b.key.game, _0x20d84b.key.lobby.id)
  })
  RegisterUICallback('ev-games:viewLobby', async (_0xd6fc65, _0x1d1647) => {
    var _0x2708fa, _0x5d7c4d
    const _0x4fbc16 = {
      ok: true,
      message: '',
    }
    const _0x23d95d = {
      data: {},
      meta: _0x4fbc16,
    }
    _0x1d1647(_0x23d95d)
    const _0x1cadee = await _0x5dedd3.execute('ev-games:getLobby', _0xd6fc65.key.game, _0xd6fc65.key.lobby.id)
    if (!_0x1cadee) {
      return emit('DoLongHudText', 'Lobby was unable to be found.', 2)
    }
    const _0x55167a = exports.isPed.isPed('cid'),
      _0x2d6117 = _0x42df3d(_0xd6fc65.key.game),
      _0x50b28f = _0x1cadee.players.filter((_0x3cc86e) => _0x3cc86e.is_playing).length,
      _0x436639 = {
        action: undefined,
        title: _0x1cadee.name,
      }
    const _0xa6321e = {
      game: _0xd6fc65.key.game,
      lobby: _0x1cadee,
    }
    const _0x392bdf = {
      action: 'ev-games:viewLobbyPlayers',
      title: 'Players',
      description: _0x50b28f + '/' + _0x2d6117.gameData.maxPlayers,
      icon: 'users',
      key: _0xa6321e,
    }
    const _0x5dace7 = {
      game: _0xd6fc65.key.game,
      lobby: _0x1cadee,
    }
    const _0x39528d = {
      action: 'ev-games:invitePlayers',
      title: 'Invite Players',
      icon: 'user-plus',
      description: 'Invite some more players to get your game going!',
      key: _0x5dace7,
      disabled: _0x50b28f >= _0x2d6117.gameData.maxPlayers,
    }
    const _0x37ab64 = [_0x436639, _0x392bdf, _0x39528d]
    if (_0x2d6117.type == 'teams') {
      for (
        let _0x3f6ec3 = 0;
        _0x3f6ec3 < _0x2d6117.gameData.teams;
        _0x3f6ec3++
      ) {
        const _0x46c9c2 = {
          action: 'ev-games:viewLobbyTeam',
          title: 'Team ' + (_0x3f6ec3 + 1),
          icon: 'users-cog',
          description:
            _0x1cadee.teams[_0x3f6ec3].players.length +
            '/' +
            _0x2d6117.gameData.teamSize,
          key: {},
        }
        _0x46c9c2.key.game = _0xd6fc65.key.game
        _0x46c9c2.key.lobby = _0x1cadee
        _0x46c9c2.key.team = _0x3f6ec3
        _0x37ab64.push(_0x46c9c2)
      }
    }
    if (_0x55167a !== _0x1cadee.cid) {
      const _0x1dee62 = {
        game: _0xd6fc65.key.game,
        lobby: _0x1cadee,
      }
      const _0x189c87 = {
        action: 'ev-games:leaveLobby',
        title: 'Leave',
        icon: 'sign-out',
        description: 'Leave this lobby',
        key: _0x1dee62,
      }
      _0x37ab64.push(_0x189c87)
    } else {
      if (
        ((_0x5d7c4d =
          (_0x2708fa = _0x2d6117.gameData) === null || _0x2708fa === void 0
            ? void 0
            : _0x2708fa.customData) === null || _0x5d7c4d === void 0
          ? void 0
          : _0x5d7c4d.length) > 0
      ) {
        const _0x4c70b0 = {
          game: _0xd6fc65.key.game,
          lobby: _0x1cadee,
        }
        const _0x367211 = {
          action: 'ev-games:editLobby',
          icon: 'cogs',
          title: 'Change lobby settings',
          description: 'Change whatever you want dawg',
          key: _0x4c70b0,
        }
        _0x37ab64.push(_0x367211)
      }
      const _0x7b0d0a = {
        game: _0xd6fc65.key.game,
        lobby: _0x1cadee,
      }
      const _0x3690d9 = {
        action: 'ev-games:startLobby',
        title: 'Start',
        icon: 'play',
        description: 'Start this lobby',
        key: _0x7b0d0a,
      }
      _0x37ab64.push(_0x3690d9)
      const _0x4705a1 = {
        game: _0xd6fc65.key.game,
        lobby: _0x1cadee,
      }
      const _0x50f91a = {
        action: 'ev-games:cancelLobby',
        title: 'Cancel',
        icon: 'trash',
        description: 'Cancel this lobby',
        key: _0x4705a1,
      }
      _0x37ab64.push(_0x50f91a)
    }
    const _0x3ef287 = {
      game: _0xd6fc65.key.game,
      lobby: _0x1cadee,
    }
    const _0x105f90 = {
      action: 'ev-games:openInventory',
      title: 'Open Token Inventory',
      icon: 'box',
      description: 'Put your tokens in here to play!',
      key: _0x3ef287,
    }
    _0x37ab64.push(_0x105f90)
    const _0x1df3fc = { game: _0xd6fc65.key.game }
    const _0x392894 = {
      action: 'ev-games:viewGame',
      title: 'Back',
      icon: 'backward',
      description: 'Go back to lobby list',
      key: _0x1df3fc,
    }
    _0x37ab64.push(_0x392894)
    exports['ev-ui'].showContextMenu(_0x37ab64)
  })
  RegisterUICallback('ev-games:startLobby', async (_0x28b56f, _0xd9991c) => {
    const _0x4ff2b9 = {
      ok: true,
      message: '',
    }
    const _0x4ee16e = {
      data: {},
      meta: _0x4ff2b9,
    }
    _0xd9991c(_0x4ee16e)
    _0x6f53a1.emitNet(
      'ev-games:startLobby',
      _0x28b56f.key.game,
      _0x28b56f.key.lobby.id
    )
  })
  RegisterUICallback('ev-games:openInventory', async (_0x198609, _0x383e94) => {
    const _0x3f27c7 = {
      ok: true,
      message: '',
    }
    const _0x4be88f = {
      data: {},
      meta: _0x3f27c7,
    }
    _0x383e94(_0x4be88f)
    emit('server-inventory-open', '1', 'arcade-lobby-' + _0x198609.key.lobby.id)
  })
  RegisterUICallback('ev-games:editLobby', async (_0x2c0388, _0x4a8baa) => {
    var _0x5ac14d, _0x47e62a
    await _0x3607ae(100)
    const _0x201468 = {
      ok: true,
      message: '',
    }
    const _0x353f45 = {
      data: {},
      meta: _0x201468,
    }
    _0x4a8baa(_0x353f45)
    const _0x3557b0 = _0x42df3d(_0x2c0388.key.game),
      _0x117c6a = []
    for (const _0xaf210b of _0x3557b0.gameData.customData) {
      let _0x3b87f3 =
        (_0x5ac14d = _0xaf210b.options) !== null && _0x5ac14d !== void 0
          ? _0x5ac14d
          : []
      _0xaf210b.type === 'select' &&
        _0xaf210b.customOptions != null &&
        (_0x3b87f3 =
          exports['ev-games-' + _0x3557b0.resource][
            _0xaf210b.customOptions.func
          ]())
      const _0x14936d = {
        options: _0x3b87f3,
        icon: 'tag',
        label: _0xaf210b.name,
        name: _0xaf210b.id,
        type: _0xaf210b.type,
      }
      _0x14936d['_type'] = _0xaf210b.type
      _0x14936d['_defaultValue'] =
        (_0x47e62a = _0x2c0388.key.lobby.data[_0xaf210b.id]) !== null &&
        _0x47e62a !== void 0
          ? _0x47e62a
          : null
      _0x117c6a.push(_0x14936d)
    }
    const _0x4b1d00 = await exports['ev-ui'].OpenInputMenu(
      _0x117c6a,
      (_0x31dff1) => {
        let _0x4450a6 = true
        for (const _0x3c44b8 of _0x3557b0.gameData.customData) {
          if (!_0x31dff1[_0x3c44b8.id] || _0x31dff1[_0x3c44b8.id].length == 0) {
            _0x4450a6 = false
            break
          }
        }
        return _0x4450a6
      }
    )
    if (!_0x4b1d00) {
      return
    }
    _0x6f53a1.emitNet(
      'ev-games:editLobby',
      _0x2c0388.key.game,
      _0x2c0388.key.lobby.id,
      _0x4b1d00
    )
  })
  RegisterUICallback('ev-games:invitePlayers', async (_0x35c745, _0x2b43b0) => {
    await _0x3607ae(100)
    const _0x370028 = {
      ok: true,
      message: '',
    }
    const _0x2354f5 = {
      data: {},
      meta: _0x370028,
    }
    _0x2b43b0(_0x2354f5)
    const _0xac39f5 = {
      icon: 'user-friends',
      label: 'CID (space seperate CIDs for multiple)',
      name: 'cids',
    }
    const _0x5455d3 = await exports['ev-ui'].OpenInputMenu(
      [_0xac39f5],
      (_0x987217) => {
        return _0x987217.cids && _0x987217.cids.length > 0
      }
    )
    if (!_0x5455d3) {
      return
    }
    const _0x1184ef = _0x5455d3.cids
      .split(' ')
      .map((_0x5b31dc) => parseInt(_0x5b31dc))
    _0x6f53a1.emitNet('ev-games:invitePlayers', _0x35c745.key.game, _0x35c745.key.lobby.id, _0x1184ef)
  })
  _0x6f53a1.onNet('ev-games:invitePlayer', async (_0x5a0cfd, _0x31d894, _0x30bd61) => {
      const _0x2630d4 = await _0x32ac6e(
        'Arcade Invite',
        'Accept invite to game ' + _0x5a0cfd + ': ' + _0x31d894 + '?'
      )
      if (!_0x2630d4) {
        return
      }
      _0x6f53a1.emitNet('ev-games:joinGame', _0x5a0cfd, _0x30bd61)
    }
  )
  RegisterUICallback('ev-games:cancelLobby', async (_0x13ce66, _0x44cea6) => {
    const _0x2718ab = {
      ok: true,
      message: '',
    }
    const _0x5d7dd7 = {
      data: {},
      meta: _0x2718ab,
    }
    _0x44cea6(_0x5d7dd7)
    _0x6f53a1.emitNet('ev-games:cancelLobby', _0x13ce66.key.game, _0x13ce66.key.lobby.id)
  })
  RegisterUICallback('ev-games:viewLobbyPlayers', async(_0x2bb56f, _0x1ea36f) => {
      const _0x306e97 = {
        ok: true,
        message: '',
      }
      const _0x3e24c8 = {
        data: {},
        meta: _0x306e97,
      }
      _0x1ea36f(_0x3e24c8)
      const _0x27e15a = await _0x5dedd3.execute('ev-games:getLobbyMembers', _0x2bb56f.key.game, _0x2bb56f.key.lobby.id),
        _0x1c2060 = exports.isPed.isPed('cid'),
        _0x50d9c3 = [],
        _0x3950d5 = _0x42df3d(_0x2bb56f.key.game)
      if (_0x3950d5.type === 'teams' && _0x5ef2d1.cid === _0x1c2060) {
        const _0x51c222 = {
          game: _0x2bb56f.key.game,
          lobby: _0x2bb56f.key.lobby,
        }
        const _0xd6130 = {
          title: 'Randomize teams',
          icon: 'random',
          description: 'rng baby',
          action: 'ev-games:randomizeTeams',
          key: _0x51c222,
        }
        _0x50d9c3.push(_0xd6130)
      }
      for (const _0x49f9aa of _0x27e15a) {
        const _0x8858cb =
            _0x2bb56f.key.lobby.cid !== _0x1c2060 &&
            _0x49f9aa.cid !== _0x1c2060,
          _0x1c7597 = {
            title: '' + _0x49f9aa.name,
            icon: 'sign-out',
            description: _0x8858cb
              ? 'Kick the player by clicking here'
              : undefined,
            action: _0x8858cb ? 'ev-games:kickPlayer' : undefined,
            key: {},
          }
        _0x1c7597.key.game = _0x2bb56f.key.game
        _0x1c7597.key.lobby = _0x2bb56f.key.lobby
        _0x1c7597.key.player = _0x49f9aa.cid
        _0x50d9c3.push(_0x1c7597)
      }
      const _0xb905a = {
        game: _0x2bb56f.key.game,
        lobby: _0x2bb56f.key.lobby,
      }
      const _0x243404 = {
        title: 'Back',
        icon: 'backward',
        action: 'ev-games:viewLobby',
        key: _0xb905a,
      }
      _0x50d9c3.push(_0x243404)
      exports['ev-ui'].showContextMenu(_0x50d9c3)
    }
  )
  RegisterUICallback('ev-games:randomizeTeams', async(_0x314c2e, _0x49687d) => {
      const _0x3f03e9 = {
        ok: true,
        message: '',
      }
      const _0x39f519 = {
        data: {},
        meta: _0x3f03e9,
      }
      _0x49687d(_0x39f519)
      _0x6f53a1.emitNet(
        'ev-games:randomizeTeams',
        _0x314c2e.key.game,
        _0x314c2e.key.lobby.id
      )
    }
  )
  RegisterUICallback('ev-games:viewLobbyTeam', async(_0x312c46, _0x512833) => {
    const _0x590e79 = {
      ok: true,
      message: '',
    }
    const _0x6bc43b = {
      data: {},
      meta: _0x590e79,
    }
    _0x512833(_0x6bc43b)
    const _0x26c7d3 = await _0x5dedd3.execute(
        'ev-games:getLobbyTeam',
        _0x312c46.key.game,
        _0x312c46.key.lobby.id,
        _0x312c46.key.team
      ),
      _0x1591ab = exports.isPed.isPed('cid'),
      _0x514eed = {
        action: undefined,
        title: 'Team ' + (_0x312c46.key.team + 1),
        icon: 'user-friends',
      }
    const _0x93bfba = [_0x514eed]
    if (!_0x26c7d3.players.find((_0x289e7a) => _0x289e7a.cid === _0x1591ab)) {
      const _0x104130 = {
        game: _0x312c46.key.game,
        lobby: _0x312c46.key.lobby,
        team: _0x312c46.key.team,
      }
      const _0x463345 = {
        action: 'ev-games:joinTeam',
        title: 'Join Team',
        icon: 'user-plus',
        description: 'Join this team',
        key: _0x104130,
      }
      _0x93bfba.push(_0x463345)
    }
    for (const _0x571070 of _0x26c7d3.players) {
      const _0x1fe76c = {
        title: '' + _0x571070.name,
        description:
          _0x312c46.key.lobby.cid == _0x1591ab
            ? 'Move the player to another team by clicking here'
            : undefined,
        action:
          _0x312c46.key.lobby.cid === _0x1591ab
            ? 'ev-games:movePlayer'
            : undefined,
        icon: 'arrow-right',
        key: {},
      }
      _0x1fe76c.key.player = _0x571070.cid
      _0x1fe76c.key.lobby = _0x312c46.key.lobby
      _0x1fe76c.key.game = _0x312c46.key.game
      _0x1fe76c.key.team = _0x312c46.key.team
      _0x93bfba.push(_0x1fe76c)
    }
    const _0xc0609a = {
      game: _0x312c46.key.game,
      lobby: _0x312c46.key.lobby,
    }
    const _0x16b7f3 = {
      title: 'Back',
      action: 'ev-games:viewLobby',
      icon: 'backward',
      key: _0xc0609a,
    }
    _0x93bfba.push(_0x16b7f3)
    exports['ev-ui'].showContextMenu(_0x93bfba)
  })
  RegisterUICallback('ev-games:joinTeam', async (_0x230f83, _0x3c0251) => {
    await _0x3607ae(100)
    const _0x529586 = {
      ok: true,
      message: '',
    }
    const _0x527767 = {
      data: {},
      meta: _0x529586,
    }
    _0x3c0251(_0x527767)
    _0x6f53a1.emitNet(
      'ev-games:movePlayerToTeam',
      _0x230f83.key.game,
      _0x230f83.key.lobby.id,
      _0x230f83.key.team,
      exports.isPed.isPed('cid')
    )
  })
  RegisterUICallback('ev-games:movePlayer', async (_0x5663f6, _0x3d3f77) => {
    await _0x3607ae(100)
    const _0x3eed62 = {
      ok: true,
      message: '',
    }
    const _0x66392b = {
      data: {},
      meta: _0x3eed62,
    }
    _0x3d3f77(_0x66392b)
    const _0x5539bb = _0x5663f6.key.team,
      _0x4e4672 = _0x42df3d(_0x5663f6.key.game),
      _0x441cd1 = []
    for (let _0x2a2b32 = 0; _0x2a2b32 < _0x4e4672.gameData.teams; _0x2a2b32++) {
      const _0x5a804f = {
        title: 'Team ' + (_0x2a2b32 + 1),
        description: 'Move the player to this team',
        icon: 'arrow-left',
        action: 'ev-games:movePlayerToTeam',
        key: {},
        disabled: _0x2a2b32 === _0x5539bb,
      }
      _0x5a804f.key.game = _0x5663f6.key.game
      _0x5a804f.key.lobby = _0x5663f6.key.lobby
      _0x5a804f.key.team = _0x2a2b32
      _0x5a804f.key.player = _0x5663f6.key.player
      _0x441cd1.push(_0x5a804f)
    }
    const _0x9981dc = {
      game: _0x5663f6.key.game,
      lobby: _0x5663f6.key.lobby,
      team: _0x5663f6.key.team,
    }
    const _0x4c28ae = {
      title: 'Back',
      action: 'ev-games:viewLobbyTeam',
      icon: 'backward',
      key: _0x9981dc,
    }
    _0x441cd1.push(_0x4c28ae)
    exports['ev-ui'].showContextMenu(_0x441cd1)
  })
  RegisterUICallback('ev-games:movePlayerToTeam', (_0x49adc6, _0x4750af) => {
    const _0x1c6821 = {
      ok: true,
      message: '',
    }
    const _0x19a525 = {
      data: {},
      meta: _0x1c6821,
    }
    _0x4750af(_0x19a525)
    _0x6f53a1.emitNet(
      'ev-games:movePlayerToTeam',
      _0x49adc6.key.game,
      _0x49adc6.key.lobby.id,
      _0x49adc6.key.team,
      _0x49adc6.key.player
    )
  })
  RegisterUICallback('ev-games:kickPlayer', (_0x2c6b0a, _0x8ef090) => {
    const _0x3c7e6b = {
      ok: true,
      message: '',
    }
    const _0x3fd300 = {
      data: {},
      meta: _0x3c7e6b,
    }
    _0x8ef090(_0x3fd300)
    _0x6f53a1.emitNet(
      'ev-games:kickPlayer',
      _0x2c6b0a.key.game,
      _0x2c6b0a.key.lobby.id,
      _0x2c6b0a.key.player
    )
  })
  _0x6f53a1.onNet('ev-games:joinedLobby', (_0x19c22b) => {
    _0x5ef2d1 = _0x19c22b
    emit('DoLongHudText', 'You have joined a new lobby')
  })
  _0x6f53a1.onNet('ev-games:leftLobby', (_0x4bc568) => {
    _0x5ef2d1 = null
    _0x4bc568 && emit('DoLongHudText', 'You have left the lobby')
  })
  _0x6f53a1.onNet('ev-games:gameStarted', (_0xc59be9) => {
    if (!_0x5ef2d1 || _0x5ef2d1.id !== _0xc59be9) {
      return
    }
    _0x5ef2d1.started = true
  })
  RegisterUICallback('ev-games:leaveLobby', (_0x90f846, _0x20cbc1) => {
    const _0x15e078 = {
      ok: true,
      message: '',
    }
    const _0x96b6ce = {
      data: {},
      meta: _0x15e078,
    }
    _0x20cbc1(_0x96b6ce)
    _0x569f54()
  })
  const _0x569f54 = () => {
    if (!_0x5ef2d1) {
      return
    }
    if (_0x5ef2d1.cid === exports.isPed.isPed('cid')) {
      return emit(
        'DoLongHudText',
        'You are the lobby leader, you cannot leave.',
        2
      )
    }
    _0x6f53a1.emitNet('ev-games:leaveLobby', _0x5ef2d1.game, _0x5ef2d1.id)
  }
  on('ev-games:leaveLobby', _0x569f54)
  on('ev-games:endGame', () => {
    if (!_0x5ef2d1) {
      return
    }
    if (_0x5ef2d1.cid !== exports.isPed.isPed('cid')) {
      return
    }
    const _0x158513 = {
      title: 'End Game',
      description: 'Do you really want to end the game?',
      action: 'ev-games:endGame',
      icon: 'times',
    }
    const _0x3bee3f = {
      title: 'Cancel',
      description: 'aight nvm',
      icon: 'backward',
      action: 'ev-games:cancelEndGame',
    }
    const _0x2faba1 = [_0x158513, _0x3bee3f]
    exports['ev-ui'].showContextMenu(_0x2faba1)
  })
  RegisterUICallback('ev-games:endGame', (_0x1ec2c1, _0x204782) => {
    const _0xcdc527 = {
      ok: true,
      message: '',
    }
    const _0x422f24 = {
      data: {},
      meta: _0xcdc527,
    }
    _0x204782(_0x422f24)
    _0x6f53a1.emitNet('ev-games:endGame', _0x5ef2d1.game, _0x5ef2d1.id)
  })
  on('ev-games:restartGame', () => {
    if (!_0x5ef2d1) {
      return
    }
    if (_0x5ef2d1.cid !== exports.isPed.isPed('cid')) {
      return
    }
    _0x6f53a1.emitNet('ev-games:restartGame', _0x5ef2d1.game, _0x5ef2d1.id)
  })
  const _0x42df3d = (_0xf413ff) => {
    const _0x3dbc2c = _0x94de97('ev-games:games')
    return _0x3dbc2c.games.find((_0x28924e) => _0x28924e.id == _0xf413ff)
  }
  exports('isInLobby', () => {
    return _0x5ef2d1 != null
  })
  exports('isInStartedLobby', () => {
    return _0x5ef2d1 != null && _0x5ef2d1.started
  })
  exports('isLobbyLeader', () => {
    return _0x5ef2d1 != null && _0x5ef2d1.cid == exports.isPed.isPed('cid')
  })
  exports('getLobby', () => {
    return _0x5ef2d1
  })
  exports('getGameOfLobby', () => {
    return _0x5ef2d1 ? _0x5ef2d1.game : null
  })
  exports('canBeRestarted', () => {
    var _0x78e190, _0x21f46b
    if (!_0x5ef2d1) {
      return false
    }
    const _0x38402f = _0x42df3d(_0x5ef2d1.game)
    return (_0x21f46b =
      (_0x78e190 = _0x38402f.gameData) === null || _0x78e190 === void 0
        ? void 0
        : _0x78e190.canBeRestarted) !== null && _0x21f46b !== void 0
      ? _0x21f46b
      : false
  })
  exports('testMaps', () => {
    const _0x1d9865 = {}
    return (_0x1d9865.id = 'random'), (_0x1d9865.name = 'Random'), [_0x1d9865]
  })
  const _0x411dca = () => {
    const _0x2854b2 = {
      x: -606.06,
      y: -1142.91,
      z: 18.34,
    }
    const _0x4b4d1f = {
      heading: 0,
      minZ: 17.94,
      maxZ: 18.54,
    }
    exports['ev-polytarget'].AddBoxZone('ev-games:management',
      _0x2854b2,
      0.5,
      0.5,
      _0x4b4d1f
    )
    const _0x5f4991 = { toggle: false }
    const _0x280d0a = {
      id: 'ev-games:management:disable',
      CPXEvent: 'ev-games:management:toggle',
      icon: 'digital-tachograph',
      label: 'Disable games',
      parameters: _0x5f4991,
    }
    const _0x517340 = { radius: 3.5 }
    exports['ev-interact'].AddPeekEntryByPolyTarget(
      'ev-games:management',
      [_0x280d0a],
      {
        distance: _0x517340,
        isEnabled: () => {
          return _0x2937ce()
        },
      }
    )
    const _0x2b3159 = { toggle: true }
    const _0x365eab = {
      id: 'ev-games:management:enable',
      CPXEvent: 'ev-games:management:toggle',
      icon: 'digital-tachograph',
      label: 'Enable games',
      parameters: _0x2b3159,
    }
    const _0x95b802 = { radius: 3.5 }
    exports['ev-interact'].AddPeekEntryByPolyTarget(
      'ev-games:management',
      [_0x365eab],
      {
        distance: _0x95b802,
        isEnabled: () => {
          return !_0x2937ce()
        },
      }
    )
    const _0x54e31b = {
      id: 'ev-games:management:setPrices',
      CPXEvent: 'ev-games:management:setPrices',
      icon: 'cash-register',
      label: 'Set game prices',
    }
    const _0x111b4c = { radius: 3.5 }
    const _0x4e1cb1 = { distance: _0x111b4c }
    exports['ev-interact'].AddPeekEntryByPolyTarget(
      'ev-games:management',
      [_0x54e31b],
      _0x4e1cb1
    )
    const _0x566dbb = {
      x: -618.05,
      y: -1144.07,
      z: 16.73,
    }
    const _0x3a4417 = {
      heading: 0,
      minZ: 16.53,
      maxZ: 17.13,
    }
    exports['ev-polytarget'].AddBoxZone(
      'ev-games:inventories',
      _0x566dbb,
      1.2,
      1,
      _0x3a4417
    )
    const _0x53b7f2 = {
      id: 'ev-games:inventories:put',
      CPXEvent: 'ev-games:inventories',
      icon: 'box',
      label: 'Put down your shit',
    }
    const _0x44c541 = { radius: 2 }
    const _0x1ab041 = { distance: _0x44c541 }
    exports['ev-interact'].AddPeekEntryByPolyTarget(
      'ev-games:inventories',
      [_0x53b7f2],
      _0x1ab041
    )
  }
  _0x6f53a1.on('ev-games:management:toggle', async (_0x35fe0f) => {
    if (!(await _0x3cb725())) {
      return
    }
    _0x6f53a1.emitNet('ev-games:management:toggle', _0x35fe0f.toggle)
  })
  _0x6f53a1.on('ev-games:inventories', async () => {
    const _0x4674f5 = exports.isPed.isPed('cid')
    emit('server-inventory-open', '1', 'arcade-ply-' + _0x4674f5)
  })
  _0x6f53a1.on('ev-games:management:setPrices', async () => {
    if (!(await _0x3cb725())) {
      return
    }
    const _0x59a923 = []
    for (const [_0x521606, _0x28b004] of Object.entries(_0x447eb0())) {
      const _0x403b9d = {
        action: 'ev-games:management:setPrice',
        icon: 'cash-register',
        title: _0x28b004.name,
        description: 'Current price: $' + _0x28b004.price,
        key: {},
      }
      _0x403b9d.key.game = _0x521606
      _0x403b9d.key.price = _0x28b004.price
      _0x59a923.push(_0x403b9d)
    }
    exports['ev-ui'].showContextMenu(_0x59a923)
  })
  RegisterUICallback(
    'ev-games:management:setPrice',
    async (_0x4704c7, _0x9776c0) => {
      const _0xc7a5d = {
        ok: true,
        message: '',
      }
      const _0x6bc52a = {
        data: {},
        meta: _0xc7a5d,
      }
      _0x9776c0(_0x6bc52a)
      await _0x3607ae(100)
      if (!(await _0x3cb725())) {
        return
      }
      const { game: _0x292fa8, price: _0x4d0a1f } = _0x4704c7.key,
        _0x5336be = {
          name: 'price',
          label: 'Price',
          icon: 'cash-register',
        }
      _0x5336be['_defaultValue'] = _0x4d0a1f
      const _0x1392c8 = await exports['ev-ui'].OpenInputMenu(
        [_0x5336be],
        (_0x250365) => {
          if (!_0x250365.price || _0x250365.price.length === 0) {
            return false
          }
          return (
            (_0x250365.price = Number(
              _0x250365 === null || _0x250365 === void 0
                ? void 0
                : _0x250365.price
            )),
            !isNaN(
              _0x250365 === null || _0x250365 === void 0
                ? void 0
                : _0x250365.price
            )
          )
        }
      )
      if (!_0x1392c8) {
        return
      }
      _0x6f53a1.emitNet(
        'ev-games:management:setPrice',
        _0x292fa8,
        _0x1392c8.price
      )
    }
  )
  const _0x5e5490 = () => {
    const _0x3974f9 = {
      x: -611.17,
      y: -1136.4,
      z: 16.72,
    }
    const _0x4a964a = {
      heading: 0,
      minZ: 16.52,
      maxZ: 18.12,
    }
    exports['ev-polytarget'].AddBoxZone(
      'ev-games:arcadeTokens',
      _0x3974f9,
      0.6,
      1,
      _0x4a964a
    )
    const _0x1467ba = {
      id: 'ev-games:shop:open',
      CPXEvent: 'ev-games:shop:open',
      icon: 'cash-register',
      label: 'Buy tokens',
    }
    const _0x1865ed = { radius: 3.5 }
    exports['ev-interact'].AddPeekEntryByPolyTarget('ev-games:arcadeTokens',
      [_0x1467ba],
      {
        distance: _0x1865ed,
        isEnabled: () => {
          return _0x2937ce()
        },
      }
    )
  }
  _0x6f53a1.on('ev-games:shop:open', async () => {
    const _0xce7f0a = await _0x3cb725(),
      _0x46d645 = [],
      _0x33af13 = {
        title: 'Purchase tokens',
        description:
          'Want to play some games? Here you can purchase tokens to play the games.',
        disabled: !_0x2937ce(),
        children: [],
      },
      _0x504219 = Object.entries(_0x447eb0())
    for (const [_0x5f537c, _0x108117] of _0x504219) {
      const _0x5c5029 = {
        game: _0x5f537c,
        price: 0,
        cash: false,
      }
      const _0x5a204e = {
        action: 'ev-games:shop:purchase',
        icon: 'clipboard-user',
        title: 'Buy refund token',
        description: '$0',
        key: _0x5c5029,
      }
      const _0x2f5932 = _0x5a204e,
        _0x345d09 = {
          action: 'ev-games:shop:purchase',
          icon: 'dollar-sign',
          title: 'Pay with cash',
          description: '$' + _0x108117.price,
          key: {},
        }
      _0x345d09.key.game = _0x5f537c
      _0x345d09.key.price = _0x108117.price
      _0x345d09.key.cash = true
      const _0x6ae1b8 = {
        action: 'ev-games:shop:purchase',
        icon: 'credit-card',
        title: 'Pay with card',
        description: '$' + _0x108117.price,
        key: {},
      }
      _0x6ae1b8.key.game = _0x5f537c
      _0x6ae1b8.key.price = _0x108117.price
      _0x6ae1b8.key.cash = false
      const _0x5f2525 = {
        children: [_0x345d09, _0x6ae1b8, _0xce7f0a ? _0x2f5932 : undefined],
        icon: 'dollar-sign',
        title: _0x108117.name + ' ($' + _0x108117.price + ')',
      }
      _0x33af13.children.push(_0x5f2525)
    }
    _0x46d645.push(_0x33af13)
    if (_0xce7f0a) {
      const _0x4d0138 = {
        title: 'Purchase tokens',
        description: 'Staff purchases',
        children: [],
      }
      const _0x548cd1 = _0x4d0138
      for (const [_0x17b29d, _0x52e552] of _0x504219) {
        const _0x3cd7e4 = {
          game: _0x17b29d,
          price: 0,
          isStaff: true,
          cash: true,
        }
        const _0x50e980 = {
          action: 'ev-games:shop:purchase',
          icon: 'dollar-sign',
          title: _0x52e552.name + ' ($0)',
          key: _0x3cd7e4,
        }
        _0x548cd1.children.push(_0x50e980)
      }
      _0x46d645.push(_0x548cd1)
    }
    exports['ev-ui'].showContextMenu(_0x46d645)
  })
  RegisterUICallback('ev-games:shop:purchase', async (data, cb) => {
    var _0x4fcd0f
    const _0x3bbb23 = {
      ok: true,
      message: '',
    }
    const _0x24b3ed = {
      data: {},
      meta: _0x3bbb23,
    }
    cb(_0x24b3ed)
    await _0x3607ae(100)
    const { game: _0x934b57, price: _0x10d02e } = data.key
    if (
      (_0x4fcd0f = data.key) === null || _0x4fcd0f === void 0
        ? void 0
        : _0x4fcd0f.isStaff
    ) {
      _0x6f53a1.emitNet(
        'ev-games:shop:purchase',
        _0x934b57,
        _0x10d02e,
        1,
        true,
        true
      )
      return
    }
    const _0x55ea56 = {
      name: 'amount',
      label: 'Amount of tokens',
      icon: 'coins',
    }
    _0x55ea56['_defaultValue'] = 1
    const _0x258f1c = await exports['ev-ui'].OpenInputMenu(
      [_0x55ea56],
      (_0x12e215) => {
        if (!_0x12e215.amount || _0x12e215.amount.length === 0) {
          return false
        }
        return (
          (_0x12e215.amount = Number(
            _0x12e215 === null || _0x12e215 === void 0
              ? void 0
              : _0x12e215.amount
          )),
          !isNaN(
            _0x12e215 === null || _0x12e215 === void 0
              ? void 0
              : _0x12e215.amount
          )
        )
      }
    )
    if (!_0x258f1c) {
      return
    }
    if (!_0x258f1c.amount || parseInt(_0x258f1c.amount) === 0) {
      return
    }
    if (parseInt(_0x258f1c.amount) > 12) {
      return emit(
        'DoLongHudText',
        'You can not buy more than 12 tokens at a time',
        2
      )
    }
    _0x6f53a1.emitNet(
      'ev-games:shop:purchase',
      _0x934b57,
      _0x10d02e,
      _0x258f1c.amount,
      data.key.cash,
      false
    )
  })
  const _0x4afacc = () => {
    const _0x42303b = {
      x: -611.35,
      y: -1156.24,
      z: 17.33,
    }
    const _0x168f06 = {
      heading: 0,
      minZ: 16.88,
      maxZ: 18.88,
    }
    exports['ev-polytarget'].AddBoxZone(
      'ev-games:scores',
      _0x42303b,
      0.3,
      3.1,
      _0x168f06
    )
    const _0x3d1ec2 = { weekly: true }
    const _0x37d23e = {
      id: 'ev-games:scores:weekly',
      CPXEvent: 'ev-games:scores',
      icon: 'digital-tachograph',
      label: 'View weekly top scores',
      parameters: _0x3d1ec2,
    }
    const _0x92adb1 = { weekly: false }
    const _0x3ebbfe = {
      id: 'ev-games:scores:overall',
      CPXEvent: 'ev-games:scores',
      icon: 'digital-tachograph',
      label: 'View overall top scores',
      parameters: _0x92adb1,
    }
    const _0x36d188 = {
      id: 'ev-games:spectate',
      CPXEvent: 'ev-games:spectate',
      icon: 'glasses',
      label: 'Spectate live games',
    }
    const _0x5af88a = { radius: 3.5 }
    const _0x2eddc0 = { distance: _0x5af88a }
    exports['ev-interact'].AddPeekEntryByPolyTarget(
      'ev-games:scores',
      [_0x37d23e, _0x3ebbfe, _0x36d188],
      _0x2eddc0
    )
  }
  _0x6f53a1.on('ev-games:scores', async (_0xb47d8e) => {
    const _0x124b4b = _0x94de97('ev-games:games'),
      _0x3aa996 = []
    for (const _0x55b6c2 of _0x124b4b.games) {
      const _0x14fcb9 = {
        action: 'ev-games:viewScores',
        title: _0x55b6c2.name,
        description:
          'View ' +
          (_0xb47d8e.weekly ? 'weekly' : 'overall') +
          ' top scores of ' +
          _0x55b6c2.name,
        key: {},
      }
      _0x14fcb9.key.game = _0x55b6c2.id
      _0x14fcb9.key.weekly = _0xb47d8e.weekly
      _0x3aa996.push(_0x14fcb9)
    }
    exports['ev-ui'].showContextMenu(_0x3aa996)
  })
  RegisterUICallback('ev-games:viewScores', async (_0x27f6aa, _0x2a1d53) => {
    const _0x3ac661 = {
      ok: true,
      message: '',
    }
    const _0x1d3278 = {
      data: {},
      meta: _0x3ac661,
    }
    _0x2a1d53(_0x1d3278)
    await _0x3607ae(100)
    const _0x32d812 = await _0x5dedd3.execute(
        'ev-games:getGameTopScore',
        _0x27f6aa.key.game,
        _0x27f6aa.key.weekly
      ),
      _0x32c5d0 = []
    for (const _0x47d9c9 of _0x32d812) {
      _0x32c5d0.push({
        action: undefined,
        title: _0x47d9c9.winner,
        description:
          _0x47d9c9.points +
          ' ' +
          (Math.abs(_0x47d9c9.points) === 1 ? 'point' : 'points') +
          ' | ' +
          new Date(_0x47d9c9.timestamp * 1000).toUTCString(),
      })
    }
    if (_0x32c5d0.length === 0) {
      const _0x409968 = {
        action: undefined,
        title: 'No scores yet',
      }
      _0x32c5d0.push(_0x409968)
    }
    exports['ev-ui'].showContextMenu(_0x32c5d0)
  })
  let _0x242e57 = null
  const _0x4765e1 = () => {}
  _0x6f53a1.on('ev-games:spectate', () => {
    const _0x495c26 = _0x94de97('ev-games:games'),
      _0x5ccf8c = []
    for (const _0x2ca102 of _0x495c26.games) {
      if (!_0x2ca102.supportsSpectating) {
        continue
      }
      const _0x107815 = {
        action: 'ev-games:spectate',
        title: _0x2ca102.name,
        icon: 'controller',
        description: 'Spectate ' + _0x2ca102.name,
        key: {},
      }
      _0x107815.key.game = _0x2ca102.id
      _0x5ccf8c.push(_0x107815)
    }
    exports['ev-ui'].showContextMenu(_0x5ccf8c)
  })
  RegisterUICallback('ev-games:spectate', async (_0x45b9c2, _0x52fec6) => {
    const _0x3e44f8 = {
      ok: true,
      message: '',
    }
    const _0x5c9fc4 = {
      data: {},
      meta: _0x3e44f8,
    }
    _0x52fec6(_0x5c9fc4)
    const _0x42a4b1 = await _0x5dedd3.execute(
        'ev-games:getLobbies',
        _0x45b9c2.key.game
      ),
      _0x5153e7 = []
    for (const _0x261021 of _0x42a4b1.filter(
      (_0x422007) => _0x422007.started
    )) {
      const _0x2fda9d = {
        action: 'ev-games:startSpectate',
        title: _0x261021.name,
        description: 'Spectate ' + _0x261021.name,
        key: {},
      }
      _0x2fda9d.key.lobby = _0x261021.id
      _0x2fda9d.key.game = _0x45b9c2.key.game
      _0x5153e7.push(_0x2fda9d)
    }
    if (_0x5153e7.length === 0) {
      const _0x565b29 = {
        action: undefined,
        title: 'No lobbies found',
        description: 'Looks like nobody is playing at the moment.',
        icon: 'trash',
      }
      _0x5153e7.push(_0x565b29)
    }
    exports['ev-ui'].showContextMenu(_0x5153e7)
  })
  RegisterUICallback('ev-games:startSpectate', async (_0x6e460, _0x242de4) => {
    const _0x33a372 = {
      ok: true,
      message: '',
    }
    const _0x3c99ce = {
      data: {},
      meta: _0x33a372,
    }
    _0x242de4(_0x3c99ce)
    _0x5dedd3.execute(
      'ev-games:startSpectating',
      _0x6e460.key.game,
      _0x6e460.key.lobby
    )
  })
  _0x6f53a1.onNet(
    'ev-games:setSpectating',
    (_0x590764, _0x2d7d42, _0x293722) => {
      if (!_0x293722) {
        _0x242e57 = null
        return
      }
      const _0x227941 = {
        game: _0x590764,
        lobbyId: _0x2d7d42,
      }
      _0x242e57 = _0x227941
    }
  )
  on('ev-games:stopSpectating', () => {
    if (_0x242e57 == null) {
      return
    }
    _0x6f53a1.emitNet(
      'ev-games:endSpectatingRequested',
      _0x242e57.game,
      _0x242e57.lobbyId
    )
  })
  _0x25d568.g.exports('isSpectating', () => {
    return _0x242e57 != null
  })
  let _0xf81abb = true,
    _0x4b4f94 = {}
  async function _0x402e5d() {
    await _0x5ba681()
    await _0x476bfd()
    _0x411dca()
    await _0x21d7d3()
    _0x4afacc()
    _0x5b0445()
    _0x5e5490()
    _0x4765e1()
  }
  const _0x3cb725 = async () => {
    const _0xfd1e6 = await _0x25d568.g.exports['ev-business'].IsEmployedAt(
      'demons_den'
    )
    return _0xfd1e6
  }
  onNet('ev-games:toggleGameStatus', (_0x52e233) => {
    _0xf81abb = _0x52e233
  })
  const _0x2937ce = () => _0xf81abb,
    _0x447eb0 = () => _0x4b4f94,
    _0x5b0445 = () => {
      const _0x56833f = {
        x: -611.92,
        y: -1145.43,
        z: 16.73,
      }
      const _0x469d27 = {
        heading: 90,
        minZ: 15.58,
        maxZ: 20.78,
      }
      exports['ev-polyzone'].AddBoxZone(
        'arcade',
        _0x56833f,
        22,
        22.8,
        _0x469d27
      )
    }
  on('ev-polyzone:enter', async (_0x4d2b8c) => {
    if (_0x4d2b8c !== 'arcade') {
      return
    }
    const _0x545737 = await _0x5dedd3.execute(
      'ev-games:management:getGameStatus'
    )
    _0xf81abb = _0x545737
    _0x4b4f94 = await _0x5dedd3.execute('ev-games:management:getTokenPrices')
  })
  onNet('ev-games:updatePrices', (_0x369962) => {
    _0x4b4f94 = _0x369962
  })
  ;(async () => {
    await _0x402e5d()
  })()
})()
