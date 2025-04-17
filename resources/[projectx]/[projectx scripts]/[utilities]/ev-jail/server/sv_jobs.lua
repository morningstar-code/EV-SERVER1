CurrentWorkers = {}
JobAmount = {
    ["gardening"] = {
        amount = 0
    },
    ["roam"] = {
        amount = 0
    },
    ["scrapyard"] = {
        amount = 0
    },
    ["cleaner"] = {
        amount = 0
    },
    ["workout"] = {
        amount = 0
    },
    ["lockup"] = {
        amount = 0
    },
    ["eat"] = {
        amount = 0
    },
    ["kitchen"] = {
        amount = 0
    },
    ["electrial"] = {
        amount = 0
    },
}
local MaxJobs = 7

RPC.register("ev-jailbreak:JoinCurrentJob", function(src, CurrentJob)
    local msg = "None"
    local success = false
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local info = user:getCurrentCharacter()
    if not CurrentWorkers[src] or CurrentWorkers[src] == "none" then
        if not CurrentWorkers[src] then CurrentWorkers[src] = {} end
        if JobAmount[CurrentJob].amount < MaxJobs then
            JobAmount[CurrentJob].amount = (JobAmount[CurrentJob].amount or 0) + 1
            CurrentWorkers[src] = {
                job = CurrentJob,
                pCid = info.id,
                name = info.first_name .. " " .. info.last_name,
            }
            msg = "group set"
            TriggerClientEvent("ev-jail:PrisonJob", src, CurrentJob)
            success = true
        end
    else
        msg = "You Already havea job." 
        success = false
    end

    return msg, success
end)

RPC.register("ev-jailbreak:LeaveJob", function(src, CurrentJob)
    if not src then return end
    if CurrentWorkers[src].job == CurrentJob then
        JobAmount[CurrentJob].amount = JobAmount[CurrentJob].amount - 1
        CurrentWorkers[src] = "none"
        TriggerClientEvent("DoLongHudText", src, "Fuck this shit im done", 2)
        TriggerClientEvent("ev-jail:PrisonJob", src, "none")
    end
end)

RPC.register("ev-jailbreak:getActiveEmployees", function(src, CurrentJob)
    return CurrentWorkers
end)

RPC.register("ev-jailbreak:CurrentWorkers", function(src)
    return JobAmount
end)

RPC.register("ev-jail:GetCurrentJob", function(src)
    return CurrentWorkers[src].job
end)

AddEventHandler('playerDropped', function(reason)
    local src = source
    CurrentWorkers[src] = nil
end)
