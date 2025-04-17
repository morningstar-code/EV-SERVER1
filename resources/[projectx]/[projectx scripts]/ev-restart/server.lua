--[[ local x = "The server will restart in 15 minutes!"
local xx = "The server will restart in 10 minutes!"
local xxx = "The server will restart in 5 minutes!"
local xxxx = "The server will begin its restart process now!"

RegisterServerEvent("ev-restart:checkRebootTime")
AddEventHandler('ev-restart:checkRebootTime', function()
	ddd = os.date('%H:%M:%S', os.time())
	local dddd = ddd
	if dddd == '11:46:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, x)
	elseif dddd == '11:51:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xx)
	elseif dddd == '11:56:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxx)
	elseif dddd == '11:59:10' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '11:59:20' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '11:59:30' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '11:59:40' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '11:59:50' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '12:00:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '23:46:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, x)
	elseif dddd == '23:51:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xx)
	elseif dddd == '23:56:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxx)
	elseif dddd == '23:59:10' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '23:59:20' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '23:59:30' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '23:59:40' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '23:59:50' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	elseif dddd == '00:00:00' then
		TriggerClientEvent('chatMessage', -1, "SYSTEM", {255, 0, 0}, xxxx)
	end
end)

function restartNow() 
	SetTimeout(1000, function() 
		TriggerEvent('ev-restart:checkRebootTime') 
		restartNow() 
	end) 
end
restartNow() ]]