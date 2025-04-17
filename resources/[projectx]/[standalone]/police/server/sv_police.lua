local currentClassRoomBoardUrl = ""
local currentMeetingRoomBoardUrl = ""
local PoliceCallsBans = {}
RegisterNetEvent("police:changewhiteboard", function(pUrl, pRoom)
    local src = source
    if pRoom == "classroom" then
        currentClassRoomBoardUrl = pUrl
    elseif pRoom == "meetingroom" and inMeetingRoom and dui then
        currentMeetingRoomBoardUrl = pUrl
    end

    TriggerClientEvent("police:changewhiteboardcli", -1, pUrl, pRoom)
end)

RegisterNetEvent("SpawnEventsServer", function()
    local src = source
    TriggerClientEvent("ev-base:sessionStarted", src)
    TriggerClientEvent("police:changewhiteboardcli", src, currentClassRoomBoardUrl, "classroom")
    TriggerClientEvent("police:changewhiteboardcli", src, currentMeetingRoomBoardUrl, "meetingroom")
end)

RPC.register("police:is911Banned", function(src, pCid)
    if PoliceCallsBans[pCid] == pCid then
        return true
    else
        return false
    end
end)

RPC.register("ev-police:updateJobState", function(src, pRank, pState, pID, pDepartment)
    local player = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = player:getCurrentCharacter().id
    local jobs = exports["ev-base"]:getModule("JobManager")
    local rank = jobs:GetRank(player, "police")
    
    if rank >= 9 then
        if tonumber(pState) == 1 then
            local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pID))
            local char = user:getCurrentCharacter()
            jobs:AddWhiteList(user, "police", tonumber(pRank), pDepartment)
            exports["ev-gov"]:updateLicense(tonumber(pID), "Weapon", 1, char.id)
            TriggerEvent("ev-log:server:CreateLog", "policeGiveJob", "Hire", "red", "**" .. GetPlayerName(src) .. "** ( ID: " .. src .. " | State ID: " .. cid .. ") Hired " .. GetPlayerName(tonumber(pID)) .. "** ( ID: " .. tonumber(pID) .. " | State ID: " .. char.id .. ") Rank: " .. pRank )
            return true
        elseif tonumber(pState) == 2 then
            local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pID))
            local char = user:getCurrentCharacter()
            jobs:SetRank(user, "police", tonumber(pRank))
            TriggerEvent("ev-log:server:CreateLog", "policeGiveJob", "Change Rank", "red", "**" .. GetPlayerName(src) .. "** ( ID: " .. src .. " | State ID: " .. cid .. ") Changed Rank " .. GetPlayerName(tonumber(pID)) .. "** ( ID: " .. tonumber(pID) .. " | State ID: " .. char.id .. ") To " .. pRank )
            return true
        else
            local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pID))
            local char = user:getCurrentCharacter()
            jobs:RemoveWhiteList(tonumber(pID))
            TriggerEvent("ev-log:server:CreateLog", "policeGiveJob", "Fire", "red", "**" .. GetPlayerName(src) .. "** ( ID: " .. src .. " | State ID: " .. cid .. ") Fired " .. GetPlayerName(tonumber(pID)) .. "** ( ID: " .. tonumber(pID) .. " | State ID: " .. char.id .. ")")
            return true
        end
    else
        TriggerClientEvent('DoLongHudText', "You can't do that, talk to a higher rank", 2)
    end
end)



