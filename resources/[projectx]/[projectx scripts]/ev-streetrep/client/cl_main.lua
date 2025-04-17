local nextDrop = nil
local activeDrop = nil

RegisterNetEvent("ev-spawn:characterSpawned")
AddEventHandler("ev-spawn:characterSpawned", function (cid)
    nextDrop = nil
    local canGetDrop = RPC.execute("ev-streetrep:canGetDrop", cid)
    if canGetDrop then
        nextDrop = GetGameTimer() + math.random(3600000, 7200000)
        startThread()
    end
end)

function startThread()
    CreateThread(function ()
        while nextDrop ~= nil do
            Wait(60000)
            if nextDrop ~= nil and GetGameTimer() > nextDrop then
                nextDrop = nil
                sendMail()
            end
        end
    end)
end

function sendMail()
    local cid = exports["isPed"]:isPed("cid")
    if not cid then return end
    local canGetDrop = RPC.execute("ev-streetrep:canGetDrop", cid)
    if not canGetDrop then return end

    local dropData = RPC.execute("ev-streetrep:getDropLocation", cid)
    if not dropData then return end

    TriggerEvent("phone:emailReceived", "The boss", "Congratulations", [[
Congrats.
Because of your hard work, you have earned a little gift.
I have marked a location on your map. Go there, and get a reward.
    ]])

    local blip = AddBlipForCoord(dropData.position.x, dropData.position.y, dropData.position.z)
    SetBlipSprite(blip, 616)
    SetBlipScale(blip, 0.8)
    SetBlipColour(blip, 50)
    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("Your gift")
    EndTextCommandSetBlipName(blip)
    SetNewWaypoint(dropData.position.x, dropData.position.y)


    activeDrop = dropData
    activeDrop.blip = blip
    exports["ev-polyzone"]:AddCircleZone('streetrep_reward_' .. dropData.uuid, dropData.position, 30, {
        heading = "0",
        data = {
            id = dropData.uuid,
        }
    })
end

AddEventHandler("ev-polyzone:enter", function (name, data)
    if not activeDrop or name ~= 'streetrep_reward_' .. activeDrop.uuid then return end

    TriggerServerEvent("ev-streetrep:enter", activeDrop.uuid)
    TriggerEvent("DoLongHudText", "Go to the crate and pick up your reward.")
end)

RegisterNetEvent("ev-streetrep:cleanup")
AddEventHandler("ev-streetrep:cleanup", function ()
    RemoveBlip(activeDrop.blip)
    activeDrop = nil
end)

RegisterUICallback('ev-streetrep:ui:getProgression', function (data, cb)
    local progressionData = RPC.execute("ev-streetrep:getProgressionForLaptop")
    cb({ data = progressionData, meta = { ok = true, message = "ok" } })
end)
