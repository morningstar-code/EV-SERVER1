-- PRE SPAWN
local charSpawned = false

local pedId, plyId = PlayerPedId(), PlayerId()

function GetPed()
    return pedId
end

function GetPlayer()
    return plyId
end

Citizen.CreateThread(function()
    while not charSpawned do
        DisplayRadar(0)
        Citizen.Wait(0)
    end
end)

AddEventHandler('np-config:configReady', function()
    loadPublicData()
end)

function loadPublicData()
    local showroomPurchase = exports['np-config']:GetMiscConfig('showrooms.catalog.purchase')
    local skipMdwProfileCheck = exports['np-config']:GetMiscConfig('mdw.profiles.skip')

    sendAppEvent("game", {
        showroomPurchaseBtn = showroomPurchase,
        skipMdwProfileCheck = skipMdwProfileCheck,
    })
end

function loadTaxData()
    local _,taxLevels = RPC.execute("GetTaxLevels")
    local taxes = {}
    for _,tax in ipairs(taxLevels) do
        taxes[tax.id] = tax.level
    end
    sendAppEvent("game", {
        taxLevels = taxes
    })
end

-- CHAR SPAWN
function getCharacterInfo()
    local characterId = exports["isPed"]:isPed("cid")
    local firstName = exports["isPed"]:isPed("firstname")
    local lastName = exports["isPed"]:isPed("lastname")
    local phoneNumber = exports["isPed"]:isPed("phone_number")

    return characterId, firstName, lastName, phoneNumber
end

function sendCharacterData()
    Citizen.CreateThread(function()
        local characterId, firstName, lastName, phoneNumber = getCharacterInfo()
        if not characterId then return end
        local hasBankAccount, bankAccountId = RPC.execute("GetDefaultBankAccount", characterId, true)
        local hasEmailAddress, emailAddress = RPC.execute("np-phone:getEmailAddress")
        local character = {
            id = characterId,
            first_name = firstName,
            job = "",
            last_name = lastName,
            number = tostring(phoneNumber),
            bank_account_id = hasBankAccount and bankAccountId or -1,
            server_id = GetPlayerServerId(PlayerId()), -- in game session id
            email = hasEmailAddress and emailAddress or false
        }
        SendUIMessage({ source = "np-nui", app = "character", data = character });

        Citizen.Wait(5000)

        TriggerEvent('np-ui:phoneReady')
        TriggerServerEvent('np-ui:phoneReady')
    end)
end

AddEventHandler('np-ui:updateCharacterData', function()
    sendCharacterData()
end)

RegisterNetEvent("np-spawn:characterSpawned")
AddEventHandler("np-spawn:characterSpawned", function()
    charSpawned = true
    Citizen.CreateThread(function()
        DisplayRadar(0)
        SetRadarBigmapEnabled(true, false)
        Citizen.Wait(0)
        SetRadarBigmapEnabled(false, false)
        DisplayRadar(0)
        Citizen.Wait(0)
        sendCharacterData()
        --local systemSettings = RPC.execute("GetSystemSettings")
        --sendAppEvent("system", systemSettings) -- SYSTEM DATA HERE
        sendAppEvent("hud", {
            display = true,
        })
        -- loadTaxData()
        startHealthArmorUpdates()
    end)
end)

AddEventHandler("np-ui:restarted", function()
    TriggerEvent("hud:saveCurrentMeta")
    TriggerServerEvent("police:SetMeta")

    charSpawned = true
    Citizen.CreateThread(function()
        DisplayRadar(0)
        SetRadarBigmapEnabled(true, false)
        Citizen.Wait(0)
        SetRadarBigmapEnabled(false, false)
        DisplayRadar(0)
        Citizen.Wait(0)
        sendCharacterData()
        --local systemSettings = RPC.execute("GetSystemSettings")
        --sendAppEvent("system", systemSettings) -- SYSTEM DATA HERE
        sendAppEvent("hud", {
            display = true,
        })
        -- loadTaxData()
        startHealthArmorUpdates()
    end)
end)

RegisterNetEvent("timeheader")
AddEventHandler("timeheader", function(pHour, pMinutes)
    setGameValue("time", ("%s:%s"):format(pHour > 9 and pHour or "0" .. pHour, pMinutes > 9 and pMinutes or "0" .. pMinutes))
end)

RegisterNetEvent("nns_weather:weatherHasChanged")
AddEventHandler("nns_weather:weatherHasChanged", function(pWeather)
    setGameValue("weather", pWeather.weather[1])
    setGameValue("weatherIcon", getWeatherIcon(pWeather.weather[1]))
end)

-- Please lua, get yourself a GOD DAMN FUCKING SWITCH CASE FUCKING IDIOT PIECE OF SHIT
function getWeatherIcon(pWeather)
    if pWeather == "EXTRASUNNY" or pWeather == "CLEAR" then
        return "sun"
    elseif pWeather == "THUNDER" then
        return "poo-storm"
    elseif pWeather == "CLEARING" or pWeather == "OVERCAST" then
        return "cloud-sun-rain"
    elseif pWeather == "CLOUD" then
        return "cloud"
    elseif pWeather == "RAIN" then
        return "cloud-rain"
    elseif pWeather == "SMOG" or pWeather == "FOGGY" then
        return "smog"
    end
end

CreateThread(function()
    SetPedMinGroundTimeForStungun(pedId, 5000)
    SetEntityProofs(pedId, false, false, false, false, false, true, false, false)
    SetPlayerHealthRechargeMultiplier(plyId, 0.0)
    SetPlayerHealthRechargeLimit(plyId, 0.0)
    SetPedConfigFlag(pedId, 184, true)
    while true do
        if GetPed() ~= PlayerPedId() then
            pedId = PlayerPedId()
            SetPedMinGroundTimeForStungun(pedId, 5000)
            SetEntityProofs(pedId, false, false, false, false, false, true, false, false)
            SetPedConfigFlag(pedId, 184, true)
            SetPlayerHealthRechargeMultiplier(plyId, 0.0)
            SetPlayerHealthRechargeLimit(plyId, 0.0)
        end
        if GetPlayer() ~= PlayerId() then
            plyId = PlayerId()
            SetPlayerHealthRechargeMultiplier(plyId, 0.0)
            SetPlayerHealthRechargeLimit(plyId, 0.0)
        end
        SetRadarBigmapEnabled(false, false)
        Wait(2000)
    end
end)

-- DISABLE BLIND FIRING
Citizen.CreateThread(function()
    while true do
        if IsPedInCover(GetPed(), 0) and not IsPedAimingFromCover(GetPed()) then
            DisablePlayerFiring(GetPed(), true)
        end
        Citizen.Wait(0)
    end
end)