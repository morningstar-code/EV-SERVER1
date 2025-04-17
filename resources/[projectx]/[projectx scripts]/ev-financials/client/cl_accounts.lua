RegisterUICallback("ev-ui:getAccounts", function(data, cb)
  local accounts = RPC.execute("GetAccounts", data.id, data.cid, data.name) -- data.character.bank_account_id, data.character.id
  if HasMonitoredAccounts(accounts) then
    SendAccessAlert('10-101')
  end
  cb({ data = { accounts = accounts and accounts or {} }, meta = { ok = true, message = 'done' }})
end)

-- CREATE ACCOUNT
RegisterUICallback("ev-ui:createAccount", function(data, cb)
  local name, accountType, is_frozen, is_monitored, is_owner = data.name, data.type_id, data.is_frozen, data.is_monitored, data.is_owner or false
  local cid, access = data.cid, data.access
  local success, message = RPC.execute("CreateAccount", name, cid, access, accountType, is_frozen, is_monitored, is_owner)
  cb({ data = {}, meta = { ok = success, message = (not success and message or 'done') } })
end)

-- EDIT ACCOUNT
RegisterUICallback("ev-ui:editAccount", function(data, cb)
  local id, name, accountType, is_frozen, is_monitored = data.id, data.name, data.type_id, data.is_frozen, data.is_monitored
  local success, message = RPC.execute("EditAccount", id, name, accountType, is_frozen, is_monitored)
  cb({ data = {}, meta = { ok = success, message = (not success and message or 'done') } })
end)

-- TODO: Backend Hookup
-- DELETE ACCOUNT
RegisterUICallback("ev-ui:deleteAccount", function(data, cb)
  local id = data.id
  Citizen.SetTimeout(500, function()
    cb({ data = {}, meta = { ok = true, message = 'Account Deaded!' } })
  end)
end)

-- GET ACCOUNT TYPES
RegisterUICallback("ev-ui:getAccountTypes", function(data, cb)
  local success, message = RPC.execute("GetAccountTypes")
  cb({ data = message, meta = { ok = success, message = (not success and message or 'done') } })
end)

-- GET ACCOUNT CHARACTERS
RegisterUICallback("ev-ui:getAccountCharacters", function(data, cb)
  local success, message = RPC.execute("GetCharactersWithAccess", data.account_id)
  cb({ data = message, meta = { ok = success, message = 'done' } })
end)

-- ADD CHARACTER TO ACCOUNT
RegisterUICallback("ev-ui:addAccountCharacterPermissions", function(data, cb)
  local account_id, cid, access = data.account.id, data.employee.id, data.employee.access
  local success, message = RPC.execute("AddCharacterToAccount", account_id, cid, access)
  cb({ data = {}, meta = { ok = success, message = (not success and message or 'done') } })
end)

-- EDIT CHARACTER PERMISSIONS
RegisterUICallback("ev-ui:editAccountCharacterPermissions", function(data, cb)
  local account_id, cid, access = data.account.id, data.employee.id, data.employee.access
  local success, message = RPC.execute("EditCharacterPermission", account_id, cid, access)
  cb({ data = {}, meta = { ok = success, message = (not success and message or 'done') } })
end)

RegisterUICallback("ev-ui:removeCharacterFromAccount", function(data, cb)
  local account_id, cid = data.account.id, data.employee.id
  local success, message = RPC.execute("RemoveCharacterFromAccount", account_id, cid)
  cb({ data = {}, meta = { ok = success, message = (not success and message or 'done') } })
end)

function HasMonitoredAccounts(accounts)
  local monitored, accountData = false

  if accounts then
    for _, account in pairs(accounts) do
      if account.is_monitored == 1 then
        monitored, accountData = true, account
        break
      end
    end
  end

  return monitored, account
end

function SendAccessAlert(dispatchCode)
  local plyPos = GetEntityCoords(PlayerPedId())
  local streetName, crossingRoad = GetStreetNameAtCoord(plyPos.x, plyPos.y, plyPos.z)

  TriggerServerEvent('dispatch:svNotify', {
    dispatchCode = dispatchCode,
    firstStreet = GetStreetNameFromHashKey(streetName),
    secondStreet = GetStreetNameFromHashKey(crossingRoad),
    extraData = exports["isPed"]:isPed("fullname"),
    origin = { x = plyPos.x, y = plyPos.y, z = plyPos.z }
  })
end