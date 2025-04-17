RegisterNetEvent("ev-login:switchCharacter")
AddEventHandler("ev-login:switchCharacter", function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    local num, pType = exports["ev-apartments"]:GetApartInfo(src, cid)
    
    TriggerClientEvent("ev-death:reset", src) -- check later
    TriggerClientEvent("ev-police:resetCuffs", src)
    TriggerClientEvent("ev-police:resetEscort", src) -- check later
    TriggerClientEvent("ev-housing:reset", src) -- check later
    TriggerClientEvent("ev-evidence:reset", src)
    TriggerClientEvent("ev-jail:reset", src)

    TriggerClientEvent("apartment:removeFromBuilding", -1, num, pType)

    TriggerClientEvent("insideShell", src, false)
    --exports["ev-infinity"]:setWorld(src, "default") --No longer needed
end)