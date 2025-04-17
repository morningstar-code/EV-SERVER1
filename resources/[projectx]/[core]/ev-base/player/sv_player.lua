CPX.Users = CPX.Users or {}
CPX.Player = CPX.Player or {}

function CPX.Player.GetUser(self, id)
    return CPX.Users[id] and CPX.Users[id] or false
end

function CPX.Player.GetUsers(self)
    local tmp = {}
    
    for k, v in pairs(CPX.Users) do
        tmp[#tmp + 1] = k
    end
    
    return tmp
end

local function GetUser(user)
    return CPX.Users[user.source]
end

local function AddMethod(player)
    function player.getVar(self, var)
        return GetUser(self)[var]
    end
    
    function player.setVar(self, var, data)
        GetUser(self)[var] = data
    end
    
    function player.networkVar(self, var, data)
        self:setVar(var, data)
        TriggerClientEvent("ev-base:networkVar", GetUser(self):getVar("source"), var, data)
    end
    
    function player.getRank(self)
        return GetUser(self).rank
    end
    
    function player.setRank(self, rank)
        GetUser(self).rank = rank
        self:networkVar("rank", rank)
    end
    
    function player.setCharacters(self, data)
        GetUser(self).characters = data
    end
    
    function player.setCharacter(self, data)
        GetUser(self).character = data
    end
    
    function player.getCash(self)
        return GetUser(self).character.cash
    end
    
    function player.getBankId(self)
        return exports['ev-financials']:getAccountId(self.source)
    end
    
    function player.getCidWithAccountId(self, account)
        for k, v in pairs(CPX.Users) do
            local bankAcc = exports['ev-financials']:getAccountId(self.source)
            if bankAcc == account then
                return k
            else
                return 0
            end
        end
    end
    
    function player.getBalance(self)
        return GetUser(self).character.bank
    end
    
    function player.getDirtyMoney(self)
        return GetUser(self).character.dirty_money
    end
    
    function player.getGangType(self)
        return GetUser(self).character.gang_type
    end
    
    function player.getStressLevel(self)
        return GetUser(self).character.stress_level
    end
    
    function player.getJudgeType(self)
        return GetUser(self).character.judge_type
    end
    
    function player.alterDirtyMoney(self, amt)
        local characterId = GetUser(self.character.id)
        
        GetUser(self).character.dirty_money = amt
        
        CPX.DB:UpdateCharacterDirtyMoney(GetUser(self), characterId, amt, function(updatedMoney, err)
            if updatedMoney then
                --We are good here.
            end
        end)
    end
    
    function player.alterStressLevel(self, amt)
        local characterid = GetUser(self).character.id
        GetUser(self).character.stress_level = amt
        
        CPX.DB:UpdateCharacterStressLevel(GetUser(self), characterId, amt, function(updatedMoney, err)
            if updatedMoney then
                --We are good here.
            end
        end)
    end
    
    function player.resetDirtyMoney(self)
        local characterid = GetUser(self).character.id
        GetUser(self).character.dirty_money = 0
        
        CPX.DB:UpdateCharacterDirtyMoney(GetUser(self), characterId, 0, function(updatedMoney, err)
            if updatedMoney then
                --We are good here.
            end
        end)
    end
    
    function player.addMoney(self, amt)
        if not amt or type(amt) ~= "number" then return end
        local cash = GetUser(self):getCash() + amt
        local characterId = GetUser(self).character.id
        local src = GetUser(self).source
        
        amt = math.floor(amt)
        -- if not exports["ev-financials"]:DoAddCashToUser(src, amt) then
        --     return print("addMoney | something went wrong")
        -- end

        GetUser(self).character.cash = cash
        TriggerClientEvent("banking:addCash", src, amt)
        CPX.DB:UpdateCharacterMoney(GetUser(self), characterId, cash, function(updatedMoney, err)
            if updatedMoney then
                TriggerClientEvent('isPed:UpdateCash', GetUser(self).source, GetUser(self):getCash())
                TriggerClientEvent('ev-financials:cash', GetUser(self).source, GetUser(self):getCash(), amt)
                exports["ev-log"]:AddLog("Cash Added", GetUser(self), "Money added to user, amount: " .. tostring(amt))
            end
        end)
    end
    
    function player.removeMoney(self, amt)
        if not amt or type(amt) ~= "number" then return end
        local cash = GetUser(self):getCash() - amt
        local characterId = GetUser(self).character.id
        local src = GetUser(self).source
        
        amt = math.floor(amt)
        
        -- if not exports["ev-financials"]:DoAddCashToUser(src, amt) then
        --     return print("removeMoney | something went wrong")
        -- end

        GetUser(self).character.cash = cash
        --TriggerClientEvent("banking:removeCash", src, amt)
        CPX.DB:UpdateCharacterMoney(GetUser(self), characterId, cash, function(updatedMoney, err)
            if updatedMoney then
                TriggerClientEvent('isPed:UpdateCash', GetUser(self).source, GetUser(self):getCash())
                TriggerClientEvent('ev-financials:cash', GetUser(self).source, GetUser(self):getCash(), -amt)
                exports["ev-log"]:AddLog("Cash Removed", GetUser(self), "Money removed from user, amount: " .. tostring(amt))
            end
        end)
    end
    
    function player.removeBank(self, amt) -- add in parameters the acount id
        if not amt or type(amt) ~= "number" then return end
        local bank = GetUser(self):getBalance() - amt
        local characterId = GetUser(self).character.id
        local src = GetUser(self).source

        amt = math.floor(amt)

        GetUser(self).character.bank = bank
        
        CPX.DB:UpdateCharacterBank(GetUser(self), characterId, bank, function(updatedMoney, err)
            if updatedMoney then
                exports["ev-log"]:AddLog("Bank Removed", GetUser(self), "Bank removed from user, amount: " .. tostring(amt))
            end
        end)
    end
    
    function player.addBank(self, amt) -- add in parameters the acount id
        if not amt or type(amt) ~= "number" then return end
        local bank = GetUser(self):getBalance() + amt
        local characterId = GetUser(self).character.id
        local src = GetUser(self).source
        
        amt = math.floor(amt)

        GetUser(self).character.bank = bank
        
        CPX.DB:UpdateCharacterBank(GetUser(self), characterId, bank, function(updatedMoney, err)
            if updatedMoney then
                exports["ev-log"]:AddLog("Bank Added", GetUser(self), "Bank added to user, amount: " .. tostring(amt))
            end
        end)
    end
    
    function player.getNumCharacters(self)
        if not GetUser(self).charactersLoaded or not GetUser(self).characters then return 0 end
        return #GetUser(self).characters
    end
    
    function player.ownsCharacter(self, id)
        if not GetUser(self).charactersLoaded or not GetUser(self).characters or GetUser(self):getNumCharacters() <= 0 then return false end
        
        for k, v in ipairs(GetUser(self).characters) do
            if v.id == id then return true end
        end
        
        return false
    end
    
    function player.getGender(self)
        if not GetUser(self).charactersLoaded or not GetUser(self).characters or not GetUser(self).characterLoaded then return false end
        
        return GetUser(self).character.gender
    end
    
    function player.getCharacters(self)
        return GetUser(self).characters
    end
    
    function player.getCharacter(self, id)
        if not GetUser(self).charactersLoaded or not GetUser(self).characters or GetUser(self):getNumCharacters() <= 0 then return false end
        if not GetUser(self):ownsCharacter(id) then return false end
        
        for k, v in ipairs(GetUser(self).characters) do
            if v.id == id then return v end
        end
        
        return false
    end
    
    function player.getCurrentCharacter(self)
        if not GetUser(self).charactersLoaded or not GetUser(self).characterLoaded or GetUser(self):getNumCharacters() <= 0 then return false end
        return GetUser(self).character
    end
    
    return player
end

local function CreatePlayer(src)
    local self = {}
    
    self.source = src
    self.name = GetPlayerName(src)
    self.hexid = CPX.Util:GetHexId(src)
    
    if not self.hexid then
        DropPlayer(src, "Error fetching steamid")
        return
    end
    
    self.comid = CPX.Util:HexIdToComId(self.hexid)
    self.steamid = CPX.Util:HexIdToSteamId(self.hexid)
    self.license = CPX.Util:GetLicense(src)
    self.ip = GetPlayerEndpoint(src)
    self.rank = "user"
    
    self.characters = {}
    self.character = {}
    
    self.charactersLoaded = false
    self.characterLoaded = false
    
    local methods = AddMethod(self)
    
    CPX.Users[src] = methods
    return methods
end

function CPX.Player.CreatePlayer(self, src, recrate)
    if recreate then CPX.Users[src] = nil end
    if CPX.Users[src] then return CPX.Users[src] end
    return CreatePlayer(src)
end

local pos = {}
RegisterServerEvent('ev-base:updatecoords')
AddEventHandler('ev-base:updateCoords', function(x, y, z)
    local src = source
    pos[src] = {x, y, z}
end)

RegisterServerEvent("retreive:licenes:server") 
AddEventHandler("retreive:licenes:server", function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local characterId = user:getVar("character").id
    exports.oxmysql:execute('SELECT * FROM user_licenses WHERE owner = ? AND type = ?', {characterId, "Firearm"}, function(callback)
        TriggerClientEvent("wtflols", src, callback[1].status)
    end)
    exports.oxmysql:execute('SELECT * FROM user_licenses WHERE owner = ? AND type = ?', {characterId, "Driver"}, function(callback)
        TriggerClientEvent("rise-driversLicense", src, callback[1].status)
    end)
end)

RegisterServerEvent("retreive:jail")
AddEventHandler("retreive:jail", function(cid)
    local src = source
    exports.oxmysql:execute("SELECT `jail_time` FROM `characters` WHERE id = ?", {cid}, function(result)
        if result[1].jail_time >= 1 then
            TriggerClientEvent("beginJail2", src, result[1].jail_time, true)
        end
    end)
end)

AddEventHandler("playerDropped", function(reason)
    local src = source
    if reason == nil then reason = "Unknown" end
    local user = CPX.Player:GetUser(src)
    local posE = json.encode(pos[src])
    pos[src] = nil
    if user then exports["ev-log"]:AddLog("Player Left", user, user:getVar("name") .. " Has left the server") end
    if reason == 'Game crashed: gta-core-five.dll!CrashCommand (0x0)' then TriggerEvent("ev-log:server:CreateLog", "PlayerCrashed", "Player Disconnected", "red", "**" .. reason.. "  Player Steam Name : " .. GetPlayerName(src) .. " \n\n  **" .. json.encode(name_resource).. "**", false) end
    TriggerEvent("ev-log:server:CreateLog", "LeaveServer", "Dropped", "red", "Player Name :  **" .. GetPlayerName(src) .. "** (" .. GetPlayerIdentifiers(src)[1] .. ") Reason: " .. reason)
    CPX.Users[src] = nil
    TriggerClientEvent('onPlayerDropped', -1, user)
end)

function FetchPlayerData()
    return CPX.Users
end

exports("FetchPlayerData", FetchPlayerData)
