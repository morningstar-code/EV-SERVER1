
RPC.register('passorder', function(src, data)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)

    local price = tonumber(data.price)
    Wait(5000)
    if user:getBalance() >= price  then
      user:removeBank(price)
      TriggerClientEvent("chatMessage", src,"EMAIL ", 8, 'You Order for '.. data.item .. ' Costs - $' .. price.. " Go Pick it up at the marked location on your GPS.", 1)
    Wait(5000)
    TriggerClientEvent("stufmanidk", src, data)
    else 
      TriggerClientEvent('DoLongHudText', src, "you to broke for this",2)
      return
    end
end)