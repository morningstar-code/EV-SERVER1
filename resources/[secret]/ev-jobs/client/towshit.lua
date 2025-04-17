--Trailer script
local trailer = nil

Citizen.CreateThread(function()
  local entry = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "miscscripts_vehicletrailer_set",
            label = "Set Trailer",
            icon = "circle",
            event = "ev-miscscripts:vehicletrailer:set",
            parameters = {},
        },
				{
					id = "miscscripts_vehicletrailer_open",
					label = "Open Trailer",
					icon = "circle",
					event = "ev-miscscripts:vehicletrailer:openDoor",
					parameters = {},
				},
				{
					id = "miscscripts_vehicletrailer_close",
					label = "Close Trailer",
					icon = "circle",
					event = "ev-miscscripts:vehicletrailer:closeDoor",
					parameters = {},
				},
				{
					id = "miscscripts_vehicletrailer_lower_ramp",
					label = "Lower Top Ramp",
					icon = "circle",
					event = "ev-miscscripts:vehicletrailer:lowerTop",
					parameters = {},
				},
				{
					id = "miscscripts_vehicletrailer_up_ramp",
					label = "Reset Top Ramp",
					icon = "circle",
					event = "ev-miscscripts:vehicletrailer:toggleTop",
					parameters = {},
				}
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function(pEntity)
          local model = GetEntityModel(pEntity)
          return model == `tr2`
        end,
    }
  }
  exports["ev-interact"]:AddPeekEntryByEntityType(entry.group, entry.data, entry.options)
end)


local topDown = false
local trailer = 0
RegisterNetEvent("tow:toggletop")
AddEventHandler("tow:toggletop", function()
	if topDown then
		Sync.SetVehicleDoorShut(trailer, 4, false, false)
		topDown = false
	else
		topDown = true
		Sync.SetVehicleDoorOpen(trailer, 4, false, false)
	end
end)

RegisterNetEvent("tow:setcar")
AddEventHandler("tow:setcar", function()
	print("OLA")
	local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
	local targetCoords = GetEntityCoords(vehicle, false)
	local offset = GetOffsetFromEntityGivenWorldCoords(trailer, targetCoords.x, targetCoords.y, targetCoords.z)
	local entityRotation = GetEntityRotation(vehicle, 2)
	print(entityRotation)
	AttachEntityToEntity(vehicle, trailer, 0.0, offset.x, offset.y, offset.z, entityRotation.x, entityRotation.y, 0.0, false, false, true, false, 0, true)
end)

RegisterNetEvent("tow:unsetcar")
AddEventHandler("tow:unsetcar", function()
	local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
	DetachEntity(vehicle, true, true)
end)

RegisterNetEvent("ev-miscscripts:vehicletrailer:set")
AddEventHandler("ev-miscscripts:vehicletrailer:set", function(pContext, pEntity)
	trailer = pEntity
	TriggerEvent("DoLongHudText", "Successfully set trailer", 1, 12000, { i18n = { "Successfully set trailer" } })
end)

RegisterNetEvent("ev-miscscripts:vehicletrailer:openDoor")
AddEventHandler("ev-miscscripts:vehicletrailer:openDoor", function(pContext, pEntity)
	Sync.SetVehicleDoorOpen(pEntity, 5, false, false)
	TriggerEvent("DoLongHudText", "Successfully opened trailer", 1, 12000, { i18n = { "Successfully opened trailer" } })
end)

RegisterNetEvent("ev-miscscripts:vehicletrailer:closeDoor")
AddEventHandler("ev-miscscripts:vehicletrailer:closeDoor", function(pContext, pEntity)
	Sync.SetVehicleDoorShut(pEntity, 5, true, true)
	TriggerEvent("DoLongHudText", "Successfully closed trailer", 1, 12000, { i18n = { "Successfully closed trailer" } })
end)

RegisterNetEvent("ev-miscscripts:vehicletrailer:toggleTop")
AddEventHandler("ev-miscscripts:vehicletrailer:toggleTop", function(pContext, pEntity)
	Sync.SetVehicleDoorShut(pEntity, 4, 0, 1)
end)

RegisterNetEvent("ev-miscscripts:vehicletrailer:lowerTop")
AddEventHandler("ev-miscscripts:vehicletrailer:lowerTop", function(pContext, pEntity)
	Sync.SetVehicleDoorOpen(pEntity, 4, 0, 1)
end)

function isVehicleDoorOpen(pEntity, pDoor)
	return GetVehicleDoorAngleRatio(pEntity, pDoor) >= 0.1
end

--boat trailer 

local models = {
	[`tropic`] = { y = -0.75, z = 0.75 },
	[`suntrap`] = { y = -0.5, z = 0.35 },
  }
  local trailer = nil
  AddEventHandler("vehicle:primeTrailerForMounting", function(params, pEntity)
	TriggerEvent("DoLongHudText", "Trailer is prepped for use.", 1)
	trailer = pEntity
  end)
  
  AddEventHandler("vehicle:mountBoatOnTrailer", function()
	if not trailer then
	  TriggerEvent("DoLongHudText", "No trailer prepared.", 2)
	  return
	end
	local ped = PlayerPedId()
	local boat = GetVehiclePedIsIn(ped)
	if #(GetEntityCoords(boat) - GetEntityCoords(trailer)) > 10.0 then
	  TriggerEvent("DoLongHudText", "Trailer too far away", 2)
	  return
	end
	local finished = exports["ev-taskbar"]:taskBar(10000, "Mounting...")
	if finished ~= 100 then return end
	local boatCoords = GetEntityCoords(boat)
	local boatRot = GetEntityRotation(trailer)
	local trailerCoords = GetEntityCoords(trailer)
	SetEntityCollision(boat, false, false)
	SetEntityCoords(boat, trailerCoords.x, trailerCoords.y, trailerCoords.z + 0.005, 1, 0, 0, 1)
	SetEntityHeading(boat, GetEntityHeading(trailer))
	FreezeEntityPosition(boat, true, false)
	local boatModel = GetEntityModel(boat)
	local y = models[boatModel] and models[boatModel].y or 0.0
	local z = models[boatModel] and models[boatModel].z or 0.0
	AttachEntityToEntity(boat, trailer, 20, 0.0, y, z, 0.0, 0.0, 0.0, false, true, true, false, 20, true)
	FreezeEntityPosition(boat, false, false)
	trailer = nil
  end)
  
  Citizen.CreateThread(function()
	RegisterCommand("+detachBoat", function()
	  local ped = PlayerPedId()
	  local veh = GetVehiclePedIsIn(ped)
	  if veh == 0 then
		return false
	  end
	  local seat = GetPedInVehicleSeat(veh, -1)
	  if seat ~= ped then
		return false
	  end
	  local model = GetEntityModel(veh)
	  if not (IsThisModelABoat(model) or IsThisModelAJetski(model) or IsThisModelAnAmphibiousCar(model)) then
		return false
	  end
	  DetachEntity(veh, false, true)
	end, false)
	RegisterCommand("-detachBoat", function() end, false)
	exports["ev-keybinds"]:registerKeyMapping("", "Vehicle", "Detach Boat", "+detachBoat", "-detachBoat")
  end)

  --tow shit
  local towingProcess = false

local BlacklistedModels = {
  [`stockade`] = true
}

local BlacklistedClasses = {
  [15] = true,
  [16] = true
}

function RequestControl(pEntity)
  local timeout = false

  if not NetworkHasControlOfEntity(pEntity) then
    NetworkRequestControlOfEntity(pEntity)

    Citizen.SetTimeout(1000, function () timeout = true end)

    while not NetworkHasControlOfEntity(pEntity) and not timeout do
      NetworkRequestControlOfEntity(pEntity)
      Citizen.Wait(100)
    end
  end

  return NetworkHasControlOfEntity(pEntity)
end

function FindVehicleAttachedToVehicle(pVehicle)
  local handle, vehicle = FindFirstVehicle()

  local success

  repeat
    if GetEntityAttachedTo(vehicle) == pVehicle then
      return vehicle
    end

        success, vehicle = FindNextVehicle(handle)
  until not success

  EndFindVehicle(handle)
end


function GetAttachOffset(pTarget)
  local model = GetEntityModel(pTarget)
  local minDim, maxDim = GetModelDimensions(model)
  local vehSize = maxDim - minDim
  return vector3(0, -(vehSize.y / 2), 0.4 - minDim.z)
end 

function AttachToFlatbed(pFlatbed, pEntity, pTarget)
  local distance = #(GetEntityCoords(pTarget) - GetEntityCoords(pEntity))
  local speed = GetEntitySpeed(pTarget)
  local isTowing = exports["ev-flags"]:HasVehicleFlag(pEntity, 'isTowingVehicle')

  if not isTowing and distance <= 15 and speed <= 3.0 then
    local offset = GetAttachOffset(pTarget)

    if offset then
      local hasControlOfTow = RequestControl(pEntity)
      local hasControlOfTarget = RequestControl(pTarget)

      if hasControlOfTow and hasControlOfTarget then
        AttachEntityToEntity(pTarget, pEntity, GetEntityBoneIndexByName(pEntity, 'bodyshell'), offset.x, offset.y, offset.z, 0, 0, 0, 1, 1, 0, 0, 0, 1)
        SetCanClimbOnEntity(pTarget, false)
        exports['ev-flags']:SetVehicleFlag(pEntity, 'isTowingVehicle', true)
      end
    end
  end
end

function DetachFromFlatbed(pEntity, pTarget)
  local drop = GetOffsetFromEntityInWorldCoords(pTarget, 0.0,-5.5,0.0)

  if IsEntityAttachedToEntity(pTarget, pEntity) then
    Sync.DetachEntity(pTarget, true, true)
    Citizen.Wait(100) 
    Sync.SetEntityCoords(pTarget, drop) 
    Citizen.Wait(100)
    Sync.SetVehicleOnGroundProperly(pTarget)
    exports['ev-flags']:SetVehicleFlag(pEntity, 'isTowingVehicle', false)
  end
end

RegisterNetEvent('jobs:towVehicle')
AddEventHandler('jobs:towVehicle', function (pParams, pEntity, pContext)
  local target = exports['ev-target']:GetEntityInFrontOfEntity(pEntity, -8, 0.6) 

  if target == nil or target == 0 then 
    return TriggerEvent("DoLongHudText","No vehicle found", 2)
  end

  local targetModel = GetEntityModel(target)
  local targetClass = GetVehicleClass(target)

  if (BlacklistedModels[targetModel] or BlacklistedClasses[targetClass]) then
    return TriggerEvent("DoLongHudText","Cannot tow this vehicle", 2)
  end

  local targetDriver = GetPedInVehicleSeat(target, -1)

  if targetDriver ~= 0 then return TriggerEvent("DoLongHudText","Vehicle must be empty.", 2) end

  local driver = GetPedInVehicleSeat(pEntity, -1)

  if target and pEntity ~= target and GetEntityType(target) == 2 and GetEntityModel(pEntity) == `flatbed` then
    local towCoords, targetCoords = GetEntityCoords(pEntity), GetEntityCoords(target)
    local distance = #(targetCoords - towCoords)

    if distance <= 10 then
        TaskTurnPedToFaceCoord(PlayerPedId(), targetCoords, 1.0)
        Citizen.Wait(1000)
      TriggerEvent("animation:tow")

      local hooking = exports["ev-taskbar"]:taskBar(15000,"Hooking up vehicle.")
      if hooking == 100 then
        TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 10.0, 'towtruck2', 0.5)
        local towing = exports["ev-taskbar"]:taskBar(5000,"Towing Vehicle")

        local serverId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(driver))
        local tow, vehicle = NetworkGetNetworkIdFromEntity(pEntity), NetworkGetNetworkIdFromEntity(target)

        if driver and driver ~= 0 then
          TriggerServerEvent('tow:attachVehicle', serverId, pContext.model, tow, vehicle)
        else
          AttachToFlatbed(pContext.model, pEntity, target)
        end

        TriggerServerEvent('tow:vehicleAttached', pContext.model, tow, vehicle)
      end
      ClearPedSecondaryTask(PlayerPedId())
      towingProcess = false
      return
    end
  end

  TriggerEvent("DoLongHudText","No vehicle found", 2)
end)

RegisterNetEvent('jobs:untowVehicle')
AddEventHandler('jobs:untowVehicle', function (pParams, pEntity, pContext)
  local target = FindVehicleAttachedToVehicle(pEntity)

  if target and target ~= pEntity and target ~= 0 then
    TaskTurnPedToFaceEntity(PlayerPedId(), pEntity, 1.0)
    Citizen.Wait(1000)
    TriggerEvent("animation:tow")
    local untowing = exports["ev-taskbar"]:taskBar(7000,"Untowing Vehicle")

    if untowing == 100 then
      TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 10.0, 'towtruck2', 0.5)
      local unhooking = exports["ev-taskbar"]:taskBar(5000,"Unhooking Vehicle")
      DetachFromFlatbed(pEntity, target)
    end
    ClearPedSecondaryTask(PlayerPedId())
    towingProcess = false
    return
  end

  TriggerEvent("DoLongHudText","No vehicle found", 2)
end)

RegisterNetEvent('animation:tow')
AddEventHandler('animation:tow', function()
  towingProcess = true
    local lPed = PlayerPedId()
    RequestAnimDict("mini@repair")
    while not HasAnimDictLoaded("mini@repair") do
        Citizen.Wait(0)
  end

  TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 10.0, 'towtruck', 0.5)

    while towingProcess do

        if not IsEntityPlayingAnim(lPed, "mini@repair", "fixing_a_player", 3) then
            ClearPedSecondaryTask(lPed)
            TaskPlayAnim(lPed, "mini@repair", "fixing_a_player", 8.0, -8, -1, 16, 0, 0, 0, 0)
        end
        Citizen.Wait(1)
    end
    ClearPedTasks(lPed)
end)

RegisterNetEvent('tow:attachVehicle')
AddEventHandler('tow:attachVehicle', function(pModel, pTow, pVehicle)
  local tow, vehicle = NetworkGetEntityFromNetworkId(pTow), NetworkGetEntityFromNetworkId(pVehicle)

  if DoesEntityExist(tow) and DoesEntityExist(vehicle) then
    AttachToFlatbed(pModel, tow, vehicle)
  end
end)