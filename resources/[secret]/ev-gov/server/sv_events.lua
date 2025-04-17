--[[
    Ballot
]]

RPC.register("GetBallotsHistory", function(pSource)
    return getBallotsHistory()
end)

RPC.register("CreateBallot", function(pSource, pName, pDescription, pMulti, pStartDate, pEndDate)
    return createBallot(pName.param, pDescription.param, pMulti.param, pStartDate.param, pEndDate.param)
end)

RPC.register("EditBallot", function(pSource, pId, pName, pDescription, pMulti, pStartDate, pEndDate)
    return editBallot(pId.param, pName.param, pDescription.param, pMulti.param, pStartDate.param, pEndDate.param)
end)

RPC.register("DeleteBallot", function(pSource, pId)
    return deleteBallot(pId.param)
end)

RPC.register("CreateBallotOption", function(pSource, pBallotId, pName, pDescription, pIcon, pParty)
    return createBallotOption(pBallotId.param, pName.param, pDescription.param, pIcon.param, pParty.param)
end)

RPC.register("DeleteBallotOption", function(pSource, pId)
    return deleteBallotOption(pId.param)
end)

RPC.register("GetBallots", function(pSource)
    return getBallots()
end)

RPC.register("SubmitBallotResult", function(pSource, pChoices)
    return submitBallotResult(pChoices.param)
end)

RPC.register("GetElectionsData", function(pSource)
    return getElectionsData()
end)

--[[
    State Management
]]

RPC.register("GetActiveLicenses", function(pSource, pCharacterId)
    return getActiveLicenses(pCharacterId.param)
end)

RPC.register("GetAllLicenses", function(pSource)
    return getAllLicenses()
end)

RPC.register("GetLicenses", function(pSource, pCharacterId)
    return getLicenses(pCharacterId.param)
end)

RPC.register("GetStateAccess", function(pSource)
    return getStateAccess(pSource)
end)

RPC.register("GetCharacterDetails", function(pSource, pData)
    return getCharacterDetails(pData.param)
end)

RPC.register("CheckLicenseForCharacter", function(pSource, pCid, pLicense)
    return checkLicenseForCharacter(pCid.param, pLicense.param)
end)

CPX.Procedures.register("CheckLicenseForCharacter", function(pSource, pCid, pLicense)
    return checkLicenseForCharacter(pCid, pLicense)
end)

RPC.register("RevokeLicense", function(pSource, pLicense, pTargetId, pCharacterId)
    return revokeLicense(pLicense.param, pTargetId.param, pCharacterId.param)
end)

RPC.register("GrantLicense", function(pSource, pTargetId, pLicense, pCharacterId)
    return grantLicense(pTargetId.param, pLicense.param, pCharacterId.param)
end)

RegisterCommand("thestate", function(src, args, raw)
    local access = getStateAccess(src)
    if not access then return end
    TriggerClientEvent("ev-ui:open-application", src, 'san-andreas-state')
end)

--[[
    Townhall
]]

RPC.register("ev-gov:getDOJData", function(pSource)
    return getDOJData()
end)

RPC.register("ev-gov:dojApp:setStatus", function(pSource, pJob, pStatus)
    return setDOJStatus(pSource, pJob.param, pStatus.param)
end)