IS_DEAN_WORLD_OPEN = false
status = {}
local redTeam = {}
local blueTeam = {}
local playerCount = 0

RegisterNetEvent("ev-deanworld:rocketLeagueBallId")
AddEventHandler("ev-deanworld:rocketLeagueBallId", function(ballObj)

    print(ballObj)
    -- DeleteEntity(ballObj)
end)

RegisterNetEvent("ev-deanworld:rl:changePlayerCount")
AddEventHandler("ev-deanworld:rl:changePlayerCount", function(pCount)
    playerCount = pCount
end)


RPC.register("ev-deanworld:rocketLeagueJoinGame", function(src, pGoal, pIndex)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

    if pGoal == "south" then
        local south = {
            "red",
            src
        }
        table.insert(redTeam, {src, "red"})
    else
        local north = {
            "blue",
            src
        }
        table.insert(blueTeam, {src, "blue"})
    end

    status = {
        gameInProgress = false,
        timeRemaining = 270,
        blueScore = 0,
        redScore = 0,
        bluePlayers = blueTeam,
        redPlayers = redTeam
    }

    -- TriggerClientEvent("ev-deanworld:rocketLeagueGameStartCountdown", -1, 10)

    if pGoal == "south" then
        local team = status.redPlayers
        return team[1][2]
    else
        local team = status.bluePlayers
        return team[1][2]
    end
    
    
end)

RPC.register("ev-deanworld:rocketLeagueLeaveGame", function(src, inGameTeam, inGameIndex)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

    if inGameTeam == "south" then
        table.remove(redTeam, src, "")
    else
        table.remove(blueTeam, src, "")
    end

    print("inGameTeam",inGameTeam, "inGameIndex",inGameIndex)
end)

RPC.register("ev-deanworld:isDWOpen", function(src)
    IS_DEAN_WORLD_OPEN = not IS_DEAN_WORLD_OPEN
    TriggerClientEvent("ev-deanworld:isOpen", -1 , IS_DEAN_WORLD_OPEN)
    return IS_DEAN_WORLD_OPEN
end)

RPC.register("ev-deanworld:dropOffCases", function(src, charId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

end)

RPC.register("ev-deanworld:getOwedCash", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

end)

RPC.register("ev-deanworld:rocketLeagueGetStats", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id

end)

    -- if playerCount ~= 0 then
    --     if CurrentGame[pGoal] == nil then
    --         if pGoal == "south" then
    --             -- if playerCount <= CurrentGame[pGoal].pJoin then
    --             CurrentGame[pGoal] = {
    --                     team = "red",
    --                     redPlayers = {
    --                         [cid] = {
    --                             index = pIndex,
    --                             pJoin = playerCount,
    --                         },
    --                     },
    --                 }
    --                 return CurrentGame[pGoal]
    --             -- else
    --             --     TriggerClientEvent('DoLongHudText', src, 'Lobby is Full', 2)
    --             -- end
    --         else
    --             -- if playerCount <= CurrentGame[pGoal].pJoin then
    --                 CurrentGame[pGoal] = {
    --                     team = "blue",
    --                     bluePlayers = {
    --                         [cid] = {
    --                             index = pIndex,
    --                             pJoin = playerCount,
    --                         },
    --                     },
    --                 }
    --                 return CurrentGame[pGoal]
    --             -- else
    --             --     TriggerClientEvent('DoLongHudText', src, 'Lobby is Full', 2)
    --             -- end
    --         end
    --         print(json.encode(CurrentGame))
    --     end
    -- else
    --     TriggerClientEvent('DoLongHudText', src, 'you need to setup the amount of the players', 2)
    -- end