;(() => {
  var _0x33c37e = {
      487: (_0x335fb2, _0x419269, _0x333947) => {
        const _0x732340 = {
          shop_register: 'prop_till_01',
          shop_safe: 'p_v_43_safe_s',
          shop_tray: 'v_ind_cs_tray01',
          shop_supply_boxes: 'prop_boxpile_01a',
          shop_dish: 'v_res_fa_chopbrd',
          shop_fridge: 'v_res_fridgemodsml_np',
          shop_manage_board: 'prop_cash_depot_billbrd',
        }
        const _0xac35ff = _0x732340,
          _0x1a5541 = async (_0x2debd2, _0x32feda, _0x154087) => {
            const _0x1a26d1 = {
              groundSnap: true,
              distance: 10,
              allowEditorPlacement: true,
              forceHousePlacement: true,
            }
            const _0x57af57 = await _0x333947.g.exports[
              'np-objects'
            ].PlaceAndSaveObject(GetHashKey(_0x2debd2), {}, _0x1a26d1)
            if (!_0x57af57) {
              return
            }
            emit('inventory:removeItemBySlot', _0x32feda, 1, _0x154087)
          }
        on(
          'np-inventory:itemUsed',
          (_0x52daea, _0x1fe52d, _0x332b77, _0x4eb72a) => {
            const _0x2b934c = _0xac35ff[_0x52daea]
            if (!_0x2b934c) {
              return
            }
            _0x1a5541(_0x2b934c, _0x52daea, _0x4eb72a)
          }
        )
      },
    },
    _0x4b4bcb = {}
  function _0x173184(_0x586584) {
    var _0x3e0ef5 = _0x4b4bcb[_0x586584]
    if (_0x3e0ef5 !== undefined) {
      return _0x3e0ef5.exports
    }
    const _0x36eef5 = { exports: {} }
    var _0x56bbef = (_0x4b4bcb[_0x586584] = _0x36eef5)
    return (
      _0x33c37e[_0x586584](_0x56bbef, _0x56bbef.exports, _0x173184),
      _0x56bbef.exports
    )
  }
  ;(() => {
    _0x173184.g = (function () {
      if (typeof globalThis === 'object') {
        return globalThis
      }
      try {
        return this || new Function('return this')()
      } catch (_0x22af99) {
        if (typeof window === 'object') {
          return window
        }
      }
    })()
  })()
  var _0x350a2c = {}
  ;(() => {
    'use strict'
    let _0x32df14 = exports['np-config'].GetModuleConfig('main')
    const _0x51b7b4 = new Map(),
      _0x1b0227 = GetCurrentResourceName()
    async function _0x44162f() {}
    on('np-config:configLoaded', (_0x4b5269, _0x5c1367) => {
      if (_0x4b5269 === 'main') {
        _0x32df14 = _0x5c1367
      } else {
        if (_0x51b7b4.has(_0x4b5269)) {
          _0x51b7b4.set(_0x4b5269, _0x5c1367)
        }
      }
    })
    function _0x29083c(_0x5da1d2) {
      return _0x32df14[_0x5da1d2]
    }
    function _0x23caeb(_0x8db7f9, _0x2a3b36) {
      if (!_0x51b7b4.has(_0x8db7f9)) {
        const _0x443949 = exports['np-config'].GetModuleConfig(_0x8db7f9)
        if (_0x443949 === undefined) {
          return
        }
        _0x51b7b4.set(_0x8db7f9, _0x443949)
      }
      const _0x9339ba = _0x51b7b4.get(_0x8db7f9)
      return _0x2a3b36
        ? _0x9339ba === null || _0x9339ba === void 0
          ? void 0
          : _0x9339ba[_0x2a3b36]
        : _0x9339ba
    }
    function _0x4fbd64(_0x1a53b5) {
      return _0x23caeb(_0x1b0227, _0x1a53b5)
    }
    const _0x2a599e = globalThis.CPX,
      _0x117b43 = _0x2a599e.Hud,
      _0x578159 = _0x2a599e.Utils,
      _0x1a2ce0 = _0x2a599e.Zones,
      _0x2eeff5 = _0x2a599e.Events,
      _0x2f9dbd = _0x2a599e.Streaming,
      _0x235a87 = _0x2a599e.Procedures,
      _0x200380 = _0x2a599e.Interface,
      _0x569ad4 = null && _0x2a599e
    async function _0x2657d8(_0x41c5fe) {
      return new Promise((_0x10ccf2) =>
        setTimeout(() => _0x10ccf2(), _0x41c5fe)
      )
    }
    var _0x2506b0
    ;(function (_0x16a0e3) {
      _0x16a0e3[(_0x16a0e3.paper = 0)] = 'paper'
      _0x16a0e3[(_0x16a0e3.textile = 1)] = 'textile'
      _0x16a0e3[(_0x16a0e3.food = 2)] = 'food'
      _0x16a0e3[(_0x16a0e3.import = 3)] = 'import'
      _0x16a0e3[(_0x16a0e3.metal = 4)] = 'metal'
      _0x16a0e3[(_0x16a0e3.electronic = 5)] = 'electronic'
    })(_0x2506b0 || (_0x2506b0 = {}))
    var _0x42fe30
    ;(function (_0x300b05) {
      _0x300b05.paper = 'Papers'
      _0x300b05.textile = 'Textiles'
      _0x300b05.food = 'Foods'
      _0x300b05.import = 'Imports'
      _0x300b05.metal = 'Metals'
      _0x300b05.electronic = 'Electronics'
    })(_0x42fe30 || (_0x42fe30 = {}))
    const _0xe9c63 = {
      paper: 25,
      textile: 25,
      food: 25,
      import: 25,
      metal: 25,
      electronic: 25,
    }
    const _0x43aa4a = _0xe9c63,
      _0x297200 = {
        paper: 'sticky-note',
        textile: 'tshirt',
        food: 'apple-alt',
        import: 'pallet',
        metal: 'weight-hanging',
        electronic: 'project-diagram',
      }
    const _0x120af9 = _0x297200,
      _0x72d1f5 = {
        name: 'FM Bandage',
        item_id: 'custombandageitem',
        cost: 1,
        length: 1,
        amount: 1,
        isFarmers: true,
        farmerType: 'bandage',
      }
    const _0x2fa914 = { data: _0x72d1f5 }
    const _0x39e7b0 = {
      title: 'FM Bandage',
      titleRight: '\u25A8 1',
      icon: 'store',
      action: 'np-shops:craftHandler',
      key: _0x2fa914,
    }
    const _0x59f413 = {
      name: 'FM Merchandise',
      item_id: 'custommerchitem',
      cost: 1,
      length: 1,
      amount: 1,
      isFarmers: true,
      farmerType: 'other',
    }
    const _0x2abd10 = { data: _0x59f413 }
    const _0x12247f = {
      title: 'FM Merchandise',
      titleRight: '\u25A8 1',
      icon: 'store',
      action: 'np-shops:craftHandler',
      key: _0x2abd10,
    }
    const _0x3e834e = {
      name: 'FM Water',
      item_id: 'customwateritem',
      cost: 1,
      length: 1,
      amount: 1,
      isFarmers: true,
      farmerType: 'water',
    }
    const _0x455722 = { data: _0x3e834e }
    const _0x446308 = {
      title: 'FM Water',
      titleRight: '\u25A8 1',
      icon: 'store',
      action: 'np-shops:craftHandler',
      key: _0x455722,
    }
    const _0xfdd97d = {
      name: 'FM Food',
      item_id: 'customfooditem',
      cost: 1,
      length: 1,
      amount: 1,
      isFarmers: true,
      farmerType: 'food',
    }
    const _0x491ada = { data: _0xfdd97d }
    const _0x3c199f = {
      title: 'FM Food',
      titleRight: '\u25A8 1',
      icon: 'store',
      action: 'np-shops:craftHandler',
      key: _0x491ada,
    }
    const _0x336ee7 = {
      name: 'FM Coffee',
      item_id: 'customcoffeeitem',
      cost: 1,
      length: 1,
      amount: 1,
      isFarmers: true,
      farmerType: 'coffee',
    }
    const _0x27a898 = { data: _0x336ee7 }
    const _0x53c4b7 = {
      title: 'FM Coffee',
      titleRight: '\u25A8 1',
      icon: 'store',
      action: 'np-shops:craftHandler',
      key: _0x27a898,
    }
    const _0x1b1c13 = {
      name: 'FM Cigarette',
      item_id: 'customciggyitem',
      cost: 1,
      length: 1,
      amount: 1,
      isFarmers: true,
      farmerType: 'ciggy',
    }
    const _0x27a8b1 = { data: _0x1b1c13 }
    const _0x1e0b2a = {
      title: 'FM Cigarette',
      titleRight: '\u25A8 1',
      icon: 'store',
      action: 'np-shops:craftHandler',
      key: _0x27a8b1,
    }
    const _0x5d483d = {
      name: 'FM Joint',
      item_id: 'customjointitem',
      cost: 1,
      length: 1,
      amount: 1,
      isFarmers: true,
      farmerType: 'joint',
    }
    const _0x150318 = { data: _0x5d483d }
    const _0x2ca8ed = {
      title: 'FM Joint',
      titleRight: '\u25A8 1',
      description: 'Additional Cost: Joint',
      icon: 'store',
      action: 'np-shops:craftHandler',
      key: _0x150318,
    }
    const _0x4a7dbd = {
      paper: [_0x39e7b0],
      textile: [_0x12247f],
      food: [_0x446308, _0x3c199f, _0x53c4b7],
      import: [_0x1e0b2a, _0x2ca8ed],
    }
    const _0x5be135 = _0x4a7dbd
    on('np-shops:manageSupplies', async () => {
      const _0xd53a65 = _0x173184.g.exports['np-housing'].getCurrentPropertyID()
      if (!_0xd53a65) {
        return
      }
      const _0x23555f = await _0x235a87.execute(
          'np-shops:getShopSupplies',
          _0xd53a65
        ),
        _0x3c94a4 = await _0x235a87.execute(
          'np-shops:getShopBlueprints',
          _0xd53a65
        ),
        _0x21635b = _0x4fbd64('crafting'),
        _0x2416ab = _0x173184.g.exports['np-inventory'].getFullItemList(),
        _0x434d18 = [],
        _0x12712d = {
          title: 'Supplies',
          icon: 'box',
        }
      _0x434d18.push(_0x12712d)
      for (const _0x202d5a of Object.values(_0x2506b0).filter(
        (_0x5c5c64) => typeof _0x5c5c64 === 'string'
      )) {
        const _0x307de9 = _0x2506b0[_0x202d5a],
          _0x379121 = _0x42fe30[_0x202d5a],
          _0x442d3d = _0x120af9[_0x202d5a],
          _0x1945ee = _0x21635b[_0x202d5a],
          _0x3294d8 = _0x43aa4a[_0x202d5a],
          _0x37d832 = _0x1945ee
            .map((_0x367a3a) => {
              if (_0x367a3a.blueprint_only) {
                return
              }
              const _0x83beef = _0x2416ab[_0x367a3a.item_id],
                _0x4a6562 = {
                  name: _0x83beef.displayname,
                  cost:
                    _0x83beef.price === 0
                      ? 0
                      : Math.max(Math.round(_0x83beef.price / _0x3294d8), 1),
                  item_id: _0x367a3a.item_id,
                  amount: _0x367a3a.amount,
                  length: _0x367a3a.length,
                },
                _0x2c6ad3 = {}
              return (
                (_0x2c6ad3.title =
                  _0x4a6562.name +
                  ' ' +
                  (_0x4a6562.amount > 1 ? '\xD7' + _0x4a6562.amount : '')),
                (_0x2c6ad3.titleRight = '\u25A8 ' + _0x4a6562.cost),
                (_0x2c6ad3.description = _0x83beef.information),
                (_0x2c6ad3.action = 'np-shops:craftHandler'),
                (_0x2c6ad3.key = {}),
                (_0x2c6ad3.disabled = _0x23555f[_0x307de9] < _0x4a6562.cost),
                (_0x2c6ad3.image =
                  'https://cfx-nui-np-inventory/nui/icons/' +
                  (_0x83beef === null || _0x83beef === void 0
                    ? void 0
                    : _0x83beef.image)),
                (_0x2c6ad3.key.data = _0x4a6562),
                (_0x2c6ad3.key.shop = _0xd53a65),
                (_0x2c6ad3.key.type = _0x202d5a),
                _0x2c6ad3
              )
            })
            .sort((_0x55158d, _0x25e6bf) =>
              _0x55158d.title > _0x25e6bf.title ? 1 : -1
            )
        _0x434d18.push({
          title: _0x379121,
          icon: _0x442d3d,
          description: 'In stock: ' + _0x23555f[_0x307de9],
          children: [
            {
              title: 'Blueprints',
              icon: 'newspaper',
              disabled: !_0x3c94a4.filter(
                (_0x20e978) => _0x20e978.type === _0x202d5a
              ).length,
              children: _0x3c94a4
                .filter((_0x788f61) => _0x788f61.type === _0x202d5a)
                .map((_0x59d702) => {
                  var _0x2e77ba
                  const _0xe11a79 = _0x2416ab[_0x59d702.item_id],
                    _0x17d170 = {
                      name: _0x59d702.name,
                      description: _0x59d702.description,
                      blueprint: true,
                      blueprint_id: _0x59d702.uuid,
                      image_url: _0x59d702.image_url,
                      cost:
                        _0xe11a79.price === 0
                          ? 0
                          : Math.max(
                              Math.round(_0xe11a79.price / _0x3294d8),
                              1
                            ),
                      item_id: _0x59d702.item_id,
                      amount: _0x59d702.amount,
                      length: _0x59d702.length,
                    },
                    _0x5f08ca = {}
                  return (
                    (_0x5f08ca.title =
                      _0x17d170.name +
                      ' ' +
                      (_0x59d702.amount > 1 ? '\xD7' + _0x59d702.amount : '')),
                    (_0x5f08ca.titleRight = '\u25A8 ' + _0x17d170.cost),
                    (_0x5f08ca.description = _0x17d170.description),
                    (_0x5f08ca.action = 'np-shops:craftHandler'),
                    (_0x5f08ca.key = {}),
                    (_0x5f08ca.disabled =
                      _0x23555f[_0x307de9] < _0x17d170.cost),
                    (_0x5f08ca.image =
                      (_0x2e77ba = _0x59d702.image_url) !== null &&
                      _0x2e77ba !== void 0
                        ? _0x2e77ba
                        : 'https://cfx-nui-np-inventory/nui/icons/' +
                          (_0xe11a79 === null || _0xe11a79 === void 0
                            ? void 0
                            : _0xe11a79.image)),
                    (_0x5f08ca.key.data = _0x17d170),
                    (_0x5f08ca.key.shop = _0xd53a65),
                    (_0x5f08ca.key.type = _0x202d5a),
                    _0x5f08ca
                  )
                }),
            },
            ..._0x37d832,
          ],
        })
      }
      _0x173184.g.exports['np-ui'].showContextMenu(_0x434d18)
    })
    on('np-shops:depositSupplies', async () => {
      const _0x172da6 = _0x173184.g.exports['np-housing'].getCurrentPropertyID()
      if (!_0x172da6) {
        return
      }
      for (const _0xa476e8 of Object.values(_0x2506b0).filter(
        (_0x1c8d0a) => typeof _0x1c8d0a === 'string'
      )) {
        const _0x303d5f = 'fsupplies_' + _0xa476e8,
          _0x8b4c86 = await _0x173184.g.exports['np-inventory'].getItemsOfType(
            _0x303d5f,
            10000,
            true
          )
        if (!_0x8b4c86 || _0x8b4c86.length === 0) {
          continue
        }
        let _0x267433 = 0
        _0x40172b: for (const _0x579ee9 of _0x8b4c86) {
          const _0x24d827 = _0x579ee9.amount / 2
          for (
            let _0x3be541 = 0;
            _0x3be541 < Math.floor(_0x24d827);
            _0x3be541++
          ) {
            const _0x2bccdb = await _0x200380.taskBar(
              500,
              'Depositing...',
              true,
              {
                distance: 1,
                entity: PlayerPedId(),
              }
            )
            if (_0x2bccdb !== 100) {
              break _0x40172b
            }
            _0x267433 += 2
          }
          if (Math.floor(_0x24d827) - _0x24d827 < 0) {
            _0x267433++
          }
        }
        await _0x235a87.execute(
          'np-shops:depositShopSupplies',
          _0x172da6,
          _0xa476e8,
          _0x267433
        )
      }
    })
    async function _0x29353b() {}
    on('shops:vendingMachine', (_0x1b2e99, _0x4e6d9d, _0x8b07e7) => {
      if (!_0x8b07e7) {
        return
      }
      emit(
        'server-inventory-open',
        _0x8b07e7.flags.isVendingMachineBeverage ? '36' : '37',
        'Shop'
      )
    })
    on('np-shops:openFactoryShop', (_0x43175e, _0x327fec, _0x169ad1) => {
      emit('server-inventory-open', '42123', 'Shop')
    })
    on('np-shops:openParsonsShop', (_0x5d5a1c, _0x4ac211, _0x26fddd) => {
      emit('server-inventory-open', '42084', 'Shop')
    })
    on('np-shops:openHouseShop', () => {
      const _0x2b66cf = exports['np-housing'].getCurrentPropertyID()
      if (!_0x2b66cf) {
        return
      }
      emit('server-inventory-open', '1', 'player-Shop-' + _0x2b66cf)
    })
    on('np-shops:viewStash', () => {
      const _0x345017 = exports['np-housing'].getCurrentPropertyID()
      if (!_0x345017) {
        return
      }
      emit('server-inventory-open', '1', 'shop-stash-' + _0x345017)
    })
    on('np-shops:manageBlueprints', async () => {
      _0x3533fa()
    })
    on('np-shops:createBlueprint', async () => {
      const _0x2b6891 = _0x173184.g.exports['np-inventory'].getFullItemList(),
        _0x58e31e = _0x4fbd64('crafting'),
        _0x5437da = {
          id: 'textile-custommerchitem-1-10',
          name: 'Merchandise Item',
        }
      const _0x298294 = {
        id: 'food-customwateritem-1-10',
        name: 'Water Item',
      }
      const _0x1974bf = {
        id: 'food-customfooditem-1-10',
        name: 'Food Item',
      }
      const _0x2e7fb2 = {
        id: 'food-customcoffeeitem-1-10',
        name: 'Coffee Item',
      }
      const _0xe094ad = {
        id: 'import-customciggyitem-1-10',
        name: 'Cigarette Item',
      }
      const _0x125471 = {
        id: 'import-customjointitem-13-10',
        name: 'Joint Item x13',
      }
      const _0xe2bc79 = [
          _0x5437da,
          _0x298294,
          _0x1974bf,
          _0x2e7fb2,
          _0xe094ad,
          _0x125471,
        ],
        _0x45787b = {
          name: 'name',
          label: 'Name',
          icon: 'pencil-alt',
        }
      const _0x306532 = {
        name: 'description',
        label: 'Description',
        icon: 'paragraph',
      }
      const _0x262464 = {
        name: 'image_url',
        label: 'Image URL',
        icon: 'link',
      }
      const _0x356ba9 = [
          {
            name: 'item_id',
            label: 'Item',
            icon: 'pencil-alt',
            options: [
              ..._0xe2bc79,
              ...Object.keys(_0x58e31e)
                .reduce((_0x2abd9e, _0x3b5883) => {
                  const _0x341f5f = _0x58e31e[_0x3b5883]
                  return [
                    ..._0x2abd9e,
                    ..._0x341f5f.map((_0x2b1ee2) => ({
                      id:
                        _0x3b5883 +
                        '-' +
                        _0x2b1ee2.item_id +
                        '-' +
                        _0x2b1ee2.amount +
                        '-' +
                        _0x2b1ee2.length,
                      name: _0x2b6891[_0x2b1ee2.item_id].displayname,
                    })),
                  ]
                }, [])
                .sort((_0x13e435, _0x14db26) =>
                  _0x13e435.name.localeCompare(_0x14db26.name)
                ),
            ],
            _type: 'select',
          },
          _0x45787b,
          _0x306532,
          _0x262464,
        ],
        _0x4315d1 = await exports['np-ui'].OpenInputMenu(
          _0x356ba9,
          (_0x22410d) => {
            return _0x22410d && _0x22410d.item_id
          }
        )
      if (!_0x4315d1) {
        return
      }
      const [_0x59adc6, _0x4feb8d, _0x6a5a0c, _0x2a9185] =
          _0x4315d1.item_id.split('-'),
        _0x80a239 = _0x2b6891[_0x4feb8d],
        _0x3f9c7d = _0x43aa4a[_0x59adc6],
        _0x56c97e = {
          name: _0x4315d1.name,
          cost:
            _0x80a239.price === 0
              ? 0
              : Math.max(Math.round(_0x80a239.price / _0x3f9c7d), 1),
          description: _0x4315d1.description,
          image_url: _0x4315d1.image_url,
          type: _0x59adc6,
          item_id: _0x4feb8d,
          length: _0x2a9185,
          amount: _0x6a5a0c,
        }
      _0x235a87.execute('np-shops:createBlueprint', _0x56c97e)
    })
    on('np-shops:createUseable', async () => {
      var _0x58caa6, _0x5ba063
      const _0x5dd6ea = {
        name: 'quantity',
        label: 'Amount *',
        icon: 'sort-numeric-up',
      }
      const _0x577626 = {
        name: 'name_pre',
        label: 'Name (Full) *',
        icon: 'pencil-alt',
      }
      const _0x2a103c = {
        name: 'description_pre',
        label: 'Description (Full) *',
        icon: 'paragraph',
      }
      const _0x1c0e2 = {
        name: 'name_post',
        label: 'Name (Empty)',
        icon: 'pencil-alt',
      }
      const _0x568425 = {
        name: 'description_post',
        label: 'Description (Empty)',
        icon: 'paragraph',
      }
      const _0x2e6057 = {
        name: 'text',
        label: 'Text *',
        icon: 'tag',
      }
      const _0x36953d = {
        name: 'length',
        label: 'Length (ms) *',
        icon: 'clock',
      }
      const _0x3755cb = {
        name: 'image_url_pre',
        label: 'Image URL (Full) *',
        icon: 'link',
      }
      const _0x5371b4 = {
        name: 'image_url_post',
        label: 'Image URL (Empty) *',
        icon: 'unlink',
      }
      const _0xe224f2 = {
        name: 'stack_id',
        label: 'Stacking ID',
        icon: 'layer-group',
      }
      const _0x5efb78 = [
          _0x5dd6ea,
          _0x577626,
          _0x2a103c,
          _0x1c0e2,
          _0x568425,
          _0x2e6057,
          _0x36953d,
          _0x3755cb,
          _0x5371b4,
          _0xe224f2,
        ],
        _0x9e68f6 = await _0x173184.g.exports['np-ui'].OpenInputMenu(
          _0x5efb78,
          (_0x34fea0) => {
            return (
              _0x34fea0 && _0x34fea0.image_url_pre && _0x34fea0.image_url_post
            )
          }
        )
      if (!_0x9e68f6) {
        return
      }
      emit(
        'player:receiveItem',
        'customuseitem',
        (_0x58caa6 = _0x9e68f6.quantity) !== null && _0x58caa6 !== void 0
          ? _0x58caa6
          : 1,
        false,
        {
          _factory: true,
          _id: _0x9e68f6.name_pre.toLowerCase().replace(/\s/g, '_'),
          _name: _0x9e68f6.name_pre,
          _description: _0x9e68f6.description_pre,
          _name_post: _0x9e68f6.name_post,
          _description_post: _0x9e68f6.description_post,
          _image_url: _0x9e68f6.image_url_pre,
          _image_url_post: _0x9e68f6.image_url_post,
          _progress_length: _0x9e68f6.length,
          _progress_text: _0x9e68f6.text,
          _stack_id:
            (_0x5ba063 = _0x9e68f6.stack_id) !== null && _0x5ba063 !== void 0
              ? _0x5ba063
              : undefined,
          _hideKeys: [
            '_description_post',
            '_name_post',
            '_image_url_post',
            '_progress_length',
            '_progress_text',
          ],
        },
        {}
      )
    })
    on('np-shops:createRandom', async () => {
      var _0x275a4b, _0xc843cb
      const _0x4bd47b = {
        name: 'quantity',
        label: 'Amount *',
        icon: 'sort-numeric-up',
      }
      const _0x7e44e0 = {
        name: 'name_pre',
        label: 'Name (Unopened) *',
        icon: 'pencil-alt',
      }
      const _0x227749 = {
        name: 'description_pre',
        label: 'Description (Unopened) *',
        icon: 'paragraph',
      }
      const _0x1e7d69 = {
        name: 'name_win',
        label: 'Name (Success)',
        icon: 'pencil-alt',
      }
      const _0x3db56a = {
        name: 'description_win',
        label: 'Description (Success)',
        icon: 'paragraph',
      }
      const _0x176452 = {
        name: 'name_loss',
        label: 'Name (Fail)',
        icon: 'pencil-alt',
      }
      const _0x246c29 = {
        name: 'description_loss',
        label: 'Description (Fail)',
        icon: 'paragraph',
      }
      const _0x51833b = {
        name: 'text',
        label: 'Text *',
        icon: 'tag',
      }
      const _0x30a712 = {
        name: 'length',
        label: 'Length (ms) *',
        icon: 'clock',
      }
      const _0x5855e1 = {
        name: 'chance',
        label: 'Success Chance (1-100%) *',
        icon: 'dice',
      }
      const _0x5d4e8 = {
        name: 'image_url_pre',
        label: 'Image URL (Unopened) *',
        icon: 'link',
      }
      const _0x1b97cd = {
        name: 'image_url_win',
        label: 'Image URL (Success) *',
        icon: 'unlink',
      }
      const _0x2210be = {
        name: 'image_url_loss',
        label: 'Image URL (Fail) *',
        icon: 'unlink',
      }
      const _0x1e5bcb = {
        name: 'stack_id',
        label: 'Stacking ID',
        icon: 'layer-group',
      }
      const _0x1144be = [
          _0x4bd47b,
          _0x7e44e0,
          _0x227749,
          _0x1e7d69,
          _0x3db56a,
          _0x176452,
          _0x246c29,
          _0x51833b,
          _0x30a712,
          _0x5855e1,
          _0x5d4e8,
          _0x1b97cd,
          _0x2210be,
          _0x1e5bcb,
        ],
        _0x274a75 = await _0x173184.g.exports['np-ui'].OpenInputMenu(
          _0x1144be,
          (_0xe4ab37) => {
            return (
              _0xe4ab37 &&
              _0xe4ab37.image_url_pre &&
              _0xe4ab37.image_url_win &&
              _0xe4ab37.image_url_loss &&
              !isNaN(+_0xe4ab37.chance)
            )
          }
        )
      if (!_0x274a75) {
        return
      }
      emit(
        'player:receiveItem',
        'customuseitem',
        (_0x275a4b = _0x274a75.quantity) !== null && _0x275a4b !== void 0
          ? _0x275a4b
          : 1,
        false,
        {
          _factory: true,
          _random: true,
          _remove_id: (
            Math.floor(Math.random() * 1000000) + 1000000
          ).toString(),
          _chance: _0x274a75.chance,
          _name: _0x274a75.name_pre,
          _description: _0x274a75.description_pre,
          _name_win: _0x274a75.name_win,
          _description_win: _0x274a75.description_win,
          _name_loss: _0x274a75.name_loss,
          _description_loss: _0x274a75.description_loss,
          _image_url: _0x274a75.image_url_pre,
          _image_url_win: _0x274a75.image_url_win,
          _image_url_loss: _0x274a75.image_url_loss,
          _progress_length: _0x274a75.length,
          _progress_text: _0x274a75.text,
          _stack_id:
            (_0xc843cb = _0x274a75.stack_id) !== null && _0xc843cb !== void 0
              ? _0xc843cb
              : undefined,
          _hideKeys: [
            '_random',
            '_chance',
            '_remove_id',
            '_description_win',
            '_name_win',
            '_description_loss',
            '_name_loss',
            '_image_url_win',
            '_image_url_loss',
            '_progress_length',
            '_progress_text',
          ],
        },
        {}
      )
    })
    on('np-shops:createLotto', async () => {
      var _0x2e22d9, _0x86868e
      const _0x597770 = {
        name: 'quantity',
        label: 'Amount *',
        icon: 'sort-numeric-up',
      }
      const _0x8c85c5 = {
        name: 'name_pre',
        label: 'Name (Unopened) *',
        icon: 'pencil-alt',
      }
      const _0x3f2ec0 = {
        name: 'description_pre',
        label: 'Description (Unopened) *',
        icon: 'paragraph',
      }
      const _0xf9d1d6 = {
        name: 'name_loss',
        label: 'Name (Fail)',
        icon: 'pencil-alt',
      }
      const _0x4eb7f0 = {
        name: 'description_loss',
        label: 'Description (Fail)',
        icon: 'paragraph',
      }
      const _0x23d5cd = {
        name: 'text',
        label: 'Text *',
        icon: 'tag',
      }
      const _0x71d4fc = {
        name: 'length',
        label: 'Length (ms) *',
        icon: 'clock',
      }
      const _0x5ce355 = {
        name: 'image_url_pre',
        label: 'Image URL (Unopened) *',
        icon: 'link',
      }
      const _0x28cb9a = {
        name: 'image_url_loss',
        label: 'Image URL (Fail) *',
        icon: 'unlink',
      }
      const _0x318178 = {
        name: 'stack_id',
        label: 'Stacking ID',
        icon: 'layer-group',
      }
      const _0x24562b = [
          _0x597770,
          _0x8c85c5,
          _0x3f2ec0,
          _0xf9d1d6,
          _0x4eb7f0,
          _0x23d5cd,
          _0x71d4fc,
          _0x5ce355,
          _0x28cb9a,
          _0x318178,
        ],
        _0x500f75 = await _0x173184.g.exports['np-ui'].OpenInputMenu(
          _0x24562b,
          (_0x252255) => {
            return (
              _0x252255 &&
              _0x252255.image_url_pre &&
              _0x252255.image_url_loss &&
              !isNaN(_0x252255.quantity)
            )
          }
        )
      if (!_0x500f75) {
        return
      }
      let _0x157419 = true
      const _0x36eb5b = []
      while (_0x157419) {
        await _0x2657d8(250)
        const _0x335465 = {
          id: 'true',
          name: 'Yes',
        }
        const _0x7c8cf5 = {
          id: 'false',
          name: 'No',
        }
        const _0x597d05 = {
          name: 'proceed',
          label: 'Add More',
          icon: 'clock',
          options: [_0x335465, _0x7c8cf5],
        }
        _0x597d05['_type'] = 'select'
        const _0x1e46fa = [_0x597d05],
          _0x3010ac = await _0x173184.g.exports['np-ui'].OpenInputMenu(
            _0x1e46fa
          )
        if (!_0x3010ac || _0x3010ac.proceed === 'false') {
          _0x157419 = false
          break
        }
        await _0x2657d8(250)
        const _0x50cbb4 = {
          name: 'quantity',
          label: 'Amount *',
          icon: 'sort-numeric-up',
        }
        const _0x4f6660 = {
          name: 'name',
          label: 'Name (Winner) *',
          icon: 'pencil-alt',
        }
        const _0x5277bf = {
          name: 'description',
          label: 'Description (Winner) *',
          icon: 'paragraph',
        }
        const _0x42842e = {
          name: 'image_url',
          label: 'Image URL (Winner) *',
          icon: 'link',
        }
        const _0x4b5cc6 = {
          name: 'stack_id',
          label: 'Stacking ID',
          icon: 'layer-group',
        }
        const _0x18ab43 = [
            _0x50cbb4,
            _0x4f6660,
            _0x5277bf,
            _0x42842e,
            _0x4b5cc6,
          ],
          _0x303aa6 = await _0x173184.g.exports['np-ui'].OpenInputMenu(
            _0x18ab43,
            (_0x2d255c) => {
              return (
                _0x2d255c &&
                _0x2d255c.image_url &&
                _0x2d255c.name &&
                _0x2d255c.description &&
                !isNaN(_0x2d255c.quantity)
              )
            }
          )
        if (!_0x303aa6) {
          _0x157419 = false
          break
        }
        _0x36eb5b.push(_0x303aa6)
      }
      let _0x118423 = _0x500f75.quantity
      const _0x5506bf = []
      for (const _0x4a3174 of _0x36eb5b) {
        let _0x3d4c17 = 0
        _0x118423 -= _0x4a3174.quantity
        while (_0x3d4c17 < _0x4a3174.quantity) {
          _0x3d4c17 += 1
          _0x5506bf.push({
            _factory: true,
            _random: true,
            _chance: 100,
            _remove_id: (
              Math.floor(Math.random() * 1000000) + 1000000
            ).toString(),
            _name: _0x500f75.name_pre,
            _description: _0x500f75.description_pre,
            _name_win: _0x4a3174.name,
            _description_win: _0x4a3174.description,
            _name_loss: _0x500f75.name_loss,
            _description_loss: _0x500f75.description_loss,
            _image_url: _0x500f75.image_url_pre,
            _image_url_win: _0x4a3174.image_url,
            _image_url_loss: _0x500f75.image_url_loss,
            _progress_length: _0x500f75.length,
            _progress_text: _0x500f75.text,
            _stack_id:
              (_0x2e22d9 = _0x500f75.stack_id) !== null && _0x2e22d9 !== void 0
                ? _0x2e22d9
                : undefined,
            _hideKeys: [
              '_random',
              '_chance',
              '_remove_id',
              '_description_win',
              '_name_win',
              '_description_loss',
              '_name_loss',
              '_image_url_win',
              '_image_url_loss',
              '_progress_length',
              '_progress_text',
            ],
          })
        }
      }
      while (_0x118423 > 0) {
        _0x118423 -= 1
        _0x5506bf.push({
          _factory: true,
          _random: true,
          _chance: 0,
          _remove_id: (
            Math.floor(Math.random() * 1000000) + 1000000
          ).toString(),
          _name: _0x500f75.name_pre,
          _description: _0x500f75.description_pre,
          _name_win: '',
          _description_win: '',
          _name_loss: _0x500f75.name_loss,
          _description_loss: _0x500f75.description_loss,
          _image_url: _0x500f75.image_url_pre,
          _image_url_win: '',
          _image_url_loss: _0x500f75.image_url_loss,
          _progress_length: _0x500f75.length,
          _progress_text: _0x500f75.text,
          _stack_id:
            (_0x86868e = _0x500f75.stack_id) !== null && _0x86868e !== void 0
              ? _0x86868e
              : undefined,
          _hideKeys: [
            '_random',
            '_chance',
            '_remove_id',
            '_description_win',
            '_name_win',
            '_description_loss',
            '_name_loss',
            '_image_url_win',
            '_image_url_loss',
            '_progress_length',
            '_progress_text',
          ],
        })
      }
      const _0x204c36 = (_0x3acc30) => {
        for (var _0x752c57 = _0x3acc30.length - 1; _0x752c57 > 0; _0x752c57--) {
          var _0x2f4cd9 = Math.floor(Math.random() * (_0x752c57 + 1)),
            _0x5374e5 = _0x3acc30[_0x752c57]
          _0x3acc30[_0x752c57] = _0x3acc30[_0x2f4cd9]
          _0x3acc30[_0x2f4cd9] = _0x5374e5
        }
      }
      _0x204c36(_0x5506bf)
      for (const _0x307949 of _0x5506bf) {
        await _0x2657d8(100)
        emit('player:receiveItem', 'customuseitem', 1, false, _0x307949, {})
      }
    })
    RegisterUICallback(
      'np-shops:addBlueprint',
      async (_0x5ef5b0, _0x2bfcff) => {
        const _0x48598d = {
          ok: true,
          message: 'done',
        }
        const _0x206d3c = {
          data: {},
          meta: _0x48598d,
        }
        _0x2bfcff(_0x206d3c)
        const _0x6261a5 = _0x5ef5b0.key.propertyId,
          _0x4e4032 = _0x5ef5b0.key.data,
          _0x2f18eb = await _0x235a87.execute(
            'np-shops:addShopBlueprint',
            _0x6261a5,
            _0x4e4032
          )
        _0x2f18eb &&
          emit(
            'inventory:removeItemByMetaKV',
            _0x4e4032.item_id,
            1,
            'uuid',
            _0x4e4032.uuid
          )
        await _0x2657d8(1)
        _0x3533fa()
      }
    )
    RegisterUICallback(
      'np-shops:removeBlueprint',
      async (_0x489d95, _0x50a443) => {
        const _0x2acb5c = {
          ok: true,
          message: 'done',
        }
        const _0x16bcb4 = {
          data: {},
          meta: _0x2acb5c,
        }
        _0x50a443(_0x16bcb4)
        const _0x48fb1c = _0x489d95.key.propertyId,
          _0x5aeb2e = _0x489d95.key.data
        await _0x235a87.execute(
          'np-shops:removeShopBlueprint',
          _0x48fb1c,
          _0x5aeb2e
        )
        await _0x2657d8(1)
        _0x3533fa()
      }
    )
    RegisterUICallback(
      'np-shops:removeStoreItem',
      async (_0x336ad4, _0xdd7297) => {
        const _0xe93cb2 = {
          ok: true,
          message: 'done',
        }
        const _0xfaa66 = {
          data: {},
          meta: _0xe93cb2,
        }
        _0xdd7297(_0xfaa66)
        const { id: _0x2eef58, propertyId: _0x2d65ec } = _0x336ad4.key
        await _0x235a87.execute(
          'np-shops:removeStoreItem',
          _0x2d65ec,
          _0x2eef58
        )
        await _0x2657d8(1)
        _0x52aa4a()
      }
    )
    RegisterUICallback(
      'np-shops:addStoreItem',
      async (_0x3a5306, _0x49951d) => {
        const _0x12915b = {
          ok: true,
          message: 'done',
        }
        const _0x57c5ae = {
          data: {},
          meta: _0x12915b,
        }
        _0x49951d(_0x57c5ae)
        await _0x2657d8(1)
        const _0x23262b = _0x173184.g.exports['np-inventory'].getFullItemList(),
          _0x4e09c4 = {
            label: 'Item ID',
            name: 'item_id',
          }
        const _0x4f86e8 = await _0x173184.g.exports['np-ui'].OpenInputMenu(
          [_0x4e09c4],
          (_0x47c251) => {
            return (
              _0x47c251 && _0x47c251.item_id && _0x23262b[_0x47c251.item_id]
            )
          }
        )
        _0x4f86e8 &&
          (await _0x235a87.execute(
            'np-shops:addStoreItem',
            _0x3a5306.key,
            _0x4f86e8.item_id
          ))
        await _0x2657d8(1)
        _0x52aa4a()
      }
    )
    const _0x52aa4a = async () => {
        const _0x5d87f6 = exports['np-housing'].getCurrentPropertyID()
        if (!_0x5d87f6) {
          return
        }
        const _0x26d475 =
          _0x173184.g.exports['np-business'].IsEmployedAt(
            'smol_dick_realtors'
          ) ||
          _0x173184.g.exports['np-business'].IsEmployedAt('statecontracting')
        if (!_0x26d475) {
          return
        }
        const _0x32f2b2 = _0x173184.g.exports['np-inventory'].getFullItemList(),
          _0x3a225c = await _0x235a87.execute(
            'np-shops:getStoreItems',
            _0x5d87f6
          ),
          _0x3147bc = {
            title: 'Add Item',
            icon: 'plus',
            action: 'np-shops:addStoreItem',
            key: _0x5d87f6,
          }
        const _0x2fd0f7 = [_0x3147bc]
        for (const _0x593ace of _0x3a225c) {
          const _0x1415ee = _0x32f2b2[_0x593ace.item_id],
            _0x2d3b80 = {
              title: _0x1415ee.displayname,
              icon: 'times',
              titleRight: _0x593ace.item_id,
              action: 'np-shops:removeStoreItem',
              image:
                'https://cfx-nui-np-inventory/nui/icons/' +
                (_0x1415ee === null || _0x1415ee === void 0
                  ? void 0
                  : _0x1415ee.image),
              key: {},
            }
          _0x2d3b80.key.id = _0x593ace.id
          _0x2d3b80.key.propertyId = _0x5d87f6
          _0x2fd0f7.push(_0x2d3b80)
        }
        _0x173184.g.exports['np-ui'].showContextMenu(_0x2fd0f7)
      },
      _0x3533fa = async () => {
        const _0x10a478 = exports['np-housing'].getCurrentPropertyID()
        if (!_0x10a478) {
          return
        }
        const _0x4e51b0 = [],
          _0xc60352 = {
            title: 'Blueprints',
            icon: 'newspaper',
          }
        _0x4e51b0.push(_0xc60352)
        const _0x3b22b5 =
          exports['np-inventory'].getItemsOfType('shop_blueprint')
        _0x4e51b0.push({
          title: 'Add Blueprint',
          icon: 'plus',
          children: _0x3b22b5.map((_0x198217) => {
            const _0x1d46eb = JSON.parse(_0x198217.information),
              _0x1597ac = {
                uuid: _0x1d46eb.uuid,
                name: _0x1d46eb.name,
                cost: _0x1d46eb.cost,
                description: _0x1d46eb.description,
                image_url: _0x1d46eb.image_url,
                type: _0x1d46eb.type,
                item_id: _0x1d46eb.item_id,
                length: _0x1d46eb.length,
                amount: _0x1d46eb.amount,
              }
            const _0x515f56 = _0x1597ac,
              _0x46894c = {}
            return (
              (_0x46894c.title = _0x515f56.name),
              (_0x46894c.titleRight = '\u25A8 ' + _0x515f56.cost),
              (_0x46894c.image = _0x515f56.image_url),
              (_0x46894c.description = _0x515f56.description),
              (_0x46894c.action = 'np-shops:addBlueprint'),
              (_0x46894c.key = {}),
              (_0x46894c.key.data = _0x515f56),
              (_0x46894c.key.propertyId = _0x10a478),
              _0x46894c
            )
          }),
        })
        const _0x34158e = await _0x235a87.execute(
          'np-shops:getShopBlueprints',
          _0x10a478
        )
        for (const _0x4207a8 of _0x34158e) {
          const _0x335743 = {
            title: _0x4207a8.name,
            titleRight: '\u25A8 ' + _0x4207a8.cost,
            description: _0x4207a8.description,
            image: _0x4207a8.image_url,
            children: [
              {
                title: 'Remove',
                icon: 'times',
                children: [
                  _0x460b27,
                  {
                    title: 'Yes',
                    action: 'np-shops:removeBlueprint',
                    key: {
                      data: _0x4207a8,
                      propertyId: _0x10a478,
                    },
                  },
                ],
              },
            ],
          }
          _0x4e51b0.push(_0x335743)
        }
        _0x173184.g.exports['np-ui'].showContextMenu(_0x4e51b0)
      }
    onNet('np-shops:modifyStoreItems', _0x52aa4a)
    on(
      'np-inventory:itemUsed',
      async (_0x8ebb7f, _0x238433, _0x941b2a, _0x21f6d3) => {
        var _0x543487, _0x1cb9cf
        if (_0x8ebb7f !== 'customuseitem' && _0x8ebb7f !== 'customtoyitem') {
          return
        }
        const _0x40452b = JSON.parse(_0x238433)
        if (_0x40452b['_used']) {
          return
        }
        const { _progress_length: _0x1a1ef7, _progress_text: _0x3a645d } =
            _0x40452b,
          _0x53fe02 = await _0x200380.taskBar(_0x1a1ef7, _0x3a645d, false)
        if (_0x53fe02 !== 100) {
          return
        }
        _0x40452b['_used'] = true
        if (_0x40452b['_random']) {
          const _0xe6f5f4 = Math.random() * 100,
            _0x98e5cd =
              Number(_0x40452b['_chance']) > 0 &&
              _0xe6f5f4 < Number(_0x40452b['_chance'])
          _0x40452b['_image_url'] = _0x98e5cd
            ? _0x40452b['_image_url_win']
            : _0x40452b['_image_url_loss']
          _0x40452b['_name'] = _0x98e5cd
            ? _0x40452b['_name_win']
            : _0x40452b['_name_loss']
          _0x40452b['_description'] = _0x98e5cd
            ? _0x40452b['_description_win']
            : _0x40452b['_description_loss']
          _0x40452b['_stack_id'] = Math.floor(Math.random() * 1000000) + 1000000
          emit(
            'inventory:removeItemByMetaKV',
            _0x8ebb7f,
            1,
            '_remove_id',
            _0x40452b['_remove_id']
          )
          await _0x2657d8(250)
          emit('player:receiveItem', _0x8ebb7f, 1, false, _0x40452b, {})
        } else {
          _0x40452b['_image_url'] = _0x40452b['_image_url_post']
          _0x40452b['_name'] =
            (_0x543487 = _0x40452b['_name_post']) !== null &&
            _0x543487 !== void 0
              ? _0x543487
              : _0x40452b['_name']
          _0x40452b['_description'] =
            (_0x1cb9cf = _0x40452b['_description_post']) !== null &&
            _0x1cb9cf !== void 0
              ? _0x1cb9cf
              : _0x40452b['_description']
          emit(
            'inventory:updateItem',
            _0x8ebb7f,
            _0x21f6d3,
            JSON.stringify(_0x40452b)
          )
        }
      }
    )
    const _0x204186 = { timeToLive: 900000 }
    const _0x25234a = _0x578159.cacheableMap(async (_0xfc80c, _0x2fef95) => {
        const _0x24ada8 = await _0x235a87.execute(
          'ev-shops:getPropertyType',
          _0x2fef95
        )
        return [true, _0x24ada8]
      }, _0x204186),
      _0x324ca2 = async (_0x1423f2) => {
        const _0x28d1db = _0x4fbd64('useRestaurantWhitelist')
        if (!_0x28d1db) {
          return true
        }
        const _0x124c7c = await _0x25234a.get(_0x1423f2)
        return _0x124c7c === 'restaurant'
      }
    RegisterCommand(
      'setShopType',
      async (_0x3dae59, [_0x6e7b87]) => {
        const _0xe5da15 = exports['np-housing'].getCurrentPropertyID()
        if (!_0xe5da15) {
          return
        }
        const _0x26f6ac =
          _0x173184.g.exports['np-business'].HasRole(
            'smol_dick_realtors',
            'Owner'
          ) ||
          _0x173184.g.exports['np-business'].HasRole(
            'statecontracting',
            'Owner'
          ) ||
          _0x173184.g.exports['np-business'].HasRole('the_factory', 'Owner')
        if (!_0x26f6ac) {
          return
        }
        if (_0x6e7b87 !== 'restaurant' && _0x6e7b87 !== 'shop') {
          console.log('Invalid shop type (restaurant, shop)')
          return
        }
        const _0x14815f = await _0x235a87.execute(
          'np-shops:setPropertyType',
          _0xe5da15,
          _0x6e7b87
        )
        if (_0x14815f) {
          console.log('Shop type set to ' + _0x6e7b87)
        }
      },
      false
    )
    _0x2eeff5.onNet('np-shops:resetPropertyCache', (_0x1e32de) => {
      _0x25234a.reset(_0x1e32de)
    })
    _0x173184.g.exports('IsPropertyRestaurant', _0x324ca2)
    RegisterUICallback(
      'np-shops:craftHandler',
      async (_0x537468, _0x40f6b9) => {
        const _0x881a8f = {
          ok: true,
          message: 'done',
        }
        const _0x20c04d = {
          data: {},
          meta: _0x881a8f,
        }
        _0x40f6b9(_0x20c04d)
        const _0x2c1593 = _0x537468.key.data,
          _0x26c4a4 = _0x537468.key.shop,
          _0x1ee176 = _0x537468.key.type
        await _0x2657d8(1)
        if (_0x2c1593.isFarmers) {
          const _0x492e97 = {
            icon: 'fingerprint',
            label: 'ID',
            name: 'id',
          }
          const _0x47c4e = {
            icon: 'sort-numeric-up-alt',
            label: 'Quantity',
            name: 'quantity',
          }
          const _0x21ce7b = await _0x173184.g.exports['np-ui'].OpenInputMenu(
            [_0x492e97, _0x47c4e],
            (_0x7adbd1) => {
              return (
                _0x7adbd1.id &&
                !isNaN(+_0x7adbd1.quantity) &&
                _0x7adbd1.quantity &&
                !isNaN(+_0x7adbd1.quantity) &&
                +_0x7adbd1.quantity > 0
              )
            }
          )
          if (!_0x21ce7b) {
            return
          }
          const [_0x5092f6] = await RPC.execute(
            'np-farmersmarket:getCraftItem',
            _0x21ce7b.id
          )
          if (!_0x5092f6 || _0x5092f6.item_type !== _0x2c1593.farmerType) {
            emit(
              'DoLongHudText',
              _L('fm-hud-id-notapproved', 'ID not recognized / approved'),
              2
            )
            return
          }
          const _0x26dc58 = Math.round(+_0x21ce7b.quantity)
          if (
            _0x2c1593.item_id === 'customjointitem' &&
            !_0x173184.g.exports['np-inventory'].hasEnoughOfItem(
              'joint2',
              _0x26dc58 * 13,
              false,
              true
            )
          ) {
            emit(
              'DoLongHudText',
              _L('fm-hud-noingredient', 'Not enough ingredients') + ' (joint)',
              2
            )
            return
          }
          _0x235a87.execute(
            'np-shops:craftFarmerItem',
            _0x26c4a4,
            _0x1ee176,
            _0x2c1593,
            _0x5092f6,
            _0x26dc58
          )
          return
        }
        const _0x44114e = {
          name: 'amount',
          label: 'Amount',
          icon: 'sort-numeric-up-alt',
        }
        const _0x1dee78 = await _0x173184.g.exports['np-ui'].OpenInputMenu(
          [_0x44114e],
          (_0x26b744) => {
            return (
              _0x26b744.amount &&
              !isNaN(+_0x26b744.amount) &&
              +_0x26b744.amount > 0
            )
          }
        )
        if (!_0x1dee78) {
          return
        }
        if (+_0x1dee78.amount === 0) {
          return
        }
        if (
          _0x2c1593.item_id === 'customjointitem' &&
          !_0x173184.g.exports['np-inventory'].hasEnoughOfItem(
            'joint2',
            _0x1dee78.amount * 13,
            false,
            true
          )
        ) {
          emit(
            'DoLongHudText',
            _L('fm-hud-noingredient', 'Not enough ingredients') + ' (joint)',
            2
          )
          return
        }
        _0x235a87.execute(
          'np-shops:craftItem',
          _0x26c4a4,
          _0x1ee176,
          _0x2c1593,
          Math.round(+_0x1dee78.amount)
        )
      }
    )
    on('np-shops:viewActiveCrafts', async () => {
      const _0x40d67d = _0x173184.g.exports['np-housing'].getCurrentPropertyID()
      if (!_0x40d67d) {
        return
      }
      const _0x51313d = await _0x235a87.execute(
        'np-shops:getActiveCrafts',
        _0x40d67d
      )
      if (!_0x51313d || _0x51313d.length === 0) {
        emit('DoLongHudText', 'No active crafting', 2)
        return
      }
      const _0x319213 = [],
        _0x1d40cf = {
          title: 'Active Crafting',
          icon: 'hammer',
        }
      _0x319213.push(_0x1d40cf)
      for (const _0x17003f of _0x51313d) {
        const _0x3bdd54 = {
          hour: '2-digit',
          minute: '2-digit',
        }
        _0x319213.push({
          title:
            _0x17003f.data.name +
            ' ' +
            (_0x17003f.amount > 1 ? '\xD7' + _0x17003f.amount : ''),
          titleRight:
            '\u23F2 ' +
            new Date(_0x17003f.endTime).toLocaleTimeString([], _0x3bdd54),
        })
      }
      _0x173184.g.exports['np-ui'].showContextMenu(_0x319213)
    })
    var _0x2abb0b = _0x173184(487)
    async function _0x2cb816() {
      await _0x44162f()
      await _0x29353b()
    }
    ;(async () => {
      await _0x2cb816()
    })()
  })()
})()
