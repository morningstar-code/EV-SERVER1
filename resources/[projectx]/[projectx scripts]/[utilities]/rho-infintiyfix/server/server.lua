
RegisterNetEvent("ev-infinityfix:fixchar")
AddEventHandler("ev-infinityfix:fixchar", function(source)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    local num, pType = exports["ev-apartments"]:GetApartInfo(src, cid)

    --TriggerClientEvent("DoLongHudText", src, "Setting your character's world data", 2)
    exports["ev-infinity"]:setWorld(src, "2")

    Citizen.Wait(3000)
    exports["ev-infinity"]:setWorld(src, "default")

    TriggerClientEvent("DoLongHudText", src, "Loading complete", 1)

end)

RegisterCommand("fixchar", function(source, args, rawCommand)
    TriggerEvent("ev-infinityfix:fixchar", source)
end, false)


