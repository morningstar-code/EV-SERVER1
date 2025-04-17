RegisterNetEvent('police:client:createTempCert')
AddEventHandler('police:client:createTempCert', function ()
    if not isCop then return end
    exports['ev-ui']:openApplication('textbox', {
        callbackUrl = 'police:client:submitTempCert',
        inputKey = 1,
        items = {
            {
                icon = "fas fa-id-card",
                label = "State ID",
                name = "stateId",
            },
            {
                icon = "fas fa-id-badge",
                label = "License (fishing, hunting)",
                name = "license",
            },
            {
                icon = "fas fa-clock",
                label = "Expiry (in hours)",
                name = "expiry",
            },
        },
        show = true,
    })
end)

RegisterUICallback('police:client:submitTempCert', function (data, cb)
    cb({ data = {}, meta = { ok = true, message = "done" } })

    if data[2].values ~= "hunting" and data[2].values ~= "fishing" then
        return TriggerEvent("DoLongHudText", "Please specify a valid license (hunting, fishing)", 2)
    end

    local expiry = tonumber(data[3].values)
    if expiry < 0 then
        return TriggerEvent("DoLongHudText", "Please specify a valid hour amount", 2)
    end

    exports['ev-ui']:closeApplication('textbox')

    local metaData = json.encode({
        ["stateId"] = tonumber(data[1].values),
        ["license"] = data[2].values,
        ["creatorId"] = exports["isPed"]:isPed("cid"),
        ["certExpiry"] = (GetCloudTimeAsInt() + expiry * 3600) * 1000
    })

    TriggerEvent('player:receiveItem', 'tempcertificate', 1, false, {}, metaData)
end)

