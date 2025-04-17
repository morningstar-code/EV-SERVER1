RegisterUICallback("ev-ui:car-clothing:swapCurrentOutfit", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports["ev-ui"]:closeApplication("textbox")
  TaskStartScenarioInPlace(PlayerPedId(), "WORLD_HUMAN_WELDING", 0, true)
  local finished = exports["ev-taskbar"]:taskBar(30000, "Swapping Outfit")
  ClearPedTasksImmediately(PlayerPedId())
  if finished ~= 100 then return end
  local rd = RPC.execute("ev-car-clothing:swapCurrentOutfit", NetworkGetNetworkIdFromEntity(data.inputKey), data.values)
  exports['ev-vehicles']:SetVehicleAppearance(data.inputKey, rd.app)
  exports['ev-vehicles']:SetVehicleMods(data.inputKey, rd.mods)
  -- exports['ev-vehicles']:SetVehicleColors(data.key, rd.colors)
end)

AddEventHandler("ev-car-clothing:swapCurrentOutfit", function(p1, pEntity)
  exports["ev-ui"]:openApplication("textbox", {
    callbackUrl = "ev-ui:car-clothing:swapCurrentOutfit",
    inputKey = pEntity,
    items = {
      {
        label = "Slot",
        name = "slot",
        _type = "select",
        options = {
          {
            name = "1",
            id = "1",
          },
          {
            name = "2",
            id = "2",
          },
        },
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:car-clothing:saveCurrentOutfit", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports["ev-ui"]:closeApplication("textbox")
  RPC.execute("ev-car-clothing:saveCurrentOutfit", NetworkGetNetworkIdFromEntity(data.key), data.values)
end)

AddEventHandler("ev-car-clothing:saveCurrentOutfit", function(p1, pEntity, p3)
  exports["ev-ui"]:openApplication("textbox", {
    callbackUrl = "ev-ui:car-clothing:saveCurrentOutfit",
    key = pEntity,
    items = {
      { label = "Name", name = "name" },
      {
        label = "Slot",
        name = "slot",
        _type = "select",
        options = {
          {
            name = "1",
            id = "1",
          },
          {
            name = "2",
            id = "2",
          },
        },
      },
    },
    show = true,
  })
end)

Citizen.CreateThread(function()
  exports["ev-polyzone"]:AddBoxZone("custom_car_clothing", vector3(143.13, 319.25, 112.14), 16.2, 9.2, {
    name="usethis",
    heading=295,
    minZ=110.74,
    maxZ=113.94,
  })
  exports["ev-polyzone"]:AddBoxZone("bennys", vector3(143.13, 319.25, 112.14), 16.2, 9.2, {
    name="usethis",
    heading=295,
    minZ=110.74,
    maxZ=113.94,
  })
end)
