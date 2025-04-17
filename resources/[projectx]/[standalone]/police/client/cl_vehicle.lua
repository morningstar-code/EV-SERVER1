RegisterNetEvent("police:impoundVehicle")
AddEventHandler("police:impoundVehicle", function(pArgs, pEntity, pContext)
  local veh = exports['ev-target']:GetCurrentEntity()
  local vin = exports["ev-vehicles"]:GetVehicleIdentifier(veh)
  exports["ev-sync"]:SyncedExecution("DeleteEntity", veh)

  local r, m = RPC.execute("police:impoundVehicle", vin)
  if not r then
    TriggerEvent("DoLongHudText", m, 2)
  end
  TriggerEvent("DoLongHudText", m, 1)
end)