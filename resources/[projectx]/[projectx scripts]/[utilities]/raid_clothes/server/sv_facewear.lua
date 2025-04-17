RegisterNetEvent("facewear:adjust")
AddEventHandler("facewear:adjust", function(pTarget, pWearType, pShouldRemove, pIsSteal)
    print("HELLO")
  	local src = source

	local isSteal = pIsSteal and src or false

	TriggerClientEvent("facewear:adjust", pTarget, pWearType, pShouldRemove, isSteal)
end)

RegisterNetEvent("ev-clothes:facewearSendItem")
AddEventHandler("ev-clothes:facewearSendItem", function(pTarget, pItem, pMeta)
	if pItem == "stolenshoes" then
		TriggerClientEvent("player:receiveItem", pTarget, "-828058162", 2)
	else
        print(json.encode(pMeta))
		TriggerClientEvent("player:receiveItem", pTarget, pItem, 1, false, pMeta)
	end
end)