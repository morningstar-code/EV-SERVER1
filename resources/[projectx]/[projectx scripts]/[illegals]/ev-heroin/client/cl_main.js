;(() => {
  'use strict'
  var _0x381737 = {
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x414698) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
  }
  ;(() => {})()
  var _0x56ba11 = {}
  const _0x335a08 = globalThis.CPX,
    _0x518f66 = _0x335a08.Hud,
    _0x32d639 = _0x335a08.Utils,
    _0x56e759 = _0x335a08.Zones,
    _0x35a5e3 = _0x335a08.Events,
    _0x35bc14 = _0x335a08.Streaming,
    _0x1a19ef = _0x335a08.Procedures,
    _0x2721e5 = _0x335a08.Interface,
    _0x28c619 = null && _0x335a08
  let _0x30aa7a = exports['ev-config'].GetModuleConfig('main')
  const _0xce12b9 = new Map(),
    _0x26bba5 = GetCurrentResourceName()
  async function _0x2ba40e() {}
  on('ev-config:configLoaded', (_0x54a416, _0x4bf746) => {
    if (_0x54a416 === 'main') {
      _0x30aa7a = _0x4bf746
    } else {
      _0xce12b9.has(_0x54a416) && _0xce12b9.set(_0x54a416, _0x4bf746)
    }
  })
  function _0x29cfef(_0x17f8af) {
    return _0x30aa7a[_0x17f8af]
  }
  function _0x57c207(_0x3cabaa, _0x4eee64) {
    if (!_0xce12b9.has(_0x3cabaa)) {
      const _0x17b68d = exports['ev-config'].GetModuleConfig(_0x3cabaa)
      if (_0x17b68d === undefined) {
        return
      }
      _0xce12b9.set(_0x3cabaa, _0x17b68d)
    }
    const _0x37f63b = _0xce12b9.get(_0x3cabaa)
    return _0x4eee64
      ? _0x37f63b === null || _0x37f63b === void 0
        ? void 0
        : _0x37f63b[_0x4eee64]
      : _0x37f63b
  }
  function _0x487aa7(_0x240e5a) {
    return _0x57c207(_0x26bba5, _0x240e5a)
  }
  const _0x525873 = globalThis.CPX,
    _0x104853 = _0x525873.Utils,
    _0x7b9d03 = _0x525873.Base,
    _0x3bd875 = _0x525873.Events,
    _0x5d06ef = _0x525873.Procedures,
    _0xe23af5 = _0x525873.DB,
    _0x38be83 = _0x525873.API,
    _0x2d42f7 = _0x525873.Tebex,
    _0x55bad4 = _0x525873.Discord,
    _0x2f8c55 = null && _0x525873
  const _0x4ce740 = {}
  _0x4ce740['0'] = 'Metallic Black'
  _0x4ce740['1'] = 'Metallic Graphite Black'
  _0x4ce740['2'] = 'Metallic Black Steel'
  _0x4ce740['3'] = 'Metallic Dark Silver'
  _0x4ce740['4'] = 'Metallic Silver'
  _0x4ce740['5'] = 'Metallic Blue Silver'
  _0x4ce740['6'] = 'Metallic Steel Gray'
  _0x4ce740['7'] = 'Metallic Shadow Silver'
  _0x4ce740['8'] = 'Metallic Stone Silver'
  _0x4ce740['9'] = 'Metallic Midnight Silver'
  _0x4ce740['10'] = 'Metallic Gun Metal'
  _0x4ce740['11'] = 'Metallic Anthracite Grey'
  _0x4ce740['12'] = 'Matte Black'
  _0x4ce740['13'] = 'Matte Gray'
  _0x4ce740['14'] = 'Matte Light Grey'
  _0x4ce740['15'] = 'Util Black'
  _0x4ce740['16'] = 'Util Black Poly'
  _0x4ce740['17'] = 'Util Dark silver'
  _0x4ce740['18'] = 'Util Silver'
  _0x4ce740['19'] = 'Util Gun Metal'
  _0x4ce740['20'] = 'Util Shadow Silver'
  _0x4ce740['21'] = 'Worn Black'
  _0x4ce740['22'] = 'Worn Graphite'
  _0x4ce740['23'] = 'Worn Silver Grey'
  _0x4ce740['24'] = 'Worn Silver'
  _0x4ce740['25'] = 'Worn Blue Silver'
  _0x4ce740['26'] = 'Worn Shadow Silver'
  _0x4ce740['27'] = 'Metallic Red'
  _0x4ce740['28'] = 'Metallic Torino Red'
  _0x4ce740['29'] = 'Metallic Formula Red'
  _0x4ce740['30'] = 'Metallic Blaze Red'
  _0x4ce740['31'] = 'Metallic Graceful Red'
  _0x4ce740['32'] = 'Metallic Garnet Red'
  _0x4ce740['33'] = 'Metallic Desert Red'
  _0x4ce740['34'] = 'Metallic Cabernet Red'
  _0x4ce740['35'] = 'Metallic Candy Red'
  _0x4ce740['36'] = 'Metallic Sunrise Orange'
  _0x4ce740['37'] = 'Metallic Classic Gold'
  _0x4ce740['38'] = 'Metallic Orange'
  _0x4ce740['39'] = 'Matte Red'
  _0x4ce740['40'] = 'Matte Dark Red'
  _0x4ce740['41'] = 'Matte Orange'
  _0x4ce740['42'] = 'Matte Yellow'
  _0x4ce740['43'] = 'Util Red'
  _0x4ce740['44'] = 'Util Bright Red'
  _0x4ce740['45'] = 'Util Garnet Red'
  _0x4ce740['46'] = 'Worn Red'
  _0x4ce740['47'] = 'Worn Golden Red'
  _0x4ce740['48'] = 'Worn Dark Red'
  _0x4ce740['49'] = 'Metallic Dark Green'
  _0x4ce740['50'] = 'Metallic Racing Green'
  _0x4ce740['51'] = 'Metallic Sea Green'
  _0x4ce740['52'] = 'Metallic Olive Green'
  _0x4ce740['53'] = 'Metallic Green'
  _0x4ce740['54'] = 'Metallic Gasoline Blue Green'
  _0x4ce740['55'] = 'Matte Lime Green'
  _0x4ce740['56'] = 'Util Dark Green'
  _0x4ce740['57'] = 'Util Green'
  _0x4ce740['58'] = 'Worn Dark Green'
  _0x4ce740['59'] = 'Worn Green'
  _0x4ce740['60'] = 'Worn Sea Wash'
  _0x4ce740['61'] = 'Metallic Midnight Blue'
  _0x4ce740['62'] = 'Metallic Dark Blue'
  _0x4ce740['63'] = 'Metallic Saxony Blue'
  _0x4ce740['64'] = 'Metallic Blue'
  _0x4ce740['65'] = 'Metallic Mariner Blue'
  _0x4ce740['66'] = 'Metallic Harbor Blue'
  _0x4ce740['67'] = 'Metallic Diamond Blue'
  _0x4ce740['68'] = 'Metallic Surf Blue'
  _0x4ce740['69'] = 'Metallic Nautical Blue'
  _0x4ce740['70'] = 'Metallic Bright Blue'
  _0x4ce740['71'] = 'Metallic Purple Blue'
  _0x4ce740['72'] = 'Metallic Spinnaker Blue'
  _0x4ce740['73'] = 'Metallic Ultra Blue'
  _0x4ce740['74'] = 'Metallic Bright Blue'
  _0x4ce740['75'] = 'Util Dark Blue'
  _0x4ce740['76'] = 'Util Midnight Blue'
  _0x4ce740['77'] = 'Util Blue'
  _0x4ce740['78'] = 'Util Sea Foam Blue'
  _0x4ce740['79'] = 'Uil Lightning blue'
  _0x4ce740['80'] = 'Util Maui Blue Poly'
  _0x4ce740['81'] = 'Util Bright Blue'
  _0x4ce740['82'] = 'Matte Dark Blue'
  _0x4ce740['83'] = 'Matte Blue'
  _0x4ce740['84'] = 'Matte Midnight Blue'
  _0x4ce740['85'] = 'Worn Dark blue'
  _0x4ce740['86'] = 'Worn Blue'
  _0x4ce740['87'] = 'Worn Light blue'
  _0x4ce740['88'] = 'Metallic Taxi Yellow'
  _0x4ce740['89'] = 'Metallic Race Yellow'
  _0x4ce740['90'] = 'Metallic Bronze'
  _0x4ce740['91'] = 'Metallic Yellow Bird'
  _0x4ce740['92'] = 'Metallic Lime'
  _0x4ce740['93'] = 'Metallic Champagne'
  _0x4ce740['94'] = 'Metallic Pueblo Beige'
  _0x4ce740['95'] = 'Metallic Dark Ivory'
  _0x4ce740['96'] = 'Metallic Choco Brown'
  _0x4ce740['97'] = 'Metallic Golden Brown'
  _0x4ce740['98'] = 'Metallic Light Brown'
  _0x4ce740['99'] = 'Metallic Straw Beige'
  _0x4ce740['100'] = 'Metallic Moss Brown'
  _0x4ce740['101'] = 'Metallic Biston Brown'
  _0x4ce740['102'] = 'Metallic Beechwood'
  _0x4ce740['103'] = 'Metallic Dark Beechwood'
  _0x4ce740['104'] = 'Metallic Choco Orange'
  _0x4ce740['105'] = 'Metallic Beach Sand'
  _0x4ce740['106'] = 'Metallic Sun Bleeched Sand'
  _0x4ce740['107'] = 'Metallic Cream'
  _0x4ce740['108'] = 'Util Brown'
  _0x4ce740['109'] = 'Util Medium Brown'
  _0x4ce740['110'] = 'Util Light Brown'
  _0x4ce740['111'] = 'Metallic White'
  _0x4ce740['112'] = 'Metallic Frost White'
  _0x4ce740['113'] = 'Worn Honey Beige'
  _0x4ce740['114'] = 'Worn Brown'
  _0x4ce740['115'] = 'Worn Dark Brown'
  _0x4ce740['116'] = 'Worn straw beige'
  _0x4ce740['117'] = 'Brushed Steel'
  _0x4ce740['118'] = 'Brushed Black steel'
  _0x4ce740['119'] = 'Brushed Aluminium'
  _0x4ce740['120'] = 'Chrome'
  _0x4ce740['121'] = 'Worn Off White'
  _0x4ce740['122'] = 'Util Off White'
  _0x4ce740['123'] = 'Worn Orange'
  _0x4ce740['124'] = 'Worn Light Orange'
  _0x4ce740['125'] = 'Metallic Securicor Green'
  _0x4ce740['126'] = 'Worn Taxi Yellow'
  _0x4ce740['127'] = 'police car blue'
  _0x4ce740['128'] = 'Matte Green'
  _0x4ce740['129'] = 'Matte Brown'
  _0x4ce740['130'] = 'Worn Orange'
  _0x4ce740['131'] = 'Matte White'
  _0x4ce740['132'] = 'Worn White'
  _0x4ce740['133'] = 'Worn Olive Army Green'
  _0x4ce740['134'] = 'Pure White'
  _0x4ce740['135'] = 'Hot Pink'
  _0x4ce740['136'] = 'Salmon pink'
  _0x4ce740['137'] = 'Metallic Vermillion Pink'
  _0x4ce740['138'] = 'Orange'
  _0x4ce740['139'] = 'Green'
  _0x4ce740['140'] = 'Blue'
  _0x4ce740['141'] = 'Mettalic Black Blue'
  _0x4ce740['142'] = 'Metallic Black Purple'
  _0x4ce740['143'] = 'Metallic Black Red'
  _0x4ce740['144'] = 'hunter green'
  _0x4ce740['145'] = 'Metallic Purple'
  _0x4ce740['146'] = 'Metaillic V Dark Blue'
  _0x4ce740['147'] = 'MODSHOP BLACK1'
  _0x4ce740['148'] = 'Matte Purple'
  _0x4ce740['149'] = 'Matte Dark Purple'
  _0x4ce740['150'] = 'Metallic Lava Red'
  _0x4ce740['151'] = 'Matte Forest Green'
  _0x4ce740['152'] = 'Matte Olive Drab'
  _0x4ce740['153'] = 'Matte Desert Brown'
  _0x4ce740['154'] = 'Matte Desert Tan'
  _0x4ce740['155'] = 'Matte Foilage Green'
  _0x4ce740['156'] = 'DEFAULT ALLOY COLOR'
  _0x4ce740['157'] = 'Epsilon Blue'
  _0x4ce740['158'] = 'Unknown'
  const _0x25f63b = _0x4ce740,
    _0x54fc79 = _0x25f63b
  function _0x4c3bc5(_0x380e8f, _0x9de645, _0x1fb97e = false) {
    return new Promise((_0x20fb9a) => {
      if (_0x9de645) {
        exports['ev-taskbar'].taskBar(
          _0x380e8f,
          _0x9de645,
          _0x1fb97e,
          true,
          null,
          false,
          _0x20fb9a
        )
      } else {
        setTimeout(() => _0x20fb9a(100), _0x380e8f)
      }
    })
  }
  const _0x1cc443 = (_0x324ac6) => {
      return new Promise((_0x3c509e) => {
        RequestAnimDict(_0x324ac6)
        const _0x167182 = setInterval(() => {
          if (HasAnimDictLoaded(_0x324ac6)) {
            clearInterval(_0x167182)
            _0x3c509e(true)
          }
        }, 200)
        setTimeout(() => {
          clearInterval(_0x167182)
          _0x3c509e(false)
        }, 5000)
      })
    },
    _0x557894 = (
      _0x5efbb3,
      _0x1a0497,
      _0xeb2458 = true,
      _0x30d09f = 1,
      _0x315e27 = 0
    ) => {
      const _0x24a997 = AddBlipForCoord(_0x5efbb3.x, _0x5efbb3.y, _0x5efbb3.z)
      return (
        SetBlipSprite(_0x24a997, _0x30d09f),
        SetBlipAsShortRange(_0x24a997, true),
        SetBlipDisplay(_0x24a997, 2),
        SetBlipScale(_0x24a997, 0.8),
        _0xeb2458 &&
          (SetBlipRoute(_0x24a997, true), SetBlipRouteColour(_0x24a997, 2)),
        SetBlipColour(_0x24a997, _0x315e27),
        BeginTextCommandSetBlipName('STRING'),
        AddTextComponentString(_0x1a0497),
        EndTextCommandSetBlipName(_0x24a997),
        _0x24a997
      )
    },
    _0x10c10a = (_0x2e2d39) => {
      emit('phone:emailReceived', 'The Boss', 'Status', _0x2e2d39)
    },
    _0x404d54 = (_0x1f4bdc, _0x42cb55) => {
      if (!DoesEntityExist(_0x1f4bdc)) {
        return
      }
      let [_0x2b4fff, _0x20c2a5] = GetVehicleColours(_0x1f4bdc)
      _0x2b4fff == 0 && (_0x2b4fff = 1)
      if (_0x20c2a5 == 0) {
        _0x20c2a5 = 2
      }
      if (_0x2b4fff == -1) {
        _0x2b4fff = 158
      }
      return (
        _0x20c2a5 == -1 && (_0x20c2a5 = 158),
        {
          model: GetDisplayNameFromVehicleModel(GetEntityModel(_0x1f4bdc)),
          plate: GetVehicleNumberPlateText(_0x1f4bdc),
          firstColor: _0x54fc79[_0x2b4fff],
          secondColor: _0x54fc79[_0x20c2a5],
          heading: _0x44a7bc(_0x42cb55),
        }
      )
    },
    _0x44a7bc = (_0x42dd4d) => {
      if (_0x42dd4d >= 315 || _0x42dd4d < 45) {
        return 'North Bound'
      } else {
        if (_0x42dd4d >= 45 && _0x42dd4d < 135) {
          return 'West Bound'
        } else {
          if (_0x42dd4d >= 135 && _0x42dd4d < 225) {
            return 'South Bound'
          } else {
            if (_0x42dd4d >= 225 && _0x42dd4d < 315) {
              return 'East Bound'
            }
          }
        }
      }
    }
  function _0x53bbcb(_0x1a6e66, _0x484b05) {
    return new Promise((_0xb9c89d) => {
      exports['ev-ui'].taskBarSkill(_0x1a6e66, _0x484b05, _0xb9c89d)
    })
  }
  const _0x195257 = (_0x365b1a, _0x15b2fe, _0x1d2400) => {
    return new Promise((_0x54cd89) => {
      exports['ev-phone'].DoPhoneConfirmation(
        _0x365b1a,
        _0x15b2fe,
        _0x1d2400,
        _0x54cd89
      )
    })
  }
  const _0x5102ed = () => {
    const _0x899f9 = _0xf42ebd()
    if (!_0x899f9) {
      return
    }
    for (
      let _0x374448 = 0;
      _0x374448 < _0x899f9.locations.length;
      _0x374448++
    ) {
      const _0x3b7031 = _0x899f9.locations[_0x374448],
        _0x6446da = { id: _0x374448 }
      const _0x521ec3 = { data: _0x6446da }
      exports['ev-polytarget'].AddBoxZone(
        'heroin_cabinet',
        _0x3b7031.position,
        _0x3b7031.width,
        _0x3b7031.length,
        Object.assign(Object.assign({}, _0x3b7031.options), _0x521ec3)
      )
    }
    const _0x2b0518 = {
      id: 'ev-heroin:stealFromCabinet',
      CPXEvent: 'ev-heroin:stealFromCabinet',
      icon: 'syringe',
      label: 'Search for some syringes',
    }
    const _0x380214 = { radius: 2 }
    exports['ev-interact'].AddPeekEntryByPolyTarget(
      'heroin_cabinet',
      [_0x2b0518],
      {
        distance: _0x380214,
        isEnabled: () => {
          return exports['ev-inventory'].hasEnoughOfItem(
            'cabinetpick',
            1,
            false,
            true
          )
        },
      }
    )
  }
  _0x35a5e3.on(
    'ev-heroin:stealFromCabinet',
    async (_0x2087fe, _0x30f969, _0x24dbc8) => {
      var _0x5cd68e, _0x83d130
      const _0x3151d1 = await _0x5d06ef.execute(
        'ev-heroin:cabinets:isAvailable',
        (_0x5cd68e = _0x24dbc8.zones.heroin_cabinet.id) !== null &&
          _0x5cd68e !== void 0
          ? _0x5cd68e
          : 0
      )
      if (!_0x3151d1) {
        return
      }
      emit('animation:PlayAnimation', 'search')
      const _0x2c851b = await _0x4c3bc5(
        _0xf42ebd().searchTime,
        'Searching for syringes',
        true
      )
      ClearPedTasksImmediately(PlayerPedId())
      if (_0x2c851b !== 100) {
        return
      }
      _0x5d06ef.execute(
        'ev-heroin:cabinets:rob',
        (_0x83d130 = _0x24dbc8.zones.heroin_cabinet.id) !== null &&
          _0x83d130 !== void 0
          ? _0x83d130
          : 0
      )
    }
  )
  const _0xf42ebd = () => {
    return _0x57c207('ev-heroin:cabinets')
  }
  async function _0x567da3() {}
  async function _0x481f8f(_0x3dd962) {
    return new Promise((_0x4e87b9) => setTimeout(() => _0x4e87b9(), _0x3dd962))
  }
  const _0x56eaf1 = () => Math.floor(Date.now() / 1000),
    _0x4d1539 = (_0x1d77f6, _0x2bf77e) => {
      const [_0x3a5374, _0x40eb8a, _0x457a7a] = [
        _0x1d77f6[0] - _0x2bf77e[0],
        _0x1d77f6[1] - _0x2bf77e[1],
        _0x1d77f6[2] - _0x2bf77e[2],
      ]
      return Math.sqrt(
        _0x3a5374 * _0x3a5374 + _0x40eb8a * _0x40eb8a + _0x457a7a * _0x457a7a
      )
    },
    _0x187d70 = (_0x5bf79d, _0x19f68f) => {
      return Math.round(Math.random() * (_0x19f68f - _0x5bf79d)) + _0x5bf79d
    },
    _0x331600 = (_0x1927a8, _0x1f065e) => {
      const [_0x3cda6f, _0x50db8c, _0x24b4fe] = [
        _0x1927a8.x - _0x1f065e.x,
        _0x1927a8.y - _0x1f065e.y,
        _0x1927a8.z - _0x1f065e.z,
      ]
      return Math.sqrt(
        _0x3cda6f * _0x3cda6f + _0x50db8c * _0x50db8c + _0x24b4fe * _0x24b4fe
      )
    },
    _0x4ffe2f = (_0x138070) => {
      const _0x52be21 = {}
      return (
        (_0x52be21.x = _0x138070[0]),
        (_0x52be21.y = _0x138070[1]),
        (_0x52be21.z = _0x138070[2]),
        _0x52be21
      )
    }
  const _0x5b107c = [],
    _0x326e9e = { _0x4436bf: _0x11be73 }
  let _0x4a26bb = null
  const _0x493ff9 = {
    x: 1065.98,
    y: -3183.35,
    z: -39.16,
  }
  const _0x17335d = _0x493ff9,
    _0x15a7f7 = () => {
      exports['ev-polyzone'].AddCircleZone(
        'ev-heroin:house:exit',
        _0x17335d,
        3,
        {}
      )
      const _0xd560eb = {
        x: 1045.17,
        y: -3194.84,
        z: -38.16,
      }
      const _0x550a81 = {
        heading: 0,
        minZ: -38.36,
        maxZ: -37.76,
      }
      exports['ev-polytarget'].AddBoxZone(
        'ev-heroin:openLaptop',
        _0xd560eb,
        0.6,
        0.6,
        _0x550a81
      )
      const _0x2388e4 = {
        id: 'ev-heroin:openLaptop',
        CPXEvent: 'ev-heroin:openLaptop',
        icon: 'plane-departure',
        label: 'Laptop',
      }
      const _0x4fb3af = { radius: 3.5 }
      const _0xf2baa4 = {
        distance: _0x4fb3af,
        isEnabled: () => _0x4a26bb != null,
      }
      exports['ev-interact'].AddPeekEntryByPolyTarget(
        'ev-heroin:openLaptop',
        [_0x2388e4],
        _0xf2baa4
      )
    }
  setImmediate(async () => {
    if (GetConvar('sv_environment', 'prod') !== 'debug') {
      return
    }
    const _0x1a98cc = await _0x1a19ef.execute('ev-heroin:requestHouses')
    for (const _0x15a1b0 of _0x1a98cc) {
      _0x5b107c.push(_0x15a1b0)
      _0x5ac519(_0x15a1b0)
    }
  })
  _0x3bd875.onNet('ev-houses:loadHouses', (_0x45612b) => {
    for (const _0x59d9b9 of _0x45612b) {
      if (_0x5b107c.find((_0x50f62a) => _0x50f62a.id === _0x59d9b9.id)) {
        continue
      }
      _0x5b107c.push(_0x59d9b9)
      _0x5ac519(_0x59d9b9)
    }
  })
  onNet('ev-base:characterLoaded', async () => {
    const _0x429cfc = await _0x1a19ef.execute('ev-heroin:requestHouses')
    for (const _0x336a84 of _0x429cfc) {
      _0x5b107c.push(_0x336a84)
      _0x5ac519(_0x336a84)
    }
  })
  const _0x5ac519 = (_0xffb4df) => {
      if (_0xffb4df.position) {
        exports['ev-polyzone'].AddCircleZone(
          'ev-heroin:house:' + _0xffb4df.id + '_' + _0x56eaf1(),
          _0xffb4df.position,
          3,
          { data: { id: _0xffb4df.id } }
        )
      }
    },
    _0x4fdf48 = () => {
      if (!_0x4a26bb) {
        return
      }
      exports['ev-ui'].showInteraction('[E] Leave House')
      const _0x3cbc37 = setTick(async () => {
        if (
          _0x4d1539(GetEntityCoords(PlayerPedId(), false), [
            _0x17335d.x,
            _0x17335d.y,
            _0x17335d.z,
          ]) > 3
        ) {
          return exports['ev-ui'].hideInteraction(), clearTick(_0x3cbc37)
        }
        IsControlJustReleased(0, 38) &&
          (exports['ev-ui'].hideInteraction(),
          await _0x2fe780(),
          clearTick(_0x3cbc37))
      })
    },
    _0x2fe780 = async () => {
      if (!_0x4a26bb) {
        return
      }
      const _0x99a3eb = _0x5b107c.find((_0x41e117) => _0x41e117.id == _0x4a26bb)
      if (!_0x99a3eb) {
        return
      }
      DoScreenFadeOut(500)
      await _0x481f8f(500)
      SetEntityCoords(
        PlayerPedId(),
        _0x99a3eb.position.x,
        _0x99a3eb.position.y,
        _0x99a3eb.position.z,
        false,
        false,
        false,
        false
      )
      await _0x481f8f(1000)
      DoScreenFadeIn(500)
      _0x4a26bb = null
      _0x3bd875.emitNet('ev-heroin:houses:left', _0x99a3eb.id)
      if (_0x5e9291(_0x99a3eb.id)) {
        _0x1a19ef.execute('ev-heroin:house:toggleDoor', _0x99a3eb.id, false)
        emit('DoLongHudText', 'Door locked.')
      }
    }
  on('ev-heroin:house:lock', async () => {
    if (!_0x4a26bb) {
      return
    }
    const _0xacc518 = _0x5b107c.find((_0x11c89e) => _0x11c89e.id == _0x4a26bb)
    if (!_0xacc518) {
      return
    }
    const _0x46be02 = await _0x1a19ef.execute(
      'ev-heroin:house:toggleDoor',
      _0xacc518.id,
      false
    )
    if (!_0x46be02) {
      return
    }
    emit('DoLongHudText', 'Door locked.')
  })
  on('ev-heroin:house:enter', async () => {
    const _0x35fc69 = Object.keys(_0x326e9e)
    if (_0x35fc69.length === 0) {
      return
    }
    const _0x40ee93 = parseInt(_0x35fc69[0]),
      _0x3decc2 = _0x5b107c.find((_0x2a384a) => _0x2a384a.id == _0x40ee93)
    if (!_0x3decc2) {
      return
    }
    let _0x22ced6 = await _0x1a19ef.execute(
      'ev-heroin:house:enterDoor',
      _0x40ee93
    )
    if (_0x5e9291(_0x40ee93)) {
      _0x22ced6 = await _0x1a19ef.execute(
        'ev-heroin:house:toggleDoor',
        _0x40ee93,
        true
      )
      if (_0x22ced6) {
        emit('DoLongHudText', 'Door unlocked.')
      }
    }
    if (exports.isPed.isPed('myjob') !== 'police') {
      _0x22ced6 = true
    }
    if (!_0x22ced6) {
      return
    }
    DoScreenFadeOut(500)
    await _0x481f8f(500)
    SetEntityCoords(
      PlayerPedId(),
      _0x17335d.x,
      _0x17335d.y,
      _0x17335d.z,
      false,
      false,
      false,
      false
    )
    await _0x481f8f(1000)
    DoScreenFadeIn(500)
    _0x3bd875.emitNet('ev-heroin:houses:entered', _0x3decc2.id)
    _0x4a26bb = _0x3decc2.id
  })
  _0x3bd875.onNet(
    'ev-heroin:house:doorStatusUpdated',
    (_0x4436bf, _0x11be73) => {
      if (_0x326e9e[_0x4436bf] == null) {
        return
      }
    }
  )
  _0x3bd875.onNet('ev-heroin:house:moved', (_0x395a14) => {
    const _0x3456b6 = _0x5b107c.findIndex(
      (_0x1a7839) => _0x1a7839.id == _0x395a14.id
    )
    if (_0x3456b6 === -1) {
      return _0x5b107c.push(_0x395a14), _0x5ac519(_0x395a14)
    }
    _0x5b107c[_0x3456b6] = _0x395a14
    _0x5ac519(_0x395a14)
  })
  on('ev-polyzone:enter', async (_0x21330b, _0x3886b6) => {
    if (!_0x21330b.startsWith('ev-heroin:house:')) {
      return
    }
    if (_0x21330b === 'ev-heroin:house:exit') {
      return _0x4fdf48()
    }
    const _0x6a03ce = _0x5b107c.find(
      (_0x2c2e1d) => _0x2c2e1d.id === _0x3886b6.id
    )
    if (!_0x6a03ce) {
      return
    }
    const _0x2464ec = _0x4d1539(GetEntityCoords(PlayerPedId(), false), [
      _0x6a03ce.position.x,
      _0x6a03ce.position.y,
      _0x6a03ce.position.z,
    ])
    if (_0x2464ec > 5) {
      return
    }
    _0x326e9e[_0x6a03ce.id] = await _0x1a19ef.execute(
      'ev-heroin:house:getDoorStatus',
      _0x6a03ce.id
    )
  })
  on('ev-polyzone:exit', async (_0x399520, _0x5725ce) => {
    if (!_0x399520.startsWith('ev-heroin:house:')) {
      return
    }
    if (_0x399520 === 'ev-heroin:house:exit') {
      exports['ev-ui'].hideInteraction()
      return
    }
    const _0x192359 = _0x5b107c.find(
      (_0x67651c) => _0x67651c.id === _0x5725ce.id
    )
    if (!_0x192359) {
      return
    }
    delete _0x326e9e[_0x192359.id]
  })
  on('ev-inventory:itemUsed', async (_0x132a65, _0x52fd31) => {
    if (_0x132a65 !== 'heroinhousekey') {
      return
    }
    const _0x30f796 = JSON.parse(_0x52fd31).keyId
    exports['ev-ui'].showInteraction('[E] Place Entry')
    const _0xe5563f = setTick(async () => {
      IsControlJustPressed(0, 38) &&
        (exports['ev-ui'].hideInteraction(),
        _0x5d702d(_0x30f796),
        clearTick(_0xe5563f))
      IsControlJustPressed(0, 177) &&
        (exports['ev-ui'].hideInteraction(), clearTick(_0xe5563f))
    })
  })
  const _0x5d702d = async (_0x5bdc5f) => {
      const [_0x4901f8, _0x180489] = await _0x1a19ef.execute(
        'ev-heroin:house:placeDoor',
        _0x5bdc5f,
        GetEntityCoords(PlayerPedId(), false)
      )
      if (!_0x4901f8) {
        return emit(
          'DoLongHudText',
          'House entry could not be placed. Maybe try again.'
        )
      }
      if (!_0x180489) {
        return emit(
          'DoLongHudText',
          'Door entry has been set, but it may take some time. Wait a few days and come back.'
        )
      }
      emit('DoLongHudText', 'Your house has been placed.')
    },
    _0x5e9291 = (_0x502fd5) => {
      const _0x352e71 = exports['ev-inventory'].getItemsOfType(
        'heroinhousekey',
        1,
        true
      )
      if (_0x352e71.length === 0) {
        return
      }
      const _0x4708da = JSON.parse(_0x352e71[0].information)
      return _0x4708da.keyId === _0x502fd5
    }
  exports('isInsideDoorZone', () => Object.keys(_0x326e9e).length > 0)
  exports(
    'isInsideUnlockedDoorZone',
    () => Object.values(_0x326e9e).filter((_0x2cb6bd) => _0x2cb6bd).length > 0
  )
  exports('isInsideHouse', () => _0x4a26bb != null)
  const _0x2ce18d = () => {}
  let _0x252e01 = 0,
    _0x4ec756 = 0,
    _0xe7c9cf = 0,
    _0x1d7534 = 0,
    _0x41838a = null,
    _0x3bc13d = 0,
    _0x3db5ff = null,
    _0x25e338 = true
  const _0x49db2f = {}
  _0x49db2f['0'] = 0
  _0x49db2f['1'] = 5
  _0x49db2f['2'] = 10
  _0x49db2f['3'] = 15
  _0x49db2f['4'] = 25
  _0x49db2f['5'] = 45
  const _0x2a410e = _0x49db2f
  on('ev-inventory:itemUsed', (_0x12f42d, _0x1fb7b9) => {
    var _0x4de0e7
    const _0x310cd3 = JSON.parse(_0x1fb7b9)
    if (_0x12f42d === 'heroin_brick') {
      return _0xa8bf9c()
    }
    if (_0x12f42d === 'heroin_syringe') {
      return _0x5cf0de(
        (_0x4de0e7 =
          _0x310cd3 === null || _0x310cd3 === void 0
            ? void 0
            : _0x310cd3.quality) !== null && _0x4de0e7 !== void 0
          ? _0x4de0e7
          : 0.5
      )
    }
    if (_0x12f42d === 'adrenaline_bottle') {
      return _0x532541()
    }
  })
  const _0x532541 = async () => {
      const _0x498a84 = exports['ev-inventory'].hasEnoughOfItem(
        'heroin_syringe_empty',
        100,
        false,
        true
      )
      if (!_0x498a84) {
        return emit(
          'DoLongHudText',
          'I need more needles to dissolve this, probably like 100 in total.',
          2
        )
      }
      const _0x1dbac0 = exports['ev-inventory'].getItemsOfType(
        'heroin_brick',
        1,
        true
      )
      if (_0x1dbac0.length === 0) {
        return emit('DoLongHudText', 'I need a brick to dissolve this', 2)
      }
      const _0x62a689 = JSON.parse(_0x1dbac0[0].information),
        _0x3a82fc = exports['ev-inventory'].hasEnoughOfItem(
          'adrenaline_bottle',
          1,
          false,
          true
        )
      if (!_0x3a82fc) {
        return emit(
          'DoLongHudText',
          'I need an adrenaline bottle to dissolve this',
          2
        )
      }
      const _0x114103 = await _0x4c3bc5(
        _0x8d0c23().disolveTime,
        'Dissolving brick',
        true
      )
      if (_0x114103 !== 100) {
        return
      }
      emit('inventory:removeItem', 'heroin_brick', 1)
      emit('inventory:removeItem', 'adrenaline_bottle', 1)
      emit('inventory:removeItem', 'heroin_syringe_empty', 100)
      await _0x481f8f(100)
      emit('player:receiveItem', 'herodrenaline_syringe', 100, false, _0x62a689)
    },
    _0xa8bf9c = async () => {
      const _0x2d3a9c = exports['ev-inventory'].hasEnoughOfItem(
        'citric_acid_powder',
        1,
        false,
        true
      )
      if (!_0x2d3a9c) {
        return emit(
          'DoLongHudText',
          'Wonder what I could use to dissolve this....',
          2
        )
      }
      const _0x38c0f = exports['ev-inventory'].hasEnoughOfItem(
        'heroin_syringe_empty',
        100,
        false,
        true
      )
      if (!_0x38c0f) {
        return emit(
          'DoLongHudText',
          'I need more needles to dissolve this, probably like 100 in total.',
          2
        )
      }
      const _0x517365 = await _0x4c3bc5(
        _0x8d0c23().disolveTime,
        'Dissolving brick',
        true
      )
      if (_0x517365 !== 100) {
        return
      }
      const _0x5c5d45 = exports['ev-inventory'].getItemsOfType(
        'heroin_brick',
        1,
        true
      )
      if (_0x5c5d45.length === 0) {
        return
      }
      const _0x19a6f3 = JSON.parse(_0x5c5d45[0].information)
      emit('inventory:removeItem', 'heroin_brick', 1)
      emit('inventory:removeItem', 'citric_acid_powder', 1)
      emit('inventory:removeItem', 'heroin_syringe_empty', 100)
      await _0x481f8f(100)
      emit('player:receiveItem', 'heroin_syringe', 100, false, _0x19a6f3)
    },
    _0x5cf0de = async (_0x5e6524) => {
      await _0x1cc443('clear@custom_anim')
      const _0x57642b = _0x8d0c23().applyTime
      TaskPlayAnim(
        PlayerPedId(),
        'clear@custom_anim',
        'adrenaline_clip',
        8,
        -8,
        _0x57642b,
        51,
        0,
        false,
        false,
        false
      )
      const _0x24bbd8 = await _0x4c3bc5(
        _0x57642b,
        'Applying the Good Shit',
        true
      )
      ClearPedTasks(PlayerPedId())
      if (_0x24bbd8 !== 100) {
        return
      }
      _0x53a749(_0x5e6524)
      emit('inventory:removeItem', 'heroin_syringe', 1)
    },
    _0x53a749 = async (_0x4d70df) => {
      var _0x5b8d77
      if (_0x4ec756 > 0) {
        return emit('DoLongHudText', 'I cannot do this right now')
      }
      emit('addiction:drugTaken', 'heroin')
      emit('fx:run', 'heroin', 6 - 3 * (100 - _0x4d70df), -1, false, false)
      const _0x2c2ea6 = GetPedArmour(PlayerPedId()),
        _0x1b0083 = _0x3edce6(_0x4d70df, 0, 100, 1.1, 5)
      exports.ragdoll.SetPlayerArmor(Math.floor(_0x2c2ea6 + _0x1b0083 * 10))
      emit('healed:useOxy', false)
      emit('ev-drugeffects:forceStress', 1, 5)
      _0x1d7534 === 0 && (_0x3bc13d = 300)
      _0x4ec756 +=
        (_0x5b8d77 = _0x2a410e[_0x1d7534]) !== null && _0x5b8d77 !== void 0
          ? _0x5b8d77
          : 60
      _0x1d7534++
      _0xe7c9cf = 0
      _0x252e01 += 5
      !_0x41838a &&
        (_0x41838a = setTick(async () => {
          await _0x481f8f(1000)
          _0x3bc13d--
          if (_0x252e01 > 0 && _0x3bc13d > 0) {
            const _0x588133 = GetPedArmour(PlayerPedId())
            if (_0x588133 < 55) {
              _0x252e01--
              exports.ragdoll.SetPlayerArmor(
                Math.floor(_0x588133 + _0x1b0083 * 10)
              )
              await _0x481f8f(200)
            }
          } else {
            _0xe7c9cf++
            ;(_0xe7c9cf > 60 || _0x3bc13d <= 0) &&
              ((_0x4ec756 = 0),
              (_0x1d7534 = 0),
              clearTick(_0x41838a),
              (_0x41838a = null),
              (_0x252e01 = 0),
              (_0x3bc13d = 0))
          }
          if (_0x4ec756 > 0) {
            _0x4ec756--
          }
        }))
    }
  on(
    'ev-heroin:injectHerodrenaline',
    async (_0x2070f5, _0x43e23d, _0x49fab1) => {
      if (!_0x49fab1.flags.isPlayer || !_0x49fab1.flags.isDead) {
        return
      }
      const _0x4d024b = exports['ev-inventory'].hasEnoughOfItem(
        'herodrenaline_syringe',
        1,
        false,
        true
      )
      if (!_0x4d024b) {
        return emit(
          'DoLongHudText',
          'I need a herodrenaline syringe to inject this',
          2
        )
      }
      const _0x4a1f95 = 'amb@world_human_bum_wash@male@low@idle_a',
        _0x340fb7 = 'idle_a'
      await _0x35bc14.loadAnim(_0x4a1f95)
      TaskPlayAnim(
        PlayerPedId(),
        _0x4a1f95,
        _0x340fb7,
        8,
        -8,
        3000,
        1,
        1,
        false,
        false,
        false
      )
      const _0x27c70f = await _0x4c3bc5(3000, 'Injecting herodrenaline', true)
      if (_0x27c70f !== 100) {
        return
      }
      _0x35a5e3.emitNet(
        'ev-heroin:herodrenalineInjected',
        GetPlayerServerId(NetworkGetPlayerIndexFromPed(_0x43e23d))
      )
    }
  )
  on('playerRevived', (_0x140085) => {
    if (_0x140085) {
      return
    }
    _0x25e338 = true
    if (_0x3db5ff) {
      clearTimeout(_0x3db5ff)
      _0x3db5ff = null
    }
  })
  _0x35a5e3.onNet('ev-heroin:herodrenalineInjected', async (_0x21ff11) => {
    if (!exports.isPed.isPed('dead')) {
      return
    }
    if (!_0x25e338) {
      return _0x35a5e3.emitNet('ev-heroin:herodralineFailed', _0x21ff11)
    }
    _0x35a5e3.emitNet('ev-heroin:herodralineSuccessful', _0x21ff11)
    _0x25e338 = false
    exports.police.DisableBleeding(true)
    emit('reviveFunction', true)
    await _0x481f8f(2000)
    exports.police.DisableBleeding(false)
    exports.ragdoll.SetPlayerHealth(110)
    _0x3db5ff && (clearTimeout(_0x3db5ff), (_0x3db5ff = null))
    _0x3db5ff = setTimeout(() => {
      exports.ragdoll.SetPlayerHealth(0)
    }, 600000)
  })
  const _0x8d0c23 = () => {
      return _0x57c207('ev-heroin:heroin')
    },
    _0x3edce6 = (_0x926169, _0x458721, _0x20de65, _0x54b1b2, _0x42e564) => {
      return (
        _0x54b1b2 +
        ((_0x926169 - _0x458721) * (_0x42e564 - _0x54b1b2)) /
          (_0x20de65 - _0x458721)
      )
    }
  const _0x53dfc3 = _0x381737.g.exports
  let _0x3d82c6 = false
  on('ev-admin:currentDevmode', (_0x5ae332) => (_0x3d82c6 = _0x5ae332))
  const _0x365cf7 = () => {
      _0x1dd826()
      const _0x42667c = {
        x: 1036.38,
        y: -3202.92,
        z: -38.17,
      }
      const _0x225995 = {
        heading: 0,
        minZ: -38.42,
        maxZ: -38.02,
      }
      _0x381737.g.exports['ev-polytarget'].AddBoxZone(
        'heroin_processing',
        _0x42667c,
        1,
        2.2,
        _0x225995
      )
      const _0x3e6a5f = {
        CPXEvent: 'ev-heroin:plants:makeBrick',
        id: 'heroin_process',
        icon: 'square',
        label: 'Process heroin',
      }
      const _0x11796c = {
        CPXEvent: 'ev-heroin:plants:makeAcid',
        id: 'heroin_processacid',
        icon: 'lemon',
        label: 'Produce citric acid',
      }
      const _0x528948 = {
        CPXEvent: 'ev-heroin:plants:craft',
        id: 'heroin_craft',
        icon: 'syringe',
        label: 'Craft',
      }
      const _0x4a6eea = { radius: 3.5 }
      _0x381737.g.exports['ev-interact'].AddPeekEntryByPolyTarget(
        'heroin_processing',
        [_0x3e6a5f, _0x11796c, _0x528948],
        {
          distance: _0x4a6eea,
          isEnabled: async () => {
            return _0x4a26bb
          },
        }
      )
    },
    _0x1dd826 = () => {
      const _0x442670 = _0xc767ab(),
        _0x541bab = {
          id: 'ev-heroin:checkPlant',
          CPXEvent: 'ev-heroin:checkPlant',
          icon: 'seedling',
          label: 'Check plant',
        }
      const _0x28ebf0 = { radius: 2.5 }
      exports['ev-interact'].AddPeekEntryByModel(
        Object.values(_0x442670.models).map((_0x3a85cc) =>
          GetHashKey(_0x3a85cc)
        ),
        [_0x541bab],
        {
          distance: _0x28ebf0,
          isEnabled: () => {
            return _0x4a26bb
          },
        }
      )
    }
  _0x35a5e3.on('ev-heroin:checkPlant', async (_0x487a2d, _0x27f93d) => {
    const _0x308764 = _0x53dfc3['ev-objects'].GetObjectByEntity(_0x27f93d),
      _0x108798 = _0x308764.data.metadata,
      _0x3047f3 = await _0x1a19ef.execute(
        'ev-plants:checkPlant',
        _0x4a26bb,
        _0x108798
      )
    if (!_0x3047f3) {
      return
    }
    const _0x45ef30 = _0x56eaf1() > _0x3047f3.withered_at,
      _0x1cc3de = _0x56eaf1() - _0x3047f3.planted_at,
      _0x38c6b1 = _0xc767ab(),
      _0x3a0940 = _0x1cc3de > _0x38c6b1.times.waterAt
    let _0x4de209 = _0x45ef30
      ? 'Your plant withered.'
      : 'Make sure your plant gets watered, it might wither otherwise.'
    !_0x45ef30 &&
      _0x3047f3.watered_at != null &&
      (_0x4de209 = 'Your plant is already watered.')
    const _0x4735b8 = {
      action: undefined,
      icon: 'seedling',
      title: 'Progress',
      description: _0x3047f3.percentage + '%',
    }
    const _0x390497 = { entity: _0x27f93d }
    const _0x4dadcd = [
      _0x4735b8,
      {
        action: 'ev-heroin:waterPlant',
        icon: 'water',
        title: 'Water plant',
        disabled: _0x45ef30 || _0x3047f3.watered_at != null || !_0x3a0940,
        description: _0x4de209,
        key: Object.assign(Object.assign({}, _0x108798), _0x390497),
      },
      {
        action: 'ev-heroin:harvestPlant',
        icon: 'seedling',
        title: 'Harvest plant',
        disabled: _0x56eaf1() < _0x3047f3.finished_at || _0x45ef30,
        description: 'Harvest your plant',
        key: _0x108798,
      },
      {
        action: 'ev-heroin:destroyPlant',
        icon: 'trash',
        title: 'Destroy plant',
        description: 'Why would you do this? :(',
        key: _0x108798,
      },
    ]
    if (_0x3d82c6) {
      const _0x354c0b = { action: 'adjustHarvest' }
      const _0x463584 = { plantStatus: _0x3047f3 }
      const _0x500c47 = { action: 'adjustWater' }
      const _0x17abaa = { plantStatus: _0x3047f3 }
      _0x4dadcd.push({
        icon: 'settings',
        title: 'Dev Settings',
        description: 'forsenCD',
        children: [
          {
            title: 'Adjust harvest time',
            action: 'ev-heroin:dev',
            key: Object.assign(Object.assign(_0x354c0b, _0x108798), _0x463584),
          },
          {
            title: 'Adjust water time',
            action: 'ev-heroin:dev',
            key: Object.assign(Object.assign(_0x500c47, _0x108798), _0x17abaa),
          },
        ],
      })
    }
    exports['ev-ui'].showContextMenu(_0x4dadcd)
  })
  RegisterUICallback('ev-heroin:dev', async (_0x22e381, _0x191e57) => {
    const _0x5513bd = {
      ok: true,
      message: '',
    }
    const _0x5c4308 = {
      data: [],
      meta: _0x5513bd,
    }
    _0x191e57(_0x5c4308)
    if (!_0x3d82c6) {
      return
    }
    await _0x481f8f(100)
    const _0xb0e1f2 = _0x22e381.key.action
    if (_0xb0e1f2 === 'adjustHarvest') {
      const _0x2ea71a = {
        name: 'harvestAt',
        label: 'Harvest at',
        icon: 'time',
      }
      _0x2ea71a['_type'] = 'number'
      _0x2ea71a['_defaultValue'] = _0x22e381.key.plantStatus.finished_at
      const _0x42d314 = [_0x2ea71a],
        _0xb3fa7c = await exports['ev-ui'].OpenInputMenu(_0x42d314)
      if (!_0xb3fa7c) {
        return
      }
      const _0x446f90 = await _0x1a19ef.execute(
        'ev-heroin:dev',
        'adjustHarvest',
        _0x22e381.key.house,
        _0x22e381.key.id,
        _0xb3fa7c.harvestAt
      )
      if (!_0x446f90) {
        return emit('DoLongHudText', 'Harvest time could not be adjusted.', 2)
      }
      return emit('DoLongHudText', 'Harvest time adjusted.', 2)
    }
    if (_0xb0e1f2 === 'adjustWater') {
      const _0x2b0c2e = [
          {
            name: 'waterAt',
            label: 'Water at',
            icon: 'time',
            _type: 'number',
            _defaultValue: _0x56eaf1(),
          },
        ],
        _0x23e50a = await exports['ev-ui'].OpenInputMenu(_0x2b0c2e)
      if (!_0x23e50a) {
        return
      }
      const _0x26930e = await _0x1a19ef.execute(
        'ev-heroin:dev',
        'adjustWater',
        _0x22e381.key.house,
        _0x22e381.key.id,
        _0x23e50a.waterAt
      )
      if (!_0x26930e) {
        return emit('DoLongHudText', 'Water time could not be adjusted.', 2)
      }
      return emit('DoLongHudText', 'Water time adjusted.', 2)
    }
  })
  RegisterUICallback('ev-heroin:waterPlant', async (_0x1fe06d, _0x34cb5e) => {
    const _0x3312e5 = {
      ok: true,
      message: '',
    }
    const _0x35de3a = {
      data: [],
      meta: _0x3312e5,
    }
    _0x34cb5e(_0x35de3a)
    const _0x513a64 = _0x1fe06d.key
    if (!_0x4a26bb || _0x4a26bb !== _0x513a64.house) {
      return
    }
    const _0x37dae6 = await _0x1a19ef.execute(
      'ev-plants:canWaterPlant',
      _0x4a26bb,
      _0x513a64.id
    )
    if (!_0x37dae6) {
      return
    }
    _0x5b338c(PlayerPedId(), _0x513a64.entity)
    const _0x3c0b33 = await _0x4c3bc5(
      _0xc767ab().waterTime,
      'Watering plant...',
      true
    )
    ClearPedTasks(PlayerPedId())
    emit('destroyProp')
    if (_0x3c0b33 !== 100) {
      return
    }
    _0x1a19ef.execute('ev-heroin:plants:water', _0x4a26bb, _0x513a64.id)
  })
  RegisterUICallback('ev-heroin:harvestPlant', async (_0x4e3e6b, _0x5e8492) => {
    const _0x425bde = {
      ok: true,
      message: '',
    }
    const _0x482a77 = {
      data: [],
      meta: _0x425bde,
    }
    _0x5e8492(_0x482a77)
    const _0x49740a = _0x4e3e6b.key
    if (!_0x4a26bb || _0x4a26bb !== _0x49740a.house) {
      return
    }
    emit('animation:PlayAnimation', 'layspike')
    const _0x14307a = await _0x4c3bc5(
      _0xc767ab().harvestTime,
      'Harvesting plant...',
      true
    )
    ClearPedTasks(PlayerPedId())
    if (_0x14307a !== 100) {
      return
    }
    const _0x24b761 = await _0x1a19ef.execute(
      'ev-heroin:plants:farm',
      _0x4a26bb,
      _0x49740a.id
    )
    if (!_0x24b761) {
      return
    }
    emit('DoLongHudText', 'You harvested your plant.')
  })
  RegisterUICallback('ev-heroin:destroyPlant', async (_0x33d81a, _0x418416) => {
    const _0x4f2255 = {
      ok: true,
      message: '',
    }
    const _0x1b8e50 = {
      data: [],
      meta: _0x4f2255,
    }
    _0x418416(_0x1b8e50)
    const _0x33663b = _0x33d81a.key
    if (!_0x4a26bb || _0x4a26bb !== _0x33663b.house) {
      return
    }
    emit('animation:PlayAnimation', 'layspike')
    const _0x360949 = await _0x4c3bc5(
      _0xc767ab().destroyTime,
      'Destroying plant...',
      true
    )
    ClearPedTasks(PlayerPedId())
    if (_0x360949 !== 100) {
      return
    }
    _0x1a19ef.execute('ev-heroin:plants:destroy', _0x4a26bb, _0x33663b.id)
  })
  const _0xd91c31 = async () => {
    if (!_0x4a26bb) {
      return
    }
    const _0xe75d60 = {
      distance: 3,
      forceGroundSnap: true,
      zOffset: 0.05,
    }
    const [_0x207288, _0xfc924e] = await _0x53dfc3['ev-objects'].PlaceObject(
      GetHashKey('np_poppy_sprout'),
      _0xe75d60
    )
    if (!_0x207288) {
      return
    }
    TaskStartScenarioInPlace(
      PlayerPedId(),
      'WORLD_HUMAN_GARDENER_PLANT',
      0,
      false
    )
    const _0x2b4de1 = await _0x4c3bc5(
      _0xc767ab().plantTime,
      'Planting plant...',
      true
    )
    ClearPedTasks(PlayerPedId())
    if (_0x2b4de1 !== 100) {
      return
    }
    const _0x30eb3c = await _0x1a19ef.execute(
      'ev-heroin:plants:plant',
      _0x4a26bb,
      _0xfc924e.coords,
      _0xfc924e.rotation
    )
    _0x30eb3c &&
      emit('DoLongHudText', 'Seed planted. Make sure to water it in time!')
  }
  on('ev-inventory:itemUsed', (_0x1cdf7e) => {
    if (_0x1cdf7e !== 'poppyseeds' || !_0x4a26bb) {
      return
    }
    _0xd91c31()
  })
  const _0x5b338c = async (_0x328fc2, _0x75b446) => {
    await _0x35bc14.loadAnim('weapon@w_sp_jerrycan')
    TaskTurnPedToFaceEntity(_0x328fc2, _0x75b446, 0)
    await _0x481f8f(100)
    TriggerEvent('attachItem', 'wateringcan2')
    TaskPlayAnim(
      _0x328fc2,
      'weapon@w_sp_jerrycan',
      'fire',
      8,
      -8,
      -1,
      49,
      0,
      false,
      false,
      false
    )
    const _0x5f07c7 = exports['ev-propattach'].GetAttachedProp()
    _0x5f07c7 &&
      emitNet('fx:waterPour', NetworkGetNetworkIdFromEntity(_0x5f07c7))
  }
  _0x35a5e3.on('ev-heroin:plants:makeBrick', () => {
    if (!_0x4a26bb) {
      return
    }
    const _0x24fd13 = [],
      _0x529b42 = {
        action: 'ev-heroin:plants:makeBrick',
        icon: 'square',
        title: 'Make brick',
        description: 'Make a brick out of 25 poppy tears',
      }
    _0x24fd13.push(_0x529b42)
    exports['ev-ui'].showContextMenu(_0x24fd13)
  })
  RegisterUICallback(
    'ev-heroin:plants:makeBrick',
    async (_0x26878a, _0x312d88) => {
      const _0x435a01 = {
        ok: true,
        message: '',
      }
      const _0x4a08b5 = {
        data: [],
        meta: _0x435a01,
      }
      _0x312d88(_0x4a08b5)
      if (!_0x4a26bb) {
        return
      }
      const _0x23b003 = exports['ev-inventory'].hasEnoughOfItem(
        'poppy_tears',
        25,
        false,
        true
      )
      if (!_0x23b003) {
        return emit(
          'DoLongHudText',
          'You need 25 poppy tears to make a brick.',
          2
        )
      }
      const _0x18468b = await _0x4c3bc5(
        _0xc767ab().brickTime,
        'Making brick...',
        true
      )
      if (_0x18468b !== 100) {
        return
      }
      _0x35a5e3.emitNet('ev-heroin:plants:makeBrick', _0x4a26bb)
    }
  )
  _0x35a5e3.on('ev-heroin:plants:makeAcid', async () => {
    if (!_0x4a26bb) {
      return
    }
    const _0x8a2f45 = exports['ev-inventory'].hasEnoughOfItem(
      'lemon',
      10,
      false,
      true
    )
    if (!_0x8a2f45) {
      return emit(
        'DoLongHudText',
        'I need some more lemons to produce this.',
        2
      )
    }
    const _0x1edad0 = await _0x4c3bc5(
      _0xc767ab().acidTime,
      'Making acid...',
      true
    )
    if (_0x1edad0 !== 100) {
      return
    }
    _0x35a5e3.emitNet('ev-heroin:plants:makeAcid', _0x4a26bb)
  })
  _0x35a5e3.on('ev-heroin:plants:craft', () => {
    if (!_0x4a26bb) {
      return
    }
    emit('server-inventory-open', '42133', 'Craft')
  })
  const _0xc767ab = () => {
    return _0x57c207('ev-heroin:plants')
  }
  let _0x4fcf54 = null
  const _0x2d7993 = { _0x2122ec: _0x3fc9be.map((_0x3cb900) => _0x3cb900.netId) }
  let _0x2161da = null
  const _0x1f6fd4 = {
    car: false,
    seeds: false,
    dropoff: false,
    despawn: false,
  }
  const _0x427844 = _0x1f6fd4
  let _0x38dc1e = false,
    _0x10b387 = null,
    _0x50184d = null
  const _0x1a8996 = () => {
      _0x28f2dd()
      const _0x2d9de7 = {
        CPXEvent: 'ev-heroin:seeds:loot',
        id: 'heroinseeds_loot',
        icon: 'box',
        label: 'Search the person',
        parameters: {},
      }
      const _0x1bf0be = { radius: 2 }
      exports['ev-interact'].AddPeekEntryByModel(
        [GetHashKey('g_m_y_lost_02')],
        [_0x2d9de7],
        {
          distance: _0x1bf0be,
          isEnabled: (_0x2b22b1) => {
            const _0x3c3c6a = NetworkGetNetworkIdFromEntity(_0x2b22b1)
            if (!_0x3c3c6a) {
              return false
            }
            return (
              Object.values(_0x2d7993).find((_0x2a4f80) =>
                _0x2a4f80.includes(_0x3c3c6a)
              ) && IsPedDeadOrDying(_0x2b22b1, true)
            )
          },
        }
      )
    },
    _0x28f2dd = () => {
      const _0x925b1a = {
        x: -1997.72,
        y: -346.54,
        z: 28.1,
      }
      const _0x448cb5 = {
        coords: _0x925b1a,
        heading: 141.2,
      }
      const _0x24c53a = {
        mode: 'invincible',
        active: true,
      }
      const _0x4b870f = {
        mode: 'ignore',
        active: true,
      }
      const _0x262da7 = {
        mode: 'freeze',
        active: true,
      }
      const _0x3e800b = {
        id: 'heroinseeds_ped',
        position: _0x448cb5,
        pedType: 4,
        model: 'ig_wade',
        networked: false,
        distance: 50,
        settings: [_0x24c53a, _0x4b870f, _0x262da7],
        flags: _0x125642,
      }
      const _0x2267cd = _0x3e800b
      _0x381737.g.exports['ev-npcs'].RegisterNPC(_0x2267cd, 'ev-heroin')
      const _0x3d59dd = {
        id: 'heroin_getseeds',
        label: 'get reward',
        icon: 'box',
        CPXEvent: 'ev-heroin:seeds:getReward',
        parameters: {},
      }
      const _0x17ba8c = { radius: 1.5 }
      _0x381737.g.exports['ev-interact'].AddPeekEntryByFlag(
        ['isNPC'],
        [_0x3d59dd],
        {
          npcIds: ['heroinseeds_ped'],
          distance: _0x17ba8c,
          isEnabled: async () => {
            const _0x4ccbff = await _0x1a19ef.execute(
              'ev-heroin:seeds:canGetReward'
            )
            return _0x4ccbff
          },
        }
      )
    }
  _0x35a5e3.on('ev-heroin:openLaptop', async () => {
    if (!_0x4a26bb) {
      return
    }
    const _0x7728df = await _0x1a19ef.execute(
        'ev-heroin:seeds:canStartJob',
        _0x4a26bb
      ),
      _0x5b3cff = { boss: true }
    const _0x37dd6a = {
      title: 'Start a job for yourself',
      description: 'Start a job for yourself',
      action: 'ev-heroin:startJob',
      key: _0x5b3cff,
    }
    const _0x17aa99 = { boss: false }
    const _0xaa67c0 = {
      title: 'Start a job for one of your runners',
      description: 'Start a job for one of your runners',
      action: 'ev-heroin:startJob',
      key: _0x17aa99,
    }
    const _0x3f430c = {
      title: 'Start a job with the boss',
      description: 'Start a job for yourself or for one of your runners',
      disabled: !_0x7728df,
      children: [_0x37dd6a, _0xaa67c0],
    }
    exports['ev-ui'].showContextMenu([_0x3f430c])
  })
  RegisterUICallback('ev-heroin:startJob', async (_0x265ec3, _0x22ddb8) => {
    const _0x470cbc = {
      ok: true,
      message: 'done',
    }
    const _0x2c483a = {
      data: {},
      meta: _0x470cbc,
    }
    _0x22ddb8(_0x2c483a)
    await _0x481f8f(250)
    const _0x590a5 = GetPlayerServerId(PlayerId())
    if (_0x265ec3.key.boss) {
      _0x35a5e3.emitNet('ev-heroin:seeds:startJob', _0x4a26bb, _0x590a5)
      return
    }
    const _0x7bf9df = {
      name: 'source',
      label: 'Server ID',
      icon: 'user',
    }
    _0x7bf9df['_type'] = 'number'
    const _0x2ae1b7 = await exports['ev-ui'].OpenInputMenu([_0x7bf9df])
    if (!_0x2ae1b7 || !_0x2ae1b7.source) {
      return
    }
    _0x35a5e3.emitNet(
      'ev-heroin:seeds:triggerConfirmation',
      _0x4a26bb,
      parseInt(_0x2ae1b7.source),
      _0x590a5
    )
  })
  _0x35a5e3.onNet(
    'ev-heroin:seeds:doConfirmation',
    async (_0x23a633, _0x1cfacd) => {
      const _0x5df133 = await _0x195257(
        'The boss',
        'You have been requested to start a job. Do you accept?',
        'seedling'
      )
      if (_0x5df133) {
        _0x35a5e3.emitNet(
          'ev-heroin:seeds:startJob',
          _0x23a633,
          GetPlayerServerId(PlayerId()),
          _0x1cfacd
        )
        return
      }
      _0x35a5e3.emitNet(
        'ev-heroin:seeds:rejectConfirmation',
        _0x23a633,
        _0x1cfacd
      )
    }
  )
  const _0x984e09 = () => {
      _0x2ca517()
      emitNet('ev-heroin:seeds:jobCanceled')
    },
    _0x2ca517 = () => {
      _0x2161da && clearTick(_0x2161da)
      _0x4fcf54 = null
      _0x3dfc3b()
      _0x49a900()
    }
  _0x35a5e3.onNet('ev-heroin:seeds:jobStarted', (_0x3ef68f) => {
    if (_0x4fcf54) {
      return emit('DoLongHudText', 'You are already mid job.', 2)
    }
    _0x4fcf54 = _0x3ef68f
    _0x369335(_0x3ef68f)
    _0x4e8bf4(_0x4fcf54.locations.vehicle.position, 'Pickup vehicle')
    !_0x4fcf54.requester
      ? _0x10c10a('Get this car, quick. You will need it.')
      : (emit('DoLongHudText', 'Please wait for further instructions.'),
        _0x35a5e3.emitNet(
          'ev-heroin:seeds:emailRelay',
          _0x4fcf54.id,
          'The job has been started.'
        ))
  })
  _0x35a5e3.onNet('ev-heroin:seeds:resendJobObject', (_0x3ace57) => {
    if (_0x4fcf54) {
      return emit('DoLongHudText', 'You are already mid job.', 2)
    }
    _0x4fcf54 = _0x3ace57
    _0x369335(_0x3ace57)
    _0x10c10a('Continue where you left off, get to it.')
    _0x4fcf54.requester &&
      _0x35a5e3.emitNet(
        'ev-heroin:seeds:emailRelay',
        _0x4fcf54.id,
        'The runner is continuing his run.'
      )
  })
  on('ev-polyzone:enter', (_0x4646b2, _0x45804d) => {
    if (!_0x4646b2.startsWith('heroinseeds')) {
      return
    }
    if (!_0x4fcf54 || _0x45804d.uuid !== _0x4fcf54.id) {
      return
    }
    if (_0x4646b2 === 'heroinseeds_car_' + _0x4fcf54.id) {
      return (_0x427844.car = true), _0x1e7b66()
    }
    if (_0x4646b2 === 'heroinseeds_seeds_' + _0x4fcf54.id) {
      return (_0x427844.seeds = true), _0x3085b1()
    }
    if (
      _0x4646b2 === 'heroinseeds_dropoff_' + _0x4fcf54.id &&
      _0x4fcf54.dropOffReceived
    ) {
      return (_0x427844.dropoff = true), _0x1baa26()
    }
    if (_0x4646b2 === 'heroinseeds_dropoff_despawn_' + _0x4fcf54.id) {
      return (_0x427844.despawn = true), _0x1b4e39()
    }
  })
  on('ev-polyzone:exit', (_0x57e593, _0x2f7e26) => {
    if (!_0x57e593.startsWith('heroinseeds')) {
      return
    }
    if (!_0x4fcf54 || _0x2f7e26.uuid !== _0x4fcf54.id) {
      return
    }
    _0x57e593 === 'heroinseeds_car_' + _0x4fcf54.id && (_0x427844.car = false)
    if (_0x57e593 === 'heroinseeds_seeds_' + _0x4fcf54.id) {
      _0x427844.seeds = false
    }
    _0x57e593 === 'heroinseeds_dropoff_' + _0x4fcf54.id &&
      (_0x427844.dropoff = false)
    if (_0x57e593 === 'heroinseeds_dropoff_despawn_' + _0x4fcf54.id) {
      _0x427844.despawn = false
    }
  })
  const _0x3085b1 = async () => {
    if (!_0x4fcf54.carStolen) {
      return
    }
    if (_0x4fcf54.seedsCollected) {
      return
    }
    const _0x44d7f5 = await _0x1a19ef.execute('ev-heroin:seeds:spawnSeedPeds')
    if (!_0x44d7f5) {
      return
    }
    !_0x4fcf54.requester &&
      emit(
        'DoLongHudText',
        'You see those bikers? Kill them, and look what they have on them.',
        2
      )
  }
  _0x35a5e3.on('ev-heroin:seeds:loot', async (_0x251d80, _0x5caed9) => {
    if (!_0x4fcf54) {
      return
    }
    const _0x2690d2 = NetworkGetNetworkIdFromEntity(_0x5caed9)
    if (!_0x2690d2) {
      return
    }
    const _0xca5b58 = Object.keys(_0x2d7993).find((_0x353e19) =>
      _0x2d7993[_0x353e19].includes(_0x2690d2)
    )
    if (!_0xca5b58) {
      return
    }
    if (!IsPedDeadOrDying(_0x5caed9, true)) {
      return
    }
    if (_0x4fcf54.id !== _0xca5b58) {
      return
    }
    if (_0x4fcf54.seedsCollected) {
      return
    }
    const _0x4779ca = _0x5bbae8()
    await _0x35bc14.loadAnim('"random@shop_robbery"')
    TaskPlayAnim(
      PlayerPedId(),
      'random@shop_robbery',
      'robbery_action_b',
      8,
      -8,
      -1,
      16,
      0,
      false,
      false,
      false
    )
    const _0x734c77 = await _0x4c3bc5(_0x4779ca.lootTime, 'Looting...', true)
    ClearPedTasks(PlayerPedId())
    if (_0x734c77 !== 100) {
      return
    }
    const _0x565a1c = await _0x1a19ef.execute('ev-heroin:seeds:collectSeed')
    if (!_0x565a1c) {
      return
    }
    _0x4fcf54.seedsCollected = true
    _0x3dfc3b()
    !_0x4fcf54.requester
      ? _0x10c10a(
          'You got all the shit, put it in the trunk and give us a bit to give you a safe dropoff, keep moving.'
        )
      : _0x35a5e3.emitNet(
          'ev-heroin:seeds:emailRelay',
          _0x4fcf54.id,
          'The runner has all the shit now.'
        )
    _0x34320e()
  })
  _0x35a5e3.onNet('ev-heroin:seeds:seedsCollected', () => {
    _0x4fcf54.seedsCollected = true
    _0x3dfc3b()
    if (!_0x4fcf54.requester) {
      _0x10c10a(
        'You got all the shit, put it in the trunk and give us a bit to give you a safe dropoff, keep moving.'
      )
    } else {
      _0x35a5e3.emitNet(
        'ev-heroin:seeds:emailRelay',
        _0x4fcf54.id,
        'The runner has all the shit now.'
      )
    }
    _0x34320e()
  })
  _0x35a5e3.onNet('ev-heroin:seeds:seedPedsSpawned', (_0x2122ec, _0x3fc9be) => {
    _0x2d7993[_0x2122ec] &&
      _0x2d7993[_0x2122ec].length > 0 &&
      (_0x2d7993[_0x2122ec] = [])
  })
  const _0x1e7b66 = async () => {
    if (_0x4fcf54.netId) {
      return
    }
    const _0xb2c25f = await _0x1a19ef.execute('ev-heroin:seeds:spawnCar')
    if (!_0xb2c25f) {
      return
    }
    _0x4fcf54.netId = _0xb2c25f
    const _0x5f9093 = NetworkGetEntityFromNetworkId(_0xb2c25f)
    _0x381737.g.exports['ev-sync'].SyncedExecution(
      'SetVehicleTyresCanBurst',
      _0x5f9093,
      false
    )
    emitNet(
      'np:vehicles:hotPlate',
      GetVehicleNumberPlateText(_0x5f9093),
      '10-60'
    )
  }
  _0x35a5e3.onNet('ev-heroin:seeds:carStolen', () => {
    if (!_0x4fcf54) {
      return
    }
    if (_0x4fcf54.carStolen) {
      return
    }
    _0x4fcf54.carStolen = true
    if (!_0x4fcf54.requester) {
      _0x10c10a('Pick up the goods here, you might get into some resistance.')
    } else {
      emit('DoLongHudText', 'Please wait for further instructions.')
      _0x35a5e3.emitNet(
        'ev-heroin:seeds:emailRelay',
        _0x4fcf54.id,
        'The runner has stolen the vehicle.'
      )
    }
    _0x4e8bf4(_0x4fcf54.locations.seed.position, 'Pickup the goods here')
  })
  _0x35a5e3.onNet('ev-heroin:seeds:dropoffReceived', () => {
    if (!_0x4fcf54) {
      return
    }
    _0x4fcf54.dropOffReceived = true
    !_0x4fcf54.requester
      ? _0x10c10a('Dropoff location located. Head there now.')
      : (_0x35a5e3.emitNet(
          'ev-heroin:seeds:emailRelay',
          _0x4fcf54.id,
          'The dropoff has been determined.'
        ),
        _0x35a5e3.emitNet(
          'ev-heroin:seeds:sendDropoffToRequester',
          _0x4fcf54.id,
          _0x4fcf54.locations.dropoff
        ))
    _0x4e8bf4(_0x4fcf54.locations.dropoff.position, 'Drop off goods')
  })
  _0x35a5e3.onNet('ev-heroin:seeds:syncShootingPed', async (_0x18d50b) => {
    await _0x32d639.waitForCondition(
      () => NetworkGetEntityFromNetworkId(_0x18d50b.netId) > 0,
      5000
    )
    const _0x403160 = NetworkGetEntityFromNetworkId(_0x18d50b.netId)
    if (_0x403160 === 0) {
      return
    }
    const [, _0x2ad919] = GetGroundZFor_3dCoord(
      _0x18d50b.position.x,
      _0x18d50b.position.y,
      _0x18d50b.position.z + 10,
      true
    )
    SetEntityCoords(
      _0x403160,
      _0x18d50b.position.x,
      _0x18d50b.position.y,
      _0x2ad919,
      true,
      false,
      false,
      false
    )
    IsPedDeadOrDying(_0x403160, true) &&
      (SetEntityHealth(_0x403160, 200), ResurrectPed(_0x403160))
    SetPedArmour(_0x403160, 100)
    SetPedRelationshipGroupHash(_0x403160, GetHashKey('SECURITY_GUARD'))
    SetEntityAsMissionEntity(_0x403160, false, false)
    TaskCombatPed(
      _0x403160,
      NetworkGetEntityFromNetworkId(_0x18d50b.remotePlayer),
      0,
      16
    )
    SetPedDropsWeaponsWhenDead(_0x403160, false)
    SetBlockingOfNonTemporaryEvents(_0x403160, true)
    SetPedKeepTask(_0x403160, true)
    SetPedDiesWhenInjured(_0x403160, false)
    SetPedCombatAbility(_0x403160, 100)
    SetPedCombatAttributes(_0x403160, 46, true)
    SetPedCombatAttributes(_0x403160, 5, true)
    SetPedCombatMovement(_0x403160, 2)
    GiveWeaponToPed(_0x403160, _0x18d50b.gun, 1000, false, true)
    if (_0x18d50b.pattern) {
      SetPedFiringPattern(_0x403160, _0x18d50b.pattern)
    }
  })
  on('ev-heroin:seeds:doDropoff', async (_0xc514c9, _0x5c9c16, _0x343559) => {
    if (!_0x4fcf54 || _0x4fcf54.id !== _0x343559.meta.seedsInfo.uuid) {
      return emit(
        'DoLongHudText',
        'You can not do this, the boss does not trust you.',
        2
      )
    }
    const _0x3aeefd = NetworkGetNetworkIdFromEntity(_0x5c9c16)
    if (_0x4fcf54.netId !== _0x3aeefd) {
      return emit('DoLongHudText', 'This is not the right car man.', 2)
    }
    const { success: _0x447576, reason: _0xe75236 } = await _0x1a19ef.execute(
      'ev-heroin:seeds:canDoDropoff'
    )
    if (!_0x447576) {
      return emit('DoLongHudText', _0xe75236, 2)
    }
    await _0x35bc14.loadAnim('anim@amb@clubhouse@tutorial@bkr_tut_ig3@')
    const _0x502dab = _0x5bbae8()
    TaskPlayAnim(
      PlayerPedId(),
      'anim@amb@clubhouse@tutorial@bkr_tut_ig3@',
      'machinic_loop_mechandplayer',
      8,
      -8,
      _0x502dab.dropoffTime,
      1,
      1,
      false,
      false,
      false
    )
    const _0x190929 = await _0x4c3bc5(
      _0x502dab.dropoffTime,
      'Dropping off goods',
      true
    )
    ClearPedTasks(PlayerPedId())
    if (_0x190929 !== 100) {
      return
    }
    const _0x1cb7f1 = await _0x1a19ef.execute('ev-heroin:seeds:doDropoff')
    if (!_0x1cb7f1) {
      return emit(
        'DoLongHudText',
        'Not able to drop off your goods, is all the shit there man?',
        2
      )
    }
    if (!_0x4fcf54.requester) {
      _0x10c10a(
        'Nice job, kid. Now get out of here, and get to our guy near great ocean to pick up the shit.'
      )
    } else {
      _0x35a5e3.emitNet(
        'ev-heroin:seeds:emailRelay',
        _0x4fcf54.id,
        'The dropoff has been completed.'
      )
      _0x10c10a('Nice job, kid. Now get out of here. Future instructions soon')
    }
    _0x4fcf54.droppedOff = true
    _0x3dfc3b()
  })
  _0x35a5e3.on('ev-heroin:seeds:getReward', async () => {
    const _0x2db480 = await _0x1a19ef.execute('ev-heroin:seeds:canGetReward')
    if (!_0x2db480) {
      return
    }
    const _0x9d0fa1 = await _0x1a19ef.execute('ev-heroin:seeds:getReward')
    if (!_0x9d0fa1) {
      return emit(
        'DoLongHudText',
        'Not able to get your reward, was the run completed?',
        2
      )
    }
    emit('DoLongHudText', 'You got the reward, now get out of here.')
  })
  _0x35a5e3.onNet('ev-heroin:seeds:emailRelay', (_0x41e6f0) => {
    _0x10c10a(_0x41e6f0)
  })
  const _0x34320e = () => {
      _0x2161da && clearTick(_0x2161da)
      let _0x52e9e1 = false,
        _0x19a125 = 0,
        _0x355623 = 0
      _0x2161da = setTick(async () => {
        const _0x2e5634 = _0x5bbae8()
        if (_0x19a125 >= _0x2e5634.threadLength) {
          clearTick(_0x2161da)
          return
        }
        if (!_0x427844.dropoff || !_0x4fcf54.dropOffReceived) {
          if (!_0x52e9e1) {
            _0x52e9e1 = true
            await _0x497f32()
          } else {
            const _0x24826b = _0x5b1019()
            if (_0x24826b) {
              _0x19a125++
              _0x355623 = 0
            } else {
              _0x355623++
              const _0x2840b2 = NetworkGetEntityFromNetworkId(_0x4fcf54.netId)
              _0x355623 >= 5 &&
                _0x2840b2 &&
                (emitNet(
                  'dispatch:svUpdatePosition',
                  _0x4fcf54.id,
                  _0x4ffe2f(GetEntityCoords(_0x2840b2, true))
                ),
                (_0x355623 = 0))
            }
          }
        }
        await _0x481f8f(_0x2e5634.alertTimeout)
      })
    },
    _0x497f32 = async () => {
      await _0x481f8f(
        _0x187d70(_0x5bbae8().minAlertPause, _0x5bbae8().maxAlertPause)
      )
      const _0x5d2781 = GetEntityCoords(PlayerPedId(), true),
        _0x43c534 = IsPedMale(PlayerPedId()),
        _0x50828e = GetLabelText(
          GetNameOfZone(_0x5d2781[0], _0x5d2781[1], _0x5d2781[2])
        ),
        [_0x260259] = GetStreetNameAtCoord(
          _0x5d2781[0],
          _0x5d2781[1],
          _0x5d2781[2]
        ),
        _0x286919 = GetStreetNameFromHashKey(_0x260259) + ', ' + _0x50828e,
        _0x4ee35c = _0x404d54(
          NetworkGetEntityFromNetworkId(_0x4fcf54.netId),
          GetEntityHeading(PlayerPedId())
        )
      emitNet(
        'dispatch:svNotify',
        Object.assign(Object.assign({}, _0x4ee35c), {
          gender: _0x43c534,
          firstStreet: _0x286919,
          dispatchCode: '10-37A',
          eventId: _0x4fcf54.id,
          isTracker: true,
          blipArea: 100,
          origin: _0x4ffe2f(_0x5d2781),
        })
      )
    },
    _0x5b1019 = () => {
      const _0x184c5d = NetworkGetEntityFromNetworkId(_0x4fcf54.netId)
      if (!_0x184c5d) {
        if (_0x50184d) {
          return false
        }
        return (
          _0x10c10a(
            'You have 5 minutes to return to the car before we call this job off, you cant leave this car with strangers.'
          ),
          (_0x50184d = setTimeout(() => {
            const _0x2ef5ee = NetworkGetEntityFromNetworkId(_0x4fcf54.netId)
            !_0x2ef5ee &&
              _0x4fcf54 &&
              !_0x4fcf54.droppedOff &&
              emit('ev-heroin:seeds:cancelTask')
          }, 300000)),
          false
        )
      }
      _0x50184d && (clearTimeout(_0x50184d), (_0x50184d = null))
      const _0x1a083a = GetGamePool('CPed')
      let _0x476a45 = null
      for (const _0x2e46d2 of _0x1a083a) {
        if (
          !_0x476a45 &&
          !IsPedDeadOrDying(_0x2e46d2, true) &&
          !IsPedAPlayer(_0x2e46d2) &&
          !IsPedFleeing(_0x2e46d2) &&
          IsPedHuman(_0x2e46d2) &&
          NetworkGetEntityIsNetworked(_0x2e46d2) &&
          GetPedType(_0x2e46d2) !== 28 &&
          _0x4d1539(
            GetEntityCoords(_0x184c5d, true),
            GetEntityCoords(_0x2e46d2, true)
          ) < 75
        ) {
          _0x476a45 = _0x2e46d2
          break
        }
      }
      if (_0x476a45) {
        return (
          emitNet(
            'dispatch:svUpdatePosition',
            _0x4fcf54.id,
            _0x4ffe2f(GetEntityCoords(_0x184c5d, true))
          ),
          true
        )
      }
      return false
    },
    _0x1b4e39 = () => {
      _0x35a5e3.emitNet('ev-heroin:seeds:enterDespawnArea')
    },
    _0x1baa26 = async () => {
      _0x2161da && clearTick(_0x2161da)
      if (_0x38dc1e) {
        return
      }
      _0x38dc1e = true
      const _0x384264 = await _0x1a19ef.execute('ev-heroin:seeds:isAreaHot')
      if (_0x384264) {
        return _0x10c10a(
          "You're here, but the area is a bit fucking hot, come back when you got it sorted"
        )
      }
      _0x10c10a(
        "You're here, finally. Open the trunk, deliver the goods, and get the fuck out of here"
      )
    }
  _0x35a5e3.onNet('ev-heroin:seeds:rivalsSpawned', () => {
    if (!_0x4fcf54 || _0x4fcf54.requester) {
      return
    }
    _0x10c10a(
      "Listen, I've got word the spot may be crawling with some more rat bikers, take them out and deliver the goods"
    )
  })
  const _0x4e8bf4 = (_0x26d0d1, _0x10b104) => {
      if (_0x10b387) {
        _0x3dfc3b()
      }
      _0x10b387 = _0x557894(_0x26d0d1, _0x10b104)
    },
    _0x3dfc3b = () => {
      SetBlipRoute(_0x10b387, false)
      RemoveBlip(_0x10b387)
    },
    _0x49a900 = () => {
      for (const _0x3fb063 of Object.keys(_0x427844)) {
        _0x427844[_0x3fb063] = false
      }
      _0x38dc1e = false
    }
  _0x35a5e3.onNet('ev-heroin:seeds:jobCanceledMessage', () => {
    _0x10c10a('Job canceled. Boss is going to be disappointed about this.')
  })
  _0x35a5e3.onNet('ev-heroin:seeds:dropoffRelay', (_0x34cf7e) => {
    SetNewWaypoint(_0x34cf7e.position.x, _0x34cf7e.position.y)
  })
  const _0x369335 = (_0x13aa85) => {
      _0x381737.g.exports['ev-polyzone'].AddCircleZone(
        'heroinseeds_car_' + _0x13aa85.id,
        _0x13aa85.locations.vehicle.position,
        150,
        {
          heading: _0x13aa85.locations.vehicle.heading,
          data: { uuid: _0x13aa85.id },
        }
      )
      _0x381737.g.exports['ev-polyzone'].AddCircleZone(
        'heroinseeds_seeds_' + _0x13aa85.id,
        _0x13aa85.locations.seed.position,
        150,
        {
          heading: _0x13aa85.locations.seed.heading,
          data: { uuid: _0x13aa85.id },
        }
      )
      _0x381737.g.exports['ev-polyzone'].AddCircleZone(
        'heroinseeds_dropoff_' + _0x13aa85.id,
        _0x13aa85.locations.dropoff.position,
        10,
        {
          heading: _0x13aa85.locations.dropoff.heading,
          data: { uuid: _0x13aa85.id },
        }
      )
      _0x381737.g.exports['ev-polyzone'].AddCircleZone(
        'heroinseeds_dropoff_despawn_' + _0x13aa85.id,
        _0x13aa85.locations.dropoff.position,
        150,
        {
          heading: _0x13aa85.locations.dropoff.heading,
          data: { uuid: _0x13aa85.id },
        }
      )
    },
    _0x5bbae8 = () => {
      return _0x57c207('ev-heroin:job')
    }
  async function _0x4e4b8a() {
    await _0x2ba40e()
    await _0x567da3()
    await _0x32d639.waitForCondition(
      () => _0x381737.g.exports['ev-config'].IsConfigReady(),
      5000
    )
    _0x15a7f7()
    _0x365cf7()
    _0x1a8996()
    _0x2ce18d()
    _0x5102ed()
    _0x1a19ef.execute('ev-datagrid:subscribe', 'heroin')
  }
  ;(async () => {
    await _0x4e4b8a()
  })()
})()
