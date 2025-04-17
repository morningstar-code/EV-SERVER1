local IsHacking = false

RegisterNUICallback('callback', function(data, cb)
    closeHack()
    Callbackk(data.success)
    cb('ok')
end)

function OpenHackingGame(callback, pAmount, pShapes, pTime)
    Callbackk = callback
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "open",
        rounds = pAmount,
        shapes = pShapes,
        duration = pTime,
    })
    IsHacking = true
end

function closeHack()
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = "close",
    })
    IsHacking = false
end

function GetHackingStatus()
    return IsHacking
end