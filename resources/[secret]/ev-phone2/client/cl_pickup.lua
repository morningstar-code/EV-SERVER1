local pickupLocation = vector3(508.91, 3099.83, 41.31)
local pickupBlip = nil
local lastCheck = 0

Citizen.CreateThread(function()
    while true do
        local playerCoords = GetEntityCoords(PlayerPedId())
        if #(playerCoords - pickupLocation) < 1.0 and lastCheck + 60000 < GetGameTimer() then
            RPC.execute("phone:pickupPurchasedItems")
            lastCheck = GetGameTimer()
            if pickupBlip ~= nil then
                RemoveBlip(pickupBlip)
                pickupBlip = nil
            end
        end
        Citizen.Wait(1000)
    end
end)

function addPickUpBlip()
  pickupBlip = AddBlipForCoord(pickupLocation)
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
    local success, message = RPC.execute("phone:getCrypto", character_id)
    if not success then
        cb({ data = {}, meta = { ok = success, message = (not success and message or 'done') } })
        return
    end
    local found = nil
    for _, v in pairs(message) do
        if v.id == data.crypto_id then -- 1
            found = v
        end
    end

    if found == nil then
        cb({ data = {}, meta = { ok = false, message = ("%s Wallet not found"):format(data.crypto_id == 1 and "Shungite" or "Guinea") } })
        return
    end
    if found.amount < data.price then
        cb({ data = {}, meta = { ok = false, message = ("Not enough %s"):format(found.name) } })
        return
    end
    local requiredLaptopItem = laptopItems[data.item]
    if requiredLaptopItem and not exports["ev-inventory"]:hasEnoughOfItem(requiredLaptopItem, 1, true, true) then
      TriggerEvent(
        'phone:emailReceived',
        'Dark Market',
        '#A-1001',
        'No access code found'
      )
      return
    end
    local hasStock, itemToRemove = RPC.execute("phone:addPickupItem", data.item, found.wallet_id, data.price)
    if not hasStock then
      TriggerEvent(
        'phone:emailReceived',
        'Dark Market',
        '#A-1001',
        'Out of stock, or not enough SHUNG. Try later.'
      )
      return cb({ data = {}, meta = { ok = true, message = "done" } })
    end
    if itemToRemove then
      TriggerEvent("inventory:removeItem", itemToRemove, 1)
    end
    TriggerEvent(
      'phone:emailReceived',
      'Dark Market',
      '#A-1001',
      'You know where to go.'
    )
    addPickUpBlip()

    cb({ data = {}, meta = { ok = true, message = "done" } })
end)

RegisterNetEvent("ev-heists:itemStockAvailable")
AddEventHandler("ev-heists:itemStockAvailable", function(code, name)
  if exports['ev-inventory']:hasEnoughOfItem('vpnxj', 1, false, true) then
    TriggerEvent(
      'phone:emailReceived',
      'Dark Market',
      code,
      "A " .. name .. " will be available in 15 minutes."
    )
  end
end)

RegisterNetEvent("ev-heists:laptopReadyForPickup")
AddEventHandler("ev-heists:laptopReadyForPickup", function(code)
  if exports['ev-inventory']:hasEnoughOfItem('vpnxj', 1, false, true) then
    TriggerEvent(
      'phone:emailReceived',
      'Dark Market',
      code,
      'A laptop is ready for you to pick up. You know where to go.'
    )
  end
  addPickUpBlip()
end)