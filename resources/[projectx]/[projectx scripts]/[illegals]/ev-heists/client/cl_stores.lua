local safeAttempts = 0
local safeAttemptsResult = nil
local storeSafeMinigameUICallbackUrl = "ev-ui:heists:storeSafeMinigameResult"
isDarkMarketStores = false
local gameSettings = {
    gridSize = 5,
    coloredSquares = 10,
    gameTimeoutDuration = 14,
    gameFinishedEndpoint = storeSafeMinigameUICallbackUrl,
}

local function crackSafe()
    local p = promise:new()
    exports["ev-dispatch"]:dispatch("10-90A", "Store Robbery")
    RequestAnimDict("mini@safe_cracking")
    while not HasAnimDictLoaded("mini@safe_cracking") do Citizen.Wait(0) end
    ClearPedTasksImmediately(PlayerPedId())
    TaskPlayAnim(PlayerPedId(), "mini@safe_cracking", "dial_turn_clock_slow",  8.0, 1.0, -1, 1, -1, false, false, false)
    Citizen.CreateThread(function()
        safeAttemptsResult = nil
        -- exports["ev-ui"]:openApplication("memorygame", gameSettings)
        exports["ev-memory"]:OpenThermiteGame(function(success)
            if success then
                safeAttemptsResult = success
                RPC.execute("completeTask", "darkmarket_stores", 2)
                RPC.execute("ev:progression:character:illegalRep", 1, "hackexp")
            else
                safeAttemptsResult = success
                RPC.execute("completeTask", "darkmarket_stores", 3, nil, true)
            end
        end, gameSettings.gridSize, gameSettings.coloredSquares, gameSettings.gameTimeoutDuration, gameSettings.gameFinishedEndpoint)
        while safeAttemptsResult == nil do Citizen.Wait(1000) end
        p:resolve(safeAttemptsResult)
        ClearPedTasksImmediately(PlayerPedId())
    end)
    return p
end

RegisterUICallback(storeSafeMinigameUICallbackUrl, function(data, cb)
    safeAttemptsResult = data.success
    cb({data = {}, meta = {ok = true, message = "done"}})
end)

AddEventHandler("ev-heists:stores:attemptSafe", function(p1, p2, pArgs)
    if not exports["ev-inventory"]:hasEnoughOfItem("safecrackingkit", 1, false, true) then
        TriggerEvent("DoLongHudText", "You don't have the necessary item.", 2)
        return
    end

    local id = pArgs.zones["store_safe_target"].id
    local coords = pArgs.zones["store_safe_target"].coords
    local canHitSafe = RPC.execute("ev-heists:store:canHitSafe", id, coords)
    if not canHitSafe then return end
    TriggerEvent("inventory:DegenItemType", 10, "safecrackingkit")

    local crackSuccess = Citizen.Await(crackSafe())
    if not crackSuccess then return end
    RPC.execute("ev-heists:store:canHitSafeSuccess", id)
end)

AddEventHandler("ev-ui:application-closed", function(name)
    if name ~= "memorygame" then return end
    Citizen.CreateThread(function()
        Citizen.Wait(2500)
        if safeAttemptsResult == nil then safeAttemptsResult = false end
    end)
end)

AddEventHandler("ev-heists:stores:openSafe", function(p1, p2, pArgs)
    local id = pArgs.zones["store_safe_target"].id
    local coords = pArgs.zones["store_safe_target"].coords
    RPC.execute("ev-heists:store:openCrackedSafe", id, coords)
    RPC.execute("completeTask", "darkmarket_stores", 4)
end)

RegisterNetEvent("startillegalstores")
AddEventHandler("startillegalstores", function(groupId, groupData, members, task, pState)
  local clientId = PlayerId()
  local src = GetPlayerServerId(clientId)
    for k,v in pairs(members) do
        if tonumber(v.src) == tonumber(src) then
            if tonumber(v.src) ~= tonumber(groupData.leader) then
                isDarkMarketStores = pState
                TriggerEvent("ev-phone:JobNotify", task.header, task.task, false, groupId)
            else
                isDarkMarketStores = pState
                TriggerEvent("ev-phone:JobNotify", task.header, task.task, true, groupId)
            end
        end
    end
end)

RegisterNetEvent("finishillegalstores")
AddEventHandler("finishillegalstores", function(members, pState)
  local clientId = PlayerId()
  local src = GetPlayerServerId(clientId)
    for k,v in pairs(members) do
        if tonumber(v.src) == tonumber(src) then
            isDarkMarketStores = pState
        end
    end
end)