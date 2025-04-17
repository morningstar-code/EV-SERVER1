CPX.Core.hasLoaded = false


function CPX.Core.Initialize(self)
    Citizen.CreateThread(function()
        while true do
            if NetworkIsSessionStarted() then
                TriggerEvent("ev-base:playerSessionStarted")
                TriggerServerEvent("ev-base:playerSessionStarted")
                break
            end
        end
    end)
end
CPX.Core:Initialize()

AddEventHandler("ev-base:playerSessionStarted", function()
    while not CPX.Core.hasLoaded do
        --print("waiting in loop")
        Wait(100)
    end
    ShutdownLoadingScreen()
    CPX.SpawnManager:Initialize()
end)

RegisterNetEvent("ev-base:waitForExports")
AddEventHandler("ev-base:waitForExports", function()
    if not CPX.Core.ExportsReady then return end

    while true do
        Citizen.Wait(0)
        if exports and exports["ev-base"] then
            TriggerEvent("ev-base:exportsReady")
            return
        end
    end
end)

RegisterNetEvent("customNotification")
AddEventHandler("customNotification", function(msg, length, type)

	TriggerEvent("chatMessage","SYSTEM",4,msg)
end)

RegisterNetEvent("base:disableLoading")
AddEventHandler("base:disableLoading", function()
    print("player has spawned ")
    if not CPX.Core.hasLoaded then
        CPX.Core.hasLoaded = true
    end
end)

Citizen.CreateThread( function()
    TriggerEvent("base:disableLoading")
end)