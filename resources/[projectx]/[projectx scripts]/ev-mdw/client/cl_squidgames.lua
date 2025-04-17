AddEventHandler('ev-inventory:itemUsed', function(pItem)
  if pItem ~= "squidcoinheads" then return end
  TriggerServerEvent("ev-squidgames:flipCoin", true)
end)
AddEventHandler('ev-inventory:itemUsed', function(pItem)
  if pItem ~= "squidcoinboth" then return end
  TriggerServerEvent("ev-squidgames:flipCoin", false)
end)
