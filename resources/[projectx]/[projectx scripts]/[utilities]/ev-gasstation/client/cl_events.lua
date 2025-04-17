local showGasStations = false
local isNearGasStation = false
local zoneData = nil

RegisterNetEvent('CarPlayerHud:ToggleGas')
AddEventHandler('CarPlayerHud:ToggleGas', function()
    showGasStations = not showGasStations
   for _, item in pairs(gasStations) do
        if not showGasStations then
            if item.blip ~= nil then
                RemoveBlip(item.blip)
            end
        else
            item.blip = AddBlipForCoord(item[1], item[2], item[3])
            SetBlipSprite(item.blip, 361)
            SetBlipScale(item.blip, 0.6)
            SetBlipColour(item.blip, 1)
            SetBlipAsShortRange(item.blip, true)
            BeginTextCommandSetBlipName("STRING")
            AddTextComponentString("Gas")
            EndTextCommandSetBlipName(item.blip)
        end
    end
end)

-- AddEventHandler('ev-polyzone:enter', function(name, data)
--     if name == "gas_station" then
--         isNearGasStation = true
--         zoneData = data
--     end
-- end)

-- AddEventHandler('ev-polyzone:exit', function(name)
--     if name == "gas_station" then
--         isNearGasStation = false
--         zoneData = nil

--         local playerPed = PlayerPedId()
--         local playerVeh = GetVehiclePedIsIn(playerPed, false)

--         if playerVeh ~= 0 then
--             NetworkExplodeVehicle(playerVeh, true, false, 0)
--         end
--     end
-- end)