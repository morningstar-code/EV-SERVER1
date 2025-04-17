
RegisterServerEvent('ev-pettycrime:atm:moneyreward')
AddEventHandler('ev-pettycrime:atm:moneyreward', function(money)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	if user:getCash() >= money then
        user:addMoney(money)
	end
end)

RegisterServerEvent("ev-pettycrime:atm:clrspawn")
AddEventHandler("ev-pettycrime:atm:clrspawn", function()
    TriggerClientEvent("ev-pettycrime:atm:clrspawn", -1)
end)

RegisterServerEvent("ev-pettycrime:atm:attachRope")
AddEventHandler("ev-pettycrime:atm:attachRope", function(pr1, pr2)
    TriggerClientEvent("ev-pettycrime:atm:attachRope", -1, pr1, pr2)
end)

RegisterServerEvent("ev-pettycrime:atm:attachRope2")
AddEventHandler("ev-pettycrime:atm:attachRope2", function(dpratm, atmco1, atmco2, atmco3, netveh, propsdad)
    TriggerClientEvent("ev-pettycrime:atm:attachRope2", -1, dpratm, atmco1, atmco2, atmco3, netveh, propsdad)
end)

RegisterServerEvent("ev-pettycrime:atm:prop")
AddEventHandler("ev-pettycrime:atm:prop", function(ObjNet)
    TriggerClientEvent("ev-pettycrime:atm:prop", -1, ObjNet)
end)

RegisterServerEvent("ev-pettycrime:atm:delete")
AddEventHandler("ev-pettycrime:atm:delete", function(ATMObjectDelete)
    TriggerClientEvent("ev-pettycrime:atm:delete", -1, ATMObjectDelete)
end)

RegisterServerEvent("ev-pettycrime:atm:deleteRope")
AddEventHandler("ev-pettycrime:atm:deleteRope", function(rope)
    TriggerClientEvent("ev-pettycrime:atm:deleteRope", -1, rope)
end)