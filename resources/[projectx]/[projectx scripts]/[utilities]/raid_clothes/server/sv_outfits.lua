RegisterServerEvent("raid_clothes:list_outfitsVeh")
AddEventHandler("raid_clothes:list_outfitsVeh",function(pPlate)
    local src = source

    local outfits = exports.oxmysql:execute([[
        SELECT name, slot
        FROM vehicle_outfits
        WHERE plate = ?
        ORDER BY slot
    ]],
    { pPlate }) 

    exports.oxmysql:execute("SELECT slot, name FROM vehicle_outfits WHERE plate = @plate", {['plate'] = pPlate}, function(skincheck)
    	TriggerClientEvent("raid_clothes:ListOutfitsVeh",src, skincheck)
	end)
end)

RegisterServerEvent("raid_clothes:list_outfits") 
AddEventHandler("raid_clothes:list_outfits",function()
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id 
    if not cid then return end

    local outfits = exports.oxmysql:execute([[
        SELECT name, slot
        FROM character_outfits
        WHERE cid = ?
        ORDER BY slot
    ]],
    { cid })

    TriggerClientEvent("raid_clothes:ListOutfits", src, outfits)
end)

databaseFormat = {
    "model",
    "drawables",
    "props",
    "drawtextures",
    "proptextures",
    "hairColor",
    "fadeStyle",
    "headBlend",
    "headStructure",
    "headOverlay",
}

RegisterServerEvent("raid_clothes:set_outfitVeh")
AddEventHandler("raid_clothes:set_outfitVeh", function(slot, name, data, pPlate) 

    local src = source

    print(pPlate)

    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    for i, v in ipairs(databaseFormat) do
        if v == "model" then
            data[v] = tostring(data[v])
        elseif v == "fadeStyle" then
            data[v] = tonumber(data[v])
        else
            if data[v] then
                data[v] = json.encode(data[v])
            else
                data[v] = json.encode({})
            end
        end
    end

    local exist =  exports.oxmysql:execute([[
        SELECT slot
        FROM vehicle_outfits
        WHERE plate = ? AND slot = ?
    ]],
    { pPlate, slot })

    if exist then
        exports.oxmysql:execute([[
            UPDATE vehicle_outfits
            SET name = ?, model = ?, drawables = ?, props = ?, drawtextures = ?, proptextures = ?, hairColor = ?, fadeStyle = ?, headBlend = ?, headStructure = ?, headOverlay = ?
            WHERE plate = ? AND slot = ?
        ]],
        { name, data.model, data.drawables, data.props, data.drawtextures, data.proptextures, data.hairColor, data.fadeStyle, data.headBlend, data.headStructure, data.headOverlay, pPlate, slot })
    else
        exports.oxmysql:execute([[
            INSERT INTO vehicle_outfits (plate, cid, name, slot, model, drawables, props, drawtextures, proptextures, hairColor, fadeStyle, headBlend, headStructure, headOverlay)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ]],
        { pPlate, cid, name, slot, data.model, data.drawables, data.props, data.drawtextures, data.proptextures, data.hairColor, data.fadeStyle, data.headBlend, data.headStructure, data.headOverlay })
    end

    TriggerClientEvent("DoLongHudText", src, name .. " stored in slot " .. slot)
end)

RegisterServerEvent("raid_clothes:remove_outfit")
AddEventHandler("raid_clothes:remove_outfit", function(slot)
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    exports.oxmysql:execute([[
        DELETE FROM character_outfits
        WHERE cid = ? AND slot = ?
    ]],
    { cid, slot })

    TriggerClientEvent("DoLongHudText", src, "Removed slot " .. slot)
end)

RegisterServerEvent("raid_clothes:remove_outfitVeh")
AddEventHandler("raid_clothes:remove_outfitVeh", function(slot, pPlate)
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    exports.oxmysql:execute([[
        DELETE FROM vehicle_outfits
        WHERE plate = ? AND slot = ?
    ]],
    { pPlate, slot })

    TriggerClientEvent("DoLongHudText", src, "Removed slot " .. slot)
end)


RegisterServerEvent("raid_clothes:get_outfitVeh") 
AddEventHandler("raid_clothes:get_outfitVeh", function(slot, pPlate)
    if not slot then return end
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src)
    local characterId = user:getCurrentCharacter().id

    if not characterId then return end

    exports.oxmysql:execute("SELECT * FROM vehicle_outfits WHERE cid = @cid and slot = @slot and plate = @plate", {
        ['cid'] = characterId,
        ['slot'] = slot,
        ['plate'] = pPlate
    }, function(result)
        if result and result[1] then
            if result[1].model == nil then
                TriggerClientEvent("DoLongHudText", src, "Can not use.",2)
                return
            end

            local data = {
                model = result[1].model,
                drawables = json.decode(result[1].drawables),
                props = json.decode(result[1].props),
                drawtextures = json.decode(result[1].drawtextures),
                proptextures = json.decode(result[1].proptextures),
                hairColor = json.decode(result[1].hairColor),
                fadeStyle = result[1].fadeStyle,
            }

            TriggerClientEvent("raid_clothes:setclothes", src, data, 0)

            local values = {
                ["cid"] = characterId,
                ["model"] = data.model,
                ["drawables"] = json.encode(data.drawables),
                ["props"] = json.encode(data.props),
                ["drawtextures"] = json.encode(data.drawtextures),
                ["proptextures"] = json.encode(data.proptextures),
                ["fadeStyle"] = data.fadeStyle,
            }

            local set = "model = @model, drawables = @drawables, props = @props,drawtextures = @drawtextures, proptextures = @proptextures, fadeStyle = @fadeStyle"
            exports.oxmysql:execute("UPDATE character_current SET "..set.." WHERE cid = @cid",values)
        else
            TriggerClientEvent("DoLongHudText", src, "No outfit on slot " .. slot,2)
            return
        end
	end)
end)