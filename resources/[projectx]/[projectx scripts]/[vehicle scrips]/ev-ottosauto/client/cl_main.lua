CreateThread(function()
  exports["ev-polyzone"]:AddBoxZone("ottos_auto", vector3(820.39, -805.03, 26.18), 59.0, 59.8, {
    minZ=22.98,
    maxZ=31.78,
    heading=0
  })
end)


CPX.Events.on("ev-ottosauto:vehicle:transaction", function(pArgs, pEntity, pEntityFlags, pEntityCoords)
  local action = pArgs['action'] and pArgs['action'] or false
  local business = pArgs['business'] and pArgs['business'] or 'ottos_autos'
  if action and (action == 'sell' or action =='buy') then
    exports['ev-ui']:openApplication('textbox', {
        callbackUrl = 'ev-ui:ottosauto:transaction',
        inputKey = { action = ("ottosauto_%s"):format(action), business = business },
        items = {
          {
            icon = "user",
            label = "State ID",
            name = "state_id",
          },
          {
            icon = "dollar-sign",
            label = "Price",
            name = "price",
          },
        },
        hiddenItems = {
          vehicleVIN = exports['ev-vehicles']:GetVehicleIdentifier(pEntity),
          vehicleEntityHandle = pEntity
        },
        show = true,
    })
  else
    TriggerEvent("DoLongHudText", "There was no action, scuff.")
  end
end)

RegisterUICallback("ev-ui:ottosauto:transaction", function(data, cb)
  exports['ev-ui']:closeApplication('textbox')

  local action = data.inputKey.action
  local workerId = tonumber(data.character.id)
  local customerId = tonumber(data.values.state_id)
  local price = tonumber(data.values.price)
  local vehicleVIN = data.hiddenItems.vehicleVIN
  local vehicleEntityHandle = tonumber(data.hiddenItems.vehicleEntityHandle)
  local businessCode = data.inputKey.business
  local workerServerId = tonumber(data.character.server_id)
  --do a RPC event here
  CPX.Procedures.execute("ev-ottosauto:vehicle:transaction", action, workerId, customerId, price, vehicleVIN, businessCode, vehicleEntityHandle, workerServerId)
end)

RegisterUICallback('ev-ottosauto:business:sale:accepted', function(data, cb)
  local transactionType, businessAccountId, customerId, price, workerId, vin, sellerFirstName, sellerLastName, vehiclePlate, vehicleEntityHandle, workerServerId, businessCode = data._data.title, data._data.businessAccountId, data._data.targetCID, data._data.price, data._data.workerCID, data._data.vin, data.character.first_name, data.character.last_name, data._data.vehicleLicensePlate, data._data.vehicleEntityHandle, data._data.workerServerId, data._data.businessCode
  local transactionLog = businessCode == 'tuner' and "Tuner Shop: %s handled by [%s] %s %s" or "Otto's Auto: %s handled by [%s] %s %s"
  local success, errMessage = CPX.Procedures.execute("ev-ottosauto:vehicle:accepted", workerId, customerId, businessAccountId, price, transactionLog:format(vehiclePlate, workerId, sellerFirstName, sellerLastName), transactionType, vin, vehicleEntityHandle, workerServerId, businessCode)
  cb({ data = {}, meta = { ok = success, message = errMessage } })
end)

