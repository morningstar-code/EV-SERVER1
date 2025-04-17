local deletedObjects = {}

RPC.register("ev-usableprops:payParkingMeter", function(src, pPrice)
    local user = exports["ev-base"]:getModule("Player"):GetUser(source)
    local cash = user:getCash() 

    if cash >= pPrice then
        user:removeMoney(pPrice)
        return true
    end

    return false
end)

RPC.register("ev-usableprops:placeClock", function(src, pCoords, pRotation, pObjCoords)

end)

RPC.register("ev-usableprops:checkCryptoMiner", function(src, info, itemSlot)

end)

RPC.register("ev-usableprops:placeLetterbox'", function(src, pModel, pPos, pRotation, pType, pInfo, pName)
    print("pModel", pModel)
    print("pPos", pPos)
    print("pRotation", pRotation)
    print("pType", pType)
    print(json.encode(pInfo))
    print("pName", pName)

end)

RegisterNetEvent("ev-usableprops:deleteLocalEntity")
AddEventHandler("ev-usableprops:deleteLocalEntity", function(pModel, pCoords)
    TriggerClientEvent("ev-usableprops:deleteEntity", -1 , pModel, pCoords)
end)