;(() => {
  'use strict'
  var _0x199981 = {
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x545dad) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
  }
  ;(() => {})()
  var _0x33c3f0 = {}
  let _0x391953 = exports['ev-config'].GetModuleConfig('main')
  const _0x2d965f = new Map(),
    _0x2ce196 = GetCurrentResourceName()
  async function _0x5cd3d5() {}
  on('ev-config:configLoaded', (_0x31faf0, _0x24ef3f) => {
    if (_0x31faf0 === 'main') {
      _0x391953 = _0x24ef3f
    } else {
      if (_0x2d965f.has(_0x31faf0)) {
        _0x2d965f.set(_0x31faf0, _0x24ef3f)
      }
    }
  })
  function _0x1f4e82(_0x4e3501) {
    return _0x391953[_0x4e3501]
  }
  function _0x3acc3e(_0x4beb0e, _0x2aeeef) {
    if (!_0x2d965f.has(_0x4beb0e)) {
      const _0x345444 = exports['ev-config'].GetModuleConfig(_0x4beb0e)
      if (_0x345444 === undefined) {
        return
      }
      _0x2d965f.set(_0x4beb0e, _0x345444)
    }
    const _0xd6d634 = _0x2d965f.get(_0x4beb0e)
    return _0x2aeeef
      ? _0xd6d634 === null || _0xd6d634 === void 0
        ? void 0
        : _0xd6d634[_0x2aeeef]
      : _0xd6d634
  }
  function _0x40216d(_0x4b4e31) {
    return _0x3acc3e(_0x2ce196, _0x4b4e31)
  }
  async function _0x232ae5() {}
  const _0x468a1f = globalThis.CPX,
    _0x1eae08 = _0x468a1f.Hud,
    _0x496d98 = _0x468a1f.Utils,
    _0x2076b4 = _0x468a1f.Zones,
    _0x41fa55 = _0x468a1f.Events,
    _0x5d60b4 = _0x468a1f.Streaming,
    _0xb5d805 = _0x468a1f.Procedures,
    _0x4b5aac = _0x468a1f.Interface,
    _0x590dd7 = null && _0x468a1f
  async function _0x1685d1(_0x26e1d0) {
    return new Promise((_0x301d80) => setTimeout(() => _0x301d80(), _0x26e1d0))
  }
  const _0x1b04be = (_0x20ab2b, _0x45e418, _0x8efc8f) =>
      Math.min(Math.max(_0x20ab2b, _0x45e418), _0x8efc8f),
    _0x1ec23d = (_0x36aef0, _0x2a2a9a, _0x3d2000, _0x9f58be, _0x2e7e5a) => {
      var _0x246e36, _0x1825fb, _0x3376a7
      DrawMarker(
        _0x36aef0,
        _0x2a2a9a[0],
        _0x2a2a9a[1],
        _0x2a2a9a[2],
        0,
        0,
        0,
        (_0x246e36 =
          _0x2e7e5a === null || _0x2e7e5a === void 0
            ? void 0
            : _0x2e7e5a[0]) !== null && _0x246e36 !== void 0
          ? _0x246e36
          : 0,
        (_0x1825fb =
          _0x2e7e5a === null || _0x2e7e5a === void 0
            ? void 0
            : _0x2e7e5a[1]) !== null && _0x1825fb !== void 0
          ? _0x1825fb
          : 0,
        (_0x3376a7 =
          _0x2e7e5a === null || _0x2e7e5a === void 0
            ? void 0
            : _0x2e7e5a[2]) !== null && _0x3376a7 !== void 0
          ? _0x3376a7
          : 0,
        _0x3d2000,
        _0x3d2000,
        _0x3d2000,
        _0x9f58be[0],
        _0x9f58be[1],
        _0x9f58be[2],
        _0x9f58be[3],
        false,
        false,
        2,
        false,
        null,
        null,
        false
      )
    }
  const _0x321d3f = () => {}
  let _0x353862 = null,
    _0x899932 = null,
    _0x5ae01b = null,
    _0x30e21c = null,
    _0x364fac = null,
    _0x2423e7 = true
  _0x41fa55.onNet('ev-games:vtag:started', (_0x5701e7) => {
    var _0x5bcdf9, _0x3a7954, _0x4d8968
    DoScreenFadeIn(100)
    _0x353862 = _0x5701e7
    _0x8100c2()
    _0x5e9541()
    _0x80eb08(_0x353862)
    exports['ev-polyzone'].AddCircleZone(
      'vehicle_tag-' + _0x5701e7.id,
      _0x5701e7.map.polyzone.center,
      _0x5701e7.map.polyzone.radius,
      {
        useZ:
          (_0x5bcdf9 = _0x5701e7.map.polyzone.useZ) !== null &&
          _0x5bcdf9 !== void 0
            ? _0x5bcdf9
            : false,
        minZ:
          (_0x3a7954 = _0x5701e7.map.polyzone.minZ) !== null &&
          _0x3a7954 !== void 0
            ? _0x3a7954
            : null,
        maxZ:
          (_0x4d8968 = _0x5701e7.map.polyzone.maxZ) !== null &&
          _0x4d8968 !== void 0
            ? _0x4d8968
            : null,
        data: { lobbyId: _0x5701e7.id },
      }
    )
    const _0x516164 = GetEntityCoords(PlayerPedId(), false)
    _0x364fac = AddBlipForCoord(_0x516164[0], _0x516164[1], _0x516164[2])
    SetBlipSprite(_0x364fac, 439)
    SetBlipColour(_0x364fac, 1)
    SetBlipScale(_0x364fac, 0.8)
    SetBlipAsShortRange(_0x364fac, true)
    BeginTextCommandSetBlipName('STRING')
    AddTextComponentString('Current Tag Holder')
    EndTextCommandSetBlipName(_0x364fac)
    _0x2423e7 = true
    exports['ev-galleria'].toggleEffects(false)
    exports.ragdoll.DisableReduceFactor(true)
    exports.ragdoll.SetMaxHealth()
    exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
  })
  on('ev-polyzone:exit', (_0x50b733, _0x5f4828) => {
    if (!_0x50b733.startsWith('vehicle_tag-')) {
      return
    }
    if (!_0x353862) {
      return
    }
    if (_0x5f4828.lobbyId !== _0x353862.id) {
      return
    }
    emit('DoLongHudText', 'Get back into the zone!', 2)
    _0x30e21c === _0x353862.currentHolder.cid &&
      _0x41fa55.emitNet('ev-games:vtag:insideZone', _0x353862.id, false)
    _0x2423e7 = false
  })
  on('ev-polyzone:enter', (_0x1c3da2, _0x559be4) => {
    if (!_0x1c3da2.startsWith('vehicle_tag-')) {
      return
    }
    if (!_0x353862) {
      return
    }
    if (_0x559be4.lobbyId !== _0x353862.id) {
      return
    }
    _0x30e21c === _0x353862.currentHolder.cid &&
      _0x41fa55.emitNet('ev-games:vtag:insideZone', _0x353862.id, true)
    _0x2423e7 = true
  })
  const _0x80eb08 = (_0x3e1ec3) => {
      const _0x217079 = [
        'Time left: ' +
          Math.floor(_0x3e1ec3.time / 60) +
          ':' +
          (_0x3e1ec3.time % 60).toString().padStart(2, '0'),
        'First to ' + _0x3e1ec3.points + ' points wins!',
      ]
      for (
        let _0x1d5143 = 0;
        _0x1d5143 < _0x3e1ec3.teamPoints.length;
        _0x1d5143++
      ) {
        _0x217079.push(
          'Team ' +
            (_0x1d5143 + 1) +
            ': ' +
            _0x3e1ec3.teamPoints[_0x1d5143] +
            ' points'
        )
      }
      _0x30e21c = exports.isPed.isPed('cid')
      if (_0x3e1ec3.currentHolder.cid === _0x30e21c) {
        _0x217079.push('You are the current tag holder!')
      } else {
        const _0x4ef551 = _0x3e1ec3.teams.findIndex((_0x2b36a6) =>
            _0x2b36a6.players.find(
              (_0x3f7810) => _0x3f7810.cid === _0x3e1ec3.currentHolder.cid
            )
          ),
          _0x49ba9d = _0x3e1ec3.teams.findIndex((_0x560f53) =>
            _0x560f53.players.find((_0x4ac4d4) => _0x4ac4d4.cid === _0x30e21c)
          )
        if (_0x4ef551 === _0x49ba9d) {
          _0x217079.push('Your team is currently holding the tag!')
        }
      }
      const _0x4f6f4d = {
        values: _0x217079,
        show: true,
        title: 'Vehicle Tag',
        i18nTitle: 'Vehicle Tag',
        i18nValues: [
          'Time left',
          'First to',
          'points wins!',
          'You are the current tag holder',
          'Your team is currently holding the tag',
          'Team',
          'points',
        ],
      }
      exports['ev-ui'].sendAppEvent('status-hud', _0x4f6f4d)
    },
    _0x8100c2 = () => {
      _0x899932 = setInterval(() => {
        if (!_0x353862) {
          clearInterval(_0x899932)
          return
        }
        _0x353862.time > 0 && _0x353862.time--
        _0x80eb08(_0x353862)
        const _0x350d45 = _0x353862.players.find(
          (_0xc1ab6a) => _0xc1ab6a.cid === _0x30e21c
        )
        if (!_0x350d45) {
          return
        }
        const _0x4111a0 = NetworkGetEntityFromNetworkId(_0x350d45.vehicleNetId)
        if (!_0x4111a0) {
          return
        }
        IsEntityInWater(_0x4111a0) && emit('ev-games:vtag:resetArea')
      }, 1000)
    },
    _0x5e9541 = () => {
      _0x5ae01b = setTick(() => {
        if (!_0x353862) {
          clearTick(_0x5ae01b)
          return
        }
        DisableControlAction(0, 75, true)
        const _0x4ab2ea = [
            _0x353862.map.polyzone.center.x,
            _0x353862.map.polyzone.center.y,
            _0x353862.map.polyzone.center.z,
          ],
          _0x1645dc = _0x496d98.getDistance(
            GetEntityCoords(PlayerPedId(), false),
            _0x4ab2ea
          ),
          _0x5c9ccd = _0x1645dc - (_0x353862.map.polyzone.radius - 20),
          _0x4b77f6 = Math.floor(_0x1b04be((_0x5c9ccd / 20) * 200, 0, 200))
        _0x1ec23d(28, _0x4ab2ea, _0x353862.map.polyzone.radius, [
          231,
          65,
          60,
          _0x4b77f6,
        ])
        const _0x4f83c1 = NetworkGetEntityFromNetworkId(
          _0x353862.currentHolder.vehicleNetId
        )
        if (_0x4f83c1) {
          const _0x358be0 = GetEntityCoords(_0x4f83c1, false)
          SetBlipCoords(_0x364fac, _0x358be0[0], _0x358be0[1], _0x358be0[2])
          if (_0x353862.currentHolder.cid !== _0x30e21c) {
            const _0x983d07 = GetEntityCoords(PlayerPedId(), false),
              _0x27ad05 = _0x496d98.getDistance(_0x358be0, _0x983d07)
            _0x27ad05 < 6 && IsControlJustReleased(0, 86) && _0x52be65()
          }
          const _0xad6943 = _0x36e8da(_0x353862.currentHolder.cid)
            ? [0, 255, 0]
            : [255, 0, 0]
          _0x358be0[2] += 3
          _0x1ec23d(2, _0x358be0, 1.25, [..._0xad6943, 200], [180, 0, 0])
        }
      })
    },
    _0x52be65 = () => {
      _0x41fa55.emitNet('ev-games:vtag:stolen', _0x353862.id, _0x30e21c)
    }
  _0x41fa55.onNet('ev-games:vtag:stolen', (_0x22c0b8) => {
    if (!_0x353862) {
      return
    }
    const _0x3e58bd = { i18n: ['has stolen the tag'] }
    emit(
      'DoLongHudText',
      _0x22c0b8.name + ' has stolen the tag!',
      1,
      12000,
      _0x3e58bd
    )
    _0x353862.currentHolder = _0x22c0b8
    const _0x2e31c1 = NetworkGetEntityFromNetworkId(_0x22c0b8.vehicleNetId)
    _0x2e31c1 &&
      (SetEntityAlpha(_0x2e31c1, 200, false),
      setTimeout(() => {
        SetEntityAlpha(_0x2e31c1, 255, false)
      }, 5000))
  })
  _0x41fa55.onNet('ev-games:vtag:points', (_0x19633c) => {
    if (!_0x353862) {
      return
    }
    _0x353862.teamPoints = _0x19633c
  })
  _0x41fa55.onNet('ev-games:vtag:finished', (_0x5416c7) => {
    if (!_0x353862) {
      return
    }
    _0x2d5824()
    if (_0x5416c7 != null) {
      emit('DoLongHudText', 'Team ' + _0x5416c7 + ' has won the game!')
    } else {
      emit('DoLongHudText', 'The game has ended.')
    }
  })
  _0x41fa55.onNet('ev-games:vtag:restarted', () => {
    if (!_0x353862) {
      return
    }
    const _0x224594 = _0x353862.players.find(
      (_0x49c2d3) => _0x49c2d3.cid === _0x30e21c
    )
    exports['ev-sync'].SyncedExecution(
      'DeleteVehicle',
      NetworkGetEntityFromNetworkId(_0x224594.vehicleNetId)
    )
    _0x2d5824()
  })
  _0x41fa55.onNet('ev-games:vtag:left', () => {
    if (!_0x353862) {
      return
    }
    _0x2d5824()
  })
  _0x41fa55.onNet('ev-games:vtag:hide', () => {
    DoScreenFadeOut(100)
  })
  on('ev-games:vtag:flipVehicle', async () => {
    if (!_0x353862) {
      return
    }
    const _0x16a16f = _0x353862.players.find(
      (_0x412f98) => _0x412f98.cid === _0x30e21c
    )
    if (!_0x16a16f) {
      return
    }
    const _0x43f059 = NetworkGetEntityFromNetworkId(_0x16a16f.vehicleNetId)
    if (!_0x43f059) {
      return
    }
    const [_0x181edd] = GetEntityRotation(PlayerPedId(), 1),
      [_0x4043c1, _0x59a445, _0x1de340] = GetEntityRotation(_0x43f059, 1)
    SetEntityRotation(_0x43f059, _0x181edd, _0x59a445, _0x1de340, 1, true)
    await _0x1685d1(10)
    SetVehicleOnGroundProperly(_0x43f059)
  })
  on('ev-games:vtag:resetArea', () => {
    if (!_0x353862) {
      return
    }
    _0x41fa55.emitNet('ev-games:vtag:resetPlayer', _0x353862.id)
  })
  on('ev-games:vtag:respawn', () => {
    if (!_0x353862) {
      return
    }
    emit('reviveFunction')
  })
  on('baseevents:leftVehicle', () => {
    if (!_0x353862) {
      return
    }
    emit('DoLongHudText', 'Get the fuck back in your car!', 2)
  })
  on('pd:deathcheck', () => {
    if (!_0x353862) {
      return
    }
    emit('reviveFunction')
  })
  const _0x2d5824 = () => {
      clearInterval(_0x899932)
      clearTick(_0x5ae01b)
      _0x353862 = null
      const _0x4ad0a1 = { show: false }
      exports['ev-ui'].sendAppEvent('status-hud', _0x4ad0a1)
      RemoveBlip(_0x364fac)
      exports['ev-galleria'].toggleEffects(true)
      exports.ragdoll.DisableReduceFactor(false)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
    },
    _0x36e8da = (_0x43a200) => {
      if (!_0x353862) {
        return false
      }
      const _0x134c17 = _0x353862.teams.findIndex((_0x3173da) =>
          _0x3173da.players.find((_0x27d91f) => _0x27d91f.cid === _0x43a200)
        ),
        _0x1aab69 = _0x353862.teams.findIndex((_0x256393) =>
          _0x256393.players.find((_0x2322a4) => _0x2322a4.cid === _0x30e21c)
        )
      return _0x134c17 === _0x1aab69
    }
  exports('isInZone', () => {
    return _0x353862 && _0x2423e7
  })
  let _0x387b31 = null,
    _0x20c0e1 = null,
    _0x55aa67 = null,
    _0x5d6865 = null,
    _0x495601 = null,
    _0x4035e0 = null
  const _0x325fae = {
    radius: -3.5,
    polarAngleDeg: 0,
    azimuthAngleDeg: 90,
  }
  const _0x3ac4bb = _0x325fae,
    _0xa63b6b = () => {}
  _0x41fa55.onNet('ev-games:vtag:startSpectating', async (_0x548836) => {
    _0x387b31 = _0x548836
    await _0x1685d1(1000)
    const _0x45eca1 = await _0x568fae(),
      _0x146b38 = GetEntityCoords(_0x45eca1, false)
    _0x55aa67 = _0x45eca1
    _0x20c0e1 = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
    SetCamActive(_0x20c0e1, true)
    SetCamCoord(_0x20c0e1, _0x146b38[0], _0x146b38[1], _0x146b38[2])
    SetCamRot(_0x20c0e1, 0, 0, 0, 2)
    RenderScriptCams(true, false, 0, true, false)
    _0x74d6ee()
    _0x495601 = AddBlipForCoord(_0x146b38[0], _0x146b38[1], _0x146b38[2])
    SetBlipSprite(_0x495601, 439)
    SetBlipColour(_0x495601, 1)
    SetBlipScale(_0x495601, 0.8)
    SetBlipAsShortRange(_0x495601, true)
    BeginTextCommandSetBlipName('STRING')
    AddTextComponentString('Current Tag Holder')
    EndTextCommandSetBlipName(_0x495601)
    _0x80eb08(_0x387b31)
    _0x196121()
  })
  _0x41fa55.onNet('ev-games:vtag:endSpectating', async (_0xf93dd) => {
    if (!_0x387b31 || _0x387b31.id !== _0xf93dd) {
      return
    }
    _0x57c228()
    _0x41fa55.emitNet('ev-games:vtag:spectatingEnded', _0xf93dd)
  })
  const _0x57c228 = () => {
    clearTick(_0x5d6865)
    clearInterval(_0x4035e0)
    SetCamActive(_0x20c0e1, false)
    RenderScriptCams(false, false, 0, true, false)
    SetEntityInvincible(PlayerPedId(), false)
    SetEntityVisible(PlayerPedId(), true, false)
    SetEntityCollision(PlayerPedId(), true, true)
    DestroyCam(_0x20c0e1, false)
    _0x20c0e1 = null
    _0x5d6865 = null
    _0x4035e0 = null
    const _0x3dd9dc = { show: false }
    exports['ev-ui'].sendAppEvent('status-hud', _0x3dd9dc)
    RemoveBlip(_0x495601)
  }
  _0x41fa55.onNet('ev-games:vtag:spectators:points', (_0x5e38c5) => {
    if (!_0x387b31) {
      return
    }
    _0x387b31.teamPoints = _0x5e38c5
  })
  _0x41fa55.onNet('ev-games:vtag:spectator:stolen', (_0x587191) => {
    if (!_0x387b31) {
      return
    }
    const _0x525cce = { i18n: ['has stolen the tag'] }
    emit(
      'DoLongHudText',
      _0x587191.name + ' has stolen the tag!',
      1,
      12000,
      _0x525cce
    )
    _0x387b31.currentHolder = _0x587191
    const _0x25900c = NetworkGetEntityFromNetworkId(_0x587191.vehicleNetId)
    _0x25900c &&
      (SetEntityAlpha(_0x25900c, 200, false),
      setTimeout(() => {
        SetEntityAlpha(_0x25900c, 255, false)
      }, 5000))
  })
  const _0x196121 = () => {
      _0x4035e0 = setInterval(() => {
        if (!_0x387b31) {
          clearInterval(_0x4035e0)
          return
        }
        _0x387b31.time > 0 && _0x387b31.time--
        _0x80eb08(_0x387b31)
      }, 1000)
    },
    _0x74d6ee = () => {
      if (_0x5d6865) {
        return
      }
      _0x3ac4bb.radius = -3.5
      _0x3ac4bb.polarAngleDeg = 0
      _0x3ac4bb.azimuthAngleDeg = 90
      _0x5d6865 = setTick(async () => {
        if (!_0x20c0e1) {
          return
        }
        ;(!_0x55aa67 || !DoesEntityExist(_0x55aa67)) &&
          (_0x55aa67 = await _0x568fae())
        const _0x5bdfed = GetEntityCoords(_0x55aa67, false)
        SetCamCoord(_0x20c0e1, _0x5bdfed[0], _0x5bdfed[1], _0x5bdfed[2])
        SetEntityInvincible(PlayerPedId(), true)
        SetEntityVisible(PlayerPedId(), false, false)
        SetEntityCollision(PlayerPedId(), false, false)
        for (const _0x318165 of GetActivePlayers()) {
          if (_0x318165 === PlayerId()) {
            continue
          }
          SetEntityNoCollisionEntity(
            PlayerPedId(),
            GetPlayerPed(_0x318165),
            true
          )
        }
        _0x4a8754()
        const _0x55b18e = GetDisabledControlNormal(0, 1),
          _0x266632 = GetDisabledControlNormal(0, 2)
        _0x3ac4bb.polarAngleDeg = _0x3ac4bb.polarAngleDeg + _0x55b18e * 10
        if (_0x3ac4bb.polarAngleDeg >= 360) {
          _0x3ac4bb.polarAngleDeg = 0
        }
        _0x3ac4bb.azimuthAngleDeg = _0x3ac4bb.azimuthAngleDeg + _0x266632 * 10
        if (_0x3ac4bb.azimuthAngleDeg >= 360) {
          _0x3ac4bb.azimuthAngleDeg = 0
        }
        const _0x4a49ef = _0x3d0be7(
            _0x5bdfed,
            _0x3ac4bb.radius,
            _0x3ac4bb.polarAngleDeg,
            _0x3ac4bb.azimuthAngleDeg
          ),
          _0x4f3fad = GetCamCoord(_0x20c0e1)
        _0x4a49ef[0] = _0x2ccc4a(_0x4f3fad[0], _0x4a49ef[0], 0.09)
        _0x4a49ef[1] = _0x2ccc4a(_0x4f3fad[1], _0x4a49ef[1], 0.09)
        _0x4a49ef[2] = _0x2ccc4a(_0x4f3fad[2], _0x4a49ef[2], 0.09)
        SetCamCoord(_0x20c0e1, _0x4a49ef[0], _0x4a49ef[1], _0x4a49ef[2])
        PointCamAtEntity(_0x20c0e1, _0x55aa67, 0, 0, 0, true)
        SetEntityCoords(
          PlayerPedId(),
          _0x5bdfed[0],
          _0x5bdfed[1],
          _0x5bdfed[2] - 5,
          true,
          false,
          false,
          false
        )
        const _0x2428f2 = NetworkGetEntityFromNetworkId(
          _0x387b31.currentHolder.vehicleNetId
        )
        if (_0x2428f2) {
          const _0x147692 = GetEntityCoords(_0x2428f2, false)
          SetBlipCoords(_0x495601, _0x147692[0], _0x147692[1], _0x147692[2])
          _0x147692[2] += 3
          _0x1ec23d(2, _0x147692, 1.25, [0, 255, 0, 200], [180, 0, 0])
        }
      })
    },
    _0x4a8754 = () => {
      DisableControlAction(1, 14, true)
      DisableControlAction(1, 15, true)
      DisableControlAction(1, 16, true)
      DisableControlAction(1, 17, true)
      const _0x18afa9 = _0x387b31.players.findIndex(
        (_0x6c4b70) =>
          GetPlayerPed(GetPlayerFromServerId(_0x6c4b70.source)) === _0x55aa67
      )
      if (IsControlJustPressed(1, 189)) {
        _0x7f0bdf(_0x18afa9, -1)
      }
      IsControlJustPressed(1, 190) && _0x7f0bdf(_0x18afa9, 1)
      if (IsControlPressed(2, 241)) {
        _0x3ac4bb.radius = _0x3ac4bb.radius + 2
      }
      if (IsControlPressed(2, 242)) {
        _0x3ac4bb.radius = _0x3ac4bb.radius - 2
      }
      if (_0x3ac4bb.radius > -1) {
        _0x3ac4bb.radius = -1
      }
    },
    _0x7f0bdf = (_0x966ee3, _0x3d3ac3) => {
      let _0x498459 = _0x966ee3 + _0x3d3ac3
      const _0x47c333 = _0x3485d7()
      _0x498459 >= _0x47c333.length && (_0x498459 = 0)
      if (_0x498459 < 0) {
        _0x498459 = _0x47c333.length - 1
      }
      _0x55aa67 = GetPlayerPed(
        GetPlayerFromServerId(_0x47c333[_0x498459].source)
      )
    },
    _0x568fae = async () => {
      const _0x3c6212 = _0x3485d7()
      let _0x1946da = _0x3c6212[Math.floor(Math.random() * _0x3c6212.length)],
        _0x395974 = GetPlayerPed(GetPlayerFromServerId(_0x1946da.source))
      while (!_0x395974) {
        _0x1946da = _0x3c6212[Math.floor(Math.random() * _0x3c6212.length)]
        _0x395974 = GetPlayerPed(GetPlayerFromServerId(_0x1946da.source))
        await _0x1685d1(10)
      }
      return _0x395974
    },
    _0x3485d7 = () => {
      return _0x387b31.players.filter((_0x310af2) => _0x310af2.is_playing)
    },
    _0x2ccc4a = (_0x5cfe08, _0x45a5a8, _0x9d65c) =>
      (1 - _0x9d65c) * _0x5cfe08 + _0x9d65c * _0x45a5a8,
    _0x3d0be7 = (_0x3b2871, _0x14eed5, _0x289374, _0x3547cf) => {
      const _0x52aa87 = (_0x289374 * Math.PI) / 180,
        _0x1e5f29 = (_0x3547cf * Math.PI) / 180
      return [
        _0x3b2871[0] + _0x14eed5 * (Math.sin(_0x1e5f29) * Math.cos(_0x52aa87)),
        _0x3b2871[1] - _0x14eed5 * (Math.sin(_0x1e5f29) * Math.sin(_0x52aa87)),
        _0x3b2871[2] - _0x14eed5 * Math.cos(_0x1e5f29),
      ]
    }
  exports('isSpectating', () => {
    return _0x387b31 != null
  })
  async function _0x474110() {
    await _0x5cd3d5()
    await _0x232ae5()
    _0x321d3f()
    _0xa63b6b()
  }
  _0x199981.g.exports('getMaps', () => {
    return _0x3acc3e('ev-games:vehicle-tag').maps.map((_0x3e22c4) => {
      const _0x505873 = {}
      return (
        (_0x505873.id = _0x3e22c4.id),
        (_0x505873.name = _0x3e22c4.name),
        _0x505873
      )
    })
  })
  _0x199981.g.exports('getCarGroups', () => {
    return _0x3acc3e('ev-games:vehicle-tag').carGroups.map((_0x2b4fbf) => {
      const _0x1c8cf0 = {}
      return (
        (_0x1c8cf0.id = _0x2b4fbf.id),
        (_0x1c8cf0.name = _0x2b4fbf.name),
        _0x1c8cf0
      )
    })
  })
  ;(async () => {
    await _0x474110()
  })()
})()
