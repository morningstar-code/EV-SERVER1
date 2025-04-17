function Login.decode(tablestring)
    if tablestring == nil or tablestring == "" then
        return {}
    else
        return json.decode(tablestring)
    end
end

RegisterServerEvent("login:getCharModels")
AddEventHandler("login:getCharModels", function(charlist, isReset)
    local src = source
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local char = user:getCurrentCharacter()
    local list = ""

    for i = 1, #charlist do
        if i == #charlist then
            list = list .. charlist[i]
        else
            list = list .. charlist[i] .. ","
        end
    end
    
    if charlist == nil or json.encode(charlist) == "[]" then
        TriggerClientEvent("login:CreatePlayerCharacterPeds", src, nil, isReset)
        return
    end

    local query = "SELECT cc.*, cf.*, ct.* FROM character_face cf LEFT JOIN character_current cc on cc.cid = cf.cid LEFT JOIN playerstattoos ct on ct.cid = cf.cid WHERE cf.cid IN (" .. list .. ")"
    local result = Await(SQL.executedynamicparam(query))

    if result then
        local temp_data = {}
        for k, v in ipairs(result) do
            temp_data[v.cid] = {
                model = v.model,
                drawables = Login.decode(v.drawables),
                props = Login.decode(v.props),
                drawtextures = Login.decode(v.drawtextures),
                proptextures = Login.decode(v.proptextures),
                hairColor = Login.decode(v.hairColor),
                headBlend = Login.decode(v.headBlend),
                fadeStyle = v.fadeStyle,
                headOverlay = Login.decode(v.headOverlay),
                headStructure = Login.decode(v.headStructure),
                tattoos = Login.decode(v.tattoos),
            }
        end
        
        for i = 1, #charlist do
            if temp_data[charlist[i]] == nil then
                temp_data[charlist[i]] = nil
            end
        end
        
        TriggerClientEvent("login:CreatePlayerCharacterPeds", src, temp_data, isReset)
    end
end)

RegisterServerEvent("ev-login:disconnectPlayer")
AddEventHandler("ev-login:disconnectPlayer", function()
    local src = source
    DropPlayer(src, "You DisConnected")
end)