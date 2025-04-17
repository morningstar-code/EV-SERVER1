local InputRequests, InputCount = {}, 0

RegisterNUICallback('ev-ui:applicationClosed', function(data, cb)
    if (data.name ~= 'textbox' or data.callbackUrl ~= 'ev-ui:inputResponse') then return end

    local request = InputRequests[data.inputKey]

    if (not request) then return end

    request.response:resolve(nil)

    InputRequests[data.inputKey] = nil
end)

RegisterNUICallback('ev-ui:inputResponse', function(data, cb)
    cb({ data = {}, meta = { ok = true, message = "done" } })

    local request = InputRequests[data.inputKey]

    if (not request) then return end

    local success = request.validation == nil and true or request.validation(data.values)

    if (not success) then return end

    request.response:resolve(data.values)

    InputRequests[data.inputKey] = nil

    exports['ev-ui']:closeApplication('textbox')
end)

function OpenInputMenu(pEntries, pValidation)
    local inputId = InputCount + 1

    InputCount = inputId

    local response = promise:new()

    InputRequests[inputId] = { response = response, validation = pValidation}

    exports['ev-ui']:openApplication('textbox', {
        callbackUrl = 'ev-ui:inputResponse',
        inputKey = inputId,
        items = pEntries,
        show = true,
    })

    return Citizen.Await(response)
end

exports('OpenInputMenu', OpenInputMenu)