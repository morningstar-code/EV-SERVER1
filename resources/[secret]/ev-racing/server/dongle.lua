RPC.register("ev-racing:setAlias", function(pSource, pUsedItemId, pUsedItemSlot, pUsedItemMetaData, pAlias)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false end

    local aliasExists = Await(SQL.execute("SELECT * FROM _race_alias WHERE alias = @alias", {
        alias = pAlias
    }))

    if not aliasExists then return false end
    if #aliasExists > 0 then return false, "Alias already taken!" end

    local name = "ply-" .. user.character.id
    local usedItemId = pUsedItemId
    local usedItemSlot = pUsedItemSlot
    local usedItemMetadata = pUsedItemMetaData
    local alias = pAlias

    usedItemMetadata.Alias = alias

    local result = Await(SQL.execute("UPDATE inventory SET information = @information WHERE item_id = @item_id AND name = @name AND slot = @slot", {
        information = json.encode(usedItemMetadata),
        item_id = usedItemId,
        name = name,
        slot = usedItemSlot
    }))

    if not result then return false end

    local insertAlias = Await(SQL.execute("INSERT INTO _race_alias (alias) VALUES (@alias)", {
        alias  = alias
    }))

    if not insertAlias then return false end

    return true
end)

RegisterCommand("givemedong", function(src, args, raw)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then return end

    local usedItemMetadata = {characterId = user.character.id, _hideKeys = {"characterId"}}

    TriggerClientEvent("player:receiveItem", src, "racingusb2", 1, false, usedItemMetadata)
end)

RegisterCommand("givemedongcreate", function(src, args, raw)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then return end

    local usedItemMetadata = {characterId = user.character.id, _hideKeys = {"characterId"}}

    TriggerClientEvent("player:receiveItem", src, "racingusb0", 1, false, usedItemMetadata)
end)