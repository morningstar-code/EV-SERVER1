RegisterServerEvent('server:alterStress')
AddEventHandler('server:alterStress', function(positive, alteredValue)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(source)
    local stresslevel = user:getStressLevel()
    if positive then
        stresslevel = stresslevel + alteredValue
    else
        stresslevel = stresslevel - alteredValue
    end
    if stresslevel > 10000 then stresslevel = 10000 end
    if stresslevel < 0 then stresslevel = 0 end
    user:alterStressLevel(stresslevel)

    local updated = Await(SQL.execute("UPDATE characters SET stress_level = @stress_level WHERE id = @id", {
        stress_level = stresslevel,
        id = user.character.id
    }))

    if not updated then
        print("Failed to update stress level for " .. user.character.id)
    end

    TriggerClientEvent("client:updateStress", src, stresslevel)
end)

RegisterServerEvent('server:setStress')
AddEventHandler('server:setStress', function(pSource, pStressValue)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return end
    user:alterStressLevel(pStressValue)

    local updated = Await(SQL.execute("UPDATE characters SET stress_level = @stress_level WHERE id = @id", {
        stress_level = pStressValue,
        id = user.character.id
    }))

    if not updated then
        print("Failed to update stress level for " .. user.character.id)
    end

    TriggerClientEvent("client:updateStress", pSource, pStressValue)
end)