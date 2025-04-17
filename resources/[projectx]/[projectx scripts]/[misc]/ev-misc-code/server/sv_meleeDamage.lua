RegisterNetEvent("ev-weapons:attackedByCash")
AddEventHandler("ev-weapons:attackedByCash", function(pAttacker) 
    local victim = source
    TriggerClientEvent("ev-weapons:hitPlayerWithCash", pAttacker, victim)
end)
 
RegisterNetEvent("ev-weapons:processGiveCashAmount") 
AddEventHandler("ev-weapons:processGiveCashAmount", function(pTarget, pAmount)
    local attacker = source
    local victim = pTarget
    local victimUser = exports["ev-base"]:getModule("Player"):GetUser(victim)
    user:addMoney(pAmount)
end)