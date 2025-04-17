local function hasScale()
  return exports['ev-inventory']:hasEnoughOfItem('qualityscales', 1, false) or
    exports['ev-inventory']:hasEnoughOfItem('smallscales', 1, false)
end

WeedConfig = {
  -- How long does it take to go from wet bud -> dried bud (minutes) 
  DryTime = 12 * 60,
  -- Which inventories should be valid to dry bud in. (Prefixes)
  ValidDryingInvs = {"warehouse", "motel", "housing"},
  -- How many packed buds (20g) from 1 dried bud (100g)
  BudPerDried = 5,
  -- How much does the Large Delivery list costs
  ListCost = 3000,
  -- server-side cooldown for large dropoffs (only 1 can be active at a time)
  TimeBetweenLrgDeliveries = 45 * 60 * 1000,
  -- How many dried buds per 1 brick
  WeedsPerBrick = 10,
  -- How many bricks for 1 weed run
  BricksPerLargeRun = 10,
  -- How much cash is a brick worth
  BrickValue = 1425,
  -- How much should quality affect sale price (ie. 0% will multiply by 1.0, 50% quality will multiply by 1.1, 100% is 1.2)
  QualityFactor = 1.5,
  -- Chance of alerting police once someone arrives at a delivery spot
  AlertChance = 0.3,
  -- Time to prepare a brick of weed in seconds
  BrickPreparingTime = 150,
  --Selling 500k worth of weed will get you 1.5x payment
  MaxProgressionBonus = 1.5,
}

local function rollJoints(pItem, pAmount, pItemInfo)
  local itemInfo = {
    _hideKeys = {'quality', '_remove_id'},
    _remove_id = math.random(1000, 99999999),
    quality = pItemInfo.quality,
    strain = pItemInfo.strain
  }
  TriggerEvent('inventory:removeItem', 'rollingpaper', pAmount)
  TriggerEvent('inventory:removeItemByMetaKV', pItem, 1, 'strain', pItemInfo.strain)
  TriggerEvent('player:receiveItem', 'joint2', pAmount, false, {}, itemInfo)
end

local rollAnimDict = 'anim@amb@business@weed@weed_sorting_seated@'
local rollAnim = 'sorter_left_sort_v2_sorter01'

local gramsPerJoint = 2

AddEventHandler('ev-inventory:itemUsed', function(item, passedItemInfo, inventoryName, slot)
  if item == 'driedbud' then
    local parsedInfo = json.decode(passedItemInfo)
    local finished = exports['ev-taskbar']:taskBar(5000, 'Packing', false, true, false, false, nil, 5.0, PlayerPedId())
    if finished == 100 and exports['ev-inventory']:hasEnoughOfItem(item, 1, false, true, { quality = parsedInfo.quality }) then
      TriggerEvent('inventory:removeItemByMetaKV', item, 1, 'quality', parsedInfo.quality)
      local budData = {
        strain = parsedInfo.strain,
        quality = parsedInfo.quality,
        grower = parsedInfo.grower,
        id = parsedInfo.id,
        _hideKeys = { 'quality', 'grower', 'id' },
      }
      TriggerEvent('player:receiveItem', 'smallbud', WeedConfig.BudPerDried, false, {}, budData)
    end
  end

  if item == 'weedpackage' then
    TriggerEvent('ev-weed:prepareBaggies', {}, PlayerPedId())
    -- local parsedInfo = json.decode(passedItemInfo)
    -- local budData = {
    --     strain = getStrainNameFromQuality(parsedInfo.quality),
    --     quality = parsedInfo.quality,
    --     _hideKeys = {"quality"}
    -- }
    -- TriggerEvent("player:receiveItem", "smallbud", 10, false, budData)
    -- TriggerEvent("inventory:removeItemByMetaKV", item, 1, "quality", parsedInfo.quality)
  end

  if item == 'smallbud' then
    if not hasScale() then
      TriggerEvent('DoLongHudText', 'You need a scale to pack joints', 2)
      return
    end

    local amount = math.floor(20 / gramsPerJoint * WeedConfig.JointLossRate)
    local hasPaper = exports['ev-inventory']:hasEnoughOfItem('rollingpaper', amount, false)
    if not hasPaper then
      TriggerEvent('DoLongHudText', 'Not enough papers', 2)
      return
    end

    loadAnimDict(rollAnimDict)
    TaskPlayAnim(PlayerPedId(), rollAnimDict, rollAnim, 8.0, 1.0, -1, 17, 0, 0, 0, 0)
    local finished = exports['ev-taskbar']:taskBar(15000, 'Packing Joints', false, true, false, false, nil, 5.0, PlayerPedId())
    ClearPedTasks(PlayerPedId())
    if finished == 100 and exports['ev-inventory']:hasEnoughOfItem(item, 1, false, true) then
      rollJoints(item, amount, json.decode(passedItemInfo))
    end
  end

  if item == 'weedbaggie' then
    local amount = math.floor(8 / gramsPerJoint * WeedConfig.JointLossRate)
    local hasPaper = exports['ev-inventory']:hasEnoughOfItem('rollingpaper', amount, false)
    if not hasPaper then
      TriggerEvent('DoLongHudText', 'Not enough papers', 2)
      return
    end
    loadAnimDict(rollAnimDict)
    TaskPlayAnim(PlayerPedId(), rollAnimDict, rollAnim, 8.0, 1.0, -1, 17, 0, 0, 0, 0)
    local finished = exports['ev-taskbar']:taskBar(5000, 'Rolling Joints', false, true, false, false, nil, 5.0, PlayerPedId())
    ClearPedTasks(PlayerPedId())
    if finished == 100 and exports['ev-inventory']:hasEnoughOfItem(item, 1, false, true) then
      rollJoints(item, amount, json.decode(passedItemInfo))
    end
  end
end)
