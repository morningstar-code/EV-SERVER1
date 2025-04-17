Citizen.CreateThread(function()
  exports['ev-interact']:AddPeekEntryByModel({ `ch_prop_casino_drone_02a`, `xs_prop_arena_drone_02` }, {
    { id = 'drone_pickup', event = 'ev-rcvehicles:pickupDrone', icon = 'people-carry', label = 'pickup' },
  }, {
    distance = { radius = 3.0 },
    isEnabled = function(pEntity)
      return #GetEntityVelocity(pEntity) < 0.2
    end
  })
end)

AddEventHandler('ev-rcvehicles:pickupDrone', function(pArgs, pEntity, pContext)
    if not pEntity then return end

    RPC.execute('ev-rcvehicles:pickupDrone', NetworkGetNetworkIdFromEntity(pEntity))
end)

AddEventHandler('ev-rcvehicles:pickupCar', function(pArgs, pEntity, pContext)
  if not pEntity then return end

  RPC.execute('ev-rcvehicles:pickupCar', NetworkGetNetworkIdFromEntity(pEntity))
end)

AddEventHandler('ev-inventory:itemUsed', function(pItem, pInfo, pSlot)
  if pItem == 'drone_lspd' then
    local info = json.decode(pInfo)
    -- Use ev-objects placement
    local droneSettings = {
      model = `ch_prop_casino_drone_02a`, -- police drone
      camOffset = { -0.25, -0.1 },
      maxDistance = 360.0,
      lifeTime = (info.battery or 45) * 60,
      name = 'Police Drone #' .. info.id,
      id = info.id,
    }
    local placement = placeVehicle(droneSettings)
    if not placement then
      return
    end

    if not exports['ev-inventory']:hasEnoughOfItem(pItem, 1, false, true) then
      return
    end

    droneSettings.position = vector3(placement.coords.x, placement.coords.y, placement.coords.z)
    droneSettings.rotation = vector3(placement.rotation.x, placement.rotation.y, placement.rotation.z)
    droneSettings.item = pItem

    RPC.execute('ev-rcvehicles:placeDrone', droneSettings)
  end

  if pItem == 'drone_civ' then
    local info = json.decode(pInfo)
    local droneSettings = {
      model = `xs_prop_arena_drone_02`,
      camOffset = { -0.125, -0.135 },
      maxDistance = 320.0,
      lifeTime = (info.battery or 45) * 60,
      name = 'Civilian Drone #' .. info.id,
      id = info.id,
    }
    local placement = placeVehicle(droneSettings)
    if not placement then
      return
    end

    if not exports['ev-inventory']:hasEnoughOfItem(pItem, 1, false, true) then
      return
    end

    droneSettings.position = vector3(placement.coords.x, placement.coords.y, placement.coords.z)
    droneSettings.rotation = vector3(placement.rotation.x, placement.rotation.y, placement.rotation.z)
    droneSettings.item = pItem

    RPC.execute('ev-rcvehicles:placeDrone', droneSettings)
  end

  if pItem == 'rc_car_civ' then
    local info = json.decode(pInfo)
    local carSettings = {
      model = `rcbandito`,
      camOffset = { 0.115, 0.35 },
      maxDistance = 320.0,
      lifeTime = (info.battery or 45) * 60,
      name = 'Civilian Car #' .. info.id,
      id = info.id,
    }

    local placement = placeVehicle(carSettings)
    if not placement then
      return
    end

    if not exports['ev-inventory']:hasEnoughOfItem(pItem, 1, false, true) then
      return
    end

    carSettings.position = vector3(placement.coords.x, placement.coords.y, placement.coords.z)
    carSettings.rotation = vector3(placement.rotation.x, placement.rotation.y, placement.rotation.z)
    carSettings.item = pItem

    RPC.execute('ev-rcvehicles:placeCar', carSettings)
  end

  if pItem == 'rccontroller' then
    -- Open RC context menu with active vehicles
    local context = { { title = 'RC Vehicles', icon = 'gamepad' } }
    for droneId, drone in pairs(DRONES) do
      context[#context + 1] = {
        title = drone.name,
        description = 'Battery Remaining: ' .. tostring(getRemainingBattery(drone)) ..
            ' minutes',
        icon = 'helicopter',
        children = {
          {
            title = 'Pilot',
            icon = 'gamepad',
            action = 'ev-rcvehicles:drone:contextAction',
            key = { action = 'pilotDrone', drone = droneId },
          },
        },
      }
    end

    for carId, car in pairs(CARS) do
      context[#context+1] = {
        title = car.name,
        description = 'Battery Remaining: ' .. tostring(getRemainingBattery(car)) ..
            ' minutes',
        icon = 'car',
        children = {
          {
            title = 'Drive',
            icon = 'gamepad',
            action = 'ev-rcvehicles:car:contextAction',
            key = { action = 'pilotCar', car = carId },
          },
        },
      }
    end
    exports['ev-ui']:showContextMenu(context)
  end
end)

RegisterUICallback('ev-rcvehicles:drone:contextAction', function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  if data.key.action == 'pilotDrone' then
    RPC.execute('ev-rcvehicles:pilotDrone', data.key.drone)
  end
end)

RegisterUICallback('ev-rcvehicles:car:contextAction', function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  if data.key.action == 'pilotCar' then
    RPC.execute('ev-rcvehicles:pilotCar', data.key.car)
  end
end)

function placeVehicle(pSettings)
  local result = exports['ev-objects']:PlaceObject(pSettings.model, { groundSnap = true }, function(pCoords, pMaterial, pEntity)
    return true
  end)

  if not result or not result[1] then
    return
  end

  return result[2]
end

function getRemainingBattery(vehicle)
    return math.ceil((vehicle.lifeTime - (GetCloudTimeAsInt() - vehicle.start)) / 60)
end
