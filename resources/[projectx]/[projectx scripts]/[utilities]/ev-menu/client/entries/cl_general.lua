local GeneralEntries = MenuEntries["general"]

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicles",
    title = "Vehicle",
    icon = "#vehicle-options-vehicle",
    event = "royal-carcontrol:client"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and IsPedInAnyVehicle(PlayerPedId(), false)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "vehicles-keysgive",
    title = "Give Keys",
    icon = "#general-keys-give",
    event = "vehicle:giveKey"
},
isEnabled = function(pEntity, pContext)
    return not IsDisabled() and IsPedInAnyVehicle(PlayerPedId(), false) and exports["ev-vehicles"]:HasVehicleKey(GetVehiclePedIsIn(PlayerPedId(), false))
end
}


GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "atc-set-flight-data",
      title = "Flight Data",
      icon = "#vehicle-flight-data",
      event = "ev-atc:setFlightData"
  },
  isEnabled = function(pEntity, pContext)
    local playerPed = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(playerPed)

    if vehicle == 0 then return false end

    local vehicleClass = GetVehicleClass(vehicle)

    return not IsDisabled() and (vehicleClass == 15 or vehicleClass == 16) and (GetPedInVehicleSeat(vehicle, -1) == playerPed or GetPedInVehicleSeat(vehicle, 0) == playerPed)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "outfitsbruh",
    title = "Outfits",
    icon = "#blips-clothingshop", 
    event = "raid_clothes:outfits" 
  },
  isEnabled = function(pEntity, pContext)
      return not isDead and exports['raid_clothes']:isInClothing()
  end 
}

GeneralEntries[#GeneralEntries+1] = { 
  data = {
    id = "pdCallSign",
    title = "Vehicle Callsign",
    icon = "#vehicle-options-vehicle",
    event = "rhodinium-callsignveh"
  },
  isEnabled = function(pEntity, pContext)
    return (exports["isPed"]:isPed("myJob") == 'police') and not isDead and #(GetEntityCoords(PlayerPedId()) - vector3(443.6348, -986.6627, 25.70125)) <= 25 and IsPedInAnyVehicle(PlayerPedId(), false)
  end 
} 

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "policeObjects",
    title = "Objects",
    icon = "#drivinginstructor-drivingtest", 
    event = "ev-police:client:placeBarrier",
  },
  isEnabled = function(pEntity, pContext)
      return not isDead and (isPolice or isDoc) and not IsPedInAnyVehicle(PlayerPedId())
  end
}

-- change to keybind?
-- GeneralEntries[#GeneralEntries+1] = {
--     data = {
--         id = "vehicles-doorKeyFob",
--         title = "Door KeyFob",
--         icon = "#general-door-keyFob",
--         event = "ev-doors:doorKeyFob"
--     },
--     isEnabled = function(pEntity, pContext)
--         return not IsDisabled() and IsPedInAnyVehicle(PlayerPedId(), false) and exports["ev-inventory"]:hasEnoughOfItem("keyfob", 1, false)
--     end
-- }

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "peds-escort",
    title = "Stop escorting",
    icon = "#general-escort",
    event = "ev-police:drag:stopForced"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and isEscorting
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "oxygentank",
    title = "Remove Oxygen Tank",
    icon = "#oxygen-mask",
    event = "RemoveOxyTank"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and hasOxygenTankOn
  end
}


GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "policeDeadA",
    title = "10-13A",
    icon = "#police-dead",
    event = "police:tenThirteenA",
  },
  isEnabled = function(pEntity, pContext)
      return isDead and (isPolice or isDoc)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "policeDeadB",
    title = "10-13B",
    icon = "#police-dead",
    event = "police:tenThirteenB",
  },
  isEnabled = function(pEntity, pContext)
    return isDead and (isPolice or isDoc)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "emsDeadA",
    title = "10-14A",
    icon = "#ems-dead",
    event = "police:tenForteenA",
  },
  isEnabled = function(pEntity, pContext)
    return isDead and isMedic
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "emsDeadB",
    title = "10-14B",
    icon = "#ems-dead",
    event = "police:tenForteenB",
  },
  isEnabled = function(pEntity, pContext)
    return isDead and isMedic
  end
}


GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "unseat",
    title = "Get up",
    icon = "#obj-chair",
    event = "ev-emotes:sitOnChair"
  },
  isEnabled = function(pEntity, pContext)
    return not isDead and exports["ev-flags"]:HasPedFlag(PlayerPedId(), "isSittingOnChair")
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "property-enter",
    title = "Enter Property",
    icon = "#property-enter",
    event = "housing:interactionTriggered"
  },
  isEnabled = function(pEntity, pContext)
    return not isDead and exports["ev-housing"]:isNearProperty()
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "property-lock",
    title = "Unlock/Lock Property",
    icon = "#property-lock",
    event = "housing:toggleClosestLock"
  },
  isEnabled = function(pEntity, pContext)
    return not isDead and exports["ev-housing"]:isNearProperty(true)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "vehicle-vehicleList",
      title = "Vehicle List",
      icon = "#vehicle-vehicleList",
      event = "vehicle:garageVehicleList",
      parameters = { nearby = true, radius = 4.0 }
  },
  isEnabled = function(pEntity, pContext)
    return not IsDisabled() and not IsPedInAnyVehicle(PlayerPedId()) and (pEntity and pContext.flags["isVehicleSpawner"] or not pEntity and exports["ev-vehicles"]:IsOnParkingSpot(PlayerPedId(), true, 4.0))
  end
}

local canDropGoods = false
local canDropGoodsTimer = nil

AddEventHandler("ev-jobs:247delivery:takeGoods", function()
  canDropGoods = true
  canDropGoodsTimer = GetGameTimer()
end)

AddEventHandler("ev-jobs:247delivery:dropGoods", function()
  canDropGoods = false
  canDropGoodsTimer = nil
end)

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "job-drop-goods",
    title = "Drop Goods",
    icon = "#property-lock",
    event = "ev-jobs:247delivery:dropGoods"
  },
  isEnabled = function(pEntity, pContext)
    return canDropGoods and canDropGoodsTimer + 15000 < GetGameTimer()
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "dispatch:openDispatch",
      title = "Dispatch",
      icon = "#general-check-over-target",
      event = "ev-dispatch:openFull"
  },
  isEnabled = function()
      return (isPolice or isMedic) and not isDead
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "judge-raid:lockdown",
      title = "Toggle Lockdown Property",
      icon = "#judge-raid-lock-down",
      event = "property:menuAction",
      parameters = {action = "lockdown"}
  },
  isEnabled = function(pEntity, pContext)
      return not isDead and isPolice and exports["ev-housing"]:isNearProperty(false)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "emotes:openmenu",
      title = "Emotes",
      icon = "#general-emotes",
      event = "emotes:OpenMenu"
  },
  isEnabled = function(pEntity, pContext)
      return not isDead
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "drivingInstructor:testToggle",
      title = "Driving Test",
      icon = "#drivinginstructor-drivingtest",
      event = "drivingInstructor:testToggle"
  },
  isEnabled = function(pEntity, pContext)
      return not isDead and isInstructorMode
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "drivingInstructor:submitTest",
      title = "Submit Test",
      icon = "#drivinginstructor-submittest",
      event = "drivingInstructor:submitTest"
  },
  isEnabled = function(pEntity, pContext)
      return not isDead and isInstructorMode
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "general:checkoverself",
      title = "Examine Self",
      icon = "#general-check-over-self",
      event = "Evidence:CurrentDamageList"
  },
  isEnabled = function(pEntity, pContext)
      return not isDead
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "bennys:enter",
      title = "Enter Bennys",
      icon = "#general-check-vehicle",
      event = "bennys:enter"
  },
  isEnabled = function(pEntity, pContext)
      return not IsDisabled() and polyChecks.bennys.isInside and IsPedInAnyVehicle(PlayerPedId(), false) and GetPedInVehicleSeat(GetVehiclePedIsIn(PlayerPedId(), false), -1) == PlayerPedId()
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "toggle-anchor",
    title = "Toggle Anchor",
    icon = "#vehicle-anchor",
    event = "mka-anchor:toggleAnchor"
  },
  isEnabled = function(pEntity, pContext)
    local currentVehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    local boatModel = GetEntityModel(currentVehicle)
    return not IsDisabled() and currentVehicle ~= 0 and (IsThisModelABoat(boatModel) or IsThisModelAJetski(boatModel) or IsThisModelAnAmphibiousCar(boatModel) or IsThisModelAnAmphibiousQuadbike(boatModel))
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "mdw",
    title = "MDW",
    icon = "#mdt",
    event = "ev-ui:openMDW"
  },
  isEnabled = function()
    return (
          myJob == "district attorney"
      or  myJob == "doctor"
      or  myJob == "defender"
      or  isPolice or isDoc or isMedic or isDoctor or isJudge or isMayor or isCountyClerk
    ) and not isDead
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "prepare-boat-mount",
      title = "Mount on Trailer",
      icon = "#vehicle-plate-remove",
      event = "vehicle:mountBoatOnTrailer"
  },
  isEnabled = function()
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
    if IsDisabled() or not (IsThisModelABoat(model) or IsThisModelAJetski(model) or IsThisModelAnAmphibiousCar(model)) then
      return false
    end
    local left, right = GetModelDimensions(model)
    return #(vector3(0, left.y, 0) - vector3(0, right.y, 0)) < 15
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "prison-task",
    title = "Current Task",
    icon = "#prisoner-task",
    event = "ev-jail:showCurrentTask"
  },
  isEnabled = function()
    return (
      polyChecks.prison.isInside
      and not isDoc
      and not isPolice
      and not isDead
      and isPrisoner
    ) 
  end
}

local canDropGoods = false
local canDropGoodsTimer = nil

AddEventHandler("ev-jobs:247delivery:takeGoods", function()
  if exports["ev-phone"]:isCanDropGoods() then
    if not canDropGoods then
      TriggerEvent('player:receiveItem', 'dodopackagesmall', 1)
      canDropGoods = true
      canDropGoodsTimer = GetGameTimer()
    end
  end
end)

AddEventHandler("ev-jobs:247delivery:dropGoods", function()
  if exports["ev-phone"]:isCanDropGoods() then
    if canDropGoods then 
      canDropGoods = false
      canDropGoodsTimer = nil
      ClearPedTasks(PlayerPedId())
      TriggerEvent('inventory:removeItem', 'dodopackagesmall', 1)
    end
  end
end)

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "job-drop-goods",
    title = "Drop Goods",
    icon = "#property-lock",
    event = "ev-jobs:247delivery:dropGoods"
  },
  isEnabled = function(pEntity, pContext)
    return canDropGoods and canDropGoodsTimer + 15000 < GetGameTimer()
  end
}

--[[ GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "job-do-electrical",
    title = "Start Fixing Box",
    icon = "#ped-give-stolen-items",
    event = "ev-jobs:fix_elec"
  },
  isEnabled = function(pEntity, pContext)
    return exports['ev-jobs']:canFixElec()
  end
} ]]

local currentJob = nil
local policeModels = {
  [`npolvic`] = true,
  [`npolexp`] = true,
  [`npolmm`] = true,
  [`npolvette`] = true,
  [`npolchal`] = true,
  [`npolstang`] = true,
  [`npolchar`] = true,
}
RegisterNetEvent("ev-jobmanager:playerBecameJob")
AddEventHandler("ev-jobmanager:playerBecameJob", function(job, name, notify)
    currentJob = job
end)

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "open-rifle-rack",
      title = "Locked Storage",
      icon = "#vehicle-plate-remove",
      event = "vehicle:openRifleRack"
  },
  isEnabled = function(pEntity)
    if currentJob ~= "police" then return false end
    local veh = GetVehiclePedIsIn(PlayerPedId())
    if veh == 0 then return false end
    local model = GetEntityModel(veh)
    if policeModels[model] == nil then return false end
    return true
  end
}
AddEventHandler("vehicle:openRifleRack", function()
  local finished = exports["ev-taskbar"]:taskBar(2500, "Unlocking...")
  if finished ~= 100 then return end
  local veh = GetVehiclePedIsIn(PlayerPedId())
  if veh == 0 then return end
  local vehId = exports["ev-vehicles"]:GetVehicleIdentifier(veh)
  TriggerEvent("server-inventory-open", "1", "rifle-rack-" .. vehId)
end)

local dashCamAttached = {}
AddEventHandler("ev-menu:dashCamAttached", function(pVehicleNetId, pEnabled)
  dashCamAttached[pVehicleNetId] = pEnabled
end)
GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "remove-dashcam-from-vehicle",
      title = "Remove Dashcam",
      icon = "#news-job-news-camera",
      event = "ev-gopro:removeDashCam",
  },
  isEnabled = function()
    local veh = GetVehiclePedIsIn(PlayerPedId())
    local netId = NetworkGetNetworkIdFromEntity(veh)
    return not IsDisabled() and dashCamAttached[netId]
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "civDead",
    title = "Call for Help",
    icon = "#police-dead",
    event = "ragdoll:sendPing",
  },
  isEnabled = function(pEntity, pContext)
      return (not IN_SERVER_FARM) and isDead and not (isPolice or isDoc)
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "civDead",
    title = "Use Local EMS",
    icon = "#police-dead",
    event = "ragdoll:respawnLocal",
  },
  isEnabled = function(pEntity, pContext)
      return (not IN_SERVER_FARM) and isDead and exports["ragdoll"]:allowRespawn()
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "civEject",
    title = "Self Eject",
    icon = "#vehicle-plate-remove",
    event = "ragdoll:ejectVehicle",
  },
  isEnabled = function(pEntity, pContext)
      local ped = PlayerPedId()
      local plyVeh = GetVehiclePedIsIn(ped, false)
      local IsDriver = GetPedInVehicleSeat(plyVeh, -1) == ped
      return (not IN_SERVER_FARM) and isDead and plyVeh and IsDriver
  end
}

AddEventHandler("ev-menu:var:inServerFarm", function(pBool)
  IN_SERVER_FARM = pBool
end)
GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "varLeave",
    title = "Exit VAR",
    icon = "#news-job-news-camera",
    event = "ev-heists-serverroom:vr-room-exit",
  },
  isEnabled = function(pEntity, pContext)
      return IN_SERVER_FARM
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
      id = "vehicle-garageActions",
      title = "Garage Actions",
      icon = "#vehicle-vehicleList",
      event = "ev-vehicles:openGarageActions",
      parameters = { nearby = true, radius = 4.0 }
  },
  isEnabled = function(pEntity, pContext)
    return not IsDisabled() and (isPolice or isJudge) and not IsPedInAnyVehicle(PlayerPedId()) and (pEntity and pContext.flags["isVehicleSpawner"] or not pEntity and exports["ev-vehicles"]:IsOnParkingSpot(PlayerPedId(), true, 4.0))
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "infDead",
    title = "Respawn Menu",
    icon = "#infected-icon",
    event = "ev-outbreak:openRespawnMenu",
  },
  isEnabled = function(pEntity, pContext)
      return isDead and isInfected
  end
}

GeneralEntries[#GeneralEntries+1] = {
  data = {
    id = "humanDead",
    title = "Respawn As Infected",
    icon = "#infected-icon",
    event = "ev-outbreak:openRespawnMenu",
    parameters = { fromHuman = true }
  },
  isEnabled = function(pEntity, pContext)
      return isDead and not isInfected and isOutbreakRunning
  end
}

RegisterNetEvent("rhodinium-callsignveh", function()
  setVehicleCallsign()
end)


function setVehicleCallsign(pCallsign1, pCallsign2, pCallsign3)
  local plyVeh = GetVehiclePedIsIn(PlayerPedId(),false)

  local elements = {
      { name = 'cso', label = 'Callsign', icon = 'time', _type = 'number' },
      { name = 'ppo', label = 'Division (0 = patrol)', icon = 'time', _type = 'number' },
      { name = 'tto', label = 'Rank', icon = 'time', _type = 'number' },
    }

  local prompt = exports['ev-ui']:OpenInputMenu(elements)

  if not prompt then 
      ClearPedTasks(PlayerPedId())
      return
  end

  local cso = tonumber(prompt.cso) or 0
  if cso >= 999 then
      return TriggerEvent('DoLongHudText', 'Three Digits Only', 2)
  end

  local ppo = tonumber(prompt.ppo) or 0
  if ppo >= 10 then
      return TriggerEvent('DoLongHudText', 'One Digits Only', 2)
  end

  local tto = tonumber(prompt.tto) or 0
  if tto >= 10 then
      return TriggerEvent('DoLongHudText', 'One Digits Only', 2)
  end

  local progress = exports['ev-taskbar']:taskBar(2500, 'Call sign being set...', true)

  if progress == 100 then 
      local str = "".. cso ..""
      local fields = { str:match( (str:gsub(".", "(.)")) ) }

      SetVehicleMod(plyVeh, 42, tonumber(fields[1]))
      SetVehicleMod(plyVeh, 44, tonumber(fields[2]))
      SetVehicleMod(plyVeh, 45, tonumber(fields[3]))

      SetVehicleMod(plyVeh, 8, tonumber(ppo))
      SetVehicleMod(plyVeh, 9, tonumber(tto))


  end
end