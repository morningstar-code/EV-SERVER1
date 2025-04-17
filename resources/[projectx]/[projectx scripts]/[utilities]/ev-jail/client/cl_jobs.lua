foodTrays = {
    [1] = "prop_food_cb_tray_01",
    [2] = "prop_food_cb_tray_02",
    [3] = "prop_food_cb_tray_03",
    [4] = "prop_food_cb_tray_04",
    [5] = "prop_food_cb_tray_05",
    [6] = "prop_food_cb_tray_06",
    [7] = "prop_food_bs_tray_01",
    [8] = "prop_food_bs_tray_02",
    [9] = "prop_food_bs_tray_03",
    [10] = "prop_food_bs_tray_04",
    [11] = "prop_food_bs_tray_05",
    [12] = "prop_food_bs_tray_06",
    [13] = "prop_food_tray_01",
    [14] = "prop_food_tray_02",
    [15] = "prop_food_tray_03",
    [16] = "prop_food_tray_04",
    [17] = "prop_food_tray_05",
    [18] = "prop_food_tray_06"
}

eatTask = {
    ["x"] = 1783.91,
    ["y"] = 2545.77,
    ["z"] = 45.6
}

finishCleanTask = {
    ["x"] = 1782.98,
    ["y"] = 2560.88,
    ["z"] = 45.67
}

eatenRecently = false
cleanedRecently = false
CurrentJob = nil
curTaskType = "None"
jobProcess = false
lockdown = false
collarAttached = false

Citizen.CreateThread(function()
    exports["ev-polytarget"]:AddBoxZone("prison_job_panel", vector3(1758.54, 2497.49, 45.82), 0.2, 1.5, {
        heading = 300,
        minZ = 45.92,
        maxZ = 46.67,
        data = {
            id = "prison_job_panel",
        },
    })
    
    exports['ev-interact']:AddPeekEntryByPolyTarget("prison_job_panel", {
        {
            event = "ev-jailbreak:prisonJobs",
            id = "prison_job_panel",
            icon = "fas fa-list",
            label = "choose job",
            parameters = {},
        }
    }, {
        distance = {radius = 3.5}
    })
end)

AddEventHandler('ev-jailbreak:prisonJobs', function(pParameters, pEntity, pContext)
    local data = RPC.execute("ev-jailbreak:CurrentWorkers")
    local MenuData = {}

    if exports["isPed"]:isPed("myjob") == "police" then
        MenuData = {
            {
                title = "Workers",
                description = "Show Current Task & workers",
                action = "ev-jailbreak:viewActiveEmployees",
                disabled = false,
                children = {},
            },
        }
    else
        MenuData = {
            {
                title = "Jobs",
                description = "Choose one of the Available Jobs",
                disabled = false,
                children = {
                    {title = "Group #0 - Gardening", description = "Number of members: " .. data["gardening"].amount, action = "ev-jailbreak:ChooseJob", key = "gardening"},
                    {title = "Group #1 - Roam", description = "Number of members: " .. data["roam"].amount, action = "ev-jailbreak:ChooseJob", key = "roam"},
                    {title = "Group #2 - Scrapyard", description = "Number of members: " .. data["scrapyard"].amount, action = "ev-jailbreak:ChooseJob", key = "scrapyard"},
                    {title = "Group #3 - Clean Cells", description = "Number of members: " .. data["cleaner"].amount, action = "ev-jailbreak:ChooseJob", key = "cleaner"},
                    {title = "Group #4 - Workout", description = "Number of members: " .. data["workout"].amount, action = "ev-jailbreak:ChooseJob", key = "workout"},
                    {title = "Group #5 - Lockup", description = "Number of members: " .. data["lockup"].amount, action = "ev-jailbreak:ChooseJob", key = "lockup"},
                    {title = "Group #6 - Eat", description = "Number of members: " .. data["eat"].amount, action = "ev-jailbreak:ChooseJob", key = "eat"},
                    {title = "Group #7 - Kitchen", description = "Number of members: " .. data["kitchen"].amount, action = "ev-jailbreak:ChooseJob", key = "kitchen"},
                    {title = "Group #8 - Electrial", description = "Number of members: " .. data["electrial"].amount, action = "ev-jailbreak:ChooseJob", key = "electrial"},
                },
            },
            {
                title = "Quit",
                description = "Quit Your Current Shitty Job.",
                action = "ev-jailbreak:LeaveJob",
                disabled = false,
            },
        }
    end

    exports['ev-ui']:showContextMenu(MenuData)
end)

RegisterUICallback('ev-jailbreak:viewActiveEmployees', function(data, cb)
    cb({data = {}, meta = {ok = true, message = ''}})
    local employees = RPC.execute('ev-jailbreak:getActiveEmployees', CurrentJob)
    
    local mappedEmployees = {}
    
    for _, employee in pairs(employees) do
        local fancyLocationName = GetBusinessConfig(biz).name
        table.insert(mappedEmployees, {
            title = string.format("%s (%s)", employee.name, employee.cid),
            description = string.format("Clocked in at %s", fancyLocationName),
        })
    end
    if #mappedEmployees == 0 then
        table.insert(mappedEmployees, {
            title = "Nobody is clocked in currently",
        })
    end
    
    exports['ev-ui']:showContextMenu(mappedEmployees)
end)

RegisterUICallback('ev-jailbreak:ChooseJob', function(data, cb)
    cb({data = {}, meta = {ok = true, message = ''}})
    CurrentJob = data.key
    
    local msg, success = RPC.execute("ev-jailbreak:JoinCurrentJob", data.key)
    if not success then
        return TriggerEvent("DoLongHudText", msg, 2)
    end
    
    TriggerEvent("DoLongHudText", msg)
end)

RegisterUICallback('ev-jailbreak:LeaveJob', function(data, cb)
    cb({data = {}, meta = {ok = true, message = ''}})
    
    RPC.execute("ev-jailbreak:LeaveJob", CurrentJob)
    
    CurrentJob = nil
    curTaskType = "None"
    jobProcess = false
end)

function deleteClosestTray()
    local closestDist = 9999.9
    local ped = PlayerPedId()
    local closesttray
    local obj
    local curDist
    for i = 1, #foodTrays do
        obj = GetClosestObjectOfType(GetEntityCoords(ped).x, GetEntityCoords(ped).y, GetEntityCoords(ped).z, 3.0, GetHashKey(foodTrays[i]), false, true, true)
        curDist = #(GetEntityCoords(PlayerPedId(), 0) - GetEntityCoords(obj))
        if curDist < closestDist then
            closestDist = curDist
            closesttray = obj
        
        end
    end
    SetEntityVisible(closesttray, false)
end

function drink()
    ClearPedSecondaryTask(PlayerPedId())
    loadAnimDict("mp_player_intdrink")
    
    TaskPlayAnim(PlayerPedId(), "mp_player_intdrink", "loop_bottle", 8.0, 1.0, -1, 49, 0, 0, 0, 0)
    Citizen.Wait(5000)
    
    endanimation()
end

function loadAnimDict(dict)
    while (not HasAnimDictLoaded(dict)) do
        RequestAnimDict(dict)
        Citizen.Wait(5)
    end
end

function RoleplayStats()
    
    local totalroleplay = 0
    
    if exports["ev-inventory"]:hasEnoughOfItem("shitlockpick", 1, false) then
        totalroleplay = totalroleplay + 10
    end
    
    if exports["ev-inventory"]:hasEnoughOfItem("jailfood", 1, false) then
        totalroleplay = totalroleplay + 10
    end
    
    if exports["ev-inventory"]:hasEnoughOfItem("assphone", 1, false) then
        totalroleplay = totalroleplay + 15
        if math.random(10) < 3 then
            TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 3.0, 'pager', 0.4)
        end
    end
    
    if exports["ev-inventory"]:hasEnoughOfItem("slushy", 1, false) then
        totalroleplay = totalroleplay + 10
    end
    
    if math.random(70) < totalroleplay then
        TriggerEvent("DoLongHudText", "Your time has been reduced more because of your impressive rp items!")
        Wait(1000)
        TriggerServerEvent("jail:cuttime")
    end
end

function InmateAnim()
    if (DoesEntityExist(inmate) and not IsEntityDead(inmate)) then
        loadAnimDict("random@mugging4")
        TaskPlayAnim(inmate, "random@mugging4", "agitated_loop_a", 8.0, 1.0, -1, 16, 0, 0, 0, 0)
    end
end

function InmateDelete()
    if DoesEntityExist(inmate) then
        SetPedAsNoLongerNeeded(inmate)
        DeletePed(inmate)
    end
end
function InmateCreate()
    local hashKey = -1313105063
    local pedType = 5
    RequestModel(hashKey)
    while not HasModelLoaded(hashKey) do
        RequestModel(hashKey)
        Citizen.Wait(100)
    end
    inmate = CreatePed(pedType, hashKey, 1642.08, 2522.16, 45.57, 43.62, false, false)
    DecorSetBool(inmate, 'ScriptedPed', true)
end

function InmatePedSettings()
    DecorSetBool(inmate, 'ScriptedPed', true)
    SetEntityInvincible(inmate, true)
    ClearPedTasks(inmate)
    ClearPedSecondaryTask(inmate)
    TaskSetBlockingOfNonTemporaryEvents(inmate, true)
    SetPedFleeAttributes(inmate, 0, 0)
    SetPedCombatAttributes(inmate, 17, 1)
    SetPedSeeingRange(inmate, 0.0)
    SetPedHearingRange(inmate, 0.0)
    SetPedAlertness(inmate, 0)
    SetPedKeepTask(inmate, true)
end

function loopSkill(count)
    local loopCount = 0
    while loopCount < count do
        Wait(100)
        loopCount = loopCount + 1
        local finished = exports["ev-ui"]:taskBarSkill(math.random(1400, 5000), math.random(7, 12))
        if finished ~= 100 then
            return false
        end
    end
    return true
end