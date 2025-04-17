local hospitals = {
    --['pillbox'] = {isTriageEnabled = false},
    --['sandy'] = {isTriageEnabled = false},
    ['viceroy'] = {isTriageEnabled = false}, --TODO: Can only do one for some lame reason
}

local doctors = {}

RegisterNetEvent("doctor:setTriageState")
AddEventHandler("doctor:setTriageState", function(pHospital, pState)
    local src = source
    hospitals[pHospital].isTriageEnabled = pState
    doctors[pHospital] = src
end)
 
RegisterNetEvent("ev-healthcare:playerRespawn")
AddEventHandler("ev-healthcare:playerRespawn", function(pHospital)
    local src = source
    print("pHospital", pHospital)
end)

local lastTime = 0 
RegisterNetEvent("phone:triggerPager")
AddEventHandler("phone:triggerPager", function(pHospital)
    local src = source
    local currentTime = GetGameTimer()
    
    if lastTime == 0 or lastTime + (5 * 60 * 1000) < currentTime then
        if not hospitals[pHospital].isTriageEnabled then
            TriggerClientEvent("ev-healthcare:pageDoctor", src, pHospital)
            lastTime = currentTime
        end
    end
end)

RPC.register("ev-healthcare:payReviveFees", function(src)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    local success, AccountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local cash = user:getCash()
    local bank = exports["ev-financials"]:getAccountBalance(AccountId)

    if bank > 250 then
        local rBank = exports["ev-financials"]:DoBusinessTransaction(src, AccountId, 12, 250, "Services", "Hospital fees", cid, src, "purchase")
        if not rBank then
            return false
        end
        return true
    else
        if cash > 250 then
            local rCash = exports["ev-financials"]:DoCashTransaction(src, 12, "Services", 250, "Hospital fees", "purchase")
            if not rCash then
                return false
            end
            return true
        end
    end

    return false
end)

RPC.register("ev-hospital:updateJobState", function(src, pRank, pState, pID, pDepartment)
    local player = exports["ev-base"]:getModule("Player"):GetUser(src)
    local jobs = exports["ev-base"]:getModule("JobManager")
    local currRank = jobs:GetRank(player, "police")
    
    local currJob = "ems"
    local rank = 1

    if pRank == "doctor" then
        currJob = "doctor"
    elseif pRank == "therapist" then
        currJob = "therapist"
    else
        currJob = "ems"
        rank = pRank
    end

    if currRank > 3 then
        if pState == 1 then
            local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pID))
            jobs:AddWhiteList(user, currJob, rank, pDepartment)
            return true
        elseif pState == 2 then
            local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(pID))
            jobs:SetRank(user, currJob, rank)
            return true
        else
            jobs:RemoveWhiteList(tonumber(pID))
            return true
        end
    end
end)