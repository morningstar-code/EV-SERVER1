RegisterNetEvent('raid_clothes:outfits')
AddEventHandler('raid_clothes:outfits', function(pAction, pId, pName)
  if pAction == 1 then
    TriggerServerEvent("raid_clothes:set_outfit", pId, pName, GetCurrentPed())
  elseif pAction == 2 then
    TriggerServerEvent("raid_clothes:remove_outfit", pId)
  elseif pAction == 3 then
    --TriggerEvent("hud:saveCurrentMeta")
    TriggerEvent('item:deleteClothesDna')
    TriggerEvent('InteractSound_CL:PlayOnOne', 'Clothes1', 0.6)
    TriggerServerEvent("raid_clothes:get_outfit", pId)
  else
    TriggerServerEvent("raid_clothes:list_outfits")
  end
end)

RegisterUICallback("ev-ui:raid_clothes:addOutfitPrompt", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  Wait(1)   --wait to fix ui bug?
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:raid_clothes:addOutfit',
    inputKey = 1,
    items = {
      {
        icon = "pencil-alt",
        label = "Outfit Number [ID]",
        name = "outfitSlot",
      },
      {
        icon = "pencil-alt",
        label = "Outfit Name",
        name = "outfitName",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:raid_clothes:addOutfit", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  local outfitSlot = tonumber(data.values.outfitSlot)
  if not outfitSlot then
    TriggerEvent("DoLongHudText", "Invalid outfit slot, please use numbers.", 2)
    return
  end
  local outfitName = data.values.outfitName
  if outfitName == nil then outfitName = "Outfit" end

  TriggerServerEvent("raid_clothes:set_outfit", outfitSlot, outfitName, GetCurrentPed())
end)

RegisterUICallback("ev-ui:raid_clothes:changeOutfit", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  TriggerEvent('hotel:outfit', { true, data.key }, 3)
  --exports["ev-ui"]:hideContextMenu()
end)

RegisterUICallback("ev-ui:raid_clothes:deleteOutfit", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  TriggerEvent('hotel:outfit', { true, data.key }, 2)
  --exports["ev-ui"]:hideContextMenu()
end)

RegisterNetEvent('raid_clothes:ListOutfits')
AddEventHandler('raid_clothes:ListOutfits', function(skincheck)
  local menuData = {}
  local takenSlots = {}
  if skincheck ~= nil then
    for i = 1, #skincheck do
      local slot = tonumber(skincheck[i].slot)
      takenSlots[slot] = true
      menuData[#menuData + 1] = {
        title = slot .. " | " .. skincheck[i].name,
        description = '',
        icon = 'tshirt',
        key = slot,
        children = {
          { title = "Change Outfit", action = "ev-ui:raid_clothes:changeOutfit", icon = "redo", key = slot },
          { title = "Delete Outfit", action = "ev-ui:raid_clothes:deleteOutfit", icon = 'trash', key = slot },
        }
      }
    end
  end
  if #menuData >= 0 then
    if #menuData < 20 then
      --Find first empty slot
      local emptySlot = -1
      for i = 1, 10 do
        if emptySlot == -1 and takenSlots[i] == nil then
          emptySlot = i
        end
      end
      menuData[#menuData + 1] = {
        title = "Save Current Outfit",
        description = '',
        icon = "save",
        key = emptySlot,
        action = "ev-ui:raid_clothes:addOutfitPrompt"
      }
    end
    exports['ev-ui']:showContextMenu(menuData)
  else
    TriggerEvent("DoLongHudText", "No saved outfits", 2)
  end
end)

RegisterNetEvent('raid_clothes:ListOutfitsVeh')
AddEventHandler('raid_clothes:ListOutfitsVeh', function(skincheck, plate)
  local menuData = {}
  local takenSlots = {}
  if skincheck ~= nil then
    for i = 1, #skincheck do
      local slot = tonumber(skincheck[i].slot)
      takenSlots[slot] = true
      menuData[#menuData + 1] = {
        title = slot .. " | " .. skincheck[i].name,
        description = '',
        icon = 'tshirt',
        key = slot,
        children = {
          {
            title = "Change Outfit",
            action = "ev-ui:raid_clothes:changeOutfitVeh",
            icon = "redo",
            key = slot
          },
          {
            title = "Delete Outfit",
            action = "ev-ui:raid_clothes:deleteOutfitVeh",
            icon = "trash",
            key = slot,
            plate = plate
          },
        }
      }
    end
  end
  if #menuData >= 0 then
    if #menuData < 20 then
      --Find first empty slot
      local emptySlot = -1
      for i = 1, 10 do
        if emptySlot == -1 and takenSlots[i] == nil then
          emptySlot = i
        end
      end
      menuData[#menuData + 1] = {
        title = "Save Current Outfit",
        description = '',
        icon = "save",
        key = emptySlot,
        action = "ev-ui:raid_clothes:addOutfitPromptVehicle"
      }
    end
    exports['ev-ui']:showContextMenu(menuData)
  else
    TriggerEvent("DoLongHudText", "No saved outfits", 2)
  end
end)

RegisterUICallback("ev-ui:raid_clothes:addOutfitPromptVehicle", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  Wait(1)   --wait to fix ui bug?
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:raid_clothes:addOutfitVeh',
    inputKey = 1,
    items = {
      {
        icon = "pencil-alt",
        label = "Outfit Number [ID]",
        name = "outfitSlot",
      },
      {
        icon = "pencil-alt",
        label = "Outfit Name",
        name = "outfitName",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:raid_clothes:addOutfitVeh", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports["ev-ui"]:closeApplication("textbox")
  local outfitSlot = tonumber(data.values.outfitSlot)
  if not outfitSlot then
    TriggerEvent("DoLongHudText", "Invalid outfit slot, please use numbers.", 2)
    return
  end
  local outfitName = data.values.outfitName
  if outfitName == nil then outfitName = "Outfit" end
  local plate = GetNearestVehicleOutfit()
  TriggerServerEvent("raid_clothes:set_outfitVeh", outfitSlot, outfitName, GetCurrentPed(), plate)
end)