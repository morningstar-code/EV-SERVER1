local pickupLocation = vector3(508.91, 3099.83, 41.31)
local lastCheck = 0
local blip = nil
Citizen.CreateThread(function()
    while true do
        local playerCoords = GetEntityCoords(PlayerPedId())
        if #(playerCoords - pickupLocation) < 1.0 and lastCheck + 60000 < GetGameTimer() then
            RPC.execute("heists:pickupPurchasedItems")
            lastCheck = GetGameTimer()
            if blip ~= nil then
              RemoveBlip(blip)
            end
        end
        Citizen.Wait(1000)
    end
end)

function addPickUpBlip()
  blip = AddBlipForCoord(pickupLocation)
  SetBlipSprite(blip, 440)
  SetBlipScale(blip, 1.2)
  SetBlipColour(blip, 5)
  SetBlipAsShortRange(blip, true)
  BeginTextCommandSetBlipName("STRING")
  AddTextComponentString("Item Pickup")
  EndTextCommandSetBlipName(blip)
end

local laptopItems = {
  ["heistlaptop3"] = "heistusb4",
  ["heistlaptop2"] = "heistusb1",
  ["heistlaptop4"] = "heistusb2",
  ["heistlaptop1"] = "heistusb3",
  ["lvaccesscodes"] = "heistusb3",
  ["vcomputerusb"] = "heistusb3",
  ["heistpadyacht"] = "heistusb3",
}

RegisterUICallback("ev-ui:heistsPurchaseItem", function(data, cb)
    local character_id = data.character.id
    local success, message = RPC.execute("phone:getCryptos", character_id)
    if not success then
        cb({ data = {}, meta = { ok = success, message = (not success and message or 'done') } })
        return
    end
    local cryptoName = data.crypto_id == 2 and "Guinea" or "Shungite"
    local cryptoTicker = data.crypto_id == 2 and "GNE" or "SHUNG"
    local found = nil
    for _, v in pairs(message) do
        if v.id == data.crypto_id then
            found = v
        end
    end
    if found == nil then
        cb({ data = {}, meta = { ok = false, message = cryptoName .. " wallet not found" } })
        return
    end
    if found.amount < data.price then
        cb({ data = {}, meta = { ok = false, message = "Not enough " .. cryptoName } })
        return
    end
    cb({ data = {}, meta = { ok = true, message = "done" } })
    local requiredLaptopItem = laptopItems[data.item]
    if requiredLaptopItem and not exports["ev-inventory"]:hasEnoughOfItem(requiredLaptopItem, 1, true, true) then
      TriggerEvent('phone:emailReceived', 'Dark Market', '#A-1001', 'No access code found')
      return
    end
    local hasStock, itemToRemove = RPC.execute("heists:addPickupItem", data.item, found.id, data.price)
    if not hasStock then
      TriggerEvent('phone:emailReceived', 'Dark Market', '#A-1001', 'Out of stock, or not enough ' .. cryptoTicker .. '. Try later.')
      return
    end
    if itemToRemove then
      -- TriggerEvent("inventory:removeItem", itemToRemove, 1)
    end
    TriggerEvent('phone:emailReceived', 'Dark Market', '#A-1001', 'You know where to go.')
    addPickUpBlip()
end)

RegisterNetEvent("ev-heists:itemStockAvailable")
AddEventHandler("ev-heists:itemStockAvailable", function(code, name)
  if exports['ev-inventory']:hasEnoughOfItem('vpnxj', 1, false, true) then
    TriggerEvent('phone:emailReceived', 'Dark Market', code, "A " .. name .. " will be available in 15 minutes.")
  end
end)

RegisterNetEvent("ev-heists:laptopReadyForPickup")
AddEventHandler("ev-heists:laptopReadyForPickup", function(code)
  if exports['ev-inventory']:hasEnoughOfItem('vpnxj', 1, false, true) then
    TriggerEvent('phone:emailReceived', 'Dark Market', code, 'A laptop is ready for you to pick up. You know where to go.')
  end
  addPickUpBlip()
end)

RegisterNetEvent("ev-heists:addPickupBlip", function()
  addPickUpBlip()
end)

AddEventHandler("ev-heists:laptopPurchase", function()
  local pracWhitelist = exports['ev-config']:GetMiscConfig("heists.prac.whitelist")
  local exp = RPC.execute("ev-heists:hacks:getExperience")
  local items = {
    {
      action = "ev-heists:context:laptopPurchase",
      title = "Practice Makes Perfect",
      key = 1,
      disabled = true,
    },
    {
      action = "ev-heists:context:laptopPurchase",
      title = "Green Laptop (100SHUNG)",
      description = "Useful for Fleecas",
      key = { item = "heistlaptop3", price = 100, dongle = "heistusb4" },
      disabled = (not pracWhitelist) and (exp < 5),
    },
    {
      action = "ev-heists:context:laptopPurchase",
      title = "Blue Laptop (250SHUNG)",
      description = "Useful for Paleto",
      key = { item = "heistlaptop2", price = 250, dongle = "heistusb1" },
      disabled = exp < 50,
    },
    {
      action = "ev-heists:context:laptopPurchase",
      title = "Red Laptop (500SHUNG)",
      description = "Useful for Upper Vault (City Bank)",
      key = { item = "heistlaptop4", price = 500, dongle = "heistusb2" },
      disabled = exp < 600,
    },
    {
      action = "ev-heists:context:laptopPurchase",
      title = "Gold Laptop (1500SHUNG)",
      description = "Useful for Lower Vault (City Bank)",
      key = { item = "heistlaptop1", price = 1500, dongle = "heistusb3" },
      disabled = exp < 10000,
    },
  }
  exports["ev-ui"]:showContextMenu(items)
end)

RegisterUICallback("ev-heists:context:laptopPurchase", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "" }})
  exports['ev-ui']:closeApplication('contextmenu') 

  local character_id = exports["isPed"]:isPed("cid")
  local success, message = RPC.execute("phone:GetCrypto", character_id)
  if not success then
    TriggerEvent("DoLongHudText", "Could not complete purchase.", 2)
    return
  end
  local found = nil
  for _, v in pairs(message) do
    if tonumber(v.cryptoid) == 2 then
      found = v
    end
  end
  if found == nil then
    TriggerEvent("DoLongHudText", "Wallet not found.", 2)
    return
  end
  if found.cryptoamount < data.key.price then
    TriggerEvent("DoLongHudText", "Not enough SHUNG.", 2)
    return
  end
  local dongle = data.key.dongle
  if dongle then
    local hasDongle = exports["ev-inventory"]:hasEnoughOfItem(dongle, 1, false, true)
    if not hasDongle then
      TriggerEvent("DoLongHudText", "Missing dongle.", 2)
      return
    end
    TriggerEvent("inventory:removeItem", dongle, 1)
  end

  RPC.execute("heists:addPickupItem", data.key.item, found.cryptoid, data.key.price)
  TriggerEvent('phone:emailReceived', 'Dark Market', '#A-1001', 'You know where to go.')
  addPickUpBlip()
end)

AddEventHandler("ev-heists:banks:bankCheck", function()
  local items = RPC.execute("ev-heists:banksAvailability")
  exports["ev-ui"]:showContextMenu(items)
end)

RegisterUICallback("ev-ui:heistsBanksAvailable", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "" }})
end)