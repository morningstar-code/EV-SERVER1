;(() => {
  'use strict'
  var _0x1b3e49 = {
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0xc6bdc5) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
  }
  ;(() => {})()
  var _0x73f955 = {}
  const _0x44bd2c = GetCurrentResourceName(),
    _0x37aa49 = new Map()
  async function _0x1cc709() {
    const _0x4f97bf = await RPC.execute(_0x44bd2c + ':getClientConfig')
    for (const _0x4cba6b of _0x4f97bf) {
      _0x37aa49.set(_0x4cba6b.configId, _0x4cba6b.data)
    }
  }
  function _0xf80c79(_0x4ac1d6, _0x3793e3) {
    _0x37aa49.set(_0x4ac1d6, _0x3793e3)
    emit(_0x44bd2c + ':configLoaded', _0x4ac1d6)
  }
  function _0x329d6f(_0x2c30cb) {
    return _0x37aa49.get(_0x2c30cb)
  }
  const ResourceName = GetCurrentResourceName()
  async function _0x2bc07a() {}
  onNet(ResourceName + ':setConfig', (_0x9d16ac) => {
    if (_0x9d16ac === undefined || !(_0x9d16ac instanceof Array)) {
      return
    }
    for (const _0x172143 of _0x9d16ac) {
      _0xf80c79(_0x172143.configId, _0x172143.data)
    }
  })
  async function _0x24b192() {
    await _0x1cc709()
    await _0x2bc07a()
  }
  async function _0x222acd() {}
  const _0x1cd506 = 'ev-spawn:characterSpawned'
  const _0x311a97 = () => {
    return _0x1b3e49.g.exports.isPed.isPed('cid')
  }
  async function _0x2ce995(_0x51d93b) {
    return new Promise((_0x264490) => setTimeout(() => _0x264490(), _0x51d93b))
  }
  const _0x525e4e = () => Math.floor(Date.now() / 1000)
  class _0x21b8df {
    constructor(_0x3cf069, _0x1c6d63) {
      this.skill = _0x3cf069
      this['_value'] = _0x1c6d63
      this['_value'] > 0 && this.start()
    }
    ['start']() {}
    ['destroy']() {}
    set ['value'](_0x41ce07) {
      this['_value'] = _0x41ce07
      _0x41ce07 === 0 && this.destroy()
      this.updateValue()
    }
    get ['value']() {
      return this['_value']
    }
    ['updateValue']() {}
    get ['config']() {
      return _0x329d6f('skills')
    }
  }
  class _0x58c2f7 extends _0x21b8df {
    ['start']() {
      const _0x315fa3 = _0x311a97()
      _0x1b3e49.g.exports['ev-inventory'].setPlayerWeight(_0x315fa3, this.calculateInventoryWeight())
      _0x1b3e49.g.exports.carandplayerhud.addMeleeBuff(_0x315fa3, this.calculateMeleeBuff())
    }
    ['end']() {
      const _0x254c6a = _0x311a97()
      _0x1b3e49.g.exports['ev-inventory'].setPlayerWeight(_0x254c6a, 250)
      _0x1b3e49.g.exports.carandplayerhud.addMeleeBuff(_0x254c6a, 1)
    }
    ['updateValue']() {
      const _0x5cb0ee = _0x311a97()
      _0x1b3e49.g.exports['ev-inventory'].setPlayerWeight(_0x5cb0ee, this.calculateInventoryWeight())
      _0x1b3e49.g.exports.carandplayerhud.addMeleeBuff(_0x5cb0ee, this.calculateMeleeBuff())
    }
    ['calculateInventoryWeight']() {
      return Math.floor(250 + this.config.benefits.strength.weight * this.percentage)
    }
    ['calculateMeleeBuff']() {
      return 1 + this.config.benefits.strength.melee * this.percentage
    }
    get ['percentage']() {
      const _0x47103a = this.value / this.config.thresholds.strength.max
      if (
        _0x47103a >=
        this.config.thresholds.strength.fullAbove /
          this.config.thresholds.strength.max
      ) {
        return 1
      }
      return _0x47103a
    }
  }
  class _0x5376b7 extends _0x21b8df {
    ['start']() {}
    ['end']() {}
    ['updateValue']() {}
  }
  class _0x5085ed extends _0x21b8df {
    ['start']() {
      SetRunSprintMultiplierForPlayer(
        PlayerId(),
        Math.min(1.49, 1 + this.calculatePlusSprint())
      )
      emit('ev-taskbar:client:agilityBonus', 1 - this.calculatePlusTaskbar())
    }
    ['end']() {
      SetRunSprintMultiplierForPlayer(PlayerId(), 1)
      emit('ev-taskbar:client:agilityBonus', 1)
    }
    ['updateValue']() {
      SetRunSprintMultiplierForPlayer(
        PlayerId(),
        Math.min(1.49, 1 + this.calculatePlusSprint())
      )
      emit('ev-taskbar:client:agilityBonus', 1 - this.calculatePlusTaskbar())
    }
    ['calculatePlusSprint']() {
      return this.config.benefits.agility.sprint * this.percentage
    }
    ['calculatePlusTaskbar']() {
      return this.config.benefits.agility.taskbar * this.percentage
    }
    get ['percentage']() {
      const _0x5a5a12 = this.value / this.config.thresholds.agility.max
      if (
        _0x5a5a12 >=
        this.config.thresholds.agility.fullAbove /
          this.config.thresholds.agility.max
      ) {
        return 1
      }
      return _0x5a5a12
    }
  }
  class _0x616780 extends _0x21b8df {
    ['start']() {
      _0x1b3e49.g.exports['ev-heists'].thermiteMultiplier(this.getThermiteMultiplier())
      _0x1b3e49.g.exports['ev-heists'].panelMultiplier(this.getHackingMultiplier())
    }
    ['end']() {
      _0x1b3e49.g.exports['ev-heists'].thermiteMultiplier(1)
      _0x1b3e49.g.exports['ev-heists'].panelMultiplier(1)
    }
    ['updateValue']() {
      _0x1b3e49.g.exports['ev-heists'].thermiteMultiplier(this.getThermiteMultiplier())
      _0x1b3e49.g.exports['ev-heists'].panelMultiplier(this.getHackingMultiplier())
    }
    get ['percentage']() {
      const _0x414019 = this.value / this.config.thresholds.intelligence.max
      if (
        _0x414019 >=
        this.config.thresholds.intelligence.fullAbove /
          this.config.thresholds.intelligence.max
      ) {
        return 1
      }
      return _0x414019
    }
    ['getThermiteMultiplier']() {
      return 1 + this.config.benefits.intelligence.thermite * this.percentage
    }
    ['getHackingMultiplier']() {
      return 1 + this.config.benefits.intelligence.hacking * this.percentage
    }
  }
  const _0xe55abc = {
    strength: _0x58c2f7,
    wisdom: _0x5376b7,
    agility: _0x5085ed,
    intelligence: _0x616780,
  }
  const _0x307d9b = _0xe55abc
  class _0x158b00 {
    constructor() {
      const _0x11906b = {
        strength: null,
        wisdom: null,
        agility: null,
        intelligence: null,
      }
      this.benefits = _0x11906b
      this.initFunctions()
    }
    static ['Init']() {
      return new _0x158b00()
    }
    async ['initFunctions']() {
      this.initEvents()
      this.initExports()
    }
    ['initEvents']() {
      onNet(_0x1cd506, this.characterPicked.bind(this))
      onNet('ev-skills:client:skillChanged', this.onSkillChange.bind(this))
    }
    ['initExports']() {
      _0x1b3e49.g.exports('getPlayerSkills', () => this.player.skills)
      _0x1b3e49.g.exports('getPlayerSkill', (_0x4a288e) => this.player.skills[_0x4a288e].value)
      _0x1b3e49.g.exports('adjustSkill', (_0x398429, _0x59e964) =>
        emitNet('ev-skills:server:adjustSkill', _0x398429, _0x59e964)
      )
      _0x1b3e49.g.exports('improveSkill', (_0x54714b, _0x43fba5) =>
        emitNet('ev-skills:server:adjustSkill', _0x54714b, this.player.skills[_0x54714b].value + _0x43fba5)
      )
    }
    ['initInterval']() {
      if (this.interval) {
        clearTick(this.interval)
      }
      if (
        Object.values(this.player.skills).filter(
          (_0x2a364a) => _0x2a364a.value > 0
        ).length === 0
      ) {
        return
      }
      Object.entries(this.player.skills).forEach(([_0x4a7bbe, _0x68c5e1]) => {
        this.benefits[_0x4a7bbe] && this.benefits[_0x4a7bbe].destroy()
        _0x68c5e1.value > 0 &&
          (this.benefits[_0x4a7bbe] = new _0x307d9b[_0x4a7bbe](_0x4a7bbe, _0x68c5e1.value))
      })
      this.interval = setTick(async () => {
        const _0x462ca9 = Math.floor(Date.now() / 1000)
        for (const [_0x34d322, _0x2368a8] of Object.entries(
          this.player.skills
        )) {
          _0x2368a8.value > 0 &&
            _0x462ca9 > _0x2368a8.nextUpdate &&
            RPC.execute('ev-skills:server:adjustSkill', _0x34d322, this.getConfig().deductions[_0x34d322].amount,'remove')
        }
        await _0x2ce995(60000)
      })
    }
    async ['characterPicked']() {
      await this.updatePlayerSkills()
      this.initInterval()
    }
    ['onSkillChange'](_0x4656fa, _0x918bd9) {
      const _0x2a1c73 = _0x918bd9.value - this.player.skills[_0x4656fa].value,
        _0x169184 = _0x2a1c73 > 0
            ? this.getConfig().strings[_0x4656fa].improved
            : this.getConfig().strings[_0x4656fa].impaired
      emit('DoLHudText', 1, 'skill-' + _0x169184.i18n, 'You feel ' + _0x169184.defaultValue)
      this.player.skills[_0x4656fa] = _0x918bd9
      if (this.benefits[_0x4656fa] != null) {
        this.benefits[_0x4656fa].value = _0x918bd9.value
      } else {
        _0x918bd9.value > 0 &&
          (this.benefits[_0x4656fa] = new _0x307d9b[_0x4656fa](
            _0x4656fa,
            _0x918bd9.value
          ))
      }
    }
    ['getConfig']() {
      return _0x329d6f('skills')
    }
    async ['updatePlayerSkills']() {
      var _0x45a388
      const _0x39e3af = await RPC.execute('ev-skills:server:getPlayerSkills')
      this.player = {
        playerId: GetPlayerServerId(PlayerId()),
        characterId: (_0x45a388 = _0x311a97()) !== null && _0x45a388 !== void 0
            ? _0x45a388
            : 0,
        skills: _0x39e3af !== null && _0x39e3af !== void 0
            ? _0x39e3af
            : this.getConfig().skillDefaults,
        hasUpdated: false,
      }
    }
  }
  async function _0x1a3bba() {
    await _0x24b192()
    await _0x222acd()
    await _0x158b00.Init()
  }
  const _0x3143ce = GetCurrentResourceName()
  on('onClientResourceStart', async (_0x5794d6) => {
    if (_0x5794d6 !== _0x3143ce) {
      return
    }
    await _0x1a3bba()
  })
})()
