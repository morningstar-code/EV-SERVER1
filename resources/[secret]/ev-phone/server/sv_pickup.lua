Citizen.CreateThread(function()
    Await(SQL.execute("DELETE FROM _pickup"))
end)

local itemsMappedToInfo = {
    ["racingusb2"] = { infoType = "characterId" }
}

function getMetaDataForItem(pCharacterId, pItemId)
    local itemInfo = itemsMappedToInfo[pItemId]
    if not itemInfo then return {} end

    local returnInfo = {}

    returnInfo._hideKeys = {}

    if itemInfo.infoType == "characterId" then
        returnInfo.characterId = pCharacterId
        table.insert(returnInfo._hideKeys, "characterId")
    end

    return returnInfo
end

function pickupPurchasedItems(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return end

    local purchasedItems = Await(SQL.execute("SELECT * FROM _pickup WHERE character_id = ?", { user.character.id }))
    if not purchasedItems or #purchasedItems == 0 then return end

    for _, item in pairs(purchasedItems) do
        local usedItemMetadata = getMetaDataForItem(user.character.id, item.item_id)
        TriggerClientEvent("player:receiveItem", pSource, item.item_id, 1, false, usedItemMetadata)
    end

    local delete = Await(SQL.execute("DELETE FROM _pickup WHERE character_id = ?", { user.character.id }))

    return true
end

function addPickupItem(pSource, pItem, pWalletId, pAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, false end

    local success, myWallet = getCryptoWalletById(pWalletId)
    if not success then return false, false end

    local cryptoBalance = myWallet.crypto_amount

    if tonumber(pAmount) >= tonumber(cryptoBalance) then return false, false end

    local removedSuccess, removedMessage = removeCryptoByWalletId(pWalletId, pAmount)
    if not removedSuccess then return false, false end

    local insert = Await(SQL.execute("INSERT INTO _pickup (character_id, item_id) VALUES (?, ?)", {
        user.character.id,
        pItem
    }))
    if not insert then return false, false end

    return true, false
end