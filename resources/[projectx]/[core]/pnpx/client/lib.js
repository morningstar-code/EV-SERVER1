;(() => {
    'use strict'
    var _0x7ee5a2 = {
        50: function (_0x25c54b, _0x1f77a0, _0x30bea9) {
          var _0x59d2cb =
            (this && this['__importDefault']) ||
            function (_0x909b0d) {
              return _0x909b0d && _0x909b0d['__esModule']
                ? _0x909b0d
                : { default: _0x909b0d }
            }
          Object.defineProperty(_0x1f77a0, '__esModule', { value: true })
          const _0x512077 = _0x59d2cb(_0x30bea9(518)),
            _0x58a869 = _0x59d2cb(_0x30bea9(798)),
            _0x16f97d = _0x59d2cb(_0x30bea9(73)),
            _0x11bf22 = _0x59d2cb(_0x30bea9(649)),
            _0x321b0a = _0x59d2cb(_0x30bea9(292)),
            _0xe19e3f = _0x59d2cb(_0x30bea9(796)),
            _0x3471ac = _0x59d2cb(_0x30bea9(537)),
            _0x27fbef = {
              Events: _0x512077.default,
              Procedures: _0x58a869.default,
              Zones: _0x16f97d.default,
              Streaming: _0x11bf22.default,
              Utils: _0x321b0a.default,
              Interface: _0xe19e3f.default,
              Hud: _0x3471ac.default,
            }
          _0x30bea9.g.CPX = _0x27fbef
          setImmediate(() => {
            _0x30bea9.g.exports('GetLibrary', () => {
              return _0x27fbef
            })
          })
        },
        651: (_0x207135, _0x346fef) => {
          Object.defineProperty(_0x346fef, '__esModule', { value: true })
          const _0x1398ba = (_0xd5fc16) => {
              try {
                return JSON.stringify(_0xd5fc16)
              } catch (_0x28a866) {
                console.error('Failed to encode payload')
              }
            },
            _0x46a9ba = (_0x42fcc0) => {
              try {
                return JSON.parse(_0x42fcc0)
              } catch (_0x4134b9) {
                console.error('Failed to decode payload')
              }
            }
          _0x346fef.default = {
            encode: _0x1398ba,
            decode: _0x46a9ba,
          }
        },
        518: (_0x5abfd3, _0x2dc1ab) => {
          Object.defineProperty(_0x2dc1ab, '__esModule', { value: true })
          const _0x53aab5 = (_0x4f939c, _0x389479) => {
              return on(_0x4f939c, _0x389479)
            },
            _0x54e294 = (_0x2fd66a, _0x301525) => {
              return onNet(_0x2fd66a, _0x301525)
            },
            _0x5c7f3e = (_0x3bba0b, ..._0x13cd0b) => {
              return _0x1bf9a9.CWjrE(emit, _0x3bba0b, ..._0x13cd0b)
            },
            _0x465c38 = (_0x2fa6fd, ..._0x4e483e) => {
              const _0x2ce231 = msgpack_pack(_0x4e483e)
              _0x2ce231.length < 16000
                ? TriggerServerEventInternal(
                    _0x2fa6fd,
                    _0x2ce231,
                    _0x2ce231.length
                  )
                : TriggerLatentServerEventInternal(
                    _0x2fa6fd,
                    _0x2ce231,
                    _0x2ce231.length,
                    128000
                  )
            },
            _0x515f46 = (_0x236ab8, _0x461521) => {
              return _0x1bf9a9.CWjrE(removeEventListener, _0x236ab8, _0x461521)
            }
          _0x2dc1ab.default = {
            on: _0x53aab5,
            onNet: _0x54e294,
            emit: _0x5c7f3e,
            emitNet: _0x465c38,
            remove: _0x515f46,
          }
        },
        537: (_0x4df912, _0x8deb1e) => {
          Object.defineProperty(_0x8deb1e, '__esModule', { value: true })
          const _0x3efa08 = (_0x144731, ..._0x3fce37) => {
              switch (_0x144731) {
                case 'coord': {
                  const [_0x5679db, _0x55f66e, _0xc2d90e] = _0x3fce37
                  return AddBlipForCoord(_0x5679db, _0x55f66e, _0xc2d90e)
                }
                case 'area': {
                  const [_0x519c3b, _0x81bb0c, _0x2c13dd, _0x9c92b1, _0x1b736b] =
                    _0x3fce37
                  return AddBlipForArea(
                    _0x519c3b,
                    _0x81bb0c,
                    _0x2c13dd,
                    _0x9c92b1,
                    _0x1b736b
                  )
                }
                case 'radius': {
                  const [_0x17aee4, _0x196ea3, _0x2937d3, _0x3ed84c] = _0x3fce37
                  return AddBlipForRadius(
                    _0x17aee4,
                    _0x196ea3,
                    _0x2937d3,
                    _0x3ed84c
                  )
                }
                case 'pickup': {
                  const [_0xe9c894] = _0x3fce37
                  return AddBlipForPickup(_0xe9c894)
                }
                case 'entity': {
                  const [_0x1f7b80] = _0x3fce37
                  return AddBlipForEntity(_0x1f7b80)
                }
                default: {
                  return console.error(new Error('Invalid Blip Type')), 0
                }
              }
            },
            _0x5cf57e = (
              _0x1ee309,
              _0x1423e1,
              _0x45016f,
              _0x1763e3,
              _0x206c15,
              _0x2ee96a,
              _0x132d9e,
              _0x56ae9a
            ) => {
              if (typeof _0x45016f === 'number') {
                SetBlipSprite(_0x1ee309, _0x45016f)
              }
              if (typeof _0x1763e3 === 'number') {
                SetBlipColour(_0x1ee309, _0x1763e3)
              }
              if (typeof _0x206c15 === 'number') {
                SetBlipAlpha(_0x1ee309, _0x206c15)
              }
              if (typeof _0x2ee96a === 'number') {
                SetBlipScale(_0x1ee309, _0x2ee96a)
              }
              if (typeof _0x132d9e === 'boolean') {
                SetBlipRoute(_0x1ee309, _0x132d9e)
              }
              if (typeof _0x56ae9a === 'boolean') {
                SetBlipAsShortRange(_0x1ee309, _0x56ae9a)
              }
              typeof _0x1423e1 === 'string' &&
                (BeginTextCommandSetBlipName('STRING'),
                AddTextComponentString(_0x1423e1),
                EndTextCommandSetBlipName(_0x1ee309))
            }
          _0x8deb1e.default = {
            create: _0x3efa08,
            applySettings: _0x5cf57e,
          }
        },
        796: (_0x568e64, _0x350ccf, _0x3ed894) => {
          Object.defineProperty(_0x350ccf, '__esModule', { value: true })
          const _0x260e3c = (_0x18cc36, _0x39d0bd, _0x105d3d) => {
              return _0x3ed894.g.exports['ev-interact'].AddPeekEntryByModel(
                _0x18cc36,
                _0x39d0bd,
                _0x105d3d
              )
            },
            _0x273c58 = (_0xcd3250, _0x33e92a, _0x2abc96) => {
              return _0x3ed894.g.exports['ev-interact'].AddPeekEntryByPolyTarget(
                _0xcd3250,
                _0x33e92a,
                _0x2abc96
              )
            },
            _0x45b01a = (_0x2f28de, _0x151dca, _0x18d27f) => {
              return _0x3ed894.g.exports['ev-interact'].AddPeekEntryByFlag(
                _0x2f28de,
                _0x151dca,
                _0x18d27f
              )
            },
            _0x594271 = (
              _0x2e3aef,
              _0x2e94cf,
              _0x71cdf2 = false,
              _0xeddda5 = false
            ) => {
              return new Promise((_0x2ebb4a) => {
                return _0x3ed894.g.exports['ev-taskbar'].taskBar(
                  _0x2e3aef,
                  _0x2e94cf,
                  _0x71cdf2,
                  true,
                  null,
                  false,
                  _0x2ebb4a,
                  _0xeddda5 === null || _0xeddda5 === void 0
                    ? void 0
                    : _0xeddda5.distance,
                  _0xeddda5 === null || _0xeddda5 === void 0
                    ? void 0
                    : _0xeddda5.entity
                )
              })
            },
            _0xd3175c = (_0x568eb6, _0xaf3b3a, _0x526ad3) => {
              return new Promise((_0x43be76) => {
                return _0x3ed894.g.exports['ev-phone'].DoPhoneConfirmation(
                  _0x568eb6,
                  _0xaf3b3a,
                  _0x526ad3,
                  _0x43be76
                )
              })
            },
            _0x3ee6b2 = (_0x293a6e, _0x329c37, _0x582289, _0x45fbcb = true) => {
              return _0x3ed894.g.exports['ev-phone'].DoPhoneNotification(
                _0x293a6e,
                _0x329c37,
                _0x582289,
                _0x45fbcb
              )
            }
          _0x350ccf.default = {
            addPeekEntryByModel: _0x260e3c,
            addPeekEntryByTarget: _0x273c58,
            addPeekEntryByFlag: _0x45b01a,
            taskBar: _0x594271,
            phoneConfirmation: _0xd3175c,
            phoneNotification: _0x3ee6b2,
          }
        },
        798: function (_0x220251, _0x402f32, _0x2fea82) {
          var _0x16529a =
            (this && this['__importDefault']) ||
            function (_0x28f7f6) {
              return _0x28f7f6 && _0x28f7f6['__esModule']
                ? _0x28f7f6
                : { default: _0x28f7f6 }
            }
          Object.defineProperty(_0x402f32, '__esModule', { value: true })
          const _0x18ed84 = _0x16529a(_0x2fea82(518)),
            _0x3fe2fe = _0x16529a(_0x2fea82(651))
          let _0x549e40 = new Date().getTime()
          const _0x54469b = GetCurrentResourceName(),
            _0xe1fcdf = new Map(),
            _0x5609c9 = (_0x13bd13, _0x22906c) => {
              _0x18ed84.default.onNet(
                '__pnpx_req:' + _0x13bd13,
                async (_0xde05f3, _0x3f31c5) => {
                  let _0x5a36c1, _0x393c5
                  const _0x290d2f = _0x3fe2fe.default.decode(_0xde05f3)
                  if (!_0x290d2f) {
                    return console.log(
                      '[RPC] Received malformed packet:',
                      _0xde05f3
                    )
                  }
                  try {
                    _0x5a36c1 = await _0x474630.OCxQH(_0x22906c, ..._0x3f31c5)
                    _0x393c5 = true
                  } catch (_0x3acc6b) {
                    _0x5a36c1 = _0x3acc6b
                    _0x393c5 = false
                  }
                  if (_0x290d2f.type === 'remote') {
                    _0x18ed84.default.emitNet(
                      '__pnpx_res:' + _0x290d2f.origin,
                      _0x290d2f.id,
                      [_0x393c5, _0x5a36c1]
                    )
                  } else {
                    _0x290d2f.type === 'local' &&
                      _0x18ed84.default.emit(
                        '__pnpx_res:' + _0x290d2f.origin,
                        _0x290d2f.id,
                        [_0x393c5, _0x5a36c1]
                      )
                  }
                }
              )
            },
            _0x38bbc0 = (_0x16820d, ..._0x498094) => {
              let _0x1c9eb0 = GetPlayerServerId(PlayerId())
              const _0x1cd07c = {
                  id: _0x549e40++,
                  type: 'remote',
                  origin: _0x54469b,
                  src: _0x1c9eb0,
                  args: _0x498094,
                },
                _0x10ea7d = new Promise((_0x43e7ee, _0x4f7082) => {
                  const _0x1db543 = +setTimeout(
                    () => _0x4f7082('Remote call timed out | ' + _0x16820d),
                    60000
                  )
                  _0xe1fcdf.set(_0x1cd07c.id, {
                    resolve: _0x43e7ee,
                    reject: _0x4f7082,
                    timeout: _0x1db543,
                  })
                })
              return (
                _0x18ed84.default.emitNet(
                  '__pnpx_req:' + _0x16820d,
                  _0x3fe2fe.default.encode(_0x1cd07c),
                  _0x10ea7d.finally(() => _0xe1fcdf.delete(_0x1cd07c.id))
                ),
                _0x10ea7d
              )
            }
          _0x18ed84.default.onNet(
            '__pnpx_res:' + _0x54469b,
            (_0x162bb9, _0x236f17) => {
              const _0x253ae6 = _0xe1fcdf.get(_0x162bb9)
              if (!_0x253ae6) {
                return
              }
              clearTimeout(_0x253ae6.timeout)
              const [_0x14a32e, _0x224cbb] = _0x236f17
              _0x14a32e
                ? _0x253ae6.resolve(_0x224cbb)
                : _0x253ae6.reject(new Error(_0x224cbb))
              if (_0x253ae6) {
                clearTimeout(_0x253ae6.timeout)
                _0x253ae6.resolve(_0x224cbb)
              }
            }
          )
          _0x402f32.default = {
            register: _0x5609c9,
            execute: _0x38bbc0,
          }
        },
        649: function (_0xf5b15f, _0x28fe12, _0x513696) {
          var _0x338a22 =
            (this && this['__importDefault']) ||
            function (_0x17b2a2) {
              return _0x17b2a2 && _0x17b2a2['__esModule']
                ? _0x17b2a2
                : { default: _0x17b2a2 }
            }
          Object.defineProperty(_0x28fe12, '__esModule', { value: true })
          const _0x24fe8b = _0x338a22(_0x513696(292)),
            _0x3c04cf = async (_0x59bfa8) => {
              const _0x36598c =
                typeof _0x59bfa8 === 'number' ? _0x59bfa8 : GetHashKey(_0x59bfa8)
              if (HasModelLoaded(_0x36598c)) {
                return true
              }
              RequestModel(_0x36598c)
              const _0x467120 = await _0x24fe8b.default.waitForCondition(
                () => HasModelLoaded(_0x36598c),
                30000
              )
              return !_0x467120
            },
            _0x123041 = (_0x5335f6) => {
              if (HasAnimDictLoaded(_0x5335f6)) {
                return true
              }
              RequestAnimDict(_0x5335f6)
              const _0x1bf33a = _0x24fe8b.default.waitForCondition(
                () => HasAnimDictLoaded(_0x5335f6),
                30000
              )
              return !_0x1bf33a
            },
            _0x5350f1 = (_0x102279) => {
              if (HasClipSetLoaded(_0x102279)) {
                return true
              }
              RequestClipSet(_0x102279)
              const _0x3c4000 = _0x24fe8b.default.waitForCondition(
                () => HasClipSetLoaded(_0x102279),
                30000
              )
              return !_0x3c4000
            },
            _0x434d40 = (_0x38a4c1) => {
              if (HasStreamedTextureDictLoaded(_0x38a4c1)) {
                return true
              }
              RequestStreamedTextureDict(_0x38a4c1, true)
              const _0x50d34a = _0x24fe8b.default.waitForCondition(
                () => HasStreamedTextureDictLoaded(_0x38a4c1),
                30000
              )
              return !_0x50d34a
            },
            _0x4ca06f = (_0x5441f7, _0x78822a, _0x111b78) => {
              const _0x59b042 =
                typeof _0x5441f7 === 'number' ? _0x5441f7 : GetHashKey(_0x5441f7)
              if (HasWeaponAssetLoaded(_0x59b042)) {
                return true
              }
              RequestWeaponAsset(_0x59b042, _0x78822a, _0x111b78)
              const _0x90ada0 = _0x24fe8b.default.waitForCondition(
                () => HasWeaponAssetLoaded(_0x59b042),
                30000
              )
              return !_0x90ada0
            },
            _0x33f870 = (_0xe90bb2) => {
              if (HasNamedPtfxAssetLoaded(_0xe90bb2)) {
                return true
              }
              RequestNamedPtfxAsset(_0xe90bb2)
              const _0x1e8c50 = _0x24fe8b.default.waitForCondition(
                () => HasNamedPtfxAssetLoaded(_0xe90bb2),
                30000
              )
              return !_0x1e8c50
            }
          _0x28fe12.default = {
            loadModel: _0x3c04cf,
            loadTexture: _0x434d40,
            loadAnim: _0x123041,
            loadClipSet: _0x5350f1,
            loadWeaponAsset: _0x4ca06f,
            loadNamedPtfxAsset: _0x33f870,
          }
        },
        292: (_0x63d67d, _0x35a78e) => {
          Object.defineProperty(_0x35a78e, '__esModule', { value: true })
          const _0x3a07eb = (_0xb8e3f4, _0x595cfd) => {
              const _0x5b40b9 = _0x406922(
                  (_0x51e701, _0x544775, ..._0x5aa4f6) => {
                    return _0x5f0e2c.kBekg(_0xb8e3f4, _0x51e701, ..._0x5aa4f6)
                  },
                  _0x595cfd
                ),
                _0x111788 = {
                  get: (..._0xf3e881) => {
                    return _0x5b40b9.get('_', ..._0xf3e881)
                  },
                  reset: () => {
                    _0x5b40b9.reset('_')
                  },
                }
              return _0x111788
            },
            _0x406922 = (_0x2d40c4, _0x8aab45) => {
              const _0x333f10 = _0x8aab45.timeToLive || 60000,
                _0x483198 = {}
              async function _0x30d230(_0x3b9651, ..._0x2ddd3d) {
                let _0x5cd95f = _0x483198[_0x3b9651]
                !_0x5cd95f &&
                  ((_0x5cd95f = {
                    value: null,
                    lastUpdated: 0,
                  }),
                  (_0x483198[_0x3b9651] = _0x5cd95f))
                const _0x3ffd96 = Date.now()
                if (
                  _0x5cd95f.lastUpdated === 0 ||
                  _0x3ffd96 - _0x5cd95f.lastUpdated > _0x333f10
                ) {
                  const [_0x4659f2, _0x58b6bb] = await _0x27b3de.ADcAJ(
                    _0x2d40c4,
                    _0x5cd95f,
                    _0x3b9651,
                    ..._0x2ddd3d
                  )
                  if (_0x4659f2) {
                    _0x5cd95f.lastUpdated = _0x3ffd96
                    _0x5cd95f.value = _0x58b6bb
                  }
                  return _0x58b6bb
                }
                return _0x5cd95f.value
              }
              async function _0x309497(_0x27fd3a, ..._0x5986a7) {
                return await _0x4632a4.BZraA(_0x30d230, _0x27fd3a, ..._0x5986a7)
              }
              return (
                (_0x309497.reset = function (_0x36f4ec) {
                  const _0x217373 = _0x483198[_0x36f4ec]
                  if (_0x217373) {
                    _0x217373.lastUpdated = 0
                  }
                }),
                _0x309497
              )
            },
            _0x1e2670 = (_0x2ed841, _0x57d58c) => {
              return new Promise((_0x48c4cd) => {
                const _0x3e1f01 = Date.now(),
                  _0x350c9e = setTick(() => {
                    const _0x55a558 = { HQKEO: 'Failed to encode payload' },
                      _0x14a9b9 = Date.now() - _0x3e1f01 > _0x57d58c
                    if (_0x2ed841() || _0x14a9b9) {
                      clearTick(_0x350c9e)
                      _0x48c4cd(_0x14a9b9)
                    }
                  })
              })
            },
            _0x3a3bf7 = (_0x271b23, _0xc495c7, _0xa5cb64) => {
              return (
                _0xc495c7[0] +
                ((_0xa5cb64 - _0x271b23[0]) * (_0xc495c7[1] - _0xc495c7[0])) /
                  (_0x271b23[1] - _0x271b23[0])
              )
            },
            _0x2cb39b = (
              [_0x35aa4e, _0x2b7262, _0x39a251],
              [_0x1074b6, _0x1d19b4, _0xef863a]
            ) => {
              const [_0x3fabfb, _0x5f0e8c, _0x124456] = [
                _0x35aa4e - _0x1074b6,
                _0x2b7262 - _0x1d19b4,
                _0x39a251 - _0xef863a,
              ]
              return Math.sqrt(
                _0x3fabfb * _0x3fabfb +
                  _0x5f0e8c * _0x5f0e8c +
                  _0x124456 * _0x124456
              )
            },
            _0x56b8a0 = (_0x43351c, _0x37face) => {
              return Math.floor(
                _0x37face
                  ? Math.random() * (_0x37face - _0x43351c) + _0x43351c
                  : Math.random() * _0x43351c
              )
            }
          _0x35a78e.default = {
            cache: _0x3a07eb,
            cacheableMap: _0x406922,
            waitForCondition: _0x1e2670,
            getMapRange: _0x3a3bf7,
            getDistance: _0x2cb39b,
            getRandomNumber: _0x56b8a0,
          }
        },
        73: (_0x586cc4, _0x459c30, _0x18a0c1) => {
          Object.defineProperty(_0x459c30, '__esModule', { value: true })
          const _0x4a9d29 = new Set(),
            _0x472fb6 = new Map()
          on('ev-polyzone:enter', (_0x17f2f0, _0x372c8b) => {
            _0x4a9d29.add(_0x17f2f0)
          })
          on('ev-polyzone:exit', (_0x5cb641, _0x4a908e) => {
            _0x4a9d29.delete(_0x5cb641)
          })
          const _0x54c85a = (_0x944f56, _0x33b337) => {
              return _0x4a9d29.has(
                _0x33b337 ? _0x944f56 + '-' + _0x33b337 : _0x944f56
              )
            },
            _0x4308f2 = (_0x5d5dc2, _0x3b53aa) => {
              const _0x2ac72d = _0x5d5dc2 + '-enter',
                _0x4ebbf3 = _0x472fb6.get(_0x2ac72d) ?? []
              if (!_0x472fb6.has(_0x2ac72d)) {
                _0x472fb6.set(_0x2ac72d, _0x4ebbf3)
              }
              _0x4ebbf3.push(_0x3b53aa)
            },
            _0x323738 = (_0x3bff96, _0x27bb9c) => {
              const _0x3ab9ae = _0x3bff96 + '-exit',
                _0x37059b = _0x472fb6.get(_0x3ab9ae) ?? []
              if (!_0x472fb6.has(_0x3ab9ae)) {
                _0x472fb6.set(_0x3ab9ae, _0x37059b)
              }
              _0x37059b.push(_0x27bb9c)
            },
            _0x157c89 = (
              _0x2998c9,
              _0x5c609c,
              _0x4c4381,
              _0x32b4ac,
              _0x5d3fe3,
              _0x2d3e97,
              _0x4c6731 = {}
            ) => {
              const _0x398b10 = {
                ..._0x2d3e97,
                data: _0x4c6731 ?? {},
              }
              _0x398b10.data.id = _0x2998c9
              _0x18a0c1.g.exports['ev-polyzone'].AddBoxZone(
                _0x5c609c,
                _0x4c4381,
                _0x32b4ac,
                _0x5d3fe3,
                _0x398b10
              )
            },
            _0x4ce7e0 = (
              _0x2569e2,
              _0x1970b0,
              _0x4148f0,
              _0x2b9e93,
              _0x408c35,
              _0x51033f,
              _0x1f3f24 = {}
            ) => {
              const _0xf36dec = {
                ..._0x51033f,
                data: _0x1f3f24,
              }
              _0xf36dec.data.id = _0x2569e2
              _0x18a0c1.g.exports['ev-polytarget'].AddBoxZone(
                _0x1970b0,
                _0x4148f0,
                _0x2b9e93,
                _0x408c35,
                _0xf36dec
              )
            }
          _0x459c30.default = {
            isActive: _0x54c85a,
            onEnter: _0x4308f2,
            onExit: _0x323738,
            addBoxZone: _0x157c89,
            addBoxTarget: _0x4ce7e0,
          }
        },
      },
      _0x16a401 = {}
    function _0x2ba5af(_0x303861) {
      var _0x678ef4 = _0x16a401[_0x303861]
      if (_0x678ef4 !== undefined) {
        return _0x678ef4.exports
      }
      var _0x5d1580 = (_0x16a401[_0x303861] = { exports: {} })
      _0x7ee5a2[_0x303861].call(
        _0x5d1580.exports,
        _0x5d1580,
        _0x5d1580.exports,
        _0x2ba5af
      )
      return _0x5d1580.exports
    }
    ;(() => {
      _0x2ba5af.g = (function () {
        if (typeof globalThis === 'object') {
          return globalThis
        }
        try {
          return this || new Function('return this')()
        } catch (_0x46ac92) {
          if (typeof window === 'object') {
            return window
          }
        }
      })()
    })()
    var _0x533354 = {}
    ;(() => {
      var _0x14d6f0 = _0x533354,
        _0x59476f
      _0x59476f = { value: true }
      _0x2ba5af(50)
    })()
  })()
  