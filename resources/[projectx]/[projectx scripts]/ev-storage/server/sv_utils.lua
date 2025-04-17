activeStorages = {}

Citizen.CreateThread(function()
    print("[ev-storage] - Initiate Storages")
    print("[ev-storage] - Check expired Storages")
    local storages = Await(SQL.executedynamicparam("SELECT * FROM storage", {}))
    local curUnix = os.time()
    for k,v in pairs(storages) do
        if tonumber(v.placed_by) > tonumber(v.despawn_at) then
            local msg = "[ev-storage] - Storage Expired | ID: " .. v.id .. " | CID: " .. v.placed_by .. " | Size: " .. v.size .. " | Expiry: " .. v.despawn_at
            print(msg)
            local delete = MySQL.update.await([[
                DELETE FROM storage
                WHERE id = ?
            ]],
            { v.id })
            print("[ev-storage] - Storage deleted from database")
        end
    end
end)

AddEventHandler("onResourceStart", function(resource)
    if resource == "ev-storage" then
        while GetResourceState(resource) ~= "started" do Citizen.Wait(0) end
        Citizen.Wait(1)
        local data = Await(SQL.executedynamicparam("SELECT * FROM storage", {}))
        for k,v in pairs(data) do
            activeStorages[v.id] = {
                id = v.id,
                size = v.size, 
                coordinates = json.decode(v.coordinates),
                placed_by = v.placed_by,
                placed_at = v.placed_at,
                despawn_at = v.despawn_at,
                is_locked = v.is_locked,
                key_code = v.key_code
            }
        end
        Citizen.Wait(500)
        TriggerClientEvent("ev-storage:loadStorages", -1, activeStorages)
    end
end)

RegisterNetEvent("SpawnEventsServer")
AddEventHandler("SpawnEventsServer", function()
    local src = source
    TriggerClientEvent("ev-storage:loadStorages", src, activeStorages)
end)

RegisterServerEvent("ev-storage:destroyStash")
AddEventHandler("ev-storage:destroyStash", function(pId)
    local delete = MySQL.update.await([[
        DELETE FROM storage
        WHERE id = ?
    ]],
    { pId })

    activeStorages[pId] = {pId}
  
    TriggerClientEvent("ev-storage:clearStorages", -1, activeStorages[pId])
end)

function disp_time(time)
    local t = (os.difftime(time, os.time()))
    local d = math.floor(t / 86400)
    local h = math.floor((t % 86400) / 3600)
    local m = math.floor((t % 3600) / 60)
    local s = math.floor((t % 60))
    return {days = d , hours = h , minutes = m, seconds = s}
end