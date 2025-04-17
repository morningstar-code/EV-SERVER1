RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
end)

RegisterNetEvent('ev-elections:closeScript', function()
      SetNuiFocus(false, false)  
      SendNUIMessage({
         type = "close",
      })
        
end)


local pjx = 0
local sp34r = 0
local sp34rone = 0
local sp34rtwo = 0

local candidateone = {}
local candidatetwo = {}

RegisterNetEvent("electionsWinnerCheck")
AddEventHandler("electionsWinnerCheck", function(data)
    if data == "pjx" then
        sp34rone = pjx + tonumber(1)
        candidateone = data
    end
    if data == "sp34r" then
        sp34rtwo = sp34r + tonumber(1)
        candidatetwo = data
    end
end)

RegisterNetEvent("electionsWinnerCheckDatabase")
AddEventHandler("electionsWinnerCheckDatabase", function(data)
    local _context = {
        {
          title = 'Elections Database System',
          description = 'EDS',
          icon = 'circle',
        },
        {
          title = "pjx",
          description = 'Total Votes: '.. sp34rone ..'',
          icon = 'vote-yea',
          disabled = true,
          children = {}
        },
        {
         title = "sp34r",
         description = 'Total Votes: '.. sp34rtwo ..'',
         icon = 'vote-yea',
         disabled = true,
         children = {}
        }
      }
     exports['ev-ui']:showContextMenu(_context)
end)



RegisterNUICallback('getConfig', function(data,cb)
    cb(vCode)
end)

RegisterNUICallback('voteForSomeone', function(data)
    TriggerServerEvent('ev-elections:voteWithData', data.id)
    TriggerServerEvent('electionsWinnerCheck', data.id)
end)

RegisterNUICallback('error', function()
    TriggerEvent("DoLongHudText", "Please Choose A Candidate!", 2)
end)

RegisterNetEvent("openApplicationBallot")
AddEventHandler("openApplicationBallot", function()
    TryToVote()
end)

function TryToVote()
local hasVoted = RPC.execute("ev-elections:hasPlayerVoted")
    if hasVoted then
         SendNUIMessage({
            type = 'show',
        })
        SetNuiFocus(true, true)
    else
        TriggerEvent("DoLongHudText", "You Have Already Voted!", 2)
    end
end

