itemList = {}

-- Citizen.CreateThread(function()
--     TriggerEvent("inv:playerSpawned");
-- end)
RegisterServerEvent('people-search')
AddEventHandler('people-search', function(target)
    local source = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(target)
    local characterId = user:getVar("character").id
	TriggerClientEvent("server-inventory-open", source, "1", 'ply-'.. characterId)
end)

RegisterServerEvent('Stealtheybread')
AddEventHandler('Stealtheybread', function(target)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local targetply = exports["ev-base"]:getModule("Player"):GetUser(tonubmer(target))
    local TargetCash = targetply:getCash()
    user:addMoney(TargetCash)
    targetply:removeMoney(TargetCash)
end)

RegisterNetEvent('ev-weapons:getAmmo')
AddEventHandler('ev-weapons:getAmmo', function()
    local ammoTable = {}
    local src = source
	local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local char = user:getCurrentCharacter()
    exports.oxmysql:execute("SELECT type, ammo FROM characters_weapons WHERE id = @id", {['id'] = char.id}, function(result)
        for i = 1, #result do
            if ammoTable["" .. result[i].type .. ""] == nil then
                ammoTable["" .. result[i].type .. ""] = {}
                ammoTable["" .. result[i].type .. ""]["ammo"] = result[i].ammo
                ammoTable["" .. result[i].type .. ""]["type"] = ""..result[i].type..""
            end
        end
        TriggerClientEvent('ev-items:SetAmmo', src, ammoTable)
    end)
end)

RegisterServerEvent('cash:remove')
AddEventHandler('cash:remove', function(pSrc, amount)
	local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	if (tonumber(user:getCash()) >= amount) then
		user:removeMoney(amount)
	end
end)

RegisterNetEvent('ev-weapons:updateAmmo')
AddEventHandler('ev-weapons:updateAmmo', function(newammo,ammoType,ammoTable)
    local src = source
	local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local char = user:getCurrentCharacter()
    exports.oxmysql:execute('SELECT ammo FROM characters_weapons WHERE type = @type AND id = @identifier',{['@type'] = ammoType, ['@identifier'] = char.id}, function(result)
        if result[1] == nil then
            exports.oxmysql:execute('INSERT INTO characters_weapons (id, type, ammo) VALUES (@identifier, @type, @ammo)', {
                ['@identifier'] = char.id,
                ['@type'] = ammoType,
                ['@ammo'] = newammo
            }, function()
            end)
        else
            exports.oxmysql:execute('UPDATE characters_weapons SET ammo = @newammo WHERE type = @type AND ammo = @ammo AND id = @identifier', {
                ['@identifier'] = char.id,
                ['@type'] = ammoType,
                ['@ammo'] = result[1].ammo,
                ['@newammo'] = newammo
            }, function()
            end)
        end
    end)
end)

RegisterServerEvent("ev-inventory:update:settings")
AddEventHandler("ev-inventory:update:settings", function(data)
    local src = source
    local user = GetPlayerIdentifiers(src)[1]
    local insert = {
        ["holdToDrag"] = data.holdToDrag,
        ["closeOnClick"] = data.closeOnClick,
        ["ctrlMovesHalf"] = data.ctrlMovesHalf,
        ["showTooltips"] = data.showTooltips,
        ["enableBlur"] = data.enableBlur
    }
    local encode = json.encode(insert)
    exports.oxmysql:execute('UPDATE users SET inventory_settings = ? WHERE hex_id = ?', {encode, user})
end)

RPC.register("ev-inventory:getItemInformation", function(src, pInv, pSlot)
    print("RPC | getItemInformation")
    print("pInv", pInv)
    print("pSlot", pSlot)
end)

RegisterServerEvent("ev-inventory:RetreiveSettings")
AddEventHandler("ev-inventory:RetreiveSettings", function()
    local src = source
    local user = GetPlayerIdentifiers(src)[1]
    exports.oxmysql:execute("SELECT `inventory_settings` FROM users WHERE hex_id = @hex_id", {['hex_id'] = user}, function(result)
        if (result[1]) then
            TriggerClientEvent('ev-base:update:settings', src, result[1].inventory_settings)
        end
    end)
end)

function getItem(pClass, pInfo)
    local infoReturn = nil

    if itemList[pClass] then
        if pInfo then
            if itemList[pClass][pInfo] then
                infoReturn = itemList[pClass][pInfo]
            end
        else
            infoReturn = itemList[pClass]
        end
    end

    return infoReturn
end

function getInventory(pInventory)
    local inventory = MySQL.query.await([[
        SELECT count(item_id) as amount, id, name, item_id, information, slot, dropped, creationDate
        FROM inventory
        WHERE name = ?
        GROUP BY slot
    ]],
    { pInventory })

    return inventory
end

function K9Sniff(pId)
    local inventory = getInventory("ply-" .. pId)

    for i, v in ipairs(inventory) do
        if itemList[v.item_id].contraband then
            return true
        end
    end

    return false
end

function K9SniffVehicle(pId)
    local inventoryGlovebox = getInventory("Glovebox-" .. pId)
    local inventoryTrunk = getInventory("Trunk-" .. pId)

    for i, v in ipairs(inventoryGlovebox) do
        if itemList[v.item_id].contraband then
            return true
        end
    end

    for i, v in ipairs(inventoryTrunk) do
        if itemList[v.item_id].contraband then
            return true
        end
    end

    return false
end

function getQuantitySv(src, itemid, checkQuality, metaInformation)
	local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local inventory = getInventory("ply-" .. cid)

    local amount = 0
    for i,v in pairs(inventory) do
        local qCheck = not checkQuality or v.quality > 0
        if v.item_id == itemid and qCheck then
            if metaInformation then
                local totalMetaKeys = 0
                local metaFoundCount = 0
                local itemMeta = json.decode(v.information)
                for metaKey, metaValue in pairs(metaInformation) do
                    totalMetaKeys = totalMetaKeys + 1
                    if itemMeta[metaKey] and itemMeta[metaKey] == metaValue then
                        metaFoundCount = metaFoundCount + 1
                    end
                end
                if totalMetaKeys <= metaFoundCount then
                    amount = amount + v.amount
                end
            else
                amount = amount + v.amount
            end
        end
    end
    return amount
end

function getQuantitySvP(src, inv, itemid, checkQuality, metaInformation)
	local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local inventory = getInventory("ply-" .. cid)

    local amount = 0
    for i,v in pairs(inventory) do
        local qCheck = not checkQuality or v.quality > 0
        if v.item_id == itemid and qCheck then
            if metaInformation then
                local totalMetaKeys = 0
                local metaFoundCount = 0
                local itemMeta = json.decode(v.information)
                for metaKey, metaValue in pairs(metaInformation) do
                    totalMetaKeys = totalMetaKeys + 1
                    if itemMeta[metaKey] and itemMeta[metaKey] == metaValue then
                        metaFoundCount = metaFoundCount + 1
                    end
                end
                if totalMetaKeys <= metaFoundCount then
                    amount = amount + v.amount
                end
            else
                amount = amount + v.amount
            end
        end
    end
    return amount
end


function hasEnoughOfItemSv(src, itemid, amount, checkQuality, metaInformation) 
    if itemid == nil or itemid == 0 or amount == nil or amount == 0 then
        return false
    end
    amount = tonumber(amount)
    local slot = 0
    local found = false

    if getQuantitySv(src, itemid, checkQuality, metaInformation) >= amount then
        return true
    end

    return false
end

function GetItemInfosv(src, checkslot)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local inventory = getInventory("ply-" .. cid)

    for i,v in pairs(inventory) do
        if (tonumber(v.slot) == tonumber(checkslot)) then
            local info = {["information"] = v.information,["id"] = v.id, ["quality"] = v.quality, ["item_id"] = v.item_id, ["amount"] = v.amount }
            return info
        end
    end
    return "No information stored";
end

function GetInfoForFirstItemOfName(src, item_id)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local inventory = getInventory("ply-" .. cid)

    for i,v in pairs(inventory) do
        if (v.item_id == item_id) then
            local info = {
              ["information"] = v.information,
              ["id"] = v.id,
              ["quality"] = v.quality,
              ["slot"] = v.slot,
              ["quantity"] = v.amount
            }
            return info
        end
    end
    return nil
end

function GetItemsByItemMetaKVsv(src, item_id, meta_key, meta_value)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local inventory = getInventory("ply-" .. cid)

    local items = {}
    for i, v in pairs(inventory) do
        if v.item_id == item_id then
            local info = json.decode(v.information)
            if info[meta_key] == meta_value then
                items[#items + 1] = {
                    ["information"] = v.information,
                    ["id"] = v.id,
                    ["quality"] = v.quality,
                }
            end
        end
    end
    
    return items
end

function GetItemsByItemMetaKVMultisv(src, item_id, meta_data)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local inventory = getInventory("ply-" .. cid)

    local items = {}
    for i, v in pairs(inventory) do
        if v.item_id == item_id then
            local info = json.decode(v.information)
            local shouldAdd = true
            for meta_key, meta_value in pairs(meta_data) do
                shouldAdd = shouldAdd and info[meta_key] == meta_value or false
            end
            if shouldAdd then
                items[#items + 1] = {
                    ["information"] = v.information,
                    ["id"] = v.id,
                    ["quality"] = v.quality,
                }
            end
        end
    end
    return items
end

function removeMoneyInv(src, amt)
    local user = exports["ev-base"]:getModule('Player'):GetUser(src)
    user:removeMoney(tonumber(amt))
end

exports("removeMoneyInv", removeMoneyInv)
exports("getItem", getItem)
exports("getInventory", getInventory)
exports("K9Sniff", K9Sniff)
exports("K9SniffVehicle", K9SniffVehicle)
exports("getQuantitySv", getQuantitySv)
exports("getQuantitySvP", getQuantitySvP)
exports("hasEnoughOfItemSv", hasEnoughOfItemSv)
exports("GetItemsByItemMetaKVMultisv", GetItemsByItemMetaKVMultisv)
exports("GetItemsByItemMetaKVsv", GetItemsByItemMetaKVsv)
exports("GetItemInfosv", GetItemInfosv)

AddEventHandler("ev-inventory:luaItemList", function(pItems)
    itemList = pItems
end)

RPC.register('ev-inventory:getItemInformation',function(source, pInv, pSlot) 
    local inf = exports.oxmysql:execute('SELECT * FROM inventory WHERE name = @name AND slot = @slot', {['name'] = pInv, ['slot'] = pSlot}, function(result)
        return inf
    end) 
    
end) 