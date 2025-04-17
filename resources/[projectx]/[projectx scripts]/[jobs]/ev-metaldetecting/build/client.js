;(() => {
  'use strict'
  var _0x359b5f = {
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x14feff) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
  }
  ;(() => {})()
  var _0x776d1b = {}
  const _0x53cd39 = [
    GetHashKey('ROCK_9'),
    GetHashKey('ROCK_MOSSY_10'),
    GetHashKey('STONE_11'),
    GetHashKey('COBBLESTONE_12'),
    GetHashKey('SANDSTONE_SOLID_16'),
    GetHashKey('SANDSTONE_BRITTLE_17'),
    GetHashKey('SAND_LOOSE_18'),
    GetHashKey('SAND_COMPACT_19'),
    GetHashKey('SAND_WET_20'),
    GetHashKey('SAND_TRACK_21'),
    GetHashKey('SAND_DRY_DEEP_23'),
    GetHashKey('SAND_WET_DEEP_24'),
    GetHashKey('ICE_24'),
    GetHashKey('SNOW_LOOSE_26'),
    GetHashKey('SNOW_COMPACT_27'),
    GetHashKey('SNOW_DEEP_28'),
    GetHashKey('GRAVEL_SMALL_31'),
    GetHashKey('GRAVEL_LARGE_32'),
    GetHashKey('GRAVEL_DEEP_33'),
    GetHashKey('DIRT_TRACK_35'),
    GetHashKey('MUD_HARD_36'),
    GetHashKey('MUD_SOFT_38'),
    GetHashKey('MUD_DEEP_40'),
    GetHashKey('MARSH_41'),
    GetHashKey('MARSH_DEEP_42'),
    GetHashKey('SOIL_43'),
    GetHashKey('CLAY_HARD_44'),
    GetHashKey('CLAY_SOFT_45'),
    GetHashKey('GRASS_LONG_46'),
    GetHashKey('GRASS_47'),
    GetHashKey('GRASS_SHORT_48'),
  ]
  const _0x1f3bf5 = () => {
    const _0x5cf04c = [],
      _0x32ed86 = {},
      _0x19f058 = [],
      _0x3b0b52 = (_0x3c5b50) => {
        _0x19f058.push(_0x3c5b50)
      },
      _0x3c438f = () => _0x19f058,
      _0x52b3d7 = (_0x1d5fc0, _0x8c583e) => {
        const _0x160401 = _0x1d5fc0 + '/' + _0x8c583e
        if (_0x32ed86[_0x160401]) {
          return null
        }
        const _0x146255 = _0x19f058.find(
          ({
            seed: _0x209ce8,
            location: _0x2a1915,
            radius: _0x28e29f,
            oneIn: _0x23d3d8,
          }) =>
            (_0x2a1915[0] - _0x1d5fc0) ** 2 + (_0x2a1915[1] - _0x8c583e) ** 2 <
              _0x28e29f ** 2 &&
            Math.abs(GetHashKey(_0x209ce8 + '/' + _0x160401)) % _0x23d3d8 === 0
        )
        return (
          (_0x146255 === null || _0x146255 === void 0
            ? void 0
            : _0x146255.lootTable) || null
        )
      },
      _0x22cc3d = (_0x3ec287, _0x3fbd16) => {
        _0x32ed86[_0x3ec287 + '/' + _0x3fbd16] = true
        _0x5cf04c.push([_0x3ec287, _0x3fbd16])
      },
      _0x3e1da5 = () => _0x5cf04c,
      _0x15fcce = {}
    return (
      (_0x15fcce.addArea = _0x3b0b52),
      (_0x15fcce.getLootTable = _0x52b3d7),
      (_0x15fcce.getAreas = _0x3c438f),
      (_0x15fcce.addIgnoreLocation = _0x22cc3d),
      (_0x15fcce.getIgnoreLocations = _0x3e1da5),
      _0x15fcce
    )
  }
  var _0x149db5
  ;(function (_0x1861ae) {
    _0x1861ae.AIRP = 'Los Santos International Airport'
    _0x1861ae.ALAMO = 'Alamo Sea'
    _0x1861ae.ALTA = 'Alta'
    _0x1861ae.ARMYB = 'Fort Zancudo'
    _0x1861ae.BANHAMC = 'Banham Canyon Dr'
    _0x1861ae.BANNING = 'Banning'
    _0x1861ae.BEACH = 'Vespucci Beach'
    _0x1861ae.BHAMCA = 'Banham Canyon'
    _0x1861ae.BRADP = 'Braddock Pass'
    _0x1861ae.BRADT = 'Braddock Tunnel'
    _0x1861ae.BURTON = 'Burton'
    _0x1861ae.CALAFB = 'Calafia Bridge'
    _0x1861ae.CANNY = 'Raton Canyon'
    _0x1861ae.CCREAK = 'Cassidy Creek'
    _0x1861ae.CHAMH = 'Chamberlain Hills'
    _0x1861ae.CHIL = 'Vinewood Hills'
    _0x1861ae.CHU = 'Chumash'
    _0x1861ae.CMSW = 'Chiliad Mountain State Wilderness'
    _0x1861ae.CYPRE = 'Cypress Flats'
    _0x1861ae.DAVIS = 'Davis'
    _0x1861ae.DELBE = 'Del Perro Beach'
    _0x1861ae.DELPE = 'Del Perro'
    _0x1861ae.DELSOL = 'La Puerta'
    _0x1861ae.DESRT = 'Grand Senora Desert'
    _0x1861ae.DOWNT = 'Downtown'
    _0x1861ae.DTVINE = 'Downtown Vinewood'
    _0x1861ae.EAST_V = 'East Vinewood'
    _0x1861ae.EBURO = 'El Burro Heights'
    _0x1861ae.ELGORL = 'El Gordo Lighthouse'
    _0x1861ae.ELYSIAN = 'Elysian Island'
    _0x1861ae.GALFISH = 'Galilee'
    _0x1861ae.GOLF = 'GWC and Golfing Society'
    _0x1861ae.GRAPES = 'Grapeseed'
    _0x1861ae.GREATC = 'Great Chaparral'
    _0x1861ae.HARMO = 'Harmony'
    _0x1861ae.HAWICK = 'Hawick'
    _0x1861ae.HORS = 'Vinewood Racetrack'
    _0x1861ae.HUMLAB = 'Humane Labs and Research'
    _0x1861ae.JAIL = 'Bolingbroke Penitentiary'
    _0x1861ae.KOREAT = 'Little Seoul'
    _0x1861ae.LACT = 'Land Act Reservoir'
    _0x1861ae.LAGO = 'Lago Zancudo'
    _0x1861ae.LDAM = 'Land Act Dam'
    _0x1861ae.LEGSQU = 'Legion Square'
    _0x1861ae.LMESA = 'La Mesa'
    _0x1861ae.LOSPUER = 'La Puerta'
    _0x1861ae.MIRR = 'Mirror Park'
    _0x1861ae.MORN = 'Morningwood'
    _0x1861ae.MOVIE = 'Richards Majestic'
    _0x1861ae.MTCHIL = 'Mount Chiliad'
    _0x1861ae.MTGORDO = 'Mount Gordo'
    _0x1861ae.MTJOSE = 'Mount Josiah'
    _0x1861ae.MURRI = 'Murrieta Heights'
    _0x1861ae.NCHU = 'North Chumash'
    _0x1861ae.NOOSE = 'N.O.O.S.E'
    _0x1861ae.OCEANA = 'Pacific Ocean'
    _0x1861ae.PALCOV = 'Paleto Cove'
    _0x1861ae.PALETO = 'Paleto Bay'
    _0x1861ae.PALFOR = 'Paleto Forest'
    _0x1861ae.PALHIGH = 'Palomino Highlands'
    _0x1861ae.PALMPOW = 'Palmer-Taylor Power Station'
    _0x1861ae.PBLUFF = 'Pacific Bluffs'
    _0x1861ae.PBOX = 'Pillbox Hill'
    _0x1861ae.PROCOB = 'Procopio Beach'
    _0x1861ae.RANCHO = 'Rancho'
    _0x1861ae.RGLEN = 'Richman Glen'
    _0x1861ae.RICHM = 'Richman'
    _0x1861ae.ROCKF = 'Rockford Hills'
    _0x1861ae.RTRAK = 'Redwood Lights Track'
    _0x1861ae.SANAND = 'San Andreas'
    _0x1861ae.SANCHIA = 'San Chianski Mountain Range'
    _0x1861ae.SANDY = 'Sandy Shores'
    _0x1861ae.SKID = 'Mission Row'
    _0x1861ae.SLAB = 'Stab City'
    _0x1861ae.STAD = 'Maze Bank Arena'
    _0x1861ae.STRAW = 'Strawberry'
    _0x1861ae.TATAMO = 'Tataviam Mountains'
    _0x1861ae.TERMINA = 'Terminal'
    _0x1861ae.TEXTI = 'Textile City'
    _0x1861ae.TONGVAH = 'Tongva Hills'
    _0x1861ae.TONGVAV = 'Tongva Valley'
    _0x1861ae.VCANA = 'Vespucci Canals'
    _0x1861ae.VESP = 'Vespucci'
    _0x1861ae.VINE = 'Vinewood'
    _0x1861ae.WINDF = 'Ron Alternates Wind Farm'
    _0x1861ae.WVINE = 'West Vinewood'
    _0x1861ae.ZANCUDO = 'Zancudo River'
    _0x1861ae.ZP_ORT = 'Port of South Los Santos'
    _0x1861ae.ZQ_UAR = 'Davis Quartz'
  })(_0x149db5 || (_0x149db5 = {}))
  const _0x15fcde = () => {
    onNet('ev-metaldetecting:alertMeteor', async (_0x346af5) => {
      const [_0x32e984, _0x3f9e9d] = _0x346af5,
        _0x59498b = GetNameOfZone(_0x32e984, _0x3f9e9d, 40),
        _0x33253c = _0x149db5[_0x59498b],
        _0x543421 = 'BREAKING',
        _0x5977ec =
          'Early reports indicate a meteor impact around the area of ' +
          _0x33253c +
          ' within the next 5-10 minutes. Extreme caution is advised.',
        _0x32c1e2 = {
          i18n: [
            'Early reports indicate a meteor impact around the area of',
            'within the next 5-10 minutes. Extreme caution is advised.',
          ],
        }
      emit('phone:emailReceived', 'News', _0x543421, _0x5977ec, _0x32c1e2)
    })
    onNet('ev-metaldetecting:runMeteor', async (_0x504b47) => {
      const _0x22b041 = GetHashKey('prop_test_boulder_03')
      RequestModel(_0x22b041)
      while (!HasModelLoaded(_0x22b041)) {
        await new Promise((_0x26f982) => setTimeout(_0x26f982, 10))
      }
      RequestNamedPtfxAsset('core')
      while (!HasNamedPtfxAssetLoaded('core')) {
        await new Promise((_0x670ac4) => setTimeout(_0x670ac4, 10))
      }
      UseParticleFxAssetNextCall('core')
      SetPtfxAssetNextCall('core')
      const _0x535a30 = CreateObject(
          _0x22b041,
          _0x504b47[0],
          _0x504b47[1],
          2000,
          false,
          true,
          false
        ),
        _0x24a304 = StartParticleFxLoopedOnEntity(
          'fire_petroltank_heli',
          _0x535a30,
          0,
          0,
          0,
          0,
          0,
          10 + Math.random() * 20,
          35,
          false,
          false,
          false
        )
      ActivatePhysics(_0x535a30)
      SetObjectPhysicsParams(_0x535a30, 2, -0.1, 0, 0, 0, 0, 0, 0, -1, -1, -1)
      SetEntityLodDist(_0x535a30, 3000)
      const [, _0x15ca4b] = GetGroundZFor_3dCoord(
        _0x504b47[0],
        _0x504b47[1],
        2000,
        false
      )
      let _0x5ac413 = [null, null, null],
        _0x7d9c1f = setTick(async () => {
          const _0x2df30a = GetEntityCoords(_0x535a30, true),
            [_0x5d89ea, _0x16591b, _0x38825c] = _0x2df30a
          DrawLightWithRange(
            _0x5d89ea,
            _0x16591b,
            _0x38825c,
            255,
            255,
            255,
            5000,
            30
          )
          const _0x285fe8 =
              (_0x5ac413[0] !== null && _0x5d89ea !== _0x5ac413[0]) ||
              (_0x5ac413[1] !== null && _0x16591b !== _0x5ac413[1]),
            _0x5f41c2 = _0x5ac413[2] === null || _0x38825c !== _0x5ac413[2]
          _0x5ac413 = [_0x5d89ea, _0x16591b, _0x38825c]
          if (_0x38825c < _0x15ca4b + 3 || _0x285fe8 || !_0x5f41c2) {
            StopParticleFxLooped(_0x24a304, false)
            DeleteObject(_0x535a30)
            clearTick(_0x7d9c1f)
            RequestNamedPtfxAsset('core')
            while (!HasNamedPtfxAssetLoaded('core')) {
              await new Promise((_0x1ea614) => setTimeout(_0x1ea614, 10))
            }
            UseParticleFxAssetNextCall('core')
            SetPtfxAssetNextCall('core')
            AddExplosion(
              _0x504b47[0],
              _0x504b47[1],
              _0x15ca4b,
              18,
              1,
              true,
              false,
              1
            )
            StartParticleFxNonLoopedAtCoord(
              'exp_grd_train',
              _0x504b47[0],
              _0x504b47[1],
              _0x15ca4b + 70,
              0,
              0,
              0,
              60,
              false,
              false,
              false
            )
            UseParticleFxAssetNextCall('core')
            SetPtfxAssetNextCall('core')
            StartParticleFxNonLoopedAtCoord(
              'exp_grd_plane_sp',
              _0x504b47[0],
              _0x504b47[1],
              _0x15ca4b + 30,
              0,
              0,
              0,
              20,
              false,
              false,
              false
            )
            const _0x2c2b62 = PlayerPedId(),
              _0x5a670c = GetEntityCoords(_0x2c2b62, true),
              _0x121cdd = Math.sqrt(
                (_0x5a670c[0] - _0x5d89ea) ** 2 +
                  (_0x5a670c[1] - _0x16591b) ** 2
              )
            setTimeout(() => {
              AddExplosion(
                _0x5a670c[0],
                _0x5a670c[1],
                _0x5a670c[2] + 70,
                18,
                0,
                true,
                true,
                1
              )
              const _0x21fc90 = IsPedInFlyingVehicle(_0x2c2b62)
              if (_0x121cdd < 300 || (_0x21fc90 && _0x121cdd < 500)) {
                ;(_0x121cdd < 200 || _0x21fc90) &&
                  ClearPedTasksImmediately(_0x2c2b62)
                const _0x42039a = [
                    (_0x5a670c[0] - _0x504b47[0]) / _0x121cdd,
                    (_0x5a670c[1] - _0x504b47[1]) / _0x121cdd,
                  ],
                  _0x11900e = (1 - _0x121cdd / (_0x21fc90 ? 500 : 300)) * 7000
                SetPedToRagdoll(_0x2c2b62, 3000, 1000, 0, false, false, false)
                ApplyForceToEntity(
                  _0x2c2b62,
                  0,
                  _0x42039a[0] * _0x11900e,
                  _0x42039a[1] * _0x11900e,
                  _0x11900e * 0.35,
                  0,
                  0,
                  0,
                  0,
                  false,
                  true,
                  true,
                  false,
                  true
                )
                if (_0x21fc90) {
                  const _0x2f934c = GetVehiclePedIsIn(_0x2c2b62, false),
                    _0x5eb1a5 = NetworkGetEntityOwner(_0x2f934c)
                  if (_0x5eb1a5 === PlayerId()) {
                    ApplyForceToEntity(
                      _0x2c2b62,
                      0,
                      _0x42039a[0] * _0x11900e,
                      _0x42039a[1] * _0x11900e,
                      _0x11900e * 0.4,
                      0,
                      0,
                      0,
                      0,
                      false,
                      true,
                      true,
                      false,
                      true
                    )
                  }
                }
              }
            }, _0x121cdd * 0.4)
            DrawLightWithRange(
              _0x5a670c[0],
              _0x5a670c[1],
              _0x5a670c[2] + 20,
              20,
              20,
              20,
              1000,
              0.8
            )
            await new Promise((_0x4132f) => setTimeout(_0x4132f, 0))
            DrawLightWithRange(
              _0x5a670c[0],
              _0x5a670c[1],
              _0x5a670c[2] + 20,
              50,
              50,
              50,
              1000,
              0.8
            )
            await new Promise((_0x288758) => setTimeout(_0x288758, 0))
            DrawLightWithRange(
              _0x5a670c[0],
              _0x5a670c[1],
              _0x5a670c[2] + 20,
              50,
              50,
              50,
              1000,
              0.8
            )
            await new Promise((_0x11ce55) => setTimeout(_0x11ce55, 0))
            DrawLightWithRange(
              _0x5a670c[0],
              _0x5a670c[1],
              _0x5a670c[2] + 20,
              20,
              20,
              20,
              1000,
              0.8
            )
          }
        })
    })
  }
  let _0x3911c5 = []
  const _0x269081 = async (_0x37c2bd, _0x24acdc) => {
      const _0x151f05 = GetHashKey('prop_container_04a')
      RequestModel(_0x151f05)
      while (!HasModelLoaded(_0x151f05)) {
        await new Promise((_0x26d08f) => setTimeout(_0x26d08f, 10))
      }
      const _0x5b19ac = CreateObject(
        _0x151f05,
        _0x37c2bd[0],
        _0x37c2bd[1],
        _0x37c2bd[2],
        false,
        false,
        false
      )
      return (
        SetEntityRotation(
          _0x5b19ac,
          _0x24acdc[0],
          _0x24acdc[1],
          _0x24acdc[2],
          2,
          true
        ),
        FreezeEntityPosition(_0x5b19ac, true),
        _0x5b19ac
      )
    },
    _0x35ed37 = () => {
      setImmediate(async () => {
        _0x3911c5 = await RPC.execute('ev-metaldetecting:getContainers')
      })
      onNet(
        'ev-metaldetecting:runContainer',
        (_0x433fc4, _0x34ad0e, _0x5137f9) => {
          const _0x41bb0c = {
            location: _0x433fc4,
            rotation: _0x34ad0e,
          }
          _0x3911c5.push(_0x41bb0c)
          setTimeout(() => {
            if (
              _0x359b5f.g.exports['ev-inventory'].hasEnoughOfItem(
                'vpnxj',
                1,
                false,
                true
              )
            ) {
              const _0x3b9053 = GetNameOfZone(..._0x433fc4),
                _0x351e84 = _0x149db5[_0x3b9053],
                _0x4a225c = 'Tip off',
                _0x2ea685 =
                  'A washed up shipping container full of ' +
                  _0x5137f9 +
                  ' has been spotted near ' +
                  _0x351e84 +
                  '.',
                _0x2f7d42 = {
                  i18n: [
                    'A washed up shipping container full of',
                    _0x5137f9,
                    'has been spotted near',
                  ],
                }
              emit(
                'phone:emailReceived',
                'Dark Market',
                _0x4a225c,
                _0x2ea685,
                _0x2f7d42
              )
            }
          }, 5000)
        }
      )
      setInterval(() => {
        const _0x45e32a = PlayerPedId(),
          [_0x243c90, _0x43a94a, _0x34f245] = GetEntityCoords(_0x45e32a, true)
        _0x3911c5.forEach(async (_0x56a236) => {
          const {
            entityId: _0x25e0c9,
            location: _0x3e7104,
            rotation: _0x3b2fce,
          } = _0x56a236
          if (!_0x25e0c9 || !DoesEntityExist(_0x25e0c9)) {
            const [_0x445218, _0x429d7b, _0x18312c] = _0x3e7104
            ;(_0x445218 - _0x243c90) ** 2 +
              (_0x429d7b - _0x43a94a) ** 2 +
              (_0x18312c - _0x34f245) ** 2 <
              200 ** 2 &&
              (_0x56a236.entityId = await _0x269081(_0x3e7104, _0x3b2fce))
          }
        })
      }, 5000)
    }
  const _0x964ac0 = () => {
    _0x15fcde()
    _0x35ed37()
  }
  _0x964ac0()
  const _0x5c3250 = _0x1f3bf5()
  let _0x3ba4c2 = null,
    _0x117dbd = null,
    _0x3d50a6 = false,
    _0x8e1744 = 'default',
    _0x4ba52b = 1,
    _0x2f0252 = null,
    _0x4b3a69 = false,
    _0x4bd97f = null,
    _0x277dcb = 0
  const _0x1df3fc = () => {
      const _0x295f52 = PlayerPedId(),
        _0x1bcefa = GetEntityCoords(_0x295f52, true),
        _0x119049 = GetEntityForwardVector(_0x295f52),
        _0x48af80 = Math.round(_0x1bcefa[0] + _0x119049[0] * 0.3),
        _0x5ba75b = Math.round(_0x1bcefa[1] + _0x119049[1] * 0.3)
      return [_0x48af80, _0x5ba75b, _0x1bcefa[2]]
    },
    _0x487295 = ([_0x455ea9, _0x24797a, _0x1d99d7]) => {
      const _0x558c29 = StartShapeTestSweptSphere(
          _0x455ea9,
          _0x24797a,
          _0x1d99d7 + 3,
          _0x455ea9,
          _0x24797a,
          _0x1d99d7 - 100,
          0.2,
          1,
          PlayerPedId(),
          7
        ),
        [, _0x24ec9b, , , _0x18bd11] =
          GetShapeTestResultIncludingMaterial(_0x558c29)
      return _0x24ec9b && _0x53cd39.includes(_0x18bd11)
    },
    _0x3cc993 = () => {
      const _0x317479 = _0x1df3fc()
      let _0xebced1 = undefined
      for (let _0x53fc0f = -4; _0x53fc0f <= 4; _0x53fc0f++) {
        for (let _0x1472a0 = -4; _0x1472a0 <= 4; _0x1472a0++) {
          const _0x3310dc = _0x317479[0] + _0x1472a0,
            _0x329fe7 = _0x317479[1] + _0x53fc0f,
            _0x28f56c = _0x5c3250.getLootTable(_0x3310dc, _0x329fe7)
          if (_0x28f56c) {
            const _0x184c63 = _0x487295([_0x3310dc, _0x329fe7, _0x317479[2]])
            if (!_0x184c63) {
              _0x5c3250.addIgnoreLocation(_0x3310dc, _0x329fe7)
              continue
            }
            const _0x40a45d = (Math.abs(_0x3310dc * _0x329fe7) % 3) + 1
            if (_0x40a45d > _0x4ba52b) {
              continue
            }
            const _0x1e13a8 =
              1 -
              Math.max(
                0,
                Math.min(1, Math.sqrt(_0x1472a0 ** 2 + _0x53fc0f ** 2) / 6)
              )
            if (!_0xebced1 || _0x1e13a8 > _0xebced1.closeness) {
              const _0x5ea6df = {
                closeness: _0x1e13a8,
                x: _0x3310dc,
                y: _0x329fe7,
              }
              _0xebced1 = _0x5ea6df
            }
          }
        }
      }
      return _0xebced1
    },
    _0x37554b = () => {
      if (_0x3d50a6) {
        return
      }
      _0x3d50a6 = true
      _0x4bd97f = Date.now()
      _0x8e1744 = exports.emotes.GetAnimSet() || 'default'
      emit('attachItem', 'digiscanner')
      emit('Animation:Set:Gait', ['move_m@business@b'])
      _0x3ba4c2 = setInterval(() => {
        const _0x20c6ad = PlayerPedId()
        if (
          IsPedInAnyVehicle(_0x20c6ad, true) ||
          _0x359b5f.g.exports.isPed.isPed('intrunk')
        ) {
          return
        }
        ;(IsPedJumping(_0x20c6ad) ||
          (Math.random() < 0.15 &&
            exports.emotes.GetAnimSet() !== 'move_m@business@b')) &&
          SetPedToRagdoll(_0x20c6ad, 3000, 1000, 0, false, false, false)
        const _0x3d63b9 = _0x3cc993()
        if (_0x3d63b9) {
          const _0xdc42af = _0x3d63b9.closeness ** 2 / 2
          emitNet(
            'InteractSound_SV:PlayAudioFromPlayer',
            10,
            'beep',
            isNaN(_0xdc42af) ? 0.1 : _0xdc42af
          )
        }
      }, 1000)
      _0x117dbd = setTick(() => {
        DisableControlAction(0, 21, true)
      })
    },
    _0x48e342 = () => {
      _0x3d50a6 &&
        (clearInterval(_0x3ba4c2),
        clearTick(_0x117dbd),
        emit('destroyProp'),
        emit('Animation:Set:Gait', [_0x8e1744]),
        (_0x277dcb += Date.now() - _0x4bd97f))
      _0x3d50a6 = false
    },
    _0xdb7797 = async (_0x127448 = 1) => {
      _0x3d50a6 && _0x48e342()
      const _0x52cca1 = _0x3cc993()
      TaskStartScenarioInPlace(
        PlayerPedId(),
        'WORLD_HUMAN_GARDENER_PLANT',
        0,
        true
      )
      const _0x43d923 = await new Promise((_0x555da2) =>
        exports['ev-taskbar'].taskBar(
          5000,
          'Digging For Treasure...',
          false,
          true,
          null,
          false,
          _0x555da2
        )
      )
      ClearPedTasksImmediately(PlayerPedId())
      ClearPedSecondaryTask(PlayerPedId())
      if (_0x43d923 === 100) {
        if (_0x52cca1 && _0x52cca1.closeness > 0.5) {
          _0x277dcb = Math.min(_0x277dcb, 600000)
          const _0x4e3f57 = (_0x277dcb + 5000) / 1000,
            _0x1e875e = await RPC.execute(
              'ev-metaldetecting:digLocation',
              _0x52cca1.x,
              _0x52cca1.y,
              _0x127448,
              _0x4e3f57
            )
          _0x277dcb = 0
          if (_0x1e875e.length > 0) {
            emit('DoLongHudText', 'You found some treasure', 1)
            _0x1e875e.forEach((_0xfc8cc0) =>
              emit(
                'player:receiveItem',
                _0xfc8cc0.id,
                _0xfc8cc0.amount,
                _0xfc8cc0.generateInfo || false,
                _0xfc8cc0.metadata || {}
              )
            )
          } else {
            emit('DoLongHudText', 'Nothing was found here', 2)
          }
        } else {
          emit('DoLongHudText', 'Nothing was found here', 2)
        }
      }
    },
    _0x33cd70 = (_0x3f7d42, _0x4c620a) =>
      _0x5c3250.addIgnoreLocation(_0x3f7d42, _0x4c620a),
    _0x105572 = (_0x50eaa2) => _0x5c3250.addArea(_0x50eaa2),
    _0x43d219 = {
      metaldetector1: 1,
      metaldetector2: 2,
      metaldetector3: 3,
      metaldetector4: 4,
    }
  const _0x11d92b = _0x43d219,
    _0x5d4a4b = async () => {
      const { areas: _0x10dc48, alreadyDug: _0x160678 } = await RPC.execute(
        'ev-metaldetecting:fetchInitialVars'
      )
      _0x10dc48.forEach((_0x5cb3cf) => _0x5c3250.addArea(_0x5cb3cf))
      _0x160678.forEach((_0x32cae3) =>
        _0x5c3250.addIgnoreLocation(_0x32cae3[0], _0x32cae3[1])
      )
    },
    _0x1f5ed9 = async (_0x46724b, _0x2d09bb) => {
      _0x3d50a6 && _0x48e342()
      if (
        IsPedInAnyVehicle(PlayerPedId(), true) ||
        _0x359b5f.g.exports.isPed.isPed('intrunk')
      ) {
        return
      }
      const _0x302e28 =
        _0x46724b === 'metaldetector1' ||
        _0x46724b === 'metaldetector2' ||
        _0x46724b === 'metaldetector3' ||
        _0x46724b === 'metaldetector4'
      if (_0x302e28) {
        if (_0x2f0252 !== _0x46724b) {
          if (!_0x4b3a69) {
            await _0x5d4a4b()
            _0x4b3a69 = true
          }
          _0x4ba52b = _0x11d92b[_0x46724b]
          _0x2f0252 = _0x46724b
          _0x37554b()
        } else {
          _0x2f0252 = null
        }
      } else {
        _0x2f0252 = null
      }
      if (_0x46724b === 'trowel') {
        _0xdb7797(1)
        return
      }
      if (_0x46724b === 'powertrowel') {
        _0xdb7797(1 + Math.floor(Math.random() * 3))
        return
      }
    }
  on('ev-inventory:itemUsed', _0x1f5ed9)
  onNet('ev-metaldetecting:addArea', _0x105572)
  onNet('ev-metaldetecting:locationDug', _0x33cd70)
})()
