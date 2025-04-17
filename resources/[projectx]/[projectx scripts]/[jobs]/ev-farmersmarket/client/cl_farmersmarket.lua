local inPaletoMarket = false
local inDeanworldMarket = false

local duiReplaces = {}
local globalSettings = {}
local serverCode = "wl"
Citizen.CreateThread(function()
  serverCode = 'wl' --exports["ev-config"]:GetServerCode()
  local lc = 0
  while lc < 15 do
    lc = lc + 1
    local strNum = (lc < 10 and "0" or "") .. tostring(lc)
    duiReplaces[#duiReplaces + 1] = {
      id = lc,
      tex = "dw_prop_tent_scr_" .. strNum,
      txd = "dw_props",
      dui = nil
    }
  end
end)

local farmersMarketDynamicDisplayEnabled = true
AddEventHandler("ev-preferences:setPreferences", function(data)
  farmersMarketDynamicDisplayEnabled = not data["farmersmarket.disableBanners"]
end)

function isDayTime(hideHudText)
  local hour = GetClockHours()
  local isEnabled = false
  if inPaletoMarket then
    isEnabled = (hour >= 7 and hour <= 18)
  end
  if inDeanworldMarket then
    isEnabled = (hour >= 19 or hour <= 6)
  end

  local isConfigEnabled = true
  if isConfigEnabled == nil then
    isConfigEnabled = true
  end

  if not isConfigEnabled and not hideHudText then
    TriggerEvent("DoLongHudText", "Market is indefinitely closed!", 2)
    return false
  end

  if not isEnabled and not hideHudText then
    TriggerEvent("DoLongHudText", "Market is closed!", 2)
  end
  return isEnabled
end

function isDeanworldOpen()
  local hour = GetClockHours()
  return hour > 19 or hour < 6
end

function getBoothId(pData)
  if pData.zones["ev-farmersmarket:pick_up_spot"] then
    return pData.zones["ev-farmersmarket:pick_up_spot"].id
  end
  return pData.zones["ev-farmersmarket:sign_in_board"].id
end

function getCid()
  return exports["isPed"]:isPed("cid")
end

function getPassword(pBoothId, pAction)
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:farmersmarket:getPassword',
    inputKey = { boothId = pBoothId, action = pAction },
    items = {
      {
        icon = "user-plus",
        label = "Password",
        name = "password",
      },
    },
    show = true,
  })
end

local function processSettings(settings, forPaleto)
  print(json.encode(settings))
  globalSettings = settings
  local isConfigEnabled = true
  if not farmersMarketDynamicDisplayEnabled or not isConfigEnabled then return end
  for _, conf in pairs(duiReplaces) do
    local confId = isDeanworldOpen() and conf.id + 15 or conf.id --offset for deanworld
    local url = (isDayTime(true) and settings[confId]) and settings[confId].image or "https://i.imgur.com/ie675vt.png"
    if conf.dui == nil then
      conf.dui = exports["ev-lib"]:getDui(url, 1024, 1024)
      AddReplaceTexture(conf.txd, conf.tex, conf.dui.dictionary, conf.dui.texture)
    else
      exports["ev-lib"]:changeDuiUrl(conf.dui.id, url)
    end
  end
end

function ensureAtBooth(booth, cid)
  local isAtBooth = RPC.execute("ev-farmersmarket:isAtBooth", booth, cid)
  if not isAtBooth then
    TriggerEvent("DoLongHudText", "You aren't recognized here.", 2)
    return false
  end
  return true
end

RegisterUICallback("ev-ui:farmersmarket:getPassword", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  local booth = data.inputKey.boothId
  local cid = getCid()
  RPC.execute(data.inputKey.action, booth, cid, data.values.password)
end)

RegisterUICallback("ev-ui:farmersmarket:changeImage", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  local booth = data.inputKey.boothId
  local cid = getCid()
  RPC.execute("ev-farmersmarket:changeBoothImage", booth, cid, data.values.id)
end)

AddEventHandler("ev-farmersmarket:claimBooth", function(p1, p2, pData)
  if not isDayTime() then return end
  local booth = getBoothId(pData)
  getPassword(booth, 'ev-farmersmarket:claimBooth')
end)

AddEventHandler("ev-farmersmarket:leaveBooth", function(p1, p2, pData)
  if not isDayTime() then return end
  local booth = getBoothId(pData)
  local cid = getCid()
  if not ensureAtBooth(booth, cid) then
    return
  end
  RPC.execute('ev-farmersmarket:leaveBooth', booth, cid)
end)

AddEventHandler("ev-farmersmarket:joinBooth", function(p1, p2, pData)
  if not isDayTime() then return end
  local booth = getBoothId(pData)
  getPassword(booth, 'ev-farmersmarket:joinBooth')
end)

AddEventHandler("ev-farmersmarket:inventory", function(p1, p2, pData)
  if not isDayTime() then return end
  local booth = getBoothId(pData)
  local cid = getCid()
  if not ensureAtBooth(booth, cid) then
    return
  end
  TriggerEvent("server-inventory-open", "1", "farmersmarket_inventory_" .. tostring(booth) .. "-" .. serverCode, 1000)
end)

AddEventHandler("ev-farmersmarket:pickup", function(p1, p2, pData)
  if not isDayTime() then return end
  local booth = getBoothId(pData)
  TriggerEvent("server-inventory-open", "1", "farmersmarket_pickup_" .. tostring(booth) .. "-" .. serverCode, 1000)
end)

AddEventHandler("ev-farmersmarket:changeBoothImage", function(p1, p2, pData)
  if not isDayTime() then return end
  local booth = getBoothId(pData)
  local cid = getCid()
  if not ensureAtBooth(booth, cid) then
    return
  end
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:farmersmarket:changeImage',
    inputKey = { boothId = booth },
    items = {
      {
        icon = "fingerprint",
        label = "Banner ID",
        name = "id",
      },
    },
    show = true,
  })
end)

AddEventHandler("ev-farmersmarket:getBoothCids", function(p1, p2, pData)
  local booth = getBoothId(pData)
  RPC.execute('ev-farmersmarket:getBoothCids', booth) 
end)

RegisterUICallback("ev-ui:farmersmarket:generateVendorLicense", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  local cid = getCid()
  exports['ev-ui']:closeApplication('textbox')
  TriggerServerEvent('server-inventory-give', cid, "vendorlicense", 1, 1, true, {state_id = data.values.state_id, expires = data.values.expiry,}) 
  
end)

AddEventHandler("ev-farmersmarket:generateVendorLicense", function() 
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:farmersmarket:generateVendorLicense',
    inputKey = 1,
    items = {
      {
        icon = "id-card-alt",
        label = "State ID", 
        name = "state_id", 
      },
      {
        icon = "calendar",
        label = "Expiry Date [DD-MM-YYYY]",
        name = "expiry",
      },
    },
    show = true,
  })
end)

local ingredientsMap = {
  ["food"] = {
    ingredient = "foodingredient",
    craft = "customfooditem",
  },
  ["water"] = {
    ingredient = "water",
    craft = "customwateritem",
  },
  ["coffee"] = {
    ingredient = "coffeebeans",
    craft = "customcoffeeitem",
  },
  ["joint"] = {
    ingredient = "joint2",
    craft = "customjointitem",
  },
  ["ciggy"] = {
    ingredient = "tobacco",
    craft = "customciggyitem",
  },
  ["bandage"] = {
    ingredient = "gause",
    craft = "custombandageitem",
  },
  ["other"] = {
    ingredient = "merchingredient",
    craft = "custommerchitem",
  },
}

RegisterUICallback("ev-ui:farmersmarket:craftItems", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  local result = RPC.execute("ev-farmersmarket:getCraftItem", data.values.id)
  if not result then
    TriggerEvent("DoLongHudText", "ID not recognized / approved", 2)
    return
  end
  local ingredient = ingredientsMap[result.item_type].ingredient
  local qty = tonumber(data.values.quantity)
  if not exports["ev-inventory"]:hasEnoughOfItem(ingredient, qty) then
    TriggerEvent("DoLongHudText", "Not enough ingredients" .. " (" .. ingredient .. ")", 2, 12000, { i18n = { "Not enough ingredients" }})
    return
  end

  if ingredient == 'joint2' then
    local joints = exports['ev-inventory']:getItemsOfType('joint2', qty, true)
    local itemInfo = json.decode(joints[1].information)
    if itemInfo.strain then
      result.description = result.description .. '<br>Strain: ' .. itemInfo.strain
    end
  end

  TriggerEvent("inventory:removeItem", ingredient, qty)
  TriggerEvent("player:receiveItem", ingredientsMap[result.item_type].craft, qty, false, {
    _hideKeys = { "_image_url", "_name", "_description", "_remove_id" },
    _image_url = result.image,
    _name = result.name,
    _description = result.description,
    _remove_id = math.random(10000000, 999999999),
  })
end)

AddEventHandler("ev-farmersmarket:craftItem", function()
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:farmersmarket:craftItems',
    inputKey = 1,
    items = {
      {
        icon = "fingerprint",
        label = "ID",
        name = "id",
      },
      {
        icon = "sort-numeric-up-alt",
        label = "Quantity",
        name = "quantity",
      },
    },
    show = true,
  })
end)

RegisterNetEvent("ev-farmersmarket:updateBoothSettings")
AddEventHandler("ev-farmersmarket:updateBoothSettings", function(pBoothSettings)
  if inPaletoMarket or inDeanworldMarket then
    processSettings(pBoothSettings)
  end
end)

RegisterUICallback("ev-ui:farmersmarket:registerItem", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  RPC.execute("ev-farmersmarket:registerItem", data.values, getCid())
end)

AddEventHandler("ev-farmersmarket:registerItem", function()
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:farmersmarket:registerItem',
    inputKey = 1,
    items = {
      {
        _type = "select",
        options = {
          {
            id = "food",
            name = "Food",
          },
          {
            id = "water",
            name = "Drink",
          },
          {
            id = "coffee",
            name = "Coffee",
          },
          {
            id = "joint",
            name = "Joint",
          },
          {
            id = "ciggy",
            name = "Ciggies",
          },
          {
            id = "bandage",
            name = "First Aid Kits",
          },
          {
            id = "other",
            name = "Other (Apparel, etc)",
          },
        },
        label = "Type",
        name = "item_type",
      },
      {
        icon = "id-card-alt",
        label = "Name", 
        name = "name",
      },
      {
        icon = "pencil-alt",
        label = "Description",
        name = "description",
      },
      {
        icon = "image",
        label = "Image" .. " (i.imgur.com/example.png; 100x100px)",
        name = "image",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:farmersmarket:registerBanner", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  RPC.execute("ev-farmersmarket:registerBanner", data.values, getCid())
end)

AddEventHandler("ev-farmersmarket:registerBanner", function()
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:farmersmarket:registerBanner',
    key = 1,
    items = {
      {
        icon = "image",
        label = "Image" .. " (i.imgur.com/example.png; 1024x1024px)",
        name = "image",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:getFarmersItems", function(data, cb)
  local result = RPC.execute("ev-farmersmarket:getFarmersItems", data.search)
  cb({ data = result, meta = { ok = true, message = '' } })
end)

RegisterUICallback("ev-ui:farmersItemAction", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  RPC.execute("ev-farmersmarket:farmersItemAction", data)
end)

--

AddEventHandler("ev-polyzone:enter", function(zone, data)
  if zone ~= "farmers_market" then return end
  if data.id == "paleto" then
    inPaletoMarket = true
    local settings = RPC.execute("ev-farmersmarket:getBoothSettings", "paleto")
    processSettings(settings, true)
    return
  end
  if data.id == "deanworld" then
    inDeanworldMarket = true
    local settings = RPC.execute("ev-farmersmarket:getBoothSettings", "deanworld")
    processSettings(settings, false)
    return
  end
end)

AddEventHandler("ev-polyzone:exit", function(zone, data)
  if zone ~= "farmers_market" then return end
  local isConfigEnabled = true
  if inPaletoMarket then
    inPaletoMarket = false
    if not farmersMarketDynamicDisplayEnabled or not isConfigEnabled then return end
    for _, conf in pairs(duiReplaces) do
      RemoveReplaceTexture(conf.txd, conf.tex)
      exports["ev-lib"]:releaseDui(conf.dui.id)
      conf.dui = nil
    end
    return
  end
  if inDeanworldMarket then
    inDeanworldMarket = false
    if not farmersMarketDynamicDisplayEnabled or not isConfigEnabled then return end
    for _, conf in pairs(duiReplaces) do
      RemoveReplaceTexture(conf.txd, conf.tex)
      exports["ev-lib"]:releaseDui(conf.dui.id)
      conf.dui = nil
    end
    return
  end
end)

RegisterNetEvent("ev-farmersmarket:receiveWorkReceipt")
AddEventHandler("ev-farmersmarket:receiveWorkReceipt", function()
  if inDeanworldMarket or inPaletoMarket then
    TriggerEvent("player:receiveItem", "farmersmarketreceipt", 1)
    local shouldIncreaseJobPayout = exports["ev-buffs"]:shouldIncreaseJobPayout()
    if shouldIncreaseJobPayout then
      Wait(500)
      TriggerEvent("player:receiveItem", "farmersmarketreceipt", 1)
    end
  end
end)

exports["ev-polytarget"]:AddBoxZone("farmers_markett", vector3(443.01, -973.6, 25.7), 2, 2, { -- PD shared reset
  heading=0,
  minZ=25.7,
  maxZ=25.7,
  debugPoly=false
})
