function getUser(pSource)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, "Could not get user" end

    return true, user
end

function getCharacterById(pCharacterId)
    local result = Await(SQL.execute("SELECT * FROM characters WHERE id = @id", {
        id = pCharacterId
    }))

    if not result then return false, "Could not get character" end

    return true, result[1]
end

function format_int(n)
    if not n then return 0 end
    n = tonumber(n)
    if n >= 1e14 then return tostring(n) end
    if n <= -1e14 then return "-" .. tostring(math.abs(n)) end
    local negative = n < 0
    n = tostring(math.abs(n))
    local dp = string.find(n, "%.") or #n + 1

    for i = dp - 4, 1, -3 do
        n = n:sub(1, i) .. "," .. n:sub(i + 1)
    end

    -- Make sure the amount is padded with zeroes
    if n[#n - 1] == "." then
        n = n .. "0"
    end

    return (negative and "-" or "") .. n
end