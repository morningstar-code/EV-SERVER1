-- @tparam string first
-- @tparam string last
-- @tparam string job
-- @tparam string sex
-- @tparam number dob

RegisterServerEvent('ev-cid:createID')
AddEventHandler('ev-cid:createID', function(first, last, job, sex, dob)
    information = {
        ["identifier"] = math.random(1,999),
        ["Name"] = tostring(first),
        ["Surname"] = tostring(last),
        ["Sex"] = tostring(sex),
        ["DOB"] = tostring(dob),
    }
    TriggerClientEvent("player:receiveItem", source, "idcard", 1, true, information)
end)
