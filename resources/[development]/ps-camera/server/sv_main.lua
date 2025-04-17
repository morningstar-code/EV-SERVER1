-- Add Discord webhook here.
local webhook = "https://discordapp.com/api/webhooks/1073994212363743324/tpVLpsgloXOhmD_pU51TOMu9enEXOcqPJi31MPb2DP_NondHEQVYbTJ7qTUjZpwnx2oY"

RegisterNetEvent("ps-camera:cheatDetect", function()
    DropPlayer(source, "Cheater Detected")
end)

RegisterNetEvent("ps-camera:grabHook", function(Key)
    local event = ("ps-camera:grabbed%s"):format(Key)
    TriggerClientEvent(event, source, webhook)
end)

RegisterNetEvent("ps-camera:CreatePhoto", function(url)
    local source = source
    local player = exports["ev-base"]:getModule("Player"):GetUser(source)
    if not player then return end

    local coords = GetEntityCoords(GetPlayerPed(source))

    TriggerClientEvent("ps-camera:getStreetName", source, url, coords)
end)

RegisterNetEvent("ps-camera:savePhoto", function(url, streetName)
    print("ola")
    local source = source
    local player = exports["ev-base"]:getModule("Player"):GetUser(source)
    if not player then return end

    local location = streetName

    local metaData = json.encode({
        image = json.decode(url),
        location = location
    })

    TriggerClientEvent('player:receiveItem', source, 'photo', 1, false, {}, metaData) 

end) 

function UseCam(source)
    local src = source
    local player = exports["ev-base"]:getModule("Player"):GetUser(source)
    if Player.Functions.GetItemByName('camera') then
        TriggerClientEvent("ps-camera:useCamera", src)
    else
        TriggerClientEvent('QBCore:Notify', src, "U don\'t have a camera", "error")
    end
end

exports("UseCam", UseCam)