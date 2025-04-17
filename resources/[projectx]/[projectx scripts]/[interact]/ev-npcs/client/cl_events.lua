RegisterNetEvent("ev-npcs:set:ped")
AddEventHandler("ev-npcs:set:ped", function(pNPCs)
  print("ev-npcs | Fetching npcs Data | Client")
  if type(pNPCs) == "table" then
    for _, ped in ipairs(pNPCs) do
      RegisterNPC(ped, 'ev-npcs')
      EnableNPC(ped.id)
    end
  else
    RegisterNPC(ped, 'ev-npcs')
    EnableNPC(ped.id)
  end
end)

RegisterNetEvent("ev-npcs:set:position")
AddEventHandler("ev-npcs:set:position", function(pId, pVectors, pHeading)
  local position = { coords = pVectors, heading = pHeading}
  UpdateNPCData(pId, 'position', position)
end)

RegisterNetEvent("ev-npcs:ped:giveStolenItems")
AddEventHandler("ev-npcs:ped:giveStolenItems", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["ev-taskbar"]:taskBar(15000, "Preparing to receive goods, don't move.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      local serverCode = 'wl' --exports["ev-config"]:GetServerCode()
      TriggerEvent("server-inventory-open", "1", "Stolen-Goods-1-" .. serverCode)
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 105)
    end
  end
end)

RegisterNetEvent("ev-npcs:ped:exchangeRecycleMaterial")
AddEventHandler("ev-npcs:ped:exchangeRecycleMaterial", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcCoords = GetEntityCoords(pEntity)
  local finished = exports["ev-taskbar"]:taskBar(3000, "Preparing to exchange material, don't move.")
  if finished == 100 then
    if #(GetEntityCoords(PlayerPedId()) - npcCoords) < 2.0 then
      TriggerEvent("server-inventory-open", "35", "Craft");
    else
      TriggerEvent("DoLongHudText", "You moved too far you idiot.", 105)
    end
  end
end)

RegisterNetEvent("ev-npcs:ped:signInJob")
AddEventHandler("ev-npcs:ped:signInJob", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  if #pArgs == 0 then
    local npcId = DecorGetInt(pEntity, 'NPC_ID')
    if npcId == `news_reporter` then
      TriggerServerEvent("jobssystem:jobs", "news")
    elseif npcId == `head_stripper` then
      TriggerServerEvent("jobssystem:jobs", "entertainer")
    end
  else
    TriggerServerEvent("jobssystem:jobs", "unemployed")
  end
end)

RegisterNetEvent("ev-npcs:ped:paycheckCollect")
AddEventHandler("ev-npcs:ped:paycheckCollect", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerServerEvent("server:paySlipPickup")
end)

RegisterNetEvent("ev-npcs:ped:receiptTradeIn")
AddEventHandler("ev-npcs:ped:receiptTradeIn", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local cid = exports["isPed"]:isPed("cid")
  local accountStatus, accountTarget = RPC.execute("GetDefaultBankAccount", cid)
  if not accountStatus then return end
  TriggerEvent("DoLongHudText", "I can't take these right now, Our systems arent setup yet! Sorry.", 2)
  RPC.execute("ev-inventory:tradeInReceipts", cid, accountTarget)
end)

RegisterNetEvent("ev-npcs:ped:receiptTradeInMarket")
AddEventHandler("ev-npcs:ped:receiptTradeInMarket", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local cid = exports["isPed"]:isPed("cid")
  RPC.execute("ev-inventory:tradeInReceiptsMarket", cid)
end)

RegisterNetEvent("ev-npcs:ped:sellStolenItems")
AddEventHandler("ev-npcs:ped:sellStolenItems", function()
  RPC.execute("ev-inventory:sellStolenItems")
end)

RegisterNetEvent("ev-npcs:ped:keeper")
AddEventHandler("ev-npcs:ped:keeper", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerEvent("server-inventory-open", pArgs[1], "Shop")
end)
RegisterNetEvent("ev-npcs:ped:keeperLiqour")
AddEventHandler("ev-npcs:ped:keeperLiqour", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  TriggerEvent("server-inventory-open", pArgs[1], "Shop");
end)

AddEventHandler("ev-npcs:ped:weedSales", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local result, message = RPC.execute("ev-npcs:weedShopOpen")
  if not result then
    TriggerEvent("DoLongHudText", message, 2)
    return
  end
  TriggerEvent("server-inventory-open", "44", "Shop");
end)

TriggerServerEvent("ev-npcs:location:fetch")

AddEventHandler("ev-npcs:ped:licenseKeeper", function(pData)
  RPC.execute("ev-npcs:purchaseDriversLicense", pData.type)
end)

AddEventHandler('ev-island:hideBlips', function(pState)
  for _, data in pairs(Handler.npcs) do
    if data["npc"].blipHandler then
      data["npc"].blipHandler:hide(pState)
    end
  end
end)