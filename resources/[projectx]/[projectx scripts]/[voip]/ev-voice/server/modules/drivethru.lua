


local activeChannelsDrive = {} --key is channel id, value is table with sub count and list of users in the channel
local channelSubscribersDrive = {} --key is player server id, value is channel id

RPC.register("ev-voice:drivethru:subscribe", function(src)
    if activeChannelsDrive[120.6] == nil then
        activeChannelsDrive[120.6] = {}
        activeChannelsDrive[120.6].subscribers = {}
        activeChannelsDrive[120.6].count = 0
    end
    activeChannelsDrive[120.6].count = activeChannelsDrive[120.6].count + 1

    channelSubscribersDrive[src] = 120.6
    activeChannelsDrive[120.6].subscribers[src] = src
    
    Citizen.Wait(150)
    return channelSubscribersDrive
end)

RPC.register("ev-voice:drivethru:unsubscribe", function(src)
    if not activeChannelsDrive[120.6] then return end
    activeChannelsDrive[120.6].count = activeChannelsDrive[120.6].count - 1
    if activeChannelsDrive[120.6].count == 0 then
        activeChannelsDrive[120.6] = nil
    else
        activeChannelsDrive[120.6].subscribers[src] = nil
        for k,v in pairs(activeChannelsDrive[120.6].subscribers) do

        end
    end

    channelSubscribersDrive[src] = nil
end)

AddEventHandler('playerDropped', function(source, reason)
    local src = source
    if channelSubscribersDrive[src] then
        channelSubscribersDrive[src] = nil
    end
end)