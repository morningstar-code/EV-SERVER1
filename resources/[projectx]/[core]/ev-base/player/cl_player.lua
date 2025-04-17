CPX.Player = CPX.Player or {}
CPX.LocalPlayer = CPX.LocalPlayer or {}

local function GetUser()
    return CPX.LocalPlayer
end

function CPX.LocalPlayer.setVar(self, var, data)
    GetUser()[var] = data
end

function CPX.LocalPlayer.getVar(self, var)
    return GetUser()[var]
end

function CPX.LocalPlayer.setCurrentCharacter(self, data)
    if not data then return end
    GetUser():setVar("character", data)
end

function CPX.LocalPlayer.getCurrentCharacter(self)
    return GetUser():getVar("character")
end

RegisterNetEvent("ev-base:networkVar")
AddEventHandler("ev-base:networkVar", function(var, val)
    CPX.LocalPlayer:setVar(var, val)
end)