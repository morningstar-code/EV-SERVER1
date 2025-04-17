local function hasEmergencyJob()
    
    return false
end

local function hasPhone()
    return exports["ev-inventory"]:hasEnoughOfItem("mobilephone", 1, false, true) or
        exports["ev-inventory"]:hasEnoughOfItem("stoleniphone", 1, false, true) or
        exports["ev-inventory"]:hasEnoughOfItem("stolens8", 1, false, true) or
        exports["ev-inventory"]:hasEnoughOfItem("stolennokia", 1, false, true) or
        exports["ev-inventory"]:hasEnoughOfItem("stolenpixel3", 1, false, true) or
        exports["ev-inventory"]:hasEnoughOfItem("boomerphone", 1, false, true)
end

local function canUsePhone()
    return not isDead
        and not exports["isPed"]:isPed("disabled")
        and not exports["isPed"]:isPed("handcuffed")
end

local function hasVPN() 
    if exports['ev-inventory']:hasEnoughOfItem('vpnxj', 1, false, true) then
        local info = exports["ev-inventory"]:GetInfoForFirstItemOfName("vpnxj") 
        if info.quality <= 0 then
            TriggerEvent('DoLongHudText', 'Seems your VPN is dead, You need a new one!', 2)
            return false
        else 
            return true
        end
    end
end 

function LoadAnimationDic(dict)
    if not HasAnimDictLoaded(dict) then
        RequestAnimDict(dict)

        while not HasAnimDictLoaded(dict) do
            Citizen.Wait(0)
        end
    end
end

local myIdentifiers = {}
Citizen.CreateThread(function()
    Wait(5000)
    print("[IDENTIFIERS] Setting identifiers")
    TriggerServerEvent("ev-phone:setIdentifiers")
end)

RegisterNetEvent("ev-phone:setIdentifiersClient")
AddEventHandler("ev-phone:setIdentifiersClient", function(identifiers)
    print("[IDENTIFIERS] Successfully set identifiers", json.encode(identifiers))
    myIdentifiers = identifiers
end)

function generalPhone()
    if not insidePrompt and hasPhone() and canUsePhone() and not inventoryDisabled and not forceInventoryDisabled then
        LoadAnimationDic("cellphone@")
        TaskPlayAnim(PlayerPedId(), "cellphone@", "cellphone_text_read_base", 2.0, 3.0, -1, 49, 0, 0, 0, 0)
        TriggerEvent("attachItemPhone", "phone01")
        local hasRaceUsbAndAlias = exports["ev-racing"]:getHasRaceUsbAndAlias()
        print(json.encode(hasRaceUsbAndAlias))
        exports["ev-ui"]:openApplication("phone", {
            has_emergency_job = exports["isPed"]:isPed("myJob") == "police" or exports["isPed"]:isPed("myJob") == "ems",
            has_vpn = hasVPN(),
            has_usb_fleeca = exports["ev-inventory"]:hasEnoughOfItem("heistusb4", 1, false, true),
            has_usb_paleto = exports["ev-inventory"]:hasEnoughOfItem("heistusb1", 1, false, true),
            has_usb_upper = exports["ev-inventory"]:hasEnoughOfItem("heistusb2", 1, false, true),
            has_usb_lower = exports["ev-inventory"]:hasEnoughOfItem("heistusb3", 1, false, true),
            has_usb_racing_create = hasRaceUsbAndAlias.has_usb_racing_create,
            has_usb_racing = hasRaceUsbAndAlias.has_usb_racing,
            has_usb_pd_racing = hasRaceUsbAndAlias.has_usb_pd_racing,
            racing_alias = hasRaceUsbAndAlias.racingAlias,
            identifiers = myIdentifiers
        })
    end
end

function handheld() 
    if not insidePrompt then
        TriggerEvent("radioGui")
    end
end

Citizen.CreateThread(function()
    exports["ev-keybinds"]:registerKeyMapping("", "Phone", "Open", "+generalPhone", "-generalPhone", "P")
    RegisterCommand('+generalPhone', generalPhone, false)
    RegisterCommand('-generalPhone', function() end, false)

    exports["ev-keybinds"]:registerKeyMapping("", "Radio", "Open", "+handheld", "-handheld", ";")
    RegisterCommand('+handheld', handheld, false)
    RegisterCommand('-handheld', function() end, false)
end)