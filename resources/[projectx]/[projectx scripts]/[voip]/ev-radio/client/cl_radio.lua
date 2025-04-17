
local isRadioOpen = false
local pRadioChannel = false

function pChannelActive()
  return pRadioChannel
end

exports('pChannel', function()
    return pChannelActive()
end)

RegisterNetEvent('ChannelSet')
AddEventHandler('ChannelSet', function(chan)
  pRadioChannel = true
  SendNUIMessage({set = true, setChannel = chan})
  exports["ev-ui"]:sendAppEvent("game", {
    radioChannel = chan
  })
end)

local function formattedChannelNumber(number)
  local power = 10 ^ 1
  return math.floor(number * power) / power
end

local function handleConnectionEvent(pChannel)
    local newChannel = formattedChannelNumber(pChannel)
  
    if newChannel < 1.0 then
      pRadioChannel = false
   --   exports['ev-voice']:removePlayerFromRadio()
    --  exports["ev-voice"]:setVoiceProperty("radioEnabled", false)
    else
      pRadioChannel = true
      exports['ev-voice']:SetRadioFrequency(newChannel, true)
      exports["ev-ui"]:sendAppEvent("game", {
        radioChannel = pChannel
      })
      exports["ev-ui"]:sendAppEvent("hud", {
        displayRadioChannel = true,
      })
      Citizen.SetTimeout(5000, function()
        exports["ev-ui"]:sendAppEvent("hud", {
          displayRadioChannel = false,
        })
      end)
    end
  end

function openRadio()
    local currentJob = exports["isPed"]:isPed("myjob")

    if exports["isPed"]:isPed("incall") then
        TriggerEvent("DoShortHudText", "You can not do that while in a call!", 2)
        return
    end

    if not hasRadio() then
        TriggerEvent("DoShortHudText", "You need a radio.", 2)
        toggleRadioAnimation(false)
        return
    end

    if not isRadioOpen then
        SetNuiFocus(true, true)
        SendNUIMessage({
            open = true,
            emergency = (currentJob == "police" or currentJob == "ems" or currentJob == "doc")
        })

        toggleRadioAnimation(true)
    else
        SetNuiFocus(false, false)
        SendNUIMessage({
            close = true,
            emergency = (currentJob == "police" or currentJob == "ems" or currentJob == "doc")
        })

        toggleRadioAnimation(false)
    end

    isRadioOpen = not isRadioOpen
end

RegisterNetEvent("ev-radio:setChannel", function(params)
    local result = handleConnectionEvent(params[1])
    if not result then return end
    
    pRadioChannel = true
    SendNUIMessage({
        setChannel = params[1],
    })
end)

RegisterNetEvent("ChannelSet", function(chan)
    local result = handleConnectionEvent(chan)
    if not result then return end
    pRadioChannel = true
    SendNUIMessage({
        setChannel = chan,
    })
end)

RegisterNetEvent("ev-radio:updateRadioState", function (frequency, powered)
    local result = handleConnectionEvent(frequency)
    if not result then return end
    pRadioChannel = true
    SendNUIMessage({
        setChannel = frequency,
        setState = powered,
    })
end)

AddEventHandler("ev-inventory:itemUsed", function(item)
    if item ~= "radio" and item ~= "civradio" then return end
    openRadio()
end)

AddEventHandler("ev-inventory:itemCheck", function (item, state, quantity)
    if item ~= "civradio" and item ~= "radio" then return end
    if state or quantity > 0 then return end
    pRadioChannel = false

    exports["ev-voice"]:SetRadioPowerState(false)

    SendNUIMessage({
        setChannel = 0,
        setState = false,
    })

    TriggerEvent("DoLongHudText", "You have been disconnected from the radio.")
end)

RegisterNUICallback("poweredOn", function(data, cb)
    pRadioChannel = true
    PlaySound(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", 0, 0, 1)
    exports["ev-voice"]:SetRadioPowerState(true)
end)

RegisterNUICallback("poweredOff", function(data, cb)
    pRadioChannel = false
    PlaySound(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", 0, 0, 1)
    exports["ev-voice"]:SetRadioPowerState(false)
    TriggerServerEvent("TokoVoip:removePlayerFromAllRadio")
end)

RegisterNUICallback("setRadioChannel", function(data, cb)
    TriggerEvent("InteractSound_CL:PlayOnOne", "radioclick", 0.6)
    local success = handleConnectionEvent(data.channel)
    cb(success)
    if not success then return end
    cb(success)
end)

RegisterNUICallback("volumeUp", function(data, cb)
    PlaySound(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", 0, 0, 1)
    exports["ev-voice"]:IncreaseRadioVolume()
end)

RegisterNUICallback("volumeDown", function(data, cb)
    PlaySound(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", 0, 0, 1)
    exports["ev-voice"]:DecreaseRadioVolume()
end)

RegisterNUICallback("close", function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        close = true,
    })

    isRadioOpen = false

    toggleRadioAnimation(false)
end)

Citizen.CreateThread(function()
    exports["ev-keybinds"]:registerKeyMapping("", "Radio", "Open", "+handheld", "-handheld", ";")
    RegisterCommand("+handheld", openRadio, false)
    RegisterCommand("-handheld", function() end, false)
end)