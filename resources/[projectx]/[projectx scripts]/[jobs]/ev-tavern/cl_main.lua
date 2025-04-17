local Zones = {
    {
        id = "bar:grabDrink",
        center = vector3(1231.38, -419.27, 67.79),
        width = 1.8,
        height = 1,
        options = { heading = 345, minZ = 66.79, maxZ = 68.19, data = { name = 'hoa_bar_1' } }
    },
    {
        id = "bar:grabDrink",
        center = vector3(1230.78, -421.21, 67.79),
        width = 1.8,
        height = 1,
        options = { heading = 345, minZ = 66.79, maxZ = 68.19, data = { name = 'hoa_bar_2' } }
    },
    {
        id = "bar:openFridge",
        center = vector3(1233.67, -419.68, 67.79),
        width = 0.8,
        height = 2.55,
        options = { heading = 75, minZ = 66.74, maxZ = 68.64, data = { name = 'hoa_fridge_1' } }
    },
    {
        id = "tbar:chargeCustomer",
        center = vector3(1231.62, -422.86, 67.77),
        width = 1.0,
        height = 0.4,
        options = { heading = 345, minZ = 67.77, maxZ = 68.37, data = { name = 'hoa_register' } }
    },
    {
        id = "tbar:getBag",
        center = vector3(1230.83, -416.02, 67.79),
        width = 0.6,
        height = 0.8,
        options = { heading = 345, minZ = 67.64, maxZ = 68.24, data = { name = 'hoa_bag' } }
    },
    {
        id = "tbar:craftToxicMenu",
        center = vector3(1227.1, -420.78, 67.77),
        width = 0.2,
        height = 1.0,
        options = { heading = 345, minZ = 67.77, maxZ = 68.77, data = { name = 'hoa_toxic' } }
    },
}

Citizen.CreateThread(function()
    for _, zone in ipairs(Zones) do
        exports["ev-polytarget"]:AddBoxZone(zone.id, zone.center, zone.width, zone.height, zone.options)
    end
end)

RegisterUICallback("ev-ui:tavern:charge", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  local id = tonumber(data.values.state_id)
  local cost = tonumber(data.values.cost)
  local comment = data.values.comment
  data.state_id = id
  data.amount = cost
  data.comment = comment
  data.business = {
    code = "tavern",
  }
  RPC.execute("ChargeExternal", data)
end)

AddEventHandler('ev-tavern:peekAction', function(pArgs, pEntity, pContext)
	if not pArgs.action then return end

	local zoneName = ('bar:%s'):format(pArgs.action)

	local data = pContext.zones[zoneName]

	if pArgs.action == 'chargeCustomer' then
    exports['ev-ui']:openApplication('textbox', {
        callbackUrl = 'ev-ui:tavern:charge',
        inputKey = "tavern_register",
        items = {
          {
            icon = "user",
            label = "State ID",
            name = "state_id",
          },
          {
            icon = "dollar-sign",
            label = "Cost",
            name = "cost",
          },
          {
            icon = "pencil-alt",
            label = "Comment",
            name = "comment",
          },
        },
        show = true,
    })
  elseif pArgs.action == 'getBag' then
    local genId = tostring(math.random(10000, 99999999))
    local invId = "container-" .. genId .. "-brown-bag"
    local metaData = json.encode({
        inventoryId = invId,
        slots = 1,
        weight = 1,
        _hideKeys = {'inventoryId', 'slots', 'weight'},
    })
    TriggerEvent('player:receiveItem', 'foodbag', 1, false, {}, metaData)
  elseif pArgs.action == 'craftToxicMenu' then
    exports['ev-ui']:openApplication('textbox', {
      callbackUrl = 'ev-ui:tavernCreateItem',
      inputKey = 1,
      items = {
        {
          icon = "biohazard",
          label = "Potency",
          name = "potency",
        },
        {
          icon = "user-clock",
          label = "Interval (seconds)",
          name = "interval",
        },
        {
          icon = "flag-checkered",
          label = "Ticks",
          name = "duration",
        },
        {
          _type = "checkbox",
          label = "Non-lethal",
          name = "nonLethal",
        },
      },
      show = true,
    })
	end
end)

local itemRecipes = {
  ["poisonedcocktail"] = { "moonshine", "drink2" },
  ["poisonedsandwich"] = { "moonshine", "sandwich" },
  ["poisonedwater"] = { "moonshine", "water" },
}

RegisterUICallback("ev-ui:tavernCreateItem", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports['ev-ui']:closeApplication('textbox')
  local potency = tonumber(data.values.potency)
  local interval = tonumber(data.values.interval)
  local duration = tonumber(data.values.duration)
  local nonLethal = data.values.nonLethal
  TriggerServerEvent("ev-tavern:poisonItems", potency, interval, duration, nonLethal)
end)
