Citizen.CreateThread(function()
    -- Reset YP Entries
    Await(SQL.execute("DELETE FROM _phone_advert"))
end)

function getYellowPageEntries()
    local data = Await(SQL.execute("SELECT * FROM _phone_advert", {}))

    if not data then return false, "Failed to fetch adverts" end

    local entries = {}

    for k,v in pairs(data) do
        entries[#entries+1] = {
            character = {
                first_name = v.first_name,
                last_name = v.last_name,
                number = v.number
            },
            text = v.text
        }
    end

    return entries and true or false, entries and entries or "Failed to fetch adverts"
end

function addYellowPageEntry(pCharacterId, pFirstName, pLastName, pNumber, pText)
    local data = Await(SQL.execute("INSERT INTO _phone_advert (cid, first_name, last_name, number, text) VALUES (@cid, @first_name, @last_name, @number, @text)", {
        cid = pCharacterId,
        first_name = pFirstName,
        last_name = pLastName,
        number = pNumber,
        text = pText
    }))

    return data and true or false, data and data or "Failed to post advert"
end

function removeYellowPageEntry(pCharacterId)
    local data = Await(SQL.execute("DELETE FROM _phone_advert WHERE cid = @cid", {
        cid = pCharacterId
    }))

    return data and true or false, data and data or "Failed to delete advert"
end