-- call this event when receiving call
RegisterCommand("phone:call-receiving", function()
    SendUIMessage({
        source = "ev-nui",
        app = "phone",
        data = {
            action = "call-receiving",
            number = 1231231234,
            callId = 1
        }
    });
end, false)

RegisterCommand("phone:call-dialing", function()
    SendUIMessage({
        source = "ev-nui",
        app = "phone",
        data = {
            action = "call-dialing",
            number = 1231231234,
            callId = 1
        }
    })
    isDialing = true
end, false)

RegisterCommand("phone:call-in-progress", function()
    SendUIMessage({
        source = "ev-nui",
        app = "phone",
        data = {
            action = "call-in-progress",
            number = 1231231234,
            callId = 1
        }
    })
end, false)

RegisterCommand("phone:call-inactive", function()
    SendUIMessage({
        source = "ev-nui",
        app = "phone",
        data = {
            action = "call-inactive",
            number = 1231231234
        }
    })
end, false)

RegisterCommand("phone:emailReceived", function()
    TriggerEvent(
        'phone:emailReceived',
        'Dark Market',
        '#A-1001',
        'You know where to go.'
    )
end, false)

RegisterCommand("phone:notificaton", function()
    SendUIMessage({
        source = "ev-nui",
        app = "phone",
        data = {
            action = "notification",
            target_app = "home-screen",
            title = "SYSTEM",
            body = "Goofy Ah",
            show_even_if_app_active = true -- true | false, show this notification even if the app is active
        }
    })
end, false)

RegisterCommand("phone:wenmo", function(src, args, raw)
    local amount = args[1]

    SendUIMessage({
        source = "ev-nui",
        app = "phone",
        data = {
            action = "notification",
            target_app = "wenmo",
            title = "New transfer!",
            body = ("You received $%s from %s"):format(amount, "Jerry" .. ' ' .. "Paddel")
        }
    })
end, false)