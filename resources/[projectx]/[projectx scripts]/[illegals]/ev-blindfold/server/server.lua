RegisterServerEvent('blindfold')
AddEventHandler('blindfold', function(pId, state)
  TriggerClientEvent('blindfold:apply', pId, state)
  if state then
    TriggerClientEvent("DoLongHudText", pId, "You have been bagged!")
  else
    TriggerClientEvent("DoLongHudText", pId, "Unbagged!")
  end
end)

RegisterServerEvent('gag:player')
AddEventHandler('gag:player', function(pId, state)
  TriggerClientEvent('gag:apply', pId, state)
  if state then
    TriggerClientEvent("DoLongHudText", pId, "You have been gaged!")
  else
    TriggerClientEvent("DoLongHudText", pId, "Ungaged!")
  end
end)