CPX.DB = CPX.DB or {}

function CPX.DB.CreateNewPlayer(self, src, callback)
    local hexid = CPX.Util:GetHexId(src)
    callback = callback and callback or function() return end

    local data = {
        hexid = hexid,
        communityid = CPX.Util:HexIdToComId(hexid),
        steamid = CPX.Util:HexIdToSteamId(hexid),
        license = CPX.Util:GetLicense(src),
        name = GetPlayerName(src),
        ip = GetPlayerEndpoint(src),
        rank = "user"
    }

    for k,v in pairs(data) do
        if not v or v == "" then
            callback(false, true)
            return
        end
    end

    local q = [[INSERT INTO users (hex_id, steam_id, community_id, license, ip, name, rank)
                VALUES(@hexid, @steamid, @comid, @license, @ip, @name, @rank);]]
    local v = {
        ["hexid"] = data.hexid,
        ["steamid"] = data.steamid,
        ["comid"] = data.communityid,
        ["license"] = data.license,
        ["ip"] = data.ip,
        ["rank"] = data.rank,
        ["name"] = data.name
    }    

    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged or not rowsChanged.changedRows then callback(false, true) return end

        local created = rowsChanged and true or false
        callback(created)
    end)
end

function CPX.DB.CreateNewCharacter(self, src, data2, hexid, ph, callback)
    local hexid = hexid
    callback = callback and callback or function() return end

    local data = data2

    for k, v in pairs(data) do
        if not v or v == "" then
            callback(false, true)
            return
        end
    end

    local q = [[INSERT INTO characters (owner, first_name, last_name, dob, gender, phone_number, bankid)
                VALUES(@owner, @first_name, @last_name, @dob, @gender, @phone_number, @bankid);]]
    local v = {
        ["owner"] = hexid,
        ["first_name"] = data.firstname,
        ["last_name"] = data.lastname,
        ["dob"] = data.dob,
        ["gender"] = data.gender,
        ["phone_number"] = ph,
        ["bankid"] = 0
    }

    local insertId = MySQL.insert.await(q, v)
    if not insertId then
        return callback(false, true)
    end
    return callback(true)
end
 
function CPX.DB.PlayerExistsDB(self, src, callback)
    local hexId = CPX.Util:GetHexId(src)
    callback = callback and callback or function() return end
    
    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[SELECT hex_id FROM users WHERE hex_id = @id LIMIT 1;]]
    local v = {["id"] = hexId}

    exports.oxmysql:execute(q, v, function(results)
        if not results then callback(false, true) return end

        local exists = (results and results[1]) and true or false

        callback(exists)
    end)
end

function CPX.DB.PhoneNumberExists(self, src, phone_number, callback)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)

    callback = callback and callback or function() return end

    if not user then callback(false, true) print("error error EXORTS SOSIS addition: scan's best friend is jamerson") return end

    local hexId = user:getVar("hexid")

    if not hexId or hexid == "" then callback(false, true) print('another error') return end

    local q = [[SELECT phone_number FROM characters WHERE owner = @id;]]
    local v = {
        ["id"] = hexid,
        ["phone_number"] = phone_number
    }


    exports.oxmysql:execute(q, v, function(results)
        if not results then callback(false, true) print('error error EXORTS') return end


        local exists = (results and results[1]) and true or false
        callback(exists)
    end)
end

function CPX.DB.FetchPlayerData(self, src, callback)
    local hexId = CPX.Util:GetHexId(src)
    callback = callback and callback or function() return end

    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[SELECT * FROM users WHERE hex_id = @id;]]
    local v = {["id"] = hexId}

    exports.oxmysql:execute(q, v, function(results)
        if not results then callback(false, true) return end
        results = results[1] and results or {}

        
        local fetched = (results and results[1]) and results[1] or false

        callback(fetched)
    end)
end

function CPX.DB.FetchCharacterData(self, user, callback)
    callback = callback and callback or function() return end

    if not user then callback(false, true) return end

    local hexId = user:getVar("hexid")

    if not hexId or hexid == "" then callback(false, true) return end

    local q = [[SELECT * FROM characters WHERE owner = @owner]]
    local v = {["owner"] = hexId}

    exports.oxmysql:execute(q,v, function(results)
        if not user then callback(false, true) print('we have error') return end
        results = results[1] and results or {}
        callback(results)
    end)
end

function CPX.DB.DeleteCharacter(self, user, id, callback)
    callback = callback and callback or function() return end

    if not user then callback(false, true) return end

    local hexId = user:getVar("hexid")

    if not hexId or hexId == "" then callback(false, true) return end
    if not id or type(id) ~= "number" then callback(false, true) return end

    local q = [[DELETE FROM characters WHERE owner = @hexid and id = @id;]]
    local v = {
        ["hexid"] = hexId,
        ["id"] = id
    }

    exports.oxmysql:execute(q, v, function(rowsChanged)
    if not rowsChanged.changedRows then callback(false, true) return end

        local deleted = rowsChanged and true or false

        callback(deleted)
    end)
end

function CPX.DB.UpdateCharacterStressLevel(self, user, characterId, newLevel, callback)
    callback = callback and callback or function() return end
    if not user then callback(false,true) return end
    if not characterId or type(characterId) ~= "number" then callback(false, true) return end

    if not user:ownsCharacter(characterId) then callback(false, true) return end

    local hexId = user:getVar("hexid")
    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[UPDATE characters SET stress_level = @stress_level WHERE owner = @hexid AND id = @characterId;]]
    local v = {
        ["stress_level"] = newLevel,
        ["hexid"] = hexId,
        ["characterId"] = characterId
    }
    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then callback(true,false) return end
        local updated = rowsChanged and true or false
        callback(updated)
    end)
end


function CPX.DB.UpdateCharacterDirtyMoney(self, user, characterId, amount, callback)
callback = callback and callback or function() return end
    if not user then callback(false,true) return end
    if not characterId or type(characterId) ~= "number" then callback(false, true) return end

    if not user:ownsCharacter(characterId) then callback(false, true) return end

    local hexId = user:getVar("hexid")
    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[UPDATE characters SET dirty_money = @dirty_money WHERE owner = @hexid AND id = @characterId;]]
    local v = {
        ["dirty_money"] = amount,
        ["hexid"] = hexId,
        ["characterId"] = characterId
    }
    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then callback(false, true) return end
        local updated = rowsChanged and true or false
        callback(updated)
    end)
end


function CPX.DB.UpdateCharacterMoney(self, user, characterId, amount, callback)
    callback = callback and callback or function() return end
    if not user then callback(false,true) return end
    if not characterId or type(characterId) ~= "number" then callback(false, true) return end

    if not user:ownsCharacter(characterId) then callback(false, true) return end

    local hexId = user:getVar("hexid")
    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[UPDATE characters SET cash = @cash WHERE owner = @hexid AND id = @characterId;]]
    local v = {
        ["cash"] = amount,
        ["hexid"] = hexId,
        ["characterId"] = characterId
    }
    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then callback(false, true) return end
        local updated = rowsChanged and true or false
        callback(updated)
    end)
end

function CPX.DB.UpdateCharacterBank(self, user, characterId, amount, callback)
    callback = callback and callback or function() return end
    if not user then callback(false,true) return end
    if not characterId or type(characterId) ~= "number" then callback(false, true) return end

    if not user:ownsCharacter(characterId) then callback(false, true) return end

    local success, id = exports["ev-financials"]:getDefaultBankAccount(characterId, false, false)
    if not success then return false end
    print("ev-base | Bank Id:", id)
    if not id or id == "" then callback(false, true) return end

    local q = [[UPDATE _account SET account_balance = @account_balance WHERE id = @id;]]
    local v = {
        ["account_balance"] = amount,
        ["id"] = id
    }
    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then callback(false, true) return end
        local updated = rowsChanged and true or false
        callback(updated)
    end)
end

function CPX.DB.UpdateControls(self, src, controlsTable, callback)
    callback = callback and callback or function() return end
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then callback(false,true) return end

    local hexId = user:getVar("hexid")
    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[UPDATE users SET controls = @controls WHERE hex_id = @hexid;]]
    local v = {
        ["controls"] = json.encode(controlsTable),
        ["hexid"] = hexId
    }
    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then callback(false, true) return end
        local updated = rowsChanged and true or false
        callback(updated)
    end)
end


function CPX.DB.GetControls(self, src, callback)
    callback = callback and callback or function() return end
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    Citizen.Wait(3000)
    if not user then callback(false, true) return end

    local hexId = user:getVar("hexid")

    if not hexId or hexid == "" then callback(false, true) return end

    local q = [[SELECT controls FROM users WHERE hex_id = @hex_id;]]
    local v = {["hex_id"] = hexid}

    exports.oxmysql:execute(q,v, function(results)
        if not user then callback(false, true) return end
        results = results[1] and results or {}
        callback(results)
    end)
end

    
function CPX.DB.UpdateSettings(self, src, settingsTable, callback)
    callback = callback and callback or function() return end
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then callback(false,true) return end

    local hexId = user:getVar("hexid")
    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[UPDATE users SET settings = @settings WHERE hex_id = @hexid;]]
    local v = {
        ["settings"] = json.encode(settingsTable),
        ["hexid"] = hexId
    }
    exports.oxmysql:execute(q, v, function(rowsChanged)
        if not rowsChanged.changedRows then callback(false, true) return end
        local updated = rowsChanged and true or false
        callback(updated)
    end)
end


function CPX.DB.GetSettings(self, src, callback)
    callback = callback and callback or function() return end
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then callback(false, true) return end

    local hexId = user:getVar("hexid")

    if not hexId or hexid == "" then callback(false, true) return end

    local q = [[SELECT settings FROM users WHERE hex_id =@id;]]
    local v = {["id"] = hexid}

    exports.oxmysql:execute(q,v, function(results)
        if not user then callback(false, true) return end
        results = results[1] and results or {}
        callback(results)
    end)
end


-- 3.0
function CPX.DB.GetCharaterData(self, src, callback)
    callback = callback or function() return end
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)

    if not user then callback(false, true) return end

    local hexId = user:getVar("hexid")

    if not hexId or hexId == "" then callback(false, true) return end

    local q = [[
        SELECT characters.id, characters.owner, characters.first_name, characters.last_name, characters.date_created,
        characters.cash, characters.bank, characters.bankid,_character_phone_number.phone_number as 'phone_number', characters.dob, characters.story,
        characters.gender, characters.new, characters.jail_time, characters.dirty_money, characters.gang_type, 
        characters.jail_time_mobster, characters.judge_type, characters.stress_level, characters.jail_life, characters.cacasino_chip_countsino, characters.overwrites,
        characters.rehab FROM characters
        LEFT JOIN _character_phone_number ON characters.id = _chharacter_phone_number.cid AND is_burner = false
        WHERE owner = @id AND deleted = 0 LIMIT 8;
    ]]

    local v = {["id"] = hexId}
    exports.oxmysql:execute(q, v, function(results)
    if not results then callback(false, true) return end
        results = results[1] and results or {}
        for i,v in ipairs(results) do
            v.RealJailTime = (v.jail_time - os.time()) / 60
            -- there is more but mussing for now ((sway))
        end
    end)
end
