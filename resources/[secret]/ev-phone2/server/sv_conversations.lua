function sendMessage(pNumberFrom, pNumberTo, pTextMessage)
    local data = Await(SQL.execute("INSERT INTO _phone_message (number_from, number_to, message, `timestamp`) VALUES (@number_from, @number_to, @message, @timestamp)", {
        number_from = pNumberFrom,
        number_to = pNumberTo,
        message = pTextMessage,
        timestamp = os.time()
    }))

    if not data then return false, "Failed to send message" end

    local serverId = FindServerIdByNumber(pNumberTo)
    if serverId then
        TriggerClientEvent("phone:sms:receive", serverId, pNumberFrom, pTextMessage)
    end

    return true
end

function getMessages(pSourceNumber, pTargetNumber)
    local data = Await(SQL.execute("SELECT * FROM _phone_message WHERE (number_from = @number AND number_to = @target_number) OR (number_from = @target_number AND number_to = @number)", {
        number = pSourceNumber,
        target_number = pTargetNumber
    }))

    if not data then return false, "Failed to fetch messages" end

    return true, data
end

function getConversations(pNumber)
    local data = Await(SQL.execute("SELECT * FROM _phone_message WHERE number_from = @number OR number_to = @number", {
        number = pNumber
    }))

    if not data then return false, "Failed to fetch conversations" end

    return true, data
end

function readPlayerConversations(pServerId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pServerId)
    if not user then return false, "Failed to get user" end
    return user.character.phone_number
end