function SetUIFocus(hasKeyboard, hasMouse)
  SetNuiFocus(hasKeyboard, hasMouse)
end
exports('SetUIFocus', SetUIFocus)
RegisterNUICallback("MSYEETT-ui:closeApp", function(data, cb)
    SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    Wait(800)
    TriggerEvent("attachedItems:block",false)
end)
RegisterCommand("MSYEETT-ui:force-close", function()
    SendUIMessage({source = "MSYEETT-nui", app = "", show = false});
    SetUIFocus(false, false)
end, false)
















