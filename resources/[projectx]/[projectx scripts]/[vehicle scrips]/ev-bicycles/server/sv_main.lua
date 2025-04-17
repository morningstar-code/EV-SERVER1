bicyclesInfo = {}
bicyclesModel = {}
bicyclesCoords = {}
bicyclesHeading = {}
getVehicleKey = {}
getVehicle = {}

RegisterNetEvent("bicycles:purchaseVehicle")
AddEventHandler("bicycles:purchaseVehicle", function(d)
  bicyclesInfo = d
end)

RegisterNetEvent("ev:vehicles:bicyclespawn")
AddEventHandler("ev:vehicles:bicyclespawn", function(model, coords, heading)
  bicyclesModel = model
  bicyclesCoords = coords
  bicyclesHeading = heading
end)

RegisterNetEvent("bicycles:getVehicleKey")
AddEventHandler("bicycles:getVehicleKey", function(vin, carModel)
  getVehicleKey = vin
  getVehicle = carModel
end)

RPC.register("bicycles:purchaseVehicle", function(pSource)
  local user = exports["ev-base"]:getModule("Player"):GetUser(pSource) 
  local success = false
  if user:getCash() >= bicyclesInfo.retail_price then
    user:removeMoney(bicyclesInfo.retail_price)
    success = true
  else
    success = false
  end
  return success
end)

RPC.register("ev:vehicles:bicyclespawn", function(pSource)
  local target = pSource
  local vehicle = bicyclesModel
  local coords = bicyclesCoords
  local heading = bicyclesHeading
  local mathRandom = math.random(15000, 99990)
  local vin = 'RN '.. mathRandom .. ' RPC ' .. mathRandom ..''
  local addMods = nil
  local user = exports["ev-base"]:getModule("Player"):GetUser(target)
  local info = user:getCurrentCharacter()
  local vehicleSpawn = exports["ev-vehicles"]:GenerateVehicleInfo(target, info.id, vehicle, "pd", "pd", nil, bicyclesInfo.name)
  TriggerEvent("ev:vehicles:InsertVehicleData", target, vehicleSpawn)
  local netID = exports["ev-vehicles"]:BasicSpawn(target, vehicle, coords, heading, 'menu', nil, vin, addMods)
  return netID
end)

RPC.register("bicycles:getVehicleKey", function(pSource)
  local src = source
  TriggerClientEvent("vehicle:keys:addNew", source, getVehicle, getVehicleKey)
  print(getVehicleKey)
  return
end)
