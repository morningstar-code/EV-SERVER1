airInfo = {}
airModel = {}
airCoords = {}
airHeading = {}
getVehicleKey = {}
getVehicle = {}

RegisterNetEvent("air:purchaseVehicle")
AddEventHandler("air:purchaseVehicle", function(d)
  airInfo = d
end)

RegisterNetEvent("ev:vehicles:airpawn")
AddEventHandler("ev:vehicles:airpawn", function(model, coords, heading)
  airModel = model
  airCoords = coords
  airHeading = heading
end)

RegisterNetEvent("air:getVehicleKey")
AddEventHandler("air:getVehicleKey", function(vin, carModel)
  getVehicleKey = vin
  getVehicle = carModel
end)

RPC.register("air:purchaseVehicle", function(pSource)
  local user = exports["ev-base"]:getModule("Player"):GetUser(pSource) 
  local success = false
  if user:getCash() >= airInfo.retail_price then
    user:removeMoney(airInfo.retail_price)
    success = true
  else
    success = false
  end
  return success
end)

RPC.register("ev:vehicles:airpawn", function(pSource)
  local target = pSource
  local vehicle = airModel
  local coords = airCoords
  local heading = airHeading
  local mathRandom = math.random(15000, 99990)
  local vin = 'RN '.. mathRandom .. ' STR ' .. mathRandom ..''
  local addMods = nil
  local user = exports["ev-base"]:getModule("Player"):GetUser(target)
  local info = user:getCurrentCharacter()
  local vehicleSpawn = exports["ev-vehicles"]:GenerateVehicleInfo(target, info.id, vehicle, "pd", "pd", nil, airInfo.name)
  TriggerEvent("ev:vehicles:InsertVehicleData", target, vehicleSpawn)
  local netID = exports["ev-vehicles"]:BasicSpawn(target, vehicle, coords, heading, 'menu', nil, vin, addMods)
  return netID
end)

