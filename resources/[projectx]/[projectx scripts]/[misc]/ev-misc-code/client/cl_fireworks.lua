AddEventHandler("ev-inventory:itemUsed", function(pItem)
  if pItem ~= "fireworks_starter" then return end
  TriggerServerEvent("fx:fireworks")
end)
