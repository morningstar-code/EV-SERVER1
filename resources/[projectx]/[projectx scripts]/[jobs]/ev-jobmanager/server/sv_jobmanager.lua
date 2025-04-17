CPX.Jobs.CurPlayerJobs = {}

for k, v in pairs(CPX.Jobs.ValidJobs) do
    CPX.Jobs.CurPlayerJobs[k] = {}
end

function CPX.Jobs.IsWhiteListed(self, hexId, characterId, job, callback)
    if not hexId or not characterId then return end
    
    local q = [[SELECT * FROM jobs_whitelist WHERE cid = @cid AND job = @job LIMIT 1]]
    local v = {["owner"] = hexId, ["cid"] = characterId, ["job"] = job}
    
    exports.oxmysql:execute(q, v, function(results)
        if not results then callback(false, false) return end

        local isWhiteListed = (results and results[1]) and results[1] or false
        local rank = (isWhiteListed and results[1].rank) and results[1].rank or false
        callback(isWhiteListed, rank)
    end)
end

function CPX.Jobs.JobExists(self, job)
    return CPX.Jobs.ValidJobs[job] ~= nil
end

function CPX.Jobs.CountJob(self, job)
    if not CPX.Jobs:JobExists(job) then return 0 end
    
    local count = 0
    for k, v in pairs(CPX.Jobs.CurPlayerJobs[job]) do
        -- if job == "ems" then
        --     if v.isWhiteListed == true then
        --         count = count + 1
        --     end
        -- else
            count = count + 1
        -- end
    end
    
    return count
end

RPC.register("ev-jobmanager:jobCount", function(src, job)
    return CPX.Jobs.CountJob(src, job)
end)

function getJobCount(src, job)
    return CPX.Jobs.CountJob(src, job)
end

exports("getJobCount", getJobCount)

function CPX.Jobs.CanBecomeJob(self, user, job, callback)
    if not user then callback(false) return end
    if not user:getVar("characterLoaded") then callback(false, "Character not loaded") return end
    
    local src = user:getVar("source")
    local hexId = user:getVar("hexid")
    local characterId = user:getVar("character").id

    if not hexId or not characterId or not src then callback(false, "Id's don't exist") return end
    if not CPX.Jobs.ValidJobs[job] then callback(false, "Job isn't a valid job") return end

    if WasEventCanceled() then callback(false) return end
    
    if CPX.Jobs.ValidJobs[job].whitelisted then
        CPX.Jobs:IsWhiteListed(hexId, characterId, job, function(whiteListed, rank)
            if not whiteListed then callback(false, "You're not whitelisted for this job") return end
            callback(true, nil, rank)
        end)
        return
    end
    
    if CPX.Jobs:JobExists(job) then
        local jobTable = CPX.Jobs.ValidJobs[job]
        if jobTable and jobTable.max then
            if CPX.Jobs:CountJob(job) >= jobTable.max then callback(false, "There are too many employees for this job right now, try again later") return end
        else
            callback(true)
        end
    end
end

function CPX.Jobs.AddWhiteList(self, user, job, rank, department)
    local cid = user:getCurrentCharacter().id
    local hexId = user:getVar("hexid")
    local q = [[INSERT INTO jobs_whitelist (cid, owner, job, rank, department) VALUES (@cid, @owner, @job, @rank, @department)]]
    local v = {["cid"] = cid, ["owner"] = hexId, ["job"] = job, ["rank"] = rank, ["department"] = department}
    exports.oxmysql:execute(q, v)
end

function CPX.Jobs.RemoveWhiteList(self, cid)
    local q = [[DELETE FROM jobs_whitelist  WHERE cid = @cid]]
    local v = {["cid"] = cid}
    exports.oxmysql:execute(q, v)
end

function CPX.Jobs.SetRank(self, user, job, rank)
    local cid = user:getCurrentCharacter().id
    local q = [[UPDATE jobs_whitelist SET rank = @rank WHERE cid = @cid AND job = @job]]
    local v = {["cid"] = cid, ["rank"] = rank, ["job"] = job}
    exports.oxmysql:execute(q, v)
end

function CPX.Jobs.GetRank(self, user, job)
    local cid = user:getCurrentCharacter().id
    local q = [[SELECT rank FROM jobs_whitelist WHERE cid = @cid AND job = @job]]
    local v = {["cid"] = cid, ["job"] = job}
    local tempRank = 0

    exports.oxmysql:execute(q, v, function(results)
        if results[1] == nil then return 0 end
        tempRank = results[1].rank
    end)

    Citizen.Wait(100)
    return tempRank
end

function CPX.Jobs.SetJob(self, user, job, notify, callback)
    if not user then return false end
    if not job or type(job) ~= "string" then return false end
    if not user:getVar("characterLoaded") then return false end 

    CPX.Jobs:CanBecomeJob(user, job, function(allowed, reason, rank) 
        if not allowed then
            if reason and type(reason) == "string" then
                TriggerClientEvent("DoLongHudText", user.source, tostring(reason), 1)
            end
            return
        end

        local src = user:getVar("source")
        local oldJob = user:getVar("job")
        local hexId = user:getVar("hexid")
        local characterId = user:getVar("character").id

        if oldJob then
            CPX.Jobs.CurPlayerJobs[oldJob][src] = nil
        end

        user:setVar("job", job)
        CPX.Jobs.CurPlayerJobs[job][src] = {rank = rank and rank or 0, lastPayCheck = GetGameTimer(), isWhiteListed = false} 

        local name = CPX.Jobs.ValidJobs[job].name

        TriggerClientEvent("ev-jobmanager:playerBecameJob", src, job, name, notify)

        if CPX.Jobs:CountJob("trucker") >= 1 then
            TriggerEvent("lscustoms:IsTruckerOnline",true)
        elseif CPX.Jobs:CountJob("trucker") <= 0 then
            TriggerEvent("lscustoms:IsTruckerOnline", false)
        end

        if callback then callback() end
    end)
end

AddEventHandler("playerDropped", function(reason)
    local src = source
    for j, u in pairs(CPX.Jobs.CurPlayerJobs) do
        for k, s in pairs(u) do
            if k == src then CPX.Jobs.CurPlayerJobs[j][k] = nil end
        end
    end
end)

AddEventHandler("ev-base:characterLoaded", function(user, char)
    CPX.Jobs:SetJob(user, "unemployed", false)
end)

-- Need to think of a better way to do this, says no such export when resource is started
AddEventHandler("ev-base:exportsReady", function()
    exports["ev-base"]:addModule("JobManager", CPX.Jobs)
end)

local policebonus = 0
local emsbonus = 0
local civbonus = 0

RegisterServerEvent('updatePays')
AddEventHandler('updatePays', function(policebonus1, emsbonus1, civbonus1)
    policebonus = policebonus1
    emsbonus = emsbonus1
    civbonus = civbonus1
end)

RegisterServerEvent('updateSinglePays')
AddEventHandler('updateSinglePlays', function(bonus, bonusType)
    bonusType = bonusType
    bonus = bonus
    if bonusType == 'police' then
        policebonus = bonus
    end
    if bonusType == 'ems' then
        emsbonus = bonus
    end
    if bonusType == 'civilian' then
        civbonus = bonus
    end
end)

local BUSINESS_CODES = { 'burger_shot', 'snr_buns', 'maldinis' }

Citizen.CreateThread(function()
    while true do
        local curTime = os.time()
        for job, tbl in pairs(CPX.Jobs.CurPlayerJobs) do
            if CPX.Jobs.ValidJobs[job].paycheck then

                local payCheck = CPX.Jobs.ValidJobs[job].paycheck
                
                if CPX.Jobs.ValidJobs[job].name == "Police Officer" then
                    payCheck = payCheck + policebonus
                
                elseif CPX.Jobs.ValidJobs[job].name == "EMS" then
                    payCheck = payCheck + emsbonus
                
                else
                    payCheck = payCheck + civbonus
                end
                
                for src, data in pairs(tbl) do
                    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
                    local char = user:getCurrentCharacter()
                    local isEmployed = false
                    local businessId = ""
                    for _, biz in ipairs(BUSINESS_CODES) do
                        local employee = Await(SQL.execute("SELECT * FROM _business_employee WHERE cid = @cid AND code = @code", {
                            ["cid"] = char.id,
                            ["code"] = biz
                        })) 

                        if employee[1] and employee[1].code and employee[1].clocked_in >= 1 then
                            isEmployed = true
                            businessId = employee[1].code
                        end
                    end

                    if user then
                        if tonumber(curTime) == tonumber(data.lastPayCheck) or tonumber(data.lastPayCheck) >= 480 then
                            CPX.Jobs.CurPlayerJobs[job][src].lastPayCheck = curTime
                            TriggerEvent("server:payCheck", false, math.floor(payCheck), src)
                            exports["ev-log"]:AddLog("Job Pay", user, "User recieved paycheck, amount: " .. tostring(payCheck))
                        end
                        if isEmployed then
                            local pCheck = exports["ev-restaurants"]:getRolePaycheck(businessId, char.id)
                            if exports["ev-restaurants"]:isEmployeeSignedIn() then 
                                TriggerEvent("server:payCheck", true, math.floor(pCheck), src, businessId)
                            end
                        end
                    end
                end
            end
        end
        Citizen.Wait(2700000) -- 45m
    end
end)

RegisterServerEvent('jobssystem:jobs')
AddEventHandler('jobssystem:jobs', function(job, src)
    if src == nil or src == 0 then src = source end
    
    local jobs = exports["ev-base"]:getModule("JobManager")
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    
    if not user then return end
    if not jobs then return end

    local cid = user:getCurrentCharacter().id
    
    jobs:SetJob(user, tostring(job))
    if job == "unemployed" then
        exports["ev-phone"]:updateDOJData(cid)
    end
end)

RegisterServerEvent('ev-jobs:changeJob')
AddEventHandler('ev-jobs:changeJob', function(job)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    
    CPX.Jobs:SetJob(user, job, false)
end)

RegisterServerEvent('server:payCheck')
AddEventHandler('server:payCheck', function(isBusiness, amount, _src, Biz)
    local src = _src

    if _src then src = _src end

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end
    local success, AccountId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end
    local tax = exports["ev-financials"]:PriceWithTaxString(amount, "Personal Income")
    local taxCalc = tonumber(tax.total) - tonumber(amount) 
    local finalAmount = tonumber(amount) - taxCalc 
    local bizCode = 0

    if Biz == "snr_buns" then bizCode = 67374225 end
    if Biz == "burger_shot" then bizCode = 68737624 end
    if Biz == "maldinis" then bizCode = 68176478 end
    --TODO: Add rest of banks later
    
    if isBusiness then
        if amount == 0 or amount < 0 then return end 

        local comment = "The salary of $" .. amount .. " with $" .. taxCalc .. " of fees were deposited in the bank." 
        if not exports["ev-financials"]:DoTransaction(src, bizCode, AccountId, amount, comment, "Personal Income", "payslip") then 
          TriggerClientEvent("DoLongHudText", src, "PayCheck failed - Company funds too low - Speak with the owner or quit!.", 2)
          return false
        else
            TriggerClientEvent("DoLongHudText", src, "The salary of $" .. amount .. " with $" .. taxCalc .. " of fees were deposited in the bank.")
        end
    else
        MySQL.update.await([[
            UPDATE characters
            SET paycheck = paycheck + ?
            WHERE id = ?
        ]],
        { finalAmount, cid })

        TriggerClientEvent("DoLongHudText", src, "The salary of $" .. amount .. " with $" .. taxCalc .. " of fees were deposited in the bank.")
    end
end)

RegisterServerEvent("server:paySlipPickup")
AddEventHandler("server:paySlipPickup", function()
    local src = source
    if _src then src = _src end

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local paycheck = MySQL.scalar.await([[
        SELECT paycheck
        FROM characters
        WHERE id = ?
    ]],
    { cid })

    if paycheck and paycheck > 0 then
        local accountId = exports["ev-financials"]:getAccountId(src)
        MySQL.update.await([[
            UPDATE characters
            SET paycheck = 0
            WHERE id = ?
        ]],
        { cid })

        local s = exports["ev-financials"]:adjustAccountBalance(accountId, "add", paycheck)
        
        if not s then 
            return print("paycheck | Something went wrong") 
        end

        TriggerClientEvent("DoLongHudText", src, "Your payment of $" .. paycheck .. " Has been transferred to your account.")
    else
        TriggerClientEvent("DoLongHudText", src, "You are broke, go to work!")
    end
end)

-- RegisterCommand('addwhitelist', function(source, args)
--     -- args[1] == src
--     -- args[2] == job
--     -- args[3] == rank
--     local otherSrc = tonumber(args[1])
--     local user = exports["ev-base"]:getModule("Player"):GetUser(source)
--     local other = exports["ev-base"]:getModule("Player"):GetUser(otherSrc)
--     local rank = user:getRank()
--     local jobs = exports["ev-base"]:getModule("JobManager")
--     local characterId = user:getVar("character").id
--     local otherId = other:getVar("character").id
--     local q = [[SELECT rank FROM jobs_whitelist WHERE cid = @cid AND job = @job]]
--     local v = {["cid"] = otherId, ["@job"] = args[3]}
--     exports.oxmysql:execute(q, v, function(result)
--         if rank == "dev" or "owner" or result[1] ~= nil then
--             if rank == "dev" or "owner" or result[1].rank == 7 or result[1].rank == 6 or result[1].rank == 5 then
--                 TriggerClientEvent('DoLongHudText', tonumber(args[1]), "You have been hired with " .. args[3])
--                 jobs:AddWhiteList(other, args[2], args[3])
--             else
--                 TriggerClientEvent('DoLongHudText', source, "You are not rank 7 of the required job!")
--             end
--         else
--             TriggerClientEvent('DoLongHudText', source, "You are not apart of the required job!")
--         end
--     end)
-- end)

-- RegisterCommand('removewhitelist', function(source, args)
--     -- args[1] == src
--     -- args[2] == cid
--     local user = exports["ev-base"]:getModule("Player"):GetUser(source)
--     local rank = user:getRank()
--     local jobs = exports["ev-base"]:getModule("JobManager")
--     local characterId = user:getVar("character").id
--     local q = [[SELECT rank FROM jobs_whitelist WHERE cid = @cid AND job = @job]]
--     local v = {["cid"] = characterId, ["@job"] = args[3]}
--     print(rank)
--     exports.oxmysql:execute(q, v, function(result)
--         if args[2] == characterId then
--             TriggerClientEvent('DoLongHudText', source, "You can't fire yourself silly hehe", 2)
--             return
--         end
--         if rank == "dev" or "owner" or result[1] ~= nil then
--             if rank == "dev" or "owner" or result[1].rank == 7 or result[1].rank == 6 or result[1].rank == 5 then
--                 TriggerClientEvent('DoLongHudText', tonumber(args[1]), "You have been fired :feelsbadman:")
--                 jobs:RemoveWhiteList(args[2])
--             else
--                 TriggerClientEvent('DoLongHudText', source, "You are not rank 7 of the required job!")
--             end
--         else
--             TriggerClientEvent('DoLongHudText', source, "You are not apart of the required job!")
--         end
--     end)
-- end)

-- RegisterCommand('promote', function(source, args)
--     local user = exports["ev-base"]:getModule("Player"):GetUser(source)
--     local jobs = exports["ev-base"]:getModule("JobManager")
--     local characterId = user:getVar("character").id
--     local q = [[SELECT rank FROM jobs_whitelist WHERE cid = @cid AND job = @job]]
--     local v = {["cid"] = characterId, ["@job"] = args[3]}
--     exports.oxmysql:execute(q, v, function(result)
--         if args[2] == characterId then
--             TriggerClientEvent('DoLongHudText', source, "You can't fire yourself silly hehe", 2)
--             return
--         end
--         if result[1] ~= nil then
--             if result[1].rank == 7 then
--                 TriggerClientEvent('DoLongHudText', tonumber(args[1]), "You have been promoted to ")
--                 jobs:SetRank(tonumber(args[2]), args[3], tonumber(args[4]))
--             else
--                 TriggerClientEvent('DoLongHudText', source, "You are not rank 7 of the required job!")
--             end
--         else
--             TriggerClientEvent('DoLongHudText', source, "You are not apart of the required job!")
--         end
--     end)
-- end)