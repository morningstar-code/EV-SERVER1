RPC.register("ev-cbc:doElevatorAction", function(pSource, pData)
    return doElevatorAction(pSource, pData)
end)

RPC.register("ev-cbc:addBusinessToCenter", function(pSource, pData)
    return addBusinessToCenter(pSource, pData.business_id, pData.office_type)
end)

RPC.register("ev-cbc:deleteBusinessFromCenter", function(pSource, pCbcId)
    return deleteBusinessFromCenter(pSource, pCbcId)
end)

RPC.register("ev-cbc:getCreatedOffices", function(pSource)
    return getCreatedOffices()
end)

RPC.register("ev-cbc:actionOffice", function(pSource, pAction, pOffice, pCid, pIsGov)
    return actionOffice(pSource, pAction, pOffice, pCid, pIsGov)
end)