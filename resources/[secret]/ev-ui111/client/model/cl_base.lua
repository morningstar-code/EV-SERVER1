-- CLOSE APP
function SetUIFocus(hasKeyboard, hasMouse)
  SetNuiFocus(hasKeyboard, hasMouse)
end

exports('SetUIFocus', SetUIFocus)

RegisterNUICallback("np-ui:closeApp", function(data, cb)
    SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    Wait(800)
    TriggerEvent("attachedItems:block",false)
end)

RegisterNUICallback("np-ui:applicationClosed", function(data, cb)
    TriggerEvent("np-ui:application-closed", data.name, data)
    --SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
end)

-- FORCE CLOSE
RegisterCommand("np-ui:force-close", function()
    SendUIMessage({source = "np-nui", app = "", show = false});
    SetUIFocus(false, false)
end, false)

-- SMALL MAP
RegisterCommand("np-ui:small-map", function()
  SetRadarBigmapEnabled(false, false)
end, false)

local function restartUI(withMsg)
  SendUIMessage({ source = "np-nui", app = "main", action = "restart" });
  if withMsg then
    TriggerEvent("DoLongHudText", "You can also use 'ui-r' as a shorter version to restart!")
  end
  Wait(5000)
  TriggerEvent("np-ui:restarted")
  TriggerServerEvent("np-ui:restarted")
  SendUIMessage({ app = "hud", data = { display = true }, source = "np-nui" })
  local cj = exports["isPed"]:isPed("myJob")
  print("current job", cj)
  if cj ~= "unemployed" then
    TriggerEvent("np-jobmanager:playerBecameJob", cj)
    TriggerServerEvent("np-jobmanager:fixPaychecks", cj)
  end
end
RegisterCommand("np-ui:restart", function() restartUI(true) end, false)
RegisterCommand("ui-r", function() restartUI() end, false)
RegisterNetEvent("np-ui:server-restart")
AddEventHandler("np-ui:server-restart", restartUI)

RegisterCommand("np-ui:debug:show", function()
    SendUIMessage({ source = "np-nui", app = "debuglogs", data = { display = true } });
end, false)

RegisterCommand("np-ui:debug:hide", function()
    SendUIMessage({ source = "np-nui", app = "debuglogs", data = { display = false } });
end, false)

RegisterNUICallback("np-ui:resetApp", function(data, cb)
    SetUIFocus(false, false)
    cb({data = {}, meta = {ok = true, message = 'done'}})
    sendCharacterData()
end)

RegisterNetEvent("np-ui:server-relay")
AddEventHandler("np-ui:server-relay", function(data)
    SendUIMessage(data)
end)

RegisterNetEvent("np-jobmanager:playerBecameJob")
AddEventHandler("np-jobmanager:playerBecameJob", function(job)
  sendAppEvent("character", { job = job })
end)

RegisterNUICallback("np-ui:getEndpoint", function(data, cb)
  local endpoint = GetCurrentServerEndpoint()
  cb({data = endpoint, meta = {ok = true, message = 'done'}})
end)