RegisterCommand("ballot", function()
    SendUIMessage({ source = "ev-nui", app = "ballot", show = true });
    SetUIFocus(true, true)
end, false)

RegisterCommand("ballotmanager", function()
    SendUIMessage({ source = "ev-nui", app = "ballotmanager", show = true });
    SetUIFocus(true, true)
end, false)

RegisterCommand("interactions", function(source, args)
    SendUIMessage({
    app = "interactions",
    data = {
        message = "[E] Check in",
        show = true, -- true | false
        type = "error" -- info | warning | error
    },
    source = "ev-nui"
});
end, false)