AddEventHandler("ev-casino:openMegaMallStore", function()
  local cid = exports["isPed"]:isPed("cid")
  local isTennant = RPC.execute("ev-hotel:rooms:isTennant", cid)
  if not isTennant then
    TriggerEvent("DoLongHudText", "They don't recognize you") 
    return
  end

  -- return
  TriggerEvent("server-inventory-open", "4", "Shop");
end)

RegisterUICallback("ev-ui:casinohotel:genDiscountCard", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  TriggerEvent("player:receiveItem", "casinodiscountcard", 1, false, {
    state_id = data.values.state_id,
    expires = data.values.expiry,
  })
end)

AddEventHandler("ev-casino:hotel:getDiscountCard", function()
  local characterId = exports["isPed"]:isPed("cid")
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = "casino_hotel"} })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "Please talk to a member of floor staff") 
    return
  end
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:casinohotel:genDiscountCard',
    inputKey = 1,
    items = {
      {
        icon = "fas fa-id-card-alt",
        label = "State ID",
        name = "state_id",
      },
      {
        icon = "fas fa-calendar",
        label = "Expiry Date",
        name = "expiry",
      },
    },
    show = true,
  })
end)

AddEventHandler("ev-inventory:itemUsed", function(pItem)
  if pItem ~= "casinosoap" then return end
  TriggerEvent("DoLongHudText", "You feel clean and lucky!") 
  TriggerEvent("inventory:removeItem", "casinosoap", 1)
end)

AddEventHandler("ev-casino:getSoap", function()
  local characterId = exports["isPed"]:isPed("cid")
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = "casino_hotel"} })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "Please talk to a member of floor staff") 
    return
  end
  TriggerEvent("player:receiveItem", "casinosoap", 1)
end)

AddEventHandler("ev-casino:getHotelVIPCard", function()
  local cid = exports["isPed"]:isPed("cid")
  local isTennant = RPC.execute("ev-hotel:rooms:isTennant", cid)
  if not isTennant then
    TriggerEvent("DoLongHudText", "They don't recognize you") 
    return
  end
  TriggerEvent("player:receiveItem", "casinovip", 1)
end)

AddEventHandler("ev-casino:getCasinoBag", function()
  local characterId = exports["isPed"]:isPed("cid")
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = "casino_hotel"} })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "Please talk to a member of floor staff") 
    return
  end
  RPC.execute("ev-casino:getCasinoBag")
end)

AddEventHandler("ev-casino:getCasinoCoin", function()
  local characterId = exports["isPed"]:isPed("cid")
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = "casino_hotel"} })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "Please talk to a member of floor staff") 
    return
  end
  local function pad(k)
    if k < 10 then
      return "0" .. tostring(k)
    end
    return tostring(k)
  end
  TriggerEvent("DoLongHudText", "Getting a new coin will invalidate this rooms previous ones")
  local options = {}
  for i = 1, 24 do
    options[#options + 1] = { id = i, name = "Room 5" .. pad(i) }
  end
  exports["ev-ui"]:openApplication("textbox", {
    callbackUrl = "ev-ui:casino:hotel:getCasinoCoin",
    inputKey = "ev-business:hotel:ui:listTenants",
    items = {
      {
        _type = "select",
        options = options,
        icon = "fas fa-user-edit",
        label = "Room",
        name = "room",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:casino:hotel:getCasinoCoin", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "" } })
  exports["ev-ui"]:closeApplication("textbox")
  local room = data.values.room
  RPC.execute("ev-casino:getGoldCoinForRoom", room)
end)