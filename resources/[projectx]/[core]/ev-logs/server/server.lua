local loggingApi = " "


RegisterServerEvent('ev-log:server:CreateLog')
AddEventHandler('ev-log:server:CreateLog', function(name, title, color, message, tagEveryone)
    local tag = tagEveryone ~= nil and tagEveryone or false
    local webHook = Config.Webhooks[name] ~= nil and Config.Webhooks[name] or Config.Webhooks["default"]
    local embedData = {
        {
            ["title"] = title,
            ["color"] = Config.Colors[color] ~= nil and Config.Colors[color] or Config.Colors["default"],
            ["footer"] = {
                ["text"] = os.date("%c"),
            },
            -- ['image'] = {url = screen},
            ["description"] = message,
        }
    }
    PerformHttpRequest(webHook, function(err, text, headers) end, 'POST', json.encode({ username = "Vic Logs",embeds = embedData}), { ['Content-Type'] = 'application/json' })
    Citizen.Wait(100)
    if tag then
        PerformHttpRequest(webHook, function(err, text, headers) end, 'POST', json.encode({ username = "Vic Logs", content = "@everyone"}), { ['Content-Type'] = 'application/json' })
    end
end)

RegisterServerEvent('ev-log:server:sendLog')
AddEventHandler('ev-log:server:sendLog', function(citizenid, logtype, data)
    local dataString = ""
    data = data ~= nil and data or {}
    for key,value in pairs(data) do 
        if dataString ~= "" then
            dataString = dataString .. "&"
        end
        dataString = dataString .. key .."="..value
    end
    local requestUrl = string.format("%s?citizenid=%s&logtype=%s&%s", loggingApi, citizenid, logtype, dataString)
    requestUrl = string.gsub(requestUrl, ' ', "%%20")
    PerformHttpRequest(requestUrl, function(err, text, headers) end, 'GET', '')
end)

AddEventHandler('chatMessage', function(author, color, message)
    if source ~= nil and message ~= nil then
        TriggerEvent("ev-log:server:CreateLog", "chat", "Chat", "blue", "**".. GetPlayerName(author) .. "** Message: **" ..message.."**")
    end
end)