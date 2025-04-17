BUSINESSES = {}
RECEIVED_RECEIPTS = {}
ACTIVE_PURCHASES = {}
local BUSINESS_CODES = { 'burger_shot', 'snr_buns', 'roosters', 'maldinis' }
local isSignedIn = false

local function initBusinesses()
    local query = "SELECT * FROM _restaurants"
    local queryData = Await(SQL.executedynamicparam(query))

    for k, v in pairs(queryData) do
        BUSINESSES[v.code] = {}
        BUSINESSES[v.code].code = v.code
        BUSINESSES[v.code].name = v.name
        BUSINESSES[v.code].foodItems = json.decode(v.foodItems)
        BUSINESSES[v.code].menu = json.decode(v.menu)
        BUSINESSES[v.code].safeCash = v.safeCash
        BUSINESSES[v.code].open = v.openHour
        BUSINESSES[v.code].close = v.closeHour
        BUSINESSES[v.code].employees = {}
    end
end

Citizen.CreateThread(function()
    initBusinesses()
end)

Citizen.CreateThread(function()
    while true do
        Wait(1000)
        for i = 1, #RECEIVED_RECEIPTS do
            if os.time() - RECEIVED_RECEIPTS[i][1].time > 3600 then
                table.remove(RECEIVED_RECEIPTS, i)
            end
        end
    end 
end)

RegisterNetEvent("ev-restaurants:triggerSilentAlarm")
AddEventHandler("ev-restaurants:triggerSilentAlarm", function(pCoords)

    TriggerEvent("dispatch:svNotify", {
        dispatchCode = "10-SHELLY",
        origin = { 
            x = pCoords.x,
            y = pCoords.y,
            z = pCoords.z
        },
    })
end)

RPC.register("ev-restaurants:joinJob", function(src, pBiz, pType)
    local src = src
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local bizId = BUSINESSES[pBiz].code
    local isEmployed = exports["ev-business"]:IsEmployedAtBusiness({ character = { id = user.character.id }, business = { id = bizId } })

    if not isEmployed then
        return false, "There are no available positions."
    end

    if (#BUSINESSES[pBiz].employees >= MAX_EMPLOYEES) then
        return false, "There are too many active employees."
    end

    local query = "UPDATE _business_employee SET clocked_in = ? WHERE cid = ? AND code = ?"
    local queryData = Await(SQL.executedynamicparam(query, 1, user.character.id, BUSINESSES[pBiz].code))


    BUSINESSES[pBiz].employees[src] = {name = user.character.first_name .. " " .. user.character.last_name, cid = user.character.id}
    isSignedIn = true
    
    return true
end)

RPC.register("ev-restaurants:leaveJob", function(src, pBiz)
    local src = src
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    for k, v in pairs(BUSINESSES) do
        if (v.employees[src]) then
            v.employees[src] = nil
        end
    end
    isSignedIn = false
    local query = "UPDATE _business_employee SET clocked_in = ? WHERE cid = ? AND code = ?"
    local queryData = Await(SQL.executedynamicparam(query, 0, user.character.id, pBiz))

    return true
end)

RPC.register("ev-restaurants:getActiveEmployees", function(src, pBiz)
    return BUSINESSES[pBiz].employees
end)

RPC.register("ev-restaurants:setWorkHours", function(src, pBiz, pOpen, pClose)
    local openHour = ("%s:00"):format(pOpen)
    local closeHour = ("%s:00"):format(pClose)
    BUSINESSES[pBiz].open = openHour
    BUSINESSES[pBiz].close = closeHour

    local query = "UPDATE _restaurants SET openHour = ?, closeHour = ? WHERE code = ?"
    local queryData = Await(SQL.executedynamicparam(query, openHour, closeHour, pBiz))

    return true
end)

RPC.register("ev-restaurants:getWorkHours", function(src, pBiz)
    local context = {
        { title = ('Opening Hour: %s'):format(BUSINESSES[pBiz].open), icon = 'business-time', action = nil, key = 'opening' },
        { title = ('Closing Hour: %s'):format(BUSINESSES[pBiz].close), icon = 'store-slash', action = nil, key = 'closing' },
    }

    return context
end)

RPC.register("ev-restaurants:getSafeCash", function(src, pBiz)
    return getSafeCash(pBiz, true)
end)

RPC.register("ev-restaurants:takeSafeCash", function(src, pBiz)
    local safeCash = getSafeCash(pBiz, false)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local query = "UPDATE _restaurants SET safeCash = ? WHERE code = ? LIMIT 1"
    
    if safeCash == 0 then return TriggerClientEvent("DoLongHudText", src, "Safe is empty, there's no money.", 2) end
    
    local queryData = Await(SQL.executedynamicparam(query, 0, pBiz))

    if queryData.changedRows > 0 then
        user:addMoney(safeCash)
    end

    return
end)

RPC.register("ev-restaurants:depositCash", function(src, pBiz, pItemInfo)
    local pAmount = pItemInfo.amount
    local query = "UPDATE _restaurants SET safeCash = safeCash + ? WHERE name = ? LIMIT 1"
    local queryData = Await(SQL.executedynamicparam(query, pAmount, pBiz))

    if queryData[1].changedRows > 0 then
        TriggerEvent("inventory:removeItemByMetaKV", src, "envelope", 1, "amount", pAmount)
    end

    return
end)

RPC.register("ev-restaurants:crackSafe", function(src, pBiz)
    local safeCash = getSafeCash(pBiz, false)
    local query = "UPDATE _restaurants SET safeCash = 0 WHERE name = ? LIMIT 1"
    local queryData = Await(SQL.executedynamicparam(query, pBiz))

    if queryData[1].affectedRows >= 1 then
        user:addMoney(safeCash)
    end

    return
end)

RPC.register("ev-restaurants:startPurchase", function(src, pData)
    local pRegisterId = pData.registerId
    local pCost = pData.cost
    local pComment = pData.comment
    ACTIVE_PURCHASES[pRegisterId] = {}
    ACTIVE_PURCHASES[pRegisterId].registerId = pRegisterId
    ACTIVE_PURCHASES[pRegisterId].cost = pCost
    ACTIVE_PURCHASES[pRegisterId].comment = pComment
    ACTIVE_PURCHASES[pRegisterId].charger = src

    Wait(100)

    TriggerClientEvent("ev-restaurants:activePurchase", -1, ACTIVE_PURCHASES[pRegisterId])
end)

RPC.register("ev-restaurants:completePurchase", function(src, pData)
    local purchase = ACTIVE_PURCHASES[pData.registerId]
    purchase.biz = pData.biz
    if not purchase then return end
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cash = user:getCash()
    local char = user:getCurrentCharacter()
    local BizAccountId = exports["ev-business"]:GetBizBank(purchase.biz)
    local success, AccountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local success
    local shouldGiveReceipt = true
    local taxAmount = exports["ev-financials"]:CalculateTax(purchase.cost, "Services")
    local message = "$" .. tostring(taxAmount) .. " was withdrawn from your account."
    
    if (pData.cash) then
        success = exports["ev-financials"]:DoCashTransaction(src, BizAccountId, "Services", purchase.cost, purchase.comment, "purchase")
        if not success then
            TriggerClientEvent("DoLongHudText", src, "You don't have enough money.", 2)
            TriggerClientEvent("DoLongHudText", purchase.charger, "The purchase at register ".. purchase.registerId .." has been failed. (Not enough cash)", 2)
            return false
        end
    else
        success = exports["ev-financials"]:DoBusinessTransaction(src, AccountId, BizAccountId, purchase.cost, "Services", purchase.comment, char.id, purchase.charger, "purchase")
        TriggerClientEvent("ev-phone:SendNotify", src, message, "charge", BUSINESSES[purchase.biz].name)
        if not success then
            TriggerClientEvent("DoLongHudText", src, "You don't have enough money.", 2)
            TriggerClientEvent("DoLongHudText", purchase.charger, "The purchase at register ".. purchase.registerId .." has been failed. (Not enough cash)", 2)
            return false
        end
    end

    local query = "UPDATE _restaurants SET safeCash = safeCash + ? WHERE code = ?"
    local queryData = Await(SQL.executedynamicparam(query, tonumber(purchase.cost), purchase.biz))

    if queryData.affectedRows >= 1 then
        TriggerClientEvent("DoLongHudText", src, "The purchase has been completed.", 1)
        if (RECEIVED_RECEIPTS[pData.charger] == nil) then
            RECEIVED_RECEIPTS[pData.charger] = {}
        end

        if (#RECEIVED_RECEIPTS[pData.charger] >= MAX_RECEIPTS_PER_HOUR) then
            print("max receipts reached for persn", pData.charger)
            shouldGiveReceipt = false
            TriggerClientEvent("DoLongHudText", pData.charger, ("You have reached the limit of %s receipts in 1 hour."):format(MAX_RECEIPTS_PER_HOUR), 2)
        end

        if (shouldGiveReceipt) then
            local receipt = {
                registerId = purchase.registerId,
                cost = purchase.cost,
                comment = purchase.comment,
                biz = purchase.biz,
                time = os.time()
            }
    
            table.insert(RECEIVED_RECEIPTS[pData.charger], receipt)
    
            -- this code adds the receipt
            TriggerClientEvent("player:receiveItem", pData.charger, "burgerReceipt", 1, false, {}, {location = BUSINESSES[purchase.biz].name})
        end
    end

    TriggerClientEvent("ev-restaurants:closePurchase", -1, purchase.registerId)
    ACTIVE_PURCHASES[purchase.registerId] = nil
    return true
end)

RPC.register("ev-restaurants:getTakeoutBox", function(src, pData)
    local genId = tostring(math.random(10000, 99999999))
    local invId = "takeout-" .. genId .. ""
    local metaData = {
        inventoryId = invId,
        bagName = pData.name,
        slots = pData.slots,
        weight = pData.weight,
        restaurant = pData.restaurant,
        _hideKeys = {'inventoryId', 'slots', 'weight', 'restaurant', 'bagName'},
      }
    TriggerClientEvent("player:receiveItem", src, pData.box_item_id, 1, false, {}, metaData)
end)

RPC.register("ev-restaurants:updatePaycheck", function(src, pRole, pType, pPayout, pBiz)
    local paychecks = nil
    paychecks = getBizPaycheck(pBiz, pRole)

    if pType == 1 then
        for k,v in pairs(paychecks) do     
            if v.role == pRole then   
                return false, "Pyacheck has been set already, you can change it"
            end
        end

        tbl = {
            role = pRole,
            pay = pPayout,
        }

        table.insert(paychecks, tbl) 

        return setBizPaycheck(paychecks, pBiz, pPayout)
    else
        for k,v in pairs(paychecks) do  
            if v.role == pRole then   
                table.remove(paychecks, k)
            end
        end

        tbl = {
            role = pRole,
            pay = pPayout,
        }
        table.insert(paychecks, tbl) 
        return setBizPaycheck(paychecks, pBiz, pPayout)
    end
end)

function getSafeCash(pBiz, pMenu)
    local query = "SELECT safeCash, name FROM _restaurants WHERE code = ?"
    local queryData = Await(SQL.executedynamicparam(query, pBiz))
    local context = {
        {
            title = queryData[1].name .. ' Safe',
            description = "Current Cash: $" .. queryData[1].safeCash .. ".00",
            icon = "wallet",
        },
    }

    if pMenu then
        return context
    else
        return queryData[1].safeCash
    end
end

function setBizPaycheck(pPaycheck, pBiz, pPayout)
    local query = "UPDATE _restaurants SET paycheck = ? WHERE code = ?"
    local queryData = Await(SQL.executedynamicparam(query, json.encode(pPaycheck), pBiz))

    if queryData.affectedRows > 0 then
        return true, "Pyacheck Has been successfully set to $" .. pPayout .. ".00"
    else
        return false, "Pyacheck Has not been successfully set"
    end
end

function getBizPaycheck(pBiz, pRole)
    local query = "SELECT paycheck FROM _restaurants WHERE code = ?"
    local queryData = Await(SQL.executedynamicparam(query, pBiz))
    local pChecks = json.decode(queryData[1].paycheck) or {}

    return pChecks
end

function getRolePaycheck(pBiz, pCid)
    local query = "SELECT paycheck FROM _restaurants WHERE code = ?"
    local queryData = Await(SQL.executedynamicparam(query, pBiz))
    local pChecks = json.decode(queryData[1].paycheck) or {}
    local pRole = exports["ev-business"]:getEmployeeRole(pBiz, pCid) --TODO: Needs fulyl redoing to get biz tey work at and also the paycheck thats set in the DB via the owner.
    local payout = 0

    for k,v in pairs(pChecks) do 
        if v.role == pRole then
            payout = tonumber(v.pay)
        end
    end
    
    return payout 
end

function isEmployeeSignedIn()
    return isSignedIn
end

--[[
    Exports
]]

exports("setBizPaycheck", setBizPaycheck)
exports("getBizPaycheck", getBizPaycheck)
exports("getRolePaycheck", getRolePaycheck)
exports("isEmployeeSignedIn", isEmployeeSignedIn)