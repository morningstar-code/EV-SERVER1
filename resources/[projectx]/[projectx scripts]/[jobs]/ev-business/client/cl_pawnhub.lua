local blip = nil

Citizen.CreateThread(function()
  -- Crafting Station
  exports["ev-polytarget"]:AddBoxZone("pawnhub_craft_station", vector3(-729.42, -1123.45, 10.83), 1.8, 0.8, {
    heading = 34,
    minZ = 9.83,
    maxZ = 11.03,
    data = { id = "pawnhub_craft_station" }
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("pawnhub_craft_station", {{
    event = "ev-business:client:pawnhub:openCraftStation",
    id = "pawnhub_craft_station",
    icon = "hammer",
    label = "Open Workbench",
    parameters = { },
  }}, { distance = { radius = 3.5 }  })

  -- Table
  exports["ev-polytarget"]:AddBoxZone("pawnhub_crush_items", vector3(-737.7, -1131.85, 10.83), 1.55, 0.55, {
    heading = 34,
    minZ = 9.83,
    maxZ = 10.83,
    data = { id = "pawnhub_crush_items" }
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("pawnhub_crush_items", {{
    event = "ev-business:client:pawnhub:openToolTable",
    id = "pawnhub_crush_items",
    icon = "tools",
    label = "Open Table",
    parameters = { },
  }}, { distance = { radius = 3.5 }  })


  exports["ev-interact"]:AddPeekEntryByModel({ GetHashKey("prop_cs_heist_bag_02") }, {
    {
      id = "pawnhub_collect_cashbag",
      event = "ev-business:client:pawnhub:pickupCash",
      icon = "hand-paper",
      label = "Collect Cash",
    }
  }, 
  { 
    distance = { radius = 2.5 },
    isEnabled = function(pEntity, pContext)
      local objInfo = exports["ev-objects"]:GetObjectByEntity(pEntity)
      local hasAccess = HasPermission("pawnhub", "craft_access")
      return objInfo.metaData.isPawnshop and hasAccess
    end
  })

end)

local crushableItems = {
  ['stolenpsp'] = {
    name = 'PSP',
    miscParts = 1,
  },
  ['stolenart'] = {
    name = 'Art piece',
    miscParts = 10,
  },
  ['stolengameboy'] = {
    name = 'Gameboy',
    miscParts = 1,
  },
  ['stoleniphone'] = {
    name = 'Apple Iphone',
    miscParts = 1,
  },
  ['stolennokia'] = {
    name = 'Nokia Iphone',
    miscParts = 1,
  },
  ['stolenoakleys'] = {
    name = 'Oakley Sunglasses',
    miscParts = 1,
  },
  ['stolentv'] = {
    name = 'Flat Panel TV',
    miscParts = 10,
  },
  ['stolenmusic'] = {
    name = 'Music Equipment',
    miscParts = 5,
  },
  ['stolencomputer'] = {
    name = 'Computer',
    miscParts = 10,
  }
}

AddEventHandler("ev-business:client:pawnhub:openCraftStation", function()
  local hasAccess = HasPermission("pawnhub", "craft_access")
  if not hasAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2)

  end

  TriggerEvent("server-inventory-open", "42132", "Craft")
end)

AddEventHandler("ev-business:client:pawnhub:openToolTable", function()
  local hasAccess = HasPermission("pawnhub", "craft_access")
  if not hasAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2)
  end

  local context = {}

  local currentCrushables = {}
  for k,v in pairs(crushableItems) do
    local qty = exports["ev-inventory"]:getQuantity(k)
    currentCrushables[#currentCrushables+1] = {
      title = v.name,
      titleRight = '1:' .. v.miscParts,
      icon = 'square',
      action = 'ev-business:client:pawnhub:crushItem',
      key = {
        item = k
      }
    }
  end

  context[#context+1] = {
    title = 'Crush Items',
    icon = 'hammer',
    action = '',
    children = currentCrushables,
    key = { }
  }
  
  context[#context+1] = {
    title = 'Craft Relic',
    titleRight = '50 Misc Parts',
    icon = 'certificate',
    action = 'ev-busines:client:pawnhub:craftRelic',
    key = { }
  }

  exports['ev-ui']:showContextMenu(context)
end)

RegisterUICallback("ev-business:client:pawnhub:crushItem", function(pData, cb)
  cb({ data = {}, meta = { ok = true, message = 'OK' } })

  local item = pData.key.item
  local qty = exports["ev-inventory"]:getQuantity(item)
  
  if (qty < 1) then
    return TriggerEvent("DoLongHudText", "You don't have any " .. crushableItems[item].name .. " to crush.", 2)
  end

  TriggerEvent("animation:PlayAnimation", "type")

  local finished = exports["ev-taskbar"]:taskBar(15000, 'Crushing ' .. crushableItems[item].name .. '...')
  ClearPedTasks(PlayerPedId())

  if finished ~= 100 then
    return
  end

  local hasEnoughStill = exports["ev-inventory"]:hasEnoughOfItem(item, qty, false, true);
  if not hasEnoughStill then return end

  TriggerEvent("inventory:removeItem", item, qty)
  TriggerEvent("player:receiveItem", "miscscrap", crushableItems[item].miscParts * qty)

  TriggerEvent("DoLongHudText", "You have crushed " .. qty .. " " .. crushableItems[item].name .. "'s.", 1)
end)

RegisterUICallback("ev-busines:client:pawnhub:craftRelic", function(pData, cb)
  cb({ data = {}, meta = { ok = true, message = 'OK' } })

  local hasEnough = exports["ev-inventory"]:hasEnoughOfItem('miscscrap', 50, false, true)
  if not hasEnough then
    return TriggerEvent("DoLongHudText", "You don't have enough misc scrap to craft a relic.", 2)
  end

  TriggerEvent("animation:PlayAnimation", "type")

  local finished = exports["ev-taskbar"]:taskBar(10000, 'Crafting a relic...')
  ClearPedTasks(PlayerPedId())

  if finished ~= 100 then
    return
  end

  local hasEnoughStill = exports["ev-inventory"]:hasEnoughOfItem('miscscrap', 50, false, true)
  if not hasEnoughStill then
    return TriggerEvent("DoLongHudText", "You don't have enough misc scrap to craft a relic.", 2)
  end

  TriggerEvent("inventory:removeItem", 'miscscrap', 50)

  TriggerServerEvent("ev-gallery:craftJewelryItem", "relic", 0)

  return TriggerEvent("DoLongHudText", "Successfully crafted relic!", 1)
end)

RegisterNetEvent("ev-business:client:pawnhub:giveStolenItems")
AddEventHandler("ev-business:client:pawnhub:giveStolenItems", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local hasPawnHubAccess = exports["ev-business"]:HasPermission("pawnhub", "hire")
  if not hasPawnHubAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2)
  end

  local serverCode = 'wl' --exports["ev-config"]:GetServerCode()
  TriggerEvent("server-inventory-open", "1", "Stolen-Goods-PH-" .. serverCode)
end)

RegisterNetEvent("ev-business:client:pawnhub:sellStolenItems")
AddEventHandler("ev-business:client:pawnhub:sellStolenItems", function()
  local hasPawnHubAccess = exports["ev-business"]:HasPermission("pawnhub", "hire")
  if not hasPawnHubAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2)
  end
  
  RPC.execute("ev-inventory:sellStolenItems", hasPawnHubAccess)
end)

RegisterNetEvent("ev-business:client:pawnhub:startRun")
AddEventHandler("ev-business:client:pawnhub:startRun", function()
  local hasPawnHubAccess = exports["ev-business"]:HasPermission("pawnhub", "hire")
  if not hasPawnHubAccess then
    return TriggerEvent("DoLongHudText", "Sorry you can't use this.", 2)
  end
  
  local vehicleNearSpawn = IsAnyVehicleNearPoint(-711.97, -1123.44, 9.94, 5.0)
  if vehicleNearSpawn then
    return TriggerEvent("DoLongHudText", "A vehicle is blocking the vehicle area", 2)
  end
  
  TriggerServerEvent("ev-business:server:pawnhub:startRun")
end)

RegisterNetEvent("ev-business:client:pawnhub:pickupCash")
AddEventHandler("ev-business:client:pawnhub:pickupCash", function(_, _, pContext)
  local isInVehicle = IsPedInAnyVehicle(PlayerPedId(), false)
  if isInVehicle then
    return TriggerEvent("DoLongHudText", "Nice rat move pal UHM", 2)
  end

  TriggerEvent("animation:PlayAnimation", "pickup")
  Wait(500)
  TriggerServerEvent("ev-business:server:pawnhub:pickupCash", pContext.meta.id)
end)

RegisterNetEvent("ev-business:client:pawnhub:getBalance")
AddEventHandler("ev-business:client:pawnhub:getBalance", function(_, _, pContext)
  TriggerServerEvent("ev-business:server:pawnhub:getBalance")
end)

RegisterNetEvent("ev-business:client:pawnhub:pickupLocationMarked")
AddEventHandler("ev-business:client:pawnhub:pickupLocationMarked", function(pCoords)
  RemoveBlip(blip)
  blip = AddBlipForCoord(pCoords)
  SetBlipSprite(blip, 306)
  SetBlipScale(blip, 0.8)
  SetBlipColour(blip, 3)
  SetBlipAsShortRange(blip, true)
  BeginTextCommandSetBlipName("STRING")
  AddTextComponentString("Current Task")
  EndTextCommandSetBlipName(blip)

  TriggerEvent("DoLongHudText", "Pickup location has been marked on your GPS.", 1)
end)

RegisterNetEvent("ev-business:client:pawnhub:completedRun")
AddEventHandler("ev-business:client:pawnhub:completedRun", function()
  RemoveBlip(blip)
  blip = nil
  
  TriggerEvent("DoLongHudText", "Successfully completed run!", 1)
end)