local rope = nil
local atm = false
local vehicle = nil
local ATMRobbery = false
local RopeAttachedToVehicle = false
local VehicleClose = GetClosestVehicle(GetEntityCoords(PlayerPedId()), 15.0, 0, 70)

Citizen.CreateThread(function()
    loadExistModel("loq_atm_02_console")
    loadExistModel("loq_atm_02_des")
    loadExistModel("loq_atm_03_console")
    loadExistModel("loq_atm_03_des")
    loadExistModel("loq_fleeca_atm_console")
    loadExistModel("loq_fleeca_atm_des")
end)


local models = {
    GetHashKey("loq_fleeca_atm_console"), 
    GetHashKey("loq_atm_02_console"), 
    GetHashKey("loq_atm_03_console")
}

exports["ev-interact"]:AddPeekEntryByModel(models, {{
    event = "ev-pettycrime:atm:crack",
    id = "petty_crime_atm",
    icon = "money-bill-wave",
    label = "Search atm for cash",
    parameters = {},
  }}, {
    distance = { radius = 1.6 },
  })
exports["ev-interact"]:AddPeekEntryByModel(models, {{ 
    event = "ev-pettycrime:atm:pickup",
    id = "petty_crime_atm_pickup",
    icon = "level-up-alt",
    label = "Pick up broken ATM",
    parameters = {},
  }}, {
    distance = { radius = 1.5 },
  })

local ATMInteract = {
    data = {
        {
            id = 'atm_attach_to_object',
            label = 'Attach rope to ATM',
            icon = 'bahai',
            event = 'ev-pettycrime:attach:rope',
            parameters = {},
        }
    },   
    options = {
        distance = { radius = 2.5 },
        isEnabled = function()
            return ATMRobbery
        end
    }
}

local AttachRope = {
    group = { 2 },
    data = {
        {
            id = 'atm_attach_to_truck',
            label = 'Attach rope to Vehicle',
            icon = 'bahai',
            event = 'ev-pettycrime:atm:userope', 
            parameters = {},
        }
    },   
    options = {
        distance = { radius = 3.5 },
        isEnabled = function(pEntity, pContext)
            return not ATMRobbery and exports['ev-inventory']:hasEnoughOfItem('towrope', 1, false) and DoesVehicleHaveDoor(pEntity, 5) and isCloseToBoot(pEntity, PlayerPedId(), 1.9, pContext.model)
        end
    }
}

local DetachRope = {
    group = { 2 },
    data = {
        {
            id = 'pettycrime_atm_detachveh',
            label = 'Detach rope from Vehicle',
            icon = 'bahai',
            event = 'ev-pettycrime:atm:detach',
            parameters = {},
        }
    },   
    options = {
        distance = { radius = 3.5 },
        isEnabled = function(pEntity, pContext)
            return RopeAttachedToVehicle and DoesVehicleHaveDoor(pEntity, 5) and isCloseToBoot(pEntity, PlayerPedId(), 1.9, pContext.model)
        end
    }
}

Citizen.CreateThread(function()
    exports['ev-interact']:AddPeekEntryByFlag({'isATM'}, ATMInteract.data, ATMInteract.options)
    exports['ev-interact']:AddPeekEntryByEntityType(AttachRope.group, AttachRope.data, AttachRope.options)
    exports['ev-interact']:AddPeekEntryByEntityType(DetachRope.group, DetachRope.data, DetachRope.options)
end)

AddEventHandler("ev-pettycrime:attach:rope", function() 
    ATMAttach()
end)

RegisterNetEvent("ev-pettycrime:atm:detach")
AddEventHandler("ev-pettycrime:atm:detach", function ()
    if RopeAttachedToVehicle then
        ATMAttachCancel()
        RopeAttachedToVehicle = false
    end
end)

function ATMAttach()
    local ped = PlayerPedId()
    local obj = GetATM()

    TaskTurnPedToFaceEntity(ped, obj.atmprope, 1000)
    loadAnimDict("anim@amb@clubhouse@tutorial@bkr_tut_ig3@")
    TaskPlayAnim(ped, "anim@amb@clubhouse@tutorial@bkr_tut_ig3@", "machinic_loop_mechandplayer", 1.8, 1.8, -1, 31, 0, false, false, false)

    local finished = exports["ev-taskbar"]:taskBar(5000, "Attaching rope to ATM...")
    if finished == 100 then
        TriggerEvent("inventory:removeItem", "towrope", 1)
        ATMRobbery = true
        ClearPedTasks(ped)
        local propo1 = nil
        local propo2 = nil
        local atmcoords = GetEntityCoords(obj.atmprope)
        local atmheading = GetEntityHeading(obj.atmprope)

        if obj.type == "prop_atm_02" then
            propo1 = CreateObject("loq_atm_02_des", vector3(atmcoords.x, atmcoords.y, atmcoords.z + 0.35), true)
            propo2 = CreateObject("loq_atm_02_console", vector3(atmcoords.x, atmcoords.y, atmcoords.z + 0.55), true)
            SetEntityHeading(propo1, atmheading)
            SetEntityHeading(propo2, atmheading)
            FreezeEntityPosition(propo1, true)
            FreezeEntityPosition(propo2, true)
        elseif obj.type == "prop_atm_03" then
            propo1 = CreateObject("loq_atm_03_des", vector3(atmcoords.x, atmcoords.y, atmcoords.z + 0.35), true)
            propo2 = CreateObject("loq_atm_03_console", vector3(atmcoords.x, atmcoords.y, atmcoords.z + 0.65), true)
            SetEntityHeading(propo1, atmheading)
            SetEntityHeading(propo2, atmheading)
            FreezeEntityPosition(propo1, true)
            FreezeEntityPosition(propo2, true)
        elseif obj.type == "prop_fleeca_atm" then
            propo1 = CreateObject("loq_fleeca_atm_des", vector3(atmcoords.x, atmcoords.y, atmcoords.z + 0.35), true)
            propo2 = CreateObject("loq_fleeca_atm_console", vector3(atmcoords.x, atmcoords.y, atmcoords.z + 0.65), true)
            SetEntityHeading(propo1, atmheading)
            SetEntityHeading(propo2, atmheading)
            FreezeEntityPosition(propo1, true)
            FreezeEntityPosition(propo2, true)
        end

        atm = false    

        Citizen.Wait(200)


        local dpratm = ObjToNet(obj.atmprope)
        local netveh = VehToNet(vehicle)
        local propsdad = ObjToNet(propo2)
        print("dpratm", dpratm)
        print("netveh", netveh)
        print("propsdad", propsdad)

        TriggerServerEvent("ev-pettycrime:atm:attachRope2", dpratm, atmcoords.x, atmcoords.y, atmcoords.z, netveh, propsdad)
        SetEntityCoords(obj.atmprope, atmcoords.x, atmcoords.y, atmcoords.z - 10.0)

        local car = true
        while car do
            if IsPedInAnyVehicle(ped) then
                Citizen.Wait(math.random(25000, 45000))
                local ObjectNet = ObjToNet(propo2)
                TriggerServerEvent("ev-pettycrime:atm:prop", ObjectNet)
                car = false
                end
                Citizen.Wait(0)
            end
        else
            ATMAttachCancel()
        end
    end

function ATMAttachCancel()
    atm = false
    TriggerServerEvent("ev-pettycrime:atm:deleteRope", rope)
end


RegisterNetEvent("ev-pettycrime:atm:userope")
AddEventHandler("ev-pettycrime:atm:userope", function()
    local ped = PlayerPedId()
    local veh = VehicleClose
    vehicle = veh
    TaskTurnPedToFaceEntity(ped, vehicle, 1000)
    loadAnimDict("anim@amb@clubhouse@tutorial@bkr_tut_ig3@")
    TaskPlayAnim(ped, "anim@amb@clubhouse@tutorial@bkr_tut_ig3@", "machinic_loop_mechandplayer", 1.8, 1.8, -1, 31, 0, false, false, false)
    local finished = exports["ev-taskbar"]:taskBar(5000, "Attaching rope to vehicle...")

    if finished == 100 then
        RopeAttachedToVehicle = true
        ATMRobbery = true
        ClearPedTasks(ped)
        TriggerServerEvent("ev-pettycrime:atm:clrspawn")
        atm = true
        local networkveh = VehToNet(vehicle)
        local metworkped = PedToNet(ped)
        while atm do
            local plrcoords = GetEntityCoords(ped)
            TriggerServerEvent("ev-pettycrime:atm:attachRope", networkveh, metworkped)
            Citizen.Wait(0)
        end
    end
end)

RegisterNetEvent("ev-pettycrime:atm:clrspawn")
AddEventHandler("ev-pettycrime:atm:clrspawn", function()
    RopeLoadTextures()
    rope = AddRope(1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1, 7.0, 1.0, 0, 0, 0, 0, 0, 0)
end)

RegisterNetEvent("ev-pettycrime:atm:attachRope")
AddEventHandler("ev-pettycrime:atm:attachRope", function(obh1, obj1)
    local obo1 = NetToEnt(obh1)
    local obo2 = NetToEnt(obj1)
    local ocoords = GetEntityCoords(obo2)
    AttachEntitiesToRope(rope, obo1, obo2, GetOffsetFromEntityInWorldCoords(obo1, 0, -2.3, 0.5), GetPedBoneCoords(obo2, 6286, 0.0, 0.0, 0.0), 7.0, 0, 0, "rope_attach_a", "rope_attach_b")
    SlideObject(rope, ocoords.x, ocoords.y, ocoords.z, 1.0, 1.0, 1.0, true)
end)

RegisterNetEvent("ev-pettycrime:atm:attachRope2")
AddEventHandler("ev-pettycrime:atm:attachRope2", function(atmo, atmco1, atmco2, atmco3, obh1, obj1)
    NetworkRequestControlOfEntity(atmo)
    local obo1 = NetToEnt(obh1)
    local obo2 = NetToEnt(obj1)
    local obo3 = NetToEnt(atmo)
    local propocoord = GetEntityCoords(obo2)
    SetEntityCoords(obo3, atmco1, atmco2, atmco3 - 10.0)
    AttachEntitiesToRope(rope, obo1, obo2, GetOffsetFromEntityInWorldCoords(obo1, 0, -2.3, 0.5), propocoord.x, propocoord.y, propocoord.z + 1.0, 7.0, 0, 0, "rope_attach_a", "rope_attach_b")
end)

RegisterNetEvent("ev-pettycrime:atm:prop")
AddEventHandler("ev-pettycrime:atm:prop", function(obh)
    local ATMProp = NetToEnt(obh)
    FreezeEntityPosition(ATMProp, false)
    SetObjectPhysicsParams(ATMProp, 170.0, -1.0, 30.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0)
end)

RegisterNetEvent("ev-pettycrime:atm:crack")
AddEventHandler("ev-pettycrime:atm:crack", function()
    local prop = GetProp()
    local ATMObject = ObjToNet(prop)
    TaskStartScenarioInPlace(PlayerPedId(), 'CODE_HUMAN_MEDIC_KNEEL', 0, false)
    local finished = exports["ev-taskbar"]:taskBar(30000, "Searching...")
    if finished == 100 then
        ClearPedTasks(PlayerPedId())
        TriggerServerEvent("ev-pettycrime:atm:delete", ATMObject)
        TriggerServerEvent("ev-pettycrime:atm:deleteRope", rope)
        TriggerEvent("ev-pettycrime:atm:reward")
    else 
      ClearPedTasks(PlayerPedId())
    end
end)

RegisterNetEvent("ev-pettycrime:atm:pickup")
AddEventHandler("ev-pettycrime:atm:pickup", function ()
    local prop = GetProp()
    local ATMObject = ObjToNet(prop)
    TaskStartScenarioInPlace(PlayerPedId(), 'CODE_HUMAN_MEDIC_KNEEL', 0, false)
    local finished = exports["ev-taskbar"]:taskBar(60000, "Picking up...")
    if finished == 100 then
    ClearPedTasks(PlayerPedId())
    TriggerServerEvent("ev-pettycrime:atm:deleteRope", rope)
    TriggerServerEvent("ev-pettycrime:atm:delete", ATMObject)
    TriggerEvent("player:receiveItem", "atmblackbox", 1)
    end
end)

RegisterNetEvent("ev-pettycrime:pickup:crack")
AddEventHandler("ev-pettycrime:pickup:crack", function ()
    local finished = exports["ev-ui"]:taskBarSkill(3000,20)
    if finished ~= 100 then
        return
    end
    local finished = exports["ev-ui"]:taskBarSkill(3000,8)
    if finished ~= 100 then
        return
    end
    local finished = exports["ev-ui"]:taskBarSkill(3000,10)
    if finished ~= 100 then
        return
    end
    local finished = exports["ev-ui"]:taskBarSkill(3000,5)
    if finished ~= 100 then
        return
    end
    local finished = exports["ev-ui"]:taskBarSkill(3000,3)
    if finished ~= 100 then
        return
    end
    TriggerEvent("inventory:removeItem", "atmblackbox", 1)
    TriggerEvent("ev-pettycrime:atm:reward")

end)

RegisterNetEvent("ev-pettycrime:atm:reward")
AddEventHandler("ev-pettycrime:atm:reward", function ()
    local reward = math.random(2)
        if reward == 1 then
            TriggerServerEvent("ev-pettycrime:atm:moneyreward", math.random(1000, 3000))
        elseif reward == 2 then
            TriggerEvent("player:receiveItem", "markedbills", math.random(10, 20))
            TriggerEvent("player:receiveItem", "phonedongle", 1)
    end
end)

RegisterNetEvent("ev-pettycrime:atm:delete")
AddEventHandler("ev-pettycrime:atm:delete", function(obh)
    local obo = NetToEnt(obh)
    DeleteEntity(obo)
end)

RegisterNetEvent("ev-pettycrime:atm:deleteRope")
AddEventHandler("ev-pettycrime:atm:deleteRope", function(rope)
    DeleteRope(rope)
    rope = nil
end)

function GetATM()
    for k,v in pairs({"prop_atm_02", "prop_atm_03", "prop_fleeca_atm"}) do 
        local obj = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 5.0, GetHashKey(v))
        if DoesEntityExist(obj) then
            local ahio = {
                atmprope = obj,
                type = v
            }
            return ahio
        end
    end
    return nil
end

function GetProp()
    for k,v in pairs({"loq_fleeca_atm_console", "loq_atm_02_console", "loq_atm_03_console"}) do 
        local obj = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 5.0, GetHashKey(v))
        if DoesEntityExist(obj) then
            return obj
        end
    end
    return nil
end

function loadExistModel(hash)
    if not HasModelLoaded(hash) then
        RequestModel(hash)
        while not HasModelLoaded(hash) do
            Citizen.Wait(1)
        end
    end
end

function loadAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        RequestAnimDict(dict)
        Citizen.Wait(10)
    end
end

AddEventHandler("ev-inventory:itemUsed", function(item)
    if item == "atmblackbox" then
        TriggerEvent("ev-pettycrime:pickup:crack")
    end
end)

local ModelData = {}

function isCloseToBoot(pEntity, pPlayerPed, pDistance, pModel)
  local model = pModel or GetEntityModel(pEntity)
  local modelData = GetModelData(pEntity, model)
  
  local playerCoords = GetEntityCoords(pPlayerPed)
  
  local engineCoords = modelData.trunk.position == 'front' and getFrontOffset(pEntity) or getTrunkOffset(pEntity)
  
  return #(engineCoords - playerCoords) <= pDistance
end

function GetModelData(pEntity, pModel)
  if ModelData[pModel] then return ModelData[pModel] end
  
  local modelInfo = {}
  
  local coords = getTrunkOffset(pEntity)
  local boneCoords, engineCoords = GetWorldPositionOfEntityBone(pEntity, GetEntityBoneIndexByName(pEntity, 'engine'))
  
  if #(boneCoords - coords) <= 2.0 then
      engineCoords = coords
      modelInfo = {engine = {position = 'trunk', door = 4}, trunk = {position = 'front', door = 5}}
  else
      engineCoords = getFrontOffset(pEntity)
      modelInfo = {engine = {position = 'front', door = 4}, trunk = {position = 'trunk', door = 5}}
  end
  
  local hasBonnet = DoesVehicleHaveDoor(pEntity, 4)
  local hasTrunk = DoesVehicleHaveDoor(pEntity, 5)
  
  if hasBonnet then
      local bonnetCoords = GetWorldPositionOfEntityBone(pEntity, GetEntityBoneIndexByName(pEntity, 'bonnet'))
      
      if #(engineCoords - bonnetCoords) <= 2.0 then
          modelInfo.engine.door = 4
          modelInfo.trunk.door = hasTrunk and 5 or 3
      elseif hasTrunk then
          modelInfo.engine.door = 5
          modelInfo.trunk.door = 4
      end
  elseif hasTrunk then
      local bootCoords = GetWorldPositionOfEntityBone(pEntity, GetEntityBoneIndexByName(pEntity, 'boot'))
      
      if #(engineCoords - bootCoords) <= 2.0 then
          modelInfo.engine.door = 5
      end
  end
  
  ModelData[pModel] = modelInfo
  
  return modelInfo
end

function getTrunkOffset(pEntity)
  local minDim, maxDim = GetModelDimensions(GetEntityModel(pEntity))
  return GetOffsetFromEntityInWorldCoords(pEntity, 0.0, minDim.y - 0.5, 0.0)
end

function getFrontOffset(pEntity)
  local minDim, maxDim = GetModelDimensions(GetEntityModel(pEntity))
  return GetOffsetFromEntityInWorldCoords(pEntity, 0.0, maxDim.y + 0.5, 0.0)
end