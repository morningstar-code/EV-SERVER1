;(() => {
  var _0x353e89 = {
      484: function (_0x44a779) {
        !(function (_0x3d1df, _0x33a15a) {
          _0x44a779.exports = _0x33a15a()
        })(this, function () {
          'use strict'
          var _0x39a40a = 'millisecond',
            _0x47c0f1 = 'second',
            _0x217392 = 'minute',
            _0x7990cb = 'hour',
            _0x4fa12b = 'day',
            _0x500f3d = 'week',
            _0x2ce625 = 'month',
            _0x55ea4d = 'quarter',
            _0x4d81bd = 'year',
            _0x4048e1 = 'date',
            _0x16f9ab = 'Invalid Date',
            _0x4b338a = {
              name: 'en',
              weekdays:
                'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                  '_'
                ),
              months:
                'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                  '_'
                ),
            },
            _0x418057 = function (_0xa65c20, _0x5c229f, _0x169d33) {
              var _0x58f9bc = String(_0xa65c20)
              return !_0x58f9bc || _0x58f9bc.length >= _0x5c229f
                ? _0xa65c20
                : '' +
                    Array(_0x5c229f + 1 - _0x58f9bc.length).join(_0x169d33) +
                    _0xa65c20
            },
            _0x1bea0f = {
              s: _0x418057,
              z: function (_0x162cb1) {
                var _0x1efed5 = -_0x162cb1.utcOffset(),
                  _0x34d827 = Math.abs(_0x1efed5),
                  _0x48d242 = Math.floor(_0x34d827 / 60),
                  _0x37550c = _0x34d827 % 60
                return (
                  (_0x1efed5 <= 0 ? '+' : '-') +
                  _0x418057(_0x48d242, 2, '0') +
                  ':' +
                  _0x418057(_0x37550c, 2, '0')
                )
              },
              m: function _0x2b06df(_0xb690da, _0x5062af) {
                if (_0xb690da.date() < _0x5062af.date()) {
                  return -_0x2b06df(_0x5062af, _0xb690da)
                }
                var _0x1f4bae =
                    12 * (_0x5062af.year() - _0xb690da.year()) +
                    (_0x5062af.month() - _0xb690da.month()),
                  _0x5b5df8 = _0xb690da.clone().add(_0x1f4bae, _0x2ce625),
                  _0x39c85e = _0x5062af - _0x5b5df8 < 0,
                  _0x665b2f = _0xb690da
                    .clone()
                    .add(_0x1f4bae + (_0x39c85e ? -1 : 1), _0x2ce625)
                return +(
                  -(
                    _0x1f4bae +
                    (_0x5062af - _0x5b5df8) /
                      (_0x39c85e
                        ? _0x5b5df8 - _0x665b2f
                        : _0x665b2f - _0x5b5df8)
                  ) || 0
                )
              },
              a: function (_0x345058) {
                return _0x345058 < 0
                  ? Math.ceil(_0x345058) || 0
                  : Math.floor(_0x345058)
              },
              p: function (_0x4b2c04) {
                const _0x5d7771 = {}
                return (
                  (_0x5d7771.M = _0x2ce625),
                  (_0x5d7771.y = _0x4d81bd),
                  (_0x5d7771.w = _0x500f3d),
                  (_0x5d7771.d = _0x4fa12b),
                  (_0x5d7771.D = _0x4048e1),
                  (_0x5d7771.h = _0x7990cb),
                  (_0x5d7771.m = _0x217392),
                  (_0x5d7771.s = _0x47c0f1),
                  (_0x5d7771.ms = _0x39a40a),
                  (_0x5d7771.Q = _0x55ea4d),
                  _0x5d7771[_0x4b2c04] ||
                    String(_0x4b2c04 || '')
                      .toLowerCase()
                      .replace(/s$/, '')
                )
              },
              u: function (_0x3058f7) {
                return void 0 === _0x3058f7
              },
            },
            _0x19c894 = 'en',
            _0x168517 = {
              _0x19c894: _0x4b338a,
              _0x21deff: _0x4b855a,
            }
          var _0x78ee75 = function (_0x485115) {
              return _0x485115 instanceof _0x3fa92f
            },
            _0x210355 = function _0x413507(_0x4b855a, _0x4eb6e6, _0x18097b) {
              var _0x3c0e13
              if (!_0x4b855a) {
                return _0x19c894
              }
              if ('string' == typeof _0x4b855a) {
                var _0x9cd60 = _0x4b855a.toLowerCase()
                _0x168517[_0x9cd60] && (_0x3c0e13 = _0x9cd60)
                _0x4eb6e6 &&
                  ((_0x168517[_0x9cd60] = _0x4eb6e6), (_0x3c0e13 = _0x9cd60))
                var _0x193bf8 = _0x4b855a.split('-')
                if (!_0x3c0e13 && _0x193bf8.length > 1) {
                  return _0x413507(_0x193bf8[0])
                }
              } else {
                var _0x21deff = _0x4b855a.name
                _0x3c0e13 = _0x21deff
              }
              return (
                !_0x18097b && _0x3c0e13 && (_0x19c894 = _0x3c0e13),
                _0x3c0e13 || (!_0x18097b && _0x19c894)
              )
            },
            _0x20db66 = function (_0x412b36, _0x217224) {
              if (_0x78ee75(_0x412b36)) {
                return _0x412b36.clone()
              }
              var _0x413fb5 = 'object' == typeof _0x217224 ? _0x217224 : {}
              return (
                (_0x413fb5.date = _0x412b36),
                (_0x413fb5.args = arguments),
                new _0x3fa92f(_0x413fb5)
              )
            },
            _0x1d20fb = _0x1bea0f
          _0x1d20fb.l = _0x210355
          _0x1d20fb.i = _0x78ee75
          _0x1d20fb.w = function (_0x39c3a4, _0x51168e) {
            const _0x1030ce = {}
            return (
              (_0x1030ce.locale = _0x51168e['$L']),
              (_0x1030ce.utc = _0x51168e['$u']),
              (_0x1030ce.x = _0x51168e['$x']),
              (_0x1030ce['$offset'] = _0x51168e['$offset']),
              _0x20db66(_0x39c3a4, _0x1030ce)
            )
          }
          var _0x3fa92f = (function () {
              function _0x5d8bb8(_0x555b36) {
                this['$L'] = _0x210355(_0x555b36.locale, null, true)
                this.parse(_0x555b36)
              }
              var _0x44796a = _0x5d8bb8.prototype
              return (
                (_0x44796a.parse = function (_0x128aaf) {
                  this['$d'] = (function (_0x28628b) {
                    var _0x25590c = _0x28628b.date,
                      _0x2f0c57 = _0x28628b.utc
                    if (null === _0x25590c) {
                      return new Date(NaN)
                    }
                    if (_0x1d20fb.u(_0x25590c)) {
                      return new Date()
                    }
                    if (_0x25590c instanceof Date) {
                      return new Date(_0x25590c)
                    }
                    if (
                      'string' == typeof _0x25590c &&
                      !/Z$/i.test(_0x25590c)
                    ) {
                      var _0x3c47ae = _0x25590c.match(
                        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
                      )
                      if (_0x3c47ae) {
                        var _0x21f453 = _0x3c47ae[2] - 1 || 0,
                          _0x506900 = (_0x3c47ae[7] || '0').substring(0, 3)
                        return _0x2f0c57
                          ? new Date(
                              Date.UTC(
                                _0x3c47ae[1],
                                _0x21f453,
                                _0x3c47ae[3] || 1,
                                _0x3c47ae[4] || 0,
                                _0x3c47ae[5] || 0,
                                _0x3c47ae[6] || 0,
                                _0x506900
                              )
                            )
                          : new Date(
                              _0x3c47ae[1],
                              _0x21f453,
                              _0x3c47ae[3] || 1,
                              _0x3c47ae[4] || 0,
                              _0x3c47ae[5] || 0,
                              _0x3c47ae[6] || 0,
                              _0x506900
                            )
                      }
                    }
                    return new Date(_0x25590c)
                  })(_0x128aaf)
                  this['$x'] = _0x128aaf.x || {}
                  this.init()
                }),
                (_0x44796a.init = function () {
                  var _0x299d84 = this['$d']
                  this['$y'] = _0x299d84.getFullYear()
                  this['$M'] = _0x299d84.getMonth()
                  this['$D'] = _0x299d84.getDate()
                  this['$W'] = _0x299d84.getDay()
                  this['$H'] = _0x299d84.getHours()
                  this['$m'] = _0x299d84.getMinutes()
                  this['$s'] = _0x299d84.getSeconds()
                  this['$ms'] = _0x299d84.getMilliseconds()
                }),
                (_0x44796a['$utils'] = function () {
                  return _0x1d20fb
                }),
                (_0x44796a.isValid = function () {
                  return !(this['$d'].toString() === _0x16f9ab)
                }),
                (_0x44796a.isSame = function (_0x5c1f55, _0x52ca89) {
                  var _0x4cda41 = _0x20db66(_0x5c1f55)
                  return (
                    this.startOf(_0x52ca89) <= _0x4cda41 &&
                    _0x4cda41 <= this.endOf(_0x52ca89)
                  )
                }),
                (_0x44796a.isAfter = function (_0x5a75f3, _0x13a416) {
                  return _0x20db66(_0x5a75f3) < this.startOf(_0x13a416)
                }),
                (_0x44796a.isBefore = function (_0x4ae001, _0x6521d5) {
                  return this.endOf(_0x6521d5) < _0x20db66(_0x4ae001)
                }),
                (_0x44796a['$g'] = function (_0x5a0f20, _0x44fb3d, _0x359933) {
                  return _0x1d20fb.u(_0x5a0f20)
                    ? this[_0x44fb3d]
                    : this.set(_0x359933, _0x5a0f20)
                }),
                (_0x44796a.unix = function () {
                  return Math.floor(this.valueOf() / 1000)
                }),
                (_0x44796a.valueOf = function () {
                  return this['$d'].getTime()
                }),
                (_0x44796a.startOf = function (_0x2ce5c2, _0x5acda5) {
                  var _0x15d791 = this,
                    _0x21f662 = !!_0x1d20fb.u(_0x5acda5) || _0x5acda5,
                    _0x355452 = _0x1d20fb.p(_0x2ce5c2),
                    _0x12005c = function (_0x402c02, _0x459783) {
                      var _0x212c01 = _0x1d20fb.w(
                        _0x15d791['$u']
                          ? Date.UTC(_0x15d791['$y'], _0x459783, _0x402c02)
                          : new Date(_0x15d791['$y'], _0x459783, _0x402c02),
                        _0x15d791
                      )
                      return _0x21f662 ? _0x212c01 : _0x212c01.endOf(_0x4fa12b)
                    },
                    _0x118511 = function (_0x83b03b, _0x1bb44c) {
                      return _0x1d20fb.w(
                        _0x15d791
                          .toDate()
                          [_0x83b03b].apply(
                            _0x15d791.toDate('s'),
                            (_0x21f662
                              ? [0, 0, 0, 0]
                              : [23, 59, 59, 999]
                            ).slice(_0x1bb44c)
                          ),
                        _0x15d791
                      )
                    },
                    _0x39c952 = this['$W'],
                    _0x20ef38 = this['$M'],
                    _0x35f530 = this['$D'],
                    _0x3b0e4c = 'set' + (this['$u'] ? 'UTC' : '')
                  switch (_0x355452) {
                    case _0x4d81bd:
                      return _0x21f662 ? _0x12005c(1, 0) : _0x12005c(31, 11)
                    case _0x2ce625:
                      return _0x21f662
                        ? _0x12005c(1, _0x20ef38)
                        : _0x12005c(0, _0x20ef38 + 1)
                    case _0x500f3d:
                      var _0xf95f87 = this['$locale']().weekStart || 0,
                        _0x5744bc =
                          (_0x39c952 < _0xf95f87 ? _0x39c952 + 7 : _0x39c952) -
                          _0xf95f87
                      return _0x12005c(
                        _0x21f662
                          ? _0x35f530 - _0x5744bc
                          : _0x35f530 + (6 - _0x5744bc),
                        _0x20ef38
                      )
                    case _0x4fa12b:
                    case _0x4048e1:
                      return _0x118511(_0x3b0e4c + 'Hours', 0)
                    case _0x7990cb:
                      return _0x118511(_0x3b0e4c + 'Minutes', 1)
                    case _0x217392:
                      return _0x118511(_0x3b0e4c + 'Seconds', 2)
                    case _0x47c0f1:
                      return _0x118511(_0x3b0e4c + 'Milliseconds', 3)
                    default:
                      return this.clone()
                  }
                }),
                (_0x44796a.endOf = function (_0x530167) {
                  return this.startOf(_0x530167, false)
                }),
                (_0x44796a['$set'] = function (_0x2f2d93, _0x4a259e) {
                  var _0x531dcf,
                    _0x32aa98 = _0x1d20fb.p(_0x2f2d93),
                    _0x2ef163 = 'set' + (this['$u'] ? 'UTC' : ''),
                    _0x4ba260 = ((_0x531dcf = {}),
                    (_0x531dcf[_0x4fa12b] = _0x2ef163 + 'Date'),
                    (_0x531dcf[_0x4048e1] = _0x2ef163 + 'Date'),
                    (_0x531dcf[_0x2ce625] = _0x2ef163 + 'Month'),
                    (_0x531dcf[_0x4d81bd] = _0x2ef163 + 'FullYear'),
                    (_0x531dcf[_0x7990cb] = _0x2ef163 + 'Hours'),
                    (_0x531dcf[_0x217392] = _0x2ef163 + 'Minutes'),
                    (_0x531dcf[_0x47c0f1] = _0x2ef163 + 'Seconds'),
                    (_0x531dcf[_0x39a40a] = _0x2ef163 + 'Milliseconds'),
                    _0x531dcf)[_0x32aa98],
                    _0x305d8b =
                      _0x32aa98 === _0x4fa12b
                        ? this['$D'] + (_0x4a259e - this['$W'])
                        : _0x4a259e
                  if (_0x32aa98 === _0x2ce625 || _0x32aa98 === _0x4d81bd) {
                    var _0x2c9e08 = this.clone().set(_0x4048e1, 1)
                    _0x2c9e08['$d'][_0x4ba260](_0x305d8b)
                    _0x2c9e08.init()
                    this['$d'] = _0x2c9e08.set(
                      _0x4048e1,
                      Math.min(this['$D'], _0x2c9e08.daysInMonth())
                    )['$d']
                  } else {
                    _0x4ba260 && this['$d'][_0x4ba260](_0x305d8b)
                  }
                  return this.init(), this
                }),
                (_0x44796a.set = function (_0x5d9b68, _0x579e77) {
                  return this.clone()['$set'](_0x5d9b68, _0x579e77)
                }),
                (_0x44796a.get = function (_0x25067e) {
                  return this[_0x1d20fb.p(_0x25067e)]()
                }),
                (_0x44796a.add = function (_0x345194, _0x561b0e) {
                  var _0x50a1e6,
                    _0x2a2b71 = this
                  _0x345194 = Number(_0x345194)
                  var _0x3240af = _0x1d20fb.p(_0x561b0e),
                    _0xf7971e = function (_0x55ce04) {
                      var _0xa79012 = _0x20db66(_0x2a2b71)
                      return _0x1d20fb.w(
                        _0xa79012.date(
                          _0xa79012.date() + Math.round(_0x55ce04 * _0x345194)
                        ),
                        _0x2a2b71
                      )
                    }
                  if (_0x3240af === _0x2ce625) {
                    return this.set(_0x2ce625, this['$M'] + _0x345194)
                  }
                  if (_0x3240af === _0x4d81bd) {
                    return this.set(_0x4d81bd, this['$y'] + _0x345194)
                  }
                  if (_0x3240af === _0x4fa12b) {
                    return _0xf7971e(1)
                  }
                  if (_0x3240af === _0x500f3d) {
                    return _0xf7971e(7)
                  }
                  var _0x4cdb97 =
                      ((_0x50a1e6 = {}),
                      (_0x50a1e6[_0x217392] = 60000),
                      (_0x50a1e6[_0x7990cb] = 3600000),
                      (_0x50a1e6[_0x47c0f1] = 1000),
                      _0x50a1e6)[_0x3240af] || 1,
                    _0x3a5e68 = this['$d'].getTime() + _0x345194 * _0x4cdb97
                  return _0x1d20fb.w(_0x3a5e68, this)
                }),
                (_0x44796a.subtract = function (_0x2d8e6d, _0x302a1f) {
                  return this.add(-1 * _0x2d8e6d, _0x302a1f)
                }),
                (_0x44796a.format = function (_0x565abe) {
                  var _0x1412ae = this,
                    _0x468baa = this['$locale']()
                  if (!this.isValid()) {
                    return _0x468baa.invalidDate || _0x16f9ab
                  }
                  var _0x239dc0 = _0x565abe || 'YYYY-MM-DDTHH:mm:ssZ',
                    _0x40c720 = _0x1d20fb.z(this),
                    _0x5abb00 = this['$H'],
                    _0x502144 = this['$m'],
                    _0x286249 = this['$M'],
                    _0x242f98 = _0x468baa.weekdays,
                    _0x4b92f5 = _0x468baa.months,
                    _0x26b94e = function (
                      _0xf98b1c,
                      _0x1dd048,
                      _0x2881c9,
                      _0x523ac4
                    ) {
                      return (
                        (_0xf98b1c &&
                          (_0xf98b1c[_0x1dd048] ||
                            _0xf98b1c(_0x1412ae, _0x239dc0))) ||
                        _0x2881c9[_0x1dd048].slice(0, _0x523ac4)
                      )
                    },
                    _0x58107c = function (_0x3964c3) {
                      return _0x1d20fb.s(_0x5abb00 % 12 || 12, _0x3964c3, '0')
                    },
                    _0x2b4411 =
                      _0x468baa.meridiem ||
                      function (_0x1c3b0c, _0x5091e8, _0x2f5b43) {
                        var _0x405b25 = _0x1c3b0c < 12 ? 'AM' : 'PM'
                        return _0x2f5b43 ? _0x405b25.toLowerCase() : _0x405b25
                      },
                    _0x4bc56e = {
                      YY: String(this['$y']).slice(-2),
                      YYYY: this['$y'],
                      M: _0x286249 + 1,
                      MM: _0x1d20fb.s(_0x286249 + 1, 2, '0'),
                      MMM: _0x26b94e(
                        _0x468baa.monthsShort,
                        _0x286249,
                        _0x4b92f5,
                        3
                      ),
                      MMMM: _0x26b94e(_0x4b92f5, _0x286249),
                      D: this['$D'],
                      DD: _0x1d20fb.s(this['$D'], 2, '0'),
                      d: String(this['$W']),
                      dd: _0x26b94e(
                        _0x468baa.weekdaysMin,
                        this['$W'],
                        _0x242f98,
                        2
                      ),
                      ddd: _0x26b94e(
                        _0x468baa.weekdaysShort,
                        this['$W'],
                        _0x242f98,
                        3
                      ),
                      dddd: _0x242f98[this['$W']],
                      H: String(_0x5abb00),
                      HH: _0x1d20fb.s(_0x5abb00, 2, '0'),
                      h: _0x58107c(1),
                      hh: _0x58107c(2),
                      a: _0x2b4411(_0x5abb00, _0x502144, true),
                      A: _0x2b4411(_0x5abb00, _0x502144, false),
                      m: String(_0x502144),
                      mm: _0x1d20fb.s(_0x502144, 2, '0'),
                      s: String(this['$s']),
                      ss: _0x1d20fb.s(this['$s'], 2, '0'),
                      SSS: _0x1d20fb.s(this['$ms'], 3, '0'),
                      Z: _0x40c720,
                    }
                  return _0x239dc0.replace(
                    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
                    function (_0x2cb73b, _0x4716a4) {
                      return (
                        _0x4716a4 ||
                        _0x4bc56e[_0x2cb73b] ||
                        _0x40c720.replace(':', '')
                      )
                    }
                  )
                }),
                (_0x44796a.utcOffset = function () {
                  return 15 * -Math.round(this['$d'].getTimezoneOffset() / 15)
                }),
                (_0x44796a.diff = function (_0x3e7b34, _0x5e2ae1, _0x48d59) {
                  var _0x418b0b,
                    _0x4cf137 = _0x1d20fb.p(_0x5e2ae1),
                    _0x17a3a4 = _0x20db66(_0x3e7b34),
                    _0x38e2c4 =
                      (_0x17a3a4.utcOffset() - this.utcOffset()) * 60000,
                    _0x3344fe = this - _0x17a3a4,
                    _0x34e573 = _0x1d20fb.m(this, _0x17a3a4)
                  return (
                    (_0x34e573 =
                      ((_0x418b0b = {}),
                      (_0x418b0b[_0x4d81bd] = _0x34e573 / 12),
                      (_0x418b0b[_0x2ce625] = _0x34e573),
                      (_0x418b0b[_0x55ea4d] = _0x34e573 / 3),
                      (_0x418b0b[_0x500f3d] =
                        (_0x3344fe - _0x38e2c4) / 604800000),
                      (_0x418b0b[_0x4fa12b] =
                        (_0x3344fe - _0x38e2c4) / 86400000),
                      (_0x418b0b[_0x7990cb] = _0x3344fe / 3600000),
                      (_0x418b0b[_0x217392] = _0x3344fe / 60000),
                      (_0x418b0b[_0x47c0f1] = _0x3344fe / 1000),
                      _0x418b0b)[_0x4cf137] || _0x3344fe),
                    _0x48d59 ? _0x34e573 : _0x1d20fb.a(_0x34e573)
                  )
                }),
                (_0x44796a.daysInMonth = function () {
                  return this.endOf(_0x2ce625)['$D']
                }),
                (_0x44796a['$locale'] = function () {
                  return _0x168517[this['$L']]
                }),
                (_0x44796a.locale = function (_0x4bf24f, _0x4f111a) {
                  if (!_0x4bf24f) {
                    return this['$L']
                  }
                  var _0x1da746 = this.clone(),
                    _0x457efa = _0x210355(_0x4bf24f, _0x4f111a, true)
                  return _0x457efa && (_0x1da746['$L'] = _0x457efa), _0x1da746
                }),
                (_0x44796a.clone = function () {
                  return _0x1d20fb.w(this['$d'], this)
                }),
                (_0x44796a.toDate = function () {
                  return new Date(this.valueOf())
                }),
                (_0x44796a.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null
                }),
                (_0x44796a.toISOString = function () {
                  return this['$d'].toISOString()
                }),
                (_0x44796a.toString = function () {
                  return this['$d'].toUTCString()
                }),
                _0x5d8bb8
              )
            })(),
            _0x576948 = _0x3fa92f.prototype
          return (
            (_0x20db66.prototype = _0x576948),
            [
              ['$ms', _0x39a40a],
              ['$s', _0x47c0f1],
              ['$m', _0x217392],
              ['$H', _0x7990cb],
              ['$W', _0x4fa12b],
              ['$M', _0x2ce625],
              ['$y', _0x4d81bd],
              ['$D', _0x4048e1],
            ].forEach(function (_0x2b38b0) {
              _0x576948[_0x2b38b0[1]] = function (_0x1a4b21) {
                return this['$g'](_0x1a4b21, _0x2b38b0[0], _0x2b38b0[1])
              }
            }),
            (_0x20db66.extend = function (_0x36ac42, _0x2ee29c) {
              return (
                _0x36ac42['$i'] ||
                  (_0x36ac42(_0x2ee29c, _0x3fa92f, _0x20db66),
                  (_0x36ac42['$i'] = true)),
                _0x20db66
              )
            }),
            (_0x20db66.locale = _0x210355),
            (_0x20db66.isDayjs = _0x78ee75),
            (_0x20db66.unix = function (_0x4e8015) {
              return _0x20db66(1000 * _0x4e8015)
            }),
            (_0x20db66.en = _0x168517[_0x19c894]),
            (_0x20db66.Ls = _0x168517),
            (_0x20db66.p = {}),
            _0x20db66
          )
        })
      },
      110: function (_0x24522d) {
        !(function (_0x27db41, _0x3b6123) {
          _0x24522d.exports = _0x3b6123()
        })(this, function () {
          'use strict'
          return function (_0x512cd3, _0x18333b, _0x23cefe) {
            _0x512cd3 = _0x512cd3 || {}
            const _0xcbc7fd = {
              future: 'in %s',
              past: '%s ago',
              s: 'a few seconds',
              m: 'a minute',
              mm: '%d minutes',
              h: 'an hour',
              hh: '%d hours',
              d: 'a day',
              dd: '%d days',
              M: 'a month',
              MM: '%d months',
              y: 'a year',
              yy: '%d years',
            }
            var _0x1ca55a = _0x18333b.prototype,
              _0x19c1f5 = _0xcbc7fd
            function _0x17b564(_0x256e70, _0x522558, _0x268d01, _0x486fa2) {
              return _0x1ca55a.fromToBase(
                _0x256e70,
                _0x522558,
                _0x268d01,
                _0x486fa2
              )
            }
            _0x23cefe.en.relativeTime = _0x19c1f5
            _0x1ca55a.fromToBase = function (
              _0x499f72,
              _0x3a070f,
              _0x158747,
              _0x15c3be,
              _0x3a6432
            ) {
              const _0xe0d54d = {
                l: 's',
                r: 44,
                d: 'second',
              }
              const _0x4b0d86 = {
                l: 'm',
                r: 89,
              }
              const _0x2be926 = {
                l: 'mm',
                r: 44,
                d: 'minute',
              }
              const _0x23ee6e = {
                l: 'h',
                r: 89,
              }
              const _0x347692 = {
                l: 'hh',
                r: 21,
                d: 'hour',
              }
              const _0x2d0682 = {
                l: 'd',
                r: 35,
              }
              const _0x55966d = {
                l: 'dd',
                r: 25,
                d: 'day',
              }
              const _0x4f42b4 = {
                l: 'M',
                r: 45,
              }
              const _0x1c5ee5 = {
                l: 'MM',
                r: 10,
                d: 'month',
              }
              const _0x7d0975 = {
                l: 'y',
                r: 17,
              }
              const _0x294612 = {
                l: 'yy',
                d: 'year',
              }
              for (
                var _0xa889a6,
                  _0x52799b,
                  _0x4b6e06,
                  _0x1e5a95 = _0x158747['$locale']().relativeTime || _0x19c1f5,
                  _0xffb445 = _0x512cd3.thresholds || [
                    _0xe0d54d,
                    _0x4b0d86,
                    _0x2be926,
                    _0x23ee6e,
                    _0x347692,
                    _0x2d0682,
                    _0x55966d,
                    _0x4f42b4,
                    _0x1c5ee5,
                    _0x7d0975,
                    _0x294612,
                  ],
                  _0x169285 = _0xffb445.length,
                  _0x2927c2 = 0;
                _0x2927c2 < _0x169285;
                _0x2927c2 += 1
              ) {
                var _0x52c818 = _0xffb445[_0x2927c2]
                _0x52c818.d &&
                  (_0xa889a6 = _0x15c3be
                    ? _0x23cefe(_0x499f72).diff(_0x158747, _0x52c818.d, true)
                    : _0x158747.diff(_0x499f72, _0x52c818.d, true))
                var _0x137c68 = (_0x512cd3.rounding || Math.round)(
                  Math.abs(_0xa889a6)
                )
                if (
                  ((_0x4b6e06 = _0xa889a6 > 0),
                  _0x137c68 <= _0x52c818.r || !_0x52c818.r)
                ) {
                  _0x137c68 <= 1 &&
                    _0x2927c2 > 0 &&
                    (_0x52c818 = _0xffb445[_0x2927c2 - 1])
                  var _0x4ac19e = _0x1e5a95[_0x52c818.l]
                  _0x3a6432 && (_0x137c68 = _0x3a6432('' + _0x137c68))
                  _0x52799b =
                    'string' == typeof _0x4ac19e
                      ? _0x4ac19e.replace('%d', _0x137c68)
                      : _0x4ac19e(_0x137c68, _0x3a070f, _0x52c818.l, _0x4b6e06)
                  break
                }
              }
              if (_0x3a070f) {
                return _0x52799b
              }
              var _0x5c45c8 = _0x4b6e06 ? _0x1e5a95.future : _0x1e5a95.past
              return 'function' == typeof _0x5c45c8
                ? _0x5c45c8(_0x52799b)
                : _0x5c45c8.replace('%s', _0x52799b)
            }
            _0x1ca55a.to = function (_0x2622a3, _0x6f38c9) {
              return _0x17b564(_0x2622a3, _0x6f38c9, this, true)
            }
            _0x1ca55a.from = function (_0x39e2cb, _0x21e3c4) {
              return _0x17b564(_0x39e2cb, _0x21e3c4, this)
            }
            var _0x558eda = function (_0x36103a) {
              return _0x36103a['$u'] ? _0x23cefe.utc() : _0x23cefe()
            }
            _0x1ca55a.toNow = function (_0x304f05) {
              return this.to(_0x558eda(this), _0x304f05)
            }
            _0x1ca55a.fromNow = function (_0x2d6455) {
              return this.from(_0x558eda(this), _0x2d6455)
            }
          }
        })
      },
    },
    _0x5521d0 = {}
  function _0x1f1484(_0x41a4d1) {
    var _0x1885cb = _0x5521d0[_0x41a4d1]
    if (_0x1885cb !== undefined) {
      return _0x1885cb.exports
    }
    const _0x1e0bd5 = { exports: {} }
    var _0x1c0ab1 = (_0x5521d0[_0x41a4d1] = _0x1e0bd5)
    return (
      _0x353e89[_0x41a4d1].call(
        _0x1c0ab1.exports,
        _0x1c0ab1,
        _0x1c0ab1.exports,
        _0x1f1484
      ),
      _0x1c0ab1.exports
    )
  }
  ;(() => {
    _0x1f1484.n = (_0xc49c1b) => {
      var _0x1e3d9f =
        _0xc49c1b && _0xc49c1b['__esModule']
          ? () => _0xc49c1b.default
          : () => _0xc49c1b
      return _0x1f1484.d(_0x1e3d9f, { a: _0x1e3d9f }), _0x1e3d9f
    }
  })()
  ;(() => {
    _0x1f1484.d = (_0x2eb1e0, _0x348f76) => {
      for (var _0x543870 in _0x348f76) {
        _0x1f1484.o(_0x348f76, _0x543870) &&
          !_0x1f1484.o(_0x2eb1e0, _0x543870) &&
          Object.defineProperty(_0x2eb1e0, _0x543870, {
            enumerable: true,
            get: _0x348f76[_0x543870],
          })
      }
    }
  })()
  ;(() => {
    _0x1f1484.g = (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x421fc3) {
        if (typeof window === 'object') {
          return window
        }
      }
    })()
  })()
  ;(() => {
    _0x1f1484.o = (_0x4849e9, _0x518c18) =>
      Object.prototype.hasOwnProperty.call(_0x4849e9, _0x518c18)
  })()
  var _0x233152 = {}
  ;(() => {
    'use strict'
    let _0x50635a = exports['ev-config'].GetModuleConfig('main')
    const _0x5a1603 = new Map(),
      _0x14034f = GetCurrentResourceName()
    async function _0x5cccdb() {}
    on('ev-config:configLoaded', (_0x5be601, _0x593d5e) => {
      if (_0x5be601 === 'main') {
        _0x50635a = _0x593d5e
      } else {
        if (_0x5a1603.has(_0x5be601)) {
          _0x5a1603.set(_0x5be601, _0x593d5e)
        }
      }
    })
    function _0xb8273a(_0xb05ebd) {
      return _0x50635a[_0xb05ebd]
    }
    function _0x4cc1d0(_0x16d9c2, _0x22a059) {
      if (!_0x5a1603.has(_0x16d9c2)) {
        const _0x33d7d0 = exports['ev-config'].GetModuleConfig(_0x16d9c2)
        if (_0x33d7d0 === undefined) {
          return
        }
        _0x5a1603.set(_0x16d9c2, _0x33d7d0)
      }
      const _0x44913a = _0x5a1603.get(_0x16d9c2)
      return _0x22a059
        ? _0x44913a === null || _0x44913a === void 0
          ? void 0
          : _0x44913a[_0x22a059]
        : _0x44913a
    }
    function _0x46c4eb(_0x12465a) {
      return _0x4cc1d0(_0x14034f, _0x12465a)
    }
    const _0x4e8c1a = globalThis.CPX,
      _0xac555c = _0x4e8c1a.Hud,
      _0x45415b = _0x4e8c1a.Utils,
      _0x2d4217 = _0x4e8c1a.Zones,
      _0x336a39 = _0x4e8c1a.Events,
      _0x67beee = _0x4e8c1a.Streaming,
      _0x8f3134 = _0x4e8c1a.Procedures,
      _0x1f45d4 = _0x4e8c1a.Interface,
      _0x971464 = null && _0x4e8c1a
    const _0x4d5136 = globalThis
    async function _0x35ac5b(_0x2ed13e) {
      return new Promise((_0x23471d) =>
        setTimeout(() => _0x23471d(), _0x2ed13e)
      )
    }
    const _0x4a73fa = 'laptop',
      _0x283b15 = 'ev-ui:heistsPanelMinigameResult'
    let _0x148fbf,
      _0x12d419 = 1
    const _0x1dd87a = async (_0x240b59) => {
      var _0x5a359b
      _0x148fbf = null
      const _0x452bed = !!_0x240b59.gameFinishedEndpoint
      _0x240b59.gameDuration *= _0x12d419
      ;(_0x5a359b = _0x240b59.gameFinishedEndpoint) !== null &&
      _0x5a359b !== void 0
        ? _0x5a359b
        : (_0x240b59.gameFinishedEndpoint = _0x283b15)
      _0x1f1484.g.exports['ev-ui'].openApplication(
        'minigame-captcha-evolved',
        _0x240b59
      )
      if (_0x452bed) {
        return
      }
      const _0x4b3e2f = await _0x45415b.waitForCondition(() => {
        return _0x148fbf !== undefined && _0x148fbf !== null
      }, 300000)
      if (_0x4b3e2f) {
        return false
      }
      if (_0x148fbf && _0x240b59.minigameHackExp) {
        emitNet('ev-heists:hack:success', _0x240b59.minigameHackExp)
      }
      return emitNet('ev-heists:hack:track', _0x148fbf, 'laptop'), _0x148fbf
    }
    RegisterUICallback(_0x283b15, async (_0x94515d, _0x2d5615) => {
      _0x148fbf = _0x94515d.success
      const _0xe389d3 = {
        ok: true,
        message: '',
      }
      const _0xa39d21 = {}
      return (
        (_0xa39d21.data = 'success'),
        (_0xa39d21.meta = _0xe389d3),
        _0x2d5615(_0xa39d21)
      )
    })
    _0x1f1484.g.exports('panelMultiplier', (_0x5bd443) => {
      _0x12d419 = Math.min(_0x5bd443, 1.15)
    })
    _0x1f1484.g.exports('BankMinigame', _0x1dd87a)
    const _0x31ec01 = 'keyboard',
      _0x1a7380 = 'ev-ui:heistsDDRMinigameResult'
    let _0x42a592
    const _0x4ce42d = async (_0x128f72) => {
      var _0x358483
      _0x42a592 = null
      const _0x5909cd = !!_0x128f72.gameFinishedEndpoint
      ;(_0x358483 = _0x128f72.gameFinishedEndpoint) !== null &&
      _0x358483 !== void 0
        ? _0x358483
        : (_0x128f72.gameFinishedEndpoint = _0x1a7380)
      exports['ev-ui'].openApplication('minigame-ddr', _0x128f72)
      if (_0x5909cd) {
        return
      }
      const _0x1f02ab = await _0x45415b.waitForCondition(() => {
        return _0x42a592 !== undefined && _0x42a592 !== null
      }, 120000)
      if (_0x1f02ab) {
        return false
      }
      return emitNet('ev-heists:hack:track', _0x42a592, 'ddr'), _0x42a592
    }
    RegisterUICallback(_0x1a7380, async (_0x444e63, _0x3de7bb) => {
      _0x42a592 = _0x444e63.success
      const _0x49f651 = {
        ok: true,
        message: '',
      }
      const _0x47fae8 = {}
      return (
        (_0x47fae8.data = 'success'),
        (_0x47fae8.meta = _0x49f651),
        _0x3de7bb(_0x47fae8)
      )
    })
    on('ev-ui:application-closed', async (_0x3a60e8) => {
      if (_0x3a60e8 !== 'minigame-ddr') {
        return
      }
      ;(_0x42a592 === undefined || _0x42a592 === null) && (_0x42a592 = false)
    })
    _0x1f1484.g.exports('DDRMinigame', _0x4ce42d)
    const _0x24d281 = 'ev-ui:heistsUntangleMinigameResult'
    let _0x3be6a3
    const _0xe8fb18 = async (_0x5e9c26) => {
      var _0x3bc5f5
      _0x3be6a3 = null
      const _0x2c5ba2 = !!_0x5e9c26.gameFinishedEndpoint
      ;(_0x3bc5f5 = _0x5e9c26.gameFinishedEndpoint) !== null &&
      _0x3bc5f5 !== void 0
        ? _0x3bc5f5
        : (_0x5e9c26.gameFinishedEndpoint = _0x24d281)
      exports['ev-ui'].openApplication('minigame-flip', _0x5e9c26)
      if (_0x2c5ba2) {
        return
      }
      const _0x1713d5 = await _0x45415b.waitForCondition(() => {
        return _0x3be6a3 !== undefined && _0x3be6a3 !== null
      }, 60000)
      if (_0x1713d5) {
        return false
      }
      return emitNet('ev-heists:hack:track', _0x3be6a3, 'flip'), _0x3be6a3
    }
    RegisterUICallback(_0x24d281, async (_0x4ad0b3, _0x35172c) => {
      _0x3be6a3 = _0x4ad0b3.success
      const _0x1f71a3 = {
        ok: true,
        message: '',
      }
      const _0x5dd36c = {}
      return (
        (_0x5dd36c.data = 'success'),
        (_0x5dd36c.meta = _0x1f71a3),
        _0x35172c(_0x5dd36c)
      )
    })
    on('ev-ui:application-closed', async (_0x2f7aa8) => {
      if (_0x2f7aa8 !== 'minigame-untangle') {
        return
      }
      ;(_0x3be6a3 === undefined || _0x3be6a3 === null) && (_0x3be6a3 = false)
    })
    _0x1f1484.g.exports('FlipMinigame', _0xe8fb18)
    const _0x2d9e47 = 'project-diagram',
      _0x4c4d49 = 'ev-ui:heistsUntangleMinigameResult'
    let _0x5f23d0
    const _0x2d70cc = async (_0x3c904f) => {
      var _0x96bf28
      _0x5f23d0 = null
      const _0x129531 = !!_0x3c904f.gameFinishedEndpoint
      ;(_0x96bf28 = _0x3c904f.gameFinishedEndpoint) !== null &&
      _0x96bf28 !== void 0
        ? _0x96bf28
        : (_0x3c904f.gameFinishedEndpoint = _0x4c4d49)
      exports['ev-ui'].openApplication('minigame-untangle', _0x3c904f)
      if (_0x129531) {
        return
      }
      const _0x265dfd = await _0x45415b.waitForCondition(() => {
        return _0x5f23d0 !== undefined && _0x5f23d0 !== null
      }, 60000)
      if (_0x265dfd) {
        return false
      }
      return emitNet('ev-heists:hack:track', _0x5f23d0, 'untangle'), _0x5f23d0
    }
    RegisterUICallback(_0x4c4d49, async (_0x43bd6a, _0x3106c8) => {
      _0x5f23d0 = _0x43bd6a.success
      const _0x2428e1 = {
        ok: true,
        message: '',
      }
      const _0x3b3f16 = {}
      return (
        (_0x3b3f16.data = 'success'),
        (_0x3b3f16.meta = _0x2428e1),
        _0x3106c8(_0x3b3f16)
      )
    })
    on('ev-ui:application-closed', async (_0x165118) => {
      if (_0x165118 !== 'minigame-untangle') {
        return
      }
      ;(_0x5f23d0 === undefined || _0x5f23d0 === null) && (_0x5f23d0 = false)
    })
    _0x1f1484.g.exports('UntangleMinigame', _0x2d70cc)
    const _0x59e564 = [
        'Int01_ba_security_upgrade',
        'Int01_ba_equipment_setup',
        'DJ_01_Lights_02',
        'Int01_ba_style02_podium',
        'int01_ba_lights_screen',
        'Int01_ba_Screen',
        'Int01_ba_bar_content',
        'Int01_ba_booze_01',
        'Int01_ba_booze_02',
        'Int01_ba_booze_03',
        'Int01_ba_dj01',
        'Int01_ba_Clutter',
        'Int01_ba_clubname_01',
        'Int01_ba_dry_ice',
        'Int01_ba_deliverytruck',
      ],
      _0xaa85e9 = null && [
        'SE_BA_DLC_INT_01_BOGS',
        'SE_BA_DLC_INT_01_ENTRY_HALL',
        'SE_BA_DLC_INT_01_ENTRY_STAIRS',
        'SE_BA_DLC_INT_01_GARAGE',
        'SE_BA_DLC_INT_01_MAIN_AREA_2',
        'SE_BA_DLC_INT_01_MAIN_AREA',
        'SE_BA_DLC_INT_01_OFFICE',
        'SE_BA_DLC_INT_01_REAR_L_CORRIDOR',
      ]
    let _0x424d41 = 0,
      _0x5b525b = 1,
      _0x4cfd9c = ''
    onNet('ev-jobmanager:playerBecameJob', (_0x42f967) => {
      _0x4cfd9c = _0x42f967
    })
    const _0x529ee9 = async () => {
      _0x424d41 = GetInteriorAtCoordsWithType(
        -1604.664,
        -3012.583,
        -79.9999,
        'ba_dlc_int_01_ba'
      )
      const _0xecde09 = {
        x: 52.77,
        y: 160.8,
        z: 103.73,
      }
      const _0x4e6e7c = {
        heading: 70,
        minZ: 103.73,
        maxZ: 107.23,
      }
      _0x2d4217.addBoxZone(
        '1',
        'heist_club_entrance',
        _0xecde09,
        2.4,
        3.2,
        _0x4e6e7c
      )
      const _0x3e098b = {
        x: -1618.78,
        y: -2999.4,
        z: -79.15,
      }
      const _0xafcf0a = {
        heading: 180,
        minZ: -79.15,
        maxZ: -76.15,
      }
      _0x2d4217.addBoxZone(
        '1',
        'heist_club_exit',
        _0x3e098b,
        0.8,
        2.1,
        _0xafcf0a
      )
      const _0x3485de = {
        x: -1620.05,
        y: -3010.49,
        z: -75.51,
      }
      const _0x2c85bc = {
        heading: 41,
        minZ: -75.51,
        maxZ: -75.01,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'heist_club_pc',
        _0x3485de,
        0.7,
        0.9,
        _0x2c85bc
      )
      const _0x120883 = {
        id: 'heist_club_entrance',
        label: 'Elevator',
        icon: 'sort',
        CPXEvent: 'ev-heists:club:elevator',
      }
      const _0xa08d59 = { radius: 2 }
      const _0x21045c = {
        distance: _0xa08d59,
        isEnabled: () => _0x4cfd9c !== 'police',
      }
      _0x1f45d4.addPeekEntryByTarget(
        'heist_club_entrance',
        [_0x120883],
        _0x21045c
      )
      const _0x351215 = { exit: true }
      const _0x164581 = {
        id: 'heist_club_exit',
        label: 'Exit',
        icon: 'sort-up',
        CPXEvent: 'ev-heists:club:elevator',
        parameters: _0x351215,
      }
      const _0x436764 = { radius: 2 }
      const _0x3a222f = {
        distance: _0x436764,
        isEnabled: () => true,
      }
      _0x1f45d4.addPeekEntryByTarget('heist_club_exit', [_0x164581], _0x3a222f)
      const _0x45558a = {
        id: 'heist_club_ceo',
        label: 'talk',
        icon: 'comment',
        CPXEvent: 'ev-heists:club:talk:ceo',
        parameters: {},
      }
      const _0x14e456 = { radius: 2.5 }
      const _0x24ef1b = {
        npcIds: ['npc_hc_1'],
        distance: _0x14e456,
        isEnabled: () => true,
      }
      _0x1f45d4.addPeekEntryByFlag(['isNPC'], [_0x45558a], _0x24ef1b)
      const _0x32c02a = {
        id: 'heist_club_loot',
        label: 'turn in loot',
        icon: 'donate',
        CPXEvent: 'ev-heists:club:talk:loot',
        parameters: {},
      }
      const _0x54264d = { radius: 2.5 }
      const _0x38fd91 = {
        npcIds: ['npc_hc_4'],
        distance: _0x54264d,
        isEnabled: () => true,
      }
      _0x1f45d4.addPeekEntryByFlag(['isNPC'], [_0x32c02a], _0x38fd91)
      const _0x53e136 = {
        id: 'heist_club_pc',
        label: 'Trade in USBs',
        icon: 'plug',
        CPXEvent: 'ev-heists:club:pc',
        parameters: {},
      }
      const _0x1e767b = { radius: 2 }
      _0x1f45d4.addPeekEntryByTarget('heist_club_pc', [_0x53e136], {
        distance: _0x1e767b,
        isEnabled: () => {
          const _0x42aedd = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistloot_usb',
            1,
            false,
            true
          )
          return _0x42aedd
        },
      })
    }
    _0x336a39.on('ev-heists:club:talk:ceo', () => {
      const _0x1d8497 = [_0x4b5c8f]
      if (_0x5b525b > 0) {
        const _0x58d547 = {
          item_id: 'heistdecrypter_grey',
          cost: 2,
        }
        const _0x45841e = {
          icon: _0x2d9e47,
          title: 'Basic Decrypter',
          titleRight: '\u25A8 2',
          action: 'ev-heists:club:purchase',
          key: _0x58d547,
        }
        _0x1d8497.push(_0x45841e)
        const _0x36adce = {
          item_id: 'heistdrill_grey',
          cost: 5,
        }
        const _0x46fa02 = {
          icon: 'th',
          title: 'Basic Drill',
          titleRight: '\u25A8 5',
          action: 'ev-heists:club:purchase',
          key: _0x36adce,
        }
        _0x1d8497.push(_0x46fa02)
        const _0xf0e5d2 = {
          item_id: 'heistlaptop3',
          cost: 8,
        }
        const _0x768815 = {
          icon: _0x4a73fa,
          title: 'Green Laptop',
          titleRight: '\u25A8 8',
          action: 'ev-heists:club:purchase',
          key: _0xf0e5d2,
        }
        _0x1d8497.push(_0x768815)
      }
      if (_0x5b525b > 1) {
        const _0x2653b1 = {
          item_id: 'heistdecrypter_blue',
          cost: 10,
        }
        const _0x251882 = {
          icon: _0x2d9e47,
          title: 'Advanced Decrypter',
          titleRight: '\u25A8 10',
          action: 'ev-heists:club:purchase',
          key: _0x2653b1,
        }
        _0x1d8497.push(_0x251882)
        const _0xc5d3c2 = {
          item_id: 'heistdrill_blue',
          cost: 25,
        }
        const _0x5d99fd = {
          icon: 'th',
          title: 'Advanced Drill',
          titleRight: '\u25A8 25',
          action: 'ev-heists:club:purchase',
          key: _0xc5d3c2,
        }
        _0x1d8497.push(_0x5d99fd)
        const _0x460b7f = {
          item_id: 'heistelectronickit_blue',
          cost: 10,
        }
        const _0xd0d1e1 = {
          icon: _0x31ec01,
          title: 'Advanced Electronic Kit',
          titleRight: '\u25A8 10',
          action: 'ev-heists:club:purchase',
          key: _0x460b7f,
        }
        _0x1d8497.push(_0xd0d1e1)
        const _0x52cf96 = {
          item_id: 'heistlaptop2',
          cost: 40,
        }
        const _0x3f7f2c = {
          icon: _0x4a73fa,
          title: 'Blue Laptop',
          titleRight: '\u25A8 40',
          action: 'ev-heists:club:purchase',
          key: _0x52cf96,
        }
        _0x1d8497.push(_0x3f7f2c)
      }
      if (_0x5b525b > 2) {
        const _0x374ae1 = {
          item_id: 'heistdecrypter_red',
          cost: 50,
        }
        const _0x3f0b55 = {
          icon: _0x2d9e47,
          title: 'Hardened Decrypter',
          titleRight: '\u25A8 50',
          action: 'ev-heists:club:purchase',
          key: _0x374ae1,
        }
        _0x1d8497.push(_0x3f0b55)
        const _0x16311e = {
          item_id: 'heistdrill_red',
          cost: 50,
        }
        const _0x33ac47 = {
          icon: 'th',
          title: 'Hardened Drill',
          titleRight: '\u25A8 50',
          action: 'ev-heists:club:purchase',
          key: _0x16311e,
        }
        _0x1d8497.push(_0x33ac47)
        const _0x2a21e3 = {
          item_id: 'heistelectronickit_red',
          cost: 20,
        }
        const _0x3be03e = {
          icon: _0x31ec01,
          title: 'Hardened Electronic Kit',
          titleRight: '\u25A8 20',
          action: 'ev-heists:club:purchase',
          key: _0x2a21e3,
        }
        _0x1d8497.push(_0x3be03e)
        const _0x47a2f4 = {
          item_id: 'jammingdevice',
          cost: 15,
        }
        const _0x5c865e = {
          icon: 'broadcast-tower',
          title: 'Jamming Device',
          titleRight: '\u25A8 15',
          action: 'ev-heists:club:purchase',
          key: _0x47a2f4,
        }
        _0x1d8497.push(_0x5c865e)
        const _0x462cb1 = {
          item_id: 'heistlaptop4',
          cost: 200,
        }
        const _0x2a35bd = {
          icon: _0x4a73fa,
          title: 'Red Laptop',
          titleRight: '\u25A8 200',
          action: 'ev-heists:club:purchase',
          key: _0x462cb1,
        }
        _0x1d8497.push(_0x2a35bd)
      }
      if (_0x5b525b > 3) {
        const _0x4c81b1 = {}
        _0x4c81b1['_heist'] = 'oilrig'
        _0x4c81b1['_hideKeys'] = ['_heist']
        const _0x3758fe = {
          item_id: 'heistentrycard',
          cost: 1000,
          meta: _0x4c81b1,
        }
        const _0xb7b8dd = {
          icon: _0x4a73fa,
          title: 'Entry Keycard',
          titleRight: '\u25A8 1000',
          action: 'ev-heists:club:purchase',
          key: _0x3758fe,
        }
        _0x1d8497.push(_0xb7b8dd)
      }
      _0x1f1484.g.exports['ev-ui'].showContextMenu(_0x1d8497)
    })
    _0x336a39.on('ev-heists:club:talk:loot', async () => {
      const _0x620e2b = await _0x8f3134.execute('ev-heists:club:loot')
    })
    _0x336a39.on('ev-heists:club:pc', async () => {
      const _0x187818 = await _0x8f3134.execute('ev-heists:club:pc')
    })
    _0x336a39.on(
      'ev-heists:club:elevator',
      async (_0x40a64a, _0x513d84, _0x1a4e91) => {
        if (_0x40a64a.exit) {
          DoScreenFadeOut(500)
          await _0x35ac5b(500)
          const _0x3fc7a8 = await _0x8f3134.execute('ev-heists:club:exit')
          _0x3fc7a8 &&
            (SetEntityCoords(
              PlayerPedId(),
              53.45,
              160.57,
              104.71,
              false,
              false,
              false,
              false
            ),
            SetEntityHeading(PlayerPedId(), 250))
          await _0x35ac5b(500)
          DoScreenFadeIn(500)
          _0x542c45()
          return
        }
        const _0x1849f9 = await _0x39ae38(),
          _0x4b9559 = {
            title: 'Level 1',
            action: 'ev-heists:club:useElevator',
            disabled: _0x1849f9 < 1,
            key: 1,
          }
        const _0x3061bc = {
          title: 'Level 2',
          action: 'ev-heists:club:useElevator',
          disabled: _0x1849f9 < 2,
          key: 2,
        }
        const _0xa76d28 = {
          title: 'Level 3',
          action: 'ev-heists:club:useElevator',
          disabled: _0x1849f9 < 3,
          key: 3,
        }
        const _0x3cab40 = {
          title: 'Level 4',
          action: 'ev-heists:club:useElevator',
          disabled: _0x1849f9 < 4,
          key: 4,
        }
        const _0x16671e = {
          title: 'Level 5',
          action: 'ev-heists:club:useElevator',
          disabled: _0x1849f9 < 5,
          key: 5,
        }
        const _0x39f474 = [
          _0x4b9559,
          _0x3061bc,
          _0xa76d28,
          _0x3cab40,
          _0x16671e,
        ]
        _0x1f1484.g.exports['ev-ui'].showContextMenu(_0x39f474)
      }
    )
    RegisterUICallback(
      'ev-heists:club:useElevator',
      async (_0x2a4dc7, _0x395610) => {
        const _0x49513e = _0x2a4dc7.key,
          _0x838585 = await _0x39ae38()
        if (_0x838585 < _0x49513e) {
          return
        }
        const _0x21aaf4 = await _0x1f45d4.taskBar(
          3000,
          'Waiting for elevator...',
          true,
          {
            distance: 1,
            entity: PlayerPedId(),
          }
        )
        if (_0x21aaf4 !== 100) {
          return
        }
        DoScreenFadeOut(500)
        await _0x35ac5b(500)
        const _0x38349e = await _0x8f3134.execute(
          'ev-heists:club:useElevator',
          _0x49513e
        )
        _0x38349e &&
          (SetEntityCoords(
            PlayerPedId(),
            -1618.59,
            -2998.53,
            -78.14,
            false,
            false,
            false,
            false
          ),
          SetEntityHeading(PlayerPedId(), 0),
          _0x47d5d0(_0x49513e))
        await _0x35ac5b(500)
        DoScreenFadeIn(500)
        const _0x391a69 = {
          ok: true,
          message: '',
        }
        const _0x4f668b = {}
        return (
          (_0x4f668b.data = 'success'),
          (_0x4f668b.meta = _0x391a69),
          _0x395610(_0x4f668b)
        )
      }
    )
    RegisterUICallback(
      'ev-heists:club:purchase',
      async (_0x55dab9, _0x4992a9) => {
        const _0x9abe41 = {
          ok: true,
          message: '',
        }
        const _0x560b15 = {
          data: 'success',
          meta: _0x9abe41,
        }
        _0x4992a9(_0x560b15)
        const _0x53a408 = _0x8f3134.execute(
          'ev-heists:club:purchase',
          _0x55dab9.key
        )
      }
    )
    const _0x47d5d0 = async (_0x4a5f25) => {
        for (const _0x341f2f of _0x59e564) {
          !IsInteriorPropEnabled(_0x424d41, _0x341f2f) &&
            EnableInteriorProp(_0x424d41, _0x341f2f)
        }
        DisableInteriorProp(_0x424d41, 'Int01_ba_Style01')
        DisableInteriorProp(_0x424d41, 'Int01_ba_Style02')
        DisableInteriorProp(_0x424d41, 'Int01_ba_Style03')
        EnableInteriorProp(
          _0x424d41,
          'Int01_ba_Style0' + Math.min(3, _0x4a5f25)
        )
        _0x5b525b = _0x4a5f25
        RequestScriptAudioBank(
          'DLC_BATTLE/BTL_CLUB_OPEN_TRANSITION_CROWD',
          false
        )
        SetAmbientZoneState(
          'IZ_ba_dlc_int_01_ba_Int_01_main_area',
          false,
          false
        )
        await _0x35ac5b(100)
        RefreshInterior(_0x424d41)
        await _0x35ac5b(100)
        StartAudioScene('DLC_Ba_NightClub_Scene')
      },
      _0x542c45 = async () => {
        IsAudioSceneActive('DLC_Ba_NightClub_Scene') &&
          StopAudioScene('DLC_Ba_NightClub_Scene')
        SetAmbientZoneState('IZ_ba_dlc_int_01_ba_Int_01_main_area', true, true)
        ReleaseScriptAudioBank()
      },
      _0x2dd819 = {
        cb: 4,
        cg: 4,
        gg: 4,
        seaside: 4,
        hydra: 4,
        st: 4,
        rust: 3,
        angels: 3,
        nbc: 3,
        bsk: 3,
        hoa: 3,
        bbmc: 2,
        mandem: 2,
        lostmc: 2,
        redline: 2,
        vagos: 2,
        yokai: 2,
        ballas: 2,
        gsf: 2,
      }
    _0x2dd819['8nbeyond'] = 2
    const _0x3ba6bf = _0x2dd819,
      _0x1f5c70 = {}
    _0x1f5c70['6843'] = 4
    const _0x9df82a = _0x1f5c70,
      _0x39ae38 = async () => {
        var _0x581c7d, _0x207d6f
        const _0x52f7d1 = _0x1f1484.g.exports['ev-config'].GetMiscConfig(
            'heists.access.whitelisted'
          ),
          _0x3e1225 = await _0x59b6c5.get(),
          _0x413e04 = _0x1f1484.g.exports.isPed.isPed('cid')
        if (_0x52f7d1) {
          return (_0x207d6f =
            (_0x581c7d = _0x9df82a['' + _0x413e04]) !== null &&
            _0x581c7d !== void 0
              ? _0x581c7d
              : _0x3ba6bf[_0x3e1225]) !== null && _0x207d6f !== void 0
            ? _0x207d6f
            : 1
        }
        const _0x1c0af9 = _0x1f1484.g.exports['ev-config'].GetMiscConfig(
          'heists.access.level'
        )
        return _0x1c0af9 !== null && _0x1c0af9 !== void 0 ? _0x1c0af9 : 1
      },
      _0x5b369a = { timeToLive: 900000 }
    const _0x59b6c5 = _0x45415b.cache(async (_0x59541c) => {
      const _0x1baf35 = await _0x8f3134.execute('ev-gangsystem:getCurrentGang')
      return [true, _0x1baf35]
    }, _0x5b369a)
    _0x1f1484.g.exports('GetHeistLevel', _0x39ae38)
    const _0x29fccf = async (_0x5937e7, _0xf81295, _0x1548ad, _0x16b1df) => {
      const _0x530002 = JSON.parse(_0xf81295)
      if (!_0x530002) {
        return
      }
      switch (_0x530002['_heist']) {
        case 'oilrig':
          emit('DoLongHudText', 'Access to Naval Port')
          break
      }
    }
    class _0x72bbde {
      constructor(
        _0x5b3162,
        _0x43107c,
        _0x2f1c21 = 'interval',
        _0x49b452 = {}
      ) {
        this.callback = _0x5b3162
        this.delay = _0x43107c
        this.mode = _0x2f1c21
        this.scheduled = {}
        this.tick = 0
        this.data = _0x49b452
        this.hooks = new Map([
          ['active', []],
          ['preStop', []],
          ['preStart', []],
          ['afterStop', []],
          ['afterStart', []],
          ['stopAborted', []],
          ['startAborted', []],
        ])
      }
      get ['isActive']() {
        return this.active
      }
      async ['start']() {
        if (this.active) {
          return
        }
        this.aborted = false
        this.scheduled = {}
        const _0x22bfa6 = this.hooks.get('preStart')
        try {
          for (const _0x1dbd44 of _0x22bfa6) {
            if (!this.aborted) {
              await _0x1dbd44.call(this)
            }
          }
        } catch (_0x59a021) {
          this.aborted = true
          console.log('Error while calling pre-start hook', _0x59a021.message)
        }
        if (this.aborted) {
          try {
            const _0x3a26f0 = this.hooks.get('startAborted')
            for (const _0x346e13 of _0x3a26f0) {
              await _0x346e13.call(this)
            }
          } catch (_0x15ff73) {
            console.log(
              'Error while calling start-aborted hook',
              _0x15ff73.message
            )
          }
          return
        }
        this.active = true
        const _0xf26c4 = this.hooks.get('active')
        switch (this.mode) {
          case 'tick': {
            this.threadId = _0x4d5136.setTick(async () => {
              this.tick += 1
              try {
                await this.callback.call(this)
                for (const _0x4f67e9 of _0xf26c4) {
                  await _0x4f67e9.call(this)
                }
              } catch (_0x2cda31) {
                console.log(
                  'Error while calling active hook',
                  _0x2cda31.message
                )
              }
              this.delay > 0 &&
                (await new Promise((_0x50b21e) =>
                  _0x4d5136.setTimeout(_0x50b21e, this.delay)
                ))
            })
            break
          }
          case 'interval': {
            this.threadId = _0x4d5136.setInterval(async () => {
              this.tick += 1
              try {
                await this.callback.call(this)
                for (const _0x475a75 of _0xf26c4) {
                  await _0x475a75.call(this)
                }
              } catch (_0x41a181) {
                console.log(
                  'Error while calling active hook',
                  _0x41a181.message
                )
              }
            }, this.delay)
            break
          }
          case 'timeout': {
            const _0x686edb = () => {
              this.active &&
                (this.threadId = _0x4d5136.setTimeout(async () => {
                  this.tick += 1
                  try {
                    await this.callback.call(this)
                    for (const _0x2f229c of _0xf26c4) {
                      await _0x2f229c.call(this)
                    }
                  } catch (_0xd8e6c7) {
                    console.log(
                      'Error while calling active hook',
                      _0xd8e6c7.message
                    )
                  }
                  return _0x686edb()
                }, this.delay))
            }
            _0x686edb()
            break
          }
        }
        const _0x3603d9 = this.hooks.get('afterStart')
        try {
          for (const _0x20735c of _0x3603d9) {
            await _0x20735c.call(this)
          }
        } catch (_0x19cd0e) {
          console.log('Error while calling after-start hook', _0x19cd0e.message)
        }
      }
      async ['stop']() {
        if (!this.active) {
          return
        }
        const _0x1d0486 = this.hooks.get('preStop')
        try {
          for (const _0x447c65 of _0x1d0486) {
            if (!this.aborted) {
              await _0x447c65.call(this)
            }
          }
        } catch (_0xaf5469) {
          this.aborted = true
          console.log('Error while calling pre-stop hook', _0xaf5469.message)
        }
        this.active = false
        switch (this.mode) {
          case 'tick': {
            _0x4d5136.clearTick(this.threadId)
            break
          }
          case 'interval': {
            _0x4d5136.clearInterval(this.threadId)
            break
          }
          case 'timeout': {
            _0x4d5136.clearTimeout(this.threadId)
            break
          }
        }
        if (this.aborted) {
          try {
            const _0x5590ec = this.hooks.get('stopAborted')
            for (const _0x505232 of _0x5590ec) {
              await _0x505232.call(this)
            }
          } catch (_0x319a5f) {
            console.log(
              'Error while calling stop-aborted hook',
              _0x319a5f.message
            )
          }
          return
        }
        const _0x5caddb = this.hooks.get('afterStop')
        try {
          for (const _0x49bfbb of _0x5caddb) {
            await _0x49bfbb.call(this)
          }
        } catch (_0x456fbc) {
          console.log('Error while calling after-stop hook', _0x456fbc.message)
        }
      }
      ['abort']() {
        this.aborted = true
      }
      ['addHook'](_0x2280d1, _0x3c4613) {
        var _0x4cae33
        ;(_0x4cae33 = this.hooks.get(_0x2280d1)) === null ||
        _0x4cae33 === void 0
          ? void 0
          : _0x4cae33.push(_0x3c4613)
      }
      ['setNextTick'](_0x4412e9, _0x55ca27) {
        this.scheduled[_0x4412e9] = this.tick + _0x55ca27
      }
      ['canTick'](_0x41810e) {
        return (
          this.scheduled[_0x41810e] === undefined ||
          this.tick >= this.scheduled[_0x41810e]
        )
      }
    }
    class _0xf8285b {
      constructor(_0x137911 = 0, _0x52d473 = 0, _0x527096 = 0) {
        this.x = _0x137911
        this.y = _0x52d473
        this.z = _0x527096
      }
      ['setFromArray'](_0x21d498) {
        return (
          (this.x = _0x21d498[0]),
          (this.y = _0x21d498[1]),
          (this.z = _0x21d498[2]),
          this
        )
      }
      ['getArray']() {
        return [this.x, this.y, this.z]
      }
      ['add'](_0x588e5c) {
        return (
          (this.x += _0x588e5c.x),
          (this.y += _0x588e5c.y),
          (this.z += _0x588e5c.z),
          this
        )
      }
      ['addScalar'](_0x239a64) {
        return (
          (this.x += _0x239a64),
          (this.y += _0x239a64),
          (this.z += _0x239a64),
          this
        )
      }
      ['sub'](_0x8e15b4) {
        return (
          (this.x -= _0x8e15b4.x),
          (this.y -= _0x8e15b4.y),
          (this.z -= _0x8e15b4.z),
          this
        )
      }
      ['equals'](_0x3e9c2a) {
        return (
          this.x === _0x3e9c2a.x &&
          this.y === _0x3e9c2a.y &&
          this.z === _0x3e9c2a.z
        )
      }
      ['subScalar'](_0x11a704) {
        return (
          (this.x -= _0x11a704),
          (this.y -= _0x11a704),
          (this.z -= _0x11a704),
          this
        )
      }
      ['multiply'](_0x4f8591) {
        return (
          (this.x *= _0x4f8591.x),
          (this.y *= _0x4f8591.y),
          (this.z *= _0x4f8591.z),
          this
        )
      }
      ['multiplyScalar'](_0x5cfc95) {
        return (
          (this.x *= _0x5cfc95),
          (this.y *= _0x5cfc95),
          (this.z *= _0x5cfc95),
          this
        )
      }
      ['round']() {
        return (
          (this.x = Math.round(this.x)),
          (this.y = Math.round(this.y)),
          (this.z = Math.round(this.z)),
          this
        )
      }
      ['floor']() {
        return (
          (this.x = Math.floor(this.x)),
          (this.y = Math.floor(this.y)),
          (this.z = Math.floor(this.z)),
          this
        )
      }
      ['ceil']() {
        return (
          (this.x = Math.ceil(this.x)),
          (this.y = Math.ceil(this.y)),
          (this.z = Math.ceil(this.z)),
          this
        )
      }
      ['magnitude']() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
      }
      ['normalize']() {
        let _0x5e4591 = this.magnitude()
        if (isNaN(_0x5e4591)) {
          _0x5e4591 = 0
        }
        return this.multiplyScalar(1 / _0x5e4591)
      }
      ['forward']() {
        const _0x347b5b = _0xf8285b
          .fromObject(this)
          .multiplyScalar(Math.PI / 180)
        return new _0xf8285b(
          -Math.sin(_0x347b5b.z) * Math.abs(Math.cos(_0x347b5b.x)),
          Math.cos(_0x347b5b.z) * Math.abs(Math.cos(_0x347b5b.x)),
          Math.sin(_0x347b5b.x)
        )
      }
      ['cross'](_0x2a1e86) {
        return new _0xf8285b(
          this.y * _0x2a1e86.z - this.z * _0x2a1e86.y,
          this.z * _0x2a1e86.x - this.x * _0x2a1e86.z,
          this.x * _0x2a1e86.y - this.y * _0x2a1e86.x
        )
      }
      ['getDistance'](_0x3be73d) {
        const [_0x299ecc, _0x227892, _0x1a1fd9] = [
          this.x - _0x3be73d.x,
          this.y - _0x3be73d.y,
          this.z - _0x3be73d.z,
        ]
        return Math.sqrt(
          _0x299ecc * _0x299ecc + _0x227892 * _0x227892 + _0x1a1fd9 * _0x1a1fd9
        )
      }
      ['getDistanceFromArray'](_0x436d24) {
        const [_0x11b40d, _0x29686e, _0x325f1d] = [
          this.x - _0x436d24[0],
          this.y - _0x436d24[1],
          this.z - _0x436d24[2],
        ]
        return Math.sqrt(
          _0x11b40d * _0x11b40d + _0x29686e * _0x29686e + _0x325f1d * _0x325f1d
        )
      }
      static ['fromArray'](_0xbfa796) {
        return new _0xf8285b(_0xbfa796[0], _0xbfa796[1], _0xbfa796[2])
      }
      static ['fromObject'](_0x17df0b) {
        return new _0xf8285b(_0x17df0b.x, _0x17df0b.y, _0x17df0b.z)
      }
    }
    const _0x3f82a2 = {
      id: 'legion_square',
      coords: [146.71, -1045.68, 29.37],
      hash: 2121050683,
      headingClosed: 249.85,
      headingOpen: 151.85,
    }
    const _0x293523 = {
      id: 1,
      name: 'Legion Square',
      doorConf: _0x3f82a2,
      panelCoords: [146.55, -1045.68, 29.37, 160],
      powerCoords: [138.49, -1056.33, 29.2],
      frontDoorId: 1068,
      vaultDoorId: 1069,
      innerDoorId: 89,
    }
    const _0x2110da = {
      id: 'pink_cage',
      coords: [310.81, -284.02, 54.17],
      hash: 2121050683,
      headingClosed: 249.865,
      headingOpen: 151.865,
    }
    const _0x1f3923 = {
      id: 2,
      name: 'Pink Cage',
      doorConf: _0x2110da,
      panelCoords: [310.81, -284.02, 54.17, 160],
      powerCoords: [319.99, -316.01, 51.12],
      frontDoorId: 1070,
      vaultDoorId: 1071,
      innerDoorId: 512,
    }
    const _0x41b890 = {
      id: 'hawick',
      coords: [-354.18, -54.9, 49.05],
      hash: 2121050683,
      headingClosed: 250.86,
      headingOpen: 152.86,
    }
    const _0x2c1ca4 = {
      id: 3,
      name: 'Hawick',
      doorConf: _0x41b890,
      panelCoords: [-354.18, -54.9, 49.05, 160],
      powerCoords: [-356.42, -50.25, 54.43],
      frontDoorId: 1072,
      vaultDoorId: 1073,
      innerDoorId: 513,
    }
    const _0x27a1f2 = {
      id: 'life_invader',
      coords: [-1211.2, -336.62, 37.79],
      hash: 2121050683,
      headingClosed: 296.86,
      headingOpen: 198.86,
    }
    const _0x59d431 = {
      id: 4,
      name: 'LifeInvader',
      doorConf: _0x27a1f2,
      panelCoords: [-1211.4, -336.52, 37.79, 205],
      powerCoords: [-1216.92, -332.87, 42.13],
      frontDoorId: 1074,
      vaultDoorId: 1075,
      innerDoorId: 514,
    }
    const _0xba015b = {
      id: 'great_ocean',
      coords: [-2956.77, 481.33, 15.7],
      hash: 2121050683,
      headingClosed: 357.542,
      headingOpen: 259.542,
    }
    const _0x54d29c = {
      id: 5,
      name: 'Great Ocean',
      doorConf: _0xba015b,
      panelCoords: [-2956.77, 481.13, 15.7, 270],
      powerCoords: [-2947.64, 481.09, 15.45],
      frontDoorId: 1076,
      vaultDoorId: 1077,
      innerDoorId: 515,
    }
    const _0xd6b062 = {
      id: 'harmony',
      coords: [1176.45, 2712.53, 38.1],
      hash: 2121050683,
      headingClosed: 90,
      headingOpen: 0.5,
    }
    const _0x43eddc = {
      id: 6,
      name: 'Harmony',
      doorConf: _0xd6b062,
      panelCoords: [1176.5, 2712.53, 38.1, 0],
      powerCoords: [1157.79, 2709.07, 37.98],
      frontDoorId: 1078,
      vaultDoorId: 1079,
      innerDoorId: 516,
    }
    const _0x26f775 = [
      _0x293523,
      _0x1f3923,
      _0x2c1ca4,
      _0x59d431,
      _0x54d29c,
      _0x43eddc,
    ]
    const _0x4ff91c = (_0x1dc3c3 = 25) => {
        const _0x4eb2af = GetActivePlayers(),
          _0x2018bf = Vector3.fromArray(GetEntityCoords(PlayerPedId(), false)),
          _0x27f69a = []
        for (const _0x3e84e4 of _0x4eb2af) {
          const _0x1f4dce = GetPlayerPed(_0x3e84e4),
            _0x243468 = Vector3.fromArray(GetEntityCoords(_0x1f4dce, false)),
            _0xfe6dd2 = _0x2018bf.getDistance(_0x243468)
          _0xfe6dd2 < _0x1dc3c3 && _0x27f69a.push(GetPlayerServerId(_0x3e84e4))
        }
        return _0x27f69a
      },
      _0x530a45 = async (_0x3314fa, _0x3229c3, _0x453882) => {
        const _0x182ef4 = 'anim@heists@ornate_bank@thermal_charge',
          _0x26f9c1 = 'hei_p_m_bag_var22_arm_s',
          _0x2e2be2 = 'hei_prop_heist_thermite'
        await Promise.all([
          _0x67beee.loadAnim(_0x182ef4),
          _0x67beee.loadModel(_0x26f9c1),
          _0x67beee.loadModel(_0x2e2be2),
        ])
        const _0xe825c6 = PlayerPedId()
        SetEntityHeading(_0xe825c6, _0x3314fa.h)
        await _0x35ac5b(100)
        const [_0x5f3297, _0x2bbf41, _0x251c9f] = GetEntityRotation(
            _0xe825c6,
            0
          ),
          _0x46a2e7 = NetworkCreateSynchronisedScene(
            _0x3314fa.x,
            _0x3314fa.y,
            _0x3314fa.z,
            _0x5f3297,
            _0x2bbf41,
            _0x251c9f + _0x3229c3,
            2,
            false,
            false,
            1065353216,
            0,
            1.3
          ),
          _0x53fc09 = CreateObject(
            _0x26f9c1,
            _0x3314fa.x,
            _0x3314fa.y,
            _0x3314fa.z,
            true,
            true,
            false
          )
        SetEntityCollision(_0x53fc09, false, true)
        NetworkAddPedToSynchronisedScene(
          _0xe825c6,
          _0x46a2e7,
          _0x182ef4,
          'thermal_charge',
          1.5,
          -4,
          1,
          16,
          1148846080,
          0
        )
        NetworkAddEntityToSynchronisedScene(
          _0x53fc09,
          _0x46a2e7,
          _0x182ef4,
          'bag_thermal_charge',
          4,
          -8,
          1
        )
        NetworkStartSynchronisedScene(_0x46a2e7)
        await _0x35ac5b(1500)
        const [_0x2045c3, _0x563820, _0x49cb70] = GetEntityCoords(
            _0xe825c6,
            false
          ),
          _0x2f50ad = CreateObject(
            _0x2e2be2,
            _0x2045c3,
            _0x563820,
            _0x49cb70 + 0.2,
            true,
            true,
            true
          )
        SetEntityCollision(_0x2f50ad, false, true)
        AttachEntityToEntity(
          _0x2f50ad,
          _0xe825c6,
          GetPedBoneIndex(_0xe825c6, 28422),
          0,
          0,
          0,
          0,
          0,
          200,
          true,
          true,
          false,
          true,
          1,
          true
        )
        await _0x35ac5b(4000)
        DeleteObject(_0x53fc09)
        DetachEntity(_0x2f50ad, true, true)
        FreezeEntityPosition(_0x2f50ad, true)
        NetworkStopSynchronisedScene(_0x46a2e7)
        const _0x1309f6 = await _0x453882
        _0x1309f6 &&
          (TriggerServerEvent(
            'fx:ThermiteChargeEnt',
            NetworkGetNetworkIdFromEntity(_0x2f50ad)
          ),
          TaskPlayAnim(
            _0xe825c6,
            'anim@heists@ornate_bank@thermal_charge',
            'cover_eyes_intro',
            8,
            8,
            1000,
            36,
            1,
            false,
            false,
            false
          ),
          TaskPlayAnim(
            _0xe825c6,
            'anim@heists@ornate_bank@thermal_charge',
            'cover_eyes_loop',
            8,
            8,
            6000,
            49,
            1,
            false,
            false,
            false
          ),
          await _0x35ac5b(4000),
          ClearPedTasks(_0xe825c6),
          emit('Evidence:StateSet', 16, 3600),
          emit('evidence:thermite'))
        await _0x35ac5b(2000)
        _0x1f1484.g.exports['ev-sync'].SyncedExecution(
          'DeleteEntity',
          +_0x2f50ad
        )
      },
      _0x27b2d8 = async (_0x122c26, _0x116a91, _0x32ea9c = 60) => {
        FreezeEntityPosition(_0x122c26, true)
        const _0x1adda0 = GetEntityHeading(_0x122c26),
          _0x1b3279 = Math.abs(_0x1adda0 - _0x116a91)
        if (!_0x116a91 || Math.abs(_0x1b3279) < 1) {
          return
        }
        const _0x5dd409 = _0x1b3279 / _0x32ea9c
        let _0x2a05af = 0
        SetEntityCollision(_0x122c26, false, false)
        while (_0x2a05af <= _0x32ea9c) {
          await _0x35ac5b(1)
          _0x2a05af++
          if (_0x1adda0 > _0x116a91) {
            SetEntityHeading(_0x122c26, _0x1adda0 - _0x5dd409 * _0x2a05af)
            continue
          }
          SetEntityHeading(_0x122c26, _0x1adda0 + _0x5dd409 * _0x2a05af)
        }
        SetEntityHeading(_0x122c26, _0x116a91)
        FreezeEntityPosition(_0x122c26, true)
        await _0x35ac5b(1)
        SetEntityCollision(_0x122c26, true, true)
      },
      _0x28e004 = async (_0xd5d9ea, _0x1d3590, _0x5882cd) => {
        const _0x436ced = PlayerPedId()
        ClearPedTasksImmediately(_0x436ced)
        const [_0x2db600, _0x11f69b, _0x500763] = GetObjectOffsetFromCoords(
          _0xd5d9ea[0],
          _0xd5d9ea[1],
          _0xd5d9ea[2],
          _0x1d3590,
          -0.5,
          -0.2,
          0
        )
        TaskGoStraightToCoord(
          _0x436ced,
          _0x2db600,
          _0x11f69b,
          _0x500763,
          2,
          -1,
          _0x1d3590,
          0
        )
        const _0x56dd31 = 'anim@heists@ornate_bank@hack',
          _0x45df53 = 'hei_prop_hst_laptop',
          _0x43121a = 'hei_p_m_bag_var22_arm_s',
          _0x40afd8 = 'hei_prop_heist_card_hack_02'
        await Promise.all([
          _0x67beee.loadAnim(_0x56dd31),
          _0x67beee.loadModel(_0x45df53),
          _0x67beee.loadModel(_0x43121a),
          _0x67beee.loadModel(_0x40afd8),
        ])
        await _0x45415b.waitForCondition(() => {
          return !GetIsTaskActive(_0x436ced, 35)
        }, 30000)
        ClearPedTasksImmediately(_0x436ced)
        await _0x35ac5b(1)
        SetEntityHeading(_0x436ced, _0x1d3590)
        await _0x35ac5b(1)
        TaskPlayAnim(
          _0x436ced,
          _0x56dd31,
          'hack_enter',
          8,
          0,
          -1,
          0,
          -1,
          false,
          false,
          false
        )
        await _0x35ac5b(8300)
        const [_0x67cb15, _0x51957a, _0x57abcd] =
            GetOffsetFromEntityInWorldCoords(_0x436ced, 0.2, 0.6, 0),
          _0x1d435c = CreateObject(
            _0x45df53,
            _0x67cb15,
            _0x51957a,
            _0x57abcd,
            true,
            true,
            false
          ),
          [_0x10ce1a, _0x3c66b8, _0x11010f] = GetEntityRotation(_0x436ced, 2)
        SetEntityRotation(_0x1d435c, _0x10ce1a, _0x3c66b8, _0x11010f, 2, true)
        PlaceObjectOnGroundProperly(_0x1d435c)
        TaskPlayAnim(
          _0x436ced,
          _0x56dd31,
          'hack_loop',
          9999,
          0.5,
          -1,
          1,
          0,
          false,
          false,
          false
        )
        await _0x5882cd
        _0x1f1484.g.exports['ev-sync'].SyncedExecution(
          'DeleteEntity',
          +_0x1d435c
        )
        ClearPedTasksImmediately(_0x436ced)
      },
      _0x15d372 = async (_0x24c4ca) => {
        emit('attachItem', 'minigameDrill')
        const _0x52005d = 'anim@heists@fleeca_bank@drilling'
        await _0x67beee.loadAnim(_0x52005d)
        const _0x3835f2 = PlayerPedId()
        TaskPlayAnim(
          _0x3835f2,
          _0x52005d,
          'drill_left',
          2,
          -8,
          180,
          49,
          0,
          false,
          false,
          false
        )
        await _0x35ac5b(100)
        TaskPlayAnim(
          _0x3835f2,
          _0x52005d,
          'drill_left',
          2,
          -8,
          1800000,
          49,
          0,
          false,
          false,
          false
        )
        await _0x24c4ca
        ClearPedTasksImmediately(_0x3835f2)
        emit('destroyProp')
      },
      _0x3c9a67 = () => {
        const _0x22830c = _0xf8285b.fromArray(
          GetEntityCoords(PlayerPedId(), false)
        )
        ShootSingleBulletBetweenCoords(
          _0x22830c.x,
          _0x22830c.y,
          _0x22830c.z,
          _0x22830c.x,
          _0x22830c.y,
          _0x22830c.z + 0.5,
          0,
          true,
          GetHashKey('WEAPON_STUNGUN'),
          -1,
          true,
          false,
          5
        )
      },
      _0x2264b6 = (_0x115ea9, _0x1235ad, _0x459fc7, _0x30ac5d) => {
        const _0x4403d8 = _0x115ea9,
          [_0x5be559, , _0x2435c4] = _0x1235ad.map(
            (_0x4219e3) => (Math.PI / 180) * _0x4219e3
          ),
          _0x596097 = Math.abs(Math.cos(_0x5be559)),
          _0x5dc14c = [
            -Math.sin(_0x2435c4) * _0x596097,
            Math.cos(_0x2435c4) * _0x596097,
            Math.sin(_0x5be559),
          ],
          _0x52becf = _0x5dc14c.map(
            (_0x19eec4, _0x482f99) => _0x4403d8[_0x482f99] + _0x19eec4
          ),
          _0x563073 = _0x5dc14c.map(
            (_0x336341, _0x4a552d) => _0x4403d8[_0x4a552d] + _0x336341 * 50
          ),
          _0x437b6b = StartShapeTestSweptSphere(
            _0x52becf[0],
            _0x52becf[1],
            _0x52becf[2],
            _0x563073[0],
            _0x563073[1],
            _0x563073[2],
            0.2,
            _0x459fc7,
            _0x30ac5d,
            7
          )
        return GetShapeTestResultIncludingMaterial(_0x437b6b)
      },
      _0x4e2d85 = (
        _0x571a01,
        _0x92ba8c,
        _0x38f05b,
        _0x230d86,
        _0x436026,
        _0x49ca4f,
        _0x5eb235 = 0
      ) => {
        SetTextColour(_0x230d86[0], _0x230d86[1], _0x230d86[2], _0x230d86[3])
        SetTextOutline()
        SetTextScale(0, _0x436026)
        SetTextFont(_0x49ca4f !== null && _0x49ca4f !== void 0 ? _0x49ca4f : 0)
        SetTextJustification(_0x5eb235)
        if (_0x5eb235 === 2) {
          SetTextWrap(0, 0.575)
        }
        SetTextEntry('STRING')
        AddTextComponentString(
          _0x38f05b !== null && _0x38f05b !== void 0 ? _0x38f05b : 'Dummy text'
        )
        EndTextCommandDisplayText(_0x571a01, _0x92ba8c)
      }
    const _0x5a3b9b = () => {}
    let _0x3bf188
    RegisterUICallback('ev-ui:heists:invite', async (_0x2c8bd3, _0x282611) => {
      const _0x1bf556 = await _0x8f3134.execute(
          'ev-heists:ui:invite',
          _0x2c8bd3
        ),
        _0x444cbc = {
          ok: _0x1bf556.success,
          message: _0x1bf556.message,
        }
      const _0x10616d = {}
      return (
        (_0x10616d.data = 'success'),
        (_0x10616d.meta = _0x444cbc),
        _0x282611(_0x10616d)
      )
    })
    RegisterUICallback(
      'ev-ui:heists:createGroup',
      async (_0x5cb794, _0x230ae6) => {
        await _0x8f3134.execute('ev-heists:ui:createGroup')
        const _0x5c42ec = {
          ok: true,
          message: '',
        }
        const _0x1848fc = {}
        return (
          (_0x1848fc.data = 'success'),
          (_0x1848fc.meta = _0x5c42ec),
          _0x230ae6(_0x1848fc)
        )
      }
    )
    RegisterUICallback(
      'ev-ui:heists:leaveGroup',
      async (_0x189b04, _0x33616c) => {
        await _0x8f3134.execute('ev-heists:ui:leaveGroup')
        _0x3bf188 = null
        const _0x438121 = {
          ok: true,
          message: '',
        }
        const _0x3c53b7 = {}
        return (
          (_0x3c53b7.data = 'success'),
          (_0x3c53b7.meta = _0x438121),
          _0x33616c(_0x3c53b7)
        )
      }
    )
    RegisterUICallback(
      'ev-ui:heists:getGroup',
      async (_0x3ec345, _0xf2473b) => {
        const _0xfc580b = await _0x8f3134.execute('ev-heists:ui:getGroup')
        _0x3bf188 = _0xfc580b
        const _0x28b6d2 = {
          ok: true,
          message: '',
        }
        const _0x2e0324 = {}
        return (
          (_0x2e0324.data = _0xfc580b),
          (_0x2e0324.meta = _0x28b6d2),
          _0xf2473b(_0x2e0324)
        )
      }
    )
    RegisterUICallback(
      'ev-ui:heists:groupAction',
      async (_0xbae837, _0x12b3e0) => {
        await _0x8f3134.execute('ev-heists:ui:groupAction', _0xbae837)
        const _0x461460 = {
          ok: true,
          message: '',
        }
        const _0x1cca47 = {}
        return (
          (_0x1cca47.data = 'success'),
          (_0x1cca47.meta = _0x461460),
          _0x12b3e0(_0x1cca47)
        )
      }
    )
    RegisterUICallback('ev-ui:heists:stop', async (_0x1273d8, _0x2db785) => {
      await _0x8f3134.execute('ev-heists:ui:stop', 'Leader stopped the heist')
      const _0x4c0c3b = {
        ok: true,
        message: '',
      }
      const _0x39daac = {}
      return (
        (_0x39daac.data = 'success'),
        (_0x39daac.meta = _0x4c0c3b),
        _0x2db785(_0x39daac)
      )
    })
    _0x336a39.onNet('ev-heists:ui:groupInvite', async (_0x52db8f) => {
      const _0x723c94 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
        'vpnxj',
        1,
        false,
        true
      )
      if (!_0x723c94) {
        return
      }
      const _0x35b821 = await _0x1f45d4.phoneConfirmation(
        'Heist Invite',
        'You were invited to a group.'
      )
      if (_0x35b821) {
        await _0x8f3134.execute('ev-heists:ui:joinGroup', _0x52db8f)
      }
    })
    _0x336a39.onNet('ev-heists:ui:phoneNotification', async (_0x3b24fc) => {
      _0x1f45d4.phoneNotification('Heist', _0x3b24fc, true, 'heist-signups')
    })
    _0x336a39.onNet('ev-heists:ui:groupUpdate', async (_0x4e589d) => {
      _0x3bf188 = _0x4e589d
    })
    on('ev-heists:ui:menuInvite', async (_0x356a69, _0x59421e, _0x57b5e7) => {
      const _0x5469eb = NetworkGetPlayerIndexFromPed(_0x59421e)
      if (!_0x5469eb) {
        return
      }
      const _0x27c8ec = GetPlayerServerId(_0x5469eb)
      if (!_0x27c8ec) {
        return
      }
      const _0x56a252 = {
        fromSource: true,
        groupId: _0x3bf188.id,
        serverId: _0x27c8ec,
      }
      const _0x5e6db2 = await _0x8f3134.execute(
        'ev-heists:ui:invite',
        _0x56a252
      )
      !_0x5e6db2.success && emit('DoLongHudText', _0x5e6db2.message, 2)
    })
    _0x1f1484.g.exports('GetGroup', () => _0x3bf188)
    const _0x28f166 = 'screwdriver',
      _0x4ec99c = [0.325, 0.475, 0.625, 0.775]
    let _0x3edd63
    const _0x572249 = async () => {
        const _0x1b05cf = RequestScaleformMovie('DRILLING'),
          _0x2fa0de = await _0x45415b.waitForCondition(
            () => HasScaleformMovieLoaded(_0x1b05cf),
            10000
          )
        if (_0x2fa0de) {
          return false
        }
        RequestScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL', false)
        RequestScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL_2', false)
        _0x506ed5()
        const _0x3d38f1 = {
          Active: true,
          DrillSpeed: 0,
          DrillPos: 0,
          DrillTemp: 0,
          HoleDepth: 0,
          HolesDrilled: _0x4ec99c.map((_0x4d436d) => ({
            passed: false,
            depth: _0x4d436d,
          })),
          DrillSoundId: -1,
        }
        _0xc8c8ee(_0x1b05cf, 'SET_SPEED', _0x3d38f1.DrillSpeed)
        _0xc8c8ee(_0x1b05cf, 'SET_DRILL_POSITION', _0x3d38f1.DrillPos)
        _0xc8c8ee(_0x1b05cf, 'SET_TEMPERATURE', _0x3d38f1.DrillTemp)
        _0xc8c8ee(_0x1b05cf, 'SET_HOLE_DEPTH', _0x3d38f1.HoleDepth)
        const _0x2b1b5 = setTick(() => {
          if (!_0x3d38f1.Active) {
            clearTick(_0x2b1b5)
            return
          }
          DrawScaleformMovieFullscreen(_0x1b05cf, 255, 255, 255, 255, 255)
          for (let _0x3627db = 8; _0x3627db <= 143; _0x3627db++) {
            DisableControlAction(0, _0x3627db, true)
          }
          _0x4635e7(_0x1b05cf, _0x3d38f1)
        })
        return (
          await _0x45415b.waitForCondition(() => !_0x3d38f1.Active, 180000),
          StopSound(_0x3d38f1.DrillSoundId),
          ReleaseSoundId(_0x3d38f1.DrillSoundId),
          ReleaseNamedScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL'),
          ReleaseNamedScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL_2'),
          _0x2009d9(),
          _0x3edd63
        )
      },
      _0x4635e7 = (_0x448289, _0x50bcfa) => {
        const _0x5b1767 = _0x50bcfa.DrillPos,
          _0x3c4c63 = GetFrameTime()
        if (_0x50bcfa.DrillSoundId === -1) {
          _0x50bcfa.DrillSoundId = GetSoundId()
        }
        if (IsDisabledControlJustPressed(0, 32)) {
          _0x50bcfa.DrillPos = Math.min(1, _0x50bcfa.DrillPos + 0.01)
          HasSoundFinished(_0x50bcfa.DrillSoundId) &&
            PlaySoundFromEntity(
              _0x50bcfa.DrillSoundId,
              'Drill',
              PlayerPedId(),
              'DLC_HEIST_FLEECA_SOUNDSET',
              false,
              0
            )
        } else {
          if (IsDisabledControlPressed(0, 32)) {
            _0x50bcfa.DrillPos = Math.min(
              1,
              _0x50bcfa.DrillPos +
                (0.1 * _0x3c4c63) / (Math.max(0.1, _0x50bcfa.DrillTemp) * 10)
            )
          } else {
            if (IsDisabledControlJustPressed(0, 33)) {
              _0x50bcfa.DrillPos = Math.max(0, _0x50bcfa.DrillPos - 0.01)
            } else {
              IsDisabledControlPressed(0, 33) &&
                (_0x50bcfa.DrillPos = Math.max(
                  0,
                  _0x50bcfa.DrillPos - 0.1 * _0x3c4c63
                ))
            }
          }
        }
        const _0x1981b8 = _0x50bcfa.DrillSpeed
        if (IsDisabledControlJustPressed(0, 35)) {
          _0x50bcfa.DrillSpeed = Math.min(1, _0x50bcfa.DrillSpeed + 0.05)
        } else {
          if (IsDisabledControlPressed(0, 35)) {
            _0x50bcfa.DrillSpeed = Math.min(
              1,
              _0x50bcfa.DrillSpeed + 0.5 * _0x3c4c63
            )
          } else {
            if (IsDisabledControlJustPressed(0, 34)) {
              _0x50bcfa.DrillSpeed = Math.max(0, _0x50bcfa.DrillSpeed - 0.05)
            } else {
              IsDisabledControlPressed(0, 34) &&
                (_0x50bcfa.DrillSpeed = Math.max(
                  0,
                  _0x50bcfa.DrillSpeed - 0.5 * _0x3c4c63
                ))
            }
          }
        }
        if (IsDisabledControlJustPressed(0, 200)) {
          _0x3edd63 = false
          _0x50bcfa.Active = false
          return
        }
        const _0x56a96c = _0x50bcfa.DrillTemp
        if (_0x5b1767 < _0x50bcfa.DrillPos) {
          if (_0x50bcfa.DrillSpeed > 0.4) {
            SetVariableOnSound(_0x50bcfa.DrillSoundId, 'DrillState', 1)
            _0x50bcfa.DrillTemp = Math.min(
              1,
              _0x50bcfa.DrillTemp +
                0.04 * _0x3c4c63 * (_0x50bcfa.DrillSpeed * 5)
            )
            _0xc8c8ee(_0x448289, 'SET_DRILL_POSITION', _0x50bcfa.DrillPos)
          } else {
            _0x50bcfa.DrillPos < 0.1 || _0x50bcfa.DrillPos < _0x50bcfa.HoleDepth
              ? _0xc8c8ee(_0x448289, 'SET_DRILL_POSITION', _0x50bcfa.DrillPos)
              : ((_0x50bcfa.DrillPos = _0x5b1767),
                (_0x50bcfa.DrillTemp = Math.min(
                  1,
                  _0x50bcfa.DrillTemp + 0.01 * _0x3c4c63
                )),
                SetVariableOnSound(_0x50bcfa.DrillSoundId, 'DrillState', 0.5))
          }
        } else {
          _0x50bcfa.DrillPos < _0x50bcfa.HoleDepth &&
            (SetVariableOnSound(_0x50bcfa.DrillSoundId, 'DrillState', 0),
            (_0x50bcfa.DrillTemp = Math.max(
              0,
              _0x50bcfa.DrillTemp -
                0.05 *
                  _0x3c4c63 *
                  Math.max(0.005, (_0x50bcfa.DrillSpeed * 10) / 2)
            )))
          if (_0x50bcfa.DrillPos !== _0x50bcfa.HoleDepth) {
            _0xc8c8ee(_0x448289, 'SET_DRILL_POSITION', _0x50bcfa.DrillPos)
          }
        }
        if (_0x1981b8 !== _0x50bcfa.DrillSpeed) {
          _0xc8c8ee(_0x448289, 'SET_SPEED', _0x50bcfa.DrillSpeed)
        }
        _0x56a96c !== _0x50bcfa.DrillTemp &&
          _0xc8c8ee(_0x448289, 'SET_TEMPERATURE', _0x50bcfa.DrillTemp)
        if (_0x50bcfa.DrillTemp >= 1) {
          PlaySoundFromEntity(
            -1,
            'Drill_Jam',
            PlayerPedId(),
            'DLC_HEIST_FLEECA_SOUNDSET',
            false,
            20
          )
          _0x3edd63 = false
          _0x50bcfa.Active = false
        } else {
          _0x50bcfa.DrillPos >= 0.9 &&
            ((_0x3edd63 = true), (_0x50bcfa.Active = false))
        }
        _0x50bcfa.HoleDepth =
          _0x50bcfa.DrillPos > _0x50bcfa.HoleDepth
            ? _0x50bcfa.DrillPos
            : _0x50bcfa.HoleDepth
        const _0x1551b4 = _0x50bcfa.HolesDrilled.find(
          (_0x44cb1b) =>
            _0x44cb1b.depth <= _0x50bcfa.HoleDepth && !_0x44cb1b.passed
        )
        _0x1551b4 &&
          ((_0x1551b4.passed = true),
          PlaySoundFrontend(
            -1,
            'Drill_Pin_Break',
            'DLC_HEIST_FLEECA_SOUNDSET',
            true
          ))
      },
      _0xc8c8ee = (_0x20dbb9, _0x34b333, _0x512637) => {
        PushScaleformMovieFunction(_0x20dbb9, _0x34b333)
        PushScaleformMovieFunctionParameterFloat(_0x512637)
        PopScaleformMovieFunctionVoid()
      },
      _0x506ed5 = async () => {
        FreezeEntityPosition(PlayerPedId(), true)
        SetCurrentPedWeapon(PlayerPedId(), GetHashKey('WEAPON_UNARMED'), true)
        exports['ev-ui'].SetUIFocusKeepInput(true)
        exports['ev-taskbar'].taskbarDisableInventory(true)
        exports['ev-actionbar'].disableActionBar(true)
        emit('ev-binds:should-execute', false)
      },
      _0x2009d9 = () => {
        FreezeEntityPosition(PlayerPedId(), false)
        exports['ev-ui'].SetUIFocusKeepInput(false)
        exports['ev-taskbar'].taskbarDisableInventory(false)
        exports['ev-actionbar'].disableActionBar(false)
        emit('ev-binds:should-execute', true)
      }
    const _0x473c8d = 'fire-alt',
      _0x5320f5 = 'ev-ui:heistsThermiteMinigameResult'
    let _0x3f4fda,
      _0x3fd782 = 1
    const _0x17a542 = async (_0xd350ca) => {
      var _0x3b6d3e
      _0x3f4fda = null
      const _0x17e0f1 = !!_0xd350ca.gameFinishedEndpoint
      _0xd350ca.gameTimeoutDuration *= _0x3fd782
      ;(_0x3b6d3e = _0xd350ca.gameFinishedEndpoint) !== null &&
      _0x3b6d3e !== void 0
        ? _0x3b6d3e
        : (_0xd350ca.gameFinishedEndpoint = _0x5320f5)
      _0x1f1484.g.exports['ev-ui'].openApplication('memorygame', _0xd350ca)
      if (_0x17e0f1) {
        return
      }
      const _0x4a8e95 = await _0x45415b.waitForCondition(() => {
        return _0x3f4fda !== undefined && _0x3f4fda !== null
      }, 60000)
      if (_0x4a8e95) {
        return false
      }
      return emitNet('ev-heists:hack:track', _0x3f4fda, 'thermite'), _0x3f4fda
    }
    RegisterUICallback(_0x5320f5, async (_0x300724, _0x32d44f) => {
      _0x3f4fda = _0x300724.success
      const _0x31181d = {
        ok: true,
        message: '',
      }
      const _0xb8a853 = {}
      return (
        (_0xb8a853.data = 'success'),
        (_0xb8a853.meta = _0x31181d),
        _0x32d44f(_0xb8a853)
      )
    })
    on('ev-ui:application-closed', async (_0x2b7b17) => {
      if (_0x2b7b17 !== 'memorygame') {
        return
      }
      ;(_0x3f4fda === undefined || _0x3f4fda === null) && (_0x3f4fda = false)
    })
    _0x1f1484.g.exports('thermiteMultiplier', (_0x3f19ca) => {
      _0x3fd782 = Math.min(_0x3f19ca, 1.15)
    })
    _0x1f1484.g.exports('ThermiteMinigame', _0x17a542)
    const _0x42aee2 = new _0x72bbde(function () {}, 1000)
    async function _0x58f982() {
      const _0x59bd0b = {
        CPXEvent: 'ev-heists:fleeca:rob',
        id: 'fleeca_rob',
        icon: 'th',
        label: 'Rob',
      }
      const _0x5b9f63 = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByTarget('fleeca_rob_loc', [_0x59bd0b], {
        distance: _0x5b9f63,
        isEnabled: (_0xe0d74a, _0x798028) => {
          var _0x397a39
          const _0x3c4077 =
            (_0x397a39 = _0x798028.zones.fleeca_rob_loc) === null ||
            _0x397a39 === void 0
              ? void 0
              : _0x397a39.id
          if (!_0x3c4077) {
            return false
          }
          const _0x3bbe47 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistdrill_grey',
            1,
            false,
            true
          )
          return (
            _0x42aee2.isActive &&
            !_0x42aee2.data.robbedLocations[_0x3c4077] &&
            _0x3bbe47
          )
        },
      })
      const _0x156a82 = {
        CPXEvent: 'ev-heists:fleeca:inner_door',
        id: 'fleeca_inner_door',
        icon: _0x2d9e47,
        label: 'Open',
      }
      const _0x3f9330 = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByTarget('fleeca_inner_door', [_0x156a82], {
        distance: _0x3f9330,
        isEnabled: (_0x537017, _0x453048) => {
          var _0x490d37
          const _0x40f1c4 =
            (_0x490d37 = _0x453048.zones.fleeca_inner_door) === null ||
            _0x490d37 === void 0
              ? void 0
              : _0x490d37.id
          if (!_0x40f1c4) {
            return false
          }
          const _0xd4902b = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistdecrypter_grey',
            1,
            false,
            true
          )
          return (
            _0x42aee2.isActive && !_0x42aee2.data.innerDoorOpen && _0xd4902b
          )
        },
      })
      for (const _0x5ec2a5 of _0x26f775) {
        _0x2d4217.addBoxZone(
          '' + _0x5ec2a5.id,
          'fleeca_box_zone',
          {
            x: _0x5ec2a5.powerCoords[0],
            y: _0x5ec2a5.powerCoords[1],
            z: _0x5ec2a5.powerCoords[2],
          },
          3,
          3,
          {
            minZ: _0x5ec2a5.powerCoords[2] - 1.5,
            maxZ: _0x5ec2a5.powerCoords[2] + 1.5,
          }
        )
      }
      _0x2d4217.onEnter('fleeca_box_zone', (_0x2b07f0) => {
        _0x1f1484.g.exports['ev-ui'].showInteraction('Power Box')
      })
      _0x2d4217.onExit('fleeca_box_zone', () => {
        _0x1f1484.g.exports['ev-ui'].hideInteraction()
      })
      _0x2d4217.onEnter('fleeca_zone', (_0x56559a) => {
        if (!_0x42aee2.isActive) {
          return
        }
        if (_0x56559a.id !== 'heist_' + _0x42aee2.data.location.id) {
          return
        }
        _0x336a39.emitNet('ev-heists:fleeca:enter')
      })
      _0x2d4217.onExit('fleeca_zone', (_0x2ac172) => {
        if (!_0x42aee2.isActive) {
          return
        }
        if (_0x2ac172.id !== 'heist_' + _0x42aee2.data.location.id) {
          return
        }
        _0x336a39.emitNet('ev-heists:fleeca:exit')
      })
      const _0x4d42ec = {
        x: 3,
        y: 2.25,
        z: 0,
        h: 0,
      }
      const _0x4c44de = {
        x: 5,
        y: 0.75,
        z: 0,
        h: 90,
      }
      const _0x15d1c8 = {
        x: 5.5,
        y: -2.75,
        z: 0,
        h: 90,
      }
      const _0x2018a4 = {
        x: 3,
        y: -4.5,
        z: 0,
        h: 180,
      }
      const _0xa5e97 = {
        x: 1,
        y: -2.5,
        z: 0,
        h: 270,
      }
      const _0x4d43d5 = [_0x4d42ec, _0x4c44de, _0x15d1c8, _0x2018a4, _0xa5e97]
      _0x42aee2.addHook('preStart', function () {
        const _0x720f15 = this.data.location
        this.data.startCoords = _0x720f15.panelCoords
        const _0x52cdd1 = _0x720f15.panelCoords[3] + 180
        for (let _0x52f147 = 0; _0x52f147 < 5; _0x52f147++) {
          const _0x287cc0 = _0x4d43d5[_0x52f147],
            [_0x5d2ed9, _0x23c5f6, _0x58a32d] = GetObjectOffsetFromCoords(
              _0x720f15.panelCoords[0],
              _0x720f15.panelCoords[1],
              _0x720f15.panelCoords[2],
              _0x52cdd1,
              _0x287cc0.x,
              _0x287cc0.y,
              _0x287cc0.z
            ),
            _0x5d1cf9 = {
              x: _0x5d2ed9,
              y: _0x23c5f6,
              z: _0x58a32d,
            }
          const _0x5eed45 = {
            heading: _0x52cdd1 + _0x287cc0.h,
            minZ: _0x58a32d - 1,
            maxZ: _0x58a32d + 1,
          }
          _0x2d4217.addBoxTarget(
            'rob_' + this.data.location.id + '_' + _0x52f147,
            'fleeca_rob_loc',
            _0x5d1cf9,
            1,
            1.8,
            _0x5eed45
          )
        }
        const _0x3df464 = {
          x: _0x720f15.panelCoords[0],
          y: _0x720f15.panelCoords[1],
          z: _0x720f15.panelCoords[2],
        }
        const _0x9caaee = {
          heading: _0x52cdd1 + 90,
          minZ: _0x720f15.panelCoords[2] - 10,
          maxZ: _0x720f15.panelCoords[2] + 10,
        }
        _0x2d4217.addBoxZone(
          'heist_' + this.data.location.id,
          'fleeca_zone',
          _0x3df464,
          200,
          150,
          _0x9caaee
        )
        const [_0x3f0270, _0x163f36, _0x28c6c8] = GetObjectOffsetFromCoords(
            _0x720f15.panelCoords[0],
            _0x720f15.panelCoords[1],
            _0x720f15.panelCoords[2],
            _0x52cdd1,
            2.175,
            -0.25,
            0
          ),
          _0x44db11 = {
            x: _0x3f0270,
            y: _0x163f36,
            z: _0x28c6c8,
          }
        const _0x38ce5b = {
          heading: _0x52cdd1 + 90,
          minZ: _0x28c6c8 - 1,
          maxZ: _0x28c6c8 + 1,
        }
        _0x2d4217.addBoxTarget(
          'inner_panel_' + this.data.location.id,
          'fleeca_inner_door',
          _0x44db11,
          0.5,
          0.5,
          _0x38ce5b
        )
      })
    }
    const _0x560000 = async (_0x2a0079, _0x134a41, _0x1eef30, _0x160eba) => {
        const _0x4aa9a5 = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), true)
          ),
          _0x2e0341 = _0x26f775.find(
            (_0x57b7d4) =>
              _0xf8285b
                .fromArray(_0x57b7d4.powerCoords)
                .getDistance(_0x4aa9a5) < 2.5
          )
        if (!_0x2e0341) {
          return
        }
        const _0x5dea0e = _0xf8285b.fromArray(_0x2e0341.powerCoords)
        if (!_0x3bf188 || _0x3bf188.heistActive) {
          emit('DoLongHudText', 'You cant do that at the moment! (Group)', 2)
          return
        }
        const _0x2b5177 = {
          label: 'Encryption Code',
          name: 'code',
        }
        const _0x5e00f5 = await _0x1f1484.g.exports['ev-ui'].OpenInputMenu(
          [_0x2b5177],
          (_0x2ca1ce) => _0x2ca1ce && _0x2ca1ce.code
        )
        if (!_0x5e00f5) {
          return
        }
        const _0x1ac2b5 = await _0x8f3134.execute(
          'ev-heists:fleeca:canRob',
          _0x2e0341.id,
          _0x5e00f5.code
        )
        if (!_0x1ac2b5) {
          emit('DoLongHudText', 'Unavailable!', 2)
          return
        }
        emit('inventory:removeItem', 'thermitecharge', 1)
        const _0x9aea7d = {
            x: _0x5dea0e.x,
            y: _0x5dea0e.y,
            z: _0x5dea0e.z,
            h: GetEntityHeading(PlayerPedId()),
          },
          _0x317e8d = _0x46c4eb('minigames'),
          _0x173506 = _0x17a542(Object.assign({}, _0x317e8d.fleeca.thermite))
        _0x530a45(_0x9aea7d, 0, _0x173506)
        const _0x4cb89c = await _0x173506
        if (!_0x4cb89c) {
          return
        }
        const _0x58f88e = {
          location: _0x2e0341,
          code: _0x5e00f5.code,
        }
        const _0x13db74 = await _0x8f3134.execute(
          'ev-heists:startHeist',
          'fleeca',
          _0x58f88e
        )
      },
      _0x39e39b = async (_0x13c778, _0x21a64d, _0x43f14a, _0x39c521) => {
        const _0x3e41e4 = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), true)
          ),
          _0x1c74de = _0x26f775.find(
            (_0xf00337) =>
              _0xf8285b
                .fromArray(_0xf00337.panelCoords)
                .getDistance(_0x3e41e4) < 2.5
          )
        if (!_0x1c74de) {
          return
        }
        if (!_0x42aee2.isActive) {
          return
        }
        emit('inventory:DegenLastUsedItem', 33)
        const _0x448a5c = _0x46c4eb('minigames'),
          _0x26afc6 = _0x1dd87a(Object.assign({}, _0x448a5c.fleeca.laptop))
        _0x28e004(_0x1c74de.panelCoords, _0x1c74de.panelCoords[3], _0x26afc6)
        const _0x36ac69 = await _0x26afc6
        if (!_0x36ac69) {
          return
        }
        emit('inventory:DegenLastUsedItem', 100)
        _0x336a39.emitNet('ev-heists:fleeca:openVaultDoor', _0x1c74de.id)
      }
    _0x336a39.on(
      'ev-heists:fleeca:rob',
      async (_0x131a5e, _0x3967b0, _0x11c4f7) => {
        var _0x26f67a
        const _0x3afafb =
          (_0x26f67a = _0x11c4f7.zones.fleeca_rob_loc) === null ||
          _0x26f67a === void 0
            ? void 0
            : _0x26f67a.id
        if (!_0x3afafb) {
          return
        }
        _0x336a39.emitNet('ev-heists:fleeca:startRob', _0x3afafb)
        emit('inventory:DegenItemType', 35, 'heistdrill_grey')
        const _0x2595d8 = { gridSize: 4 }
        const _0x584421 = await _0xe8fb18(_0x2595d8)
        await _0x35ac5b(1000)
        _0x1f1484.g.exports['ev-ui'].closeApplication('minigame-flip')
        let _0xf07850 = false
        if (_0x584421) {
          const _0xc6113d = _0x572249()
          _0x15d372(_0xc6113d)
          _0xf07850 = await _0xc6113d
        }
        const _0x130552 = await _0x8f3134.execute(
          'ev-heists:fleeca:rob',
          _0x3afafb,
          _0xf07850 && _0x584421
        )
      }
    )
    _0x336a39.onNet('ev-heists:fleeca:start', (_0x212fb, _0x24c797) => {
      _0x42aee2.data = {
        location: _0x26f775.find((_0x2d3128) => _0x2d3128.id === _0x212fb),
        robbedLocations: _0x24c797.robbedLocations,
        innerDoorOpen: _0x24c797.innerDoorOpen,
      }
      _0x42aee2.start()
    })
    _0x336a39.onNet('ev-heists:fleeca:stop', () => {
      _0x42aee2.stop()
    })
    _0x336a39.onNet('ev-heists:fleeca:robbed', (_0x4f9ad6, _0x448e6b) => {
      _0x42aee2.data.robbedLocations[_0x4f9ad6] = _0x448e6b
    })
    _0x336a39.onNet('ev-heists:fleeca:innerDoorOpen', () => {
      _0x42aee2.data.innerDoorOpen = true
    })
    _0x336a39.on('ev-heists:fleeca:inner_door', async () => {
      if (!_0x42aee2.isActive) {
        return
      }
      if (_0x42aee2.data.innerDoorOpen) {
        return
      }
      emit('inventory:DegenItemType', 35, 'heistdecrypter_grey')
      const _0x1ca11f = _0x46c4eb('minigames'),
        _0x565f63 = await _0x2d70cc(
          Object.assign({}, _0x1ca11f.fleeca.untangle)
        )
      if (!_0x565f63) {
        return
      }
      _0x336a39.emitNet(
        'ev-heists:fleeca:innerDoorSuccess',
        _0x42aee2.data.location.id
      )
    })
    function _0x40bc21(_0x19ce1a, _0x402628, _0x4efc4e, _0x420190) {
      return new Promise((_0x5ea2bd) => {
        exports['ev-ui'].taskBarSkill(
          _0x19ce1a,
          _0x402628,
          _0x5ea2bd,
          _0x4efc4e,
          _0x420190
        )
      })
    }
    async function _0x42a2f0(
      _0x4e190c,
      _0x4da779,
      _0x1679a4,
      _0x3c000b = false
    ) {
      let _0x277fff = false
      _0x3c000b && _0x1f1484.g.exports['ev-ui'].clearSkillCheck()
      for (let _0x54e8f7 = 0; _0x54e8f7 < _0x1679a4; _0x54e8f7++) {
        if (!_0x277fff) {
          const _0x2df4ac = await _0x40bc21(
            _0x4e190c,
            _0x4da779,
            _0x54e8f7 % 2 !== 0,
            _0x3c000b
          )
          if (_0x2df4ac !== 100) {
            _0x277fff = true
          }
        }
      }
      return !_0x277fff
    }
    const _0x117381 = new _0x72bbde(function () {}, 1000)
    async function _0x26b8bf() {
      const _0x1cfaab = {
        CPXEvent: 'ev-heists:fleecaf:rob',
        id: 'fleeca_front_rob',
        icon: _0x2d9e47,
        label: 'Rob',
      }
      const _0x278568 = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByTarget('fleeca_front_rob_loc', [_0x1cfaab], {
        distance: _0x278568,
        isEnabled: (_0x38f7dd, _0x8748fc) => {
          var _0x446cce
          const _0x441492 =
            (_0x446cce = _0x8748fc.zones.fleeca_front_rob_loc) === null ||
            _0x446cce === void 0
              ? void 0
              : _0x446cce.id
          if (!_0x441492) {
            return false
          }
          return (
            _0x117381.isActive && !_0x117381.data.robbedLocations[_0x441492]
          )
        },
      })
      _0x2d4217.onEnter('fleeca_front_zone', (_0x10829c) => {
        if (!_0x117381.isActive) {
          return
        }
        if (_0x10829c.id !== 'heist_' + _0x117381.data.location.id) {
          return
        }
        _0x336a39.emitNet('ev-heists:fleecaf:enter')
      })
      _0x2d4217.onExit('fleeca_front_zone', (_0x3c6aca) => {
        if (!_0x117381.isActive) {
          return
        }
        if (_0x3c6aca.id !== 'heist_' + _0x117381.data.location.id) {
          return
        }
        _0x336a39.emitNet('ev-heists:fleecaf:exit')
      })
      _0x117381.addHook('preStart', function () {
        const _0x308e7f = this.data.location
        this.data.startCoords = _0x308e7f.panelCoords
        const _0x55f6dd = _0x308e7f.panelCoords[3] + 180
        for (let _0x590655 = 0; _0x590655 < 4; _0x590655++) {
          const [_0x56524b, _0x2a4f97, _0x5f317a] = GetObjectOffsetFromCoords(
              _0x308e7f.panelCoords[0],
              _0x308e7f.panelCoords[1],
              _0x308e7f.panelCoords[2],
              _0x55f6dd,
              3.25 + -_0x590655 * 1.6,
              3.5,
              0
            ),
            _0x499783 = {
              x: _0x56524b,
              y: _0x2a4f97,
              z: _0x5f317a,
            }
          const _0x254b56 = {
            heading: _0x55f6dd + 90,
            minZ: _0x5f317a - 1,
            maxZ: _0x5f317a + 1,
          }
          _0x2d4217.addBoxZone(
            'rob_' + this.data.location.id + '_' + _0x590655,
            'fleeca_front_rob_loc',
            _0x499783,
            1.5,
            1.75,
            _0x254b56
          )
        }
        const _0x15a06e = {
          x: _0x308e7f.panelCoords[0],
          y: _0x308e7f.panelCoords[1],
          z: _0x308e7f.panelCoords[2],
        }
        const _0x3798ab = {
          heading: _0x55f6dd + 90,
          minZ: _0x308e7f.panelCoords[2] - 10,
          maxZ: _0x308e7f.panelCoords[2] + 10,
        }
        _0x2d4217.addBoxZone(
          'heist_' + this.data.location.id,
          'fleeca_front_zone',
          _0x15a06e,
          200,
          150,
          _0x3798ab
        )
      })
    }
    const _0x350983 = async (_0x56d01c, _0x15f2ad, _0x399fb5, _0x4b6ebf) => {
      const _0x5be3e3 = _0x1f1484.g.exports['ev-doors'].GetCurrentDoor(),
        _0x10ad46 = _0x26f775.find(
          (_0x9b9421) => _0x9b9421.frontDoorId === _0x5be3e3
        )
      if (!_0x10ad46) {
        return
      }
      if (!_0x3bf188 || _0x3bf188.heistActive) {
        emit('DoLongHudText', 'You cant do that at the moment! (Group)', 2)
        return
      }
      const _0x2e32f2 = await _0x8f3134.execute(
        'ev-heists:fleecaf:canRob',
        _0x10ad46.id
      )
      if (!_0x2e32f2) {
        emit('DoLongHudText', 'Unavailable', 2)
        return
      }
      emit('inventory:DegenLastUsedItem', 33)
      const _0x59f80a = _0x46c4eb('minigames'),
        _0x2d776c = await _0x42a2f0(
          _0x59f80a.fleeca_front.lockpicking.difficulty,
          _0x45415b.getRandomNumber(
            _0x59f80a.fleeca_front.lockpicking.gapRange[0],
            _0x59f80a.fleeca_front.lockpicking.gapRange[1]
          ),
          _0x59f80a.fleeca_front.lockpicking.iterations,
          _0x59f80a.fleeca_front.lockpicking.useReverse
        )
      if (!_0x2d776c) {
        return
      }
      const _0x34f3ff = { location: _0x10ad46 }
      const _0x1de680 = await _0x8f3134.execute(
        'ev-heists:startHeist',
        'fleeca_front',
        _0x34f3ff
      )
    }
    _0x336a39.on(
      'ev-heists:fleecaf:rob',
      async (_0x10c014, _0x285fcb, _0x3be50c) => {
        var _0x76458e
        const _0x5565ec =
          (_0x76458e = _0x3be50c.zones.fleeca_front_rob_loc) === null ||
          _0x76458e === void 0
            ? void 0
            : _0x76458e.id
        if (!_0x5565ec) {
          return
        }
        _0x336a39.emitNet('ev-heists:fleecaf:startRob', _0x5565ec)
        const _0x35236d = _0x46c4eb('minigames'),
          _0x2421c4 = await _0x2d70cc(
            Object.assign({}, _0x35236d.fleeca_front.untangle)
          )
        let _0x54a2fe = true
        if (!_0x2421c4) {
          _0x54a2fe = false
        }
        if (_0x54a2fe) {
          const _0x1c4c43 = await _0x1f45d4.taskBar(
            20000,
            'Downloading data...',
            true,
            {
              distance: 1,
              entity: PlayerPedId(),
            }
          )
          if (_0x1c4c43 !== 100) {
            _0x54a2fe = false
          }
        }
        const _0x56006c = await _0x8f3134.execute(
          'ev-heists:fleecaf:rob',
          _0x5565ec,
          _0x54a2fe
        )
      }
    )
    _0x336a39.onNet('ev-heists:fleecaf:start', (_0x591754, _0x224694) => {
      _0x117381.data = {
        location: _0x26f775.find((_0x3851d9) => _0x3851d9.id === _0x591754),
        robbedLocations: _0x224694,
      }
      _0x117381.start()
    })
    _0x336a39.onNet('ev-heists:fleecaf:stop', () => {
      _0x117381.stop()
    })
    _0x336a39.onNet('ev-heists:fleecaf:robbed', (_0x3d83a1, _0x5f728d) => {
      _0x117381.data.robbedLocations[_0x3d83a1] = _0x5f728d
    })
    const _0x3400da = 'unlock-alt',
      _0x232472 = 'mini@safe_cracking',
      _0x264d1c = 'MPSafeCracking',
      _0x223cdf = 'SAFE_CRACK'
    let _0x2b73bd
    const _0x4ecdc8 = async (_0x486223) => {
      _0x2b73bd = null
      await _0x67beee.loadTexture(_0x264d1c)
      await _0x67beee.loadAnim(_0x232472)
      RequestAmbientAudioBank(_0x223cdf, false)
      _0x506ed5()
      emit('DoLongHudText', 'Press Shift+F or F to rotate, H to crack!')
      const _0xabc6f9 = []
      for (let _0x52edc0 = 0; _0x52edc0 < _0x486223; _0x52edc0++) {
        const _0x14bd09 = _0x45415b.getRandomNumber(1, 99),
          _0x43e34a = {
            value: _0x14bd09,
            unlocked: false,
          }
        _0xabc6f9[_0x52edc0] = _0x43e34a
      }
      let _0x5b55d7 = 0
      const _0x144c52 = (_0x58b0c5) => {
        const _0xdd15a5 = [
            'idle_base',
            'idle_heavy_breathe',
            'idle_look_around',
          ],
          _0x5f5007 = [
            'dial_turn_succeed_1',
            'dial_turn_succeed_2',
            'dial_turn_succeed_3',
            'dial_turn_succeed_4',
          ],
          _0x1917ac = PlayerPedId()
        if (
          (IsEntityPlayingAnim(
            _0x1917ac,
            _0x232472,
            'dial_turn_anti_fast_1',
            3
          ) &&
            _0x58b0c5 === 1) ||
          IsEntityPlayingAnim(
            _0x1917ac,
            _0x232472,
            _0x58b0c5 === 2 ? _0xdd15a5[_0x5b55d7] : _0x5f5007[_0x5b55d7],
            3
          )
        ) {
          return
        }
        let _0x402188 = 'dial_turn_anti_fast_1'
        if (_0x58b0c5 === 2) {
          _0x5b55d7 = _0x45415b.getRandomNumber(0, _0xdd15a5.length)
          _0x402188 = _0xdd15a5[_0x5b55d7]
        } else {
          _0x58b0c5 === 3 &&
            ((_0x5b55d7 = _0x45415b.getRandomNumber(0, _0x5f5007.length)),
            (_0x402188 = _0x5f5007[_0x5b55d7]))
        }
        TaskPlayAnim(
          _0x1917ac,
          _0x232472,
          _0x402188,
          8,
          -8,
          -1,
          1,
          0,
          false,
          false,
          false
        )
      }
      let _0x1ef9d6 = true,
        _0x580f19 = false,
        _0xe5c674 = 0,
        _0x3d811c = 0,
        _0x10b9af = 0,
        _0x11c726 = 1
      const _0x3e9e57 = setTick(async () => {
        if (!_0x1ef9d6) {
          clearTick(_0x3e9e57)
          return
        }
        for (let _0x4b598b = 8; _0x4b598b <= 143; _0x4b598b++) {
          DisableControlAction(0, _0x4b598b, true)
        }
        IsDisabledControlPressed(1, 21) &&
          IsDisabledControlPressed(1, 23) &&
          _0x11c726 > 1 &&
          ((_0xe5c674 += 1.8),
          PlaySoundFrontend(0, 'TUMBLER_TURN', 'SAFE_CRACK_SOUNDSET', true),
          (_0x11c726 = 0),
          _0x144c52(1))
        IsDisabledControlPressed(1, 23) &&
          _0x11c726 > 1 &&
          ((_0xe5c674 -= 1.8),
          PlaySoundFrontend(0, 'TUMBLER_TURN', 'SAFE_CRACK_SOUNDSET', true),
          (_0x11c726 = 0),
          _0x144c52(1))
        if (IsDisabledControlJustPressed(0, 200)) {
          _0x2b73bd = false
          _0x1ef9d6 = false
          return
        }
        _0x3d811c = Math.floor(100 - _0xe5c674 / 3.6)
        const _0x12becb = _0xabc6f9[_0x10b9af]
        if (
          IsDisabledControlJustPressed(1, 74) &&
          _0x3d811c !== _0x12becb.value
        ) {
          await _0x35ac5b(1000)
        }
        if (_0x12becb.value === _0x3d811c) {
          if (!_0x580f19) {
            PlaySoundFrontend(
              0,
              'TUMBLER_PIN_FALL',
              'SAFE_CRACK_SOUNDSET',
              true
            )
            _0x580f19 = true
          }
          if (IsDisabledControlPressed(1, 74)) {
            _0x580f19 = false
            PlaySoundFrontend(0, 'TUMBLER_RESET', 'SAFE_CRACK_SOUNDSET', true)
            _0xe5c674 = 0
            _0x3d811c = 0
            _0x12becb.unlocked = true
            _0x144c52(3)
            if (++_0x10b9af === _0xabc6f9.length) {
              _0x1ef9d6 = false
              _0x2b73bd = true
              return
            }
          }
        } else {
          _0x580f19 = false
        }
        _0x11c726 += 7.77 * GetFrameTime()
        if (_0xe5c674 < 0) {
          _0xe5c674 = 360
        }
        if (_0xe5c674 > 360) {
          _0xe5c674 = 0
        }
        DrawSprite(
          _0x264d1c,
          'Dial_BG',
          0.65,
          0.5,
          0.18,
          0.32,
          0,
          255,
          255,
          211,
          255
        )
        DrawSprite(
          _0x264d1c,
          'Dial',
          0.65,
          0.5,
          0.09,
          0.16,
          _0xe5c674,
          255,
          255,
          211,
          255
        )
        let _0xe5b672 = 0.45,
          _0x310983 = 0.58
        for (const _0x17920f of _0xabc6f9) {
          _0x17920f.unlocked
            ? DrawSprite(
                _0x264d1c,
                'lock_open',
                _0x310983,
                _0xe5b672,
                0.012,
                0.024,
                0,
                255,
                255,
                211,
                255
              )
            : DrawSprite(
                _0x264d1c,
                'lock_closed',
                _0x310983,
                _0xe5b672,
                0.012,
                0.024,
                0,
                255,
                255,
                211,
                255
              )
          _0xe5b672 += 0.05
          const _0x3a80e0 = _0xabc6f9.indexOf(_0x17920f)
          _0x3a80e0 !== 0 &&
            _0x3a80e0 % 10 === 0 &&
            ((_0xe5b672 = 0.45), (_0x310983 += 0.05))
        }
      })
      while (_0x1ef9d6) {
        await _0x35ac5b(1)
      }
      return (
        _0x2009d9(),
        ClearPedTasks(PlayerPedId()),
        ReleaseAmbientAudioBank(),
        _0x2b73bd
      )
    }
    const _0x2e290f = {
      id: 'paleto_sec_room',
      name: 'Paleto Security Room',
      model: 'prop_cctv_cam_06a',
      heading: 260,
      coords: [-89.63, 6466.38, 33.61],
    }
    const _0x2286f5 = {
      id: 'paleto_back_hall',
      name: 'Paleto Back Hallway',
      model: 'prop_cctv_cam_06a',
      heading: 10,
      coords: [-99.93, 6476.86, 33.61],
    }
    const _0x58d536 = {
      id: 'paleto_lobby',
      name: 'Paleto Lobby South',
      model: 'prop_cctv_cam_06a',
      heading: 350,
      coords: [-102.18, 6476.04, 33.61],
    }
    const _0x31db09 = {
      id: 'paleto_lobby_2',
      name: 'Paleto Lobby North',
      model: 'prop_cctv_cam_06a',
      heading: 175,
      coords: [-108.12, 6460.87, 33.61],
    }
    const _0x4b685a = {
      id: 'paleto_lobby_desk',
      name: 'Paleto Lobby Desk',
      model: 'prop_cctv_cam_06a',
      heading: 80,
      coords: [-115.12, 6470.8, 33.61],
    }
    const _0x5d5a46 = {
      id: 'paleto_side_hall',
      name: 'Paleto Side Hallway',
      model: 'prop_cctv_cam_06a',
      heading: 265,
      coords: [-111.01, 6475.76, 33.61],
    }
    const _0x4c15e7 = {
      id: 'paleto_lobby_vault',
      name: 'Paleto Lobby Vault',
      model: 'prop_cctv_cam_06a',
      heading: 265,
      coords: [-99.76, 6465.37, 34],
    }
    const _0x143b5b = {
      id: 'paleto_inner_vault',
      name: 'Paleto Inner Vault',
      model: 'prop_cctv_cam_06a',
      heading: 255,
      coords: [-95.29, 6461.19, 34],
    }
    const _0x1f7def = {
      id: 'paleto_office_1',
      name: 'Paleto Office 1',
      model: 'prop_cctv_cam_06a',
      heading: 245,
      coords: [-101.49, 6460.47, 33.61],
    }
    const _0x769749 = {
      id: 'paleto_office_2',
      name: 'Paleto Office 2',
      model: 'prop_cctv_cam_06a',
      heading: 210,
      coords: [-97.32, 6464.65, 33.61],
    }
    const _0x365239 = {
      id: 'paleto_office_3',
      name: 'Paleto Office 3',
      model: 'prop_cctv_cam_06a',
      heading: 20,
      coords: [-105.97, 6481.18, 33.61],
    }
    const _0x2d4ed3 = [
      _0x2e290f,
      _0x2286f5,
      _0x58d536,
      _0x31db09,
      _0x4b685a,
      _0x5d5a46,
      _0x4c15e7,
      _0x143b5b,
      _0x1f7def,
      _0x769749,
      _0x365239,
    ]
    let _0x130562 = 0,
      _0x58282c = 0,
      _0x4e5930 = 0,
      _0x240742 = 0,
      _0x337843 = false
    const _0x4e3c43 = async (_0x5d8702, _0x2e0b81) => {
        DoScreenFadeOut(400)
        await _0x35ac5b(400)
        SetFocusPosAndVel(
          _0x5d8702.coords[0],
          _0x5d8702.coords[1],
          _0x5d8702.coords[2],
          0,
          0,
          0
        )
        await _0x35ac5b(100)
        FreezeEntityPosition(PlayerPedId(), true)
        _0x130562 = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
        SetCamFov(_0x130562, 60)
        SetCamCoord(
          _0x130562,
          _0x5d8702.coords[0],
          _0x5d8702.coords[1],
          _0x5d8702.coords[2] - 0.5
        )
        _0x240742 = _0x5d8702.heading + 180
        _0x4e5930 = _0x240742
        _0x58282c = 0
        SetCamRot(_0x130562, 0, 0, _0x240742, 2)
        RenderScriptCams(true, false, 0, true, false)
        SetTimecycleModifier('CAMERA_secuirity_FUZZ')
        SetTimecycleModifierStrength(0.5)
        const _0x2cb374 = { display: false }
        _0x1f1484.g.exports['ev-ui'].sendAppEvent('hud', _0x2cb374)
        DoScreenFadeIn(1000)
        const _0x47def1 = GetClosestObjectOfType(
            _0x5d8702.coords[0],
            _0x5d8702.coords[1],
            _0x5d8702.coords[2] - 0.5,
            1,
            _0x5d8702.model,
            false,
            false,
            false
          ),
          _0x45f0f0 = RequestScaleformMovie('DRONE_CAM')
        await _0x45415b.waitForCondition(
          () => HasScaleformMovieLoaded(_0x45f0f0),
          10000
        )
        const _0x24646b = (_0x5de8e2, _0xedfbd9, _0x537a6b) => {
          BeginScaleformMovieMethod(_0x5de8e2, _0xedfbd9)
          ScaleformMovieMethodAddParamBool(_0x537a6b)
          EndScaleformMovieMethod()
        }
        _0x24646b(_0x45f0f0, 'SET_RETICLE_IS_VISIBLE', true)
        let _0x17dc6d = '...',
          _0x47caf1 = 0
        const _0x4c1723 = setTick(() => {
            if (!_0x130562) {
              SetScaleformMovieAsNoLongerNeeded(_0x45f0f0)
              clearTick(_0x4c1723)
              return
            }
            SetScriptGfxDrawOrder(1)
            DrawScaleformMovieFullscreen(_0x45f0f0, 255, 255, 255, 255, 0)
            if (_0x2e0b81) {
              const _0x1c6300 = GetCamCoord(_0x130562),
                _0x273e0b = GetCamRot(_0x130562, 0),
                [
                  _0x3711b4,
                  _0x24677e,
                  _0x4be128,
                  _0x3f8a19,
                  _0x325b22,
                  _0xa667be,
                ] = _0x2264b6(_0x1c6300, _0x273e0b, 16, _0x47def1)
              if (_0x24677e) {
                const _0x3ceec7 = _0x2e0b81(_0xa667be)
                _0x24646b(_0x45f0f0, 'SET_RETICLE_ON_TARGET', _0x3ceec7)
              } else {
                _0x24646b(_0x45f0f0, 'SET_RETICLE_ON_TARGET', false)
              }
              const _0x51ead6 = GetGameTimer()
              _0x4e2d85(
                0.1,
                0.1,
                'OBJECT SCANNING ACTIVE' + _0x17dc6d,
                [255, 255, 255, 255],
                0.5,
                4,
                0
              )
              _0x51ead6 - _0x47caf1 > 1000 &&
                ((_0x17dc6d = _0x17dc6d.length === 3 ? '.' : _0x17dc6d + '.'),
                (_0x47caf1 = _0x51ead6))
            }
          }),
          _0x44ddb3 = setTick(() => {
            IsDisabledControlJustPressed(2, 172) && _0x11902a('up')
            if (IsDisabledControlJustPressed(2, 173)) {
              _0x11902a('down')
            }
            IsDisabledControlJustPressed(2, 174) && _0x11902a('left')
            IsDisabledControlJustPressed(2, 175) && _0x11902a('right')
            ;(IsDisabledControlJustReleased(2, 172) ||
              IsDisabledControlJustReleased(2, 173) ||
              IsDisabledControlJustReleased(2, 174) ||
              IsDisabledControlJustReleased(2, 175)) &&
              _0x1ada75()
            if (IsDisabledControlJustPressed(0, 200)) {
              _0x590cb0()
              clearTick(_0x44ddb3)
              return
            }
          })
      },
      _0x590cb0 = async () => {
        if (!_0x130562) {
          return
        }
        DoScreenFadeOut(400)
        await _0x35ac5b(400)
        ClearFocus()
        RenderScriptCams(false, false, 0, true, false)
        DoScreenFadeIn(1000)
        ClearTimecycleModifier()
        FreezeEntityPosition(PlayerPedId(), false)
        const _0x188bdc = { display: true }
        _0x1f1484.g.exports['ev-ui'].sendAppEvent('hud', _0x188bdc)
        _0x130562 = 0
      },
      _0x11902a = (_0x22ba12) => {
        if (!_0x130562) {
          return
        }
        _0x337843 = true
        const _0x6037e1 = setTick(() => {
          if (!_0x337843) {
            clearTick(_0x6037e1)
            return
          }
          switch (_0x22ba12) {
            case 'up':
              _0x58282c += 0.1
              if (_0x58282c > 30) {
                _0x58282c = 30
              }
              break
            case 'down':
              _0x58282c -= 0.1
              if (_0x58282c < -30) {
                _0x58282c = -30
              }
              break
            case 'left':
              if (Math.abs(_0x4e5930 - _0x240742) > 45) {
                break
              }
              _0x4e5930 += 0.15
              if (Math.abs(_0x4e5930 - _0x240742) <= 45) {
                break
              }
              ;(_0x4e5930 -= 0.5), _0x1ada75()
              break
            case 'right':
              if (Math.abs(_0x4e5930 - _0x240742) > 45) {
                break
              }
              _0x4e5930 -= 0.15
              if (Math.abs(_0x4e5930 - _0x240742) <= 45) {
                break
              }
              ;(_0x4e5930 += 0.5), _0x1ada75()
              break
          }
          SetCamRot(_0x130562, _0x58282c, 0, _0x4e5930, 2)
        })
      },
      _0x1ada75 = () => {
        _0x337843 = false
      }
    const _0x5cdd6c = new _0x72bbde(function () {}, 1000),
      _0x208aab = 'scr_cncpolicestationbustout',
      _0x281309 = 'scr_alarm_damage_sparks'
    let _0x30b4a6 = true
    const _0x1752b9 = async () => {
        const _0x1654fb = {
          x: 2792.49,
          y: 1482.55,
          z: 24.53,
        }
        const _0xb45354 = {
          heading: 340,
          minZ: 23.33,
          maxZ: 26.53,
        }
        const _0x41c331 = {
          ptfxCoords: [2791.18, 1482.4, 24.51],
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_power_generator',
          _0x1654fb,
          3,
          3,
          _0xb45354,
          _0x41c331
        )
        const _0x21cfa9 = {
          x: 2801.36,
          y: 1514.54,
          z: 24.54,
        }
        const _0x905d58 = {
          heading: 340,
          minZ: 23.33,
          maxZ: 26.53,
        }
        const _0x7919d2 = {
          ptfxCoords: [2799.66, 1514.2, 24.46],
        }
        _0x2d4217.addBoxTarget(
          '2',
          'heist_power_generator',
          _0x21cfa9,
          3,
          3,
          _0x905d58,
          _0x7919d2
        )
        const _0x5b11bb = {
          x: 2810.34,
          y: 1547.69,
          z: 24.54,
        }
        const _0x4e3ffc = {
          heading: 340,
          minZ: 23.33,
          maxZ: 26.53,
        }
        const _0x53fb55 = {
          ptfxCoords: [2808.61, 1547.59, 24.44],
        }
        _0x2d4217.addBoxTarget(
          '3',
          'heist_power_generator',
          _0x5b11bb,
          3,
          3,
          _0x4e3ffc,
          _0x53fb55
        )
        const _0x407835 = {
          x: 2756.06,
          y: 1491.45,
          z: 24.5,
        }
        const _0x3386d7 = {
          heading: 340,
          minZ: 23.33,
          maxZ: 26.53,
        }
        const _0x34bee8 = {
          ptfxCoords: [2756.98, 1491.15, 24.36],
        }
        _0x2d4217.addBoxTarget(
          '4',
          'heist_power_generator',
          _0x407835,
          3,
          3,
          _0x3386d7,
          _0x34bee8
        )
        const _0x4ab417 = {
          x: 2772.73,
          y: 1563.18,
          z: 24.5,
        }
        const _0x5b901e = {
          heading: 340,
          minZ: 23.33,
          maxZ: 26.53,
        }
        const _0x29cc30 = {
          ptfxCoords: [2771.72, 1563.27, 24.25],
        }
        _0x2d4217.addBoxTarget(
          '5',
          'heist_power_generator',
          _0x4ab417,
          3,
          3,
          _0x5b901e,
          _0x29cc30
        )
        const _0x12f631 = {
          x: 2733.49,
          y: 1476.34,
          z: 45.3,
        }
        const _0x3bd7b4 = {
          heading: 340,
          minZ: 44.1,
          maxZ: 47.3,
        }
        const _0x8d9ebc = {
          ptfxCoords: [2734.92, 1475.55, 45.46],
        }
        _0x2d4217.addBoxTarget(
          '6',
          'heist_power_generator',
          _0x12f631,
          3,
          3,
          _0x3bd7b4,
          _0x8d9ebc
        )
        const _0x5dd260 = {
          x: 2741.59,
          y: 1507.02,
          z: 45.3,
        }
        const _0x3d3802 = {
          heading: 340,
          minZ: 44.1,
          maxZ: 47.3,
        }
        const _0x1d156f = {
          ptfxCoords: [2743.12, 1505.79, 45.45],
        }
        _0x2d4217.addBoxTarget(
          '7',
          'heist_power_generator',
          _0x5dd260,
          3,
          3,
          _0x3d3802,
          _0x1d156f
        )
        const _0x5d2f10 = {
          x: 2757.21,
          y: 1561.91,
          z: 42.89,
        }
        const _0x9aabf9 = {
          heading: 340,
          minZ: 42.1,
          maxZ: 47.3,
        }
        const _0x1c2091 = {
          ptfxCoords: [2759.01, 1562.72, 43.56],
        }
        _0x2d4217.addBoxTarget(
          '8',
          'heist_power_generator',
          _0x5d2f10,
          3,
          3,
          _0x9aabf9,
          _0x1c2091
        )
        const _0x3ad3d2 = {
          id: 'heist_power_generators',
          label: 'Activate',
          icon: _0x31ec01,
          CPXEvent: 'ev-heists:powerstation:generator',
        }
        const _0x370390 = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByTarget('heist_power_generator', [_0x3ad3d2], {
          distance: _0x370390,
          isEnabled: (_0x5aa4aa, _0x2567e4) => {
            var _0x36db38
            const _0x1e0adf =
                (_0x36db38 = _0x2567e4.zones.heist_power_generator) === null ||
                _0x36db38 === void 0
                  ? void 0
                  : _0x36db38.id,
              _0x357195 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
                'heistelectronickit_red',
                1,
                false,
                true
              )
            return (
              _0x1e0adf &&
              _0x5cdd6c.isActive &&
              _0x357195 &&
              !_0x5cdd6c.data.generators[_0x1e0adf] &&
              !(
                _0x5cdd6c.data.generatorAttempts[_0x1e0adf] &&
                _0x5cdd6c.data.generatorAttempts[_0x1e0adf] > 5
              )
            )
          },
        })
      },
      _0x234ade = async (_0x4e8798, _0x37d215, _0x531208, _0x228d87) => {
        const _0xaca51d = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), false)
          ),
          _0x247c1b = new _0xf8285b(2791.18, 1482.4, 24.51)
        if (!_0x3bf188 || _0x3bf188.heistActive) {
          emit('DoLongHudText', 'You cant do that at the moment! (Group)', 2)
          return
        }
        if (_0xaca51d.getDistance(_0x247c1b) > 250) {
          emit('DoLongHudText', 'Nothing happened...', 2)
          return
        }
        const _0x136bf3 = await _0x8f3134.execute(
          'ev-heists:powerstation:cooldown'
        )
        if (!_0x136bf3) {
          emit('DoLongHudText', 'Backup systems still running!', 2)
          return
        }
        const _0x1d48d5 = await _0x8f3134.execute(
          'ev-heists:startHeist',
          'powerstation',
          {}
        )
        if (!_0x1d48d5) {
          emit('DoLongHudText', 'Unavailable', 2)
          return
        }
        emit('DoLongHudText', 'Jamming Device Active')
        emit('inventory:removeItem', _0x4e8798, 1)
      }
    _0x336a39.onNet('ev-heists:generator:attempt', (_0xed46cd, _0xeb74c4) => {
      _0x5cdd6c.data.generatorAttempts[_0xed46cd] = _0xeb74c4
    })
    _0x336a39.on(
      'ev-heists:powerstation:generator',
      async (_0x2d8e73, _0x3d940d, _0x22f8c0) => {
        const _0x1abc19 = _0x22f8c0.zones.heist_power_generator.id
        if (
          !_0x5cdd6c.isActive ||
          !_0x1abc19 ||
          _0x5cdd6c.data.generators[_0x1abc19] ||
          (_0x5cdd6c.data.generatorAttempts[_0x1abc19] &&
            _0x5cdd6c.data.generatorAttempts[_0x1abc19] > 5)
        ) {
          return
        }
        _0x336a39.emitNet('ev-heists:generator:start', _0x1abc19)
        emit('inventory:DegenItemType', 8, 'heistelectronickit_red')
        const _0xd1d663 = +_0x1abc19,
          _0x1922ca = _0x46c4eb('minigames'),
          _0x270377 =
            _0xd1d663 <= 3
              ? _0x1922ca.powerstation['ddr-1']
              : _0xd1d663 <= 6
              ? _0x1922ca.powerstation['ddr-2']
              : _0x1922ca.powerstation['ddr-3'],
          _0x11841e = await _0x4ce42d(Object.assign({}, _0x270377))
        if (!_0x11841e) {
          return
        }
        const _0x458d9d = _0x22f8c0.zones.heist_power_generator.ptfxCoords,
          _0x104f99 = await _0x8f3134.execute(
            'ev-heists:generator:explode',
            _0x1abc19,
            _0x458d9d
          )
      }
    )
    _0x336a39.onNet(
      'ev-heists:generator:exploded',
      async (_0x17b05f, _0x40cfc3) => {
        _0x5cdd6c.data.generators[_0x17b05f] = true
        await _0x67beee.loadNamedPtfxAsset(_0x208aab)
        UseParticleFxAssetNextCall(_0x208aab)
        SetPtfxAssetNextCall(_0x208aab)
        StartParticleFxLoopedAtCoord(
          _0x281309,
          _0x40cfc3[0],
          _0x40cfc3[1],
          _0x40cfc3[2],
          0,
          180,
          0,
          10,
          false,
          false,
          false,
          false
        )
      }
    )
    _0x336a39.onNet('ev-heists:powerstation:start', (_0x4c7ae0) => {
      _0x5cdd6c.data = _0x4c7ae0
      _0x5cdd6c.start()
    })
    _0x336a39.onNet('ev-heists:powerstation:stop', () => {
      _0x5cdd6c.stop()
      _0x2dc65f(0, 0)
    })
    onNet('sv-heists:cityPowerState', (_0x492c50) => {
      _0x30b4a6 = _0x492c50
    })
    let _0x256663
    const _0x2dc65f = (_0x1d898b, _0x5b2bd1) => {
      const _0x1aa8f2 = PlayerId()
      SetMaxWantedLevel(_0x1d898b)
      SetPlayerWantedLevel(_0x1aa8f2, _0x1d898b, false)
      SetPlayerWantedLevelNow(_0x1aa8f2, false)
      SetPlayerWantedLevelNoDrop(_0x1aa8f2, _0x1d898b, false)
      for (let _0xcb3894 = 0; _0xcb3894 < 25; _0xcb3894++) {
        EnableDispatchService(_0xcb3894, true)
      }
      clearTimeout(_0x256663)
      _0x256663 = setTimeout(() => {
        SetMaxWantedLevel(0)
        SetPlayerWantedLevel(_0x1aa8f2, 0, false)
        SetPlayerWantedLevelNoDrop(_0x1aa8f2, 0, false)
        SetPlayerWantedLevelNow(_0x1aa8f2, false)
        for (let _0x359437 = 0; _0x359437 < 25; _0x359437++) {
          EnableDispatchService(_0x359437, false)
        }
      }, _0x5b2bd1)
    }
    _0x336a39.onNet('ev-heists:powerstation:setWanted', (_0x4f5863) => {
      if (_0x4f5863) {
        _0x2dc65f(2, 240000)
        return
      }
      _0x2dc65f(0, 0)
    })
    const _0x3c12d8 = async () => {
      const _0x4643d8 = {
        startScale: 5,
        toScale: 15,
      }
      const { startScale: _0x2011ad, toScale: _0xd6a230 } = _0x4643d8,
        [_0x4a786c, _0x40a28f, _0x4a727f] = [2854.3, 1550.34, 24.58],
        [_0x285d7d, _0x19b7d9, _0xba7cdd] = [2837.5, 1556.19, 24.74],
        [_0x14dc00, _0xc9ac9b, _0x421fa1] = [2825.65, 1512.43, 24.58]
      await _0x67beee.loadNamedPtfxAsset(_0x208aab)
      UseParticleFxAssetNextCall(_0x208aab)
      SetPtfxAssetNextCall(_0x208aab)
      StartParticleFxLoopedAtCoord(
        _0x281309,
        _0x4a786c,
        _0x40a28f,
        _0x4a727f,
        0,
        180,
        0,
        _0x2011ad * 10,
        false,
        false,
        false,
        false
      )
      await _0x35ac5b(400)
      if (IsStreamPlaying()) {
        StopStream()
      }
      await _0x45415b.waitForCondition(
        () =>
          LoadStream('submarine_explosions_stream', 'dlc_xm_submarine_sounds'),
        30000
      )
      PlayStreamFromPosition(2854.3, 1550.34, 24.58)
      UseParticleFxAssetNextCall(_0x208aab)
      SetPtfxAssetNextCall(_0x208aab)
      StartParticleFxLoopedAtCoord(
        _0x281309,
        _0x285d7d,
        _0x19b7d9,
        _0xba7cdd,
        0,
        180,
        0,
        _0x2011ad * 10,
        false,
        false,
        false,
        false
      )
      await _0x35ac5b(200)
      let _0x26da22 = true,
        _0x12f4d3 = _0x2011ad / 2,
        _0x3deb85 = 1
      const _0x4fe0cf = setTick(() => {
        if (!_0x26da22) {
          clearTick(_0x4fe0cf)
          return
        }
        const _0x23084d = GetFrameTime()
        _0x12f4d3 += 0.5 * _0x3deb85 * _0x23084d
        if (_0x12f4d3 > (_0x2011ad / 2) * 1.1) {
          _0x3deb85 = -1
        } else {
          _0x12f4d3 < _0x2011ad && (_0x3deb85 = 1)
        }
      })
      await _0x35ac5b(1500)
      const _0x930486 = 'scr_xs_dr',
        _0x31a533 = 'scr_xs_dr_emp'
      await _0x67beee.loadNamedPtfxAsset(_0x930486)
      let _0x358733 = 1000
      while (_0x358733 > 200) {
        const [_0x590c3a, _0x195d93, _0x39c903] =
          Math.random() > 0.5
            ? [_0x4a786c, _0x40a28f, _0x4a727f]
            : [_0x14dc00, _0xc9ac9b, _0x421fa1]
        UseParticleFxAssetNextCall(_0x930486)
        SetPtfxAssetNextCall(_0x930486)
        StartParticleFxLoopedAtCoord(
          _0x31a533,
          _0x590c3a,
          _0x195d93,
          _0x39c903,
          0,
          180,
          0,
          _0x2011ad,
          false,
          false,
          false,
          false
        )
        UseParticleFxAssetNextCall(_0x208aab)
        SetPtfxAssetNextCall(_0x208aab)
        StartParticleFxLoopedAtCoord(
          _0x281309,
          _0x285d7d,
          _0x19b7d9,
          _0xba7cdd,
          0,
          180,
          0,
          _0x2011ad * 10,
          false,
          false,
          false,
          false
        )
        _0x358733 -= _0x358733 / 10
        await _0x35ac5b(_0x358733)
      }
      _0x26da22 = false
      UseParticleFxAssetNextCall(_0x930486)
      SetPtfxAssetNextCall(_0x930486)
      StartParticleFxLoopedAtCoord(
        _0x31a533,
        _0x4a786c,
        _0x40a28f,
        _0x4a727f,
        0,
        180,
        0,
        _0x2011ad * 20,
        false,
        false,
        false,
        false
      )
      let _0x31b631 = _0x2011ad,
        _0x2a504a = 0,
        _0x49d0bd = 0,
        _0x14dbc3 = true
      const _0x5196b5 = setTick(() => {
        if (!_0x14dbc3) {
          clearTick(_0x5196b5)
          return
        }
        const _0xe1811b = GetFrameTime()
        _0x2a504a += 20 * _0xe1811b
        _0x2a504a > 360 && (_0x2a504a = 0)
        _0x49d0bd += 10 * _0xe1811b
        _0x49d0bd > 360 && (_0x49d0bd = 0)
      })
      while (_0x31b631 < _0x2011ad * _0xd6a230) {
        _0x31b631 += 23 * (_0xd6a230 / _0x31b631)
        await _0x35ac5b(1)
      }
      await _0x35ac5b(200)
      while (_0x31b631 > 0) {
        await _0x35ac5b(1)
        _0x31b631 -= 24 * (_0xd6a230 / _0x31b631)
      }
      _0x14dbc3 = false
      PlaySoundFromCoord(
        -1,
        'EMP_vehicle_affected',
        -80.35,
        -821.42,
        703.01,
        'DLC_AW_EMP_Sounds',
        false,
        0,
        false
      )
      const _0x56ae33 = 'scr_agencyheistb',
        _0x18b49a = 'scr_agency3b_heli_exp_trail'
      await _0x67beee.loadNamedPtfxAsset(_0x56ae33)
      UseParticleFxAssetNextCall(_0x56ae33)
      SetPtfxAssetNextCall(_0x56ae33)
      const _0x1c2a72 = StartParticleFxLoopedAtCoord(
        _0x18b49a,
        _0x4a786c,
        _0x40a28f,
        _0x4a727f,
        0,
        180,
        0,
        _0x2011ad * 3,
        false,
        false,
        false,
        false
      )
      SetParticleFxLoopedColour(_0x1c2a72, 75, 0, 130, false)
      let _0x233a90 = _0x2011ad,
        _0x3ba50f = false
      const _0x4598a0 = setTick(() => {
        const _0x339d82 = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), false)
          ),
          _0x454334 = _0x339d82.getDistanceFromArray([
            _0x4a786c,
            _0x40a28f,
            _0x4a727f,
          ])
        if (!_0x3ba50f && _0x454334 < _0x233a90 + 112) {
          PlaySoundFrontend(
            -1,
            'EMP_vehicle_affected',
            'DLC_AW_EMP_Sounds',
            false
          )
          _0x3ba50f = true
        }
      })
      let _0x24eec6 = 0
      const _0x437062 = setTick(async () => {
        if (_0x24eec6 >= 4) {
          clearTick(_0x437062)
          return
        }
        const _0x16b9b9 = [
            [2821.12, 1398.98, 53.81],
            [2710.12, 1240.06, 62.38],
            [2649.21, 1017.1, 106.02],
            [2618.62, 862.89, 127.25],
          ],
          _0x21aa92 = [
            [2868.86, 1608.26, 57.22],
            [2857.18, 1732.46, 72.05],
            [2677.8, 1737.18, 65.27],
            [2637.48, 1929.31, 66.82],
          ],
          [_0x4989b5, _0x11d8fc, _0x501fc4] = _0x16b9b9[_0x24eec6],
          [_0x3dce49, _0x2ac625, _0x4a69c4] = _0x21aa92[_0x24eec6]
        UseParticleFxAssetNextCall(_0x208aab)
        SetPtfxAssetNextCall(_0x208aab)
        StartParticleFxLoopedAtCoord(
          _0x281309,
          _0x4989b5,
          _0x11d8fc,
          _0x501fc4,
          0,
          180,
          0,
          _0x2011ad * 10,
          false,
          false,
          false,
          false
        )
        UseParticleFxAssetNextCall(_0x208aab)
        SetPtfxAssetNextCall(_0x208aab)
        StartParticleFxLoopedAtCoord(
          _0x281309,
          _0x3dce49,
          _0x2ac625,
          _0x4a69c4,
          0,
          180,
          0,
          _0x2011ad * 10,
          false,
          false,
          false,
          false
        )
        await _0x35ac5b(250)
        _0x24eec6++
      })
      while (_0x233a90 < 40000) {
        const _0x122a66 = GetFrameTime()
        _0x233a90 += 250 * _0x122a66
        await _0x35ac5b(1)
      }
      clearTick(_0x4598a0)
      clearTick(_0x437062)
    }
    onNet('ev-heists:powerstation:explodeStation', _0x3c12d8)
    _0x1f1484.g.exports('CityPowerState', () => _0x30b4a6)
    const _0x7d4e37 = 'window-maximize',
      _0x587d9e = 'ev-ui:heistsMazeMinigameResult'
    let _0x5ccfc4
    const _0x2d0b16 = async (_0x4f5827) => {
      var _0x349306
      _0x5ccfc4 = null
      const _0x10718f = !!_0x4f5827.gameFinishedEndpoint
      ;(_0x349306 = _0x4f5827.gameFinishedEndpoint) !== null &&
      _0x349306 !== void 0
        ? _0x349306
        : (_0x4f5827.gameFinishedEndpoint = _0x587d9e)
      exports['ev-ui'].openApplication('minigame-maze', _0x4f5827)
      if (_0x10718f) {
        return
      }
      const _0x4a3995 = await _0x45415b.waitForCondition(() => {
        return _0x5ccfc4 !== undefined && _0x5ccfc4 !== null
      }, 60000)
      if (_0x4a3995) {
        return false
      }
      return emitNet('ev-heists:hack:track', _0x5ccfc4, 'maze'), _0x5ccfc4
    }
    RegisterUICallback(_0x587d9e, async (_0x1c5b54, _0x5b7f7b) => {
      _0x5ccfc4 = _0x1c5b54.success
      const _0x5b71c2 = {
        ok: true,
        message: '',
      }
      const _0x4e2e75 = {}
      return (
        (_0x4e2e75.data = 'success'),
        (_0x4e2e75.meta = _0x5b71c2),
        _0x5b7f7b(_0x4e2e75)
      )
    })
    on('ev-ui:application-closed', async (_0x436c2f) => {
      if (_0x436c2f !== 'minigame-maze') {
        return
      }
      await _0x35ac5b(2500)
      if (_0x5ccfc4 === undefined || _0x5ccfc4 === null) {
        _0x5ccfc4 = false
      }
    })
    _0x1f1484.g.exports('MazeMinigame', _0x2d0b16)
    const _0x2c681d = 'window-restore',
      _0x4af806 = 'ev-ui:heistsVarMinigameResult'
    let _0x3aaebb
    const _0x56115f = async (_0x24175f) => {
      var _0x13ee06
      _0x3aaebb = null
      const _0x5ccf7f = !!_0x24175f.gameFinishedEndpoint
      ;(_0x13ee06 = _0x24175f.gameFinishedEndpoint) !== null &&
      _0x13ee06 !== void 0
        ? _0x13ee06
        : (_0x24175f.gameFinishedEndpoint = _0x4af806)
      _0x1f1484.g.exports['ev-ui'].openApplication(
        'minigame-serverroom',
        _0x24175f
      )
      if (_0x5ccf7f) {
        return
      }
      const _0x227079 = await _0x45415b.waitForCondition(() => {
        return _0x3aaebb !== undefined && _0x3aaebb !== null
      }, 60000)
      if (_0x227079) {
        return false
      }
      return emitNet('ev-heists:hack:track', _0x3aaebb, 'serverroom'), _0x3aaebb
    }
    RegisterUICallback(_0x4af806, async (_0x88362b, _0x44da8b) => {
      _0x3aaebb = _0x88362b.success
      const _0x342fe0 = {
        ok: true,
        message: '',
      }
      const _0x84a9d9 = {}
      return (
        (_0x84a9d9.data = 'success'),
        (_0x84a9d9.meta = _0x342fe0),
        _0x44da8b(_0x84a9d9)
      )
    })
    on('ev-ui:application-closed', async (_0xc7ad93) => {
      if (_0xc7ad93 !== 'minigame-serverroom') {
        return
      }
      await _0x35ac5b(2500)
      if (_0x3aaebb === undefined || _0x3aaebb === null) {
        _0x3aaebb = false
      }
    })
    _0x1f1484.g.exports('VarMinigame', _0x56115f)
    _0x336a39.on(
      'ev-heists:paleto:officePCTask',
      async (_0x340703, _0x3fd600, _0x37fe11) => {
        var _0x37627e
        const _0x5530ab =
          (_0x37627e = _0x37fe11.zones.heist_paleto_officepc) === null ||
          _0x37627e === void 0
            ? void 0
            : _0x37627e.id
        if (!_0x5530ab) {
          return
        }
        const _0x4da6c7 = await _0x1f45d4.taskBar(
          25000,
          'Downloading data...',
          true,
          {
            distance: 1,
            entity: PlayerPedId(),
          }
        )
        if (!_0x4da6c7) {
          return
        }
        _0x8f3134.execute(
          'ev-heists:paleto:completeTask',
          'officePC',
          +_0x5530ab
        )
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:sideKeypadTask',
      async (_0x546d1a, _0x491e21, _0x26890c) => {
        const _0x41b5f0 = {
          gameTimeoutDuration: 14000,
          coloredSquares: 14,
          gridSize: 5,
        }
        const _0x4d63e3 = await _0x17a542(_0x41b5f0)
        if (!_0x4d63e3) {
          return
        }
        _0x8f3134.execute('ev-heists:paleto:completeTask', 'sideKeypad', 1)
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:hallPowerTask',
      async (_0x29f0ce, _0x3c19b2, _0x544065) => {
        const _0x1dad0d = {
          letters: ['w', 'a', 's', 'd', 'i', 'j', 'k', 'l'],
          gameTimeoutDuration: 35000,
          failureCount: 3,
          timeBetweenLetters: 550,
          timeToTravel: 1200,
          columns: 4,
        }
        const _0x57e52e = _0x4ce42d(_0x1dad0d)
        if (!_0x57e52e) {
          return
        }
        _0x8f3134.execute('ev-heists:paleto:completeTask', 'hallPower', 1)
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:frontDeskTask',
      async (_0x3815db, _0x3362f4, _0x3e3f9c) => {
        const _0x6d2937 = {
          numberTimeout: 5000,
          squares: 7,
        }
        const _0x2d16e6 = await _0x56115f(_0x6d2937)
        if (!_0x2d16e6) {
          return
        }
        _0x8f3134.execute('ev-heists:paleto:completeTask', 'frontDesk', 1)
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:payphoneTask',
      async (_0x43eca5, _0x2ed457, _0x581720) => {
        var _0x33483f
        const _0x6881ee =
          (_0x33483f = _0x581720.zones.heist_paleto_payphone) === null ||
          _0x33483f === void 0
            ? void 0
            : _0x33483f.id
        if (!_0x6881ee) {
          return
        }
        const _0x187c9d = {
          gridSize: 5,
          numberHideDuration: 4500,
        }
        const _0x494028 = await _0x2d0b16(_0x187c9d)
        if (!_0x494028) {
          return
        }
        _0x8f3134.execute(
          'ev-heists:paleto:completeTask',
          'payphone',
          +_0x6881ee
        )
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:atmTask',
      async (_0x3c3633, _0x3a9145, _0x54d7de) => {
        var _0x596b7e
        const _0x3f00fb =
          (_0x596b7e = _0x54d7de.zones.heist_paleto_atm) === null ||
          _0x596b7e === void 0
            ? void 0
            : _0x596b7e.id
        if (!_0x3f00fb) {
          return
        }
        const _0x4d0cff = {
          gridSize: 4,
          gameTimeoutDuration: 10000,
        }
        const _0x252d9a = await _0xe8fb18(_0x4d0cff)
        if (!_0x252d9a) {
          return
        }
        _0x8f3134.execute('ev-heists:paleto:completeTask', 'atm', +_0x3f00fb)
      }
    )
    const _0x1aa125 = new _0x72bbde(function () {}, 1000),
      _0x157927 = async () => {
        const _0x41ca9c = {
          x: 2585.87,
          y: 5065.81,
          z: 44.92,
        }
        const _0x1900d3 = {
          heading: 20,
          minZ: 42.17,
          maxZ: 46.12,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_powerstation',
          _0x41ca9c,
          1.6,
          1.6,
          _0x1900d3
        )
        const _0x1dcef3 = {
          x: 1350.98,
          y: 6388.13,
          z: 33.21,
        }
        const _0x31bbf2 = {
          heading: 0,
          minZ: 32.21,
          maxZ: 34.21,
        }
        _0x2d4217.addBoxTarget(
          '2',
          'heist_paleto_powerstation',
          _0x1dcef3,
          1,
          1,
          _0x31bbf2
        )
        const _0x37f658 = {
          x: 224.59,
          y: 6397.89,
          z: 31.41,
        }
        const _0x254bc7 = {
          heading: 25,
          minZ: 30.41,
          maxZ: 32.41,
        }
        _0x2d4217.addBoxTarget(
          '3',
          'heist_paleto_powerstation',
          _0x37f658,
          1,
          1,
          _0x254bc7
        )
        const _0x2d8498 = {
          id: 'h_paleto_powerstation',
          label: 'Activate',
          icon: _0x31ec01,
          CPXEvent: 'ev-heists:paleto:powerstation',
        }
        const _0x157b83 = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_powerstation',
          [_0x2d8498],
          {
            distance: _0x157b83,
            isEnabled: () => {
              const _0x4bb4cb = _0x1f1484.g.exports[
                'ev-inventory'
              ].hasEnoughOfItem('heistelectronickit_blue', 1, false, true)
              return _0x4bb4cb
            },
          }
        )
        const _0x300051 = {
          x: -97.58,
          y: 6455.66,
          z: 31.46,
        }
        const _0x32fd58 = {
          heading: 43,
          minZ: 28.71,
          maxZ: 32.66,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_atm',
          _0x300051,
          0.6,
          1.6,
          _0x32fd58
        )
        const _0x90faa0 = {
          x: -95.82,
          y: 6457.42,
          z: 31.46,
        }
        const _0x4142ad = {
          heading: 45,
          minZ: 28.71,
          maxZ: 32.66,
        }
        _0x2d4217.addBoxTarget(
          '2',
          'heist_paleto_atm',
          _0x90faa0,
          0.6,
          1.6,
          _0x4142ad
        )
        const _0x523700 = {
          x: -91.97,
          y: 6462.6,
          z: 31.47,
        }
        const _0x1b55e5 = {
          heading: 46,
          minZ: 28.72,
          maxZ: 32.67,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_payphone',
          _0x523700,
          0.6,
          1.6,
          _0x1b55e5
        )
        const _0x1e53ab = {
          x: -90.57,
          y: 6464.04,
          z: 31.47,
        }
        const _0x3c2d74 = {
          heading: 46,
          minZ: 28.72,
          maxZ: 32.67,
        }
        _0x2d4217.addBoxTarget(
          '2',
          'heist_paleto_payphone',
          _0x1e53ab,
          0.6,
          1.6,
          _0x3c2d74
        )
        const _0x28f454 = {
          x: -85.06,
          y: 6461.18,
          z: 31.51,
        }
        const _0x454556 = {
          heading: 46,
          minZ: 28.76,
          maxZ: 32.71,
        }
        _0x2d4217.addBoxZone(
          'paleto',
          'fleeca_box_zone',
          _0x28f454,
          1.4,
          1.6,
          _0x454556
        )
        const _0x20eaeb = {
          x: -97.34,
          y: 6475.11,
          z: 31.43,
        }
        const _0x378e0b = {
          heading: 46,
          minZ: 28.68,
          maxZ: 32.63,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_outsidedoor',
          _0x20eaeb,
          1.2,
          0.4,
          _0x378e0b
        )
        const _0x57a6ff = {
          id: 'h_paleto_outsidedoor',
          label: 'Activate',
          icon: _0x2d9e47,
          CPXEvent: 'ev-heists:paleto:backDoor',
        }
        const _0x1ffc69 = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_outsidedoor',
          [_0x57a6ff],
          {
            distance: _0x1ffc69,
            isEnabled: () => {
              const _0x16289f = _0x1f1484.g.exports[
                'ev-inventory'
              ].hasEnoughOfItem('heistdecrypter_blue', 1, false, true)
              return (
                _0x1aa125.isActive &&
                _0x16289f &&
                !_0x1aa125.data.openDoors.backDoor
              )
            },
          }
        )
        const _0x19ebdf = {
          x: -92.88,
          y: 6469.94,
          z: 31.65,
        }
        const _0x3bb0d8 = {
          heading: 46,
          minZ: 28.9,
          maxZ: 32.85,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_secdoor',
          _0x19ebdf,
          1.2,
          0.4,
          _0x3bb0d8
        )
        const _0x2c445f = {
          id: 'h_paleto_secdoor',
          label: 'Activate',
          icon: _0x2d9e47,
          CPXEvent: 'ev-heists:paleto:securityDoor',
        }
        const _0x3136bb = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByTarget('heist_paleto_secdoor', [_0x2c445f], {
          distance: _0x3136bb,
          isEnabled: () => {
            const _0x6320f2 = _0x1f1484.g.exports[
              'ev-inventory'
            ].hasEnoughOfItem('heistdecrypter_blue', 1, false, true)
            return (
              _0x1aa125.isActive &&
              _0x6320f2 &&
              !_0x1aa125.data.openDoors.securityDoor
            )
          },
        })
        const _0x44f4b1 = {
          x: -91.68,
          y: 6464.8,
          z: 31.63,
        }
        const _0x26b2f6 = {
          heading: 46,
          minZ: 31.43,
          maxZ: 31.98,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_seccams',
          _0x44f4b1,
          0.8,
          1.2,
          _0x26b2f6
        )
        const _0x30faa1 = {
          x: -94.89,
          y: 6462.67,
          z: 31.63,
        }
        const _0x5801f8 = {
          heading: 136,
          minZ: 31.43,
          maxZ: 31.98,
        }
        _0x2d4217.addBoxTarget(
          '2',
          'heist_paleto_seccams',
          _0x30faa1,
          1,
          2.2,
          _0x5801f8
        )
        const _0x44459c = {
          x: -93.03,
          y: 6463.62,
          z: 31.63,
        }
        const _0x58cdb0 = {
          heading: 45,
          minZ: 31.33,
          maxZ: 31.73,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_doorcontrol',
          _0x44459c,
          0.6,
          1,
          _0x58cdb0
        )
        const _0x131536 = {
          id: 'h_paleto_seccams',
          label: 'Activate',
          icon: 'video',
          CPXEvent: 'ev-heists:paleto:viewSecurityCams',
        }
        const _0x9aefd7 = { radius: 2.5 }
        const _0x2fdfab = {
          distance: _0x9aefd7,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_seccams',
          [_0x131536],
          _0x2fdfab
        )
        const _0x6cadef = {
          id: 'h_paleto_doorcontrol',
          label: 'Control Panel',
          icon: 'laptop-house',
          CPXEvent: 'ev-heists:paleto:doorControl',
        }
        const _0x43150f = { radius: 2.5 }
        const _0x574a4a = {
          distance: _0x43150f,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_doorcontrol',
          [_0x6cadef],
          _0x574a4a
        )
        const _0x563e53 = {
          x: -105.29,
          y: 6480.63,
          z: 31.63,
        }
        const _0x3ea1a7 = {
          heading: 136,
          minZ: 31.63,
          maxZ: 32.38,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_safe',
          _0x563e53,
          0.2,
          0.8,
          _0x3ea1a7
        )
        const _0xa55c6f = {
          id: 'h_paleto_safe',
          label: 'Crack Safe',
          icon: _0x3400da,
          CPXEvent: 'ev-heists:paleto:safeCrack',
        }
        const _0x5b601c = { radius: 2.5 }
        const _0x5e21e5 = {
          distance: _0x5b601c,
          isEnabled: () => {
            return _0x1aa125.isActive
          },
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_safe',
          [_0xa55c6f],
          _0x5e21e5
        )
        const _0x22af18 = {
          x: -106.46,
          y: 6473.64,
          z: 31.63,
        }
        const _0x2170d9 = {
          heading: 136,
          minZ: 31.28,
          maxZ: 31.83,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_frontdesk',
          _0x22af18,
          1.4,
          0.8,
          _0x2170d9
        )
        const _0x44320d = {
          x: -117.95,
          y: 6470.23,
          z: 31.63,
        }
        const _0x417450 = {
          heading: 226,
          minZ: 30.88,
          maxZ: 32.83,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_hallpower',
          _0x44320d,
          1.4,
          0.4,
          _0x417450
        )
        const _0x3ce05b = {
          x: -115.29,
          y: 6479.99,
          z: 31.65,
        }
        const _0x4019ee = {
          heading: 226,
          minZ: 31.7,
          maxZ: 32.25,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_sidekeypad',
          _0x3ce05b,
          0.2,
          0.4,
          _0x4019ee
        )
        const _0x210e84 = {
          x: -115.61,
          y: 6480.26,
          z: 31.47,
        }
        const _0x31d19f = {
          heading: 226,
          minZ: 31.72,
          maxZ: 32.27,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_sideoutsidekeypad',
          _0x210e84,
          0.2,
          0.4,
          _0x31d19f
        )
        const _0x298331 = {
          id: 'h_paleto_outsidekeypad',
          label: 'Activate',
          icon: _0x2d9e47,
          CPXEvent: 'ev-heists:paleto:outsideKeypad',
        }
        const _0x17b76c = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_sideoutsidekeypad',
          [_0x298331],
          {
            distance: _0x17b76c,
            isEnabled: () => {
              const _0x1e3b48 = _0x1f1484.g.exports[
                'ev-inventory'
              ].hasEnoughOfItem('heistdecrypter_blue', 1, false, true)
              return (
                _0x1aa125.isActive &&
                _0x1e3b48 &&
                !_0x1aa125.data.openDoors.sideDoor
              )
            },
          }
        )
        const _0x2653fc = {
          x: -101.91,
          y: 6462.86,
          z: 31.63,
        }
        const _0x4a4124 = {
          heading: 226,
          minZ: 31.73,
          maxZ: 32.48,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_vaultkeypad',
          _0x2653fc,
          0.2,
          0.6,
          _0x4a4124
        )
        const _0x3a8b2d = {
          id: 'h_paleto_vaultkeypad',
          label: 'Enter Code',
          icon: 'envelope-open-text',
          CPXEvent: 'ev-heists:paleto:vaultKeypad',
        }
        const _0x2dface = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_vaultkeypad',
          [_0x3a8b2d],
          {
            distance: _0x2dface,
            isEnabled: () => {
              const _0x3546b1 = _0x1f1484.g.exports[
                'ev-inventory'
              ].hasEnoughOfItem('heistlaptop2', 1, false, true)
              return (
                _0x1aa125.isActive && _0x3546b1 && !_0x1aa125.data.vaultDoorOpen
              )
            },
          }
        )
        const _0x2d2631 = {
          x: -96.84,
          y: 6463.43,
          z: 31.63,
        }
        const _0x48c789 = {
          heading: 316,
          minZ: 31.13,
          maxZ: 32.68,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_loot',
          _0x2d2631,
          0.2,
          2.4,
          _0x48c789
        )
        const _0x475c8d = {
          x: -96.43,
          y: 6459.79,
          z: 31.63,
        }
        const _0xb6bd96 = {
          heading: 46,
          minZ: 31.13,
          maxZ: 32.68,
        }
        _0x2d4217.addBoxTarget(
          '2',
          'heist_paleto_loot',
          _0x475c8d,
          0.2,
          2.4,
          _0xb6bd96
        )
        const _0x2358d0 = {
          x: -100.13,
          y: 6459.81,
          z: 31.63,
        }
        const _0x178198 = {
          heading: 136,
          minZ: 31.13,
          maxZ: 32.68,
        }
        _0x2d4217.addBoxTarget(
          '3',
          'heist_paleto_loot',
          _0x2358d0,
          0.2,
          2.4,
          _0x178198
        )
        const _0x238cf0 = {
          CPXEvent: 'ev-heists:paleto:rob',
          id: 'h_paleto_loot',
          icon: 'th',
          label: 'Rob',
        }
        const _0x59181f = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByTarget('heist_paleto_loot', [_0x238cf0], {
          distance: _0x59181f,
          isEnabled: (_0x2d3b70, _0x2b9d75) => {
            var _0x5eeb78
            const _0x365fdc =
              (_0x5eeb78 = _0x2b9d75.zones.heist_paleto_loot) === null ||
              _0x5eeb78 === void 0
                ? void 0
                : _0x5eeb78.id
            if (!_0x365fdc) {
              return false
            }
            const _0x1eb3a4 = _0x1f1484.g.exports[
              'ev-inventory'
            ].hasEnoughOfItem('heistdrill_blue', 1, false, true)
            return (
              _0x1aa125.isActive &&
              _0x1aa125.data.vaultDoorOpen &&
              !_0x1aa125.data.robbedLocations[_0x365fdc] &&
              _0x1eb3a4
            )
          },
        })
        const _0x4934ce = {
          x: -98.09,
          y: 6466.29,
          z: 31.63,
        }
        const _0x22f9e5 = {
          heading: 136,
          minZ: 31.33,
          maxZ: 31.68,
        }
        _0x2d4217.addBoxTarget(
          '2',
          'heist_paleto_officepc',
          _0x4934ce,
          1.4,
          0.6,
          _0x22f9e5
        )
        const _0x340968 = {
          x: -103.7,
          y: 6460.67,
          z: 31.63,
        }
        const _0x42f18b = {
          heading: 136,
          minZ: 31.33,
          maxZ: 31.68,
        }
        _0x2d4217.addBoxTarget(
          '1',
          'heist_paleto_officepc',
          _0x340968,
          1.4,
          0.6,
          _0x42f18b
        )
        const _0x54bf9e = {
          id: 'h_paleto_officepc',
          label: 'Activate',
          icon: 'laptop',
          CPXEvent: 'ev-heists:paleto:officePCTask',
        }
        const _0x1d6605 = { radius: 2.5 }
        const _0x57a384 = {
          distance: _0x1d6605,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_officepc',
          [_0x54bf9e],
          _0x57a384
        )
        const _0x76a41b = {
          id: 'h_paleto_sidekeypad',
          label: 'Activate',
          icon: 'keyboard',
          CPXEvent: 'ev-heists:paleto:sideKeypadTask',
        }
        const _0x2a8260 = { radius: 2.5 }
        const _0x1081ab = {
          distance: _0x2a8260,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_sidekeypad',
          [_0x76a41b],
          _0x1081ab
        )
        const _0x42fada = {
          id: 'h_paleto_hallpower',
          label: 'Activate',
          icon: 'bolt',
          CPXEvent: 'ev-heists:paleto:hallPowerTask',
        }
        const _0x2f74e6 = { radius: 2.5 }
        const _0x2d7a14 = {
          distance: _0x2f74e6,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_hallpower',
          [_0x42fada],
          _0x2d7a14
        )
        const _0x10ea3e = {
          id: 'h_paleto_frontdesk',
          label: 'Activate',
          icon: 'window-restore',
          CPXEvent: 'ev-heists:paleto:frontDeskTask',
        }
        const _0x4d6190 = { radius: 2.5 }
        const _0x36a057 = {
          distance: _0x4d6190,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_frontdesk',
          [_0x10ea3e],
          _0x36a057
        )
        const _0x573876 = {
          id: 'h_paleto_payphone',
          label: 'Activate',
          icon: 'phone-square',
          CPXEvent: 'ev-heists:paleto:payphoneTask',
        }
        const _0x509181 = { radius: 2.5 }
        const _0x4e633f = {
          distance: _0x509181,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_payphone',
          [_0x573876],
          _0x4e633f
        )
        const _0x55bd88 = {
          id: 'h_paleto_atm',
          label: 'Activate',
          icon: 'dollar-sign',
          CPXEvent: 'ev-heists:paleto:atmTask',
        }
        const _0x2fb8d3 = { radius: 2.5 }
        const _0x2c3a38 = {
          distance: _0x2fb8d3,
          isEnabled: () => _0x1aa125.isActive,
        }
        _0x1f45d4.addPeekEntryByTarget(
          'heist_paleto_atm',
          [_0x55bd88],
          _0x2c3a38
        )
      },
      _0x22e958 = async (_0x401882, _0x1ec17e, _0x1d9ff3, _0x1a8389) => {
        const _0x219b7a = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), true)
          ),
          _0x54285f = _0xf8285b.fromArray([-85.06, 6461.18, 31.51]),
          _0x340c9f = _0x219b7a.getDistance(_0x54285f)
        if (_0x340c9f > 2.5) {
          return
        }
        if (!_0x3bf188 || _0x3bf188.heistActive) {
          emit('DoLongHudText', 'You cant do that at the moment! (Group)', 2)
          return
        }
        const _0x211087 = {
          label: 'Encryption Code',
          name: 'code',
        }
        const _0x5ebd86 = await _0x1f1484.g.exports['ev-ui'].OpenInputMenu(
          [_0x211087],
          (_0x25fb32) => _0x25fb32 && _0x25fb32.code
        )
        if (!_0x5ebd86) {
          return
        }
        const _0x65b663 = await _0x8f3134.execute(
          'ev-heists:paleto:canRob',
          _0x5ebd86.code
        )
        if (!_0x65b663) {
          emit('DoLongHudText', 'Unavailable', 2)
          return
        }
        emit('inventory:removeItem', 'thermitecharge', 1)
        const _0x10bc2c = {
            x: _0x54285f.x,
            y: _0x54285f.y,
            z: _0x54285f.z,
            h: GetEntityHeading(PlayerPedId()),
          },
          _0x57ff6d = _0x46c4eb('minigames'),
          _0x5fdfef = _0x17a542(Object.assign({}, _0x57ff6d.paleto.thermite))
        _0x530a45(_0x10bc2c, 0, _0x5fdfef)
        const _0x5ae2fb = await _0x5fdfef
        if (!_0x5ae2fb) {
          return
        }
        const _0x42e5c3 = { code: _0x5ebd86.code }
        const _0x23861b = await _0x8f3134.execute(
          'ev-heists:startHeist',
          'paleto',
          _0x42e5c3
        )
      }
    _0x336a39.onNet('ev-heists:paleto:start', (_0x54a0cd) => {
      _0x1aa125.data = _0x54a0cd
      _0x1aa125.start()
    })
    _0x336a39.onNet('ev-heists:paleto:stop', () => {
      _0x1aa125.stop()
    })
    _0x336a39.onNet('ev-heists:paleto:update', (_0x1c96f7) => {
      _0x1aa125.data = _0x1c96f7
    })
    _0x336a39.on(
      'ev-heists:paleto:powerstation',
      async (_0x3f3757, _0x39f487, _0x1e2749) => {
        const _0x3fbbfb = _0x1e2749.zones.heist_paleto_powerstation.id,
          _0x323e3f = await _0x8f3134.execute(
            'ev-heists:paleto:power:canUse',
            _0x3fbbfb
          )
        if (!_0x323e3f) {
          emit('DoLongHudText', 'Unavailable', 2)
          return
        }
        emit('inventory:DegenItemType', 35, 'heistelectronickit_blue')
        const _0x3e277e = +_0x3fbbfb,
          _0x342c5a = _0x46c4eb('minigames'),
          _0x10a22f = _0x342c5a.powerstation['ddr-' + _0x3e277e],
          _0x389457 = await _0x4ce42d(Object.assign({}, _0x10a22f))
        if (!_0x389457) {
          const _0x575e93 = _0xf8285b.fromArray(
              GetEntityCoords(PlayerPedId(), true)
            ),
            _0x4824e5 = { police: true }
          const _0x28abb2 = {
            x: _0x575e93.x,
            y: _0x575e93.y,
            z: _0x575e93.z,
          }
          const _0x3cf7c2 = {
            dispatchCode: '10-100B',
            displayCode: '10-100B',
            skipMapping: false,
            recipientList: _0x4824e5,
            isImportant: true,
            playSound: false,
            soundName: 'HighPrioCrime',
            priority: 1,
            origin: _0x28abb2,
          }
          emitNet('dispatch:svNotify', _0x3cf7c2)
          return
        }
        const _0x2d8ab3 = GetEntityCoords(PlayerPedId(), false),
          _0x366064 = await _0x8f3134.execute(
            'ev-heists:paleto:power:explode',
            _0x3fbbfb,
            _0x2d8ab3
          )
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:backDoor',
      async (_0x35087e, _0x329216, _0x1a5082) => {
        emit('inventory:DegenItemType', 26, 'heistdecrypter_blue')
        const _0x5a857b = { numPoints: 10 }
        const _0x575704 = await _0x2d70cc(_0x5a857b)
        if (!_0x575704) {
          return
        }
        _0x8f3134.execute('ev-heists:paleto:door', 'backDoor')
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:securityDoor',
      async (_0x1ba5d3, _0x331695, _0x246b0e) => {
        emit('inventory:DegenItemType', 26, 'heistdecrypter_blue')
        const _0x3fadd5 = { numPoints: 10 }
        const _0x328a90 = await _0x2d70cc(_0x3fadd5)
        if (!_0x328a90) {
          return
        }
        _0x8f3134.execute('ev-heists:paleto:door', 'securityDoor')
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:outsideKeypad',
      async (_0x40df65, _0x303433, _0x37f454) => {
        emit('inventory:DegenItemType', 26, 'heistdecrypter_blue')
        const _0x484870 = { numPoints: 10 }
        const _0x1d798c = await _0x2d70cc(_0x484870)
        if (!_0x1d798c) {
          return
        }
        _0x8f3134.execute('ev-heists:paleto:door', 'sideDoor')
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:viewSecurityCams',
      (_0x6d6c94, _0x4bc652, _0x267393) => {
        const _0x1e1618 = _0x2d4ed3.filter((_0x5e553c) =>
            _0x5e553c.id.startsWith('paleto')
          ),
          _0xf15a76 = _0x1e1618.map((_0x54a1d4) => {
            const _0x116c31 = {}
            return (
              (_0x116c31.title = _0x54a1d4.name),
              (_0x116c31.icon = 'video'),
              (_0x116c31.key = _0x54a1d4.id),
              (_0x116c31.action = 'ev-heists:paleto:viewSecurityCam'),
              _0x116c31
            )
          })
        _0x1f1484.g.exports['ev-ui'].showContextMenu(_0xf15a76)
      }
    )
    RegisterUICallback(
      'ev-heists:paleto:viewSecurityCam',
      (_0x5d5a2d, _0x10c8d5) => {
        const _0x1014ad = {
          ok: true,
          message: '',
        }
        const _0x252b55 = {
          data: {},
          meta: _0x1014ad,
        }
        _0x10c8d5(_0x252b55)
        const _0x5be951 = _0x2d4ed3.find(
          (_0x157756) => _0x157756.id === _0x5d5a2d.key
        )
        if (!_0x5be951) {
          return
        }
        _0x4e3c43(_0x5be951, (_0x4d6a9f) => {
          const _0x4d515b =
            _0x1f1484.g.exports['ev-objects'].GetObjectByEntity(_0x4d6a9f)
          if (!_0x4d515b) {
            return false
          }
          const _0x4b877c = _0x4d515b.data.metadata
          if (!_0x4b877c.heist_paleto_server) {
            return false
          }
          const _0x21ff92 = _0x1aa125.data.officeData[_0x4b877c.id]
          if (!_0x21ff92) {
            return
          }
          const _0x5a39d1 = _0x21ff92.locked
            ? '~r~Encrypted!'
            : _0x21ff92.current === _0x21ff92.target
            ? '~g~' + _0x21ff92.code
            : '~r~' + _0x21ff92.current + '~w~ / ~g~' + _0x21ff92.target
          return (
            _0x4e2d85(
              0.5,
              0.33,
              _0x5a39d1,
              [0, 0, 0, 255],
              0.4,
              _0x21ff92.locked ? 3 : 8,
              0
            ),
            true
          )
        })
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:safeCrack',
      async (_0x4245f3, _0x4a6f8a, _0x40e16a) => {
        const _0x42f64a = await _0x4ecdc8(3)
        if (!_0x42f64a) {
          return
        }
        const _0x1cb5f5 = {}
        _0x1cb5f5['_factory'] = true
        _0x1cb5f5['_description'] =
          'Vault Security Code: ' + _0x1aa125.data.vaultKeypadCode
        emit(
          'player:receiveItem',
          'heistsafecodes',
          1,
          false,
          {},
          JSON.stringify(_0x1cb5f5)
        )
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:vaultKeypad',
      async (_0x3a61a6, _0x4197e, _0x149ecc) => {
        const _0x127495 = {
          label: 'Security Code',
          icon: 'code',
          name: 'code',
        }
        const _0x153ed2 = await _0x1f1484.g.exports['ev-ui'].OpenInputMenu(
          [_0x127495],
          (_0x35f9a7) => _0x35f9a7 && _0x35f9a7.code
        )
        if (!_0x153ed2) {
          return
        }
        await _0x35ac5b(1)
        if (_0x153ed2.code !== _0x1aa125.data.vaultKeypadCode) {
          emit('DoLongHudText', 'Incorrect Code', 2)
          return
        }
        emit('inventory:DegenItemType', 33, 'heistlaptop2')
        const _0x7edcbb = _0x46c4eb('minigames'),
          _0x29d5a3 = _0x1dd87a(Object.assign({}, _0x7edcbb.paleto.laptop)),
          _0x6eef38 = GetEntityCoords(PlayerPedId(), true)
        _0x28e004(_0x6eef38, 225, _0x29d5a3)
        const _0x4c8a93 = await _0x29d5a3
        if (!_0x4c8a93) {
          return
        }
        emit('inventory:DegenItemType', 100, 'heistlaptop2')
        await _0x8f3134.execute('ev-heists:paleto:vaultKeypad')
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:rob',
      async (_0x4c8d99, _0x3d22f6, _0x31b594) => {
        var _0x12344c
        const _0x14bce4 =
          (_0x12344c = _0x31b594.zones.heist_paleto_loot) === null ||
          _0x12344c === void 0
            ? void 0
            : _0x12344c.id
        if (!_0x14bce4) {
          return
        }
        _0x336a39.emitNet('ev-heists:paleto:startRob', _0x14bce4)
        emit('inventory:DegenItemType', 26, 'heistdrill_blue')
        const _0x3d3c56 = _0x46c4eb('minigames'),
          _0x49c177 = await _0xe8fb18(Object.assign({}, _0x3d3c56.paleto.flip))
        await _0x35ac5b(1000)
        _0x1f1484.g.exports['ev-ui'].closeApplication('minigame-flip')
        let _0xb9ba9a = false
        if (_0x49c177) {
          const _0x310a5a = _0x572249()
          _0x15d372(_0x310a5a)
          _0xb9ba9a = await _0x310a5a
        }
        const _0x151851 = await _0x8f3134.execute(
          'ev-heists:paleto:rob',
          _0x14bce4,
          _0xb9ba9a && _0x49c177
        )
      }
    )
    _0x336a39.on(
      'ev-heists:paleto:doorControl',
      async (_0x3e55c3, _0x26ede4, _0x4fa93e) => {
        const _0x5a418e = {
          id: 'office_1',
          name: 'Office 1',
        }
        const _0xaecb9d = {
          id: 'office_2',
          name: 'Office 2',
        }
        const _0x1910b6 = {
          id: 'office_3',
          name: 'Office 3',
        }
        const _0x5b6858 = {
          id: 'lobbyBackDoor',
          name: 'Back Hallway',
        }
        const _0x46b862 = {
          id: 'lobbyMainDesk',
          name: 'Front Desk',
        }
        const _0xb15ca2 = {
          id: 'lobbySideDoor',
          name: 'Side Hallway',
        }
        const _0x52ad2a = [
            _0x5a418e,
            _0xaecb9d,
            _0x1910b6,
            _0x5b6858,
            _0x46b862,
            _0xb15ca2,
          ],
          _0x3e075d = _0x52ad2a.map((_0x3f2b49) => {
            const _0x53ae3d = {}
            return (
              (_0x53ae3d.title = _0x3f2b49.name),
              (_0x53ae3d.icon = 'key'),
              (_0x53ae3d.key = _0x3f2b49.id),
              (_0x53ae3d.action = 'ev-heists:paleto:door'),
              (_0x53ae3d.disabled = _0x1aa125.data.openDoors[_0x3f2b49.id]),
              _0x53ae3d
            )
          })
        _0x1f1484.g.exports['ev-ui'].showContextMenu(_0x3e075d)
      }
    )
    RegisterUICallback(
      'ev-heists:paleto:door',
      async (_0x2fff5c, _0x277266) => {
        const _0x50781e = {
          ok: true,
          message: '',
        }
        const _0xe4d5a4 = {
          data: {},
          meta: _0x50781e,
        }
        _0x277266(_0xe4d5a4)
        const _0x39c995 = _0x2fff5c.key
        if (!_0x39c995) {
          return
        }
        await _0x35ac5b(1)
        if (_0x39c995.startsWith('office')) {
          const _0x43fa75 = {
            label: 'Unlock Code',
            name: 'code',
          }
          const _0x25104a = await _0x1f1484.g.exports['ev-ui'].OpenInputMenu(
            [_0x43fa75],
            (_0x176b84) => _0x176b84 && _0x176b84.code
          )
          if (!_0x25104a) {
            return
          }
          if (_0x25104a.code !== _0x1aa125.data.officeData[_0x39c995].code) {
            emit('DoLongHudText', 'Incorrect Code', 2)
            return
          }
        }
        await _0x8f3134.execute('ev-heists:paleto:door', _0x39c995)
      }
    )
    onNet('ev-heists:paleto:power:exploded', async (_0x47c9fa, _0xbfcc52) => {
      await _0x67beee.loadNamedPtfxAsset(_0x208aab)
      UseParticleFxAssetNextCall(_0x208aab)
      SetPtfxAssetNextCall(_0x208aab)
      StartParticleFxLoopedAtCoord(
        _0x281309,
        _0xbfcc52[0],
        _0xbfcc52[1],
        _0xbfcc52[2],
        0,
        180,
        0,
        10,
        false,
        false,
        false,
        false
      )
    })
    const _0x22b15a = () => {
      const _0x29e8bd = {
        x: 227.86,
        y: 228.45,
        z: 97.5,
      }
      const _0x352f6e = {
        heading: 160,
        minZ: 97.09,
        maxZ: 98.09,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_l_inner_keypad',
        _0x29e8bd,
        0.3,
        0.8,
        _0x352f6e
      )
      const _0x8d390e = {
        x: 229.19,
        y: 231.75,
        z: 96.94,
      }
      const _0x164339 = {
        heading: 249,
        minZ: 96.94,
        maxZ: 97.34,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_l_inner_desk',
        _0x8d390e,
        0.9,
        2,
        _0x164339
      )
      const _0x507b29 = {
        x: 225.82,
        y: 230.9,
        z: 97.12,
      }
      const _0x268d77 = {
        heading: 340,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_rob_loc',
        _0x507b29,
        2.4,
        0.6,
        _0x268d77
      )
      const _0x53340c = {
        x: 227.13,
        y: 234.67,
        z: 97.12,
      }
      const _0x593a73 = {
        heading: 340,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '2',
        'vault_rob_loc',
        _0x53340c,
        2.4,
        0.6,
        _0x593a73
      )
      const _0x591c63 = {
        x: 241.03,
        y: 215.7,
        z: 97.12,
      }
      const _0x367429 = {
        heading: 340,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '3',
        'vault_rob_loc',
        _0x591c63,
        2.4,
        0.6,
        _0x367429
      )
      const _0x38a578 = {
        x: 239.89,
        y: 212.72,
        z: 97.12,
      }
      const _0x1b9819 = {
        heading: 340,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '4',
        'vault_rob_loc',
        _0x38a578,
        2.4,
        0.6,
        _0x1b9819
      )
      const _0x575ccd = {
        x: 241.31,
        y: 209.78,
        z: 97.12,
      }
      const _0x14979d = {
        heading: 70,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '5',
        'vault_rob_loc',
        _0x575ccd,
        2.4,
        0.6,
        _0x14979d
      )
      const _0x55b089 = {
        x: 244.44,
        y: 211.07,
        z: 97.12,
      }
      const _0x2980b9 = {
        heading: 160,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '6',
        'vault_rob_loc',
        _0x55b089,
        2.4,
        0.6,
        _0x2980b9
      )
      const _0xa7169b = {
        x: 245.5,
        y: 213.87,
        z: 97.12,
      }
      const _0x176be0 = {
        heading: 160,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '7',
        'vault_rob_loc',
        _0xa7169b,
        2.4,
        0.6,
        _0x176be0
      )
      const _0xa51ed3 = {
        x: 248.51,
        y: 236.53,
        z: 97.12,
      }
      const _0xdfbf3a = {
        heading: 160,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '8',
        'vault_rob_loc',
        _0xa51ed3,
        2.4,
        0.6,
        _0xdfbf3a
      )
      const _0x51a2df = {
        x: 249.62,
        y: 239.16,
        z: 97.12,
      }
      const _0x4d6c18 = {
        heading: 160,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '9',
        'vault_rob_loc',
        _0x51a2df,
        2.4,
        0.6,
        _0x4d6c18
      )
      const _0x1384ed = {
        x: 253.95,
        y: 237.76,
        z: 97.12,
      }
      const _0xcb598b = {
        heading: 160,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '10',
        'vault_rob_loc',
        _0x1384ed,
        2.4,
        0.6,
        _0xcb598b
      )
      const _0x47f377 = {
        x: 253.16,
        y: 235.29,
        z: 97.12,
      }
      const _0x5e4652 = {
        heading: 160,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '11',
        'vault_rob_loc',
        _0x47f377,
        2.4,
        0.6,
        _0x5e4652
      )
      const _0x3f2330 = {
        x: 252.56,
        y: 240.81,
        z: 97.12,
      }
      const _0xe2622b = {
        heading: 250,
        minZ: 96.72,
        maxZ: 99.32,
      }
      _0x2d4217.addBoxTarget(
        '12',
        'vault_rob_loc',
        _0x3f2330,
        2.4,
        0.6,
        _0xe2622b
      )
      const _0x31e891 = {
        x: 269.75,
        y: 223.7,
        z: 96.94,
      }
      const _0x230f70 = {
        heading: 250,
        minZ: 96.94,
        maxZ: 97.34,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_loot_keycard',
        _0x31e891,
        1,
        1.7,
        _0x230f70
      )
      const _0x33fdb6 = {
        CPXEvent: 'ev-heists:vault:rob',
        id: 'vault_rob_drill',
        icon: 'th',
        label: 'Rob',
      }
      const _0x5a1cb2 = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByTarget('vault_rob_loc', [_0x33fdb6], {
        distance: _0x5a1cb2,
        isEnabled: (_0x35aa6d, _0x4410c6) => {
          var _0x229517
          const _0x1fcd51 =
            (_0x229517 = _0x4410c6.zones.vault_rob_loc) === null ||
            _0x229517 === void 0
              ? void 0
              : _0x229517.id
          if (!_0x1fcd51) {
            return false
          }
          const _0x34e568 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistdrill_red',
            1,
            false,
            true
          )
          return (
            _0x3f9c50.isActive &&
            !_0x3f9c50.data.robbedLocations[_0x1fcd51] &&
            _0x34e568
          )
        },
      })
      const _0x2c6705 = { doorId: 1112 }
      const _0x1f1a51 = {
        CPXEvent: 'ev-heists:vault:lootKeycard',
        id: 'vault_l_inner_keycard1',
        icon: 'circle',
        label: 'Pickup Left Keycard',
        parameters: _0x2c6705,
      }
      const _0x37e398 = { doorId: 1113 }
      const _0x5e844d = {
        CPXEvent: 'ev-heists:vault:lootKeycard',
        id: 'vault_l_inner_keycard2',
        icon: 'circle',
        label: 'Pickup Right Keycard',
        parameters: _0x37e398,
      }
      const _0x393956 = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByTarget(
        'vault_loot_keycard',
        [_0x1f1a51, _0x5e844d],
        {
          distance: _0x393956,
          isEnabled: (_0x50382b, _0x40412c) => {
            return _0x3f9c50.isActive && !_0x3f9c50.data.keycardPickedUp
          },
        }
      )
      const _0x474f8b = {
        CPXEvent: 'ev-heists:vault:lootKeypad',
        id: 'vault_l_inner_keypad',
        icon: 'credit-card',
        label: 'Use Keycard',
      }
      const _0xc0efa7 = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByTarget('vault_l_inner_keypad', [_0x474f8b], {
        distance: _0xc0efa7,
        isEnabled: (_0x3502b4, _0x3a27f8) => {
          const _0x1d73b2 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistkeycard_vault',
            1,
            false,
            true
          )
          return _0x3f9c50.isActive && !_0x3f9c50.data.keycardUsed && _0x1d73b2
        },
      })
      const _0x175ef4 = {
        CPXEvent: 'ev-heists:vault:lootDesk',
        id: 'vault_l_inner_desk',
        icon: 'circle',
        label: 'Search',
      }
      const _0x5f2b1f = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByTarget('vault_l_inner_desk', [_0x175ef4], {
        distance: _0x5f2b1f,
        isEnabled: (_0x141603, _0x31d606) => {
          return _0x3f9c50.isActive && !_0x3f9c50.data.vaultDeskSearched
        },
      })
      const _0x12efc5 = _0x4cc1d0('ev-heists:vault', 'robObjects'),
        _0x57ca7a = {
          id: 'vault_steal_trolley',
          icon: 'hand-holding',
          label: 'Take',
          CPXEvent: 'ev-heists:vault:steal',
        }
      const _0x52e847 = { radius: 2.5 }
      const _0x1c172a = {
        distance: _0x52e847,
        isEnabled: (_0x42e77f, _0x43c2b1) => {
          var _0x214f60, _0x11759f, _0x1fde87
          const _0x30ed5a =
            (_0x1fde87 =
              (_0x11759f =
                (_0x214f60 = _0x43c2b1.meta) === null || _0x214f60 === void 0
                  ? void 0
                  : _0x214f60.data) === null || _0x11759f === void 0
                ? void 0
                : _0x11759f.metadata) === null || _0x1fde87 === void 0
              ? void 0
              : _0x1fde87.heistLoot
          return _0x30ed5a
        },
      }
      _0x1f45d4.addPeekEntryByModel(
        _0x12efc5.map((_0x2fd321) => GetHashKey(_0x2fd321.model)),
        [_0x57ca7a],
        _0x1c172a
      )
    }
    _0x336a39.on(
      'ev-heists:vault:rob',
      async (_0x5001d2, _0x19bc3d, _0x201b27) => {
        var _0x4081f9
        const _0x2d2ba8 =
          (_0x4081f9 = _0x201b27.zones.vault_rob_loc) === null ||
          _0x4081f9 === void 0
            ? void 0
            : _0x4081f9.id
        if (!_0x2d2ba8) {
          return
        }
        _0x336a39.emitNet('ev-heists:vault:startRob', _0x2d2ba8)
        emit('inventory:DegenItemType', 26, 'heistdrill_red')
        const _0x130aa2 = _0x46c4eb('minigames'),
          _0x34efe5 = await _0xe8fb18(Object.assign({}, _0x130aa2.vault.flip))
        await _0x35ac5b(1000)
        _0x1f1484.g.exports['ev-ui'].closeApplication('minigame-flip')
        let _0x1d0117 = false
        if (_0x34efe5) {
          const _0x1cc1e1 = _0x572249()
          _0x15d372(_0x1cc1e1)
          _0x1d0117 = await _0x1cc1e1
        }
        const _0x25f9cf = await _0x8f3134.execute(
          'ev-heists:vault:rob',
          _0x2d2ba8,
          _0x1d0117 && _0x34efe5
        )
      }
    )
    _0x336a39.on('ev-heists:vault:steal', (_0x29cc1e, _0x5d46b0, _0x557a8d) => {
      const _0x365850 = _0x557a8d.meta
      if (!_0x365850) {
        return
      }
      _0x8f3134.execute('ev-heists:vault:stealObject', _0x365850)
    })
    _0x336a39.on(
      'ev-heists:vault:lootKeycard',
      (_0x1b8258, _0x47ce5b, _0x2b308f) => {
        const _0x4247d1 = _0x1b8258.doorId
        _0x8f3134.execute('ev-heists:vault:lootKeycard', _0x4247d1)
      }
    )
    _0x336a39.on(
      'ev-heists:vault:lootKeypad',
      (_0x4de9d6, _0x54e491, _0x2bac33) => {
        const _0x2efada = _0x1f1484.g.exports['ev-inventory'].getItemsOfType(
          'heistkeycard_vault',
          1,
          true
        )
        if (!_0x2efada || !_0x2efada[0]) {
          return
        }
        const _0x56d0d7 = JSON.parse(_0x2efada[0].information),
          _0x439b07 = _0x56d0d7.EncryptionKey
        if (!_0x439b07) {
          return
        }
        _0x8f3134.execute('ev-heists:vault:lootKeypad', _0x439b07)
      }
    )
    _0x336a39.on('ev-heists:vault:lootDesk', () => {
      _0x8f3134.execute('ev-heists:vault:lootDesk')
    })
    const _0x35d183 = new Map(),
      _0x1eac5a = async () => {
        _0x2d4217.onEnter('heists_door_handler', async (_0x20eab4) => {
          const _0x1d97b3 = _0x35d183.get(_0x20eab4.id)
          if (!_0x1d97b3) {
            return
          }
          _0x4d33b1(_0x1d97b3)
        })
        const _0x53f0fc = await _0x8f3134.execute('ev-heists:doors:getState')
        for (const _0x4d7e31 of _0x53f0fc) {
          _0xf63a2(_0x4d7e31)
        }
      },
      _0x4d33b1 = async (_0xcd802c) => {
        const _0x833936 = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), false)
          ),
          _0x4c47aa = _0xf8285b.fromArray(_0xcd802c.coords)
        if (_0x833936.getDistance(_0x4c47aa) > 400) {
          return
        }
        let _0x1308a4
        const _0x4bbc5a = await _0x45415b.waitForCondition(() => {
          return (
            (_0x1308a4 = GetClosestObjectOfType(
              _0xcd802c.coords[0],
              _0xcd802c.coords[1],
              _0xcd802c.coords[2],
              5,
              _0xcd802c.hash,
              false,
              false,
              false
            )),
            _0x1308a4 && DoesEntityExist(_0x1308a4)
          )
        }, 30000)
        if (_0x4bbc5a) {
          return
        }
        _0x27b2d8(
          _0x1308a4,
          _0xcd802c.isOpen ? _0xcd802c.headingOpen : _0xcd802c.headingClosed
        )
      },
      _0x2b13cf = (_0x137fe4) => {
        _0x2d4217.addBoxZone(
          _0x137fe4.id,
          'heists_door_handler',
          {
            x: _0x137fe4.coords[0],
            y: _0x137fe4.coords[1],
            z: _0x137fe4.coords[2],
          },
          50,
          50,
          {
            minZ: _0x137fe4.coords[2] - 30,
            maxZ: _0x137fe4.coords[2] + 30,
          }
        )
      },
      _0xf63a2 = (_0x5e4455) => {
        !_0x35d183.has(_0x5e4455.id) && _0x2b13cf(_0x5e4455)
        _0x35d183.set(_0x5e4455.id, _0x5e4455)
        _0x4d33b1(_0x5e4455)
      }
    _0x336a39.onNet('ev-heists:doors:set', _0xf63a2)
    let _0xe22475 = true
    const _0x44858b = () => {
      const _0xfbf8d9 = {
        x: 249.76,
        y: 224.18,
        z: 97.13,
      }
      const _0xb094f7 = {
        heading: 339,
        minZ: 96.13,
        maxZ: 100.13,
      }
      _0x2d4217.addBoxZone(
        '1',
        'vault_lower_lasers',
        _0xfbf8d9,
        33.4,
        50,
        _0xb094f7
      )
      const _0x4b1c98 = {
        x: 267.69,
        y: 213.13,
        z: 97.12,
      }
      const _0x916616 = {
        heading: 71,
        minZ: 97.12,
        maxZ: 98.12,
      }
      const _0x12c73b = { doorId: 1105 }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_syncpad',
        _0x4b1c98,
        0.4,
        0.7,
        _0x916616,
        _0x12c73b
      )
      const _0x134f63 = {
        x: 270.64,
        y: 221.22,
        z: 97.12,
      }
      const _0x743c74 = {
        heading: 69,
        minZ: 97.12,
        maxZ: 98.12,
      }
      const _0x849bc6 = { doorId: 1104 }
      _0x2d4217.addBoxTarget(
        '2',
        'vault_syncpad',
        _0x134f63,
        0.5,
        0.8,
        _0x743c74,
        _0x849bc6
      )
      const _0x3d9e73 = {
        x: 241.86,
        y: 218.66,
        z: 97.12,
      }
      const _0x4b3255 = {
        heading: 160,
        minZ: 97.12,
        maxZ: 98.12,
      }
      const _0x5329e4 = { doorId: 1109 }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_l_side_keypad',
        _0x3d9e73,
        0.5,
        0.9,
        _0x4b3255,
        _0x5329e4
      )
      const _0x32d92e = {
        x: 247.32,
        y: 233.75,
        z: 97.12,
      }
      const _0x54dc31 = {
        heading: 340,
        minZ: 97.12,
        maxZ: 98.12,
      }
      const _0x5345dd = { doorId: 1110 }
      _0x2d4217.addBoxTarget(
        '2',
        'vault_l_side_keypad',
        _0x32d92e,
        0.5,
        0.9,
        _0x54dc31,
        _0x5345dd
      )
      const _0x5cf64a = {
        x: 236.4,
        y: 231.76,
        z: 97.62,
      }
      const _0x47517f = {
        heading: 70,
        minZ: 97.12,
        maxZ: 98.12,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_l_keypad_vault',
        _0x5cf64a,
        0.5,
        0.7,
        _0x47517f
      )
      const _0x24af78 = {
        x: 259.96,
        y: 213.15,
        z: 97.12,
      }
      const _0x5dfe05 = {
        heading: 340,
        minZ: 97.52,
        maxZ: 99.22,
      }
      _0x2d4217.addBoxZone(
        '1',
        'vault_laser_box',
        _0x24af78,
        1.6,
        1.8,
        _0x5dfe05
      )
      const _0x3a5438 = {
        x: 260.5,
        y: 213.15,
        z: 98.72,
      }
      const _0x246e0c = {
        heading: 340,
        minZ: 97.52,
        maxZ: 99.22,
      }
      _0x2d4217.addBoxTarget(
        '2',
        'placeholder_target',
        _0x3a5438,
        0.1,
        0.1,
        _0x246e0c
      )
      const _0x545069 = {
        id: 'vault_l_power_box_peek',
        label: 'Activate',
        icon: _0x31ec01,
        CPXEvent: 'ev-heists:vault:lowerPowerBox',
      }
      const _0x53f7da = { radius: 2 }
      _0x1f45d4.addPeekEntryByTarget('vault_laser_box', [_0x545069], {
        distance: _0x53f7da,
        isEnabled: (_0x491a1d, _0x502488) => {
          const _0x2891d5 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistelectronickit_red',
            1,
            false,
            true
          )
          return _0x3f9c50.isActive && _0xe22475 && _0x2891d5
        },
      })
      const _0x4f8c51 = {
        id: 'vault_l_keypad_vault',
        label: 'Hack',
        icon: _0x4a73fa,
        CPXEvent: 'ev-heists:vault:lowerKeypadVault',
      }
      const _0x309768 = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('vault_l_keypad_vault', [_0x4f8c51], {
        distance: _0x309768,
        isEnabled: (_0xc27929, _0x242ad6) => {
          return (
            _0x3f9c50.isActive &&
            !_0xe22475 &&
            !_0x3f9c50.data.doorHacked &&
            (!_0x35d183.has('vault_lower_door') ||
              !_0x35d183.get('vault_lower_door').isOpen)
          )
        },
      })
      const _0x22ae4c = {
        id: 'vault_syncpad',
        label: 'Hack',
        icon: _0x2d9e47,
        CPXEvent: 'ev-heists:vault:syncPad',
      }
      const _0xe959ba = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('vault_syncpad', [_0x22ae4c], {
        distance: _0xe959ba,
        isEnabled: (_0x297f36, _0x5993be) => {
          var _0x35e638
          const _0x164967 =
              (_0x35e638 = _0x5993be.zones.vault_syncpad) === null ||
              _0x35e638 === void 0
                ? void 0
                : _0x35e638.id,
            _0x167ecc = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
              'heistdecrypter_red',
              1,
              false,
              true
            )
          return (
            _0x3f9c50.isActive &&
            _0x164967 &&
            _0x167ecc &&
            _0x3f9c50.data.stairCaseOpen &&
            !_0x3f9c50.data.syncPads[_0x164967] &&
            !_0x3f9c50.data.lowerOpened
          )
        },
      })
      const _0x247d11 = {
        id: 'vault_l_side_keypad',
        label: 'Hack',
        icon: _0x2d9e47,
        CPXEvent: 'ev-heists:vault:lowerSideKeypad',
      }
      const _0xa05421 = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('vault_l_side_keypad', [_0x247d11], {
        distance: _0xa05421,
        isEnabled: (_0x38b6a9, _0x583067) => {
          var _0x1a71e4
          const _0x40b6e8 =
              (_0x1a71e4 = _0x583067.zones.vault_l_side_keypad) === null ||
              _0x1a71e4 === void 0
                ? void 0
                : _0x1a71e4.id,
            _0x5e30e4 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
              'heistdecrypter_red',
              1,
              false,
              true
            )
          return (
            _0x3f9c50.isActive &&
            _0x40b6e8 &&
            !_0xe22475 &&
            _0x5e30e4 &&
            !_0x3f9c50.data.lowerSideKeypads[_0x40b6e8]
          )
        },
      })
      const _0x196423 = {
        id: 'heist_vault_l_drill',
        label: 'Drill',
        icon: _0x28f166,
        CPXEvent: 'ev-heists:vault:drillDoor',
      }
      const _0x482ed5 = { radius: 4.5 }
      _0x1f45d4.addPeekEntryByModel([961976194], [_0x196423], {
        distance: _0x482ed5,
        isEnabled: (_0x57b559, _0x2f32ae) => {
          const _0x4fa5b0 = _0x1f1484.g.exports['ev-doors'].GetCurrentDoor()
          return (
            _0x3f9c50.isActive &&
            _0x3f9c50.data.doorHacked &&
            _0x4fa5b0 === 1111
          )
        },
      })
      const _0x2415dd = {
        id: 'heist_pickup_box',
        label: 'Pickup',
        icon: 'box',
        CPXEvent: 'ev-heists:vault:pickupBox',
      }
      const _0x2f4ae4 = { radius: 2.5 }
      _0x1f45d4.addPeekEntryByModel([377646791], [_0x2415dd], {
        distance: _0x2f4ae4,
        isEnabled: (_0x256a25, _0x5ad3fa) => {
          return !!_0x5ad3fa.meta
        },
      })
      _0x2d4217.onEnter('vault_lower_lasers', () => {
        if (!_0xe22475) {
          return
        }
        RequestScriptAudioBank('DLC_HEIST3\\HEIST_FINALE_LASER_DRILL', false)
        RequestScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL', false)
        RequestScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL_2', false)
        emit('ev-heists:vault:laserState', true)
      })
      _0x2d4217.onExit('vault_lower_lasers', () => {
        ReleaseNamedScriptAudioBank('DLC_HEIST3\\HEIST_FINALE_LASER_DRILL')
        ReleaseNamedScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL')
        ReleaseNamedScriptAudioBank('DLC_MPHEIST\\HEIST_FLEECA_DRILL_2')
        emit('ev-heists:vault:laserState', false)
      })
    }
    _0x336a39.on(
      'ev-heists:vault:pickupBox',
      async (_0x38a048, _0x1554c9, _0x59e4a0) => {
        const _0x2d5408 = await _0x8f3134.execute(
          'ev-objects:DeleteObject',
          _0x59e4a0.meta.id
        )
        _0x2d5408 && emit('player:receiveItem', 'heistbox', 1)
      }
    )
    const _0x9b54c1 = async (_0x5bf102, _0x204573, _0x4ba41b, _0x25e601) => {
      const _0x5be7af = {
        collision: true,
        zOffset: 0.25,
        groupSnap: true,
        forceGroupSnap: true,
      }
      const _0x30a759 = await _0x1f1484.g.exports[
        'ev-objects'
      ].PlaceAndSaveObject(
        'hei_prop_heist_wooden_box',
        {},
        _0x5be7af,
        () => true,
        'objects',
        3600
      )
      if (!_0x30a759) {
        return
      }
      emit('inventory:removeItem', _0x5bf102, 1)
    }
    on('ev-heists:vault:laserHit', () => {
      _0x336a39.emitNet('ev-heists:vault:laserHit')
    })
    onNet('ev-heists:vault:laserSound', (_0x1bdafe) => {
      PlaySoundFromCoord(
        -1,
        'laser_pin_break',
        _0x1bdafe[0],
        _0x1bdafe[1],
        _0x1bdafe[2],
        'dlc_ch_heist_finale_laser_drill_sounds',
        false,
        25,
        false
      )
    })
    onNet('ev-heists:vault:laserTrap', () => {
      PlaySoundFromCoord(
        -1,
        'laser_overheat',
        234.99,
        228.07,
        97.72,
        'dlc_ch_heist_finale_laser_drill_sounds',
        false,
        100,
        false
      )
      PlaySoundFromCoord(
        -1,
        'laser_overheat',
        234.99,
        228.07,
        97.72,
        'dlc_ch_heist_finale_laser_drill_sounds',
        false,
        100,
        false
      )
      PlaySoundFromCoord(
        -1,
        'laser_overheat',
        234.99,
        228.07,
        97.72,
        'dlc_ch_heist_finale_laser_drill_sounds',
        false,
        100,
        false
      )
      PlaySoundFromCoord(
        -1,
        'laser_overheat',
        253.47,
        222.99,
        97.12,
        'dlc_ch_heist_finale_laser_drill_sounds',
        false,
        100,
        false
      )
      PlaySoundFromCoord(
        -1,
        'laser_overheat',
        253.47,
        222.99,
        97.12,
        'dlc_ch_heist_finale_laser_drill_sounds',
        false,
        100,
        false
      )
      PlaySoundFromCoord(
        -1,
        'laser_overheat',
        253.47,
        222.99,
        97.12,
        'dlc_ch_heist_finale_laser_drill_sounds',
        false,
        100,
        false
      )
    })
    _0x336a39.onNet('ev-heists:vault:laserState', (_0x177465) => {
      _0xe22475 = _0x177465
      if (_0x2d4217.isActive('vault_lower_lasers')) {
        emit('ev-heists:vault:laserState', _0xe22475)
      }
    })
    _0x336a39.on('ev-heists:vault:lowerPowerBox', async () => {
      if (_0x30b4a6) {
        _0x3c9a67()
        _0x336a39.emitNet('ev-heists:vault:shockPtfx')
        return
      }
      emit('inventory:DegenItemType', 33, 'heistelectronickit_red')
      const _0x3a0ab5 = _0x46c4eb('minigames'),
        _0x44ce05 = await _0x4ce42d(Object.assign({}, _0x3a0ab5.vault.ddr))
      if (!_0x44ce05) {
        return
      }
      await _0x8f3134.execute('ev-heists:vault:lowerPowerBoxResult')
    })
    _0x336a39.on('ev-heists:vault:lowerKeypadVault', async () => {
      if (_0x3f9c50.data.laserTrap) {
        _0x3c9a67()
        _0x336a39.emitNet('ev-heists:vault:shockPtfx')
        emit('DoLongHudText', 'Anti-theft security system tripped', 2)
        return
      }
      emit('inventory:DegenItemType', 33, 'heistlaptop4')
      const _0x44c867 = _0x46c4eb('minigames'),
        _0x46e6be = _0x1dd87a(
          Object.assign({}, _0x44c867.vault['laptop-lower'])
        ),
        _0x259b30 = GetEntityCoords(PlayerPedId(), true)
      _0x28e004(_0x259b30, 70, _0x46e6be)
      const _0x47f45d = await _0x46e6be
      if (!_0x47f45d) {
        return
      }
      emit('inventory:DegenItemType', 100, 'heistlaptop4')
      await _0x8f3134.execute('ev-heists:vault:lowerKeypadVaultResult')
    })
    _0x336a39.on('ev-heists:vault:drillDoor', async () => {
      const _0x3fa053 = _0x1f1484.g.exports['ev-doors'].GetCurrentDoor()
      if (_0x3fa053 !== 1111) {
        return
      }
      const _0x40ac42 = _0x572249()
      _0x15d372(_0x40ac42)
      const _0x4a22d9 = await _0x40ac42
      if (!_0x4a22d9) {
        return
      }
      _0x336a39.emitNet('ev-heists:vault:vaultDoorOpen')
    })
    _0x336a39.on(
      'ev-heists:vault:syncPad',
      async (_0x5b8a29, _0x1b4b7d, _0x4e60e5) => {
        var _0x389331, _0xd6077f
        const _0x2464ea =
          (_0x389331 = _0x4e60e5.zones.vault_syncpad) === null ||
          _0x389331 === void 0
            ? void 0
            : _0x389331.id
        if (!_0x2464ea) {
          return
        }
        const _0x500678 =
          (_0xd6077f = _0x4e60e5.zones.vault_syncpad) === null ||
          _0xd6077f === void 0
            ? void 0
            : _0xd6077f.doorId
        emit('inventory:DegenItemType', 26, 'heistdecrypter_red')
        _0x336a39.emitNet('ev-heists:vault:syncPadStart', _0x2464ea)
        const _0x1ebf84 = { numPoints: 10 }
        const _0x3d77bf = await _0x2d70cc(_0x1ebf84)
        _0x8f3134.execute(
          'ev-heists:vault:syncPadResult',
          _0x2464ea,
          _0x3d77bf,
          _0x500678
        )
      }
    )
    _0x336a39.on(
      'ev-heists:vault:lowerSideKeypad',
      async (_0x2ce406, _0x49bec3, _0x43f885) => {
        var _0x35edb1, _0xebbaa3
        const _0x38b51d =
          (_0x35edb1 = _0x43f885.zones.vault_l_side_keypad) === null ||
          _0x35edb1 === void 0
            ? void 0
            : _0x35edb1.id
        if (!_0x38b51d) {
          return
        }
        const _0x172ccc =
          (_0xebbaa3 = _0x43f885.zones.vault_l_side_keypad) === null ||
          _0xebbaa3 === void 0
            ? void 0
            : _0xebbaa3.doorId
        emit('inventory:DegenItemType', 26, 'heistdecrypter_red')
        const _0x53bc2e = _0x46c4eb('minigames'),
          _0x3b6ea7 = await _0x2d70cc(
            Object.assign({}, _0x53bc2e.vault.untangle)
          )
        if (!_0x3b6ea7) {
          return
        }
        _0x8f3134.execute(
          'ev-heists:vault:lowerSideKeypadResult',
          _0x38b51d,
          _0x172ccc
        )
      }
    )
    onNet('ev-heists:vault:shocked', async (_0x285f9b) => {
      await _0x67beee.loadNamedPtfxAsset(_0x208aab)
      UseParticleFxAssetNextCall(_0x208aab)
      SetPtfxAssetNextCall(_0x208aab)
      StartParticleFxLoopedAtCoord(
        _0x281309,
        _0x285f9b[0],
        _0x285f9b[1],
        _0x285f9b[2],
        0,
        180,
        0,
        2.5,
        false,
        false,
        false,
        false
      )
    })
    const _0x1e97a3 = () => {
      const _0x125be7 = {
        x: 272.27,
        y: 214.91,
        z: 106.28,
      }
      const _0x14da47 = {
        heading: 248,
        minZ: 106.28,
        maxZ: 107.28,
      }
      const _0x1b8832 = { doorId: 1129 }
      _0x2d4217.addBoxTarget(
        '1',
        'vault_stairs_keypad',
        _0x125be7,
        0.8,
        0.7,
        _0x14da47,
        _0x1b8832
      )
      const _0x3e9389 = {
        x: 261.25,
        y: 235.02,
        z: 106.1,
      }
      const _0x32eb0e = {
        heading: 160,
        minZ: 106.1,
        maxZ: 106.6,
      }
      const _0x232368 = {
        folders: ['Homework', 'Documents'],
        textFiles: ['prbg', 'harmony_account', 'notes'],
        background: 'https://i.imgur.com/OfaocOd.jpg',
      }
      _0x2d4217.addBoxTarget(
        '1',
        'heist_vault_pc',
        _0x3e9389,
        1,
        1.7,
        _0x32eb0e,
        _0x232368
      )
      const _0x5d78c0 = {
        x: 270.54,
        y: 231.43,
        z: 106.28,
      }
      const _0x419975 = {
        heading: 70,
        minZ: 106.08,
        maxZ: 106.48,
      }
      const _0x3ab3b7 = {
        folders: ['Fedora'],
        textFiles: ['resignationletter'],
        background: 'https://i.imgur.com/2MTVm33.png',
      }
      _0x2d4217.addBoxTarget(
        '2',
        'heist_vault_pc',
        _0x5d78c0,
        1.8,
        1,
        _0x419975,
        _0x3ab3b7
      )
      const _0x338237 = {
        x: 261.08,
        y: 234.84,
        z: 110.17,
      }
      const _0x37defb = {
        heading: 70,
        minZ: 109.97,
        maxZ: 110.37,
      }
      const _0x2c68c6 = {
        folders: ['Work', 'SON_DO_NOT_TOUCH'],
        textFiles: ['freegames', 'rambypass'],
        background: 'https://i.imgur.com/p924kQR.png',
      }
      _0x2d4217.addBoxTarget(
        '3',
        'heist_vault_pc',
        _0x338237,
        1.8,
        1,
        _0x37defb,
        _0x2c68c6
      )
      const _0x46f088 = {
        x: 270.52,
        y: 231.44,
        z: 110.17,
      }
      const _0x3a9a60 = {
        heading: 70,
        minZ: 109.97,
        maxZ: 110.37,
      }
      const _0xaa77df = {
        folders: ['Chatterino2.3.5'],
        textFiles: ['mitchaccount', 'pastas'],
        background: 'https://i.imgur.com/ArrXblZ.png',
      }
      _0x2d4217.addBoxTarget(
        '4',
        'heist_vault_pc',
        _0x46f088,
        1.8,
        1,
        _0x3a9a60,
        _0xaa77df
      )
      const _0x8ac37 = {
        x: 251.7,
        y: 208.86,
        z: 106.29,
      }
      const _0x4a9152 = {
        heading: 70,
        minZ: 106.09,
        maxZ: 106.49,
      }
      const _0x2a9dc3 = {
        folders: ['CodeWalker'],
        textFiles: ['gta_debug_strings'],
        background: 'https://i.imgur.com/pSGS1fw.jpg',
      }
      _0x2d4217.addBoxTarget(
        '5',
        'heist_vault_pc',
        _0x8ac37,
        1.8,
        1,
        _0x4a9152,
        _0x2a9dc3
      )
      const _0x2edbfc = {
        x: 261.09,
        y: 205.47,
        z: 106.28,
      }
      const _0x376f2d = {
        heading: 70,
        minZ: 106.08,
        maxZ: 106.48,
      }
      const _0x43b34a = {
        folders: ['Orion2', 'ms2code'],
        textFiles: ['github_acc'],
        whiteIconNames: 'off',
        background: 'https://i.imgur.com/FxnFhTQ.png',
      }
      _0x2d4217.addBoxTarget(
        '6',
        'heist_vault_pc',
        _0x2edbfc,
        1.8,
        1,
        _0x376f2d,
        _0x43b34a
      )
      const _0x4a56bf = {
        x: 251.7,
        y: 208.84,
        z: 110.17,
      }
      const _0x381953 = {
        heading: 70,
        minZ: 109.97,
        maxZ: 110.37,
      }
      const _0x88ed39 = {
        folders: ['important'],
        textFiles: ['do_not_lose'],
        background: 'https://i.imgur.com/EEwTSk1.jpg',
      }
      _0x2d4217.addBoxTarget(
        '7',
        'heist_vault_pc',
        _0x4a56bf,
        1.8,
        1,
        _0x381953,
        _0x88ed39
      )
      const _0x4666eb = {
        x: 261.11,
        y: 205.43,
        z: 110.17,
      }
      const _0x5c3f9b = {
        heading: 70,
        minZ: 109.97,
        maxZ: 110.37,
      }
      const _0x10a35d = {
        folders: ['ElectronApp'],
        textFiles: ['work_app_notes', 'daughter_wedding'],
        background: 'https://i.imgur.com/8Lthbn7.png',
      }
      _0x2d4217.addBoxTarget(
        '8',
        'heist_vault_pc',
        _0x4666eb,
        1.8,
        1,
        _0x5c3f9b,
        _0x10a35d
      )
      const _0xcf96f9 = {
        x: 279.14,
        y: 213.52,
        z: 110.17,
      }
      const _0x165892 = {
        heading: 160,
        minZ: 109.97,
        maxZ: 110.37,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'heist_vault_pc_ceo',
        _0xcf96f9,
        1.8,
        1,
        _0x165892
      )
      const _0x38bcb4 = {
        x: 278.73,
        y: 217.47,
        z: 109.17,
      }
      const _0x434ecb = {
        heading: 70,
        minZ: 109.17,
        maxZ: 111.17,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'heist_vault_safe_ceo',
        _0x38bcb4,
        1.1,
        0.3,
        _0x434ecb
      )
      const _0x5d0f73 = {
        x: 272.04,
        y: 214.35,
        z: 109.97,
      }
      const _0x53bbec = {
        heading: 250,
        minZ: 109.97,
        maxZ: 110.97,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'heist_vault_door_ceo',
        _0x5d0f73,
        0.3,
        0.7,
        _0x53bbec
      )
      const _0x3069f6 = {
        x: 249.72,
        y: 218.19,
        z: 106.28,
      }
      const _0x45b2af = {
        heading: 340,
        minZ: 105.28,
        maxZ: 107.68,
      }
      const _0x3ed1b5 = { doorId: 1127 }
      _0x2d4217.addBoxZone(
        '1',
        'heist_vault_cagedoor',
        _0x3069f6,
        1.2,
        1.4,
        _0x45b2af,
        _0x3ed1b5
      )
      const _0x3b2a77 = {
        x: 253.75,
        y: 228.89,
        z: 106.28,
      }
      const _0x143adf = {
        heading: 340,
        minZ: 105.28,
        maxZ: 107.68,
      }
      const _0x273413 = { doorId: 1128 }
      _0x2d4217.addBoxZone(
        '2',
        'heist_vault_cagedoor',
        _0x3b2a77,
        1.2,
        1.4,
        _0x143adf,
        _0x273413
      )
      const _0x2cb834 = {
        id: 'heist_vault_cagedoor',
        label: 'Unlock',
        icon: _0x473c8d,
        CPXEvent: 'ev-heists:vault:upperCageDoor',
      }
      const _0x5d06cb = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('heist_vault_cagedoor', [_0x2cb834], {
        distance: _0x5d06cb,
        isEnabled: (_0x3696a7, _0x512be4) => {
          var _0x39fd5a
          const _0x5ef2b3 =
              (_0x39fd5a = _0x512be4.zones.heist_vault_cagedoor) === null ||
              _0x39fd5a === void 0
                ? void 0
                : _0x39fd5a.id,
            _0x2f5aa6 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
              'thermitecharge',
              1,
              false,
              true
            )
          return (
            _0x3f9c50.isActive &&
            _0x5ef2b3 &&
            !_0x3f9c50.data.cageDoorOpen[_0x5ef2b3] &&
            _0x2f5aa6
          )
        },
      })
      const _0x5c7793 = {
        id: 'vault_upper_keypad',
        label: 'Hack',
        icon: _0x4a73fa,
        CPXEvent: 'ev-heists:vault:upperKeypad',
      }
      const _0x560bc8 = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('vault_stairs_keypad', [_0x5c7793], {
        distance: _0x560bc8,
        isEnabled: (_0x1f7e53, _0x148b39) => {
          const _0x104adb = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistlaptop4',
            1,
            false,
            true
          )
          return (
            _0x3f9c50.isActive && !_0x3f9c50.data.stairCaseOpen && _0x104adb
          )
        },
      })
      const _0x49632f = {
        id: 'vault_door_ceo',
        label: 'Hack',
        icon: _0x2d9e47,
        CPXEvent: 'ev-heists:vault:upperCEOKeypad',
      }
      const _0x136f28 = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('heist_vault_door_ceo', [_0x49632f], {
        distance: _0x136f28,
        isEnabled: (_0x18491b, _0x511a54) => {
          const _0x2cb528 = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
            'heistdecrypter_red',
            1,
            false,
            true
          )
          return (
            _0x3f9c50.isActive && !_0x3f9c50.data.ceoOfficeOpen && _0x2cb528
          )
        },
      })
      const _0x3036f6 = {
        id: 'heist_vault_safe_ceo',
        label: 'Crack',
        icon: _0x3400da,
        CPXEvent: 'ev-heists:vault:upperSafeCrack',
      }
      const _0x3611de = { radius: 4 }
      const _0x39beec = {
        distance: _0x3611de,
        isEnabled: (_0x5eb2db, _0x5bd22f) => {
          return _0x3f9c50.isActive && !_0x3f9c50.data.safeCracked
        },
      }
      _0x1f45d4.addPeekEntryByTarget(
        'heist_vault_safe_ceo',
        [_0x3036f6],
        _0x39beec
      )
      const _0x4d4f37 = {
        id: 'heist_vault_pc_ceo',
        label: 'Enter Password',
        icon: 'passport',
        CPXEvent: 'ev-heists:vault:upperPCPassword',
      }
      const _0x16e881 = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('heist_vault_pc_ceo', [_0x4d4f37], {
        distance: _0x16e881,
        isEnabled: (_0x5ce8d5, _0x396207) => {
          return _0x3f9c50.isActive
        },
      })
      const _0x5da2ec = {
        id: 'heist_vault_pc',
        label: 'Open',
        icon: 'laptop',
        CPXEvent: 'ev-heists:vault:upperPC',
      }
      const _0xb740cc = { radius: 4 }
      _0x1f45d4.addPeekEntryByTarget('heist_vault_pc', [_0x5da2ec], {
        distance: _0xb740cc,
        isEnabled: (_0x3acebd, _0x43e78b) => {
          return _0x3f9c50.isActive
        },
      })
    }
    _0x336a39.on('ev-heists:vault:upperKeypad', async () => {
      const _0xe19c2 = {
        label: 'Security Code',
        icon: 'code',
        name: 'code',
      }
      const _0x53f01a = await _0x1f1484.g.exports['ev-ui'].OpenInputMenu(
        [_0xe19c2],
        (_0x5a95ac) => _0x5a95ac && _0x5a95ac.code
      )
      if (!_0x53f01a) {
        return
      }
      await _0x35ac5b(1)
      if (_0x53f01a.code !== _0x3f9c50.data.upperKeypadCode) {
        emit('DoLongHudText', 'Incorrect Code', 2)
        return
      }
      emit('inventory:DegenItemType', 33, 'heistlaptop4')
      const _0x44f77e = _0x46c4eb('minigames'),
        _0x1f9208 = _0x1dd87a(
          Object.assign({}, _0x44f77e.vault['laptop-upper'])
        ),
        _0x208288 = GetEntityCoords(PlayerPedId(), true)
      _0x28e004(_0x208288, 250, _0x1f9208)
      const _0x4330f5 = await _0x1f9208
      if (!_0x4330f5) {
        return
      }
      emit('inventory:DegenItemType', 100, 'heistlaptop4')
      await _0x8f3134.execute('ev-heists:vault:upperKeypadResult')
    })
    _0x336a39.on(
      'ev-heists:vault:upperCageDoor',
      async (_0xe45fab, _0x387e56, _0x166588) => {
        var _0x389740, _0x640f50
        const _0x30fea1 =
          (_0x389740 = _0x166588.zones.heist_vault_cagedoor) === null ||
          _0x389740 === void 0
            ? void 0
            : _0x389740.id
        if (!_0x30fea1) {
          return
        }
        const _0x1f79d7 =
          (_0x640f50 = _0x166588.zones.heist_vault_cagedoor) === null ||
          _0x640f50 === void 0
            ? void 0
            : _0x640f50.doorId
        emit('inventory:removeItem', 'thermitecharge', 1)
        const _0xf86f50 = _0x46c4eb('minigames'),
          _0x70ee0d = _0x17a542(
            Object.assign({}, _0xf86f50.vault['door-thermite'])
          ),
          _0xe12d12 = _0xf8285b.fromArray(GetEntityCoords(PlayerPedId(), true)),
          _0xe11525 = {
            x: _0xe12d12.x,
            y: _0xe12d12.y,
            z: _0xe12d12.z,
            h: GetEntityHeading(PlayerPedId()),
          }
        _0x530a45(_0xe11525, 0, _0x70ee0d)
        const _0x18f423 = await _0x70ee0d
        if (!_0x18f423) {
          return
        }
        _0x336a39.emitNet('ev-heists:vault:openCageDoor', _0x30fea1, _0x1f79d7)
      }
    )
    _0x336a39.on('ev-heists:vault:upperSafeCrack', async () => {
      const _0x44a19b = await _0x4ecdc8(5)
      if (!_0x44a19b) {
        return
      }
      ClearPedTasksImmediately(PlayerPedId())
      await _0x8f3134.execute('ev-heists:vault:upperSafeCrackResult')
    })
    _0x336a39.on(
      'ev-heists:vault:upperPC',
      async (_0x289159, _0xef3f3f, _0xbb6747) => {
        var _0x1a5853
        const _0x761608 = _0xbb6747.zones.heist_vault_pc
        if (!_0x761608) {
          return
        }
        const _0x3b161a = _0x3f9c50.data.upperPCIdentifier[_0x761608.id - 1],
          _0x4866c2 = _0x3f9c50.data.upperPCPassword[_0x761608.id - 1],
          _0x500beb = {
            code: _0x4866c2 ? _0x3b161a + '-' + _0x4866c2 : 'No Data Available',
          }
        const _0x4b4e6f = {
          personal: false,
          whiteIconNames:
            (_0x1a5853 = _0x761608.whiteIconNames) !== null &&
            _0x1a5853 !== void 0
              ? _0x1a5853
              : 'on',
          isHeistPc: true,
          laptopBackground: _0x761608.background,
          additionalFolders: _0x761608.folders,
          additionalTextFiles: _0x761608.textFiles,
          gameData: _0x500beb,
        }
        const _0x40028f = {
          enabledApps: ['heistApp'],
          enabledFeatures: [],
          overwriteSettings: _0x4b4e6f,
        }
        exports['ev-ui'].openApplication('laptop', _0x40028f)
      }
    )
    _0x336a39.on('ev-heists:vault:upperPCPassword', async () => {
      const _0xdb6ef4 = _0x3f9c50.data.upperPCPassword
          .map((_0x5003c9, _0xf1d574) => (_0x5003c9 ? _0xf1d574 + 1 : -1))
          .filter((_0x170a79) => _0x170a79 !== -1),
        _0x10fb4a = {
          label: '' + _0xdb6ef4[0],
          icon: 'passport',
          name: 'key1',
          maxLength: 2,
        }
      const _0x933807 = {
        label: '' + _0xdb6ef4[1],
        icon: 'passport',
        name: 'key2',
        maxLength: 2,
      }
      const _0x473508 = {
        label: '' + _0xdb6ef4[2],
        icon: 'passport',
        name: 'key3',
        maxLength: 2,
      }
      const _0x409e06 = {
        label: '' + _0xdb6ef4[3],
        icon: 'passport',
        name: 'key4',
        maxLength: 2,
      }
      const _0x4ae0c4 = {
        label: '' + _0xdb6ef4[4],
        icon: 'passport',
        name: 'key5',
        maxLength: 2,
      }
      const _0x245c3d = await _0x1f1484.g.exports['ev-ui'].OpenInputMenu(
        [_0x10fb4a, _0x933807, _0x473508, _0x409e06, _0x4ae0c4],
        (_0x2f33b8) =>
          _0x2f33b8 &&
          _0x2f33b8.key1 &&
          _0x2f33b8.key2 &&
          _0x2f33b8.key3 &&
          _0x2f33b8.key4 &&
          _0x2f33b8.key5
      )
      if (!_0x245c3d) {
        return
      }
      await _0x35ac5b(1)
      const _0x3fb49e = _0x3f9c50.data.upperPCPassword.filter(
        (_0x217701) => _0x217701
      )
      if (
        !Object.entries(_0x245c3d).every(([_0x3666fc, _0x38ca35]) => {
          const _0x2eabd7 = +_0x3666fc.substring(3)
          return (
            _0x3fb49e[_0x2eabd7 - 1].toLowerCase() ===
            _0x38ca35.toLowerCase().trim()
          )
        })
      ) {
        const _0x41df16 = {
          show: true,
          text: 'Invalid Password Detected!\nInitiating lockout sequence...\n            \nSuccess!',
        }
        exports['ev-ui'].openApplication('textpopup', _0x41df16)
        await _0x8f3134.execute('ev-heists:ui:stop', 'Heist Failed')
        return
      }
      const _0x3a195d = {
        show: true,
        text: 'Gate Keycode: ' + _0x3f9c50.data.upperKeypadCode,
      }
      exports['ev-ui'].openApplication('textpopup', _0x3a195d)
    })
    _0x336a39.on(
      'ev-heists:vault:upperCEOKeypad',
      async (_0x2cddb7, _0x36ddba, _0x41620a) => {
        emit('inventory:DegenItemType', 26, 'heistdecrypter_red')
        const _0x73b99f = _0x46c4eb('minigames'),
          _0x19c9c8 = await _0x2d70cc(
            Object.assign({}, _0x73b99f.vault.untangle)
          )
        if (!_0x19c9c8) {
          return
        }
        _0x8f3134.execute('ev-heists:vault:upperCEOKeypadResult')
      }
    )
    const _0x3f9c50 = new _0x72bbde(function () {}, 1000),
      _0x2c82aa = async () => {
        const _0x25fcc3 = {
          x: 285.7,
          y: 264.98,
          z: 103.28,
        }
        const _0x1846d0 = {
          heading: 162,
          minZ: 103.28,
          maxZ: 107.28,
        }
        _0x2d4217.addBoxZone(
          'vault',
          'fleeca_box_zone',
          _0x25fcc3,
          1.9,
          2.2,
          _0x1846d0
        )
        await _0x44858b()
        await _0x1e97a3()
        await _0x22b15a()
      },
      _0x196f75 = async (_0x2bd384, _0x9c78f6, _0x215490, _0xa18f0b) => {
        const _0x513735 = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), true)
          ),
          _0x4391d1 = _0xf8285b.fromArray([285.7, 264.98, 105.78]),
          _0x240cbc = _0x513735.getDistance(_0x4391d1)
        if (_0x240cbc > 2.5) {
          return
        }
        if (!_0x3bf188 || _0x3bf188.heistActive) {
          emit('DoLongHudText', 'You cant do that at the moment! (Group)', 2)
          return
        }
        const _0x376fb1 = {
          label: 'Encryption Code',
          name: 'code',
        }
        const _0x4c7879 = await _0x1f1484.g.exports['ev-ui'].OpenInputMenu(
          [_0x376fb1],
          (_0x4774ff) => _0x4774ff && _0x4774ff.code
        )
        if (!_0x4c7879) {
          return
        }
        const _0x29fb61 = await _0x8f3134.execute(
          'ev-heists:vault:canRob',
          _0x4c7879.code
        )
        if (!_0x29fb61) {
          emit('DoLongHudText', 'Unavailable', 2)
          return
        }
        emit('inventory:removeItem', 'thermitecharge', 1)
        const _0x4516e1 = {
            x: _0x4391d1.x,
            y: _0x4391d1.y,
            z: _0x4391d1.z,
            h: GetEntityHeading(PlayerPedId()),
          },
          _0x681f24 = _0x46c4eb('minigames'),
          _0xd053e8 = _0x17a542(Object.assign({}, _0x681f24.vault.thermite))
        _0x530a45(_0x4516e1, 0, _0xd053e8)
        const _0x5bf603 = await _0xd053e8
        if (!_0x5bf603) {
          return
        }
        const _0x16d6a7 = { code: _0x4c7879.code }
        const _0x310d28 = await _0x8f3134.execute(
          'ev-heists:startHeist',
          'vault',
          _0x16d6a7
        )
      }
    _0x336a39.onNet('ev-heists:vault:start', (_0x279414) => {
      _0x3f9c50.data = _0x279414
      _0x3f9c50.start()
    })
    _0x336a39.onNet('ev-heists:vault:stop', () => {
      _0x3f9c50.stop()
    })
    _0x336a39.onNet('ev-heists:vault:update', (_0x59eff9) => {
      _0x3f9c50.data = _0x59eff9
    })
    const _0x4d5cdb = async (_0x32c1c9, _0x2c2b74, _0x45872a, _0x52b8b5) => {
      var _0xf59428
      const _0x5475c8 = JSON.parse(_0x2c2b74)
      if (!_0x5475c8) {
        return
      }
      const _0x804420 = _0x5475c8.encryptionId
      if (!_0x804420) {
        return
      }
      const _0x354a76 = _0xf8285b.fromArray(_0x5475c8.coords)
      if (!_0x354a76) {
        return
      }
      const _0x5ce873 = _0xf8285b.fromArray(
        GetEntityCoords(GetPlayerPed(PlayerId()), false)
      )
      if (!_0x5ce873) {
        return
      }
      if (_0x5ce873.getDistance(_0x354a76) < 150) {
        emit('DoLongHudText', 'Too close to signaling station!', 2)
        return
      }
      const _0x2afb1b = GetInteriorFromEntity(PlayerPedId())
      if (_0x2afb1b) {
        emit('DoLongHudText', 'Unable to acquire signal!', 2)
        return
      }
      let _0x14aceb =
        (_0xf59428 = _0x5475c8.numHacks) !== null && _0xf59428 !== void 0
          ? _0xf59428
          : 1
      const _0x2fcf1a = { police: true }
      const _0x437e25 = {
        dispatchCode: '10-90',
        displayCode: '10-90VG',
        skipMapping: false,
        recipientList: _0x2fcf1a,
        isImportant: true,
        playSound: true,
        soundName: 'HighPrioCrime',
        priority: 1,
        dispatchMessage: 'Anti-theft device tampering',
        text: 'An anti-theft device from a bank has been tampered with!',
        origin: _0x5ce873,
      }
      emit('dispatch:svNotify', _0x437e25)
      let _0x4e0da9
      switch (_0x804420) {
        case 'flip':
          const _0x1fa017 = {}
          ;(_0x1fa017.gridSize = 4),
            (_0x1fa017.gameTimeoutDuration = 10000),
            (_0x4e0da9 = _0xe8fb18(_0x1fa017))
          break
        case 'untangle':
          const _0x3e9ee4 = {}
          ;(_0x3e9ee4.numPoints = 10),
            (_0x3e9ee4.gameTimeoutDuration = 16000),
            (_0x4e0da9 = _0x2d70cc(_0x3e9ee4))
          break
        case 'ddr':
          const _0xbac951 = {}
          ;(_0xbac951.letters = ['w', 'a', 's', 'd']),
            (_0xbac951.gameTimeoutDuration = 35000),
            (_0xbac951.failureCount = 5),
            (_0xbac951.timeBetweenLetters = 550),
            (_0xbac951.timeToTravel = 1200),
            (_0xbac951.columns = 4),
            (_0x4e0da9 = _0x4ce42d(_0xbac951))
          break
        case 'maze':
          const _0x236f14 = {}
          ;(_0x236f14.gridSize = 5),
            (_0x236f14.gameTimeoutDuration = 15000),
            (_0x236f14.numberHideDuration = 5000),
            (_0x4e0da9 = _0x2d0b16(_0x236f14))
          break
        case 'var':
          const _0xd84f2c = {}
          ;(_0xd84f2c.numberTimeout = 4000),
            (_0xd84f2c.squares = 7),
            (_0x4e0da9 = _0x56115f(_0xd84f2c))
          break
        case 'thermite':
          const _0x4156fa = {}
          ;(_0x4156fa.gridSize = 5),
            (_0x4156fa.coloredSquares = 12),
            (_0x4156fa.gameTimeoutDuration = 15000),
            (_0x4e0da9 = _0x17a542(_0x4156fa))
          break
      }
      const _0x56e2bb = await _0x4e0da9
      if (!_0x56e2bb) {
        return
      }
      if (--_0x14aceb <= 0) {
        emit(
          'inventory:removeItemByMetaKV',
          'heistloot_tracked',
          1,
          '_remove_id',
          _0x5475c8['_remove_id']
        )
        _0x5475c8['_description'] = 'Serial: ' + _0x5475c8.id
        emit(
          'player:receiveItem',
          'heistloot',
          1,
          false,
          {},
          JSON.stringify(_0x5475c8)
        )
        return
      }
      emit('DoLongHudText', 'The encryption is stronger than normal!', 2)
      _0x5475c8.numHacks = _0x14aceb
      emit(
        'inventory:updateItem',
        _0x32c1c9,
        _0x52b8b5,
        JSON.stringify(_0x5475c8)
      )
    }
    async function _0x31cb6a() {}
    on(
      'ev-inventory:itemUsed',
      (_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e) => {
        switch (_0x5b2b46) {
          case 'advlockpick':
            _0x350983(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e)
            break
          case 'thermitecharge':
            _0x560000(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e),
              _0x196f75(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e),
              _0x22e958(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e)
            break
          case 'heistlaptop3':
            _0x39e39b(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e)
            break
          case 'heistbox':
            _0x9b54c1(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e)
            break
          case 'heistloot_tracked':
            _0x4d5cdb(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e)
            break
          case 'jammingdevice':
            _0x234ade(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e)
            break
          case 'heistentrycard':
            _0x29fccf(_0x5b2b46, _0xeac35d, _0x41aba1, _0x2c4e3e)
            break
        }
      }
    )
    on('ev-spawn:characterSpawned', (_0x272487) => {
      _0x59b6c5.reset()
    })
    async function _0x2f5fd8() {}
    const _0x43d20c = async (_0xa31c27) => {
        const _0x1e8092 = await _0x8f3134.execute(
          'ev-heists:peds:createPed',
          _0xa31c27
        )
        return _0x1e8092
      },
      _0x51f8da = async (_0x30e2c6) => {
        var _0x56671b, _0x5b820b
        const _0x32337f = GetVehicleModelNumberOfSeats(_0x30e2c6.model),
          _0x11b1fc = 1 + Math.floor(Math.random() * _0x32337f)
        ;(_0x56671b = (_0x5b820b = _0x30e2c6.peds).amount) !== null &&
        _0x56671b !== void 0
          ? _0x56671b
          : (_0x5b820b.amount = _0x11b1fc)
        const _0x5a7cd9 = await _0x8f3134.execute(
          'ev-heists:peds:createVehicle',
          _0x30e2c6.model,
          _0x30e2c6.coords,
          _0x30e2c6.heading,
          _0x30e2c6
        )
        return _0x5a7cd9
      }
    _0x336a39.onNet(
      'ev-heists:peds:vehicleCreated',
      async (_0x180bbd, _0x2fbb11) => {
        await _0x45415b.waitForCondition(() => {
          return NetworkDoesEntityExistWithNetworkId(_0x180bbd)
        }, 30000)
        const _0x49e2ee = NetworkGetEntityFromNetworkId(_0x180bbd)
        if (!_0x49e2ee) {
          _0x336a39.emitNet('ev-heists:peds:deleteVehicle', _0x180bbd)
          return
        }
        if (IsThisModelAHeli(_0x2fbb11.model)) {
          SetHeliBladesSpeed(_0x49e2ee, 1)
        }
        console.log(
          'Created vehicle with netId ' +
            _0x180bbd +
            ' | ' +
            _0x49e2ee +
            ' | ' +
            _0x2fbb11
        )
        const _0x535435 = _0x2fbb11.coords
        _0x535435.x += 5
        _0x535435.y += 5
        for (
          let _0x128252 = 0;
          _0x128252 < _0x2fbb11.peds.amount;
          _0x128252++
        ) {
          const _0x3d6db2 = await _0x43d20c(_0x2fbb11.peds)
          if (!_0x3d6db2) {
            await _0x35ac5b(5000)
            _0x128252 = _0x128252 - 1
            continue
          }
          _0x336a39.emitNet(
            'ev-heists:peds:seatIntoVehicle',
            _0x180bbd,
            NetworkGetNetworkIdFromEntity(_0x3d6db2),
            _0x128252 - 1,
            _0x2fbb11.seatOptions
          )
        }
      }
    )
    _0x336a39.onNet(
      'ev-heists:peds:pedCreated',
      async (_0x4808a8, _0x53dda8) => {
        var _0x5a94ab,
          _0x2e3775,
          _0x431f55,
          _0x14869b,
          _0x54ea85,
          _0x236f47,
          _0x488c7e,
          _0x7dacbb,
          _0x1ad90f,
          _0x22b78b,
          _0x3f7ba3,
          _0x110c13,
          _0x2018b2,
          _0x212337,
          _0x49d5d8,
          _0x12835a,
          _0x2427b7,
          _0x21551a,
          _0x162f6a,
          _0x33fac7,
          _0x58ab01,
          _0x44621e,
          _0x28814f,
          _0x3777c1,
          _0x1fbc15
        await _0x45415b.waitForCondition(() => {
          return NetworkDoesEntityExistWithNetworkId(_0x4808a8)
        }, 30000)
        console.log('Created ped with netId: ' + _0x4808a8)
        const _0x144960 = NetworkGetEntityFromNetworkId(_0x4808a8)
        DecorSetBool(_0x144960, 'ScriptedPed', true)
        SetEntityAsMissionEntity(_0x144960, true, true)
        const _0x18ac95 = _0x53dda8.options
        SetEntityMaxHealth(
          _0x144960,
          (_0x5a94ab = _0x18ac95.health) !== null && _0x5a94ab !== void 0
            ? _0x5a94ab
            : 200
        )
        SetEntityHealth(
          _0x144960,
          (_0x2e3775 = _0x18ac95.health) !== null && _0x2e3775 !== void 0
            ? _0x2e3775
            : 200
        )
        SetPedArmour(
          _0x144960,
          (_0x431f55 = _0x18ac95.armour) !== null && _0x431f55 !== void 0
            ? _0x431f55
            : 0
        )
        SetPedSuffersCriticalHits(
          _0x144960,
          (_0x14869b = _0x18ac95.criticalHits) !== null && _0x14869b !== void 0
            ? _0x14869b
            : true
        )
        for (const [_0x5e83da, _0x1dfcfb] of (_0x54ea85 = _0x18ac95.weapons) !==
          null && _0x54ea85 !== void 0
          ? _0x54ea85
          : []) {
          GiveWeaponToPed(_0x144960, _0x5e83da, _0x1dfcfb, false, true)
          SetPedAmmo(_0x144960, _0x5e83da, _0x1dfcfb)
          SetAmmoInClip(_0x144960, _0x5e83da, _0x1dfcfb)
        }
        SetCanAttackFriendly(
          _0x144960,
          (_0x236f47 = _0x18ac95.attackFriendly) !== null &&
            _0x236f47 !== void 0
            ? _0x236f47
            : false,
          (_0x488c7e = !_0x18ac95.attackFriendly) !== null &&
            _0x488c7e !== void 0
            ? _0x488c7e
            : true
        )
        if (_0x18ac95.combatAttributes) {
          SetPedCombatMovement(
            _0x144960,
            (_0x7dacbb = _0x18ac95.combatAttributes.movementType) !== null &&
              _0x7dacbb !== void 0
              ? _0x7dacbb
              : 0
          )
          SetPedCombatRange(
            _0x144960,
            (_0x1ad90f = _0x18ac95.combatAttributes.combatRange) !== null &&
              _0x1ad90f !== void 0
              ? _0x1ad90f
              : 0
          )
          SetPedAccuracy(
            _0x144960,
            (_0x22b78b = _0x18ac95.combatAttributes.accuracy) !== null &&
              _0x22b78b !== void 0
              ? _0x22b78b
              : 0
          )
          SetPedCanRagdoll(
            _0x144960,
            (_0x3f7ba3 = _0x18ac95.combatAttributes.ragdoll) !== null &&
              _0x3f7ba3 !== void 0
              ? _0x3f7ba3
              : true
          )
          SetPedCanRagdollFromPlayerImpact(
            _0x144960,
            (_0x110c13 = _0x18ac95.combatAttributes.ragdoll) !== null &&
              _0x110c13 !== void 0
              ? _0x110c13
              : true
          )
          SetPedCanPeekInCover(
            _0x144960,
            (_0x2018b2 = _0x18ac95.combatAttributes.useCover) !== null &&
              _0x2018b2 !== void 0
              ? _0x2018b2
              : true
          )
          SetPedCanSwitchWeapon(
            _0x144960,
            (_0x212337 = _0x18ac95.combatAttributes.swapWeapon) !== null &&
              _0x212337 !== void 0
              ? _0x212337
              : true
          )
          SetPedCanEvasiveDive(
            _0x144960,
            (_0x49d5d8 = _0x18ac95.combatAttributes.dive) !== null &&
              _0x49d5d8 !== void 0
              ? _0x49d5d8
              : true
          )
          for (const [_0x286a76, _0x5ab8a7] of (_0x12835a =
            _0x18ac95.combatAttributes.pedFlags) !== null &&
          _0x12835a !== void 0
            ? _0x12835a
            : []) {
            SetPedConfigFlag(_0x144960, _0x286a76, _0x5ab8a7)
          }
        }
        const _0x183c58 =
          (_0x2427b7 = _0x18ac95.relationshipGroup) !== null &&
          _0x2427b7 !== void 0
            ? _0x2427b7
            : 'CIVILIAN'
        SetPedRelationshipGroupHash(_0x144960, GetHashKey(_0x183c58))
        SetPedRelationshipGroupHash(PlayerPedId(), GetHashKey('PLAYER'))
        SetRelationshipBetweenGroups(
          (_0x21551a = _0x18ac95.relationshipType) !== null &&
            _0x21551a !== void 0
            ? _0x21551a
            : 3,
          GetHashKey(_0x183c58),
          GetHashKey('PLAYER')
        )
        SetRelationshipBetweenGroups(
          (_0x162f6a = _0x18ac95.relationshipType) !== null &&
            _0x162f6a !== void 0
            ? _0x162f6a
            : 3,
          GetHashKey('PLAYER'),
          GetHashKey(_0x183c58)
        )
        SetPedDropsWeaponsWhenDead(
          _0x144960,
          (_0x33fac7 = _0x18ac95.dropWeapon) !== null && _0x33fac7 !== void 0
            ? _0x33fac7
            : false
        )
        if (_0x18ac95.randomVariation) {
          SetPedRandomComponentVariation(_0x144960, 1)
        }
        _0x18ac95.randomProps && SetPedRandomProps(_0x144960)
        SetPedSeeingRange(
          _0x144960,
          (_0x58ab01 = _0x18ac95.combatAttributes.seeingRange) !== null &&
            _0x58ab01 !== void 0
            ? _0x58ab01
            : 200
        )
        SetPedHearingRange(
          _0x144960,
          (_0x44621e = _0x18ac95.combatAttributes.hearingRange) !== null &&
            _0x44621e !== void 0
            ? _0x44621e
            : 150
        )
        SetPedAlertness(
          _0x144960,
          (_0x28814f = _0x18ac95.combatAttributes.alertness) !== null &&
            _0x28814f !== void 0
            ? _0x28814f
            : 3
        )
        StopPedSpeaking(
          _0x144960,
          (_0x3777c1 = _0x18ac95.stopSpeaking) !== null && _0x3777c1 !== void 0
            ? _0x3777c1
            : true
        )
        DisablePedPainAudio(
          _0x144960,
          (_0x1fbc15 = _0x18ac95.stopPainAudio) !== null && _0x1fbc15 !== void 0
            ? _0x1fbc15
            : true
        )
        ClearPedTasksImmediately(_0x144960)
        SetEntityLoadCollisionFlag(_0x144960, true)
        if (!HasCollisionLoadedAroundEntity(_0x144960)) {
          const [_0x2862fb, _0x704f72, _0x3d9bfb] = GetEntityCoords(
            _0x144960,
            false
          )
          RequestCollisionAtCoord(_0x2862fb, _0x704f72, _0x3d9bfb)
        }
      }
    )
    _0x336a39.onNet(
      'ev-heists:peds:setPedIntoVehicle',
      async (_0x4603fb, _0x300ec7, _0x3a5a87, _0x1a2cb9) => {
        console.log(
          'Set ped into vehicle with netId: ' +
            _0x300ec7 +
            ', ' +
            _0x4603fb +
            ', ' +
            _0x3a5a87 +
            ', ' +
            _0x1a2cb9
        )
        const _0x5f1f4a = await _0x45415b.waitForCondition(() => {
          return (
            NetworkDoesEntityExistWithNetworkId(_0x300ec7) &&
            NetworkDoesEntityExistWithNetworkId(_0x4603fb)
          )
        }, 30000)
        if (_0x5f1f4a) {
          return
        }
        const _0x46a800 = NetworkGetEntityFromNetworkId(_0x300ec7),
          _0x2e69a9 = NetworkGetEntityFromNetworkId(_0x4603fb)
        SetPedIntoVehicle(_0x46a800, _0x2e69a9, _0x3a5a87)
        const _0x48c302 = GetPlayerFromServerId(_0x1a2cb9.targetPlayer),
          _0x6e6293 = _0x48c302 ? GetPlayerPed(_0x48c302) : PlayerPedId()
        if (_0x1a2cb9.chase && _0x3a5a87 === -1) {
          TaskVehicleChase(_0x46a800, _0x6e6293)
          SetPedKeepTask(_0x46a800, true)
        } else {
          _0x1a2cb9.combat && TaskCombatPed(_0x46a800, _0x6e6293, 0, 16)
        }
      }
    )
    async function _0x35727d() {}
    const _0x8cf89a = new Set(),
      _0x7d0ec2 = () => {
        _0x2d4217.onEnter('oilrig_zone', async (_0x805571) => {
          _0x2ef295.data.phase === 'boating' &&
            _0x8f3134.execute('ev-heists:oilrig:setPhase', 'active')
        })
        const _0x7dc64d = {
          CPXEvent: 'ev-heists:oilrig:loot',
          id: 'oilrig_loot',
          icon: 'circle',
          label: 'Loot',
        }
        const _0x59d027 = { radius: 2.5 }
        _0x1f45d4.addPeekEntryByModel(
          [GetHashKey('s_m_m_marine_01')],
          [_0x7dc64d],
          {
            distance: _0x59d027,
            isEnabled: (_0x228be4, _0x1d0607) => {
              return _0x2ef295.isActive
            },
          }
        )
        _0x2ef295.addHook('active', async () => {
          for (const _0x4083f6 of _0x8cf89a) {
            const _0x3c6766 = NetworkGetEntityFromNetworkId(_0x4083f6)
            if (!_0x3c6766) {
              _0x8cf89a.delete(_0x4083f6)
              continue
            }
            !IsVehicleDriveable(_0x3c6766, true) &&
              (_0x8cf89a.delete(_0x4083f6),
              await _0x35ac5b(5000),
              _0x336a39.emitNet('ev-heists:peds:deleteVehicle', _0x4083f6))
          }
        })
      }
    _0x336a39.on(
      'ev-heists:oilrig:loot',
      async (_0x5619c7, _0x594779, _0x337789) => {
        emit('animation:PlayAnimation', 'search')
        const _0x5c10ed = {
          distance: 5,
          entity: _0x594779,
        }
        await _0x1f45d4.taskBar(2000, 'Searching...', true, _0x5c10ed)
        emit('animation:cancel')
        const _0x3497ef = NetworkGetNetworkIdFromEntity(_0x594779)
        if (!_0x3497ef) {
          return
        }
        _0x8f3134.execute('ev-heists:oilrig:loot', _0x3497ef)
      }
    )
    _0x336a39.onNet(
      'ev-heists:oilrig:spawnClearingPed',
      async (_0x3d2536, _0x248386) => {
        const _0xf3d9a6 = _0xf8285b.fromArray(_0x3d2536),
          _0x22d3ec = _0x248386,
          _0xcdbfec = {
            movementType: 3,
            combatRange: 0,
            accuracy: 100,
            ragdoll: false,
            pedFlags: [[208, true]],
          }
        const _0x100741 = {
          health: 225,
          armour: 125,
          weapons: [
            [1192676223, 9999],
            [-1813897027, 9999],
          ],
          criticalHits: true,
          attackFriendly: false,
          combatAttributes: _0xcdbfec,
          relationshipGroup: 'HATES_PLAYER',
          relationshipType: 5,
          dropWeapon: false,
          randomVariation: true,
          randomProps: true,
        }
        const _0x2f798a = _0x100741,
          _0x5a2c65 = {
            model: GetHashKey('s_m_m_marine_01'),
            coords: _0xf3d9a6,
            heading: _0x22d3ec,
            options: _0x2f798a,
          }
        await _0x43d20c(_0x5a2c65)
      }
    )
    _0x336a39.onNet(
      'ev-heists:oilrig:spawnHelicopter',
      async (_0x6bf073, _0x400070) => {
        const _0x3924b2 = {
          movementType: 3,
          combatRange: 2,
          accuracy: 33,
          ragdoll: false,
          pedFlags: [[208, true]],
        }
        const _0x168afd = {
          health: 175,
          armour: 200,
          weapons: [
            [1192676223, 9999],
            [-1813897027, 9999],
          ],
          criticalHits: true,
          attackFriendly: false,
          combatAttributes: _0x3924b2,
          relationshipGroup: 'HATES_PLAYER',
          relationshipType: 5,
          dropWeapon: false,
          randomVariation: true,
          randomProps: true,
        }
        const _0x35431f = _0x168afd,
          _0x53db18 = _0xf8285b.fromArray(_0x6bf073),
          _0xee9d70 = _0x400070,
          _0x41f342 = await _0x51f8da({
            peds: {
              model: GetHashKey('s_m_m_marine_01'),
              amount: 4,
              coords: _0x53db18,
              heading: _0xee9d70,
              options: _0x35431f,
            },
            coords: _0x53db18,
            heading: _0xee9d70,
            model: GetHashKey('valkyrie2'),
            seatOptions: {
              chase: true,
              combat: true,
              targetPlayer: GetPlayerServerId(PlayerId()),
            },
          })
        _0x8cf89a.add(_0x41f342)
      }
    )
    const _0x29e8ac = GetHashKey('patrolboat'),
      _0x3b695d = new Set(),
      _0x4dfb82 = () => {
        _0x2ef295.addHook('active', async () => {
          if (_0x2ef295.data.phase !== 'boating') {
            return
          }
          if (!_0x2d4217.isActive('oilrig_boat_zone')) {
            return
          }
          if (!_0x2ef295.canTick('boat_tick')) {
            return
          }
          const _0x453fb8 = GetGamePool('CVehicle')
          let _0xde04e = 0
          for (const _0x466d94 of _0x453fb8) {
            const _0x1f3026 = GetEntityModel(_0x466d94)
            if (!IsThisModelABoat(_0x1f3026)) {
              continue
            }
            if (_0x1f3026 !== _0x29e8ac) {
              continue
            }
            const _0x29e257 = GetPedInVehicleSeat(_0x466d94, -1)
            if (
              !_0x29e257 ||
              IsPedAPlayer(_0x29e257) ||
              IsPedDeadOrDying(_0x29e257, true)
            ) {
              continue
            }
            _0xde04e++
          }
          _0x2ef295.setNextTick('boat_tick', 15)
          if (_0xde04e > 5) {
            return
          }
          const _0xdf7896 = _0xf8285b.fromArray(
            GetEntityCoords(PlayerPedId(), true)
          )
          let _0x38b160
          do {
            const _0x3fbdda =
                _0x45415b.getRandomNumber(0, 360) * (Math.PI / 180),
              _0x5ddee0 = _0xdf7896.add(
                new _0xf8285b(
                  Math.cos(_0x3fbdda) * 350,
                  Math.sin(_0x3fbdda) * 350,
                  0
                )
              ),
              [_0x5f0c58, _0x1fa93c] = TestVerticalProbeAgainstAllWater(
                _0x5ddee0.x,
                _0x5ddee0.y,
                _0x5ddee0.z,
                32,
                1
              )
            if (!_0x5f0c58) {
              continue
            }
            _0x5ddee0.z = _0x1fa93c
            _0x38b160 = _0x5ddee0
          } while (!_0x38b160)
          _0x38b160.z || (_0x38b160.z = 5)
          const _0x23b7bf = {
            movementType: 3,
            combatRange: 1,
            accuracy: 5,
            ragdoll: false,
            pedFlags: [[208, true]],
          }
          const _0x1e20df = {
            health: 175,
            armour: 200,
            weapons: [
              [1192676223, 9999],
              [-1813897027, 9999],
            ],
            criticalHits: false,
            attackFriendly: false,
            combatAttributes: _0x23b7bf,
            relationshipGroup: 'HATES_PLAYER',
            relationshipType: 5,
            dropWeapon: false,
            randomVariation: true,
            randomProps: true,
          }
          const _0x4c59ea = _0x1e20df,
            _0x171da3 = await _0x51f8da({
              peds: {
                model: GetHashKey('s_m_m_marine_01'),
                amount: 4,
                coords: _0x38b160,
                heading: 69,
                options: _0x4c59ea,
              },
              coords: _0x38b160,
              heading: 69,
              model: GetHashKey('patrolboat'),
              seatOptions: {
                chase: true,
                combat: true,
                targetPlayer: GetPlayerServerId(PlayerId()),
              },
            })
          _0x3b695d.add(_0x171da3)
          Math.random() < 0.05 &&
            _0x336a39.emit(
              'ev-heists:oilrig:spawnHelicopter',
              [_0x38b160.x, _0x38b160.y, 200],
              10
            )
        })
        _0x2ef295.addHook('active', () => {
          if (!_0x2ef295.canTick('boat_cleanup')) {
            return
          }
          _0x2ef295.setNextTick('boat_cleanup', 30)
          const _0x3d39ca = GetGamePool('CVehicle'),
            _0x3ff0bb = _0x3d39ca.map((_0x2b2205) => {
              const _0xecad42 = GetEntityModel(_0x2b2205)
              if (_0xecad42 !== _0x29e8ac) {
                return
              }
              return NetworkGetNetworkIdFromEntity(_0x2b2205)
            })
          for (const _0x7785f0 of _0x3b695d.values()) {
            if (
              _0x3ff0bb.find((_0x1133b9) => _0x1133b9 === _0x7785f0) &&
              IsVehicleDriveable(NetworkGetEntityFromNetworkId(_0x7785f0), true)
            ) {
              continue
            }
            _0x3b695d.delete(_0x7785f0)
            _0x336a39.emitNet('ev-heists:peds:deleteVehicle', _0x7785f0)
          }
        })
        _0x2ef295.addHook('afterStop', () => {
          for (const _0x4e7e45 of _0x3b695d.values()) {
            _0x336a39.emitNet('ev-heists:peds:deleteVehicle', _0x4e7e45)
          }
          _0x3b695d.clear()
        })
      }
    _0x336a39.onNet('ev-heists:oilrig:setupBoat', async (_0x5c3457) => {
      await _0x45415b.waitForCondition(() => {
        return NetworkDoesEntityExistWithNetworkId(_0x5c3457)
      }, 30000)
      const _0x5668ad = NetworkGetEntityFromNetworkId(_0x5c3457)
      if (!_0x5668ad) {
        _0x336a39.emitNet('ev-heists:peds:deleteVehicle', _0x5c3457)
        return
      }
      SetEntityInvincible(_0x5668ad, true)
      SetVehicleMaxSpeed(_0x5668ad, 60)
    })
    var _0x412b9b = _0x1f1484(484),
      _0x5b549e = _0x1f1484.n(_0x412b9b),
      _0x282f36 = _0x1f1484(110),
      _0x33bfad = _0x1f1484.n(_0x282f36)
    _0x5b549e().extend(_0x33bfad())
    const _0x4c6b64 = () => {
      const _0x3b3ba1 = {
        CPXEvent: 'ev-heists:oilrig:valve',
        id: 'oilrig_valve',
        icon: 'faucet',
        label: 'Use',
      }
      const _0x4e941b = { radius: 5.5 }
      const _0x61ec8c = {
        distance: _0x4e941b,
        isEnabled: (_0x4b832b, _0xaeec87) => {
          var _0x1405cd
          const _0x9f91f8 =
            (_0x1405cd = _0xaeec87.zones.oilrig_valve) === null ||
            _0x1405cd === void 0
              ? void 0
              : _0x1405cd.id
          return _0x2ef295.isActive && !_0x2ef295.data.valves[_0x9f91f8]
        },
      }
      _0x1f45d4.addPeekEntryByTarget('oilrig_valve', [_0x3b3ba1], _0x61ec8c)
      const _0x672e01 = {
        CPXEvent: 'ev-heists:oilrig:steam',
        id: 'oilrig_steam',
        icon: 'water',
        label: 'Use',
      }
      const _0x1eb53f = { radius: 2.5 }
      const _0x39fd4d = {
        distance: _0x1eb53f,
        isEnabled: (_0xfccb02, _0x365fbb) => {
          return _0x2ef295.isActive && _0x2ef295.data.steamActive < 2
        },
      }
      _0x1f45d4.addPeekEntryByTarget('oilrig_steam', [_0x672e01], _0x39fd4d)
      const _0x35dac9 = {
        CPXEvent: 'ev-heists:oilrig:steam_pump',
        id: 'oilrig_steam_pump',
        icon: 'swimming-pool',
        label: 'Use',
      }
      const _0x3131a3 = { radius: 2.5 }
      const _0x1ce267 = {
        distance: _0x3131a3,
        isEnabled: (_0x3f6e26, _0x5d62bd) => {
          return _0x2ef295.isActive && !_0x2ef295.data.steamPumpActive
        },
      }
      _0x1f45d4.addPeekEntryByTarget(
        'oilrig_steam_pump',
        [_0x35dac9],
        _0x1ce267
      )
      const _0x637f2 = {
        CPXEvent: 'ev-heists:oilrig:steam_pump_off',
        id: 'oilrig_steam_pump_off',
        icon: 'toggle-off',
        label: 'Turn Off',
      }
      const _0x371ec5 = { radius: 2.5 }
      const _0x16c650 = {
        distance: _0x371ec5,
        isEnabled: (_0x54fd52, _0x4bf753) => {
          return _0x2ef295.isActive && _0x2ef295.data.steamPumpActive
        },
      }
      _0x1f45d4.addPeekEntryByTarget('oilrig_steam_pump', [_0x637f2], _0x16c650)
      const _0x308f91 = {
        CPXEvent: 'ev-heists:oilrig:cabin',
        id: 'oilrig_cabin',
        icon: 'chevron-circle-right',
        label: 'Use',
      }
      const _0x4bce31 = { radius: 3.5 }
      const _0x5cdd9c = {
        distance: _0x4bce31,
        isEnabled: (_0x2b969b, _0x3266bd) => {
          return _0x2ef295.isActive
        },
      }
      _0x1f45d4.addPeekEntryByTarget('oilrig_cabin', [_0x308f91], _0x5cdd9c)
      const _0x4e6fa6 = {
        CPXEvent: 'ev-heists:oilrig:generator',
        id: 'oilrig_generator',
        icon: 'battery-full',
        label: 'Use',
      }
      const _0x28aba7 = { radius: 4.5 }
      const _0x28d810 = {
        distance: _0x28aba7,
        isEnabled: (_0x2caffb, _0x1b051b) => {
          var _0x4a9890
          const _0x13b38e =
            (_0x4a9890 = _0x1b051b.zones.oilrig_generator) === null ||
            _0x4a9890 === void 0
              ? void 0
              : _0x4a9890.id
          return _0x2ef295.isActive && !_0x2ef295.data.generators[_0x13b38e]
        },
      }
      _0x1f45d4.addPeekEntryByTarget('oilrig_generator', [_0x4e6fa6], _0x28d810)
      const _0xc0bc63 = {
        CPXEvent: 'ev-heists:oilrig:checkTime',
        id: 'oilrig_time',
        icon: 'clock',
        label: 'Check',
      }
      const _0x353563 = { radius: 2.5 }
      const _0x582b9d = {
        distance: _0x353563,
        isEnabled: (_0x48d905, _0x154acb) => {
          return _0x2ef295.isActive
        },
      }
      _0x1f45d4.addPeekEntryByModel(
        [GetHashKey('ex_prop_crate_expl_bc')],
        [_0xc0bc63],
        _0x582b9d
      )
      const _0x2bce70 = {
        CPXEvent: 'ev-heists:oilrig:search',
        id: 'oilrig_search',
        icon: 'search',
        label: 'Search',
      }
      const _0x3629e2 = { radius: 3.5 }
      _0x1f45d4.addPeekEntryByModel(
        [GetHashKey('prop_portaloo_01a')],
        [_0x2bce70],
        {
          distance: _0x3629e2,
          isEnabled: (_0x54dfa7, _0x696092) => {
            return _0x2ef295.isActive && !_0x2ef295.data.noteFound
          },
        }
      )
    }
    _0x336a39.on(
      'ev-heists:oilrig:valve',
      async (_0x58ad85, _0xe4a99a, _0x5b8ab4) => {
        const _0x56adca = _0x5b8ab4.zones.oilrig_valve.id
        if (!_0x56adca) {
          return
        }
        const _0x32dc37 = await _0x8f3134.execute(
          'ev-heists:oilrig:valve',
          _0x56adca
        )
        !_0x32dc37
          ? _0x336a39.emit('ev-heists:sounds:keypadFailure')
          : _0x336a39.emit('ev-heists:sounds:disruption')
      }
    )
    _0x336a39.on(
      'ev-heists:oilrig:steam',
      async (_0x5d9473, _0x20da54, _0x1141f3) => {
        const _0x50ca58 = _0x1141f3.zones.oilrig_steam.id
        if (!_0x50ca58) {
          return
        }
        _0x336a39.emitNet('ev-heists:oilrig:steam', _0x50ca58)
      }
    )
    _0x336a39.on(
      'ev-heists:oilrig:steam_pump',
      async (_0x3b12a7, _0x5e6c14, _0x5473e4) => {
        _0x8f3134.execute('ev-heists:oilrig:steamPump', true)
      }
    )
    _0x336a39.on(
      'ev-heists:oilrig:steam_pump_off',
      async (_0x4bbb3d, _0x23d40c, _0x4dc750) => {
        _0x8f3134.execute('ev-heists:oilrig:steamPump', false)
      }
    )
    _0x336a39.on(
      'ev-heists:oilrig:cabin',
      async (_0x4463b3, _0x351395, _0x3c56e8) => {
        const _0x664576 = _0x3c56e8.zones.oilrig_cabin.id
        if (!_0x664576) {
          return
        }
        const _0x5d3185 = _0x2ef295.data.cabinOrder.find(
          (_0xa9870b) => _0xa9870b.name === _0x664576
        )
        if (!_0x5d3185) {
          return
        }
        const _0x3112cf = {
          title: 'Cancel',
          action: 'ev-heists:oilrig:ui:cancel',
        }
        const _0x113250 = [
          {
            title: 'Start',
            description: _0x2ef295.data.noteFound
              ? _0x5d3185.name.toUpperCase()
              : 'u̶n̵k̵n̷o̶w̶n̵',
            icon: _0x5d3185.minigame.icon,
            key: _0x5d3185,
            action: 'ev-heists:oilrig:ui:startCabin',
          },
          _0x3112cf,
        ]
        _0x1f1484.g.exports['ev-ui'].showContextMenu(_0x113250)
      }
    )
    RegisterUICallback(
      'ev-heists:oilrig:ui:startCabin',
      async (_0x40edba, _0x23748e) => {
        const _0x311f81 = {
          ok: true,
          message: '',
        }
        const _0x4602e3 = {
          data: 'success',
          meta: _0x311f81,
        }
        _0x23748e(_0x4602e3)
        await _0x35ac5b(1)
        const _0x4a2c18 = _0x40edba.key,
          _0x2b95fa = _0x46c4eb('minigames')
        let _0x5d6cad = false
        switch (_0x4a2c18.minigame.id) {
          case 'flip':
            _0x5d6cad = await _0xe8fb18(
              Object.assign({}, _0x2b95fa.oilrig.flip)
            )
            break
          case 'untangle':
            _0x5d6cad = await _0x2d70cc(
              Object.assign({}, _0x2b95fa.oilrig.untangle)
            )
            break
          case 'ddr':
            _0x5d6cad = await _0x4ce42d(Object.assign({}, _0x2b95fa.oilrig.ddr))
            break
          case 'maze':
            _0x5d6cad = await _0x2d0b16(
              Object.assign({}, _0x2b95fa.oilrig.maze)
            )
            break
          case 'var':
            _0x5d6cad = await _0x56115f(Object.assign({}, _0x2b95fa.oilrig.var))
            break
          case 'thermite':
            _0x5d6cad = await _0x17a542(
              Object.assign({}, _0x2b95fa.oilrig.thermite)
            )
            break
        }
        !_0x5d6cad && _0x336a39.emit('ev-heists:sounds:keypadFailure')
        _0x8f3134.execute('ev-heists:oilrig:cabin', _0x4a2c18.name, _0x5d6cad)
      }
    )
    _0x336a39.on(
      'ev-heists:oilrig:generator',
      async (_0x3deb9b, _0x22fbb7, _0x2a4be1) => {
        const _0x1e2e16 = _0x2a4be1.zones.oilrig_generator.id
        if (!_0x1e2e16) {
          return
        }
        const _0x5c2df3 = _0x46c4eb('minigames'),
          _0x5da51f = await _0x4ce42d(
            Object.assign({}, _0x5c2df3.oilrig['ddr-gen'])
          )
        _0x8f3134.execute('ev-heists:oilrig:generator', _0x1e2e16, _0x5da51f)
        !_0x5da51f &&
          (_0x336a39.emit('ev-heists:sounds:keypadFailure'),
          await _0x35ac5b(100),
          _0x336a39.emit('ev-heists:sounds:keypadFailure'),
          await _0x35ac5b(100),
          _0x336a39.emit('ev-heists:sounds:keypadFailure'))
      }
    )
    _0x336a39.on(
      'ev-heists:oilrig:checkTime',
      async (_0x165fe8, _0x4f904e, _0x43008c) => {
        const _0x3ee1e2 = _0x2ef295.data.startTime,
          _0x236e3e = _0x2ef295.data.timeLimit,
          _0x21929c = _0x5b549e()(_0x3ee1e2 + _0x236e3e).toNow(true),
          _0x5b2256 = {
            title: 'Time Remaining: ' + _0x21929c,
            icon: 'clock',
          }
        const _0x1c7778 = [_0x5b2256]
        _0x1f1484.g.exports['ev-ui'].showContextMenu(_0x1c7778)
      }
    )
    _0x336a39.on(
      'ev-heists:oilrig:search',
      async (_0x298dd1, _0x2aab6b, _0x19bbc6) => {
        emit('animation:PlayAnimation', 'search')
        const _0x32cd66 = {
          distance: 5,
          entity: _0x2aab6b,
        }
        await _0x1f45d4.taskBar(8000, 'Searching...', true, _0x32cd66)
        emit('animation:cancel')
        if (_0x2ef295.data.noteFound) {
          return
        }
        _0x8f3134.execute('ev-heists:oilrig:search')
      }
    )
    _0x336a39.onNet(
      'ev-heists:oilrig:explosion',
      ({ x: _0x57cb2c, y: _0x1a7345, z: _0x887f92 }) => {
        AddExplosion(_0x57cb2c, _0x1a7345, _0x887f92, 16, 1000, true, false, 2)
      }
    )
    const _0x29d765 = () => {
      const _0x42ba01 = {
        x: -3559.01,
        y: 7368.38,
        z: 70,
      }
      const _0x1de3b8 = { heading: 0 }
      _0x2d4217.addBoxZone(
        'oil_rig',
        'oilrig_zone',
        _0x42ba01,
        1500,
        1500,
        _0x1de3b8
      )
      const _0xed8aa0 = {
        x: -4513.64,
        y: 2250,
        z: 70,
      }
      const _0x241c84 = { heading: 0 }
      _0x2d4217.addBoxZone(
        'boat_zone',
        'oilrig_boat_zone',
        _0xed8aa0,
        8500,
        4000,
        _0x241c84
      )
      const _0x1a8731 = {
        x: -3527.91,
        y: 7396.96,
        z: 50.7,
      }
      const _0x1b1084 = {
        heading: 0,
        minZ: 48.9,
        maxZ: 50.1,
      }
      _0x2d4217.addBoxZone('1', 'oilrig_helipad', _0x1a8731, 25, 20, _0x1b1084)
      const _0x24b0ad = {
        x: -3532.84,
        y: 7345.46,
        z: 29.21,
      }
      const _0x5806b8 = {
        heading: 270,
        minZ: 29.21,
        maxZ: 32.21,
      }
      _0x2d4217.addBoxZone('1', 'oilrig_valve', _0x24b0ad, 7.2, 5.6, _0x5806b8)
      const _0x2ef681 = {
        x: -3579.96,
        y: 7345.46,
        z: 30.21,
      }
      const _0xcd568 = {
        heading: 0,
        minZ: 28.91,
        maxZ: 31.71,
      }
      _0x2d4217.addBoxZone('2', 'oilrig_valve', _0x2ef681, 5.4, 7, _0xcd568)
      const _0x4d4bf3 = {
        x: -3579.85,
        y: 7392.3,
        z: 30.2,
      }
      const _0x142a92 = {
        heading: 0,
        minZ: 28.9,
        maxZ: 31.7,
      }
      _0x2d4217.addBoxZone('3', 'oilrig_valve', _0x4d4bf3, 5.6, 7.6, _0x142a92)
      const _0x501358 = {
        x: -3533.15,
        y: 7392.22,
        z: 30.21,
      }
      const _0x3caa39 = {
        heading: 0,
        minZ: 28.91,
        maxZ: 31.71,
      }
      _0x2d4217.addBoxZone('4', 'oilrig_valve', _0x501358, 5.6, 7.6, _0x3caa39)
      const _0x3d4857 = {
        x: -3530.49,
        y: 7372.42,
        z: 42.91,
      }
      const _0x3c2cba = {
        heading: 269,
        minZ: 42.91,
        maxZ: 44.91,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'oilrig_steam',
        _0x3d4857,
        1.3,
        1.2,
        _0x3c2cba
      )
      const _0x592b3 = {
        x: -3530.2,
        y: 7353.48,
        z: 42.91,
      }
      const _0x529803 = {
        heading: 269,
        minZ: 42.91,
        maxZ: 45.41,
      }
      _0x2d4217.addBoxTarget('2', 'oilrig_steam', _0x592b3, 1.9, 1.4, _0x529803)
      const _0x36956d = {
        x: -3529.15,
        y: 7363.07,
        z: 42.91,
      }
      const _0x4deae0 = {
        heading: 270,
        minZ: 42.91,
        maxZ: 45.41,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'oilrig_steam_pump',
        _0x36956d,
        2.6,
        2.9,
        _0x4deae0
      )
      const _0x33eced = {
        x: -3548.61,
        y: 7394.32,
        z: 43.91,
      }
      const _0x5baff5 = {
        heading: 0,
        minZ: 42.91,
        maxZ: 45.91,
      }
      _0x2d4217.addBoxZone(
        'bunny',
        'oilrig_cabin',
        _0x33eced,
        1.6,
        1.8,
        _0x5baff5,
        {}
      )
      const _0x4b2f7c = {
        x: -3579.36,
        y: 7393.16,
        z: 43.91,
      }
      const _0x3d0a7a = {
        heading: 0,
        minZ: 42.91,
        maxZ: 45.91,
      }
      _0x2d4217.addBoxZone(
        'butterfly',
        'oilrig_cabin',
        _0x4b2f7c,
        1.6,
        1.8,
        _0x3d0a7a,
        {}
      )
      const _0x325a88 = {
        x: -3531.44,
        y: 7370.52,
        z: 54.29,
      }
      const _0x3f5997 = {
        heading: 0,
        minZ: 53.29,
        maxZ: 56.29,
      }
      _0x2d4217.addBoxZone(
        'bison',
        'oilrig_cabin',
        _0x325a88,
        1.6,
        1.8,
        _0x3f5997,
        {}
      )
      const _0x21cc3a = {
        x: -3531.77,
        y: 7358.08,
        z: 54.29,
      }
      const _0x13a9bf = {
        heading: 0,
        minZ: 53.29,
        maxZ: 56.29,
      }
      _0x2d4217.addBoxZone(
        'blackbird',
        'oilrig_cabin',
        _0x21cc3a,
        1.6,
        1.8,
        _0x13a9bf,
        {}
      )
      const _0x4b1a96 = {
        x: -3532.06,
        y: 7350.34,
        z: 54.29,
      }
      const _0x28120f = {
        heading: 0,
        minZ: 53.29,
        maxZ: 56.29,
      }
      _0x2d4217.addBoxZone(
        'bat',
        'oilrig_cabin',
        _0x4b1a96,
        1.6,
        1.8,
        _0x28120f,
        {}
      )
      const _0x256dfb = {
        x: -3569.46,
        y: 7347.19,
        z: 54.29,
      }
      const _0xdfc277 = {
        heading: 0,
        minZ: 53.29,
        maxZ: 56.29,
      }
      _0x2d4217.addBoxZone(
        'bear',
        'oilrig_cabin',
        _0x256dfb,
        1.6,
        1.8,
        _0xdfc277,
        {}
      )
      const _0x105e1f = {
        x: -3532,
        y: 7355.68,
        z: 64.67,
      }
      const _0x41ef47 = {
        heading: 0,
        minZ: 63.67,
        maxZ: 66.67,
      }
      _0x2d4217.addBoxZone(
        'baboon',
        'oilrig_cabin',
        _0x105e1f,
        1.6,
        1.8,
        _0x41ef47,
        {}
      )
      const _0x422c21 = {
        x: -3548.6,
        y: 7349.12,
        z: 64.67,
      }
      const _0xcba53a = {
        heading: 0,
        minZ: 63.67,
        maxZ: 66.67,
      }
      _0x2d4217.addBoxZone(
        'beaver',
        'oilrig_cabin',
        _0x422c21,
        1.6,
        1.8,
        _0xcba53a,
        {}
      )
      const _0x2b9009 = {
        x: -3541.17,
        y: 7350.3,
        z: 32.53,
      }
      const _0x21ba59 = {
        heading: 271,
        minZ: 32.53,
        maxZ: 35.03,
      }
      _0x2d4217.addBoxTarget(
        '1',
        'oilrig_generator',
        _0x2b9009,
        2.2,
        3.5,
        _0x21ba59
      )
      const _0x17de52 = {
        x: -3540.39,
        y: 7363.01,
        z: 42.91,
      }
      const _0x32a167 = {
        heading: 269,
        minZ: 42.91,
        maxZ: 45.91,
      }
      _0x2d4217.addBoxTarget(
        '2',
        'oilrig_generator',
        _0x17de52,
        2,
        3.5,
        _0x32a167
      )
      const _0x2798f9 = {
        x: -3565.68,
        y: 7362.04,
        z: 68.53,
      }
      const _0x5d8662 = {
        heading: 90,
        minZ: 68.53,
        maxZ: 71.03,
      }
      _0x2d4217.addBoxTarget(
        '3',
        'oilrig_generator',
        _0x2798f9,
        1.9,
        3.3,
        _0x5d8662
      )
      const _0xd5d6e8 = {
        x: -3565.61,
        y: 7376.28,
        z: 68.53,
      }
      const _0x1bb6e5 = {
        heading: 91,
        minZ: 68.53,
        maxZ: 71.03,
      }
      _0x2d4217.addBoxTarget(
        '4',
        'oilrig_generator',
        _0xd5d6e8,
        1.9,
        3.9,
        _0x1bb6e5
      )
    }
    const _0x2ef295 = new _0x72bbde(function () {}, 1000)
    let _0x616367 = false,
      _0x29b650,
      _0x40f4f6 = false
    async function _0x4243ae() {
      _0x4dfb82()
      _0x7d0ec2()
      _0x4c6b64()
      const _0xdb7ccc = {
        id: 'heist_dock_worker_1',
        label: 'talk',
        icon: 'comment',
        CPXEvent: 'ev-heists:oilrig:talk',
        parameters: {},
      }
      const _0x3a81ee = { radius: 2.5 }
      const _0x4b9b73 = {
        npcIds: ['heist_dock_worker'],
        distance: _0x3a81ee,
        isEnabled: () => true,
      }
      _0x1f45d4.addPeekEntryByFlag(['isNPC'], [_0xdb7ccc], _0x4b9b73)
    }
    _0x336a39.onNet('ev-heists:oilrig:start', async (_0xb9cb00) => {
      if (_0x2ef295.isActive) {
        await _0x2ef295.stop()
      }
      if (!_0x616367) {
        _0x29d765()
        _0x616367 = true
      }
      DoScreenFadeOut(500)
      await _0x35ac5b(1000)
      _0x1f1484.g.exports['ev-weather'].FreezeWeather(true, 'Foggy Rain')
      _0x1f1484.g.exports['ev-weather'].FreezeTime(1)
      _0x29b650 = _0xac555c.createBlip('coord', -3558.15, 7367.55, 35)
      _0xac555c.applyBlipSettings(_0x29b650, 'Oil Rig', 8, 1)
      emit('reviveFunction')
      emit('ev-evidence:disable', true)
      emit('ev-island:hideBlips', true)
      exports.police.DisableBleeding(true)
      exports['ev-actionbar'].DisableGSR(true)
      exports.ragdoll.DisableReduceFactor(true)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      _0x2ef295.data = _0xb9cb00
      _0x2ef295.start()
      await _0x35ac5b(1000)
      DoScreenFadeIn(10000)
      emit(
        'phone:emailReceived',
        'Unknown',
        'Special Mission',
        'I acquired some boats for you to use, they should be anchored nearby.'
      )
    })
    _0x336a39.onNet('ev-heists:oilrig:stop', async () => {
      _0x2ef295.stop()
      _0x1f1484.g.exports['ev-weather'].FreezeWeather(false, 'Foggy Rain')
      _0x1f1484.g.exports['ev-weather'].FreezeTime(null)
      RemoveBlip(_0x29b650)
      emit('reviveFunction')
      emit('ev-evidence:disable', false)
      emit('ev-island:hideBlips', false)
      exports['ev-ui'].hideContextMenu()
      exports.police.DisableBleeding(false)
      exports['ev-actionbar'].DisableGSR(false)
      exports.ragdoll.DisableReduceFactor(false)
      exports.ragdoll.SetMaxHealth()
      exports.ragdoll.SetPlayerHealth(GetEntityMaxHealth(PlayerPedId()))
      DoScreenFadeOut(500)
      await _0x35ac5b(1000)
      ClearPedTasksImmediately(PlayerPedId())
      SetEntityCoords(
        PlayerPedId(),
        -1131.62,
        5410.5,
        2.89,
        false,
        false,
        false,
        false
      )
      await _0x35ac5b(1000)
      DoScreenFadeIn(10000)
    })
    _0x336a39.onNet('ev-heists:oilrig:update', (_0x5f58be) => {
      _0x2ef295.data = _0x5f58be
    })
    _0x336a39.on(
      'ev-heists:oilrig:talk',
      async (_0x3fca11, _0x3539de, _0x72f9b2) => {
        const _0x4c2044 = {}
        _0x4c2044['_heist'] = 'oilrig'
        const _0x322d1a = _0x1f1484.g.exports['ev-inventory'].hasEnoughOfItem(
          'heistentrycard',
          1,
          false,
          true,
          _0x4c2044
        )
        if (!_0x322d1a) {
          emit('DoLongHudText', "They don't recognize you", 2)
          return
        }
        if (!_0x3bf188 || _0x3bf188.heistActive) {
          emit('DoLongHudText', 'You cant do that at the moment! (Group)', 2)
          return
        }
        let _0x1d88b6 = false
        const _0x3a331d = _0xf8285b.fromArray(
          GetEntityCoords(PlayerPedId(), false)
        )
        for (const _0x2ecccf of _0x3bf188.members) {
          const _0x41139d = GetPlayerPed(
            GetPlayerFromServerId(_0x2ecccf.serverId)
          )
          if (!_0x41139d) {
            _0x1d88b6 = true
            continue
          }
          const _0x4c489b = _0xf8285b.fromArray(
            GetEntityCoords(_0x41139d, false)
          )
          if (_0x3a331d.getDistance(_0x4c489b) > 40) {
            _0x1d88b6 = true
            break
          }
        }
        if (_0x1d88b6) {
          emit('DoLongHudText', 'Gather all group members', 2)
          return
        }
        const _0x45e56b = await _0x8f3134.execute('ev-heists:oilrig:cooldown')
        if (_0x45e56b) {
          emit(
            'DoLongHudText',
            'A member of your group has completed this too recently',
            2
          )
          return
        }
        const _0x269739 = {
          title: 'Start',
          action: 'ev-heists:oilrig:ui:start',
        }
        const _0x7e60da = {
          title: 'Cancel',
          action: 'ev-heists:oilrig:ui:cancel',
        }
        const _0x1833fe = [_0x269739, _0x7e60da]
        _0x1f1484.g.exports['ev-ui'].showContextMenu(_0x1833fe)
      }
    )
    RegisterUICallback(
      'ev-heists:oilrig:ui:start',
      async (_0x41b83f, _0xcf011b) => {
        const _0x541026 = {
          ok: true,
          message: '',
        }
        const _0x28f589 = {
          data: 'success',
          meta: _0x541026,
        }
        _0xcf011b(_0x28f589)
        emit('inventory:DegenItemType', 35, 'heistentrycard')
        _0x8f3134.execute('ev-heists:startHeist', 'oilrig', {})
      }
    )
    on('pd:deathcheck', () => {
      _0x40f4f6 = !_0x40f4f6
      _0x336a39.emitNet('ev-heists:oilrig:dead', _0x40f4f6)
    })
    async function _0x478187() {
      try {
        await _0x4243ae()
      } catch (_0x19f824) {
        console.log('Error in heist handler: InitOilRig')
      }
      try {
        await _0x26b8bf()
      } catch (_0x3ffc65) {
        console.log('Error in heist handler: InitFleecaFront')
      }
      try {
        await _0x58f982()
      } catch (_0x55439a) {
        console.log('Error in heist handler: InitFleeca')
      }
      try {
        await _0x1752b9()
      } catch (_0x976234) {
        console.log('Error in heist handler: InitPowerStation')
      }
      try {
        await _0x2c82aa()
      } catch (_0x2c59e0) {
        console.log('Error in heist handler: InitVault')
      }
      try {
        await _0x157927()
      } catch (_0xb16d24) {
        console.log('Error in heist handler: InitPaleto')
      }
    }
    _0x336a39.onNet('ev-heists:sounds:keypadSound', () => {
      PlaySoundFrontend(-1, '5_SEC_WARNING', 'HUD_MINI_GAME_SOUNDSET', true)
    })
    _0x336a39.onNet('ev-heists:sounds:keypadFailure', () => {
      PlaySoundFrontend(
        -1,
        'Hack_Failed',
        'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS',
        true
      )
    })
    _0x336a39.onNet('ev-heists:sounds:keypadSuccess', () => {
      PlaySoundFrontend(
        -1,
        'Hack_Success',
        'DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS',
        true
      )
    })
    _0x336a39.onNet('ev-heists:sounds:disruption', () => {
      PlaySoundFrontend(
        -1,
        'Business_Shutdown',
        'DLC_GR_Disruption_Logistics_Sounds',
        true
      )
    })
    async function _0x316578() {
      try {
        await _0x5cccdb()
      } catch (_0x26173b) {
        console.log('error during init config: ', _0x26173b.message)
      }
      try {
        await _0x31cb6a()
      } catch (_0x37aea8) {
        console.log('error during init events: ', _0x37aea8.message)
      }
      try {
        await _0x35727d()
      } catch (_0x49d8ad) {
        console.log(
          'error during init minigame controller: ',
          _0x49d8ad.message
        )
      }
      try {
        await _0x2f5fd8()
      } catch (_0x3853dc) {
        console.log('error during init peds: ', _0x3853dc.message)
      }
      try {
        await _0x1eac5a()
      } catch (_0x49d057) {
        console.log('error during init doors: ', _0x49d057.message)
      }
      try {
        await _0x478187()
      } catch (_0x1bdbcf) {
        console.log('error during init client heists: ', _0x1bdbcf.message)
      }
      try {
        await _0x529ee9()
      } catch (_0xc28f3d) {
        console.log('error during init club: ', _0xc28f3d.message)
      }
      try {
        _0x5a3b9b()
      } catch (_0x1674ab) {
        console.log('error during init groups: ', _0x1674ab.message)
      }
    }
    ;(async () => {
      await _0x316578()
    })()
  })()
})()
