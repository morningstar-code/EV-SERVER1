AddEventHandler("ev-inventory:itemUsed", function(pItem)
  local info = exports["ev-inventory"]:itemListInfo(pItem)
  info = json.decode(info)
  if not info.placeableObject then return end
  local cid = exports["isPed"]:isPed("cid")
  local result = exports['ev-objects']:PlaceAndSaveObject(
    info.placeableObject,
    { cid = cid, item = pItem },
    { groundSnap = true, allowHousePlacement = true },
    function(pCoords, pMaterial, pEntity)
      return true
    end
  )
  if not result then return end
  TriggerEvent("inventory:removeItem", pItem, 1)
end)

AddEventHandler("ev-placeables:pickup", function(p1, p2, p3)
  local cid = p3.meta.data.metadata.cid
  local myCid = exports["isPed"]:isPed("cid")
  if (cid ~= myCid) and (cid ~= -1) then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  local id = p3.meta.id
  exports["ev-objects"]:DeleteObject(id)
  TriggerEvent("player:receiveItem", p3.meta.data.metadata.item, 1)
end)

AddEventHandler("ev-placeables:inspect", function(p1, p2, p3)
  local item = p3.meta.data.metadata.item
  local info = exports["ev-inventory"]:itemListInfo(item)
  info = json.decode(info)
  TriggerEvent("DoLongHudText", info.placeableInfo)
end)

Citizen.CreateThread(function()
  Citizen.Wait(5000)
  local items = exports["ev-inventory"]:getFullItemList()
  local models = {}
  for _, item in pairs(items) do
    if item.placeableObject then
      models[#models + 1] = GetHashKey(item.placeableObject)
    end
  end
  exports["ev-interact"]:AddPeekEntryByModel(models, {
    {
      id = "pickupplaceable",
      event = "ev-placeables:pickup",
      icon = "circle",
      label = "Grab",
    },
  }, {
    distance = { radius = 2.5 },
    isEnabled = function(p1, p2)
      return (p2
        and p2.meta
        and p2.meta.data
        and p2.meta.data.metadata
        and p2.meta.data.metadata.item) and true or false
    end,
  })
  exports["ev-interact"]:AddPeekEntryByModel(models, {
    {
      id = "inspectplaceable",
      event = "ev-placeables:inspect",
      icon = "circle",
      label = "Inspect",
    },
  }, {
    distance = { radius = 2.5 },
    isEnabled = function(p1, p2)
      return (p2
        and p2.meta
        and p2.meta.data
        and p2.meta.data.metadata
        and p2.meta.data.metadata.item) and true or false
    end,
  })
end)

-- Citizen.CreateThread(function()
--   exports["ev-polytarget"]:AddBoxZone("bronco_clue_book", vector3(1011.18, -2887.96, 39.16), 1, 1, {
--     heading=0,
--     minZ=38.76,
--     maxZ=39.56,
--   })
--   exports["ev-interact"]:AddPeekEntryByPolyTarget("bronco_clue_book", {{
--     event = "annievent:bronco",
--     id = "annievent:bronco",
--     icon = "circle",
--     label = "Retrieve",
--     parameters = {}
--   }}, {
--     distance = { radius = 1.5 },
--   })
--   exports["ev-polytarget"]:AddBoxZone("rage_clue_book", vector3(128.28, 272.95, 109.97), 1, 1, {
--     heading=342,
--     minZ=109.57,
--     maxZ=110.37,
--   })
--   exports["ev-interact"]:AddPeekEntryByPolyTarget("rage_clue_book", {{
--     event = "annievent:rage",
--     id = "annievent:rage",
--     icon = "circle",
--     label = "Retrieve",
--     parameters = {}
--   }}, {
--     distance = { radius = 1.5 },
--   })
--   exports["ev-polytarget"]:AddBoxZone("hope_clue_book", vector3(-693.41, 73.74, 55.86), 1, 1, {
--     heading=27,
--     minZ=55.46,
--     maxZ=56.26,
--   })
--   exports["ev-interact"]:AddPeekEntryByPolyTarget("hope_clue_book", {{
--     event = "annievent:hope",
--     id = "annievent:hope",
--     icon = "circle",
--     label = "Retrieve",
--     parameters = {}
--   }}, {
--     distance = { radius = 1.5 },
--   })
-- end)

-- AddEventHandler("annievent:bronco", function()
--   TriggerEvent("player:receiveItem", "rearingbroncostatuebook", 1)
-- end)
-- AddEventHandler("annievent:rage", function()
--   TriggerEvent("player:receiveItem", "impotentragefigurebook", 1)
-- end)
-- AddEventHandler("annievent:hope", function()
--   TriggerEvent("player:receiveItem", "glimpseofhopebook", 1)
-- end)
