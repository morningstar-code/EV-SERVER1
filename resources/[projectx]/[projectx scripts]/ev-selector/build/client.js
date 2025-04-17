;(() => {
var _0x583055 = {}
_0x583055['313'] = (_0x2576be) => {
  var _0x27843c = (function () {
    'use strict'
    function _0x3dd232(_0x4766b3, _0x118293) {
      return _0x118293 != null && _0x4766b3 instanceof _0x118293
    }
    var _0xc2695
    try {
      _0xc2695 = Map
    } catch (_0x136ea0) {
      _0xc2695 = function () {}
    }
    var _0x46fa80
    try {
      _0x46fa80 = Set
    } catch (_0x2c8db3) {
      _0x46fa80 = function () {}
    }
    var _0x3f10c9
    try {
      _0x3f10c9 = Promise
    } catch (_0x4c4243) {
      _0x3f10c9 = function () {}
    }
    function _0x3e6ab5(
      _0x2dbe75,
      _0x3b7587,
      _0x1b1700,
      _0x5f5783,
      _0x3006c7
    ) {
      typeof _0x3b7587 === 'object' &&
        ((_0x1b1700 = _0x3b7587.depth),
        (_0x5f5783 = _0x3b7587.prototype),
        (_0x3006c7 = _0x3b7587.includeNonEnumerable),
        (_0x3b7587 = _0x3b7587.circular))
      var _0x3af4d7 = [],
        _0x3429a7 = [],
        _0x59e35f = typeof Buffer != 'undefined'
      if (typeof _0x3b7587 == 'undefined') {
        _0x3b7587 = true
      }
      if (typeof _0x1b1700 == 'undefined') {
        _0x1b1700 = Infinity
      }
      function _0x152765(_0x3beaf8, _0x8f3189) {
        if (_0x3beaf8 === null) {
          return null
        }
        if (_0x8f3189 === 0) {
          return _0x3beaf8
        }
        var _0xd08886, _0x487751
        if (typeof _0x3beaf8 != 'object') {
          return _0x3beaf8
        }
        if (_0x3dd232(_0x3beaf8, _0xc2695)) {
          _0xd08886 = new _0xc2695()
        } else {
          if (_0x3dd232(_0x3beaf8, _0x46fa80)) {
            _0xd08886 = new _0x46fa80()
          } else {
            if (_0x3dd232(_0x3beaf8, _0x3f10c9)) {
              _0xd08886 = new _0x3f10c9(function (_0x233389, _0x2dfcfd) {
                _0x3beaf8.then(
                  function (_0x275386) {
                    _0x233389(_0x152765(_0x275386, _0x8f3189 - 1))
                  },
                  function (_0x48761a) {
                    _0x2dfcfd(_0x152765(_0x48761a, _0x8f3189 - 1))
                  }
                )
              })
            } else {
              if (_0x3e6ab5['__isArray'](_0x3beaf8)) {
                _0xd08886 = []
              } else {
                if (_0x3e6ab5['__isRegExp'](_0x3beaf8)) {
                  _0xd08886 = new RegExp(
                    _0x3beaf8.source,
                    _0x120832(_0x3beaf8)
                  )
                  if (_0x3beaf8.lastIndex) {
                    _0xd08886.lastIndex = _0x3beaf8.lastIndex
                  }
                } else {
                  if (_0x3e6ab5['__isDate'](_0x3beaf8)) {
                    _0xd08886 = new Date(_0x3beaf8.getTime())
                  } else {
                    if (_0x59e35f && Buffer.isBuffer(_0x3beaf8)) {
                      return (
                        Buffer.allocUnsafe
                          ? (_0xd08886 = Buffer.allocUnsafe(_0x3beaf8.length))
                          : (_0xd08886 = new Buffer(_0x3beaf8.length)),
                        _0x3beaf8.copy(_0xd08886),
                        _0xd08886
                      )
                    } else {
                      if (_0x3dd232(_0x3beaf8, Error)) {
                        _0xd08886 = Object.create(_0x3beaf8)
                      } else {
                        if (typeof _0x5f5783 == 'undefined') {
                          _0x487751 = Object.getPrototypeOf(_0x3beaf8)
                          _0xd08886 = Object.create(_0x487751)
                        } else {
                          _0xd08886 = Object.create(_0x5f5783)
                          _0x487751 = _0x5f5783
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (_0x3b7587) {
          var _0x41c0cf = _0x3af4d7.indexOf(_0x3beaf8)
          if (_0x41c0cf != -1) {
            return _0x3429a7[_0x41c0cf]
          }
          _0x3af4d7.push(_0x3beaf8)
          _0x3429a7.push(_0xd08886)
        }
        _0x3dd232(_0x3beaf8, _0xc2695) &&
          _0x3beaf8.forEach(function (_0x268303, _0x5d6074) {
            var _0x308aed = _0x152765(_0x5d6074, _0x8f3189 - 1),
              _0x20b6f6 = _0x152765(_0x268303, _0x8f3189 - 1)
            _0xd08886.set(_0x308aed, _0x20b6f6)
          })
        if (_0x3dd232(_0x3beaf8, _0x46fa80)) {
          _0x3beaf8.forEach(function (_0x2f70e4) {
            var _0x26df7e = _0x152765(_0x2f70e4, _0x8f3189 - 1)
            _0xd08886.add(_0x26df7e)
          })
        }
        for (var _0x34fa2c in _0x3beaf8) {
          var _0x223240
          _0x487751 &&
            (_0x223240 = Object.getOwnPropertyDescriptor(
              _0x487751,
              _0x34fa2c
            ))
          if (_0x223240 && _0x223240.set == null) {
            continue
          }
          _0xd08886[_0x34fa2c] = _0x152765(
            _0x3beaf8[_0x34fa2c],
            _0x8f3189 - 1
          )
        }
        if (Object.getOwnPropertySymbols) {
          var _0x2ab653 = Object.getOwnPropertySymbols(_0x3beaf8)
          for (var _0x34fa2c = 0; _0x34fa2c < _0x2ab653.length; _0x34fa2c++) {
            var _0x337d65 = _0x2ab653[_0x34fa2c],
              _0x1f1122 = Object.getOwnPropertyDescriptor(
                _0x3beaf8,
                _0x337d65
              )
            if (_0x1f1122 && !_0x1f1122.enumerable && !_0x3006c7) {
              continue
            }
            _0xd08886[_0x337d65] = _0x152765(
              _0x3beaf8[_0x337d65],
              _0x8f3189 - 1
            )
            if (!_0x1f1122.enumerable) {
              var _0x48c639 = { enumerable: false }
              Object.defineProperty(_0xd08886, _0x337d65, _0x48c639)
            }
          }
        }
        if (_0x3006c7) {
          var _0x30f4d7 = Object.getOwnPropertyNames(_0x3beaf8)
          for (var _0x34fa2c = 0; _0x34fa2c < _0x30f4d7.length; _0x34fa2c++) {
            var _0x4efb2a = _0x30f4d7[_0x34fa2c],
              _0x1f1122 = Object.getOwnPropertyDescriptor(
                _0x3beaf8,
                _0x4efb2a
              )
            if (_0x1f1122 && _0x1f1122.enumerable) {
              continue
            }
            _0xd08886[_0x4efb2a] = _0x152765(
              _0x3beaf8[_0x4efb2a],
              _0x8f3189 - 1
            )
            var _0x4e9540 = { enumerable: false }
            Object.defineProperty(_0xd08886, _0x4efb2a, _0x4e9540)
          }
        }
        return _0xd08886
      }
      return _0x152765(_0x2dbe75, _0x1b1700)
    }
    _0x3e6ab5.clonePrototype = function _0x5641ea(_0x27a50d) {
      if (_0x27a50d === null) {
        return null
      }
      var _0x266694 = function () {}
      return (_0x266694.prototype = _0x27a50d), new _0x266694()
    }
    function _0x2f0fcb(_0x4b0e8e) {
      return Object.prototype.toString.call(_0x4b0e8e)
    }
    _0x3e6ab5['__objToStr'] = _0x2f0fcb
    function _0x403f1c(_0x1f6f47) {
      return (
        typeof _0x1f6f47 === 'object' &&
        _0x2f0fcb(_0x1f6f47) === '[object Date]'
      )
    }
    _0x3e6ab5['__isDate'] = _0x403f1c
    function _0x1447fc(_0x577391) {
      return (
        typeof _0x577391 === 'object' &&
        _0x2f0fcb(_0x577391) === '[object Array]'
      )
    }
    _0x3e6ab5['__isArray'] = _0x1447fc
    function _0x2ef4b4(_0x2ae520) {
      return (
        typeof _0x2ae520 === 'object' &&
        _0x2f0fcb(_0x2ae520) === '[object RegExp]'
      )
    }
    _0x3e6ab5['__isRegExp'] = _0x2ef4b4
    function _0x120832(_0x3ad2c5) {
      var _0x3dd44f = ''
      if (_0x3ad2c5.global) {
        _0x3dd44f += 'g'
      }
      if (_0x3ad2c5.ignoreCase) {
        _0x3dd44f += 'i'
      }
      if (_0x3ad2c5.multiline) {
        _0x3dd44f += 'm'
      }
      return _0x3dd44f
    }
    return (_0x3e6ab5['__getRegExpFlags'] = _0x120832), _0x3e6ab5
  })()
  if (true && _0x2576be.exports) {
    _0x2576be.exports = _0x27843c
  }
}
_0x583055['187'] = (_0x2c7899) => {
  'use strict'
  var _0x312cd7 = typeof Reflect === 'object' ? Reflect : null,
    _0xee41f6 =
      _0x312cd7 && typeof _0x312cd7.apply === 'function'
        ? _0x312cd7.apply
        : function _0x5ac90f(_0x27f4c5, _0x5757cf, _0x157219) {
            return Function.prototype.apply.call(
              _0x27f4c5,
              _0x5757cf,
              _0x157219
            )
          },
    _0x44d6e0
  if (_0x312cd7 && typeof _0x312cd7.ownKeys === 'function') {
    _0x44d6e0 = _0x312cd7.ownKeys
  } else {
    Object.getOwnPropertySymbols
      ? (_0x44d6e0 = function _0x23e39a(_0x119224) {
          return Object.getOwnPropertyNames(_0x119224).concat(
            Object.getOwnPropertySymbols(_0x119224)
          )
        })
      : (_0x44d6e0 = function _0x443fad(_0x3e5f94) {
          return Object.getOwnPropertyNames(_0x3e5f94)
        })
  }
  function _0x4e8129(_0x47c6ff) {
    if (console && console.warn) {
      console.warn(_0x47c6ff)
    }
  }
  var _0x1d228d =
    Number.isNaN ||
    function _0x30c953(_0x1ebfb6) {
      return _0x1ebfb6 !== _0x1ebfb6
    }
  function _0x48ef9e() {
    _0x48ef9e.init.call(this)
  }
  _0x2c7899.exports = _0x48ef9e
  _0x2c7899.exports.once = _0x287696
  _0x48ef9e.EventEmitter = _0x48ef9e
  _0x48ef9e.prototype['_events'] = undefined
  _0x48ef9e.prototype['_eventsCount'] = 0
  _0x48ef9e.prototype['_maxListeners'] = undefined
  var _0x31ee44 = 10
  function _0x2e6777(_0x3eff81) {
    if (typeof _0x3eff81 !== 'function') {
      throw new TypeError(
        'The "listener" argument must be of type Function. Received type ' +
          typeof _0x3eff81
      )
    }
  }
  var _0x1f06a2 = {
    enumerable: true,
    get: function () {
      return _0x31ee44
    },
    set: function (_0x4d8dd5) {
      if (
        typeof _0x4d8dd5 !== 'number' ||
        _0x4d8dd5 < 0 ||
        _0x1d228d(_0x4d8dd5)
      ) {
        throw new RangeError(
          'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
            _0x4d8dd5 +
            '.'
        )
      }
      _0x31ee44 = _0x4d8dd5
    },
  }
  Object.defineProperty(_0x48ef9e, 'defaultMaxListeners', _0x1f06a2)
  _0x48ef9e.init = function () {
    ;(this['_events'] === undefined ||
      this['_events'] === Object.getPrototypeOf(this)['_events']) &&
      ((this['_events'] = Object.create(null)), (this['_eventsCount'] = 0))
    this['_maxListeners'] = this['_maxListeners'] || undefined
  }
  _0x48ef9e.prototype.setMaxListeners = function _0x4ceb85(_0x5d4a29) {
    if (
      typeof _0x5d4a29 !== 'number' ||
      _0x5d4a29 < 0 ||
      _0x1d228d(_0x5d4a29)
    ) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' +
          _0x5d4a29 +
          '.'
      )
    }
    return (this['_maxListeners'] = _0x5d4a29), this
  }
  function _0xcd7ea2(_0x39ff86) {
    if (_0x39ff86['_maxListeners'] === undefined) {
      return _0x48ef9e.defaultMaxListeners
    }
    return _0x39ff86['_maxListeners']
  }
  _0x48ef9e.prototype.getMaxListeners = function _0x27a57d() {
    return _0xcd7ea2(this)
  }
  _0x48ef9e.prototype.emit = function _0x5c8c19(_0x51a8ff) {
    var _0x286d40 = []
    for (var _0x2a7936 = 1; _0x2a7936 < arguments.length; _0x2a7936++) {
      _0x286d40.push(arguments[_0x2a7936])
    }
    var _0x4affc7 = _0x51a8ff === 'error',
      _0x1afa46 = this['_events']
    if (_0x1afa46 !== undefined) {
      _0x4affc7 = _0x4affc7 && _0x1afa46.error === undefined
    } else {
      if (!_0x4affc7) {
        return false
      }
    }
    if (_0x4affc7) {
      var _0x29e57e
      if (_0x286d40.length > 0) {
        _0x29e57e = _0x286d40[0]
      }
      if (_0x29e57e instanceof Error) {
        throw _0x29e57e
      }
      var _0x484cbc = new Error(
        'Unhandled error.' + (_0x29e57e ? ' (' + _0x29e57e.message + ')' : '')
      )
      _0x484cbc.context = _0x29e57e
      throw _0x484cbc
    }
    var _0x13e5c5 = _0x1afa46[_0x51a8ff]
    if (_0x13e5c5 === undefined) {
      return false
    }
    if (typeof _0x13e5c5 === 'function') {
      _0xee41f6(_0x13e5c5, this, _0x286d40)
    } else {
      var _0x237a76 = _0x13e5c5.length,
        _0x46f66d = _0x2da694(_0x13e5c5, _0x237a76)
      for (var _0x2a7936 = 0; _0x2a7936 < _0x237a76; ++_0x2a7936) {
        _0xee41f6(_0x46f66d[_0x2a7936], this, _0x286d40)
      }
    }
    return true
  }
  function _0x3fc941(_0x336a89, _0x153cfe, _0xb5884c, _0xc6ddda) {
    var _0x56a123, _0x3d078d, _0x439a9a
    _0x2e6777(_0xb5884c)
    _0x3d078d = _0x336a89['_events']
    if (_0x3d078d === undefined) {
      _0x3d078d = _0x336a89['_events'] = Object.create(null)
      _0x336a89['_eventsCount'] = 0
    } else {
      _0x3d078d.newListener !== undefined &&
        (_0x336a89.emit(
          'newListener',
          _0x153cfe,
          _0xb5884c.listener ? _0xb5884c.listener : _0xb5884c
        ),
        (_0x3d078d = _0x336a89['_events']))
      _0x439a9a = _0x3d078d[_0x153cfe]
    }
    if (_0x439a9a === undefined) {
      _0x439a9a = _0x3d078d[_0x153cfe] = _0xb5884c
      ++_0x336a89['_eventsCount']
    } else {
      if (typeof _0x439a9a === 'function') {
        _0x439a9a = _0x3d078d[_0x153cfe] = _0xc6ddda
          ? [_0xb5884c, _0x439a9a]
          : [_0x439a9a, _0xb5884c]
      } else {
        if (_0xc6ddda) {
          _0x439a9a.unshift(_0xb5884c)
        } else {
          _0x439a9a.push(_0xb5884c)
        }
      }
      _0x56a123 = _0xcd7ea2(_0x336a89)
      if (
        _0x56a123 > 0 &&
        _0x439a9a.length > _0x56a123 &&
        !_0x439a9a.warned
      ) {
        _0x439a9a.warned = true
        var _0x3fdd96 = new Error(
          'Possible EventEmitter memory leak detected. ' +
            _0x439a9a.length +
            ' ' +
            String(_0x153cfe) +
            ' listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit'
        )
        _0x3fdd96.name = 'MaxListenersExceededWarning'
        _0x3fdd96.emitter = _0x336a89
        _0x3fdd96.type = _0x153cfe
        _0x3fdd96.count = _0x439a9a.length
        _0x4e8129(_0x3fdd96)
      }
    }
    return _0x336a89
  }
  _0x48ef9e.prototype.addListener = function _0x434266(_0x183903, _0x9bc6de) {
    return _0x3fc941(this, _0x183903, _0x9bc6de, false)
  }
  _0x48ef9e.prototype.on = _0x48ef9e.prototype.addListener
  _0x48ef9e.prototype.prependListener = function _0x189f77(
    _0x3fe7ec,
    _0x32000b
  ) {
    return _0x3fc941(this, _0x3fe7ec, _0x32000b, true)
  }
  function _0x532440() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn)
      this.fired = true
      if (arguments.length === 0) {
        return this.listener.call(this.target)
      }
      return this.listener.apply(this.target, arguments)
    }
  }
  function _0x39100e(_0x386c95, _0x1eac6a, _0x1290ee) {
    var _0x378274 = {
      fired: false,
      wrapFn: undefined,
      target: _0x386c95,
      type: _0x1eac6a,
      listener: _0x1290ee,
    }
    var _0x109d5d = _0x378274,
      _0x43a059 = _0x532440.bind(_0x109d5d)
    return (
      (_0x43a059.listener = _0x1290ee),
      (_0x109d5d.wrapFn = _0x43a059),
      _0x43a059
    )
  }
  _0x48ef9e.prototype.once = function _0x57f94a(_0x1c342f, _0x2ddeee) {
    return (
      _0x2e6777(_0x2ddeee),
      this.on(_0x1c342f, _0x39100e(this, _0x1c342f, _0x2ddeee)),
      this
    )
  }
  _0x48ef9e.prototype.prependOnceListener = function _0x10f469(
    _0x26cd2f,
    _0x3eacbc
  ) {
    return (
      _0x2e6777(_0x3eacbc),
      this.prependListener(_0x26cd2f, _0x39100e(this, _0x26cd2f, _0x3eacbc)),
      this
    )
  }
  _0x48ef9e.prototype.removeListener = function _0x39fe5a(
    _0x29b4b4,
    _0x2718b8
  ) {
    var _0x45f9fc, _0xaea888, _0x342214, _0x481841, _0x46d314
    _0x2e6777(_0x2718b8)
    _0xaea888 = this['_events']
    if (_0xaea888 === undefined) {
      return this
    }
    _0x45f9fc = _0xaea888[_0x29b4b4]
    if (_0x45f9fc === undefined) {
      return this
    }
    if (_0x45f9fc === _0x2718b8 || _0x45f9fc.listener === _0x2718b8) {
      if (--this['_eventsCount'] === 0) {
        this['_events'] = Object.create(null)
      } else {
        delete _0xaea888[_0x29b4b4]
        if (_0xaea888.removeListener) {
          this.emit(
            'removeListener',
            _0x29b4b4,
            _0x45f9fc.listener || _0x2718b8
          )
        }
      }
    } else {
      if (typeof _0x45f9fc !== 'function') {
        _0x342214 = -1
        for (_0x481841 = _0x45f9fc.length - 1; _0x481841 >= 0; _0x481841--) {
          if (
            _0x45f9fc[_0x481841] === _0x2718b8 ||
            _0x45f9fc[_0x481841].listener === _0x2718b8
          ) {
            _0x46d314 = _0x45f9fc[_0x481841].listener
            _0x342214 = _0x481841
            break
          }
        }
        if (_0x342214 < 0) {
          return this
        }
        if (_0x342214 === 0) {
          _0x45f9fc.shift()
        } else {
          _0x5799bb(_0x45f9fc, _0x342214)
        }
        if (_0x45f9fc.length === 1) {
          _0xaea888[_0x29b4b4] = _0x45f9fc[0]
        }
        if (_0xaea888.removeListener !== undefined) {
          this.emit('removeListener', _0x29b4b4, _0x46d314 || _0x2718b8)
        }
      }
    }
    return this
  }
  _0x48ef9e.prototype.off = _0x48ef9e.prototype.removeListener
  _0x48ef9e.prototype.removeAllListeners = function _0x33ad76(_0x3966a2) {
    var _0x1fd0af, _0x27a56a, _0xf2dc31
    _0x27a56a = this['_events']
    if (_0x27a56a === undefined) {
      return this
    }
    if (_0x27a56a.removeListener === undefined) {
      if (arguments.length === 0) {
        this['_events'] = Object.create(null)
        this['_eventsCount'] = 0
      } else {
        if (_0x27a56a[_0x3966a2] !== undefined) {
          if (--this['_eventsCount'] === 0) {
            this['_events'] = Object.create(null)
          } else {
            delete _0x27a56a[_0x3966a2]
          }
        }
      }
      return this
    }
    if (arguments.length === 0) {
      var _0x3e8ca2 = Object.keys(_0x27a56a),
        _0xf3c681
      for (_0xf2dc31 = 0; _0xf2dc31 < _0x3e8ca2.length; ++_0xf2dc31) {
        _0xf3c681 = _0x3e8ca2[_0xf2dc31]
        if (_0xf3c681 === 'removeListener') {
          continue
        }
        this.removeAllListeners(_0xf3c681)
      }
      return (
        this.removeAllListeners('removeListener'),
        (this['_events'] = Object.create(null)),
        (this['_eventsCount'] = 0),
        this
      )
    }
    _0x1fd0af = _0x27a56a[_0x3966a2]
    if (typeof _0x1fd0af === 'function') {
      this.removeListener(_0x3966a2, _0x1fd0af)
    } else {
      if (_0x1fd0af !== undefined) {
        for (_0xf2dc31 = _0x1fd0af.length - 1; _0xf2dc31 >= 0; _0xf2dc31--) {
          this.removeListener(_0x3966a2, _0x1fd0af[_0xf2dc31])
        }
      }
    }
    return this
  }
  function _0x3ec750(_0x143575, _0x179a44, _0x37e9a6) {
    var _0x31b560 = _0x143575['_events']
    if (_0x31b560 === undefined) {
      return []
    }
    var _0x2cdcf7 = _0x31b560[_0x179a44]
    if (_0x2cdcf7 === undefined) {
      return []
    }
    if (typeof _0x2cdcf7 === 'function') {
      return _0x37e9a6 ? [_0x2cdcf7.listener || _0x2cdcf7] : [_0x2cdcf7]
    }
    return _0x37e9a6
      ? _0x5752b5(_0x2cdcf7)
      : _0x2da694(_0x2cdcf7, _0x2cdcf7.length)
  }
  _0x48ef9e.prototype.listeners = function _0x2ccecc(_0x46b90f) {
    return _0x3ec750(this, _0x46b90f, true)
  }
  _0x48ef9e.prototype.rawListeners = function _0x1ab94c(_0x3afbd9) {
    return _0x3ec750(this, _0x3afbd9, false)
  }
  _0x48ef9e.listenerCount = function (_0x561152, _0x1d5b79) {
    return typeof _0x561152.listenerCount === 'function'
      ? _0x561152.listenerCount(_0x1d5b79)
      : _0x60dd3.call(_0x561152, _0x1d5b79)
  }
  _0x48ef9e.prototype.listenerCount = _0x60dd3
  function _0x60dd3(_0x5d3b2c) {
    var _0x54a570 = this['_events']
    if (_0x54a570 !== undefined) {
      var _0x4cf21e = _0x54a570[_0x5d3b2c]
      if (typeof _0x4cf21e === 'function') {
        return 1
      } else {
        if (_0x4cf21e !== undefined) {
          return _0x4cf21e.length
        }
      }
    }
    return 0
  }
  _0x48ef9e.prototype.eventNames = function _0x10c7e7() {
    return this['_eventsCount'] > 0 ? _0x44d6e0(this['_events']) : []
  }
  function _0x2da694(_0x47f21f, _0x4c46f3) {
    var _0x3c421a = new Array(_0x4c46f3)
    for (var _0xe50979 = 0; _0xe50979 < _0x4c46f3; ++_0xe50979) {
      _0x3c421a[_0xe50979] = _0x47f21f[_0xe50979]
    }
    return _0x3c421a
  }
  function _0x5799bb(_0x157544, _0x1048ee) {
    for (; _0x1048ee + 1 < _0x157544.length; _0x1048ee++) {
      _0x157544[_0x1048ee] = _0x157544[_0x1048ee + 1]
    }
    _0x157544.pop()
  }
  function _0x5752b5(_0x485279) {
    var _0x4e062b = new Array(_0x485279.length)
    for (var _0x272548 = 0; _0x272548 < _0x4e062b.length; ++_0x272548) {
      _0x4e062b[_0x272548] =
        _0x485279[_0x272548].listener || _0x485279[_0x272548]
    }
    return _0x4e062b
  }
  function _0x287696(_0x4f7b11, _0x3ec402) {
    return new Promise(function (_0x3e28d8, _0x50eeb5) {
      function _0x1bfd95(_0x198f53) {
        _0x4f7b11.removeListener(_0x3ec402, _0x51d007)
        _0x50eeb5(_0x198f53)
      }
      function _0x51d007() {
        typeof _0x4f7b11.removeListener === 'function' &&
          _0x4f7b11.removeListener('error', _0x1bfd95)
        _0x3e28d8([].slice.call(arguments))
      }
      var _0x285f18 = { once: true }
      _0x311e7f(_0x4f7b11, _0x3ec402, _0x51d007, _0x285f18)
      if (_0x3ec402 !== 'error') {
        var _0x2e952b = { once: true }
        _0x23766a(_0x4f7b11, _0x1bfd95, _0x2e952b)
      }
    })
  }
  function _0x23766a(_0x114114, _0x5949cc, _0x515aba) {
    typeof _0x114114.on === 'function' &&
      _0x311e7f(_0x114114, 'error', _0x5949cc, _0x515aba)
  }
  function _0x311e7f(_0x4f4d48, _0x3fd206, _0x27d175, _0x4097be) {
    if (typeof _0x4f4d48.on === 'function') {
      _0x4097be.once
        ? _0x4f4d48.once(_0x3fd206, _0x27d175)
        : _0x4f4d48.on(_0x3fd206, _0x27d175)
    } else {
      if (typeof _0x4f4d48.addEventListener === 'function') {
        _0x4f4d48.addEventListener(_0x3fd206, function _0x16701a(_0xef15d8) {
          _0x4097be.once &&
            _0x4f4d48.removeEventListener(_0x3fd206, _0x16701a)
          _0x27d175(_0xef15d8)
        })
      } else {
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof _0x4f4d48
        )
      }
    }
  }
}
_0x583055['321'] = function (_0x219f54, _0x524321, _0x33a67b) {
  ;(function () {
    var _0x10f38e
    _0x10f38e = _0x219f54.exports = _0x33a67b(282)
    _0x10f38e.version = '5.1.2'
  }.call(this))
}
_0x583055['282'] = function (_0xb92550, _0x55ff0d, _0x3c07b7) {
  ;(function () {
    var _0x2e1c37,
      _0x1614e1,
      _0x3cefd1,
      _0x1b7698 = [].splice,
      _0x50bf9a = function (_0x588cbb, _0x17c4c3) {
        if (!(_0x588cbb instanceof _0x17c4c3)) {
          throw new Error('Bound instance method accessed before binding')
        }
      },
      _0x454844 = [].indexOf
    _0x3cefd1 = _0x3c07b7(313)
    _0x2e1c37 = _0x3c07b7(187).EventEmitter
    _0xb92550.exports = _0x1614e1 = function () {
      class _0x48f1ed extends _0x2e1c37 {
        constructor(_0x38bfbf = {}) {
          super()
          this.get = this.get.bind(this)
          this.mget = this.mget.bind(this)
          this.set = this.set.bind(this)
          this.mset = this.mset.bind(this)
          this.del = this.del.bind(this)
          this.take = this.take.bind(this)
          this.ttl = this.ttl.bind(this)
          this.getTtl = this.getTtl.bind(this)
          this.keys = this.keys.bind(this)
          this.has = this.has.bind(this)
          this.getStats = this.getStats.bind(this)
          this.flushAll = this.flushAll.bind(this)
          this.flushStats = this.flushStats.bind(this)
          this.close = this.close.bind(this)
          this['_checkData'] = this['_checkData'].bind(this)
          this['_check'] = this['_check'].bind(this)
          this['_isInvalidKey'] = this['_isInvalidKey'].bind(this)
          this['_wrap'] = this['_wrap'].bind(this)
          this['_getValLength'] = this['_getValLength'].bind(this)
          this['_error'] = this['_error'].bind(this)
          this['_initErrors'] = this['_initErrors'].bind(this)
          this.options = _0x38bfbf
          this['_initErrors']()
          this.data = {}
          var _0x1d2f3b = {
            forceString: false,
            objectValueSize: 80,
            promiseValueSize: 80,
            arrayValueSize: 40,
            stdTTL: 0,
            checkperiod: 600,
            useClones: true,
            deleteOnExpire: true,
            enableLegacyCallbacks: false,
            maxKeys: -1,
          }
          this.options = Object.assign(_0x1d2f3b, this.options)
          this.options.enableLegacyCallbacks &&
            (console.warn(
              'WARNING! node-cache legacy callback support will drop in v6.x'
            ),
            [
              'get',
              'mget',
              'set',
              'del',
              'ttl',
              'getTtl',
              'keys',
              'has',
            ].forEach((_0x578f2a) => {
              var _0x39c663
              _0x39c663 = this[_0x578f2a]
              this[_0x578f2a] = function (..._0x3f770b) {
                var _0x32a735, _0x53bdcd, _0x190bb3, _0x345a02
                _0x190bb3 = _0x3f770b
                ;[..._0x3f770b] = _0x190bb3
                ;[_0x32a735] = _0x1b7698.call(_0x3f770b, -1)
                if (typeof _0x32a735 === 'function') {
                  try {
                    _0x345a02 = _0x39c663(..._0x3f770b)
                    _0x32a735(null, _0x345a02)
                  } catch (_0x19ef9f) {
                    _0x53bdcd = _0x19ef9f
                    _0x32a735(_0x53bdcd)
                  }
                } else {
                  return _0x39c663(..._0x3f770b, _0x32a735)
                }
              }
            }))
          var _0x17b6f1 = {
            hits: 0,
            misses: 0,
            keys: 0,
            ksize: 0,
            vsize: 0,
          }
          this.stats = _0x17b6f1
          this.validKeyTypes = ['string', 'number']
          this['_checkData']()
          return
        }
        ['get'](_0x2038c6) {
          var _0x131990, _0xe4e340
          _0x50bf9a(this, _0x48f1ed)
          if ((_0xe4e340 = this['_isInvalidKey'](_0x2038c6)) != null) {
            throw _0xe4e340
          }
          return this.data[_0x2038c6] != null &&
            this['_check'](_0x2038c6, this.data[_0x2038c6])
            ? (this.stats.hits++,
              (_0x131990 = this['_unwrap'](this.data[_0x2038c6])),
              _0x131990)
            : (this.stats.misses++, void 0)
        }
        ['mget'](_0x561cdb) {
          var _0x5a9b61, _0x4e0e0e, _0x3996a4, _0x1b66ca, _0x3f3ff3, _0x287fb7
          _0x50bf9a(this, _0x48f1ed)
          if (!Array.isArray(_0x561cdb)) {
            _0x5a9b61 = this['_error']('EKEYSTYPE')
            throw _0x5a9b61
          }
          _0x287fb7 = {}
          for (
            _0x3996a4 = 0, _0x3f3ff3 = _0x561cdb.length;
            _0x3996a4 < _0x3f3ff3;
            _0x3996a4++
          ) {
            _0x1b66ca = _0x561cdb[_0x3996a4]
            if ((_0x4e0e0e = this['_isInvalidKey'](_0x1b66ca)) != null) {
              throw _0x4e0e0e
            }
            this.data[_0x1b66ca] != null &&
            this['_check'](_0x1b66ca, this.data[_0x1b66ca])
              ? (this.stats.hits++,
                (_0x287fb7[_0x1b66ca] = this['_unwrap'](
                  this.data[_0x1b66ca]
                )))
              : this.stats.misses++
          }
          return _0x287fb7
        }
        ['set'](_0x58d09d, _0x24370c, _0x2cfc86) {
          var _0x245f23, _0x34b54a, _0x468cd8
          _0x50bf9a(this, _0x48f1ed)
          if (
            this.options.maxKeys > -1 &&
            this.stats.keys >= this.options.maxKeys
          ) {
            _0x245f23 = this['_error']('ECACHEFULL')
            throw _0x245f23
          }
          this.options.forceString &&
            !typeof _0x24370c === 'string' &&
            (_0x24370c = JSON.stringify(_0x24370c))
          if (_0x2cfc86 == null) {
            _0x2cfc86 = this.options.stdTTL
          }
          if ((_0x34b54a = this['_isInvalidKey'](_0x58d09d)) != null) {
            throw _0x34b54a
          }
          _0x468cd8 = false
          this.data[_0x58d09d] &&
            ((_0x468cd8 = true),
            (this.stats.vsize -= this['_getValLength'](
              this['_unwrap'](this.data[_0x58d09d], false)
            )))
          this.data[_0x58d09d] = this['_wrap'](_0x24370c, _0x2cfc86)
          this.stats.vsize += this['_getValLength'](_0x24370c)
          if (!_0x468cd8) {
            this.stats.ksize += this['_getKeyLength'](_0x58d09d)
            this.stats.keys++
          }
          return this.emit('set', _0x58d09d, _0x24370c), true
        }
        ['mset'](_0x54ed1b) {
          var _0x917b50,
            _0x3df6af,
            _0x4f2171,
            _0x463aac,
            _0x33daca,
            _0x5b3bd2,
            _0xfb46ee,
            _0x394900,
            _0x18849e,
            _0x56833c
          _0x50bf9a(this, _0x48f1ed)
          if (
            this.options.maxKeys > -1 &&
            this.stats.keys + _0x54ed1b.length >= this.options.maxKeys
          ) {
            _0x917b50 = this['_error']('ECACHEFULL')
            throw _0x917b50
          }
          for (
            _0x4f2171 = 0, _0xfb46ee = _0x54ed1b.length;
            _0x4f2171 < _0xfb46ee;
            _0x4f2171++
          ) {
            _0x5b3bd2 = _0x54ed1b[_0x4f2171]
            ;({ key: _0x33daca, val: _0x56833c, ttl: _0x18849e } = _0x5b3bd2)
            if (_0x18849e && typeof _0x18849e !== 'number') {
              _0x917b50 = this['_error']('ETTLTYPE')
              throw _0x917b50
            }
            if ((_0x3df6af = this['_isInvalidKey'](_0x33daca)) != null) {
              throw _0x3df6af
            }
          }
          for (
            _0x463aac = 0, _0x394900 = _0x54ed1b.length;
            _0x463aac < _0x394900;
            _0x463aac++
          ) {
            _0x5b3bd2 = _0x54ed1b[_0x463aac]
            ;({ key: _0x33daca, val: _0x56833c, ttl: _0x18849e } = _0x5b3bd2)
            this.set(_0x33daca, _0x56833c, _0x18849e)
          }
          return true
        }
        ['del'](_0x4324ac) {
          var _0x5f47dd, _0xb7327b, _0x6de19d, _0x2c8704, _0x164566, _0x566fc2
          _0x50bf9a(this, _0x48f1ed)
          !Array.isArray(_0x4324ac) && (_0x4324ac = [_0x4324ac])
          _0x5f47dd = 0
          for (
            _0x6de19d = 0, _0x164566 = _0x4324ac.length;
            _0x6de19d < _0x164566;
            _0x6de19d++
          ) {
            _0x2c8704 = _0x4324ac[_0x6de19d]
            if ((_0xb7327b = this['_isInvalidKey'](_0x2c8704)) != null) {
              throw _0xb7327b
            }
            this.data[_0x2c8704] != null &&
              ((this.stats.vsize -= this['_getValLength'](
                this['_unwrap'](this.data[_0x2c8704], false)
              )),
              (this.stats.ksize -= this['_getKeyLength'](_0x2c8704)),
              this.stats.keys--,
              _0x5f47dd++,
              (_0x566fc2 = this.data[_0x2c8704]),
              delete this.data[_0x2c8704],
              this.emit('del', _0x2c8704, _0x566fc2.v))
          }
          return _0x5f47dd
        }
        ['take'](_0x14ce90) {
          var _0x206b5a
          return (
            _0x50bf9a(this, _0x48f1ed),
            (_0x206b5a = this.get(_0x14ce90)),
            _0x206b5a != null && this.del(_0x14ce90),
            _0x206b5a
          )
        }
        ['ttl'](_0x272bf1, _0x5e3f06) {
          var _0x20584b
          _0x50bf9a(this, _0x48f1ed)
          _0x5e3f06 || (_0x5e3f06 = this.options.stdTTL)
          if (!_0x272bf1) {
            return false
          }
          if ((_0x20584b = this['_isInvalidKey'](_0x272bf1)) != null) {
            throw _0x20584b
          }
          if (
            this.data[_0x272bf1] != null &&
            this['_check'](_0x272bf1, this.data[_0x272bf1])
          ) {
            if (_0x5e3f06 >= 0) {
              this.data[_0x272bf1] = this['_wrap'](
                this.data[_0x272bf1].v,
                _0x5e3f06,
                false
              )
            } else {
              this.del(_0x272bf1)
            }
            return true
          } else {
            return false
          }
        }
        ['getTtl'](_0x3dd65b) {
          var _0x32710c, _0x854557
          _0x50bf9a(this, _0x48f1ed)
          if (!_0x3dd65b) {
            return void 0
          }
          if ((_0x854557 = this['_isInvalidKey'](_0x3dd65b)) != null) {
            throw _0x854557
          }
          if (
            this.data[_0x3dd65b] != null &&
            this['_check'](_0x3dd65b, this.data[_0x3dd65b])
          ) {
            return (_0x32710c = this.data[_0x3dd65b].t), _0x32710c
          } else {
            return void 0
          }
        }
        ['keys']() {
          var _0x3e2138
          return (
            _0x50bf9a(this, _0x48f1ed),
            (_0x3e2138 = Object.keys(this.data)),
            _0x3e2138
          )
        }
        ['has'](_0x57fac1) {
          var _0x10fb1d
          return (
            _0x50bf9a(this, _0x48f1ed),
            (_0x10fb1d =
              this.data[_0x57fac1] != null &&
              this['_check'](_0x57fac1, this.data[_0x57fac1])),
            _0x10fb1d
          )
        }
        ['getStats']() {
          return _0x50bf9a(this, _0x48f1ed), this.stats
        }
        ['flushAll'](_0x41d55f = true) {
          _0x50bf9a(this, _0x48f1ed)
          this.data = {}
          var _0x5b3a7b = {
            hits: 0,
            misses: 0,
            keys: 0,
            ksize: 0,
            vsize: 0,
          }
          this.stats = _0x5b3a7b
          this['_killCheckPeriod']()
          this['_checkData'](_0x41d55f)
          this.emit('flush')
        }
        ['flushStats']() {
          _0x50bf9a(this, _0x48f1ed)
          var _0x297be4 = {
            hits: 0,
            misses: 0,
            keys: 0,
            ksize: 0,
            vsize: 0,
          }
          this.stats = _0x297be4
          this.emit('flush_stats')
        }
        ['close']() {
          _0x50bf9a(this, _0x48f1ed)
          this['_killCheckPeriod']()
        }
        ['_checkData'](_0x2d6337 = true) {
          var _0x5616d5, _0x5d8ea0, _0x6fce16
          _0x50bf9a(this, _0x48f1ed)
          _0x5d8ea0 = this.data
          for (_0x5616d5 in _0x5d8ea0) {
            _0x6fce16 = _0x5d8ea0[_0x5616d5]
            this['_check'](_0x5616d5, _0x6fce16)
          }
          _0x2d6337 &&
            this.options.checkperiod > 0 &&
            ((this.checkTimeout = setTimeout(
              this['_checkData'],
              this.options.checkperiod * 1000,
              _0x2d6337
            )),
            this.checkTimeout != null &&
              this.checkTimeout.unref != null &&
              this.checkTimeout.unref())
        }
        ['_killCheckPeriod']() {
          if (this.checkTimeout != null) {
            return clearTimeout(this.checkTimeout)
          }
        }
        ['_check'](_0x4b43dd, _0x364b9a) {
          var _0x460060
          return (
            _0x50bf9a(this, _0x48f1ed),
            (_0x460060 = true),
            _0x364b9a.t !== 0 &&
              _0x364b9a.t < Date.now() &&
              (this.options.deleteOnExpire &&
                ((_0x460060 = false), this.del(_0x4b43dd)),
              this.emit('expired', _0x4b43dd, this['_unwrap'](_0x364b9a))),
            _0x460060
          )
        }
        ['_isInvalidKey'](_0x276135) {
          var _0x4428d1
          _0x50bf9a(this, _0x48f1ed)
          if (
            ((_0x4428d1 = typeof _0x276135),
            _0x454844.call(this.validKeyTypes, _0x4428d1) < 0)
          ) {
            var _0x15af00 = {}
            return (
              (_0x15af00.type = typeof _0x276135),
              this['_error']('EKEYTYPE', _0x15af00)
            )
          }
        }
        ['_wrap'](_0x394177, _0x1442df, _0x142130 = true) {
          var _0x82a39b, _0x577696, _0x498eff, _0x9802b4
          _0x50bf9a(this, _0x48f1ed)
          !this.options.useClones && (_0x142130 = false)
          _0x577696 = Date.now()
          _0x82a39b = 0
          _0x9802b4 = 1000
          if (_0x1442df === 0) {
            _0x82a39b = 0
          } else {
            _0x1442df
              ? (_0x82a39b = _0x577696 + _0x1442df * _0x9802b4)
              : this.options.stdTTL === 0
              ? (_0x82a39b = this.options.stdTTL)
              : (_0x82a39b = _0x577696 + this.options.stdTTL * _0x9802b4)
          }
          var _0x3b5578 = {}
          return (
            (_0x3b5578.t = _0x82a39b),
            (_0x3b5578.v = _0x142130 ? _0x3cefd1(_0x394177) : _0x394177),
            (_0x498eff = _0x3b5578)
          )
        }
        ['_unwrap'](_0x3e587e, _0xbb336a = true) {
          if (!this.options.useClones) {
            _0xbb336a = false
          }
          if (_0x3e587e.v != null) {
            return _0xbb336a ? _0x3cefd1(_0x3e587e.v) : _0x3e587e.v
          }
          return null
        }
        ['_getKeyLength'](_0x1faccc) {
          return _0x1faccc.toString().length
        }
        ['_getValLength'](_0x42f279) {
          _0x50bf9a(this, _0x48f1ed)
          if (typeof _0x42f279 === 'string') {
            return _0x42f279.length
          } else {
            if (this.options.forceString) {
              return JSON.stringify(_0x42f279).length
            } else {
              if (Array.isArray(_0x42f279)) {
                return this.options.arrayValueSize * _0x42f279.length
              } else {
                if (typeof _0x42f279 === 'number') {
                  return 8
                } else {
                  if (
                    typeof (_0x42f279 != null ? _0x42f279.then : void 0) ===
                    'function'
                  ) {
                    return this.options.promiseValueSize
                  } else {
                    if (
                      typeof Buffer !== 'undefined' && Buffer !== null
                        ? Buffer.isBuffer(_0x42f279)
                        : void 0
                    ) {
                      return _0x42f279.length
                    } else {
                      if (
                        _0x42f279 != null &&
                        typeof _0x42f279 === 'object'
                      ) {
                        return (
                          this.options.objectValueSize *
                          Object.keys(_0x42f279).length
                        )
                      } else {
                        return typeof _0x42f279 === 'boolean' ? 8 : 0
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ['_error'](_0xa63e33, _0x918092 = {}) {
          var _0x5ae260
          return (
            _0x50bf9a(this, _0x48f1ed),
            (_0x5ae260 = new Error()),
            (_0x5ae260.name = _0xa63e33),
            (_0x5ae260.errorcode = _0xa63e33),
            (_0x5ae260.message =
              this.ERRORS[_0xa63e33] != null
                ? this.ERRORS[_0xa63e33](_0x918092)
                : '-'),
            (_0x5ae260.data = _0x918092),
            _0x5ae260
          )
        }
        ['_initErrors']() {
          var _0x1c0e99, _0xf20104, _0x3d826e
          _0x50bf9a(this, _0x48f1ed)
          this.ERRORS = {}
          _0x3d826e = this['_ERRORS']
          for (_0xf20104 in _0x3d826e) {
            _0x1c0e99 = _0x3d826e[_0xf20104]
            this.ERRORS[_0xf20104] = this.createErrorMessage(_0x1c0e99)
          }
        }
        ['createErrorMessage'](_0x77ece6) {
          return function (_0x362770) {
            return _0x77ece6.replace('__key', _0x362770.type)
          }
        }
      }
      var _0x7c1485 = {}
      return (
        (_0x7c1485.ENOTFOUND = 'Key `__key` not found'),
        (_0x7c1485.ECACHEFULL = 'Cache max keys amount exceeded'),
        (_0x7c1485.EKEYTYPE =
          'The key argument has to be of type `string` or `number`. Found: `__key`'),
        (_0x7c1485.EKEYSTYPE = 'The keys argument has to be an array.'),
        (_0x7c1485.ETTLTYPE = 'The ttl argument has to be a number.'),
        (_0x48f1ed.prototype['_ERRORS'] = _0x7c1485),
        _0x48f1ed
      )
    }.call(this)
  }.call(this))
}
var _0x279c3c = _0x583055,
  _0x10b873 = {}
function _0x3aff9b(_0x3aae6c) {
  var _0x65b8c6 = _0x10b873[_0x3aae6c]
  if (_0x65b8c6 !== undefined) {
    return _0x65b8c6.exports
  }
  var _0x486006 = { exports: {} }
  var _0x1b1509 = (_0x10b873[_0x3aae6c] = _0x486006)
  return (
    _0x279c3c[_0x3aae6c].call(
      _0x1b1509.exports,
      _0x1b1509,
      _0x1b1509.exports,
      _0x3aff9b
    ),
    _0x1b1509.exports
  )
}
;(() => {
  _0x3aff9b.n = (_0x2b4fd4) => {
    var _0x549644 =
      _0x2b4fd4 && _0x2b4fd4['__esModule']
        ? () => _0x2b4fd4.default
        : () => _0x2b4fd4
    return _0x3aff9b.d(_0x549644, { a: _0x549644 }), _0x549644
  }
})()
;(() => {
  _0x3aff9b.d = (_0x2732df, _0x2ac77a) => {
    for (var _0x3ee401 in _0x2ac77a) {
      _0x3aff9b.o(_0x2ac77a, _0x3ee401) &&
        !_0x3aff9b.o(_0x2732df, _0x3ee401) &&
        Object.defineProperty(_0x2732df, _0x3ee401, {
          enumerable: true,
          get: _0x2ac77a[_0x3ee401],
        })
    }
  }
})()
;(() => {
  _0x3aff9b.g = (function () {
    if (typeof globalThis === 'object') {
      return globalThis
    }
    try {
      return this || new Function('return this')()
    } catch (_0x2d06dd) {
      if (typeof window === 'object') {
        return window
      }
    }
  })()
})()
;(() => {
  _0x3aff9b.o = (_0xff5d2d, _0x283ac0) =>
    Object.prototype.hasOwnProperty.call(_0xff5d2d, _0x283ac0)
})()
var _0x5013c8 = {}
;(() => {
  'use strict'
  var _0x3d163a = _0x3aff9b(321),
    _0x15d8a3 = _0x3aff9b.n(_0x3d163a)
  let _0x3847db = null,
    _0x2f5708 = null,
    _0x8afddf = null,
    _0x198137 = null
  var _0x55e47d = { stdTTL: 1 }
  const _0x517c02 = new _0x3d163a(_0x55e47d),
    _0x5bf45d = (_0x36e230, _0x37162a) => {
      return (
        !_0x517c02.has(_0x36e230) && _0x517c02.set(_0x36e230, _0x37162a()),
        _0x517c02.get(_0x36e230)
      )
    },
    _0x5979ac = (_0x4bde61, _0x4e2513) => {
      const _0x48f8e3 = GetGameplayCamCoord(),
        [_0x32346e, , _0x76dfe7] = GetGameplayCamRot(0).map(
          (_0x2ce3c9) => (Math.PI / 180) * _0x2ce3c9
        ),
        _0x1b9a32 = Math.abs(Math.cos(_0x32346e)),
        _0x2c9953 = [
          -Math.sin(_0x76dfe7) * _0x1b9a32,
          Math.cos(_0x76dfe7) * _0x1b9a32,
          Math.sin(_0x32346e),
        ],
        _0x4dd481 = _0x2c9953.map(
          (_0x3d2542, _0x3fe550) => _0x48f8e3[_0x3fe550] + _0x3d2542
        ),
        _0x50186e = _0x2c9953.map(
          (_0x103676, _0x2f4ccc) => _0x48f8e3[_0x2f4ccc] + _0x103676 * 200
        ),
        _0x50c5b0 = StartShapeTestSweptSphere(
          _0x4dd481[0],
          _0x4dd481[1],
          _0x4dd481[2],
          _0x50186e[0],
          _0x50186e[1],
          _0x50186e[2],
          0.2,
          _0x4bde61,
          _0x4e2513,
          7
        )
      return GetShapeTestResult(_0x50c5b0)
    },
    _0x20fd33 = (_0x140bb0, _0x55955a) => {
      _0x8afddf = _0x140bb0
      _0x198137 = _0x55955a
    },
    _0x10f4fb = () => _0x2f5708 !== null,
    _0x55f383 = (_0x21bb6d, _0x4ac363) =>
      _0x5bf45d('entity:' + _0x21bb6d, () => {
        const _0xdfcb6b = GetEntityType(_0x21bb6d)
        if (_0xdfcb6b === 0) {
          var _0x28954e = {}
          return (
            (_0x28954e.type = 0),
            (_0x28954e.model = null),
            (_0x28954e.size = null),
            (_0x28954e.valid = false),
            _0x28954e
          )
        }
        const _0x4ca6c6 = GetEntityModel(_0x21bb6d),
          [[_0x3b1682, _0x5247e0], [_0x20deae, _0xde9b86]] =
            GetModelDimensions(_0x4ca6c6),
          _0x54e691 = Math.max(_0x20deae - _0x3b1682, _0xde9b86 - _0x5247e0),
          _0x3c9721 = _0x4ac363(_0x21bb6d, _0xdfcb6b, _0x4ca6c6)
        var _0x44e142 = {}
        return (
          (_0x44e142.type = _0xdfcb6b),
          (_0x44e142.model = _0x4ca6c6),
          (_0x44e142.size = _0x54e691),
          (_0x44e142.valid = _0x3c9721),
          _0x44e142
        )
      }),
    _0x584e7e = (_0x5112a6, _0x621d95, _0x3a3cd3, _0x3ab8ab = true) => {
      _0x5bf293(false)
      !_0x3847db &&
        (_0x3847db = setTick(() => {
          if (_0x8afddf) {
            if (!DoesEntityExist(_0x8afddf)) {
              _0x5bf293()
              return
            }
            const { size: _0x1432be, valid: _0x2c96bc } = _0x55f383(
              _0x8afddf,
              _0x3a3cd3
            )
            if (!_0x2c96bc) {
              _0x5bf293()
              return
            }
            const [_0x39a55e, _0x5ebc4b, _0x4db9e2] = GetEntityCoords(
                _0x8afddf,
                true
              ),
              [_0x56b956, _0x5aa7e3] = GetGroundZFor_3dCoord(
                _0x39a55e,
                _0x5ebc4b,
                _0x4db9e2 + 1,
                false
              )
            DrawMarker(
              1,
              _0x39a55e,
              _0x5ebc4b,
              _0x56b956 ? _0x5aa7e3 : _0x4db9e2,
              0,
              0,
              0,
              0,
              0,
              0,
              _0x1432be,
              _0x1432be,
              0.4,
              0,
              255,
              0,
              150,
              false,
              false,
              2,
              false,
              null,
              null,
              false
            )
            return
          }
          _0x3ab8ab &&
            _0x198137 &&
            DrawMarker(
              1,
              ..._0x198137,
              0,
              0,
              0,
              0,
              0,
              0,
              0.4,
              0.4,
              0.3,
              0,
              0,
              255,
              150,
              false,
              false,
              2,
              false,
              null,
              null,
              false
            )
        }))
      _0x2f5708 = setTick(() => {
        const [, _0x266c16, _0x4d791d, , _0x5a0004] = _0x5979ac(
            _0x5112a6,
            _0x621d95
          ),
          { valid: _0x235287 } = _0x55f383(_0x5a0004, _0x3a3cd3)
        if (_0x235287) {
          _0x20fd33(_0x5a0004, null)
          return
        }
        _0x20fd33(null, _0x266c16 ? _0x4d791d : null)
      })
    },
    _0x52c7fe = () => {
      if (_0x2f5708) {
        clearTick(_0x2f5708)
        _0x2f5708 = null
        const _0x2d7bcb = _0x17ec61()
        return emit('ev-selector:selectionChanged', _0x2d7bcb), _0x2d7bcb
      }
    },
    _0x5bf293 = (_0x1772ab = true) => {
      _0x52c7fe()
      clearTick(_0x3847db)
      _0x3847db = null
      _0x20fd33(null, null)
      if (_0x1772ab) {
        emit('ev-selector:selectionChanged', _0x17ec61())
      }
    },
    _0x17ec61 = () => ({
      selectedCoords: _0x198137,
      selectedEntity: _0x8afddf,
    })
  _0x3aff9b.g.exports('startSelecting', _0x584e7e)
  _0x3aff9b.g.exports('stopSelecting', _0x52c7fe)
  _0x3aff9b.g.exports('getCurrentSelection', _0x17ec61)
  _0x3aff9b.g.exports('isSelecting', _0x10f4fb)
  _0x3aff9b.g.exports('deselect', _0x5bf293)
})()
})()
