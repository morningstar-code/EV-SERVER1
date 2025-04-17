Storages = {}
activeZones = {}

local thermiteMinigameResult = nil

CreateThread(function ()
    for crate, data in pairs(Config.crates) do
        exports["ev-interact"]:AddPeekEntryByModel({ GetHashKey(data.model) }, {{
            id = "storage_lifetime",
            event = "ev-storage:checkLifetime",
            icon = "fas fa-heart",
            label = "Check wear"
        }}, {
            distance = { radius = data.distance },
            isEnabled = function(entity, context)
                local stash, dist = getClosestStash(data.distance)
                return stash ~= nil
            end
        })
        exports["ev-interact"]:AddPeekEntryByModel({ GetHashKey(data.model) }, {{
            id = "storage_repair",
            event = "ev-storage:repairStorage",
            icon = "fas fa-screwdriver",
            label = "Repair"
        }}, {
            distance = { radius = data.distance },
            isEnabled = function(entity, context)
                local stash, dist = getClosestStash(data.distance)
                return stash ~= nil and exports["ev-inventory"]:hasEnoughOfItem('craterepairkit', 1, false, true)
            end
        })
        exports["ev-interact"]:AddPeekEntryByModel({ GetHashKey(data.model) }, {{
            id = "storage_destroy",
            event = "ev-storage:destroyStash",
            icon = "fas fa-trash-alt",
            label = "Destroy container",
        }}, {
            distance = { radius = data.distance },
            isEnabled = function(entity, context)
                local stash, dist = getClosestStash(data.distance)
                return stash ~= nil and (exports["isPed"]:isPed("myjob") == "police" or Storages[stash].placed_by == exports["isPed"]:isPed("cid"))
            end
        })
        if not data.vendor then
            exports["ev-interact"]:AddPeekEntryByModel({ GetHashKey(data.model) }, {{
                id = "storage_open",
                event = "ev-storage:openStash",
                icon = "fas fa-box-open",
                label = "Open stash",
            }}, {
                distance = { radius = data.distance },
                isEnabled = function(entity, context)
                    local stash, dist = getClosestStash(data.distance)
                    return stash ~= nil
                end
            })
            exports["ev-interact"]:AddPeekEntryByModel({ GetHashKey(data.model) }, {{
                id = "storage_breakin",
                event = "ev-storage:breakinStash",
                icon = "fas fa-exclamation-triangle",
                label = "Break in container",
            }}, {
                distance = { radius = data.distance },
                isEnabled = function(entity, context)
                    local stash, dist = getClosestStash(data.distance)
                    if not stash or not Storages[stash].is_locked then return end
                    local hasDetCord = exports["ev-inventory"]:hasEnoughOfItem("detcord", 1, false)
                    local hasThermite = exports["ev-inventory"]:hasEnoughOfItem("thermitecharge", 1, false)
                    local hasHacking = exports["ev-inventory"]:hasEnoughOfItem("hackingdevice", 1, false)
                    local hasPdHacking = exports["ev-inventory"]:hasEnoughOfItem("elevatorhackingdevice", 1, false)
                    local canUnlockKeyCode = (hasHacking or hasPdHacking) and Storages[stash].key_code
                    local canUnlockLock = (hasDetCord or hasThermite) and not Storages[stash].key_code
                    return (canUnlockKeyCode or canUnlockLock)
                end
            })
        end
    end
    Wait(5000)
    if #Storages == 0 then
        TriggerServerEvent("ev-storage:requestStorages")
    end
end)

RegisterNetEvent("ev-storage:loadStorages")
AddEventHandler("ev-storage:loadStorages", function(_storages)
    for id, storage in pairs(_storages) do
        addStorage(storage)
    end
end)

RegisterNetEvent("ev-storage:prepareNewStorage")
AddEventHandler("ev-storage:prepareNewStorage", function(storage)
    addStorage(storage)
end)

AddEventHandler("ev-polyzone:enter", function (name, data)
    if name ~= "mobile_stash" then return end
    if not Storages[data.id] then return end
    if Storages[data.id].object then return end

    local coords = Storages[data.id].coordinates
    Storages[data.id].object = createStash(Storages[data.id].size, coords.x, coords.y, coords.z, coords.h)
    activeZones[data.id] = vector3(coords.x, coords.y, coords.z)
end)

AddEventHandler("ev-polyzone:exit", function (name, data)
    if name ~= "mobile_stash" then return end
    if not Storages[data.id] then return end
    if not Storages[data.id].object then return end

    DeleteObject(Storages[data.id].object)
    Storages[data.id].object = nil
    activeZones[data.id] = nil
end)

AddEventHandler("ev-storage:openStash", function ()
    local closestStash, closestStashDist = getClosestStash(10)
    if closestStash == nil then return end
    local stash = Storages[closestStash]
    if closestStashDist > Config.crates[stash.size].distance then return end
    if Config.crates[stash.size].trap then
        return explodeCrate(stash)
    end
    if stash.is_locked then
        if stash.key_code then
            return openKeyPad(stash)
        end
        local hasKey = #exports["ev-inventory"]:getItemsOfType("mobilecratekey", 1, true, {
            crateId = stash.id
        }) > 0
        if not hasKey then return TriggerEvent("DoLongHudText", "This crate seems to be locked") end
    end
    TriggerEvent("server-inventory-open", "1", string.format("mobile-stash-%s_%s", Config.crates[stash.size].invPrefix, closestStash))
end)

function openKeyPad (stash)
    exports['ev-ui']:openApplication('textbox', {
        callbackUrl = 'ev-storage:enterKeyPad',
        inputKey = { crateId = stash.id, item = name },
        items = {
            {
                type = "password",
                icon = "fas fa-circle",
                label = "Key Code",
                name = "keycode",
            }
        },
        show = true,
    })
end

RegisterUICallback("ev-storage:enterKeyPad", function (data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    exports['ev-ui']:closeApplication('textbox')

    local stash = Storages[data.inputKey.crateId]
    if not stash then return end
    if stash.key_code ~= data.values.keycode then
        return TriggerEvent("DoLongHudText", "Wrong key code")
    end
    TriggerEvent("server-inventory-open", "1", string.format("mobile-stash-%s_%s", Config.crates[stash.size].invPrefix, data.key.crateId))
end)

AddEventHandler("ev-storage:breakinStash", function ()
    local closestStash, closestStashDist = getClosestStash(10)
    if closestStash == nil then return end
    local stash = Storages[closestStash]
    if closestStashDist > Config.crates[stash.size].distance then return end
    if not stash.is_locked then
        return TriggerEvent("DoLongHudText", "This crate is not locked")
    end

    local itemUsed = "detcord"
    local gameSettings = {
        gameFinishedEndpoint = "ev-storage:crackStorage",
        gameTimeoutDuration = 14000,
        coloredSquares = 21,
        gridSize = 10
    }
    if stash.key_code then
        if not itemUsed and exports["ev-inventory"]:hasEnoughOfItem("hackingdevice", 1, false, true) then
            itemUsed = "hackingdevice"
        end
        if not itemUsed and exports["ev-inventory"]:hasEnoughOfItem("elevatorhackingdevice", 1, false, true) then
            itemUsed = "elevatorhackingdevice"
        end
        if not itemUsed or (itemUsed ~= "hackingdevice" and itemUsed ~= "elevatorhackingdevice") then
            return TriggerEvent("DoLongHudText", "You can not break into this lock for some reason")
        end

        gameSettings.coloredSquares = 23
        gameSettings.gridSize = 10
        gameSettings.gameTimeoutDuration = 17000
    else
        if exports["ev-inventory"]:hasEnoughOfItem("detcord", 1, false, true) then
            itemUsed = "detcord"
        end
        if not itemUsed and exports["ev-inventory"]:hasEnoughOfItem("thermitecharge", 1, false, true) then
            itemUsed = "thermitecharge"
        end
    end

    if not itemUsed then
        return TriggerEvent("DoLongHudText", "You can not break into this lock for some reason")
    end

    if itemUsed ~= "hackingdevice" then
        TriggerEvent("inventory:removeItem", itemUsed, 1)
    else
        TriggerEvent("inventory:DegenItemType", 20, itemUsed)
    end
    local success = Citizen.Await(ThermiteCharge(gameSettings))

    if not success then
        return TriggerServerEvent("ev-storage:breakInStorageFailed", closestStash, itemUsed)
    end

    loadAnimDict(Config.anims.unlock.dict)
    TaskPlayAnim(PlayerPedId(), Config.anims.unlock.dict, Config.anims.unlock.name, 8.0, -8.0, -1, 1, 1.0, false, false, false)

    local progress = exports["ev-taskbar"]:taskBar(Config.crates[stash.size].openLength, "Breaking open...")
    ClearPedTasks(PlayerPedId())
    if progress ~= 100 then return end

    TriggerServerEvent("ev-storage:breakInStorage", closestStash, itemUsed)
    TriggerEvent("DoLongHudText", "You have opened the container")
end)

RegisterNetEvent("ev-storage:clearStorages")
AddEventHandler("ev-storage:clearStorages", function (deletedStorages)
    for _, id in pairs(deletedStorages) do
        if activeZones[id] then
            activeZones[id] = nil
        end
        if Storages[id] then
            if Storages[id].object then
                DeleteObject(Storages[id].object)
            end
            Storages[id] = nil
        end
    end
end)

AddEventHandler("ev-storage:destroyStash", function ()
    local closestStash, closestStashDist = getClosestStash(10)
    if closestStash == nil then return end
    local stash = Storages[closestStash]
    if closestStashDist > Config.crates[stash.size].distance then return end

    local employmentState = exports["ev-business"]:IsEmployedAt("statecontracting")

    if Config.crates[stash.size].vendor and not employmentState then
        return TriggerEvent("DoLHudText", "You cannot destroy this.", 2)
    end

    local isPD = exports["isPed"]:isPed("myjob") == "police"
    local isOwner = stash.placed_by == exports["isPed"]:isPed("cid")
    if not isPD and not isOwner then
        return TriggerEvent("DoLHudText", "You cannot destroy this.", 2)
    end

    loadAnimDict(Config.anims.destroy.dict)
    TaskPlayAnim(PlayerPedId(), Config.anims.destroy.dict, Config.anims.destroy.name, 8.0, -8.0, -1, 1, 1.0, false, false, false)

    local finished = exports["ev-taskbar"]:taskBar(Config.crates[stash.size].destroyLength, "Destroying...")

    ClearPedTasksImmediately(PlayerPedId())

    if finished == 100 then
        TriggerServerEvent("ev-storage:destroyStash", closestStash)
        if not Config.crates[stash.size].vendor then return end
        local isCrateYoung = RPC.execute("ev-storage:canBeDeplaced", stash.id)
        if isCrateYoung and employmentState then
            TriggerEvent("player:receiveItem", stash.size, 1)
        end
    end
end)

AddEventHandler("ev-storage:checkLifetime", function ()
    local closestStash, closestStashDist = getClosestStash(10)
    if closestStash == nil then return end
    local stash = Storages[closestStash]
    if closestStashDist > Config.crates[stash.size].distance then return end

    TriggerServerEvent("ev-storage:getRemainingLife", closestStash)
end)

AddEventHandler("ev-storage:repairStorage", function ()
    local closestStash, closestStashDist = getClosestStash(10)
    if closestStash == nil then return end
    local stash = Storages[closestStash]
    local definition = Config.crates[stash.size]
    if not definition then return end
    if closestStashDist > definition.distance then return end

    if not definition.repairCharges then
        return TriggerEvent("DoLongHudText", "This container cannot be repaired")
    end

    local hasRepairKit = exports["ev-inventory"]:hasEnoughOfItem("craterepairkit", 1, false)
    if not hasRepairKit then
        return TriggerEvent("DoLongHudText", "You do not have a repair kit")
    end

    local info = exports["ev-inventory"]:GetInfoForFirstItemOfName("craterepairkit")
    local chargesLeft = json.decode(info.information).charges
    if definition.repairCharges > chargesLeft then
        return TriggerEvent("DoLongHudText", "This repair kit would break during repairing.")
    end

    loadAnimDict(Config.anims.repair.dict)
    TaskPlayAnim(PlayerPedId(), Config.anims.repair.dict, Config.anims.repair.name, 8.0, -8.0, -1, 1, 1.0, false, false, false)

    local finished = exports["ev-taskbar"]:taskBar(definition.repairLength, "Repairing...")

    ClearPedTasksImmediately(PlayerPedId())

    if finished ~= 100 then return end

    TriggerServerEvent("ev-storage:repairStorage", closestStash, chargesLeft, info.slot)
end)

AddEventHandler("ev-inventory:itemUsed", function (name, info)
    if name ~= "mobilecratelock" and name ~= "mobilecratekeylock" then return end

    local closestStash, closestStashDist = getClosestStash(10)
    if closestStash == nil then return end
    local stash = Storages[closestStash]
    if closestStashDist > Config.crates[stash.size].distance then return end

    if stash.is_locked then
        return TriggerEvent("DoLongHudText", "This container is already locked")
    end

    if not Config.crates[stash.size].lockLength then
        return TriggerEvent("DoLongHudText", "This container can not be locked")
    end

    loadAnimDict(Config.anims.lock.dict)
    TaskPlayAnim(PlayerPedId(), Config.anims.lock.dict, Config.anims.lock.name, 8.0, -8.0, -1, 1, 1.0, false, false, false)

    local progress = exports["ev-taskbar"]:taskBar(Config.crates[stash.size].lockLength, "Locking...")
    ClearPedTasks(PlayerPedId())
    if progress ~= 100 then return end

    local element = {
        icon = "fas fa-circle",
        label = "Key Name",
        name = "name",
    }
    if name == "mobilecratekeylock" then
        element = {
            type = "password",
            icon = "fas fa-circle",
            label = "Key Code",
            name = "keycode",
        }
    end

    exports['ev-ui']:openApplication('textbox', {
        callbackUrl = 'ev-storage:lockStorage',
        inputKey = { crateId = stash.id, item = name },
        items = {element},
        show = true,
    })
end)

RegisterUICallback("ev-storage:lockStorage", function (data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    exports['ev-ui']:closeApplication('textbox')

    if data.inputKey.item == "mobilecratekeylock" then
        if #data.values.keycode > 4 then
            return TriggerEvent("DoLongHudText", "The key code must be 4 characters or less")
        end
        if tonumber(data.values.keycode) == nil then
            return TriggerEvent("DoLongHudText", "The key code must be a number")
        end
        return TriggerServerEvent("ev-storage:lockStorage", data.values.keycode, data.inputKey.crateId, true)
    end
    TriggerServerEvent("ev-storage:lockStorage", data.values.name, data.inputKey.crateId)
end)

RegisterNetEvent("ev-storage:updateLockState")
AddEventHandler("ev-storage:updateLockState", function (id, state, keyCode)
    if not Storages[id] then return end

    Storages[id].is_locked = state
    Storages[id].key_code = keyCode
end)

function addStorage(storage)
    if not Config.crates[storage.size] then return end

    local vector = vector3(storage.coordinates.x, storage.coordinates.y, storage.coordinates.z)
    exports["ev-polyzone"]:AddCircleZone(
        "mobile_stash",
        vector,
        math.max(75, Config.crates[storage.size].distance * 20),
        { data = { id = storage.id } }
    )

    local object = nil
    if #(GetEntityCoords(PlayerPedId()) - vector) < 25 then
        local heading = storage.coordinates.h
        if heading == nil then heading = 0 end
        object = createStash(storage.size, vector.x, vector.y, vector.z, heading)
        activeZones[storage.id] = vector
    end

    Storages[storage.id] = {
        id = storage.id,
        size = storage.size,
        coordinates = storage.coordinates,
        placed_by = storage.placed_by,
        placed_at = storage.placed_at,
        despawn_at = storage.despawn_at,
        is_locked = storage.is_locked,
        key_code = storage.key_code,
        object = object
    }
end

function explodeCrate(stash)
    AddExplosion(
        stash.coordinates.x,
        stash.coordinates.y,
        stash.coordinates.z,
        2,
        5.0,
        true,
        false,
        1
    )
    TriggerServerEvent("ev-storage:destroyStash", stash.id)
end

function getClosestStash(range, coords)
    local closestStash, closestStashDist = nil, 9999
    if coords == nil then
        coords = GetEntityCoords(PlayerPedId())
    end
    for id, crateCoords in pairs(activeZones) do
        local dist = #(coords-crateCoords)
        if dist < closestStashDist then
            closestStashDist = dist
            closestStash = id
        end
    end
    if closestStashDist > range then
        return nil
    end
    return closestStash, closestStashDist
end

function createStash(size, x,y,z, heading)
    local obj = CreateObject(Config.crates[size].model, x, y, z, 0, 0, 0)
    if not heading then heading = 0 end
    SetEntityHeading(obj, heading + 0.0)
    FreezeEntityPosition(obj, true)
    return obj
end

AddEventHandler("onResourceStop", function (resource)
    if resource ~= "ev-storage" then return end
    for id, storage in pairs(Storages) do
        if storage.object then
            DeleteObject(storage.object)
        end
    end
end)

function ThermiteCharge(gameSettings)
    local p = promise:new()
    Citizen.CreateThread(function()
        local ped = PlayerPedId()
        Citizen.Wait(100)

        local index = #thermiteMinigameResult + 1
        thermiteMinigameResult[index] = nil
        gameSettings.parameters = {
            ["id"] = index,
        }
    
        exports["ev-ui"]:openApplication("memorygame", gameSettings)
    
        while thermiteMinigameResult[index] == nil do
            Citizen.Wait(1000)
        end
        p:resolve(thermiteMinigameResult[index])
        Wait(500)
        exports["ev-ui"]:closeApplication("memorygame")
    end)
    return p
end

RegisterUICallback("ev-storage:crackStorage", function(data, cb)
    thermiteMinigameResult = data.success
    cb({ data = {}, meta = { ok = true, message = "done" } })
end)