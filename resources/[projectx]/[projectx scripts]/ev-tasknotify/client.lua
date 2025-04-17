function openGui(clr,msg,time)
    guiEnabled = true
    SendNUIMessage({runProgress = true, colorsent = clr, textsent = msg, fadesent = time})
end

function closeGui()
    guiEnabled = false
    SendNUIMessage({closeProgress = true})
end

RegisterNetEvent("tasknotify:guiupdate")
AddEventHandler("tasknotify:guiupdate", function(color,message,time)
    openGui(color,message,time)
end)

RegisterNetEvent("tasknotify:guiclose")
AddEventHandler("tasknotify:guiclose", function()
    closeGui()
end)

--[[ RegisterCommand("fmnotify", function(source,args) -- Use this command to display a text example in game !
    if args[1] == 'success' then
        TriggerEvent("DoLongHudText", "SoulSP34r!", 1)
    elseif args[1] == 'errormsg' then
        TriggerEvent("DoLongHudText", "SoulSP34r", 2)
    end
end) ]]