
function CPX.Core.ConsoleLog(self, msg, mod, ply)
	if not tostring(msg) then return end
	if not tostring(mod) then mod = "No Module" end

	local pMsg = string.format("^3[CPX LOG - %s]^7 %s", mod, msg)
	if not pMsg then return end
	
	print(pMsg)

	if ply and tonumber(ply) then
		TriggerClientEvent("ev-base:consoleLog", ply, msg, mod)
	end
end

AddEventHandler("onResourceStart", function(resource)
	TriggerClientEvent("ev-base:waitForExports", -1)

	if not CPX.Core.ExportsReady then return end

	Citizen.CreateThread(function()
		while true do 
			Citizen.Wait(0)
			if CPX.Core.ExportsReady then
				TriggerEvent("ev-base:exportsReady")
				return
			else
			end
		end
	end)
end)

RegisterNetEvent("ev-base:playerSessionStarted")
AddEventHandler("ev-base:playerSessionStarted", function()
	local src = source
	local name = GetPlayerName(src)
	local user = CPX.Player:GetUser(src)

	exports["ev-log"]:AddLog("Player Joined", tostring(steamId), name .. " Has joined the server", {name= name, steamid = tostring(steamId)})
	if user then exports["ev-log"]:AddLog("Player Left", user, user:getVar("name").." Has joined the server") end
	print("^2" .. name .. "^7 Has joined the server")

	Citizen.CreateThread(function()
        Citizen.Wait(600000 * 3)
        local user = exports["ev-base"]:getModule("Player"):GetUser(src)
        if not user or not user:getVar("characterLoaded") then
            	DropPlayer(src, "You timed out while choosing a character")
            return
        end
    end)
end)

AddEventHandler("ev-base:characterLoaded", function(user, char)
	local src = source
	local hexId = user:getVar("hexid")

	if char.phone_number == 0 then
		CPX.Core:CreatePhoneNumber(src, function(phonenumber, err)	
			local q = [[UPDATE characters SET phone_number = @phone WHERE owner = @owner and id = @cid]]
			local v = {
				["phone"] = phoneNumber,
				["owner"] = hexId,
				["cid"] = char.id
			}

			exports.oxmysql:execute(q, v, function()
				char.phone_number = math.floor(char.phone_number)
				user:setCharacter(char)
			end)
		end)
	end
end)
