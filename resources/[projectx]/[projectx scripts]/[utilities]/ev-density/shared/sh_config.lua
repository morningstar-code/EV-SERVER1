Config = {}

Citizen.CreateThread(function ()
  if not IsDuplicityVersion() then
    while not NetworkIsSessionStarted() do Citizen.Wait(0) end
  end

  local resourceConfig = exports['ev-config']:GetModuleConfig('ev-density')
  if resourceConfig == false then return end
  Config = resourceConfig
end)

AddEventHandler('ev-config:configLoaded', function (pId, pConfig)
    if (pId ~= 'ev-density') then return end

    Config = pConfig 
end)