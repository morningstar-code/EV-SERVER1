function getContacts(pCharacterId)
    local data = Await(SQL.execute("SELECT * FROM _phone_contact WHERE cid = @cid", {
        cid = pCharacterId
    }))

    if not data then return false, "Failed to fetch contacts" end

    return true, data
end

function addContact(pCharacterId, pName, pNumber)
    local data = Await(SQL.execute("INSERT INTO _phone_contact (cid, name, number) VALUES (@cid, @name, @number)", {
        cid = pCharacterId,
        name = pName,
        number = pNumber
    }))

    if not data then return false, "Failed to add contact" end

    return true
end

function deleteContact(pId)
    local data = Await(SQL.execute("DELETE FROM _phone_contact WHERE id = @id", {
        id = pId
    }))

    if not data then return false, "Failed to delete contact" end

    return true
end