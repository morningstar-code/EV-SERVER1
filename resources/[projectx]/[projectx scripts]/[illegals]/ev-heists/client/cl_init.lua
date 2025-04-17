Citizen.CreateThread(function()
    exports["ev-polyzone"]:AddBoxZone("heist_wifi_spot_1", vector3(-223.06, -1329.84, 30.89), 10, 10, {
        heading = 0,
        minZ = 29.89,
        maxZ = 33.89,
    })
    -- exports["ev-polyzone"]:AddBoxZone("heist_wifi_spot_2", vector3(-1358.46, -756.37, 22.3), 6.4, 7.4, {
    --     heading = 37,
    --     minZ = 21.3,
    --     maxZ = 23.5,
    -- })
    -- exports["ev-polyzone"]:AddBoxZone("heist_wifi_spot_3", vector3(-1147.9, -2008.66, 13.39), 10, 10, {
    --     heading = 315,
    --     minZ = 11.99,
    --     maxZ = 15.99,
    -- })
    -- exports["ev-polyzone"]:AddBoxZone("heist_wifi_spot_4", vector3(-83.88, 367.21, 112.46), 10, 10, {
    --     heading = 335,
    --     minZ = 111.26,
    --     maxZ = 114.26,
    -- })
    exports["ev-polyzone"]:AddBoxZone("heist_wifi_spot_5", vector3(964.08, -1856.62, 31.2), 5.2, 7.2, {
      heading = 355,
      minZ = 30.0,
      maxZ = 33.0,
    })
    exports["ev-polytarget"]:AddBoxZone("lower_vault_pc_keyboard", vector3(279.57, 230.38, 97.69), 0.6, 0.4, {
        heading = 70,
        minZ = 97.29,
        maxZ = 97.69,
    })
    exports["ev-interact"]:AddPeekEntryByPolyTarget('lower_vault_pc_keyboard', {{
        event = "ev-heists:vaultLowerKeyboardInteract",
        id = "heist_lower_vault_keyboard",
        icon = "fas fa-user-secret",
        label = "Print Access Codes",
        parameters = {}
    }}, { distance = { radius = 1.5 }})
    -- non wifi spots
    exports["ev-polyzone"]:AddBoxZone("vault_lower_entrance", vector3(266.01, 231.64, 97.68), 5.2, 13.4, {
        heading = 340,
        minZ = 96.48,
        maxZ = 99.88,
    })

    -- Bay City Vault Keypad
    exports["ev-polytarget"]:AddBoxZone("baycity_vault_keypad", vector3(-1303.82, -815.56, 17.15), 0.8, 0.6, {
        heading = 38,
        minZ = 17.35,
        maxZ = 18.15,
        data = {
            id = "heist_baycity_vault_keypad",
        }
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget('baycity_vault_keypad', {{
        event = "ev-heists:client:bayCityVaultKeypad",
        id = "heist_baycity_vault_keypad",
        icon = "fas fa-user-secret",
        label = "Open Vault Door",
        parameters = {}
    }}, { distance = { radius = 1.5 }})
end)

local validZones = {
  ["heist_wifi_spot_1"] = true,
  ["heist_wifi_spot_2"] = true,
  ["heist_wifi_spot_3"] = true,
  ["heist_wifi_spot_4"] = true,
  ["heist_wifi_spot_5"] = true,
}
AddEventHandler("ev-polyzone:enter", function(zone)
    if validZones[zone] ~= true then return end
    exports["ev-ui"]:sendAppEvent("game", { location = zone })
end)
AddEventHandler("ev-polyzone:exit", function(zone)
    if validZones[zone] ~= true then return end
    exports["ev-ui"]:sendAppEvent("game", { location = "world" })
end)
