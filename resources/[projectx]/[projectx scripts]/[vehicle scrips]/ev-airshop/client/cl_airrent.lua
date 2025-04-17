
local cooldown = 0
local vehicleList = {
  -- { name = "Boat Trailer", model = "boattrailer", price = 500 },

  { name = "Frogger", model = "frogger", price = 5000 },
  { name = "Swift", model = "swift", price = 6500 },
  { name = "Sea Sparrow", model = "seasparrow", price = 5000 },
}

local rentalLocations = {
  ["veh_air_rentals"] = { name = "Vespucci air", coords = vector3(-1631.41, -3143.26, 13.99), heading = 330.003 },
}

local function showVehicleMenu()
  local rentalShop = getClosestRentalShop()
  if rentalShop == nil then return end

  local data = {}
  for _, vehicle in pairs(vehicleList) do
    data[#data + 1] = {
      title = vehicle.name,
      description = "$" .. vehicle.price .. ".00",
      -- image = vehicle.image,
      icon = "helicopter",
      key = vehicle.model,
      children = {
        { title = "Confirm Purchase", action = "ev-ui:rentalPurchase", icon = "check-circle", key = vehicle.model, description = "" },
        { title = "Cancel Purchase", icon = "times-circle", action = "ev-ui:aircancelPurchase", key = nil },
      },
    }
  end
  exports["ev-ui"]:showContextMenu(data)
end

function getClosestRentalShop()
  local shop = nil
  local minDist = 25.0

  for k, v in pairs(rentalLocations) do
    local dist = #(GetEntityCoords(PlayerPedId()) - v.coords)
    if dist <= minDist then
      shop = v
    end
  end

  return shop
end

RegisterUICallback("ev-ui:rentalPurchase", function(data, cb)
  local rentalShop = getClosestRentalShop()
  if rentalShop == nil then return end
  cb({ data = {}, meta = { ok = true, message = "done" } })

  if cooldown >= 1 then 
    TriggerEvent("DoLHudText", 2, "You can only rent once every 30 mins!")
    return
  end

  local finished = exports["ev-taskbar"]:taskBar(10000, "Renting", false, true, false, false, nil, 2.5, PlayerPedId())
  if finished ~= 100 then return end

  if IsAnyVehicleNearPoint(rentalShop.coords.x, rentalShop.coords.y, rentalShop.coords.z, 3.0) then
    TriggerEvent("DoLHudText", 2, "Vehicle in the way.")
    cb({ data = {}, meta = { ok = true, message = 'done' } })
    return
  end
  local d = nil
  for _, v in pairs(vehicleList) do
    if d == nil and v.model == data.key then
      d = v
    end
  end
  d.character = data.character
  local success, message = RPC.execute("rentals:purchaseVehicle", d)
  if not success then
      cb({ data = {}, meta = { ok = success, message = message } })
      return
  end
  local model = data.key
  -- DoScreenFadeOut(200)

  local coords = { 
    x = rentalShop.coords.x, 
    y = rentalShop.coords.y, 
    z = rentalShop.coords.z
  }
  local rentalInfo = RPC.execute("ev:vehicles:rentalSpawn", model, coords, rentalShop.heading)
  local timeout = 10
  while not NetworkDoesEntityExistWithNetworkId(rentalInfo) and timeout > 0 do
      timeout = timeout - 1
      Wait(1000)
  end

  local veh = NetworkGetEntityFromNetworkId(rentalInfo)
  TriggerEvent("vehicle:keys:addNew", veh)

  SetVehicleDirtLevel(veh, 0.0)
  RemoveDecalsFromVehicle(veh)

  if not DoesEntityExist(veh) then 
    TriggerEvent("DoLHudText", 2, "Could not find rental vehicle.")
    cb({ data = {}, meta = { ok = true, message = "done" } })
    return 
  end
  local rnd = math.random(32135131)
  exports['ev-flags']:SetVehicleFlag(veh, 'isRentalVehicle', true)
  local plateText = GetVehicleNumberPlateText(veh)
  
  local metaData = {
    Plate = plateText,
    netId = rentalInfo,
    _hideKeys = {"netId"}

  }
  TriggerEvent('player:receiveItem', 'rentalpapers', 1, metaData, {}, metaData)
  TriggerEvent("DoLHudText", 1, "You have 15 second to move your vehicle")
  cooldown = 1800 --30 mins
  Citizen.SetTimeout(15000, function()
    if IsAnyVehicleNearPoint(rentalShop.coords.x, rentalShop.coords.y, rentalShop.coords.z, 3.0) then
      exports["ev-sync"].SyncedExecution("DeleteEntity", veh)
    end
  end)
end)

RegisterNetEvent("ev-npcs:ped:vehiclekeeperrent")
AddEventHandler("ev-npcs:ped:vehiclekeeperrent", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local npcHashes = {
    [GetHashKey("npc_air_shop")] = true,
  }
  local showMenu = false

  for k, v in pairs(npcHashes) do
    if k == DecorGetInt(pEntity, "NPC_ID") then
      showMenu = true
    end
  end

  if not showMenu then return end

  showVehicleMenu()
end)

AddEventHandler("ev-inventory:itemUsed", function(item, info)
  if item == "rentalpapers" then
      local data = json.decode(info)
      local ent = NetworkGetEntityFromNetworkId(data.netId)
      local vin = exports["ev-vehicles"]:GetVehicleIdentifier(ent)
      local isRental = vin ~= nil

      if isRental then
        RPC.execute("rentals:getVehicleKey", ent)
        TriggerEvent("DoLHudText", 1, "You received keys to the rental.")
      else
        TriggerEvent("DoLHudText", 2, "That rental does not exist.")
      end
  end
end)

Citizen.CreateThread(function()
  while true do
      Citizen.Wait(1000)
      if cooldown >= 1 then
          cooldown = cooldown - 1
      end
  end
end)
