function FindPlayerIdById(id)
    for k,v in ipairs(GetPlayers()) do
        local user = exports["ev-base"]:getModule("Player"):GetUser(tonumber(v))
        local CitizenId = user:getCurrentCharacter().id
        if(CitizenId == id) then
            return v
        end
    end
end