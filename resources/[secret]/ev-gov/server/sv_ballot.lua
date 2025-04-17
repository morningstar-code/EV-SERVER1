function getBallotsHistory()
    local query = [[
        SELECT
            b.id,
            b.name,
            b.description,
            b.multi,
            b.start_date,
            b.end_date,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', bo.id,
                        'name', bo.name,
                        'description', bo.description,
                        'icon', bo.icon,
                        'party', bo.party,
                        'vote_count', bo.vote_count
                    )
                )
                FROM _ballot_option bo
                WHERE bo.ballot_id = b.id
            ) AS options
        FROM
            _ballot b
    ]]

    local result = Await(SQL.execute(query))

    if result == nil then
        return false, "Failed to get ballots"
    end

    for i = 1, #result do
        result[i].options = json.decode(result[i].options)
    end

    return true, result
end

function getBallot(id)
    local query = [[
        SELECT
            b.id,
            b.name,
            b.description,
            b.multi,
            b.start_date,
            b.end_date,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', bo.id,
                        'name', bo.name,
                        'description', bo.description,
                        'icon', bo.icon,
                        'party', bo.party,
                        'vote_count', bo.vote_count
                    )
                )
                FROM _ballot_option bo
                WHERE bo.ballot_id = b.id
            ) AS options
        FROM
            _ballot b
        WHERE
            b.id = @id
    ]]

    local result = Await(SQL.execute(query, {
        id = id
    }))

    if result == nil then
        return false, "Failed to get ballot"
    end

    if #result == 0 then
        return false, "Ballot not found"
    end

    result[1].options = json.decode(result[1].options)

    return result[1]
end

function createBallot(name, description, multi, start_date, end_date)
    local result = Await(SQL.execute("INSERT INTO _ballot (name, description, multi, start_date, end_date) VALUES (@name, @description, @multi, @start_date, @end_date)", {
        name = name,
        description = description,
        multi = multi,
        start_date = start_date,
        end_date = end_date
    }))

    if result.affectedRows == 0 then
        return false, "Failed to create ballot"
    end

    return true
end

function editBallot(id, name, description, multi, start_date, end_date)
    local result = Await(SQL.execute("UPDATE _ballot SET name = @name, description = @description, multi = @multi, start_date = @start_date, end_date = @end_date WHERE id = @id", {
        id = id,
        name = name,
        description = description,
        multi = multi,
        start_date = start_date,
        end_date = end_date
    }))

    if result.affectedRows == 0 then
        return false, "Failed to edit ballot"
    end

    return true
end

function deleteBallot(id)
    local ballotDelete = Await(SQL.execute("DELETE FROM _ballot WHERE id = @id", {
        id = id
    }))

    if ballotDelete.affectedRows == 0 then
        return false, "Failed to delete ballot"
    end

    local ballotOptionDelete = Await(SQL.execute("DELETE FROM _ballot_option WHERE ballot_id = @id", {
        id = id
    }))

    if ballotOptionDelete.affectedRows == 0 then
        return false, "Failed to delete ballot options"
    end

    return true
end

function createBallotOption(ballot_id, name, description, icon, party)
    local result = Await(SQL.execute("INSERT INTO _ballot_option (ballot_id, name, description, icon, party) VALUES (@ballot_id, @name, @description, @icon, @party)", {
        ballot_id = ballot_id,
        name = name,
        description = description,
        icon = icon,
        party = party
    }))

    if result.affectedRows == 0 then
        return false, "Failed to create ballot option"
    end

    return true
end

function deleteBallotOption(id)
    local result = Await(SQL.execute("DELETE FROM _ballot_option WHERE id = @id", {
        id = id
    }))

    if result.affectedRows == 0 then
        return false, "Failed to delete ballot option"
    end

    return true
end

function getBallots()
    local query = [[
        SELECT
            b.id,
            b.name,
            b.description,
            b.multi,
            b.start_date,
            b.end_date,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', bo.id,
                        'name', bo.name,
                        'description', bo.description,
                        'icon', bo.icon,
                        'party', bo.party
                    )
                )
                FROM _ballot_option bo
                WHERE bo.ballot_id = b.id
            ) AS options
        FROM
            _ballot b
        WHERE
            b.start_date <= UNIX_TIMESTAMP()
            AND b.end_date >= UNIX_TIMESTAMP()
    ]]

    local result = Await(SQL.execute(query))

    if result.affectedRows == 0 then
        return false, "Failed to get ballots"
    end

    for i = 1, #result do
        result[i].options = json.decode(result[i].options)
        if (result[i].multi) then
            result[i].selected = {}
        end
    end

    return true, result
end

function submitBallotResult(choices)
    if choices == nil then
        return false, "No choices"
    end

    local choice = choices[1]
    local ballot_id = choice.id
    local ballot_options = choice.choices

    if ballot_options == nil then
        return false, "No choices"
    end

    local ballot = getBallot(ballot_id)

    if ballot == nil then
        return false, "Ballot not found"
    end

    if ballot.multi == 0 and #ballot_options > 1 then
        return false, "Ballot is not multi"
    end

    for j = 1, #ballot_options do
        local ballot_option = ballot_options[j]

        local query = [[
            UPDATE
                _ballot_option
            SET
                vote_count = vote_count + 1
            WHERE
                id = @id
                AND ballot_id = @ballot_id
        ]]

        local result = Await(SQL.execute(query, {
            id = ballot_option,
            ballot_id = ballot_id
        }))

        if result.affectedRows == 0 then
            return false, "Failed to submit ballot result"
        end
    end

    return true
end -- TODO: Vote tracker, so people can't vote twice. (SQL Table)

function getElectionsData()
    local upcoming = {}
    local recent = {}

    local query = [[
        SELECT
            b.id,
            b.name,
            b.description,
            b.multi,
            b.start_date,
            b.end_date,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', bo.id,
                        'name', bo.name,
                        'description', bo.description,
                        'icon', bo.icon,
                        'party', bo.party,
                        'vote_count', bo.vote_count
                    )
                )
                FROM _ballot_option bo
                WHERE bo.ballot_id = b.id
            ) AS options
        FROM
            _ballot b
        WHERE
            b.start_date >= UNIX_TIMESTAMP()
        ORDER BY
            b.start_date ASC
    ]]

    local result = Await(SQL.execute(query))

    if result == nil then
        return false, "Failed to get elections data"
    end

    for i = 1, #result do
        result[i].options = json.decode(result[i].options)
        upcoming[#upcoming + 1] = result[i]
    end

    local query = [[
        SELECT
            b.id,
            b.name,
            b.description,
            b.multi,
            b.start_date,
            b.end_date,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', bo.id,
                        'name', bo.name,
                        'description', bo.description,
                        'icon', bo.icon,
                        'party', bo.party,
                        'vote_count', bo.vote_count
                    )
                )
                FROM _ballot_option bo
                WHERE bo.ballot_id = b.id
            ) AS options
        FROM
            _ballot b
        WHERE
            b.end_date <= UNIX_TIMESTAMP()
        ORDER BY
            b.end_date DESC
        LIMIT 5
    ]]

    local result = Await(SQL.execute(query))

    if result == nil then
        return false, "Failed to get elections data"
    end

    for i = 1, #result do
        result[i].options = json.decode(result[i].options)
        recent[#recent + 1] = result[i]
    end

    return true, {
        upcoming = upcoming,
        recent = recent
    }
end