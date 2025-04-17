;(() => {
  'use strict'
  var _0x179ecf = {
    g: (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x4adb5d) {
        if (typeof window === 'object') {
          return window
        }
      }
    })(),
  }
  ;(() => {})()
  var _0x531705 = {}
  const _0x364bd3 = globalThis.CPX,
    _0x3f0b47 = _0x364bd3.Hud,
    _0x10d8dd = _0x364bd3.Utils,
    _0x3e0a92 = _0x364bd3.Zones,
    _0x35f456 = _0x364bd3.Events,
    _0x3bc73c = _0x364bd3.Streaming,
    _0xe2c806 = _0x364bd3.Procedures,
    _0x46b23a = _0x364bd3.Interface,
    _0x1b25f2 = null && _0x364bd3
  let _0x40912e = exports['ev-config'].GetModuleConfig('main')
  const _0x3f4613 = new Map(),
    _0x4d96cc = GetCurrentResourceName()
  async function _0x22395f() {}
  on('ev-config:configLoaded', (_0x1f9b7f, _0x574ff2) => {
    if (_0x1f9b7f === 'main') {
      _0x40912e = _0x574ff2
    } else {
      _0x3f4613.has(_0x1f9b7f) && _0x3f4613.set(_0x1f9b7f, _0x574ff2)
    }
  })
  function _0x4677dd(_0x3e6260) {
    return _0x40912e[_0x3e6260]
  }
  function _0x55353b(_0xfab339, _0x446a0b) {
    if (!_0x3f4613.has(_0xfab339)) {
      const _0x3b956e = exports['ev-config'].GetModuleConfig(_0xfab339)
      if (_0x3b956e === undefined) {
        return
      }
      _0x3f4613.set(_0xfab339, _0x3b956e)
    }
    const _0x28190f = _0x3f4613.get(_0xfab339)
    return _0x446a0b
      ? _0x28190f === null || _0x28190f === void 0
        ? void 0
        : _0x28190f[_0x446a0b]
      : _0x28190f
  }
  function _0x132def(_0x479d3b) {
    return _0x55353b(_0x4d96cc, _0x479d3b)
  }
  async function _0x1ca4ee(_0xae41cb) {
    return new Promise((_0x2e1376) => setTimeout(() => _0x2e1376(), _0xae41cb))
  }
  const _0x4aecd9 = (_0x4f58d7) => {
    let _0xc9995 = _0x4f58d7,
      _0x58035f = false
    if (_0x4f58d7.includes('youtube.com/watch?v=')) {
      _0x58035f = true
      _0xc9995 = _0x4f58d7.split('v=')[1]
    } else {
      if (_0x4f58d7.includes('youtu.be/')) {
        _0x58035f = true
        _0xc9995 = _0x4f58d7.split('youtu.be/')[1]
      } else {
        _0x4f58d7.includes('youtube.com/shorts/') &&
          ((_0x58035f = true), (_0xc9995 = _0x4f58d7.split('shorts/')[1]))
      }
    }
    if (_0xc9995.includes('&')) {
      _0xc9995 = _0xc9995.split('&')[0]
    }
    return (
      _0xc9995.includes('?') && (_0xc9995 = _0xc9995.split('?')[0]),
      _0xc9995.includes('#') && (_0xc9995 = _0xc9995.split('#')[0]),
      [_0xc9995, _0x58035f]
    )
  }
  function _0x520d69(_0x572265) {
    try {
      return JSON.parse(_0x572265)
    } catch (_0x5a9a13) {
      throw new Error('Error while parsing json string')
    }
  }
  let _0x4ec145 = null,
    _0xba1172 = null,
    _0x498103 = null,
    _0x5d4611 = null,
    _0x12e2e5 = null,
    _0x1eb552 = null,
    _0x58c639 = false
  const _0x3983c1 = () => {}
  _0x35f456.on('ev-cinema:setCinemaSet', (_0x358a75) => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    const _0xc4b61c = exports.isPed.isPed('cid'),
      _0x4d5a8b =
        _0xba1172.type === 'public' ||
        (_0xba1172.type === 'private' && _0xba1172.source === _0xc4b61c)
    if (!_0x4d5a8b) {
      return emit('DoLongHudText', 'You are not permitted to do this.', 2)
    }
    _0x35f456.emitNet('ev-cinema:setCinemaSet', _0x4ec145, _0xba1172.name, _0x358a75.set)
  })
  _0x35f456.onNet('ev-cinema:cinemaSet', (_0x473e39) => {
    _0x48f18b(_0x4ec145, _0x473e39)
  })
  _0x35f456.on('ev-cinema:changeCinemaMode', async () => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    const _0x5a9597 = exports.isPed.isPed('cid'),
      _0x3b69b7 =
        _0xba1172.type === 'public' ||
        (_0xba1172.type === 'private' && _0xba1172.source === _0x5a9597)
    if (!_0x3b69b7) {
      return emit('DoLongHudText', 'You are not permitted to do this.', 2)
    }
    let _0x3395da = null
    if (_0xba1172.mode === 'youtube') {
      const _0x4d05f9 = {
        name: 'url',
        icon: 'clock',
        label: 'URL',
      }
      const _0x814e6b = await _0x179ecf.g.exports['ev-ui'].OpenInputMenu(
        [_0x4d05f9],
        (_0x5864af) => {
          return _0x5864af && _0x5864af.url
        }
      )
      if (!_0x814e6b || !_0x814e6b.url) {
        return
      }
      _0x3395da = _0x814e6b.url
      _0xba1172.mode = 'direct'
    } else {
      _0xba1172.mode = 'youtube'
    }
    _0x35f456.emitNet('ev-cinema:changeCinemaMode', _0x4ec145, _0xba1172.name, _0xba1172.mode,_0x3395da)
  })
  _0x35f456.onNet('ev-cinema:cinemaModeChanged',
    async (_0x1cfb3e, _0x4436cf) => {
      _0x12e2e5 && _0x123cf5()
      _0xba1172.mode = _0x1cfb3e
      const _0x17453a = { mode: _0xba1172.mode }
      exports['ev-ui'].sendAppEvent('cinema-control', _0x17453a)
      exports['ev-ui'].SetUIFocus(false, false)
      RemoveReplaceTexture('xee_news_cinema_txd', 'xee_news_cinema_bigscreen')
      exports['ev-lib'].releaseDui(_0x5d4611.id)
      if (_0x1cfb3e === 'direct') {
        _0xba1172.currentVideo = _0x4436cf
        _0x5d4611 = exports['ev-lib'].getDui(_0x4436cf, 1920, 1080)
        AddReplaceTexture('xee_news_cinema_txd', 'xee_news_cinema_bigscreen', _0x5d4611.dictionary, _0x5d4611.texture)
        return
      }
      _0x5d4611 = exports['ev-lib'].getDui('nui://ev-cinema/html/index.html', 1920, 1080)
      AddReplaceTexture(
        'xee_news_cinema_txd',
        'xee_news_cinema_bigscreen',
        _0x5d4611.dictionary,
        _0x5d4611.texture
      )
      await _0x1ca4ee(200)
      _0x1a723a('reloaded', null)
      await _0x1ca4ee(500)
      const _0x173713 = { url: 'gp5KGYvd-sw' }
      _0x1a723a('set-video', _0x173713)
    }
  )
  _0x35f456.onNet('ev-cinema:changeCinemaUrl', async () => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    const _0x535026 = exports.isPed.isPed('cid'),
      _0x4f7e68 =
        _0xba1172.type === 'public' ||
        (_0xba1172.type === 'private' && _0xba1172.source === _0x535026)
    if (!_0x4f7e68) {
      return emit('DoLongHudText', 'You are not permitted to do this.', 2)
    }
    const _0x3768b3 = {
      name: 'url',
      icon: 'clock',
      label: 'URL',
    }
    const _0x6a8b05 = await _0x179ecf.g.exports['ev-ui'].OpenInputMenu(
      [_0x3768b3],
      (_0x37f2c1) => {
        return _0x37f2c1 && _0x37f2c1.url
      }
    )
    if (!_0x6a8b05 || !_0x6a8b05.url) {
      return
    }
    _0x35f456.emitNet(
      'ev-cinema:changeCinemaUrl',
      _0x4ec145,
      _0xba1172.name,
      _0x6a8b05.url
    )
  })
  _0x35f456.onNet('ev-cinema:cinemaUrlChanged', (_0x31d92e) => {
    _0xba1172.currentVideo = _0x31d92e
    exports['ev-lib'].changeDuiUrl(_0x5d4611.id, _0x31d92e)
  })
  _0x35f456.onNet('ev-cinema:joinedCinema', async (_0xd1438f, _0x936ada, _0x306582) => {
      var _0x4ae820, _0x218eb5
      _0x4ec145 = _0xd1438f
      const _0x91740a = {
        playlist: [],
        pastVideos: [],
        time: 0,
        volume: 50,
      }
      _0xba1172 = Object.assign(_0x91740a, _0x306582)
      await _0xe2c806.execute('ev-datagrid:subscribe', 'cinema')
      emit('DoLongHudText', 'You have joined the cinema')
      const _0x177365 = exports.isPed.isPed('cid'),
        _0x26a2bf =
          _0xba1172.type === 'public' ? true : _0xba1172.source === _0x177365,
        _0x2975d5 = {
          isAllowed: _0x26a2bf,
          show: true,
          volume: _0xba1172.volume,
          playlist: [],
          type: _0xba1172.type,
          mode: _0xba1172.mode,
          canMap: _0xba1172.roomId !== null && _0x26a2bf,
          currentVideo: null,
        }
      _0x179ecf.g.exports['ev-ui'].openApplication('cinema-control', _0x2975d5)
      _0x179ecf.g.exports['ev-ui'].SetUIFocus(false, false)
      _0x52c157()
      _0x498103 = setTick(async () => {
        DisableControlAction(0, 25, true)
        IsDisabledControlJustPressed(0, 25) &&
          _0x179ecf.g.exports['ev-ui'].SetUIFocus(true, true)
      })
      _0xba1172.candidate === GetPlayerServerId(PlayerId()) && _0x410c29()
      _0x48f18b(
        _0x4ec145,
        (_0x4ae820 = _0xba1172.activeSet) !== null && _0x4ae820 !== void 0
          ? _0x4ae820
          : 'Idle'
      )
      await _0x1ca4ee(1000)
      const _0x2a8291 =
        _0xba1172.mode === 'youtube'
          ? 'nui://ev-cinema/html/index.html'
          : _0xba1172.currentVideo
      _0x5d4611 = _0x179ecf.g.exports['ev-lib'].getDui(_0x2a8291, 1920, 1080)
      AddReplaceTexture(
        'xee_news_cinema_txd',
        'xee_news_cinema_bigscreen',
        _0x5d4611.dictionary,
        _0x5d4611.texture
      )
      await _0x1ca4ee(200)
      if (_0xba1172.mode !== 'youtube') {
        return
      }
      const _0x456c20 = {
        url:
          (_0x218eb5 = _0xba1172.currentVideo) !== null && _0x218eb5 !== void 0
            ? _0x218eb5
            : 'gp5KGYvd-sw',
      }
      _0x1a723a('set-video', _0x456c20)
      if (_0xba1172.paused) {
        const _0x7e7354 = { paused: true }
        _0x1a723a('set-paused', _0x7e7354)
      }
      _0x35f456.emitNet(
        'ev-cinema:loadTimeFromCandidate',
        _0x4ec145,
        _0xba1172.name
      )
    }
  )
  _0x35f456.onNet('ev-cinema:getTime', (_0x407bef) => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    _0x35f456.emitNet(
      'ev-cinema:getTimeForCandidate',
      _0x4ec145,
      _0xba1172.name,
      _0xba1172.time,
      _0x407bef
    )
  })
  const _0x410c29 = () => {
    _0x1eb552 = setTick(async () => {
      _0xba1172 &&
        !_0xba1172.paused &&
        _0xba1172.mode === 'youtube' &&
        !_0x58c639 &&
        _0x35f456.emitNet(
          'ev-cinema:syncTime',
          _0x4ec145,
          _0xba1172.currentVideo,
          _0xba1172.name,
          _0xba1172.time
        )
      await _0x1ca4ee(5000)
    })
  }
  _0x35f456.onNet('ev-cinema:resyncTime', (_0x1b10b3, _0x5a15a3) => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    const _0xa66ec4 = _0x1b10b3 - _0xba1172.time
    if (Math.abs(_0xa66ec4) < 5 && !_0x5a15a3) {
      return
    }
    _0xba1172.time = _0x1b10b3
    const _0x13b519 = { time: _0x1b10b3 }
    _0x1a723a('set-time', _0x13b519)
  })
  _0x35f456.on('ev-cinema:leaveCinema', (_0x1beb98) => {
    _0x4ec145 = null
    _0xba1172 = null
    const _0x1ab826 = { show: false }
    _0x179ecf.g.exports['ev-ui'].closeApplication('cinema-control', _0x1ab826)
    _0x52c157()
    RemoveReplaceTexture('xee_news_cinema_txd', 'xee_news_cinema_bigscreen')
    _0x5d4611 && exports['ev-lib'].releaseDui(_0x5d4611.id)
    _0x35f456.emitNet('ev-cinema:leftCinema', _0x1beb98.cinema)
  })
  RegisterUICallback('ev-cinema:changeVolume', (_0x2972fb, _0x21b201) => {
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    _0xba1172.volume = _0x2972fb.volume
    const _0x23bcb4 = { volume: _0x2972fb.volume }
    _0x1a723a('set-volume', _0x23bcb4)
    const _0x2734ef = {
      ok: true,
      message: '',
    }
    const _0x1ff6bd = {
      data: [],
      meta: _0x2734ef,
    }
    _0x21b201(_0x1ff6bd)
  })
  RegisterUICallback('ev-cinema:add', async (_0x49a7c2, _0x5e436c) => {
    const _0x9933d4 = {
      ok: true,
      message: '',
    }
    const _0x4cf9e7 = {
      data: [],
      meta: _0x9933d4,
    }
    _0x5e436c(_0x4cf9e7)
    if (!_0xba1172 || !_0x4ec145 || _0xba1172.mode !== 'youtube') {
      return
    }
    const _0x1991f0 = {
      name: 'url',
      icon: 'link',
      label: 'YouTube URL',
    }
    const _0x59f2bf = await _0x179ecf.g.exports['ev-ui'].OpenInputMenu(
      [_0x1991f0],
      (_0x5e6324) => {
        return _0x5e6324 && _0x5e6324.url
      }
    )
    if (!_0x59f2bf || !_0x59f2bf.url) {
      return
    }
    const [_0x160991, _0x40bf53] = _0x4aecd9(_0x59f2bf.url)
    if (!_0x160991) {
      return
    }
    if (!_0x40bf53) {
      return emit('DoLongHudText', 'Youtube not found in URL, you can only put youtube links in. For other links, switch to direct mode in the back room.',
        2
      )
    }
    _0x35f456.emitNet(
      'ev-cinema:queueVideo',
      _0x4ec145,
      _0xba1172.name,
      _0x160991
    )
  })
  _0x35f456.onNet('ev-cinema:queuedVideo', (_0xe5d3f7, _0x53a411, _0x54494d, _0x4964ae) => {
      emit('DoLongHudText', _0x53a411 + ' added a video to the queue.')
      _0x2ce518(_0x54494d, _0x4964ae)
      _0xba1172.paused &&
        _0xba1172.playlist.length == 1 &&
        _0x5280f7(_0xe5d3f7.video)
    }
  )
  RegisterUICallback('ev-cinema:next', (_0x2db225, _0x5cfac0) => {
    const _0x5e35bf = {
      ok: true,
      message: '',
    }
    const _0x3387dc = {
      data: [],
      meta: _0x5e35bf,
    }
    _0x5cfac0(_0x3387dc)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    if (_0xba1172.playlist.length > 0) {
      return _0x35f456.emitNet(
        'ev-cinema:nextVideoQueued',
        _0x4ec145,
        _0xba1172.name
      )
    }
    emit('DoLongHudText', 'No more videos in the queue.')
  })
  _0x35f456.onNet(
    'ev-cinema:nextVideo',
    (_0x1373c0, _0x3a8f4f, _0x18a6ae, _0x1aceb3) => {
      _0x1aceb3 && emit('DoLongHudText', _0x1aceb3 + ' skipped the video.')
      _0x2ce518(_0x3a8f4f, _0x18a6ae)
      if (_0xba1172.playlist.length == 0) {
        return
      }
      _0x5280f7(_0xba1172.playlist[0].video)
    }
  )
  _0x35f456.onNet('ev-cinema:resetPlaylists', (_0x36207d, _0x37e90c) => {
    _0xba1172.playlist = _0x36207d
    _0xba1172.pastVideos = _0x37e90c
    const _0x408070 = { playlist: _0xba1172.pastVideos }
    exports['ev-ui'].sendAppEvent('cinema-control', _0x408070)
  })
  RegisterUICallback('ev-cinema:playVideo', (_0x3096cd, _0x55c81f) => {
    const _0x24ca22 = {
      ok: true,
      message: '',
    }
    const _0x2bcd3b = {
      data: [],
      meta: _0x24ca22,
    }
    _0x55c81f(_0x2bcd3b)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    _0x35f456.emitNet(
      'ev-cinema:addVideo',
      _0x4ec145,
      _0xba1172.name,
      _0x3096cd.video
    )
  })
  RegisterUICallback('ev-cinema:removeVideo', (_0x4c1227, _0x56782f) => {
    const _0x2c144e = {
      ok: true,
      message: '',
    }
    const _0x4b016e = {
      data: [],
      meta: _0x2c144e,
    }
    _0x56782f(_0x4b016e)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    _0x35f456.emitNet(
      'ev-cinema:removeVideo',
      _0x4ec145,
      _0xba1172.name,
      _0x4c1227.video
    )
  })
  RegisterUICallback('ev-cinema:pause', (_0x4a5fab, _0x367780) => {
    const _0x38c0a7 = {
      ok: true,
      message: '',
    }
    const _0x25011b = {
      data: [],
      meta: _0x38c0a7,
    }
    _0x367780(_0x25011b)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    _0xba1172.paused = true
    const _0x596b8c = { paused: true }
    _0x1a723a('set-paused', _0x596b8c)
    _0x35f456.emitNet('ev-cinema:paused', _0x4ec145, _0xba1172.name, true)
  })
  RegisterUICallback('ev-cinema:play', (_0x1aa3d4, _0x5b5eb5) => {
    const _0x4d312e = {
      ok: true,
      message: '',
    }
    const _0x43a679 = {
      data: [],
      meta: _0x4d312e,
    }
    _0x5b5eb5(_0x43a679)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    _0xba1172.paused = false
    const _0x18bcc5 = { paused: false }
    _0x1a723a('set-paused', _0x18bcc5)
    _0x35f456.emitNet('ev-cinema:paused', _0x4ec145, _0xba1172.name, false)
  })
  _0x35f456.onNet('ev-cinema:paused', (_0x6bd3dd, _0x105c3e) => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    emit(
      'DoLongHudText',
      _0x105c3e + ' ' + (_0x6bd3dd ? 'paused' : 'unpaused') + ' the video.'
    )
    _0xba1172.paused = _0x6bd3dd
    const _0x469ef9 = { paused: _0x6bd3dd }
    _0x1a723a('set-paused', _0x469ef9)
    const _0x2d0d9d = { paused: _0x6bd3dd }
    exports['ev-ui'].sendAppEvent('cinema-control', _0x2d0d9d)
  })
  _0x35f456.onNet(
    'ev-cinema:removeVideo',
    (_0x3b5a65, _0x199038, _0x33c100, _0x489eb9) => {
      if (!_0x4ec145 || !_0xba1172) {
        return
      }
      _0xba1172.playlist = _0x33c100
      _0xba1172.pastVideos = _0x489eb9
      emit('DoLongHudText', _0x199038 + ' removed a video from the queue.')
      const _0x225572 = { playlist: _0xba1172.pastVideos }
      exports['ev-ui'].sendAppEvent('cinema-control', _0x225572)
    }
  )
  RegisterNuiCallbackType('time')
  on('__cfx_nui:time', (_0x5c7ae9, _0x4e04ad) => {
    var _0xf8cc23, _0x45d646
    const _0x5d213e = {
      ok: true,
      message: '',
    }
    const _0x2e5a76 = {
      data: [],
      meta: _0x5d213e,
    }
    _0x4e04ad(_0x2e5a76)
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    _0xba1172.time = _0x5c7ae9.time
    exports['ev-ui'].sendAppEvent('cinema-control', {
      percentage:
        (_0x45d646 =
          (_0xf8cc23 = _0x5c7ae9.percentage) === null || _0xf8cc23 === void 0
            ? void 0
            : _0xf8cc23.toFixed(2)) !== null && _0x45d646 !== void 0
          ? _0x45d646
          : 0,
    })
  })
  RegisterUICallback('ev-cinema:advance', (_0x43052b, _0x1c0acf) => {
    const _0x1d650e = {
      ok: true,
      message: '',
    }
    const _0x4f6046 = {
      data: [],
      meta: _0x1d650e,
    }
    _0x1c0acf(_0x4f6046)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    _0x58c639 = true
    _0x35f456.emitNet(
      'ev-cinema:setTime',
      _0x4ec145,
      _0xba1172.name,
      _0xba1172.currentVideo,
      _0xba1172.time + _0x43052b.seconds
    )
  })
  RegisterUICallback('ev-cinema:seek', async (_0xb81831, _0x53bca8) => {
    var _0x4581e1, _0x5a5e2b
    const _0x4a2741 = {
      ok: true,
      message: '',
    }
    const _0x4535ed = {
      data: [],
      meta: _0x4a2741,
    }
    _0x53bca8(_0x4535ed)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    await _0x1ca4ee(200)
    const _0x51795f = await _0x179ecf.g.exports['ev-ui'].OpenInputMenu(
      [
        {
          name: 'time',
          icon: 'clock',
          label: 'Time',
          _defaultValue:
            (_0x5a5e2b =
              (_0x4581e1 = _0xba1172.time) === null || _0x4581e1 === void 0
                ? void 0
                : _0x4581e1.toFixed(0)) !== null && _0x5a5e2b !== void 0
              ? _0x5a5e2b
              : 0,
        },
      ],
      (_0x1fb66a) => {
        return _0x1fb66a && _0x1fb66a.time
      }
    )
    if (!_0x51795f || !_0x51795f.time) {
      return
    }
    const _0x418e72 = parseInt(_0x51795f.time)
    if (!_0x418e72) {
      return
    }
    _0x58c639 = true
    _0x35f456.emitNet(
      'ev-cinema:setTime',
      _0x4ec145,
      _0xba1172.name,
      _0xba1172.currentVideo,
      _0x418e72
    )
  })
  _0x35f456.onNet('ev-cinema:timeSet', (_0x526446, _0x214ac9) => {
    emit(
      'DoLongHudText',
      _0x214ac9 + ' advanced the video to ' + _0x526446.toFixed(0) + ' seconds.'
    )
    _0x58c639 = false
    _0xba1172.time = _0x526446
    const _0x277ffe = { time: _0x526446 }
    _0x1a723a('set-time', _0x277ffe)
  })
  _0x35f456.onNet('ev-cinema:candidateChanged', (_0x57a4c8, _0x3d7387) => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    _0xba1172.candidate = _0x57a4c8
    if (_0x3d7387 === GetPlayerServerId(PlayerId())) {
      if (_0x1eb552) {
        clearTick(_0x1eb552)
        _0x1eb552 = null
      }
      return
    }
    _0x57a4c8 === GetPlayerServerId(PlayerId()) && _0x410c29()
  })
  RegisterUICallback('ev-cinema:viewPlaylist', (_0x592dbc, _0x4330b6) => {
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      const _0x248173 = {
        playlist: [],
        currentVideo: null,
      }
      const _0x41722d = {
        ok: true,
        message: '',
      }
      const _0x12a29a = {}
      return (
        (_0x12a29a.data = _0x248173),
        (_0x12a29a.meta = _0x41722d),
        _0x4330b6(_0x12a29a)
      )
    }
    const _0x425ec8 = {
      playlist: _0xba1172.pastVideos,
      currentVideo: _0xba1172.currentVideo,
    }
    const _0x9ce2af = {
      ok: true,
      message: '',
    }
    const _0x47befe = {
      data: _0x425ec8,
      meta: _0x9ce2af,
    }
    _0x4330b6(_0x47befe)
  })
  RegisterUICallback('ev-cinema:camera', (_0x293dbc, _0x17e05e) => {
    const _0x3dddb3 = {
      ok: true,
      message: '',
    }
    const _0x4c82de = {
      data: [],
      meta: _0x3dddb3,
    }
    _0x17e05e(_0x4c82de)
    if (!_0x4ec145 || !_0xba1172 || _0xba1172.mode !== 'youtube') {
      return
    }
    _0x123cf5()
  })
  const _0x123cf5 = () => {
    if (_0x12e2e5) {
      SetCamActive(_0x12e2e5, false)
      DestroyCam(_0x12e2e5, false)
      RenderScriptCams(false, false, 0, true, false)
      _0x12e2e5 = null
      return
    }
    const _0x1f6e2d = _0x4f271b(),
      _0x3ab460 = _0x1f6e2d.locations.find(
        (_0x14aa20) => _0x14aa20.id == _0x4ec145
      )
    if (!_0x3ab460) {
      return
    }
    _0x12e2e5 = CreateCamWithParams(
      'DEFAULT_SCRIPTED_CAMERA',
      _0x3ab460.camera.x,
      _0x3ab460.camera.y,
      _0x3ab460.camera.z,
      _0x3ab460.camera.rotation[0],
      _0x3ab460.camera.rotation[1],
      _0x3ab460.camera.rotation[2],
      _0x3ab460.camera.fov,
      false,
      0
    )
    SetCamActive(_0x12e2e5, true)
    RenderScriptCams(true, false, 0, true, true)
  }
  RegisterNuiCallbackType('end')
  on('__cfx_nui:end', (_0x3394e8, _0x4ad9c3) => {
    const _0x131eec = {
      ok: true,
      message: '',
    }
    const _0x4ce299 = {
      data: [],
      meta: _0x131eec,
    }
    _0x4ad9c3(_0x4ce299)
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    _0xba1172.paused = true
    if (_0x3394e8.currentVideo !== _0xba1172.currentVideo) {
      return
    }
    _0x35f456.emitNet('ev-cinema:videoEnded',
      _0x4ec145,
      _0xba1172.name,
      _0xba1172.currentVideo
    )
  })
  on('ev-ui:restarted', () => {
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    const _0x481f97 = exports.isPed.isPed('cid'),
      _0x27fb1b =
        _0xba1172.type === 'public' ? true : _0xba1172.source === _0x481f97,
      _0x229eca = {
        isAllowed: _0x27fb1b,
        show: true,
        volume: _0xba1172.volume,
        playlist: [],
        type: _0xba1172.type,
        mode: _0xba1172.mode,
        canMap: _0xba1172.roomId !== null && _0x27fb1b,
        currentVideo: null,
      }
    _0x179ecf.g.exports['ev-ui'].openApplication('cinema-control', _0x229eca)
  })
  const _0x5280f7 = (_0x281b11) => {
      _0xba1172.paused = false
      _0xba1172.currentVideo = _0x281b11
      const _0x304d97 = { url: _0x281b11 }
      _0x1a723a('set-video', _0x304d97)
      const _0x20e140 = { volume: _0xba1172.volume }
      _0x1a723a('set-volume', _0x20e140)
      const _0x564336 = {
        paused: false,
        currentVideo: _0x281b11,
        percentage: 0,
      }
      exports['ev-ui'].sendAppEvent('cinema-control', _0x564336)
    },
    _0x2ce518 = (_0x2a8916, _0x338d54) => {
      _0xba1172.playlist = _0x2a8916
      _0xba1172.pastVideos = _0x338d54
      const _0x46d6eb = { playlist: _0x338d54 }
      exports['ev-ui'].sendAppEvent('cinema-control', _0x46d6eb)
    },
    _0x1a723a = (_0x5291f2, _0x49447d) => {
      const _0x212e63 = {
        resource: 'ev-cinema',
        type: _0x5291f2,
        data: _0x49447d,
      }
      exports['ev-lib'].sendDuiMessage(_0x5d4611.id, _0x212e63)
    },
    _0x52c157 = () => {
      if (_0x498103) {
        clearInterval(_0x498103)
      }
      if (_0x1eb552) {
        clearInterval(_0x1eb552)
      }
    }
  on('onResourceStop', (_0x59bbe4) => {
    if (_0x59bbe4 !== 'ev-cinema') {
      return
    }
    _0x52c157()
    RemoveReplaceTexture('xee_news_cinema_txd', 'xee_news_cinema_bigscreen')
    if (_0x5d4611) {
      exports['ev-lib'].releaseDui(_0x5d4611.id)
    }
  })
  let _0x5a69b8 = true
  const _0x2ae8e4 = () => {
    for (const _0x8e6e6c of _0x4f271b().locations) {
      if (!_0x8e6e6c.enabled) {
        continue
      }
      _0x22cf4e(_0x8e6e6c)
    }
    const _0x168c24 = {
      x: -593.54,
      y: -920.54,
      z: 23.78,
    }
    const _0x541e34 = {
      heading: 0,
      minZ: 22.83,
      maxZ: 25.83,
    }
    exports['ev-polyzone'].AddBoxZone('lsbn_entry', _0x168c24, 4, 5, _0x541e34)
  }
  on('ev-polyzone:enter', async (_0x1e13f6) => {
    if (_0x1e13f6 !== 'lsbn_entry') {
      return
    }
    const _0x18e525 = await _0xe2c806.execute('ev-cinema:isCreationOpen')
    _0x5a69b8 = _0x18e525
  })
  _0x35f456.onNet('ev-cinema:creationToggled', (_0x1f80db) => {
    _0x5a69b8 = _0x1f80db
  })
  const _0x4f271b = () => {
      return _0x55353b('ev-cinema:main')
    },
    _0x22cf4e = (_0x3591a6) => {
      const _0x1fa26e = { cinema: _0x3591a6.id }
      const _0x1ff6a2 = {
        CPXEvent: 'ev-cinema:getActiveCinemas',
        id: 'cinema_getactive',
        icon: 'box-open',
        label: 'go to cinema',
        parameters: _0x1fa26e,
      }
      const _0x332ea6 = { cinema: _0x3591a6.id }
      const _0xf4f242 = {
        CPXEvent: 'ev-cinema:manageRooms',
        id: 'cinema_manage',
        icon: 'cog',
        label: 'manage created rooms',
        parameters: _0x332ea6,
      }
      const _0x582d27 = [_0x1ff6a2, _0xf4f242],
        _0x493a52 = { cinema: _0x3591a6.id }
      const _0x1ec960 = {
        CPXEvent: 'ev-cinema:openCinema',
        id: 'cinema_open',
        icon: 'box-open',
        label: 'start your own room ($10000)',
        parameters: _0x493a52,
      }
      const _0x4d6c5d = [_0x1ec960],
        _0x11656d = {
          CPXEvent: 'ev-cinema:toggleCinemaCreation',
          id: 'cinema_togglecreation',
          icon: 'times-circle',
          label: 'toggle cinema creation',
        }
      const _0x5b3c69 = [_0x11656d]
      if (_0x3591a6.id === 'cinema') {
        const _0x397d5e = { radius: 1.5 }
        globalThis.exports['ev-interact'].AddPeekEntryByPolyTarget('ev-doors:elevator',
          _0x582d27,
          {
            distance: _0x397d5e,
            isEnabled: () => {
              const _0x21fc15 = GetEntityCoords(PlayerPedId(), false),
                _0x331a43 = _0x3591a6.exitPosition
              return (
                GetDistanceBetweenCoords(
                  _0x21fc15[0],
                  _0x21fc15[1],
                  _0x21fc15[2],
                  _0x331a43.x,
                  _0x331a43.y,
                  _0x331a43.z,
                  true
                ) < 3
              )
            },
          }
        )
        const _0x34f38e = { radius: 1.5 }
        globalThis.exports['ev-interact'].AddPeekEntryByPolyTarget('ev-doors:elevator',
          _0x4d6c5d,
          {
            distance: _0x34f38e,
            isEnabled: () => {
              const _0x4f25ee = GetEntityCoords(PlayerPedId(), false),
                _0x1e0274 = _0x3591a6.exitPosition
              return (
                _0x5a69b8 &&
                GetDistanceBetweenCoords(
                  _0x4f25ee[0],
                  _0x4f25ee[1],
                  _0x4f25ee[2],
                  _0x1e0274.x,
                  _0x1e0274.y,
                  _0x1e0274.z,
                  true
                ) < 3
              )
            },
          }
        )
        const _0xe52620 = { radius: 1.5 }
        globalThis.exports['ev-interact'].AddPeekEntryByPolyTarget('ev-doors:elevator',
          _0x5b3c69,
          {
            distance: _0xe52620,
            isEnabled: async () => {
              const _0x2aada6 = GetEntityCoords(PlayerPedId(), false),
                _0x270a52 = _0x3591a6.exitPosition,
                _0x50b48d = await _0x179ecf.g.exports['ev-business'].IsEmployedAt('lsbn')
              return (
                _0x50b48d &&
                GetDistanceBetweenCoords(
                  _0x2aada6[0],
                  _0x2aada6[1],
                  _0x2aada6[2],
                  _0x270a52.x,
                  _0x270a52.y,
                  _0x270a52.z,
                  true
                ) < 3
              )
            },
          }
        )
      } else {
        globalThis.exports['ev-polytarget'].AddBoxZone(
          _0x3591a6.prefix + '_' + _0x3591a6.id,
          _0x3591a6.polytarget.position,
          _0x3591a6.polytarget.width,
          _0x3591a6.polytarget.length,
          {
            heading: _0x3591a6.polytarget.heading,
            minZ: _0x3591a6.polytarget.minZ,
            maxZ: _0x3591a6.polytarget.maxZ,
          }
        )
        const _0x17f7cf = { radius: 2 }
        const _0x351b04 = {
          distance: _0x17f7cf,
          isEnabled: () => true,
        }
        globalThis.exports['ev-interact'].AddPeekEntryByPolyTarget(
          _0x3591a6.prefix + '_' + _0x3591a6.id,
          _0x582d27,
          _0x351b04
        )
      }
      globalThis.exports['ev-polytarget'].AddBoxZone(
        _0x3591a6.prefix + '_' + _0x3591a6.id + '_exit',
        _0x3591a6.exit.position,
        _0x3591a6.exit.width,
        _0x3591a6.exit.length,
        {
          heading: _0x3591a6.exit.heading,
          minZ: _0x3591a6.exit.minZ,
          maxZ: _0x3591a6.exit.maxZ,
        }
      )
      const _0x1b514c = { radius: 2 }
      const _0x1a48d7 = {
        distance: _0x1b514c,
        isEnabled: () => true,
      }
      globalThis.exports['ev-interact'].AddPeekEntryByPolyTarget(
        _0x3591a6.prefix + '_' + _0x3591a6.id + '_exit',
        [
          {
            CPXEvent: 'ev-cinema:leaveCinema',
            id: 'cinema_leave',
            icon: 'box-open',
            label: 'leave cinema',
            parameters: { cinema: _0x3591a6.id },
          },
        ],
        _0x1a48d7
      )
      if (_0x3591a6.sets) {
        globalThis.exports['ev-polytarget'].AddBoxZone(
          _0x3591a6.prefix + '_' + _0x3591a6.id + '-sets',
          _0x3591a6.sets.polytarget.position,
          _0x3591a6.sets.polytarget.width,
          _0x3591a6.sets.polytarget.length,
          {
            heading: _0x3591a6.sets.polytarget.heading,
            minZ: _0x3591a6.sets.polytarget.minZ,
            maxZ: _0x3591a6.sets.polytarget.maxZ,
          }
        )
        const _0x10b729 = {
          CPXEvent: 'ev-cinema:changeCinemaMode',
          id: _0x3591a6.prefix + '_' + _0x3591a6.id + '-mode',
          icon: 'box-open',
          label: 'Change cinema mode',
          parameters: {},
        }
        _0x10b729.parameters.cinema = _0x3591a6.id
        _0x10b729.parameters.set = null
        const _0x36f168 = {
          CPXEvent: 'ev-cinema:changeCinemaUrl',
          id: _0x3591a6.prefix + '_' + _0x3591a6.id + '-modeurl',
          icon: 'box-open',
          label: 'Change cinema URL (if mode is direct)',
          parameters: {},
        }
        _0x36f168.parameters.cinema = _0x3591a6.id
        _0x36f168.parameters.set = null
        const _0x15f639 = [_0x10b729, _0x36f168]
        for (const _0x250a41 of Object.keys(_0x3591a6.sets.variants)) {
          const _0x3e93b9 = {
            CPXEvent: 'ev-cinema:setCinemaSet',
            id: _0x3591a6.prefix + '_' + _0x3591a6.id + '-set_' + _0x250a41,
            icon: 'box-open',
            label: _0x3591a6.sets.variants[_0x250a41],
            parameters: {},
          }
          _0x3e93b9.parameters.cinema = _0x3591a6.id
          _0x3e93b9.parameters.set = _0x250a41
          _0x15f639.push(_0x3e93b9)
        }
        const _0x54743e = { radius: 2 }
        const _0x31b610 = {
          distance: _0x54743e,
          isEnabled: () => _0x4ec145,
        }
        globalThis.exports['ev-interact'].AddPeekEntryByPolyTarget(
          _0x3591a6.prefix + '_' + _0x3591a6.id + '-sets',
          _0x15f639,
          _0x31b610
        )
      }
    },
    _0x48f18b = (_0x51b2f6, _0x3cd207) => {
      const _0x2d16ae = _0x4f271b(),
        _0x138b0a = _0x2d16ae.locations.find(
          (_0x420ec6) => _0x420ec6.id === _0x51b2f6
        )
      if (!_0x138b0a) {
        return
      }
      const _0x4e1342 = GetInteriorAtCoords(-592.36, -940.03, -7.22)
      if (_0x138b0a.sets) {
        for (const _0x4bd1fd of Object.keys(_0x138b0a.sets.variants)) {
          DeactivateInteriorEntitySet(_0x4e1342, _0x4bd1fd)
        }
        ActivateInteriorEntitySet(_0x4e1342, _0x3cd207)
      }
      RefreshInterior(_0x4e1342)
    }
  _0x35f456.on('ev-cinema:getActiveCinemas', async (data) => {
    if (!data.cinema) {
      return
    }
    const _0x22166b = await _0xe2c806.execute('ev-cinema:getActiveCinemas', data.cinema)
    if (!_0x22166b) {
      return
    }
    const _0x591b4a = _0x22166b.map((_0x24f0b4) => {
      return {
        icon: 'door-open',
        title: _0x24f0b4.name,
        titleRight: _0x24f0b4.members.toString(),
        action: 'ev-cinema:joinCinema',
        key: {
          cinema: data.cinema,
          room: _0x24f0b4.name,
          has_password: _0x24f0b4.has_password,
        },
        disabled: false,
      }
    })
    if (_0x591b4a.length === 0) {
      const _0x10acec = {
        icon: 'door-open',
        title: 'No active rooms',
        action: '',
        key: {},
      }
      _0x591b4a.push(_0x10acec)
    }
    _0x179ecf.g.exports['ev-ui'].showContextMenu(_0x591b4a)
  })
  RegisterUICallback('ev-cinema:joinCinema', async (data, cb) => {
    const _0x21791c = {
      ok: true,
      message: '',
    }
    const _0x53f0bd = {
      data: [],
      meta: _0x21791c,
    }
    cb(_0x53f0bd)
    if (!data.key.cinema || !data.key.room) {
      return
    }
    let _0x53f2bd = null
    const _0x467976 = await _0x179ecf.g.exports['ev-business'].IsEmployedAt('lsbn')
    if (data.key.has_password && !_0x467976) {
      await _0x1ca4ee(100)
      const _0x391dc9 = {
        name: 'password',
        icon: 'password',
        label: 'Cinema password',
        type: 'password',
      }
      _0x391dc9['_type'] = 'password'
      const _0x41ea91 = await _0x179ecf.g.exports['ev-ui'].OpenInputMenu(
        [_0x391dc9],
        (_0x31e9f7) => {
          return _0x31e9f7 && _0x31e9f7.password
        }
      )
      if (!_0x41ea91 || !_0x41ea91.password) {
        return
      }
      _0x53f2bd = _0x41ea91.password
    }
    const _0xa4a7db = await _0xe2c806.execute(
      'ev-cinema:joinCinema',
      data.key.cinema,
      _0x467976,
      data.key.room,
      _0x53f2bd
    )
    if (!_0xa4a7db) {
      return emit(
        'DoLongHudText',
        'Could not join room, make sure the password is correct if there is one.',
        2
      )
    }
    emit('DoLongHudText', 'Joined room...Please wait')
  })
  _0x35f456.on('ev-cinema:openCinema', async (_0x2c8533) => {
    if (!_0x2c8533.cinema) {
      return
    }
    const _0x2db845 = await _0xe2c806.execute('ev-cinema:getUserRooms', _0x2c8533.cinema),
      _0x446059 = {
        id: 'ignore',
        name: 'Skip setup creation',
      }
    const _0x12c281 = {
      id: 'new',
      name: 'Create new room setup',
    }
    const _0x2df34d = [_0x446059, _0x12c281]
    for (const _0xe9fa4b of _0x2db845) {
      _0x2df34d.push({
        id: _0xe9fa4b.id.toString(),
        name: _0xe9fa4b.name,
      })
    }
    const _0x1c13fe = {
      name: 'name',
      icon: 'pencil-alt',
      label: 'Cinema Name',
    }
    const _0x3b7149 = {
      name: 'password',
      icon: 'password',
      label: 'Cinema password (leave blank if open)',
      type: 'password',
    }
    _0x3b7149['_type'] = 'password'
    const _0x5cc040 = {
      id: 'public',
      name: 'Public (everybody can queue)',
    }
    const _0x1178cb = {
      id: 'private',
      name: 'Private (only creator can queue)',
    }
    const _0x566255 = {
      name: 'type',
      icon: 'list',
      label: 'Cinema type',
      type: 'select',
      options: [_0x5cc040, _0x1178cb],
    }
    _0x566255['_type'] = 'select'
    const _0x2f9dce = {
      name: 'setup',
      icon: 'list',
      label: 'Cinema setup',
      type: 'select',
      options: _0x2df34d,
    }
    _0x2f9dce['_type'] = 'select'
    const _0x2df77e = await _0x179ecf.g.exports['ev-ui'].OpenInputMenu(
      [_0x1c13fe, _0x3b7149, _0x566255, _0x2f9dce],
      (_0x2b6bf3) => {
        return _0x2b6bf3 && _0x2b6bf3.name && _0x2b6bf3.type && _0x2b6bf3.setup
      }
    )
    if (!_0x2df77e || !_0x2df77e.name || !_0x2df77e.type || !_0x2df77e.setup) {
      return
    }
    const _0x44fbdf = await _0x179ecf.g.exports['ev-business'].IsEmployedAt('lsbn'),
      _0x33f462 = await _0xe2c806.execute(
        'ev-cinema:openCinema',
        _0x2c8533.cinema,
        _0x2df77e.type,
        _0x2df77e.setup,
        _0x44fbdf,
        _0x2df77e.name,
        _0x2df77e.password
      )
    if (!_0x33f462) {
      return
    }
    emit('DoLongHudText', 'Cinema opened. You can join it now.')
  })
  _0x35f456.on('ev-cinema:manageRooms', async (_0x492a7b) => {
    if (!_0x492a7b.cinema) {
      return
    }
    const _0x4d7920 = await _0xe2c806.execute(
        'ev-cinema:getUserRooms',
        _0x492a7b.cinema
      ),
      _0x3fb9b1 = _0x4d7920.map((_0x12930c) => {
        const _0x4695be = {
          icon: 'times-circle',
          title: 'Cancel',
        }
        const _0x2ef386 = {}
        return (
          (_0x2ef386.icon = 'projector'),
          (_0x2ef386.title = _0x12930c.name),
          (_0x2ef386.disabled = false),
          (_0x2ef386.children = [
            {
              icon: 'trash',
              title: 'Delete room',
              action: 'ev-cinema:deleteRoom',
              key: {
                cinema: _0x492a7b.cinema,
                room: _0x12930c.id,
              },
            },
            _0x4695be,
          ]),
          _0x2ef386
        )
      })
    if (_0x3fb9b1.length === 0) {
      const _0x15cf7d = {
        icon: 'projector',
        title: 'No created rooms',
        action: '',
        disabled: true,
        key: {},
      }
      _0x3fb9b1.push(_0x15cf7d)
    }
    _0x179ecf.g.exports['ev-ui'].showContextMenu(_0x3fb9b1)
  })
  RegisterUICallback('ev-cinema:deleteRoom', async (data) => {
    if (!data.key.cinema || !data.key.room) {
      return
    }
    const _0x18a280 = await _0xe2c806.execute('ev-cinema:deleteRoom', data.key.cinema, data.key.room)
    if (!_0x18a280) {
      return emit('DoLongHudText', 'Could not delete room', 2)
    }
    emit('DoLongHudText', 'Room deleted')
  })
  _0x35f456.on('ev-cinema:toggleCinemaCreation', async () => {
    const _0x317288 = await _0x179ecf.g.exports['ev-business'].IsEmployedAt('lsbn')
    if (!_0x317288) {
      return emit('DoLongHudText', 'You are not employed at the cinema', 2)
    }
    _0xe2c806.execute('ev-cinema:toggleCreation')
  })
  async function _0x413fda() {}
  const _0x5d9095 = () => {}
  RegisterUICallback('ev-cinema:map', async (data, cb) => {
    const _0x29dcaf = {
      ok: true,
      message: '',
    }
    const _0x4981c0 = {
      data: [],
      meta: _0x29dcaf,
    }
    cb(_0x4981c0)
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    await _0x1ca4ee(100)
    const _0x4ba22e = _0x520d69(
        LoadResourceFile(GetCurrentResourceName(), 'client/hashes.json')
      ),
      _0x33e34d = {
        icon: 'times-circle',
        title: 'Remove Objects',
        action: 'ev-cinema:removeObjects',
      }
    const _0x36195b = [_0x33e34d]
    for (const _0xd9ba7c of Object.keys(_0x4ba22e)) {
      const _0x29151f = {
        icon: 'pencil-alt',
        title: _0xd9ba7c,
        action: 'ev-cinema:openMapCategory',
        key: {},
      }
      _0x29151f.key.name = _0xd9ba7c
      _0x36195b.push(_0x29151f)
    }
    exports['ev-ui'].showContextMenu(_0x36195b)
  })
  RegisterUICallback('ev-cinema:removeObjects', async (data, cb) => {
      const _0x4cc22d = {
        ok: true,
        message: '',
      }
      const _0xb2e63 = {
        data: [],
        meta: _0x4cc22d,
      }
      cb(_0xb2e63)
      if (!_0x4ec145 || !_0xba1172) {
        return
      }
      _0x179ecf.g.exports['ev-selector'].startSelecting(-1, PlayerPedId(), () => true)
      const _0x173afe = setTick(async () => {
        if (IsControlJustReleased(0, 38)) {
          const { selectedEntity: _0x1c9713 } = _0x179ecf.g.exports['ev-selector'].getCurrentSelection()
          _0x5813bc(_0x1c9713)
          _0x179ecf.g.exports['ev-selector'].stopSelecting()
          _0x179ecf.g.exports['ev-selector'].deselect()
          clearTick(_0x173afe)
        }
        IsControlJustPressed(0, 202) &&
          (_0x179ecf.g.exports['ev-selector'].stopSelecting(),
          _0x179ecf.g.exports['ev-selector'].deselect(),
          clearTick(_0x173afe))
        await _0x1ca4ee(1)
      })
    }
  )
  const _0x5813bc = (_0x5841e4) => {
    if (!_0x5841e4) {
      return
    }
    const _0x27bdc3 = exports['ev-objects'].GetObjectByEntity(_0x5841e4)
    if (!_0x27bdc3) {
      return
    }
    if (_0x27bdc3.ns !== 'cinema') {
      return
    }
    exports['ev-objects'].DeleteObject(_0x27bdc3.id)
  }
  RegisterUICallback('ev-cinema:openMapCategory', async (data, cb) => {
      const _0x48f114 = {
        ok: true,
        message: '',
      }
      const _0x355d56 = {
        data: [],
        meta: _0x48f114,
      }
      cb(_0x355d56)
      if (!_0x4ec145 || !_0xba1172) {
        return
      }
      await _0x1ca4ee(100)
      const _0x1bf1e1 = _0x520d69(
          LoadResourceFile(GetCurrentResourceName(), 'client/hashes.json')
        ),
        _0x4afb83 = []
      for (const _0x1d08f1 of _0x1bf1e1[data.key.name]) {
        const _0x26c39a = {
          icon: 'pencil-alt',
          title: _0x1d08f1,
          action: 'ev-cinema:placeObject',
          key: {},
        }
        _0x26c39a.key.hash = _0x1d08f1
        _0x4afb83.push(_0x26c39a)
      }
      exports['ev-ui'].showContextMenu(_0x4afb83)
    }
  )
  RegisterUICallback('ev-cinema:placeObject', async (data, cb) => {
    const _0x38c985 = {
      ok: true,
      message: '',
    }
    const _0x359e66 = {
      data: [],
      meta: _0x38c985,
    }
    cb(_0x359e66)
    if (!_0x4ec145 || !_0xba1172) {
      return
    }
    const _0x2603bb = GetHashKey(data.key.hash),
      _0xba14fa = {
        cinema: _0x4ec145,
        roomId: _0xba1172.roomId,
      }
    const _0x20ada5 = {
      collision: false,
      groundSnap: true,
      adjustZ: false,
      distance: 3,
      surfaceOffset: 0.1,
    }
    const _0x3618fc = await _0x179ecf.g.exports['ev-objects'].PlaceAndSaveObject(_0x2603bb, _0xba14fa, _0x20ada5, () => true, 'cinema')
    if (!_0x3618fc) {
      return
    }
  })
  _0x35f456.on('ev-cinema:removeCinemaObject', (_0x335941, _0x10f487, _0x27929e) => {
      var _0x47db25, _0x5d36dd, _0x17a569, _0x6f80b
      if (
        ((_0x47db25 = _0x27929e === null || _0x27929e === void 0
            ? void 0
            : _0x27929e.meta) === null || _0x47db25 === void 0
          ? void 0
          : _0x47db25.ns) !== 'cinema'
      ) {
        return
      }
      if (
        ((_0x6f80b =
          (_0x17a569 =
            (_0x5d36dd =
              _0x27929e === null || _0x27929e === void 0
                ? void 0
                : _0x27929e.meta) === null || _0x5d36dd === void 0
              ? void 0
              : _0x5d36dd.data) === null || _0x17a569 === void 0
            ? void 0
            : _0x17a569.metadata) === null || _0x6f80b === void 0
          ? void 0
          : _0x6f80b.cinema) !== _0x4ec145
      ) {
        return
      }
      exports['ev-objects'].DeleteObject(_0x27929e.meta.id)
    }
  )
  async function _0x44b4b5() {
    await _0x22395f()
    await _0x413fda()
    await _0x10d8dd.waitForCondition(
      () => _0x179ecf.g.exports['ev-config'].IsConfigReady(),
      5000
    )
    _0x2ae8e4()
    _0x3983c1()
    _0x5d9095()
  }
  ;(async () => {
    await _0x44b4b5()
  })()
})()
