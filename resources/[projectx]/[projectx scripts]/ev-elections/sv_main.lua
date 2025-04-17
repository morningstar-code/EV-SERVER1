RPC.register('ev-elections:hasPlayerVoted', function(source,cb)
    local loadFile= LoadResourceFile(GetCurrentResourceName(), "./votes.json")
    local user = exports['ev-base']:getModule("Player"):GetUser(source)
    local character = user:getCurrentCharacter()
    local cid = character.id
    local tablo = json.decode(loadFile)
    local sp34r = {}
    print(json.encode(tablo))


    if json.encode(tablo) == '{}' then
        sp34r = false
    end

    if tablo[cid] == nil then
        sp34r = true
    else
        sp34r = false

    end

    return sp34r
end)

RegisterServerEvent('ev-elections:voteWithData', function(data)
    local loadFile= LoadResourceFile(GetCurrentResourceName(), "./votes.json")
    local user = exports['ev-base']:getModule("Player"):GetUser(source)
    local character = user:getCurrentCharacter()
    local cid = character.id
    local tablo = json.decode(loadFile)
    tablo[cid] = {vote = data}
    SaveResourceFile(GetCurrentResourceName(), "votes.json", json.encode(tablo), -1)
    if vCode.GiveItem then
        local info = {
            election = vCode.ElectionName,
        }
       TriggerClientEvent("player:receiveItem", source, "ivotedsticker", 1, false, info)
    end
end)


RPC.register('ev-elections:countCallback', function(source,cb)
    local toplamvotes = 0
    local loadFile= LoadResourceFile(GetCurrentResourceName(), "./votes.json")


    for k,v in pairs(vCode.Options) do
        v.count = 0
    end
    local tablo = json.decode(loadFile)
    for k, v in pairs(tablo) do
        vote = v.vote

        toplamvotes = toplamvotes + 1
        vCode.Toplam = toplamvotes 
        print(k, json.encode(v))

        vCode.Options[vote].count = vCode.Options[vote].count + 1

    end

    cb(vCode)

end)

RegisterServerEvent("electionsWinnerCheck", function(data)
    TriggerClientEvent("electionsWinnerCheck", -1, data)
end)

--[[
    local tablo = json.decode(loadFile)
    table.insert(tablo, information)
    table.insert(tablo, info1rmation)
    SaveResourceFile(GetCurrentResourceName(), "votes.json", json.encode(tablo), -1)



]]--
