

local citizenid = nil
local updateInterval = 30000

local api = "http://citygis.quimey.nl/livemap/savelocation.php"


-- Round function
function round(num, numDecimalPlaces)
    local mult = 10^(numDecimalPlaces or 0)
    return math.floor(num * mult + 0.5) / mult
end

-- Main update loop
Citizen.CreateThread(function() 
    while true do
        Citizen.Wait(1000) 
        local playerCoords = GetEntityCoords(PlayerPedId())
        local get = string.format("%s?x=%s&y=%s&cid=%s", api, round(playerCoords[1], 2), round(playerCoords[2], 2), exports['isPed']:isPed('cid'))
        
        SendNUIMessage({
            action = "http",
            url = get
        })
        Citizen.Wait(updateInterval)
    end
end)