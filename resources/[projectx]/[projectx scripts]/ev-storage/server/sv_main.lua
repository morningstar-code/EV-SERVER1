

RegisterNetEvent("ev-storage:breakInStorageFailed")
AddEventHandler("ev-storage:breakInStorageFailed", function(pClosestStash, pItemUsed)
    -- TODO: breakInStorageFailed

end)

RegisterNetEvent("ev-storage:breakInStorage")
AddEventHandler("ev-storage:breakInStorage", function(pClosestStash, pItemUsed)
    -- TODO: breakInStorage

    TriggerClientEvent("ev-storage:updateLockState", -1, pClosestStash, false)
end)

RegisterNetEvent("ev-storage:getRemainingLife")
AddEventHandler("ev-storage:getRemainingLife", function(pId)
    local storages = Await(SQL.executedynamicparam("SELECT * FROM storage WHERE id = ?", {pId}))
    print("placed_at", storages[1].placed_at)
    print("despawn_at", storages[1].despawn_at)
    -- local RemaingingLife = disp_time()
end)

RegisterNetEvent("ev-storage:repairStorage")
AddEventHandler("ev-storage:repairStorage", function(pClosestStash, pChargesLeft, pSlot)
    -- TODO: Repair
end)

RegisterServerEvent("ev-storage:lockStorage")
AddEventHandler("ev-storage:lockStorage", function(pKeycode, pCrateId, pState)
    local src = source
    local affectedRows = MySQL.update.await([[
        UPDATE storage
        SET key_code = ? AND is_locked = ?
        WHERE id = ?
    ]],
    { tostring(pKeycode), tostring(pState), pCrateId })

    if not affectedRows or affectedRows < 1 then
        return false
    end

    TriggerClientEvent("ev-storage:updateLockState", -1, pCrateId, true, pKeycode)
    TriggerClientEvent("inventory:removeItem", src, "mobilecratekeylock", 1)
end)

RegisterNetEvent("objects:insertObject")
AddEventHandler("objects:insertObject", function(pLocation, pData)
    -- TODO: inside houses
end)

RegisterNetEvent("ev-storage:prepareStorage")
AddEventHandler("ev-storage:prepareStorage", function(pIsSelecting, pCid, pCoords, pHeading)
    local src = source
    local unix = os.time()
    local randomId = math.random(1111, 4444)

    local coords = {
        x = pCoords[1],
        y = pCoords[2],
        z = pCoords[3],
        h = pHeading,
    }

    local insert = MySQL.insert.await([[
        INSERT INTO storage (id, size, coordinates, placed_by, placed_at, despawn_at)
        VALUES (?, ?, ?, ?, ?, ?)
    ]],
    { randomId, pIsSelecting, json.encode(coords), pCid, unix, Config.crates[pIsSelecting].duration })

    local storages = Await(SQL.executedynamicparam("SELECT * FROM storage WHERE id = ?", {randomId}))
    local prepar = {
        id = randomId,
        size = storages[1].size, 
        coordinates = json.decode(storages[1].coordinates),
        placed_by = storages[1].placed_by,
        placed_at = storages[1].placed_at,
        despawn_at = storages[1].despawn_at,
        is_locked = storages[1].is_locked,
        key_code = storages[1].key_code,
    }
    TriggerClientEvent("ev-storage:prepareNewStorage", src, prepar)
end)

RPC.register("ev-storage:canBeDeplaced", function(src, pId)
    -- TODO: canBeDeplaced depends on health of the object
end)