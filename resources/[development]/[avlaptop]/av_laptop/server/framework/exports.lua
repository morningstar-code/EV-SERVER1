-- Get Player ID by identifier
function getSourceByIdentifier(identifier)
    local Target = exports["ev-base"]:getModule("Player"):GetUser(identifier) 
    if Target then
        return Target
    end
    return false
end

function getPlayerByIdentifier(identifier)
    local Target = exports["ev-base"]:getModule("Player"):GetUser(identifier) 
    if Target then
        return Target
    end
    return false
end

-- Get Player Permission Level
function getPermission(src, level)
    return exports["ev-admin"]:getRank("dev");
end

-- Get Player Identifier
function getIdentifier(src)
    --local src = source
    print("source ID:" .. src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    print(cid)
    if cid then 
        return cid
    end
    return false
end

-- Get Player Object
function getPlayer(src)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    return cid
end

-- Add Item to player
function addItem(src,item,amount,info) 
    TriggerClientEvent('player:receiveItem', src, item, amount)
    return false
end

-- Remove Item from Player
function removeItem(src, item, amount, slot) 
    local amount = amount or 1
    TriggerClientEvent('inventory:removeItem', src, item, amount)
end

-- Get Player money
function getMoney(src, account)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local bank = exports["cool-financials"]:getAccountBalance(accountId)
    --return exports["ev-phone"]:getCryptoBalance(cid, "1") 
    if Config.UsingMetadataCrypto and Config.MetadataCryptos[account] then
        return exports["ev-phone"]:getCryptoBalance(cid, "1")
    else
        return bank 
    end
end 

-- Add Money
function addMoney(src, account, amount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id
    exports["ev-phone"]:addCrypto(src, cid, amount, 1) 
end

-- Add Money to Offline Player
function addMoneyOffline(identifier, account, amount)
   --[[  if Config.Framework == "QBCore" then
        local result = MySQL.query.await('SELECT * FROM players WHERE citizenid = ?', {identifier})
        if result and result[1] then
            local RecieverMoney = json.decode(result[1].money)
            RecieverMoney[account] = (RecieverMoney[account] + amount)
            MySQL.update.await('UPDATE players SET money = ? WHERE citizenid = ?', {json.encode(RecieverMoney), identifier})
        end
    elseif Config.Framework == "ESX" then
        local result = MySQL.query.await('SELECT * FROM users WHERE identifier = ?', {identifier})
        if result and result[1] then
            local RecieverMoney = json.decode(result[1].accounts)
            RecieverMoney[account] = (RecieverMoney[account] + amount)
            MySQL.update.await('UPDATE users SET accounts = ? WHERE identifier = ?', {json.encode(RecieverMoney), identifier})
        end
    end ]]
end

-- Remove money from player
function removeMoney(src, account, amount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local cid = user:getCurrentCharacter().id
    exports["ev-phone"]:takeCrypto(src, cid, amount, 1)   
end

-- Has item? This doesnt seem to be working...
function hasItem(src,name,amount)
    local qty = 1
    if tonumber(amount) then 
        qty = tonumber(amount)
    end
    
    local hasItem = exports["ev-inventory"]:hasEnoughOfItem(name, qty, false, true)
    if hasItem then 
        return true
    end
    return false
end



-- Get Player Job
function getJob(src)
    --May not be correct
    print("Need to get job to see if you a cop bruh")
    return "police"
end

-- Get Player Name
function getName(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    return char.first_name..' '..char.last_name
end

function getMetadata(item,info)
    if item and item.info then
        return item.info, item.slot
    end
    if info and info.metadata then
        return info.metadata, info.slot
    end
end

function getInventoryItem(source,name)
    --Fuck knows mayu not need this
    --[[ if Config.Framework == "QBCore" then
        if Config.Inventory == "ox_inventory" then
            return exports.ox_inventory:GetInventoryItems(source)
        else
            return exports[Config.Inventory]:GetItemsByName(source,name)
        end
    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(source)
        return xPlayer.getInventory()
    end ]]
end

-- Get all players from X job
function getJobPlayers(job)
    --For resturants we dont need it.
end

function setJob(target,job)
    --We dont need this
end

function setJobGrade(identifier,job,grade)
    --Dont need it
end

function Discord(webhook, message)
    PerformHttpRequest(webhook, function() end, 'POST', json.encode({ username = 'AV Scripts', embeds = message}), { ['Content-Type'] = 'application/json' })
end

function getPhone(source)
    --Dont need it?
    print("Tried to get persons mobile number")
end

-- Export List
exports('getSourceByIdentifier', getSourceByIdentifier)
exports('getPlayerByIdentifier', getPlayerByIdentifier)
exports('getPermission', getPermission)
exports('getIdentifier', getIdentifier)
exports('getPlayer', getPlayer)
exports('addItem', addItem)
exports('removeItem', removeItem)
exports('getMoney', getMoney)
exports('addMoney', addMoney)
exports('addMoneyOffline', addMoneyOffline)
exports('removeMoney', removeMoney)
exports('hasItem', hasItem)
exports('getJob', getJob)
exports('getName', getName)
exports('getMetadata', getMetadata)
exports('getItem', getItem)
exports('getInventoryItem', getInventoryItem)
exports('getJobPlayers', getJobPlayers)
exports('setJob', setJob)
exports('setJobGrade', setJobGrade)
exports('Discord', Discord)
exports('getPhone', getPhone)