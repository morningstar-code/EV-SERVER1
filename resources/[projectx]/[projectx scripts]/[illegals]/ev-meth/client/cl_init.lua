local config = nil
function getConfig()
    return config
end

Citizen.CreateThread(function()
    config = RPC.execute("ev-meth:getConfig")
    -- for _, v in pairs(config.ACTIVE_CORNERS) do
    --     if v.enabled then
    --         exports["ev-polyzone"]:AddBoxZone(
    --             "meth_corner",
    --             vector3(v.polyzone.coords[1], v.polyzone.coords[2], v.polyzone.coords[3]),
    --             v.polyzone.h,
    --             v.polyzone.w,
    --             v.polyzone.options
    --         )
    --     end
    -- end
    for _, v in pairs(config.ACTIVE_LABS) do
        if v.enabled then
            exports["ev-polyzone"]:AddBoxZone(
                "methlab", 
                vector3(v.polyzone.coords[1], v.polyzone.coords[2], v.polyzone.coords[3]), 
                v.polyzone.h, 
                v.polyzone.w, 
                v.polyzone.options
            )
            for k, target in pairs(v.polytargets) do
              exports["ev-polytarget"]:AddBoxZone(
                "methlab_target_" .. k,
                vector3(target.coords.x, target.coords.y, target.coords.z),
                target.width,
                target.length,
                target.options
              )
            end
        end
    end
    local defaultOptions = { distance = { radius = 1.5 } }
    exports['ev-interact']:AddPeekEntryByPolyTarget("methlab_target_laptop", {{
      id = "meth_start_cooking",
      event = "ev-meth:startCooking",
      icon = "fas fa-stroopwafel",
      label = "Start Cooking",
      parameters = {},
    }}, defaultOptions)
    exports['ev-interact']:AddPeekEntryByPolyTarget("methlab_target_fridge", {{
      id = "meth_adjust_fridge_temp",
      event = "ev-meth:adjustFridgeTemp",
      icon = "fas fa-thermometer-quarter",
      label = "Adjust Temperature",
      parameters = {},
    }}, defaultOptions)
    exports['ev-interact']:AddPeekEntryByPolyTarget("methlab_target_dis_settings", {{
      id = "meth_adjust_distil_settings",
      event = "ev-meth:adjustDistilSettings",
      icon = "fas fa-sliders-h",
      label = "Adjust Settings",
      parameters = {},
    }}, defaultOptions)
    exports['ev-interact']:AddPeekEntryByPolyTarget("methlab_target_dis_steam", {{
      id = "meth_adjust_steam_level",
      event = "ev-meth:adjustSteamLevel",
      icon = "fas fa-bong",
      label = "Adjust Steam Levels",
      parameters = {},
    }}, defaultOptions)
    exports['ev-interact']:AddPeekEntryByPolyTarget("methlab_target_settings", {{
      id = "meth_adjust_mixer_settings",
      event = "ev-meth:adjustMixerSettings",
      icon = "fas fa-blender",
      label = "Adjust Mixer Settings",
      parameters = {},
    }}, defaultOptions)
    exports['ev-interact']:AddPeekEntryByPolyTarget("methlab_target_temperature", {{
      id = "meth_adjust_mixer_temp",
      event = "ev-meth:adjustMixerTemp",
      icon = "fas fa-thermometer-full",
      label = "Adjust Mixer Temperature",
      parameters = {},
    }}, defaultOptions)
    exports['ev-interact']:AddPeekEntryByPolyTarget("methlab_target_drop", {{
      id = "meth_add_ingredient",
      event = "ev-meth:addIngredient",
      icon = "fas fa-mortar-pestle",
      label = "Drop Ingredients",
      parameters = {},
    }}, defaultOptions)
    exports['ev-interact']:AddPeekEntryByModel({ 652625140, 1868096318, 974707040 }, {{
      id = "meth_pickup_ingredient",
      event = "ev-meth:pickupIngredient",
      icon = "fas fa-hand-holding",
      label = "Pick up Ingredients",
      parameters = {},
    }}, defaultOptions)
end)


AddEventHandler("ev-meth:purchaseMethInformation", function() -- maybe change this
    local info = RPC.execute("ev-meth:MethInformation")
    exports['ev-ui']:showContextMenu(info)
end)

RegisterUICallback('ev-meth:purchaseMethInformation', function(data, cb)
  cb({data = {}, meta = {ok = true, message = ''}})
  
  local success, msg = RPC.execute("ev-meth:PurchaseMethInformation", data.key)
  if not success then
      return TriggerEvent("DoLongHudText", msg, 2)
  end
end)

RegisterUICallback('ev-meth:purchaseCraftingnformation', function(data, cb)
  cb({data = {}, meta = {ok = true, message = ''}})
  
  local success, msg = RPC.execute("ev-meth:PurchaseCraftingnInformation", data.key)
  if not success then
      return TriggerEvent("DoLongHudText", msg, 2)
  end
end)
