function getDOJData()
    local query = [[
        SELECT
            dd.character_id,
            dd.`status`,
            dd.job,
            CONCAT(c.first_name, ' ', c.last_name) AS name,
            c.phone_number as phone
        FROM
            _doj_duty dd
            LEFT JOIN characters c ON c.id = dd.character_id
    ]]

    local result = Await(SQL.execute(query))
    if not result then return {} end

    return result
end

function setDOJStatus(source, job, status)
    local user = exports["ev-base"]:getModule("Player"):GetUser(source)
    if not user then return false end

    local query = [[
        UPDATE _doj_duty SET `status` = @status WHERE character_id = @character_id
    ]]

    local result = Await(SQL.execute(query, {
        status = status,
        character_id = user.character.id
    }))

    if not result then return false end

    return true
end

AddEventHandler('playerDropped', function()
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    if not user then return false end

    local job = user:getVar("job")
    if job ~= "judge" and job ~= "defender" and job ~= "county_clerk" and job ~= "mayor" and job ~= "deputy_mayor" and job ~= "legal_aid" then return end

    local exists = Await(SQL.execute("SELECT * FROM _doj_duty WHERE character_id = @character_id", {
        ["@character_id"] = user.character.id
    }))
    
    if not exists[1] then return end

    local query = [[
        DELETE FROM _doj_duty WHERE character_id = @character_id AND job = @job
    ]]

    local result = Await(SQL.execute(query, {
        character_id = user.character.id,
        job = job
    }))

    if not result then return false end

    return true
end)

-- TODO: Clear DOJ duty on server start.