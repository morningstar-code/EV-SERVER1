IsLVComputerLoggedIn = false

RegisterNetEvent('ev-hasino:computerLoggedIn', function(pState)
  IsLVComputerLoggedIn = pState
end)

AddEventHandler('ev-hasino:loginLowerComputer', function()
    local hasBluePrints = exports['ev-inventory']:hasEnoughOfItem('casinoblueprints', 1, false, true)
    if not hasBluePrints then
        TriggerEvent('DoLongHudText', 'Missing documents!', 2)
        return
    end
    local hint, timeRemaining, attempts = RPC.execute('ev-hasino:getLoginAttempts')
    exports['ev-ui']:openApplication('hasino-lower-login', {
        attempts = attempts,
        hint = hint,
        timeRemaining = timeRemaining,
    })
end)

RegisterUICallback('ev-hasino:attemptLowerLogin', function(data, cb)
    local response, timeRemaining, attempts = RPC.execute('ev-hasino:attemptLVComputerLogin', data.password)
    cb({ data = { text = response, timeRemaining = timeRemaining, attempts = attempts}, meta = { ok = true, message = "done" } })
end)
