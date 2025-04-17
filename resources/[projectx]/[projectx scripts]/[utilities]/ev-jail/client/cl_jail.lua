local insidePrison = false
local currentZone = ""
local myCell = 1
local count = 0
local jailed = false
local listening = true
local lastMessage = 0
jailTime = 0
relogging = false

local cells = {
    vector4(1760.792, 2498.277, 45.821, 206.67),
    vector4(1763.605, 2500.153, 45.822, 212.325),
    vector4(1754.613, 2494.946, 45.81, 207.207),
    vector4(1751.794, 2493.098, 45.81, 209.161),
    vector4(1748.514, 2491.54, 45.818, 209.249),
    vector4(1745.533, 2489.968,  45.817, 210.151),
    vector4(1742.397, 2488.048, 45.816, 212.646),
    vector4(1752.396, 2470.057, 45.811, 31.353),
    vector4(1755.313, 2471.672, 45.811, 33.457),
    vector4(1758.496, 2473.426, 45.812, 29.100),
    vector4(1761.3774, 2475.235, 45.81, 31.55),
    vector4(1764.369, 2476.99, 45.81, 31.132),
    vector4(1767.599, 2478.496, 45.81, 31.683),
    vector4(1770.14, 2480.811, 45.81, 30.20),
    vector4(1773.446, 2482.107, 45.81, 32.95),
    vector4(1773.44, 2482.355, 50.422, 30.529),
    vector4(1770.552, 2480.269, 50.42, 28.78),
    vector4(1767.329, 2478.908, 50.42, 30),
    vector4(1764.29, 2477.037, 50.41, 29.97),
    vector4(1761.366, 2475.121, 50.41, 28.92),
    vector4(1758.407, 2473.542, 50.41, 29.06),
    vector4(1755.265, 2471.946, 50.41, 29.28),
    vector4(1752.255, 2470.151, 50.41, 34.43),
    vector4(1700.31, 2462.99, 50.46, 177.56),
    vector4(1763.681, 2499.915, 50.42, 208.36),
    vector4(1760.736, 2498.288, 50.42, 210.38),
    vector4(1757.64, 2496.446, 50.42, 207.32),
    vector4(1754.81, 2494.466, 50.42, 209.01),
    vector4(1751.702, 2492.914, 50.42, 209.72),
    vector4(1745.586, 2489.653, 50.42, 207.55),
    vector4(1742.522, 2487.808, 50.42, 207.51),
}

function IsNearPlayer(player)
    local ply = PlayerPedId()
    local plyCoords = GetEntityCoords(ply, 0)
    local ply2 = GetPlayerPed(GetPlayerFromServerId(player))
    local ply2Coords = GetEntityCoords(ply2, 0)
    local distance = Vdist2(plyCoords, ply2Coords)
    if(distance <= 5) then
        return true
    end
end

function JailIntro(pName, pTime, pCid, pDate)
    DoScreenFadeOut(10)
    FreezeEntityPosition(PlayerPedId(), true)
    TriggerEvent("InteractSound_CL:PlayOnOne", "handcuff", 1.0)

    Citizen.Wait(1000)

    SetEntityCoords(PlayerPedId(), 472.34, -1002.42, 26.39) 
    SetEntityHeading(PlayerPedId(), 266.6)

    Citizen.Wait(1500)
    DoScreenFadeIn(500)

    TriggerEvent("drawScaleformJail", pTime, pName, pCid, pDate)
    TriggerEvent("attachPropPoliceIdBoard", "prop_police_id_board", 28422, 0.0, 0.0, 0.1, 0.0, 0.0, 0.0)

    TriggerEvent("InteractSound_CL:PlayOnOne", "photo", 0.4)
    Citizen.Wait(3000)
    TriggerEvent("InteractSound_CL:PlayOnOne", "photo", 0.4)
    Citizen.Wait(3000)
    SetEntityHeading(PlayerPedId(), 270.0)

    TriggerEvent("InteractSound_CL:PlayOnOne", "photo", 0.4)
    Citizen.Wait(3000)
    TriggerEvent("InteractSound_CL:PlayOnOne", "photo", 0.4)
    Citizen.Wait(3000)
    SetEntityHeading(PlayerPedId(), 90.0)

    TriggerEvent("InteractSound_CL:PlayOnOne", "photo", 0.4)
    Citizen.Wait(3000)
    TriggerEvent("InteractSound_CL:PlayOnOne", "photo", 0.4)
    Citizen.Wait(3000)

    SetEntityHeading(PlayerPedId(), 180.0)

    Citizen.Wait(2000)
    DoScreenFadeOut(1100)
    Citizen.Wait(2000)
    TriggerEvent("InteractSound_CL:PlayOnOne", "jaildoor", 1.0)
    TriggerEvent("ev-jail:playerJailed", true)
    TriggerEvent("destroyProp")
end

function scaleformPaste(scaleform, obj, name, years, cid, date)
    local position = GetOffsetFromEntityInWorldCoords(obj, -0.2, -0.0132 - (GetEntitySpeed(PlayerPedId()) / 50), 0.105)
    local scale = vector3(0.41, 0.23, 1.0)
    local push = GetEntityRotation(obj, 2)

    Citizen.InvokeNative(0x87D51D72255D4E78, scaleform, position, 180.0 + push["x"], 0.0 - GetEntityRoll(obj),GetEntityHeading(obj), 1.0, 0.8, 4.0, scale, 0)

    if not date then
        date = "Mugshot Board"
    end

    if not years then
        years = 0
    end

    if not name then
        name = "No Name"
    end

    PushScaleformMovieFunction(scaleform, "SET_BOARD")
    PushScaleformMovieFunctionParameterString("LOS SANTOS POLICE DEPARTMENT")
    PushScaleformMovieFunctionParameterString(date)
    PushScaleformMovieFunctionParameterString("Sentenced " .. years .. " Months")
    PushScaleformMovieFunctionParameterString(name)
    PushScaleformMovieFunctionParameterFloat(0.0)
    PushScaleformMovieFunctionParameterString(cid)
    PushScaleformMovieFunctionParameterFloat(0.0)
    PopScaleformMovieFunctionVoid()
end

RegisterNetEvent("ev-jail:reset")
AddEventHandler("ev-jail:reset", function(startPosition, cid, name)
    insidePrison = false
    myCell = 1
    count = 0
    jailed = false
    lastMessage = 0
    TriggerEvent("ev-jail:playerJailed", false)
    RPC.execute("ev-jailbreak:LeaveJob", CurrentJob)
end)

AddEventHandler("ev-polyzone:enter", function(zone, data)
    if zone == "prison" then
        insidePrison = true
        ClearAreaOfPeds(1691.86, 2604.6, 45.55, 1000, 1)
        exports["ev-density"]:ChangeDensity("prison", 0.0)
    end
end)

AddEventHandler("ev-polyzone:exit", function(zone, data)
    if zone == "prison" then
        if jailed then
            SetEntityCoords(PlayerPedId(), cells[myCell].x, cells[myCell].y, cells[myCell].z)
            SetEntityHeading(PlayerPedId(), cells[myCell].w)
        else
            insidePrison = false
            exports["ev-density"]:ChangeDensity("prison", -1)
        end
    end
    -- currentZone = ""
end)

RegisterNetEvent("inventory-jail")
AddEventHandler("inventory-jail", function(startPosition, cid, name)
    if insidePrison then
        TriggerServerEvent("server-inventory-open", startPosition, cid, "1", name)
    end
end)

RegisterNetEvent("ev-jail:beginJail")
AddEventHandler("ev-jail:beginJail", function(pSkip, pTime, pName, pCid, pDate)
    myCell = math.random(#cells)
    jailTime = RPC.execute("ev-jail:GetJailTime")
    if pSkip then
        TriggerEvent("ev-police:cuffs:uncuff")
        TriggerServerEvent("ev-jobs:changeJob", "unemployed")
        RPC.execute("ev-jail:seizeItems")
        JailIntro(pName, pTime, pCid, pDate)
    end

    DoScreenFadeOut(1)
    SetEntityCoords(PlayerPedId(), cells[myCell].x, cells[myCell].y, cells[myCell].z)
    SetEntityHeading(PlayerPedId(), cells[myCell].w)

    Citizen.Wait(500)

    DoScreenFadeIn(1500)
    FreezeEntityPosition(PlayerPedId(), false)

    jailed = true
    lastMessage = tonumber(GetCloudTimeAsInt()) + 300

    TriggerEvent("chatMessage", "DOC", { 33, 118, 255 }, "You have " .. tostring(jailTime) .. " Remaining Months")
end)

AddEventHandler("drawScaleformJail", function(years,name,cid,date)
    if #(GetEntityCoords(PlayerPedId()) - vector3(472.92, -1011.57, 26.0)) < 10.0 then
        if count > 0 then
            count = 0
        end

        Citizen.Wait(1)

        local scaleform = RequestScaleformMovie("mugshot_board_01")
        while not HasScaleformMovieLoaded(scaleform) do
            Wait(1)
        end

        count = 10000

        while count > 0 do
            count = count - 1
            local objFound = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 10.0, `prop_police_id_board`, 0, 0, 0)
            if objFound then
                scaleformPaste(scaleform, objFound, name, years, cid, date)
            end
            Citizen.Wait(1)
        end
    end
end)

Citizen.CreateThread(function()
    exports["ev-density"]:RegisterDensityReason("prison", 69)

    exports["ev-polyzone"]:AddPolyZone("prison", {
        vector2(1829.4222412109, 2620.8461914062),
        vector2(1854.7977294922, 2700.3229980469),
        vector2(1774.4296875, 2768.7282714844),
        vector2(1647.1409912109, 2763.0681152344),
        vector2(1565.4890136719, 2683.3771972656),
        vector2(1528.6467285156, 2585.0300292969),
        vector2(1535.3923339844, 2467.546875),
        vector2(1658.5743408203, 2388.6613769531),
        vector2(1763.6359863281, 2405.6196289062),
        vector2(1830.0268554688, 2473.0979003906),
        vector2(1834.2340087891, 2579.7426757812),
        vector2(1834.2774658203, 2592.6013183594),
        vector2(1833.4014892578, 2595.6577148438),
        vector2(1818.4958496094, 2596.8950195312),
        vector2(1818.7344970703, 2611.9055175781)
    }, {
        gridDivisions = 25,
        minZ = 40,
        maxZ = 80,
    })

    exports["ev-polytarget"]:AddBoxZone("prison_food", vector3(1781.44, 2559.52, 45.67), 0.4, 5.0, {
        heading = 0,
        minZ = 45.67,
        maxZ = 45.87
    })

    exports["ev-polytarget"]:AddBoxZone("prison_services", vector3(1828.77, 2579.7, 46.01), 0.5, 0.6, {
        heading = 91,
        minZ = 46.11,
        maxZ = 47.01,
        data = {
            id = "prison_services",
        },
    })

    exports["ev-polytarget"]:AddBoxZone("inmates", vector3(1831.97, 2585.83, 46.01), 1.05, 12.4, {
        heading = 270,
        minZ = 45.01,
        maxZ = 47.51,
    })

    exports["ev-polytarget"]:AddBoxZone("inmates", vector3(1769.1, 2571.02, 45.73), 1.0, 0.7, {
        heading = 45,
        minZ = 46.03,
        maxZ = 45.58,
    })

    exports["ev-polytarget"]:AddBoxZone("prison_slushy", vector3(1778.04, 2559.94, 45.67), 0.3, 1.3, {
        heading = 0,
        minZ = 45.67,
        maxZ = 46.67,
        data = {
            id = "prison_slushy",
        },
    })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("prison_food", {{
        event = "ev-npcs:ped:keeper",
        id = "prison_food",
        icon = "utensils",
        label = "food",
        parameters = { "22" }
    }}, { distance = { radius = 3.5 } })

    exports["ev-interact"]:AddPeekEntryByPolyTarget("prison_slushy", {{
        event = "ev-jail:slushy",
        id = "prison_slushy",
        icon = "champagne-glass",
        label = "make slushy",
        parameters = { "998" }
    }}, { distance = { radius = 3.5 } })

    exports['ev-interact']:AddPeekEntryByPolyTarget("prison_services", {
        {
            event = "ev-jailbreak:PrisonServices",
            id = "prison_services_1",
            icon = "user",
            label = "Prison Services",
            parameters = {},
        }
    }, { distance = { radius = 3.5 } })

    exports['ev-interact']:AddPeekEntryByPolyTarget("inmates", {
        {
            event = "ev-jailbreak:inmates",
            id = "inmates",
            icon = "list",
            label = "current inmates",
            parameters = {},
        }
    }, { distance = { radius = 3.5 } })

    while true do
        Citizen.Wait(60000)

        if jailed then
            jailTime = RPC.execute("ev-jail:GetJailTime")
            if jailTime ~= nil and type(jailTime) == "number" then
                local newTime = jailTime - 1
                if newTime > -1 then
                    TriggerServerEvent("ev-jail:updateJailTime", newTime)
                else
                    newTime = 0
                end

                local currentTime = tonumber(GetCloudTimeAsInt())

                if currentTime > lastMessage then
                    lastMessage = currentTime + 300
                    TriggerEvent("chatMessage", "DOC: " , { 33, 118, 255 }, "You have " .. newTime .. " Remaining Months")
                end
            end
        end
    end
end)

AddEventHandler('ev-jail:slushy', function(pArgs)
    local animDictName = "mp_ped_interaction"
    RequestAnimDict(animDictName)
    while not HasAnimDictLoaded(animDictName) do
    Citizen.Wait(0)
    end
    local animLength = GetAnimDuration(animDictName, "handshake_guy_a")
    TaskPlayAnim(PlayerPedId(), animDictName, "handshake_guy_a", 1.0, 4.0, animLength, 18, 0, 0, 0, 0)

    local done = loopSkill(math.random(8, 14))

    if not done then
        ClearPedTasks(PlayerPedId())
    else
        local finished = exports['ev-taskbar']:taskBar(7500, "making a slushy")
        if finished == 100 then
            TriggerEvent("ev-npcs:ped:keeper", pArgs)
            ClearPedTasks(PlayerPedId())
        end
    end
end)

local MenuData = {}
AddEventHandler('ev-jailbreak:PrisonServices', function()
    MenuData = {
        {
            title = "Time Remaining",
            icon = "clock",
            description = "Check your remaining jail time",
            children = {
                {
                    title = "Time", description = "You have " .. jailTime .. " Remaining Months.", 
                    icons = "timer",
                    action = "ev-jailbreak:handler",
                    key = "checkTimeRemaining",
                }
            },
        },
        {
            title = "Character switch",
            icon = "user",
            description = "Go bowling with your cousin",
            children = {
                { 
                    title = "Yes", 
                    icon = "check",
                    action = "ev-jailbreak:handler", 
                    key = {swap = true, type = "changeCharacter"}
                },
                { 
                    title = "No", 
                    icon = "x",
                    action = "ev-jailbreak:handler",  
                    key = {swap = false, type = "changeCharacter"}
                },
            },
        },
        {
            title = "Make Phone call",
            description = "Make external phone calls",
            action = "ev-jailbreak:services",
        },
    }
    TriggerEvent("ev-jailbreak:refreshContacts")
    TriggerEvent("ev-jailbreak:services")
    exports['ev-ui']:showContextMenu(MenuData)
end)

AddEventHandler('ev-jailbreak:inmates', function(pParameters, pEntity, pContext)
    local m = RPC.execute("ev-jail:GetCurrInmate")
    
    if not m then
        return TriggerEvent("DoLongHudText", "No Current Inmates", 2)
    end

    exports['ev-ui']:showContextMenu(m)
end)

local getContacts = CacheableMap(function(ctx, charId)
    return RPC.execute("phone:getContacts", charId)
end, {timeToLive = 300000})

AddEventHandler('ev-jailbreak:services', function(pArgs, pEntity, pContext)
    local characterId = exports['isPed']:isPed('cid')
    local contacts = getContacts.get(characterId)

    local contactsTable = {}
    contactsTable[#contactsTable + 1] = {
        title = "*Add Contact*",
        action = "ev-jailbreak:showAddContact",
    }
    
    for v, contact in pairs(contacts) do
        contactsTable[#contactsTable + 1] = {
            title = contact.name,
            action = "ev-jailbreak:makePhoneCall",
            key = {number = contact.number},
        }
    end
    
    MenuData[#MenuData].children = contactsTable
    exports["ev-ui"]:showContextMenu(MenuData)
end)

local lastPhoneCall = nil
local cooldownTime = 60000 * 30 -- 30 Minutes
RegisterUICallback("ev-jailbreak:makePhoneCall", function(data, cb)
    if (lastPhoneCall and GetGameTimer() - lastPhoneCall < cooldownTime) then
        return TriggerEvent("DoLongHudText", "Need to wait before making another call!", 1)
    end
    
    local fromPhoneNumber = exports['isPed']:isPed('phone_number')
    local toPhoneNumber = data.key.number
    RPC.execute("phone:callStart", fromPhoneNumber, toPhoneNumber, "PAYPHONE", "*Bolingbroke*")
    lastPhoneCall = GetGameTimer()
    cb({data = {}, meta = {ok = true, message = "done"}})
end)

RegisterNetEvent("ev-jailbreak:refreshContacts")
AddEventHandler("ev-jailbreak:refreshContacts", function()
    local characterId = exports['isPed']:isPed('cid')
    getContacts.reset(characterId)
end)

RegisterUICallback("ev-jailbreak:addContact", function(data, cb)
    local characterId = exports['isPed']:isPed('cid')
    local contactName = data.values.contact_name
    local contactNumber = data.values.contact_number
    RPC.execute("phone:addContact", characterId, contactName, contactNumber)
    exports['ev-ui']:closeApplication('textbox')
    cb({data = {}, meta = {ok = true, message = "done"}})
    return TriggerEvent("DoLongHudText", "Successfully added contact!", 1)
end)

RegisterUICallback("ev-jailbreak:showAddContact", function(data, cb)
    exports['ev-ui']:openApplication('textbox', {
        callbackUrl = "ev-jailbreak:addContact",
        inputKey = 2,
        items = {
            {
                icon = "id-badge",
                label = "Contact Name",
                name = "contact_name",
            },
            {
                icon = "comments",
                label = "Contact Number",
                name = "contact_number",
            },
        },
        show = true,
    })
    cb({data = {}, meta = {ok = true, message = ""}})
    Wait(250)
    exports["ev-ui"]:SetUIFocus(true, true)
end)

RegisterUICallback("ev-jailbreak:handler", function(data, cb)
    cb({data = {}, meta = {ok = true, message = "done"}})
    exports['ev-ui']:closeApplication('contextmenu')

    local eventData = data.key
    if eventData and eventData == "checkTimeRemaining" then
        jailTime = RPC.execute("ev-jail:GetJailTime")

        if jailTime == 0 then
            DoScreenFadeOut(500)
            Citizen.Wait(1000)
            jailed = false
            TriggerServerEvent("ev-jail:updateJailTime", -1)
            SetEntityCoords(PlayerPedId(), 1837.22, 2591.43, 46.01)
            SetEntityHeading(PlayerPedId(), 176.04)
            DoScreenFadeIn(500)
        elseif jailTime == -1 then
            TriggerEvent("DoLongHudText", "Are you not under arrest?", 2)
        else
            TriggerEvent("DoLongHudText", "Your sentence is not over yet!", 2)
        end
    elseif eventData.type and eventData.type == "changeCharacter" and eventData.swap then
        TransitionToBlurred(500)
        DoScreenFadeOut(500)
        Citizen.Wait(1000)
        TriggerEvent("ev-base:clearStates")
        exports["ev-base"]:getModule("SpawnManager"):Initialize()
        relogging = true
        imjailed = false
        Wait(4000)
        relogging = false
    end
end)

RPC.register("jailbreak:attachedCollar", function(pState)
    collarAttached = not collarAttached
    TriggerEvent("ev-jail:attachedCollar", collarAttached)
    return collarAttached
end)

AddEventHandler("jailbreak:attachCollar", function(pArgs, pEntity, pContext)
    local otherPlayer = GetPlayerServerId(NetworkGetEntityOwner(pEntity))
    local result, message = RPC.execute("jailbreak:attachCollar", otherPlayer)
    TriggerEvent("DoLongHudText", message)
end)

function JailHardWork()
    local Time = RPC.execute("ev-jail:GetJailTime")
    local timeReduce = 0

    if Time > 90 then
        timeReduce = math.random(4, 7)
    elseif Time > 60 then
        timeReduce = math.random(2, 5)
    else
        timeReduce = math.random(1, 3)
    end
    return timeReduce
end
