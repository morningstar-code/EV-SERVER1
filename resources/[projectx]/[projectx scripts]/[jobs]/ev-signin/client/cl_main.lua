CreateThread(function()
  SetScenarioTypeEnabled("WORLD_VEHICLE_STREETRACE", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_SALTON_DIRT_BIKE", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_SALTON", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_NEXT_TO_CAR", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_CAR", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_POLICE_BIKE", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_SMALL", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_MILITARY_PLANES_BIG", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_MECHANIC", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_EMPTY", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_BUSINESSMEN", false)
  SetScenarioTypeEnabled("WORLD_VEHICLE_BIKE_OFF_ROAD_RACE", false)

  -- MRPD
  exports["ev-polytarget"]:AddCircleZone("officer_sign_in", vector3(450.46, -984.03, 31.24), 0.69, {
    useZ = true
  })

  -- Popular Street PD
  exports["ev-polyzone"]:AddCircleZone("officer_sign_in", vector3(827.2, -1290.18, 28.25), 0.5, {
    useZ = true
  })

  -- Sandy PD
  exports["ev-polytarget"]:AddBoxZone("officer_sign_in", vector3(1852.45, 3687.13, 34.23), 1, 1, {
    useZ=true,
  })

  -- Paleto PD
  exports["ev-polytarget"]:AddBoxZone("officer_sign_in", vector3(-447.36, 6013.06, 32.29), 0.8, 0.8, {
    heading=315,
    minZ=32.24,
    maxZ=32.84
  })

  exports["ev-polytarget"]:AddBoxZone("officer_sign_in", vector3(381.19, -1595.8, 30.06), 1.8, 0.4, {
    heading=320,
    minZ=29.91,
    maxZ=30.51
  })

  -- VB PD
  exports["ev-polytarget"]:AddCircleZone("officer_sign_in", vector3(-1083.61, -810.31, 19.3), 0.3, {
    useZ = true
  })

  -- PR PD
  exports["ev-polytarget"]:AddCircleZone("officer_sign_in", vector3(385.83, 795.02, 187.46), 0.3, {
    useZ = true
  })

  -- Prison
  exports["ev-polytarget"]:AddCircleZone("officer_sign_in", vector3(1840.39, 2578.45, 46.01), 0.55, {
    useZ = true
  })

  -- LS Centeral
  exports["ev-polytarget"]:AddCircleZone("ems_sign_in", vector3(349.11, -1402.93, 32.42), 0.4, {
    useZ=true,
  })
 
    --TODO: Fix vehicle spawn, Make it server side.
    -- EMS Central
    exports["ev-polytarget"]:AddBoxZone("ems_sign_in", vector3(358.07, -1397.66, 32.5), 0.5, 0.5, {
      heading=10,
      minZ=32.1,
      maxZ=32.5
    })
  
    exports["ev-polytarget"]:AddBoxZone("ems_volunteer_sign_in", vector3(355.13, -1399.01, 32.5), 0.5, 0.5, {
      heading=330,
      minZ=32.1,
      maxZ=32.5
    })

  -- EMS Sandy
  exports["ev-polytarget"]:AddBoxZone("ems_sign_in", vector3(1833.19, 3676.14, 34.28), 0.8, 0.6, {
    heading=334,
    minZ=34.18,
    maxZ=34.58
  })

  while not exports['ev-config']:IsConfigReady() do
    Wait(100)
  end
  local emsEnabled = exports["ev-config"]:GetMiscConfig("jobs.ems.enabled")
  if emsEnabled then
    -- EMS Volunteer Pillbox
    exports["ev-polytarget"]:AddBoxZone("ems_volunteer_sign_in", vector3(350.25, -587.67, 28.8), 0.85, 0.8, {
      heading=340,
      minZ=28.4,
      maxZ=28.8
    })

    -- Fire Dept
    exports["ev-polyzone"]:AddCircleZone("fire_dept_sign_in", vector3(204.23, -1642.16, 29.81), 1.0, {
      useZ = true
    })

    -- Fire Dept
    exports["ev-polyzone"]:AddCircleZone("fire_dept_sign_in", vector3(1193.58, -1467.42, 34.86), 1.0, {
      useZ = true
    })
  end

  exports["ev-polytarget"]:AddCircleZone("public_services_sign_in", vector3(320.45, -1640.5, 32.54), 0.83, {
    useZ=true
  })

  exports["ev-polytarget"]:AddCircleZone("driving_instructor_sign_in", vector3(-36.2, -206.96, 45.79), 0.4, {
    useZ=true
  })

end)

function CreateBlipsFromConfig(blips)
  for _, item in pairs(blips) do
    if not item.enabled then goto continue end

    item.blip = AddBlipForCoord(vector3(item.coords.x, item.coords.y, item.coords.z))
    SetBlipSprite(item.blip, item.sprite)
    SetBlipScale(item.blip, 0.8)
    SetBlipColour(item.blip, 3)
    SetBlipAsShortRange(item.blip, true)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString(item.label)
    EndTextCommandSetBlipName(item.blip)

    :: continue ::
  end
end

function findClosestSpawnPoint(pCurrentPosition)
  local closestDistance = -1
  local closestCoord = pCurrentPosition
  for _, location in ipairs(VEHICLE_SPAWN_LOCATIONS) do
    local distance = #(location - pCurrentPosition)
    if closestDistance == -1 or closestDistance > distance then
      closestDistance = distance
      closestCoord = location
    end
  end
  return closestCoord
end