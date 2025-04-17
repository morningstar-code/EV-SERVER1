
RPC.register("police:impoundVehicle", function(src, pVin)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local char = user:getCurrentCharacter()
    local dep = exports["ev-jobmanager"]:getDepartment(src, "police")
    local name = char.first_name .. " " .. char.last_name
    local cid  = char.id

    local update = MySQL.update.await([[
        UPDATE _vehicle
        SET garage = ?, state = ?
        WHERE vin = ?
    ]],
    { "pd_impound", "stored", pVin })

    exports["ev-financials"]:adjustAccountBalance(DepartmentAccounts[dep], "add", math.random(150, 250))

    if update then 
        TriggerEvent("ev-log:server:CreateLog", "policeImpound", "impound System", "green", "Vehicle Vin: " .. pVin .. " Has been impounded by Officer: " .. name .. " Officer State ID: " .. cid)
        return true, "Vehicle has been impounded"
    else
        return false, "Something went wrong"
    end
end)