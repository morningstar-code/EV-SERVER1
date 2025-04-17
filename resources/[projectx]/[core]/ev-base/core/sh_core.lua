CPX.Core = CPX.Core or {}

function CPX.Core.ConsoleLog(self, msg, mod)
    if not tostring(msg) then return end
    if not tostring(mod) then mod = "No Module" end
    
    local pMsg = string.format("[CPX LOG - %s] %s", mod, msg)
    if not pMsg then return end

    print(pMsg)
end

RegisterNetEvent("ev-base:consoleLog")
AddEventHandler("ev-base:consoleLog", function(msg, mod)
    CPX.Core:ConsoleLog(msg, mod)
end)

function getModule(module)
    if not CPX[module] then print("Warning: '" .. tostring(module) .. "' module doesn't exist") return false end
    return CPX[module]
end

function addModule(module, tbl)
    if CPX[module] then print("Warning: '" .. tostring(module) .. "' module is being overridden") end
    CPX[module] = tbl
end

CPX.Core.ExportsReady = false

function CPX.Core.WaitForExports(self)
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)
            if exports and exports["ev-base"] then
                TriggerEvent("ev-base:exportsReady")
                CPX.Core.ExportsReady = true
                return
            end
        end
    end)
end

exports("getModule", getModule)
exports("addModule", addModule)
CPX.Core:WaitForExports()