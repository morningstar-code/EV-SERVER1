RegisterNetEvent('ev-fuel:initFuel')
AddEventHandler('ev-fuel:initFuel', function(sentVeh)
	local veh = NetworkGetEntityFromNetworkId(sentVeh)
	if veh ~= 0 then
		Entity(veh).state.fuel = math.random(40, 60)
	end
end)

AddEventHandler('ev-fuel:setFuel', function(sentVeh, sentFuel)
	if type(sentFuel) == 'number' and sentFuel >= 0 and sentFuel <= 100 then
		if DoesEntityExist(sentVeh) then
			Entity(sentVeh).state.fuel = sentFuel
		else
			Entity(NetworkGetEntityFromNetworkId(sentVeh)).state.fuel = sentFuel
		end
	end
end)

local function GetFuel(sentVeh)
	if DoesEntityExist(sentVeh) then
		return Entity(sentVeh).state.fuel
	else
		return Entity(NetworkGetEntityFromNetworkId(sentVeh)).state.fuel
	end
end

exports('GetFuel', GetFuel) -- exports['ev-fuel']:GetFuel(veh)

RegisterNetEvent('ev-fuel:PurchaseSuccessfulCash', function(gprice)
	local pSrc = source
	local user = exports["ev-base"]:getModule("Player"):GetUser(pSrc)

	if user:getBalance() >= gprice then
		user:removeMoney(gprice)
		TriggerClientEvent("ev-fuel:OfferAcceptedCash", pSrc)
	else
		TriggerClientEvent('DoLongHudText', pSrc, 'There is not enough money on it!', 2)
	end
end)

RegisterNetEvent('ev-fuel:PurchaseSuccessfulSelfServer', function(gprice)
	local pSrc = source
		
	TriggerClientEvent("ev-fuel:OfferAcceptedCash", pSrc)

end)

RPC.register('ev-fuel:PurchaseSuccessful', function(src, gprice)
	local pSrc = src
	local user = exports["ev-base"]:getModule("Player"):GetUser(pSrc)
	if user:getBalance() >= gprice then
		user:removeBank(gprice)
		TriggerClientEvent('DoLongHudText', pSrc, 'You paid $' ..gprice.. " for fuel" , 1)
		return true
	else
		TriggerClientEvent('DoLongHudText', pSrc, 'Not enough money in bank!', 2)
		return false
	end
end)

RegisterNetEvent('ev-fuel:Refund', function(gprice)
	local pSrc = source
	exports['ev-fw']:GetModule('AddBank')(pSrc, tonumber(gprice))
end)

RegisterNetEvent('ev-fuel:testing', function()
	local src = source
	local data = src
	TriggerClientEvent("ev-fuel:send_billSelf2",src ,data)
end)