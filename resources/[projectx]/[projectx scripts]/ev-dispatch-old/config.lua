RegisterCommand("add-dispatch", function(source,args)
    local job = exports["isPed"]:isPed("myjob")
    if job == 'police' then
        exports["ev-dispatch"]:dispatchadd(args[1], args[2], args[3])
    end
end)

RegisterCommand("runplate", function(source,args)
    local job = exports["isPed"]:isPed("myjob")
    if job == 'police' then
        exports["ev-dispatch"]:dispatchadd("Flagged Vehicle:" .. args[1])
    end
end)

RegisterCommand("10-11", function(source,args)
    local job = exports["isPed"]:isPed("myjob")
    if job == 'police' then
        local icon = 189 -- https://docs.fivem.net/docs/game-references/blips/
        exports["ev-dispatch"]:policedead("10-11A", "Police Injured", icon)
    end
end)

Citizen.CreateThread(function()
    RegisterCommand("+openMenuForce", function()
        menu = not menu
        local job = exports["isPed"]:isPed("myjob")
        if job == 'police' or job == "ems" then
            openMenuForce()
        end
    end, false)

    RegisterCommand("-openMenuForce", function() end, false)

    exports["ev-keybinds"]:registerKeyMapping("", "Dispatch", "Open Map", "+openMenuForce", "-openMenuForce", "")
    exports["ev-keybinds"]:registerKeyMapping("", "Dispatch", "Open Menu", "+petActionVehicle", "-petActionVehicle", "")
end)