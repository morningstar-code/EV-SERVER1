local inCorner = false
local inCornerId = nil
local menuSellButtonActive = false
local currentTarget = nil
local playerCornering = false
local lastCornerSale

AddEventHandler("ev-meth:cornerSellProduct", function(pArgs, pEntity)
    local gameTimer = GetGameTimer()

    if lastCornerSale and (gameTimer - lastCornerSale) <= 4000 then
        return TriggerEvent('ev-meth:cleanAttempt', lastCornerSale - gameTimer)
    end

    lastCornerSale = gameTimer

    if not exports["ev-inventory"]:hasEnoughOfItem("methlabproduct", 1, false, true) then
        TriggerEvent("DoLongHudText", "No product...", 2)
        return
    end
    function loadAnimDict(dict)
        while ( not HasAnimDictLoaded(dict) ) do
            RequestAnimDict(dict)
            Citizen.Wait(0)
        end
    end
    loadAnimDict('anim@narcotics@trash')
    TaskPlayAnim(PlayerPedId(), 'anim@narcotics@trash', 'drop_front',0.9, -8, 1500, 49, 3.0, 0, 0, 0)
    local success = RPC.execute("ev-meth:attemptCornerSale", NetworkGetNetworkIdFromEntity(pEntity), inCornerId)
    if success then
        TriggerEvent("money:clean")
    end
end)

AddEventHandler("ev-meth:cornerStartSelling", function()
    local result = RPC.execute("ev-meth:startCornering", inCornerId)
    if not result then return end
    TriggerEvent("ev-meth:showSellDrugsMenuItem", "cancorner", false)
    playerCornering = true
end)

AddEventHandler("ev-polyzone:enter", function(name, data)
    if name ~= "meth_corner" then return end
    if not exports["ev-inventory"]:hasEnoughOfItem("methlabproduct", 1, false) then return end
    inCorner = true
    inCornerId = data.id
    TriggerEvent("DoLongHudText", "Looks like a good spot to sell...")
    TriggerEvent("ev-meth:showSellDrugsMenuItem", "cancorner", true)
end)
AddEventHandler("ev-polyzone:exit", function(name, data)
    if name ~= "meth_corner" then return end
    if not inCorner then return end
    if playerCornering then
        RPC.execute("ev-meth:stopCornering")
        TriggerEvent("DoLongHudText", "No longer selling...", 2)
    end
    inCorner = false
    inCornerId = nil
    TriggerEvent("ev-meth:showSellDrugsMenuItem", "cancorner", false)
end)

local IgnoredClasses = {
  [10] = true,
  [11] = true,
  [14] = true,
  [15] = true,
  [16] = true,
  [17] = true,
  [18] = true,
  [19] = true,
  [20] = true,
  [21] = true,
}

function IsValidCandidate(pVehicle)
  local vehicleClass = GetVehicleClass(pVehicle)
  return not IgnoredClasses[vehicleClass]
end

local usedNetIds = {}

RegisterNetEvent("ev-meth:findCandidateVehicle")
AddEventHandler("ev-meth:findCandidateVehicle", function(pCornerId, pSrc, pResult)
  PopulateNow()
  Wait(0)
  local vehicles = GetGamePool('CVehicle')

  local cornerVehicle, cornerPed

  for _, vehicle in ipairs(vehicles) do
      if IsValidCandidate(vehicle) then
          local ped = GetPedInVehicleSeat(vehicle, -1)

          if DoesEntityExist(ped) and
            not IsPedAPlayer(ped)
            and not IsPedDeadOrDying(ped)
            and #(GetEntityCoords(PlayerPedId()) - GetEntityCoords(vehicle)) < 210
          then
              cornerVehicle = NetworkGetNetworkIdFromEntity(vehicle)
              if not usedNetIds[cornerVehicle] then
                usedNetIds[cornerVehicle] = true
                cornerPed = NetworkGetNetworkIdFromEntity(ped)

                SetEntityAsMissionEntity(vehicle, true, true)
                SetEntityAsMissionEntity(ped, true, true)
                break
              end
          end
      end
  end

  TriggerServerEvent("ev-meth:corneringFoundVehicle", pCornerId, pSrc, { vehicle = cornerVehicle, driver = cornerPed })
end)

RPC.register('ev-meth:findCandidate', function(src)
  PopulateNow()
  Wait(0)
  local vehicles = GetGamePool('CVehicle')

  local cornerVehicle, cornerPed

  for _, vehicle in ipairs(vehicles) do
      if IsValidCandidate(vehicle) then
          local ped = GetPedInVehicleSeat(vehicle, -1)

          if DoesEntityExist(ped) and
            not IsPedAPlayer(ped)
            and not IsPedDeadOrDying(ped)
            and #(GetEntityCoords(PlayerPedId()) - GetEntityCoords(vehicle)) < 210
          then
              cornerVehicle = NetworkGetNetworkIdFromEntity(vehicle)
              if not usedNetIds[cornerVehicle] then
                usedNetIds[cornerVehicle] = true
                cornerPed = NetworkGetNetworkIdFromEntity(ped)

                SetEntityAsMissionEntity(vehicle, true, true)
                SetEntityAsMissionEntity(ped, true, true)
                break
              end
          end
      end
  end

  return { vehicle = cornerVehicle, driver = cornerPed }
end)
