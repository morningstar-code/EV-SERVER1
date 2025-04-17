RegisterServerEvent("ev-signin:duty")
AddEventHandler("ev-signin:duty", function(pJobType)
    local src = source
	if src == nil or src == 0 then src = source end
	local user = exports["ev-base"]:getModule("Player"):GetUser(src)
	local character = user:getCurrentCharacter()
	local jobs = exports["ev-base"]:getModule("JobManager")
	local job = pJobType
    exports.oxmysql:execute('SELECT callsign FROM jobs_whitelist WHERE cid = ?', {character.id}, function(result)
        jobs:SetJob(user, pJobType, false, function()
            if result[1].callsign ~= nil then
                pCallSign = result[1].callsign
            else
                pCallSign = "000"
            end
            if pJobType == "police" then
                TriggerClientEvent("DoLongHudText", src, "10-41 and Restocked.", 17)
                TriggerClientEvent("startSpeedo", src)
                TriggerClientEvent("nowCopGarage", src, pJobType)
                setupCallsignData(src, pJobType)
                TriggerEvent('ev-eblips:server:registerPlayerBlipGroup', src, job)
                TriggerEvent('ev-eblips:server:registerSourceName', src, pCallSign .." | ".. character.first_name .." ".. character.last_name)
            elseif pJobType == "doc" then
                TriggerClientEvent("DoLongHudText", src, "10-41 Signed in as DOC.", 17)
                TriggerClientEvent("nowCopGarage", src, pJobType)
                setupCallsignData(src, pJobType)
                TriggerEvent('ev-eblips:server:registerPlayerBlipGroup', src, job)
                TriggerEvent('ev-eblips:server:registerSourceName', src, pCallSign .." | ".. character.first_name .." ".. character.last_name)
            elseif pJobType == "ems" then
                TriggerClientEvent("DoLongHudText", src, "10-41 Signed in as EMS.", 17)
                TriggerClientEvent("hasSignedOnEms",src)
                TriggerClientEvent("police:officerOnDuty", src)
                TriggerEvent('ev-eblips:server:registerPlayerBlipGroup', src, job)
                TriggerEvent('ev-eblips:server:registerSourceName', src, pCallSign .." | ".. character.first_name .." ".. character.last_name)
                setupCallsignData(src, pJobType)
            elseif pJobType == "judge" then
                TriggerClientEvent("isJudge", src)
                --exports["ev-phone"]:setDOJData(src, pJobType) 
                TriggerEvent('ev-eblips:server:registerPlayerBlipGroup', src, job)
                TriggerEvent('ev-eblips:server:registerSourceName', src, pCallSign .." | ".. character.first_name .." ".. character.last_name)
            elseif pJobType == "doctor" then
                TriggerClientEvent("isDoctor", src)
                TriggerEvent('ev-eblips:server:registerPlayerBlipGroup', src, job)
                TriggerEvent('ev-eblips:server:registerSourceName', src, pCallSign .." | ".. character.first_name .." ".. character.last_name)
            elseif pJobType == "therapist" then
                TriggerClientEvent("isTherap1st", src)
                TriggerEvent('ev-eblips:server:registerPlayerBlipGroup', src, job)
                TriggerEvent('ev-eblips:server:registerSourceName', src, pCallSign .." | ".. character.first_name .." ".. character.last_name)
            end
        end)
    end)
end)

function setupCallsignData(src, job)
    local data = exports["ev-jobmanager"]:getCallsign(src, job)
    local dep = exports["ev-jobmanager"]:getDepartment(src, job)
    TriggerClientEvent("ev-dispatch:AddinSignin", src, data.callsign, data.type)
    if job == "police" then
        TriggerClientEvent("police:setCallSign", src, data.callsign, dep)
    end
end

RegisterNetEvent('blipOffDuty')
AddEventHandler('blipOffDuty', function(pJob)
    local src = source
    TriggerEvent('ev-eblips:server:removePlayerBlipGroup', src, pJob)
end)

AddEventHandler('playerDropped', function()
	local src = source
	if src ~= nil then
		local steamIdentifier = GetPlayerIdentifiers(src)[1]
		exports.oxmysql:execute('SELECT * FROM characters WHERE owner = ?', {steamIdentifier}, function(result)
			if result[1].job == 'police' or result[1].job == 'sheriff' or result[1].job == 'state' then
				TriggerEvent('ev-eblips:server:removePlayerBlipGroup', src, 'police')
            elseif result[1].job == 'ems' then
				TriggerEvent('ev-eblips:server:removePlayerBlipGroup', src, 'ems')
            end
		end)
	end
end)