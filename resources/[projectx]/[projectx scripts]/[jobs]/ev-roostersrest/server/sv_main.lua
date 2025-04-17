local employeesList = {}
local emoloyeeData = {}
local employeeAmount = 0 
local activePurchases = {}
local PurchasesData = {}

RegisterServerEvent('ev-roostersrest:orderFood')
AddEventHandler('ev-roostersrest:orderFood', function (data, cb)
    local startPos = GetEntityCoords(PlayerPedId())
    local cb = cb({ data = {}, meta = { ok = true, message = '' } })
    local tempContext, tempAction, tempAnimDict, tempAnim, animLoop = {}, "", "", "", false
end)

RegisterServerEvent('ev-roostersrest:cleanStation')
AddEventHandler('ev-roostersrest:cleanStation', function(data, cb)
    local tempAnimDict = "amb@world_human_maid_clean@base"
    local tempAnim = "base"
end)

RPC.register("ev-roostersrest:tryJoinJob", function(src, location)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local info = user:getCurrentCharacter()
    local playerName = info.first_name .. " " .. info.last_name

    -- if isEmployee or isOwner then
        emoloyeeData = {
            name = playerName,
            cid = info.id,
            location = location
        }
        table.insert(employeesList, emoloyeeData)
        employeeAmount = employeeAmount + 1
        isSignedOn = true
        message = "you signed on"
    -- else
    --     isSignedOn = false
    --     message = "you are not an employee at bruger shot"
    -- end

    return isSignedOn, message
end)

RPC.register("ev-roostersrest:server:getActiveEmployees", function(src)
    return employeesList
end)

RPC.register("ev-roostersrest:leaveJob", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local to_remove = tostring(cid)

    local index = {}
    
    for k,v in pairs(employeesList) do
        index[v]=k
    end
    employeeAmount = employeeAmount - 1
    table.remove(employeesList, index[to_remove])
end)

RPC.register("ev-roostersrest:isStationActive", function(src, stationId)
    isActive = true

    return isActive
end)

RPC.register("ev-roostersrest:completePurchase", function(src, key)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local BankBalance = user:getBalance()
    local CashBalance = user:getCash()
    local success

    local index = {}
    
    for k,v in pairs(activePurchases) do
        index[v]=k

        if CashBalance >= v.cost then
            user:removeMoney(tonumber(v.cost))
            success = true
            table.remove(activePurchases, index[key])
        else
            success = false
        end
    end
    TriggerClientEvent("ev-roostersrest:closePurchase", -1, key)
    return success
end)

RPC.register("ev-roostersrest:canUseStore", function(src) -- check config
    if employeeAmount >= 0 and employeeAmount < 1 then
        canUse = true
    else
        canUse = false
    end

    return canUse
end)

RPC.register("ev-roostersrest:enterTavern", function(src) -- check config
    if employeeAmount >= 0 and employeeAmount < 1 then
        canUse = true
    else
        canUse = false
    end

    return canUse
end)

RPC.register("ev-roostersrest:startPurchase", function(src, data)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local info = user:getCurrentCharacter()
    local playerName = info.first_name .. " " .. info.last_name

    local temp = {
        cost = data.cost,
        comment = data.comment,
        registerId = data.registerId,
        charger = playerName
    }

    table.insert(activePurchases, temp)
    
    Citizen.Wait(100)
    TriggerClientEvent("ev-roostersrest:activePurchase", -1, activePurchases)
end)
