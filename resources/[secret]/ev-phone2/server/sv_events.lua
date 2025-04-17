RPC.register("ev-ui:abdultaxi:fetchDrivers", function(pSource)
    return fetchAbdulDrivers()
end)

RPC.register("ev-ui:abdultaxi:addCharOnDuty", function(pSource)
    return abdulAddCharOnDuty(pSource)
end)

RPC.register("ev-ui:abdultaxi:removeCharFromDuty", function(pSource)
    return abdulRemoveCharFromDuty(pSource)
end)

RPC.register("ev-ui:abdultaxi:updateDriverStatus", function(pSource, pStatus)
    return abdulUpdateDriverStatus(pSource, pStatus)
end)

RPC.register("ev-ui:nlts:fetchDrivers", function(pSource)
    return fetchNltsDrivers()
end)

RPC.register("ev-ui:nlts:addCharOnDuty", function(pSource)
    return nltsAddCharOnDuty(pSource)
end)

RPC.register("ev-ui:nlts:removeCharFromDuty", function(pSource)
    return nltsRemoveCharFromDuty(pSource)
end)

RPC.register("ev-ui:nlts:updateDriverStatus", function(pSource, pStatus)
    return nltsUpdateDriverStatus(pSource, pStatus)
end)

RPC.register("burner:callStart", function(pSource, pCaller, pTarget)

end)

RPC.register("phone:callStart", function(pSource, pCallNumber, pTargetNumber, pType, pName)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return end

    return startPhoneCall(pSource, user.character.id, pCallNumber, pTargetNumber, pType, pName)
end)

RPC.register("phone:callAccept", function(pSource, pCallId)
    return acceptPhoneCall(pCallId)
end)

RPC.register("phone:callEnd", function(pSource, pCallId)
    return endPhoneCall(pCallId)
end)

RPC.register("phone:getServerIdByPhoneNumber", function(pSource, pNumber)
    return getServerIdByPhoneNumber(pNumber)
end)

RPC.register("phone:vehicle:coords", function(pSource, pPlate, pCoords)
    return vehicleCoords(pPlate, pCoords)
end)

RPC.register("phone:getContacts", function(pSource, pCharacterId)
    return getContacts(pCharacterId)
end)

RPC.register("phone:addContact", function(pSource, pCharacterId, pName, pNumber)
    return addContact(pCharacterId, pName, pNumber)
end)

RPC.register("phone:deleteContact", function(pSource, pContactId)
    return deleteContact(pContactId)
end)

RPC.register("phone:sendMessage", function(pSource, pSourceNumber, pTargetNumber, pMessage)
    return sendMessage(pSourceNumber, pTargetNumber, pMessage)
end)

RPC.register("phone:getMessages", function(pSource, pSourceNumber, pTargetNumber)
    return getMessages(pSourceNumber, pTargetNumber)
end)

RPC.register("phone:getConversations", function(pSource, pNumber)
    return getConversations(pNumber)
end)

RPC.register("phone:readPlayerconversations", function(pSource, pServerId)
    return readPlayerConversations(pServerId)
end)

RPC.register("phone:getCrypto", function(pSource, pCharacterId)
    return getCrypto(pCharacterId)
end)

RPC.register("phone:transferCryptoByPhone", function(pSource, pCharacterId, pTargetNumber, pCryptoId, pAmount)
    return transferCryptoByPhone(pCharacterId, pTargetNumber, pCryptoId, pAmount)
end)

RPC.register("phone:useCrypto", function(pSource, pCryptoId, pAmount)
    return useCrypto(pCryptoId, pAmount)
end)

RPC.register("phone:addCrypto", function(pSource, pCryptoId, pAmount)
    return addCrypto(pSource, pCryptoId, pAmount)
end)

RPC.register("phone:purchaseCryptoByPhone", function(pSource, pCharacterId, pBankId, pCryptoId, pAmount)
    return purchaseCryptoByPhone(pCharacterId, pBankId, pCryptoId, pAmount)
end)

RPC.register("phone:sellCryptoByPhone", function(pCharacterId, pBankId, pCryptoId, pAmount)
    return sellCryptoByPhone(pCharacterId, pCryptoId, pAmount)
end)

RPC.register("phone:pickupPurchasedItems", function(pSource)
    return pickupPurchasedItems(pSource)
end)

RPC.register("phone:addPickupItem", function(pSource, pItem, pWalletId, pAmount)
    return addPickupItem(pSource, pItem, pWalletId, pAmount)
end)

RPC.register("phone:droppedDocumentDestroy", function(pSource, pNoteId)
    return droppedDocumentDestroy(pNoteId)
end)

RPC.register("phone:getDocuments", function(pSource, pCharacterId, pDocumentTypeId)
    return getDocuments(pCharacterId, pDocumentTypeId)
end)

RPC.register("phone:getLicenseContent", function(pSource, pDocumentId)
    return getLicenseContent(pDocumentId)
end)

RPC.register("phone:getDocumentContent", function(pSource, pDocumentId)
    return getDocumentContent(pDocumentId)
end)

RPC.register("phone:getDocumentTypes", function(pSource)
    return getDocumentTypes()
end)

RPC.register("phone:editDocument", function(pSource, pDocumentId, pDocumentContent, pDocumentTitle)
    return editDocument(pDocumentId, pDocumentContent, pDocumentTitle)
end)

RPC.register("phone:createDocument", function(pSource, pCharacterId, pDocumentContent, pDocumentTitle, pDocumentTypeId)
    return createDocument(pCharacterId, pDocumentContent, pDocumentTitle, pDocumentTypeId)
end)

RPC.register("phone:deleteDocument", function(pSource, pDocumentId, pCharacterId)
    return deleteDocument(pDocumentId, pCharacterId)
end)

RPC.register("phone:finalizeDocument", function(pSource, pDocumentId)
    return finalizeDocument(pDocumentId)
end)

RPC.register("phone:dropDocument", function(pSource, pData, pLocation)
    return dropDocument(pData, pLocation)
end)

RPC.register("phone:documentUnlock", function(pSource, pData)
    return documentUnlock(pData.document, pData.unlock)
end)

RPC.register("phone:getDocumentSignatures", function(pSource, pDocumentId)
    return getDocumentSignatures(pDocumentId)
end)

RPC.register("phone:signDocument", function(pSource, pData)
    return signDocument(pData)
end)

RPC.register("phone:requestDocumentSignature", function(pSource, pData)
    return requestDocumentSignature(pData)
end)

RPC.register("phone:shareDocumentLocal", function(pSource, pDocumentId, pDocumentTypeId)
    return shareDocumentLocal(pSource, pDocumentId, pDocumentTypeId)
end)

RPC.register("phone:shareDocumentPermanent", function(pSource, pData)
    return shareDocumentPermanent(pData)
end)

RPC.register("phone:addEmailContact", function(pSource, pData)
    return addEmailContact(pSource, pData, pData)
end)

RPC.register("phone:deleteEmailContact", function(pSource, pContact)
    return deleteEmailContact(pSource, pContact)
end)

RPC.register("phone:getEmailContacts", function(pSource)
    return getEmailContacts(pSource)
end)

RPC.register("phone:getEmails", function(pSource, pData)
    return getEmails(pSource, pData.category)
end)

RPC.register("phone:getEmailContent", function(pSource, pData)
    return getEmailContent(pData.email.id)
end)

RPC.register("phone:createEmail", function(pSource, pData)
    return createEmail(pData.email)
end)

RPC.register("phone:sendEmail", function(pSource, pData)
    return sendEmail(pData.email)
end)

RPC.register("phone:updateEmail", function(pSource, pData)
    return updateEmail(pData.email)
end)

RPC.register("phone:discardDraft", function(pSource, pData)
    return discardDraft(pData.email)
end)

RPC.register("phone:deleteEmail", function(pSource, pData)
    return deleteEmail(pData.email)
end)

RPC.register("phone:li:getRandomAdURL", function(pSource)
    return getRandomAdURL()
end)

RPC.register("phone:li:getAdListings", function(pSource)
    return getAdListings()
end)

RPC.register("phone:li:createAdListing", function(pSource, pData)
    return createAdListing(pData.url, pData.duration)
end)

RPC.register("phone:li:removeAdListing", function(pSource, pId)
    return removeAdListing(pId)
end)

RPC.register("phone:li:sendSystemMail", function(pSource, pTitle, pBody)
    return sendSystemMail(pTitle, pBody)
end)

RPC.register("ev-phone:setEmailAddress", function(pSource, pEmail, pFromUpdate)
    return setEmailAddress(pSource, pEmail, pFromUpdate)
end)

RPC.register("ev-phone:getEmailAddress", function(pSource)
    return getEmailAddress(pSource)
end)

RPC.register("phone:getArticles", function(pSource, pArticleTypeId)
    return getArticles(pArticleTypeId)
end)

RPC.register("phone:getMusicCharts", function(pSource)
    return getMusicCharts()
end)

RPC.register("phone:getArticleContent", function(pSource, pArticleId)
    return getArticleContent(pArticleId)
end)

RPC.register("phone:editArticle", function(pSource, pArticleId, pArticleContent, pArticleTitle, pArticleImages)
    return editArticle(pArticleId, pArticleContent, pArticleTitle, pArticleImages)
end)

RPC.register("phone:createArticle", function(pSource, pCharacterId, pArticleContent, pArticleTitle, pArticleTypeId, pArticleImages)
    return createArticle(pCharacterId, pArticleContent, pArticleTitle, pArticleTypeId, pArticleImages)
end)

RPC.register("phone:deleteArticle", function(pSource, pArticleId, pCharacterId)
    return deleteArticle(pArticleId, pCharacterId)
end)

RPC.register("phone:updateArticleState", function(pSource, pArticleId, pState)
    return updateArticleState(pArticleId, pState)
end)

RPC.register("phone:articleUnlock", function(pSource, pData)
    return articleUnlock(pData.article, pData.unlock)
end)

RPC.register("phone:addTwatterEntry", function(pSource, pCharacterId, pFirstName, pLastName, pText)
    return addTwatterEntry(pCharacterId, pFirstName, pLastName, pText)
end)

RPC.register("phone:getTwatterEntries", function(pSource)
    return getTwatterEntries()
end)

RPC.register("ev-phone:getBlockedUsers", function(pSource)
    return getBlockedUsers(pSource)
end)

RPC.register("ev-phone:blockTwatterUser", function(pSource, pCid)
    return blockTwatterUser(pSource, pCid)
end)

RPC.register("ev-phone:unblockTwatterUser", function(pSource, pCharacterId)
    return unblockTwatterUser(pSource, pCharacterId)
end)

RPC.register("ev-phone:purchaseBlue", function(pSource)
    return purchaseBlue(pSource)
end)

RPC.register("ev-phone:cancelBlue", function(pSource)
    return cancelBlue(pSource)
end)

RPC.register("ev-phone:getTwatterBlue", function(pSource)
    return getTwatterBlue(pSource)
end)

RPC.register("phone:getYellowPageEntries", function(pSource)
    return getYellowPageEntries()
end)

RPC.register("phone:addYellowPageEntry", function(pSource, pCharacterId, pFirstName, pLastName, pNumber, pText)
    return addYellowPageEntry(pCharacterId, pFirstName, pLastName, pNumber, pText)
end)

RPC.register("phone:removeYellowPageEntry", function(pSource, pCharacterId)
    return removeYellowPageEntry(pCharacterId)
end)

RPC.register("v:vehicles:getVehicleIds", function(pSource, pCharacterId)
    return getVehicleIds(pCharacterId)
end)

RPC.register("v:vehicles:getRegistrationDocument", function(pSource, pDocumentId)
    return getRegistrationDocument(pDocumentId)
end)

RPC.register("v:vehicles:getPlayerVehiclesWithCoordinates", function(pSource, pCharacterId)
    return getPlayerVehiclesWithCoordinates(pCharacterId)
end)

RPC.register("ev-phone:xcoin:canRedeem", function(pSource, pCharacterId)

end)

RegisterNetEvent("ev-phone:setIdentifiers")
AddEventHandler("ev-phone:setIdentifiers", function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then return end

    local hexid = user:getVar("hexid")
    local license = user:getVar("license")

    return TriggerClientEvent("ev-phone:setIdentifiersClient", src, {
        steamhex = hexid,
        license = license
    })
end)

RegisterNetEvent("ev-phone:showEmailAddress")
AddEventHandler("ev-phone:showEmailAddress", function()
end)

RegisterNetEvent("phone:li:sentEmail")
AddEventHandler("phone:li:sentEmail", function(pData)
end)