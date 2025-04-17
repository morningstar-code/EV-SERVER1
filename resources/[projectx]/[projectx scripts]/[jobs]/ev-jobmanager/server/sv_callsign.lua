function getCallsign(pSrc, pJob)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSrc) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local callSign = MySQL.query.await([[
        SELECT callsign, type
        FROM jobs_whitelist
        WHERE cid = ? AND job = ?
    ]],
    { cid, pJob })

    if not callSign[1] then return false end

    return callSign[1]
end

function getDepartment(pSrc, pJob)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSrc) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local department = MySQL.scalar.await([[
        SELECT department
        FROM jobs_whitelist
        WHERE cid = ? AND job = ?
    ]],
    { cid, pJob })
    if not department then return end
    
    return department
end

function setCallsign(cid, job, callsign, pType)
    local exist = MySQL.scalar.await([[
        SELECT id
        FROM jobs_whitelist
        WHERE cid = ? AND job = ?
    ]],
    { cid, job})

    if exist then
        local affectedRows = MySQL.update.await([[
            UPDATE jobs_whitelist
            SET callsign = ?, type = ?
            WHERE cid = ? AND job = ?
        ]],
        { callsign, pType, cid, job })

        if not affectedRows or affectedRows < 1 then
            return false, "Database update erorr"
        end

        return true, "Callsign updated"
    end
end

exports("getCallsign", getCallsign)
exports("getDepartment", getDepartment)
exports("setCallsign", setCallsign)

RPC.register("ev-jobs:getCallsign", function(src, job)
    return getCallsign(src, job)
end)

RPC.register("ev-jobs:setCallsign", function(src, cid, job, callsign, pType)
    return setCallsign(cid, job, callsign, pType)
end)