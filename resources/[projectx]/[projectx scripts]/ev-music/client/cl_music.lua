AddEventHandler("ev-inventory:itemUsed", function(item, info)
  if item ~= "musictape" then return end
  if not exports["ev-inventory"]:hasEnoughOfItem("musicwalkman", 1, false, true) then
    TriggerEvent("DoLongHudText", "You need a walkman!", 2)
    return
  end
  local info = json.decode(info)
  exports["walkman"]:openApplication("musicplayer", { url = info.url })
  local characterId = exports["isPed"]:isPed('cid')
  RPC.execute("ev-music:recordPlay", characterId, info.id)
end)

AddEventHandler("ev-music:addMusicEntry", function(pParams)
  local business = pParams.business
  print(business)
  local characterId = exports["isPed"]:isPed('cid')
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = business } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  exports['ev-ui']:openApplication('textbox', {
      callbackUrl = 'ev-ui:music:addMusicEntry',
      inputKey = business,
      items = {
        {
          icon = "fas fa-music",
          label = "Soundcloud URL",
          name = "url",
        },
        {
          icon = "fas fa-user-injured",
          label = "Artist",
          name = "artist",
        },
        {
          icon = "fas fa-user-edit",
          label = "Title",
          name = "title",
        },
        {
          icon = "fas fa-edit",
          label = "Description",
          name = "description",
        },
      },
      show = true,
  })
end)

RegisterUICallback("ev-ui:music:addMusicEntry", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  RPC.execute("ev-music:addMusicEntry", data.inputKey, data.values)
end)

AddEventHandler("ev-music:createMusicTapes", function(pParams)
  local business = pParams.business
  local characterId = exports["isPed"]:isPed('cid')
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = business } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  local songOptionsRaw = RPC.execute("ev-music:getSongOptions", business)
  local songOptions = {}
  for _, option in pairs(songOptionsRaw) do
    songOptions[#songOptions + 1] = { id = option.id, name = option.title }
  end
  exports['ev-ui']:openApplication('textbox', {
      callbackUrl = 'ev-ui:music:createMusicTapes',
      inputKey = business,
      items = {
        {
          _type = "select",
          options = songOptions,
          label = "Song",
          icon = "fas fa-music",
          name = "song",
        },
        {
          icon = "fas fa-copy",
          label = "Copies",
          name = "copies",
        },
      },
      show = true,
  })
end)

RegisterUICallback("ev-ui:music:createMusicTapes", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  RPC.execute("ev-music:createMusicTapes", data.inputKey, data.values)
end)

RegisterUICallback("ev-ui:music:createMerchendise", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  local d = {
    description = data.values.description,
    _description = data.values.description,
    _image_url = data.values.image,
    _hideKeys = { "_description", "_image_url" },
  }
  TriggerEvent("player:receiveItem", "musicmerch", tonumber(data.values.quantity), false, d)
end)

AddEventHandler("ev-music:createMerchandise", function(pParams)
  local business = pParams.business
  local characterId = exports["isPed"]:isPed('cid')
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = business } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "You cannot do that.", 2)
    return
  end
  exports['ev-ui']:openApplication('textbox', {
      callbackUrl = 'ev-ui:music:createMerchendise',
      inputKey = business,
      items = {
        {
          icon = "fas fa-pencil-alt",
          label = "Description",
          name = "description",
        },
        {
          icon = "fas fa-image",
          label = "Image (100x100 px) (e.g.: https://imgur.com/123.png)",
          name = "image",
        },
        {
          icon = "fas fa-copy",
          label = "Quantity",
          name = "quantity",
        },
      },
      show = true,
  })
end)
