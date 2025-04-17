listening = false
currentVehicle = nil
local spawnedvehicles = {}

local function getCurrentVehicle(pEntity, pShop)
  local vehiclePos = GetEntityCoords(pEntity)
  local index = false
  for i, v in ipairs(config[pShop].carSpawns) do
    local coords = vector3(v["coords"][1], v["coords"][2], v["coords"][3])
    if #(vehiclePos - coords) < 1.0 then
      index = i
      break
    end
  end

  currentVehicle = index
end

function getTestDriveLocation(shop)
  return config[shop].testDriveSpawnPoint
end

exports("getTestDriveLocation", getTestDriveLocation)

AddEventHandler("ev-carshop:check", function(pParams, pEntity, pContext)
  getCurrentVehicle(pEntity, currentLocation)
  if not currentVehicle then return print("ev-carshop | no current vehicle has been found") end

  local info = RPC.execute("ev-carshop:getInformations", currentLocation, currentVehicle)
  if not info then return end 

  local baseprice = info.price
  local commissionprice = math.floor(baseprice * (info.commission / 100))
  local totalPriceWithCommission = baseprice + commissionprice
  local tax = RPC.execute("PriceWithTaxString", totalPriceWithCommission, "Vehicle Sales")

  local infos = {
    { title = "Vehicle: " .. GetLabelText(GetDisplayNameFromVehicleModel(info.model)), icon = "car" },
    { title = "Class: " .. exports["ev-vehicles"]:GetVehicleRatingClass(pEntity),    icon = "registered" },
    { title = "Price: $" .. tax.text .. ".",                                           icon = "money-bill" },
    { title = "Inventory: " .. info.stock .. " in Stock.",                             icon = "warehouse" },
  }

  local job = exports["ev-business"]:IsEmployedAt("pdm")
  if job then 
    table.insert(infos, { title = "Information:", description = "", icon = "info" })
    table.insert(infos, { title = "Commission: " .. info.commission .. "%", icon = "percentage" })
    table.insert(infos, { title = "Base Price: $" .. baseprice, icon = "money-bill" })
    table.insert(infos, { title = "Commission Price: $" .. commissionprice, icon = "coins" })
    table.insert(infos, { title = "Taxes: $" .. tax.text .. ".", icon = "file-invoice-dollar" })
  end

  local data = {}

  for i, v in ipairs(infos) do
    table.insert(data, {
      title = v.title,
      icon = v.icon,
    })
  end

  exports["ev-ui"]:showContextMenu(data)
end)

AddEventHandler("ev-carshop:change", function(pParams, pEntity, pContext)
  getCurrentVehicle(pEntity, currentLocation)
  if not currentVehicle then return end

  openShowroom(currentLocation, true)
end)

RegisterNetEvent("ev-carshop:updateDisplay")
AddEventHandler("ev-carshop:updateDisplay", function(shop)
  if "tuner" or "pdm" == shop then
    spawn(shop)
  end
end)


AddEventHandler("ev-carshop:purchaseStock", function(pParams, pEntity, pContext)
  exports['ev-ui']:openApplication('textbox', {  
    callbackUrl = 'ev-carshop:purchaseStock',
    inputKey = 1,
    items = {
      {
        icon = "fas fa-car-side",
        label = "Vehicle Model Name", 
        name = "vehcielmodelname",
      },
      {
        icon = "fas fa-sort-amount-up-alt",
        label = "Amount To Purchase",
        name = "amounttopurchase",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-carshop:purchaseStock", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  local dModel = data.values.vehcielmodelname
  local amount = tonumber(data.values.amounttopurchase)

  if not dModel then
    TriggerEvent("DoLongHudText", "Vehicle Model Name needs to be filled out", 2)
    return
  end
  if not amount then
    TriggerEvent("DoLongHudText", "Amount needs to be 1 or above", 2)
    return
  end

  local data = {
    model = dModel,
    vehicleAmount = amount,
    location = currentLocation,
  }

  RPC.execute("ev-carshop:stockPurchase", data)
end)


AddEventHandler("ev-carshop:commission", function(pParams, pEntity, pContext)
  getCurrentVehicle(pEntity, currentLocation)
  if not currentVehicle then return end

  exports['ev-ui']:openApplication('textbox', {  
    callbackUrl = 'ev-carshop:commission',
    inputKey = 1,
    items = {
      {
        icon = "percentage",
        label = "Commission",
        name = "commission",
      }
    },
    show = true,
  })
end)

RegisterUICallback("ev-carshop:commission", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports["ev-ui"]:closeApplication("textbox")
  local dComission = data.values.commission
  local comission = tonumber(dComission)
  if not comission then
    TriggerEvent("DoLongHudText", "Commission needs to be 1-30", 2)
    return
  end

  if comission < 1 or comission > 30 then
    TriggerEvent("DoLongHudText", "Commission needs to be 1-30", 2)
    return
  end

  TriggerServerEvent("ev-carshop:commission", currentLocation, currentVehicle, comission)
end)

AddEventHandler("ev-carshop:testdrive", function(pParams, pEntity, pContext)
  getCurrentVehicle(pEntity, currentLocation)
  if not currentVehicle then return end

  local model = pContext.model
  local pos = getTestDriveLocation(currentLocation) 
  
  -- TODO:spawn test driver vehicle its easy but im lazy :3
  exports["ev-flags"]:SetVehicleFlag(vehicle, "isTestDriveVehicle", true)
end)

AddEventHandler("ev-carshop:testdriveReturn", function(pParams, pEntity, pContext)
  Sync.DeleteVehicle(pEntity)
  Sync.DeleteEntity(pEntity)
end)

AddEventHandler("ev-carshop:sell", function(pParams, pEntity, pContext)
  getCurrentVehicle(pEntity, currentLocation)
  if not currentVehicle then return end

  -- local plate = exports["ev-vehicles"]:GetVehiclePlate(pEntity)

  TriggerServerEvent("ev-carshop:sell", plate, currentLocation, currentVehicle)
end)

AddEventHandler("ev-carshop:buy", function(pParams, pEntity, pContext)
  getCurrentVehicle(pEntity, currentLocation)
  if not currentVehicle then return end

  local info = RPC.execute("ev-carshop:getInformations", currentLocation, currentVehicle)
  if not info then return end

  local baseprice = info.price
  local commissionprice = math.floor(baseprice * (info.commission / 100))
  local totalPriceWithCommission = baseprice + commissionprice
  local tax = RPC.execute("PriceWithTaxString", totalPriceWithCommission, "Vehicle Sales")
  local financing = math.floor(baseprice / 10)
  local downpayment = math.floor(commissionprice + tax.total + financing)
  local stock = info.stock

  local vehicle = GetLabelText(GetDisplayNameFromVehicleModel(info.model))
  if vehicle == "NULL" then vehicle = GetDisplayNameFromVehicleModel(info.model) end

  local params = {
    shop = currentLocation,
    model = info.model,
    name = vehicle,
    seller = info.seller.sid,
    sellername = info.seller.name,
    downpayment = downpayment, 
    commission = commissionprice,
    finalprice = tax.total,
    tax = tax.tax,
    financing = financing,
    stock = stock,
    buyer = exports["isPed"]:isPed("fullname"),
  }

  if info.stock <= 0 then
    return TriggerEvent("DoLongHudText", "There is no stock left", 2)
  end

  local success, msg = RPC.execute('ev-carshop:buy', params)
  if not success then
    return TriggerEvent("DoLongHudText", msg, 2)
  end

  TriggerEvent("DoLongHudText", msg, 1)
end)
