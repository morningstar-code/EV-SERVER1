RegisterServerEvent("ev-police:cuffs:attempt")
AddEventHandler("ev-police:cuffs:attempt", function(pTarget)
	local src = source

    TriggerClientEvent("police:cuff2", pTarget, false)
	TriggerClientEvent("ev-police:cuffTransition", src)
end)

RegisterServerEvent("ev-police:cuffs:uncuff")
AddEventHandler("ev-police:cuffs:uncuff", function(pTarget)
	TriggerClientEvent("ev-police:uncuff", pTarget)
end)

RegisterServerEvent("ev-police:softcuff")
AddEventHandler("ev-police:softcuff", function(pTarget)
    TriggerClientEvent("ev-police:handCuffedWalking", pTarget)
end)

RPC.register("isPedCuffed", function(src, pTarget)
	local isCuffed = RPC.execute(pTarget, "isPlyCuffed")
	return isCuffed
end)