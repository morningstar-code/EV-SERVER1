local door = "closed"

RegisterNetEvent("ev-carshop:pdmBackDoor")
AddEventHandler("ev-carshop:pdmBackDoor", function()
    local update = "opened"
    if door == "opened" then
        update = "closed"
    end

    door = update

    TriggerClientEvent("ev-carshop:pdmBackDoor", -1, door)
end)