RPC.register("ev-casino:purchaseChips", function(src, amount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(cid, false, false)
    if not success then return false end
    local bank = exports["ev-financials"]:getAccountBalance(accountId)
    local CurrentChips = exports["ev-financials"]:CasinoBalance(cid)

    if bank > tonumber(amount) then
        if exports["ev-financials"]:adjustAccountBalance(accountId, "remove", tonumber(amount)) then
            giveChips(src, tonumber(amount))
        else
            return false
        end
    else
        return false, TriggerClientEvent("DoLongHudText", src, "You do not have $" .. amount .. "in your bank account.", 2)
    end

    TriggerClientEvent("ev-phone:SendNotify", src, "$".. amount .. " added!", "casino", "Casino")
end)

RPC.register("ev-casino:purchaseChipsDirty", function(src, amount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 

    exports.oxmysql:execute("SELECT * FROM characters WHERE `id` = @cid",{["@cid"] = cid},function(lsl)
        if lsl[1] ~= nil then
            local lslIsTrash = lsl[1].casino + tonumber(amount)
            exports.oxmysql:execute("UPDATE characters SET casino=@amount WHERE id=@cid", {
                ["cid"] = cid,
                ["amount"] = lslIsTrash
            })
        end
    end)
end)

RPC.register("ev-casino:withdrawChips", function(src, Type)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 
    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(cid, false, false)
    if not success then return false end
    local CurrentChips = exports["ev-financials"]:CasinoBalance(cid)
    if CurrentChips > 0 then 
        local comment = "withdraw Casino chips $" .. CurrentChips
        if Type == "bank" then
            exports["ev-financials"]:adjustAccountBalance(accountId, "add", CurrentChips)
            RemoveChips(src, CurrentChips)
        else
           user:addMoney(CurrentChips)
           RemoveChips(src, CurrentChips)
        end
    end
end)

RPC.register("ev-casino:HasMemberShip", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 
    local result = false   

    exports.oxmysql:execute("SELECT * FROM character_passes WHERE `cid` = @cid",{["@cid"] = cid},function(moon)
        if moon[1] ~= nil then
            result = true
        end
    end)

    Citizen.Wait(100)
    return result, cid
end)

RPC.register("ev-casino:transferChips", function(src, tId, amount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 

    TargetId = TargetId ~= nil and tonumber(TargetId) or nil
    if not TargetId or TargetId <= 0 or TargetId == src then
        return print("fuck off")
    end

    local TargetId = exports["ev-base"]:getModule("Player"):GetUser(tId)
    local TargetCid = TargetId:getCurrentCharacter().id 

    if not TargetId or TargetId == -1 then
        return print("trgt not online")
    end
    
    if (TargetId == src) then
        return print("trgt=id")
    end
    
    if (not amount or amount <= 0) then
        return print("amt less than 0")
    end

    exports.oxmysql:execute("SELECT * FROM characters WHERE `cid` = @cid",{["@cid"] = cid},function(moon)
        if moon[1] ~= nil then
            local lslIsTrash = lsl[1].casino 
            if lslIsTrash >= amount then
                local finalAmount = amount - lslIsTrash
                if finalAmount >= 0 and finalAmount <= 0 then
                    finalAmount = 0 
                end
                exports.oxmysql:execute("UPDATE characters SET casino_chip_count=@amount WHERE id=@cid", {
                    ["cid"] = cid,
                    ["amount"] = finalAmount
                })

                exports.oxmysql:execute("UPDATE characters SET casino_chip_count=@amount WHERE id=@cid", {
                    ["cid"] = TargetCid,
                    ["amount"] = amount
                })
            else
                TriggerClientEvent("DoLongHudText", "Insufficient Funds")
            end
        end
    end)
end)

RPC.register("ev-casino:purchaseMembershipCard", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 
    local fn = user:getCurrentCharacter().first_name
    local fl = user:getCurrentCharacter().last_name
    local name = fn .. " " .. fl
    
    exports.oxmysql:execute("SELECT * FROM character_passes WHERE `cid` = @id",{["@cid"] = cid},function(passes)
        if passes[1] ~= nil then
            return TriggerClientEvent("DoLongHudText", "you Already Have Membership")
        else
            exports.oxmysql:execute("INSERT INTO character_passes (cid, rank, name, giver, pass_type, business_name, bank) VALUES (@cid, @rank, @name, @giver, @pass_type, @business_name, @bank)",{
                ["cid"] = cid,
                ["rank"] = 0,
                ["name"] = fln,
                ["giver"] = "Casino",
                ["pass_type"] = "member",
                ["business_name"] = "casino",
                ["bank"] = 0,
            })
            TriggerClientEvent("player:receiveItem", src, "casinomember", 1, false, { 
            ["cid"] = cid,
            ["rank"] = 0,
            ["name"] = name,
            ["giver"] = "Casino",
            ["pass_type"] = "member",
            ["business_name"] = "casino",
            ["bank"] = 0, 
            })
        end
    end)
end)

RPC.register("ev-casino:getGoldCoinForRoom", function(src, room)

end)

RPC.register("ev-casino:useChips", function(src, currentBetAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 
    local CurrentChips = exports["ev-financials"]:CasinoBalance(cid)

    if currentBetAmount <= CurrentChips then
        RemoveChips(src, currentBetAmount)
        return true
    else
        return false
    end
end)

RPC.register("ev-casino:getCurrentChipCount", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 

    return exports["ev-financials"]:CasinoBalance(cid)
end)


function giveChips(src, amount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local current = exports["ev-financials"]:CasinoBalance(cid)
    local finalAmount = current + amount

    local affectedRows = MySQL.update.await([[
        UPDATE characters
        SET casino_chip_count = ?
        WHERE id = ?
    ]],

    { finalAmount, cid })

    if not affectedRows or affectedRows < 1 then
        return false
    end
end

function RemoveChips(src, amount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local current = exports["ev-financials"]:CasinoBalance(cid)
    local finalAmount = current - amount

    if finalAmount < 0 then
        finalAmount = 0
    end

    local affectedRows = MySQL.update.await([[
        UPDATE characters
        SET casino_chip_count = ?
        WHERE id = ?
    ]],

    { finalAmount, cid })

    if not affectedRows or affectedRows < 1 then
        return false
    end
end

local casinoPeds = {
	{ x = 979.6, y = 32.82, z = 72.46, h = 246.14, model = 'a_m_y_mexthug_01', _pedType = 30 , scenario = "WORLD_HUMAN_SMOKING" },
	{ x = 971.54, y = 28.18, z = 72.46, h = 20.65, model = 'a_m_y_mexthug_01', _pedType = 30 , scenario = "WORLD_HUMAN_SMOKING" },
	{ x = 965.35, y = 39.75, z = 72.9, h = 200.21, model = 'a_m_y_mexthug_01' ,_pedType = 30 , scenario = "WRLD_HUMAN_SMOKING" },
	{ x = 990.46, y = 38.55, z = 72.06, h = 104.43, model = 'a_m_y_mexthug_01', _pedType = 30 , scenario = "WOORLD_HUMAN_SMOKING" },
	{ x = 986.93, y = 51.46, z = 72.06, h = 190.5, model = 'a_m_y_mexthug_01' , _pedType = 30 , scenario = "WORLD_HUMAN_SMOKING" },

}

RPC.register('ev-casino:getSpawnedPedCoords', function(src)
   return casinoPeds
end)

exports("RemoveChips", RemoveChips)
exports("giveChips", giveChips)
