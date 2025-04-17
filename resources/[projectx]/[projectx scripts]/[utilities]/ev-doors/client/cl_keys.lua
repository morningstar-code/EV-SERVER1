AddEventHandler("ev-inventory:itemUsed", function(item, info)
    if item ~= "methlabkey" then return end
    if not info then return end
    RPC.execute("ev-doors:useDoorKey", NetworkGetNetworkIdFromEntity(PlayerPedId()), info)
end)

AddEventHandler("ev-inventory:itemUsed", function(item, info)
    if item ~= "casinogoldcoin" then return end
    if #(GetEntityCoords(PlayerPedId()) - vector3(991.05, 24.49, 71.47)) > 2 then return end
    RPC.execute("ev-doors:triggerCasinoLaundryDoor")
end)

AddEventHandler("ev-inventory:itemUsed", function (item, info)
    if item ~= "rskey" then return end
    if #(GetEntityCoords(PlayerPedId()) - vector3(2097.94,442.61,165.12)) > 5 then return end
    TriggerServerEvent("ev-doors:triggerRSDoor")
end)
  
CreateThread(function ()
  exports["ev-polytarget"]:AddBoxZone("sanctuary_key_creation", vector3(2107.5, 464.24, 164.7), 1, 1, {
    heading=0,
    minZ=164.3,
    maxZ=164.9
  })
  exports["ev-interact"]:AddPeekEntryByPolyTarget(
    "sanctuary_key_creation",
    {
      {
        event = "ev-doors:createSanctuaryKey",
        id = "doors_create_sanc_key",
        icon = "key",
        label = "Create Key"
      }
    },
    {
      distance = { radius = 1.0 },
      isEnabled = function ()
        local cid = exports["isPed"]:isPed("cid")
        return cid == 70
      end
    }
  )
end)

AddEventHandler("ev-doors:createSanctuaryKey", function ()
  local cid = exports["isPed"]:isPed("cid")
  if cid ~= 70 then return end
  TriggerServerEvent("ev-doors:createSanctuaryKey")
end)