RPC.register("clothing:purchase", function(src, currentPrice, currentPriceWithoutTax, paymentType)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local cid = user:getCurrentCharacter().id
  --local accountId = user:getBankId()
  local success, accountId = exports["ev-financials"]:getDefaultBankAccount(cid, false, false)
  if not success then return false end

  local bank = exports["ev-financials"]:getAccountBalance(accountId)   -- get player balance in bnak
  local cash = user:getCash()

  local comment = "Bought New Clothes"
  if paymentType == "cash" then
    if cash >= currentPrice then
      user:removeMoney(tonumber(currentPrice))
      return true
    else
      return false
    end
  else
    if bank >= currentPrice then
      return exports["ev-financials"]:adjustAccountBalance(accountId, "remove", currentPrice, src, 'Clothing Purchase')
    end
  end
end)

local function checkExistenceClothes(cid, cb)
  exports.oxmysql:execute("SELECT cid FROM character_current WHERE cid = @cid LIMIT 1;", { ["cid"] = cid }, function(result)
    local exists = result and result[1] and true or false
    cb(exists)
  end)
end

local function checkExistenceFace(cid, cb)
  exports.oxmysql:execute("SELECT cid FROM character_face WHERE cid = @cid LIMIT 1;", { ["cid"] = cid }, function(result)
    local exists = result and result[1] and true or false
    cb(exists)
  end)
end

RegisterServerEvent("raid_clothes:insert_character_current")
AddEventHandler("raid_clothes:insert_character_current", function(data)
  if not data then return end
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id
  if not characterId then return end
  checkExistenceClothes(characterId, function(exists)
    local values = {
      ["cid"] = characterId,
      ["model"] = json.encode(data.model),
      ["drawables"] = json.encode(data.drawables),
      ["props"] = json.encode(data.props),
      ["drawtextures"] = json.encode(data.drawtextures),
      ["proptextures"] = json.encode(data.proptextures),
      ["fadeStyle"] = data.fadeStyle,
    }

    if not exists then
      local cols = "cid, model, drawables, props, drawtextures, proptextures, fadeStyle"
      local vals = "@cid, @model, @drawables, @props, @drawtextures, @proptextures, @fadeStyle"

      exports.oxmysql:execute("INSERT INTO character_current (" .. cols .. ") VALUES (" .. vals .. ")", values, function()
      end)
      return
    end

    local set = "model = @model,drawables = @drawables,props = @props,drawtextures = @drawtextures, proptextures = @proptextures, fadeStyle = @fadeStyle"
    exports.oxmysql:execute("UPDATE character_current SET " .. set .. " WHERE cid = @cid", values)
  end)
end)

RegisterServerEvent("raid_clothes:insert_character_face")
AddEventHandler("raid_clothes:insert_character_face", function(data)
  if not data then return end
  local src = source

  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  checkExistenceFace(characterId, function(exists)
    if data.headBlend == "null" or data.headBlend == nil then
      data.headBlend = '[]'
    else
      data.headBlend = json.encode(data.headBlend)
    end
    if data.fadeStyle == "null" or data.fadeStyle == nil then
      data.fadeStyle = 0
    end

    local values = {
      ["cid"] = characterId,
      ["hairColor"] = json.encode(data.hairColor),
      ["headBlend"] = data.headBlend,
      ["headOverlay"] = json.encode(data.headOverlay),
      ["headStructure"] = json.encode(data.headStructure),
      ["fadeStyle"] = data.fadeStyle,
    }

    if not exists then
      local cols = "cid, hairColor, headBlend, headOverlay, headStructure, fadeStyle"
      local vals = "@cid, @hairColor, @headBlend, @headOverlay, @headStructure, @fadeStyle"

      exports.oxmysql:execute("INSERT INTO character_face (" .. cols .. ") VALUES (" .. vals .. ")", values, function()
      end)
      return
    end

    local set = "hairColor = @hairColor,headBlend = @headBlend, headOverlay = @headOverlay,headStructure = @headStructure, fadeStyle = @fadeStyle"
    exports.oxmysql:execute("UPDATE character_face SET " .. set .. " WHERE cid = @cid", values)
  end)
end)

RegisterServerEvent("raid_clothes:get_character_face")
AddEventHandler("raid_clothes:get_character_face", function(pSrc, pUpdate, pFadeStyle)
  local src = (not pSrc and source or pSrc)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  exports.oxmysql:execute(
  "SELECT cc.model, cf.hairColor, cf.headBlend, cf.headOverlay, cf.headStructure , cf.fadeStyle FROM character_face cf INNER JOIN character_current cc on cc.cid = cf.cid WHERE cf.cid = @cid",
    { ['cid'] = characterId }, function(result)
    if (result ~= nil and result[1] ~= nil) then
      local temp_data = {
        hairColor = json.decode(result[1].hairColor),
        headBlend = json.decode(result[1].headBlend),
        headOverlay = json.decode(result[1].headOverlay),
        headStructure = json.decode(result[1].headStructure),
        fadeStyle = result[1].fadeStyle,
      }
      local model = tonumber(result[1].model)
      if model == 1885233650 or model == -1667301416 then
        TriggerClientEvent("raid_clothes:setpedfeatures", src, temp_data)
      end
    else
      TriggerClientEvent("raid_clothes:setpedfeatures", src, false)
    end
  end)
end)

RegisterServerEvent("raid_clothes:get_character_current")
AddEventHandler("raid_clothes:get_character_current", function(pSrc)
  local src = (not pSrc and source or pSrc)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  local clothesData = MySQL.single.await("SELECT * FROM character_current WHERE cid = ?", { characterId })
  local temp_data = {
    model = clothesData.model,
    drawables = json.decode(clothesData.drawables),
    props = json.decode(clothesData.props),
    drawtextures = json.decode(clothesData.drawtextures),
    proptextures = json.decode(clothesData.proptextures),
    fadeStyle = clothesData.fadeStyle,
  }
  TriggerClientEvent("raid_clothes:setclothes", src, temp_data, 0)
end)

RegisterServerEvent("tattoos:retrieve")
AddEventHandler("tattoos:retrieve", function()
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local char = user:getCurrentCharacter()

  local myTattoos = MySQL.single.await('SELECT tattoos FROM playerstattoos WHERE cid = @cid', { ['@cid'] = char.id })
  TriggerClientEvent('raid_clothes:settattoos', src, (myTattoos ~= nil and json.decode(myTattoos.tattoos) or {}))
end)

RegisterServerEvent("Blemishes:retrieve")
AddEventHandler("Blemishes:retrieve", function()
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local char = user:getCurrentCharacter()
  exports.oxmysql:execute(
  "SELECT cc.model, cf.hairColor, cf.headBlend, cf.headOverlay, cf.headStructure , cf.fadeStyle FROM character_face cf INNER JOIN character_current cc on cc.cid = cf.cid WHERE cf.cid = @cid",
    { ['cid'] = char.id }, function(result)
    if (result ~= nil and result[1] ~= nil) then
      local temp_data = {
        hairColor = json.decode(result[1].hairColor),
        headBlend = json.decode(result[1].headBlend),
        headOverlay = json.decode(result[1].headOverlay),
        headStructure = json.decode(result[1].headStructure),
        fadeStyle = result[1].fadeStyle,
      }
      local model = tonumber(result[1].model)
      if model == 1885233650 or model == -1667301416 then
        TriggerClientEvent("raid_clothes:setpedfeatures", src, temp_data)
      end
    end
  end)
end)

RegisterServerEvent("raid_clothes:set_tats")
AddEventHandler("raid_clothes:set_tats", function(tattoosList, newTattoos)
  if tattoosList == nil or newTattoos == nil then return end
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local char = user:getCurrentCharacter()

  local currTattooTable = tattoosList

  for k,v in pairs(newTattoos) do
    currTattooTable[k] = v
  end

  local tats = json.encode(currTattooTable)
  local myTattoos = MySQL.single.await('SELECT tattoos FROM playerstattoos WHERE cid = @cid', { ['@cid'] = tonumber(char.id) })
  if myTattoos ~= nil then
    local updated = MySQL.update.await('UPDATE playerstattoos SET tattoos = @tattoos WHERE cid = @cid', { ['@tattoos'] = tats, ['@cid'] = tonumber(char.id) })
  else
    local didInsert = MySQL.insert.await('INSERT INTO playerstattoos (cid, tattoos) VALUES (?, ?)', { tonumber(char.id), tats })
  end
end)

RPC.register('tattoos:fetchMyTats', function(pSrc)
  local src = pSrc
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local char = user:getCurrentCharacter()

  local myTattoos = MySQL.single.await('SELECT tattoos FROM playerstattoos WHERE cid = @cid', { ['@cid'] = char.id })
  return (myTattoos ~= nil and json.decode(myTattoos.tattoos) or {})
end)


RegisterServerEvent("raid_clothes:get_outfit")
AddEventHandler("raid_clothes:get_outfit", function(slot)
  if not slot then return end
  local src = source

  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  exports.oxmysql:execute("SELECT * FROM character_outfits WHERE cid = @cid and slot = @slot", {
    ['cid'] = characterId,
    ['slot'] = slot
  }, function(result)
    if result and result[1] then
      if result[1].model == nil then
        TriggerClientEvent("DoLongHudText", src, "Can not use.", 2)
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
      exports.oxmysql:execute("UPDATE character_current SET " .. set .. " WHERE cid = @cid", values)
    else
      TriggerClientEvent("DoLongHudText", src, "No outfit on slot " .. slot, 2)
      return
    end
  end)
end)

RegisterServerEvent("raid_clothes:set_outfit")
AddEventHandler("raid_clothes:set_outfit", function(slot, name, data)
  print(slot)
  print(tostring(name))
  if not slot then return end
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  exports.oxmysql:execute("SELECT slot FROM character_outfits WHERE cid = @cid and slot = @slot and name = @name", {
    ['cid'] = characterId,
    ['slot'] = slot
  }, function(result)
    if result and result[1] then
      local values = {
        ["cid"] = characterId,
        ["slot"] = slot,
        ["name"] = name,
        ["model"] = json.encode(data.model),
        ["drawables"] = json.encode(data.drawables),
        ["props"] = json.encode(data.props),
        ["drawtextures"] = json.encode(data.drawtextures),
        ["proptextures"] = json.encode(data.proptextures),
        ["hairColor"] = json.encode(data.hairColor),
        ["fadeStyle"] = data.fadeStyle,
      }

      local set =
      "model = @model,name = @name,drawables = @drawables,props = @props,drawtextures = @drawtextures,proptextures = @proptextures,hairColor = @hairColor, fadeStyle = @fadeStyle"
      exports.oxmysql:execute("UPDATE character_outfits SET " .. set .. " WHERE cid = @cid and slot = @slot and name = @name", values)
    else
      local cols = "cid, model, name, slot, drawables, props, drawtextures, proptextures, hairColor, fadeStyle"
      local vals = "@cid, @model, @name, @slot, @drawables, @props, @drawtextures, @proptextures, @hairColor, @fadeStyle"

      local values = {
        ["cid"] = characterId,
        ["name"] = name,
        ["slot"] = slot,
        ["model"] = data.model,
        ["drawables"] = json.encode(data.drawables),
        ["props"] = json.encode(data.props),
        ["drawtextures"] = json.encode(data.drawtextures),
        ["proptextures"] = json.encode(data.proptextures),
        ["hairColor"] = json.encode(data.hairColor),
        ["fadeStyle"] = data.fadeStyle,
      }

      exports.oxmysql:execute("INSERT INTO character_outfits (" .. cols .. ") VALUES (" .. vals .. ")", values, function()
        TriggerClientEvent("DoLongHudText", src, name .. " stored in slot " .. slot, 1)
      end)
    end
  end)
end)

RegisterServerEvent("raid_clothes:remove_outfit")
AddEventHandler("raid_clothes:remove_outfit", function(slot)
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local cid = user:getCurrentCharacter().id
  local slot = slot

  if not cid then return end

  exports.oxmysql:execute("DELETE FROM character_outfits WHERE cid = @cid AND slot = @slot", { ['cid'] = cid, ["slot"] = slot })
  TriggerClientEvent("DoLongHudText", src, "Removed slot " .. slot .. ".", 1)
end)

RegisterServerEvent("raid_clothes:list_outfits")
AddEventHandler("raid_clothes:list_outfits", function()
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local cid = user:getCurrentCharacter().id
  local slot = slot
  local name = name

  if not cid then return end

  exports.oxmysql:execute("SELECT slot, name FROM character_outfits WHERE cid = @cid", { ['cid'] = cid }, function(skincheck)
    TriggerClientEvent("raid_clothes:ListOutfits", src, skincheck)
  end)
end)

RegisterServerEvent("clothing:checkIfNew")
AddEventHandler("clothing:checkIfNew", function()
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local cid = user:getCurrentCharacter().id
  local dateCreated = user:getCurrentCharacter()

  local whitelistCount = MySQL.single.await("SELECT * FROM jobs_whitelist WHERE cid = ? LIMIT 1", { cid })
  local isService = false;
  if (whitelistCount ~= nil) then isService = true end

  local modelCheck = MySQL.single.await("SELECT * FROM character_current WHERE cid = ? LIMIT 1", { cid })

  if (modelCheck == nil) then
    exports.oxmysql:execute("select count(cid) assExist from (select cid  from character_current union select cid from character_outfits) a where cid =  @cid",
      { ['cid'] = cid }, function(clothingCheck)
      local existsClothing = clothingCheck[1].assExist
      TriggerClientEvent('raid_clothes:setclothes', src, {}, existsClothing)
    end)
    return
  else
    exports.oxmysql:execute("SELECT * FROM characters where id = @cid", { ['@cid'] = cid }, function(data)
      if data[1].jail_time >= 1 then
        TriggerClientEvent("hotel:createRoom", src, false, false)
      elseif data[1].jail_time <= 0 then
        TriggerClientEvent("hotel:createRoom", src, true, true)
      end
    end)
  end
  TriggerEvent("raid_clothes:get_character_current", src)
  TriggerClientEvent("raid_clothes:inService", src, isService)
end)

---- WIP----
RPC.register("raid_clothes:get_custom_outfits", function(src)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id
  if not characterId then return end

  exports.oxmysql:execute('SELECT * FROM character_presets', {}, function(result)
    if (result and result[1]) then

    else
      TriggerClientEvent('DoLongHudText', src, 'No Presets', 2)
    end
  end)
end)

RPC.register("raid_clothes:get_custom_outfits_confirmation", function(src, id)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id
  if not characterId then return end

  exports.oxmysql:execute("SELECT * FROM character_presets WHERE id = @id", { ["id"] = id.param }, function(result)
    if (result and result[1]) then
      local data = {
        drawables = json.decode(result[1].drawables),
        props = json.decode(result[1].props),
        drawtextures = json.decode(result[1].drawtextures),
        proptextures = json.decode(result[1].proptextures)
      }

      TriggerClientEvent("raid_clothes:setclothessss", src, data, 0)
      TriggerClientEvent("clothing:client:thinkingstarts", src)
    else
      TriggerClientEvent('DoLongHudText', src, 'No Presets', 2)
    end
  end)
end)

-- RegisterCommand("saveoutfit", function(source,args,raw)
--     TriggerClientEvent("hotel:outfit", source, args, 1)
-- end)

--- complete adding price code

RegisterServerEvent("raid_clothes:set_outfit_for_sale")
AddEventHandler("raid_clothes:set_outfit_for_sale", function(name, price, data)
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  local cols = "name, price, drawables, props, drawtextures, proptextures"
  local vals = "@name, @price, @drawables, @props, @drawtextures, @proptextures"
  local values = {
    ["name"] = name,
    ["price"] = price,
    ["drawables"] = json.encode(data.drawables),
    ["props"] = json.encode(data.props),
    ["drawtextures"] = json.encode(data.drawtextures),
    ["proptextures"] = json.encode(data.proptextures),
  }

  exports.oxmysql:execute("INSERT INTO character_presets (" .. cols .. ") VALUES (" .. vals .. ")", values, function()
    TriggerClientEvent("DoLongHudText", src, name .. " stored in shop ", 1)
  end)
end)

RPC.register("raid_clothes:get_outfit_shop", function(src, id)
  if not id then return end

  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  exports.oxmysql:execute("SELECT * FROM character_presets WHERE cid = @cid", {
    ['cid'] = characterId
  }, function(result)
    if result and result[1] then
      local data = {
        drawables = json.decode(result[1].drawables),
        props = json.decode(result[1].props),
        drawtextures = json.decode(result[1].drawtextures),
        proptextures = json.decode(result[1].proptextures)
      }

      TriggerClientEvent("raid_clothes:setclothessss", src, data, 0)

      local values = {
        ["cid"] = characterId,
        ["drawables"] = json.encode(data.drawables),
        ["props"] = json.encode(data.props),
        ["drawtextures"] = json.encode(data.drawtextures),
        ["proptextures"] = json.encode(data.proptextures),
      }

      local set = "drawables = @drawables, props = @props,drawtextures = @drawtextures,proptextures = @proptextures"
      exports.oxmysql:execute("UPDATE character_current SET " .. set .. " WHERE cid = @cid", values)
    else
      TriggerClientEvent("DoLongHudText", src, "No outfit for sale ", 2)
      return
    end
  end)
end)

RPC.register("raid_clothes:bought_customs", function(src, id)
  if not id then return end

  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local cash = user:getCash()
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  exports.oxmysql:execute("SELECT * FROM character_presets WHERE id = @id", {
    ['id'] = id.param
  }, function(result)
    if result and result[1] then
      if cash > result[1].price then
        user:removeMoney(result[1].price)
        local data = {
          drawables = json.decode(result[1].drawables),
          props = json.decode(result[1].props),
          drawtextures = json.decode(result[1].drawtextures),
          proptextures = json.decode(result[1].proptextures)
        }

        TriggerClientEvent("raid_clothes:setclothessss", src, data, 0)

        local values = {
          ["cid"] = characterId,
          ["drawables"] = json.encode(data.drawables),
          ["props"] = json.encode(data.props),
          ["drawtextures"] = json.encode(data.drawtextures),
          ["proptextures"] = json.encode(data.proptextures),
        }

        local set = "drawables = @drawables, props = @props,drawtextures = @drawtextures,proptextures = @proptextures"
        exports.oxmysql:execute("UPDATE character_current SET " .. set .. " WHERE cid = @cid", values)
        print('success in buying the fucking customs')
      else
        TriggerClientEvent("raid_clothes:open_customs", src)
        TriggerClientEvent("DoLongHudText", src, "You Don't have enough cash", 2)
      end
    else
      TriggerClientEvent("DoLongHudText", src, "No outfit for sale ", 2)
      return
    end
  end)
end)

RegisterServerEvent("raid_clothes:get_character_current_for_customs")
AddEventHandler("raid_clothes:get_character_current_for_customs", function(pSrc)
  local src = (not pSrc and source or pSrc)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local characterId = user:getCurrentCharacter().id

  if not characterId then return end

  exports.oxmysql:execute("SELECT * FROM character_current WHERE cid = @cid", { ['cid'] = characterId }, function(result)
    local temp_data = {
      model = result[1].model,
      drawables = json.decode(result[1].drawables),
      props = json.decode(result[1].props),
      drawtextures = json.decode(result[1].drawtextures),
      proptextures = json.decode(result[1].proptextures),
    }
    TriggerClientEvent("raid_clothes:setclothessss", src, temp_data, 0)
  end)
end)