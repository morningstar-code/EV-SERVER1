Citizen.CreateThread(function()
    local delete = MySQL.update.await([[DELETE FROM scenes]])
end)

RegisterNetEvent("ev-scenes:getScenes")
AddEventHandler("ev-scenes:getScenes", function()
    local src = source
    local data = MySQL.query.await([[SELECT * FROM scenes ]])

    if not data then
        TriggerClientEvent("ev-scenes:allScenes", src, {})
        return
    end

    local scenes = {}

    for i = 1, #data do
        scenes[data[tonumber(i)].id] = {
            id = data[tonumber(i)].id,
            coords = json.decode(data[tonumber(i)].coords),
            text = data[tonumber(i)].text,
            distance = data[tonumber(i)].distance,
            color = data[tonumber(i)].color,
            caret = data[tonumber(i)].caret,
            font = data[tonumber(i)].font,
            solid = data[tonumber(i)].solid,
            background = json.decode(data[tonumber(i)].background),
        }
    end

    TriggerClientEvent("ev-scenes:allScenes", src, scenes)
end)

RegisterNetEvent("ev-scenes:addScene")
AddEventHandler("ev-scenes:addScene", function(pData)
    local src = source
    local temp = {}
    local insert = MySQL.insert.await([[
        INSERT INTO scenes 
        (coords, text, distance, color, caret, font, solid, background)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?) ]],
    {json.encode(pData.coords), pData.text, pData.distance, pData.color, pData.caret, pData.font, pData.solid, json.encode(pData.background)})

    if not insert then return end

    local data = MySQL.query.await([[
        SELECT * FROM scenes 
        WHERE text = ? AND distance = ? AND color = ? AND caret = ? AND font = ? AND solid = ?
    ]],
    { pData.text, pData.distance, pData.color, pData.caret, pData.font, pData.solid })
    
    temp =  {
        id = data[1].id,
        coords = json.decode(data[1].coords),
        text = data[1].text,
        distance = data[1].distance,
        color = data[1].color,
        caret = data[1].caret,
        font = data[1].font,
        solid = data[1].solid,
        background = json.decode(data[1].background),
    }
    TriggerClientEvent("ev-scenes:refreshScenes", -1, data[1].id, temp)
end)

RegisterNetEvent("ev-scenes:deleteScene")
AddEventHandler("ev-scenes:deleteScene", function(pCoords)
    local data = MySQL.query.await([[ SELECT * FROM scenes ]])
    for k,v in pairs(data) do
        local coord = json.decode(v.coords)
        local acCoord = vector3(coord.x, coord.y, coord.z)
        if #(acCoord - pCoords) < 2.0 then
            local delete = MySQL.update.await([[
                DELETE FROM scenes
                WHERE id = ?
            ]],
            { v.id })
        
            if delete then
                TriggerClientEvent("ev-scenes:deleteScene", -1, v.id)
                return
            end
        end
    end
end)