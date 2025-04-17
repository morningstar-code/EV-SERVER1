


local activeChannelsATC = {} --key is channel id, value is table with sub count and list of users in the channel
local channelSubscribersATC = {} --key is player server id, value is channel id

RPC.register("ev-voice:atc:subscribe", function(src)
    if activeChannelsATC[118.0] == nil then
        activeChannelsATC[118.0] = {}
        activeChannelsATC[118.0].subscribers = {}
        activeChannelsATC[118.0].count = 0
    end
    activeChannelsATC[118.0].count = activeChannelsATC[118.0].count + 1

    channelSubscribersATC[src] = 118.0
    activeChannelsATC[118.0].subscribers[src] = src
    
    Citizen.Wait(150)
    return channelSubscribersATC
end)

RPC.register("ev-voice:atc:unsubscribe", function(src)
    if not activeChannelsATC[118.0] then return end
    activeChannelsATC[118.0].count = activeChannelsATC[118.0].count - 1
    if activeChannelsATC[118.0].count == 0 then
        activeChannelsATC[118.0] = nil
    else
        activeChannelsATC[118.0].subscribers[src] = nil
        for k,v in pairs(activeChannelsATC[118.0].subscribers) do
            channelSubscribersATC[v] = nil
        end
    end

    channelSubscribersATC[src] = nil
end)

AddEventHandler('playerDropped', function(source, reason)
    local src = source
    if channelSubscribersATC[src] then
        channelSubscribersATC[src] = nil
    end
end)