-- PDM: -44.18402, -1097.083, -40
-- Tuner: 935.63, -968.52, -40.42
-- Fastlane: -795.02, -226.4, -40

local inPolyZone = nil

-- RegisterNUICallback("ev-ui:showroomChangeCar", function(data, cb)
--   vehicle = CreateShowroomVehicle(sr, data.model)
--   SetVehicleDirtLevel(vehicle, 0.0)
--   local info, vehClass, brand = calculateStats()
--   cb({ data = { info = info, vehClass = vehClass}, meta = { ok = true, message = 'done' } })
-- end)

AddEventHandler("ev-showrooms:enterExperience", function()
  openShowroom(inPolyZone, false)
end)

Citizen.CreateThread(function()
  --[[ exports["ev-interact"]:AddPeekEntryByModel({ 1723506536 }, {{
    id = "showroom_enter_experience",
    event = "ev-showrooms:enterExperience",
    icon = "car",
    label = "View Catalog",
    parameters = {},
  }}, { distance = { radius = 1.5 } }) ]]

  exports["ev-polytarget"]:AddBoxZone("showroom_tablet1", vector3(-40.28, -1094.48, 27.27), 0.6, 0.9, {
    heading=295,
    minZ=26.27,
    maxZ=27.87,
  })
  exports["ev-polytarget"]:AddBoxZone("showroom_tablet2", vector3(-38.91, -1100.27, 27.27), 0.6, 0.9, {
    heading=290,
    minZ=26.27,
    maxZ=27.87,
  })
  exports["ev-polytarget"]:AddBoxZone("showroom_tablet3", vector3(-46.91, -1095.41, 27.27), 0.6, 0.9, {
    heading=10,
    minZ=26.27,
    maxZ=27.87,
  })
  exports["ev-polytarget"]:AddBoxZone("showroom_tablet4", vector3(-51.71, -1095.04, 27.27), 0.6, 0.9, {
    heading=229,
    minZ=26.27,
    maxZ=27.87,
  })
  exports["ev-polytarget"]:AddBoxZone("showroom_tablet5", vector3(-51.06, -1086.94, 27.27), 0.6, 0.9, {
    heading=337,
    minZ=26.27,
    maxZ=27.87,
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget('showroom_tablet1', {{
    id = "showroom_target_experience",
    event = "ev-showrooms:enterExperience", 
    icon = "car",
    label = "View Catalog",
    paramers = {},
  }}, { distance = { radius = 3.5 }  })
  exports["ev-interact"]:AddPeekEntryByPolyTarget('showroom_tablet2', {{ 
    id = "showroom_target_experience",
    event = "ev-showrooms:enterExperience", 
    icon = "car",
    label = "View Catalog",
    paramers = {},
  }}, { distance = { radius = 3.5 }  })
  exports["ev-interact"]:AddPeekEntryByPolyTarget('showroom_tablet3', {{
    id = "showroom_target_experience",
    event = "ev-showrooms:enterExperience", 
    icon = "car",
    label = "View Catalog",
    paramers = {},
  }}, { distance = { radius = 3.5 }  })
  exports["ev-interact"]:AddPeekEntryByPolyTarget('showroom_tablet4', {{
    id = "showroom_target_experience",
    event = "ev-showrooms:enterExperience", 
    icon = "car",
    label = "View Catalog",
    paramers = {},
  }}, { distance = { radius = 3.5 }  })
  exports["ev-interact"]:AddPeekEntryByPolyTarget('showroom_tablet5', {{
    id = "showroom_target_experience",
    event = "ev-showrooms:enterExperience", 
    icon = "car",
    label = "View Catalog",
    paramers = {},
  }}, { distance = { radius = 3.5 }  })

end)



experience = {
  onEnter = function(location)
    inPolyZone = location
  end,
  onLeave = function()
    inPolyZone = nil
  end,
}