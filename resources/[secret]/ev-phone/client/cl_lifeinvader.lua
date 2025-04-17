RegisterUICallback("ev-ui:li:addContact", function(data, cb)
    local success, message = RPC.execute("phone:addEmailContact", data)
    cb({ data = message, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:deleteContact", function(data, cb)
    local success, message = RPC.execute("phone:deleteEmailContact", data)
    cb({ data = message, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:getContacts", function(data, cb)
    local success, message = RPC.execute("phone:getEmailContacts")
    cb({ data = message, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:getEmails", function(data, cb)
    local success, message = RPC.execute("phone:getEmails", data)
    cb({ data = message and message or {}, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:getEmailContent", function(data, cb)
    local success, message = RPC.execute("phone:getEmailContent", data)
    cb({ data = message and message or nil, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:createEmail", function(data, cb)
    local success, message = RPC.execute("phone:createEmail", data)
    cb({ data = message and message or {}, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:sendEmail", function(data, cb)
    local success, message = RPC.execute("phone:sendEmail", data)
    cb({ data = message and message or {}, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:updateEmail", function(data, cb)
    local success, message = RPC.execute("phone:updateEmail", data)
    cb({ data = message and message or {}, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:discardDraft", function(data, cb)
    local success, message = RPC.execute("phone:discardDraft", data)
    cb({ data = message and message or {}, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:deleteEmail", function(data, cb)
    local success, message = RPC.execute("phone:deleteEmail", data)
    cb({ data = message and message or {}, meta = { ok = success, message = (not success and message or "done") } })
end)

local GetRandomAdURL
Citizen.CreateThread(function()
    GetRandomAdURL = CacheableMap(function(pCtx, pName)
        local success, message = RPC.execute("phone:li:getRandomAdURL")
        return true, { success = success, message = message }
    end, {
        timeToLive = 30 * 60 * 1000
    })
end)

RegisterUICallback("ev-ui:li:getAdURL", function(data, cb)
    local result = GetRandomAdURL.get("adUrl")
    cb({ data = result.message, meta = { ok = result.success, message = (not result.success and result.message or "done") } })
end)

RegisterNetEvent('ev-phone:showEmail', function()
    local hasEmail = RPC.execute("ev-phone:getEmailAddress")
    if not hasEmail then
        TriggerEvent('DoLongHudText', 'You do not have an email address', 2)
        return
    end
    TriggerServerEvent('ev-phone:showEmailAddress')
end)

RegisterUICallback("ev-ui:li:sentEmail", function(data, cb)
    TriggerServerEvent("phone:li:sentEmail", data) -- What does this do?
    cb({ data = 'done', meta = { ok = true, message = "done" } })
end)