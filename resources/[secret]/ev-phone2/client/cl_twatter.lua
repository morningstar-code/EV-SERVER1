local phoneItems = {"mobilephone", "stoleniphone", "stolennokia", "stolenpixel3", "stolens8", "boomerphone"}
local currentJob = nil

RegisterNetEvent("phone:twatter:receive")
AddEventHandler("phone:twatter:receive", function(pTwat)
  local hasPhone = false

  for _,itemId in ipairs(phoneItems) do
    hasPhone = exports['ev-inventory']:hasEnoughOfItem(itemId, 1, false, true) or hasPhone
  end

  SendUIMessage({
    source = "ev-nui",
    app = "phone",
    data = {
      action = "twatter-receive",
      character = pTwat.character,
      timestamp = pTwat.timestamp,
      text = pTwat.text,
      hasPhone = hasPhone,
      isBlue = pTwat.isBlue or false
    }
  })
end)

RegisterUICallback("ev-ui:getBlockedTwatterUsers", function (data, cb)
  local users = RPC.execute("ev-phone:getBlockedUsers")
  cb({ data = users, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("ev-ui:unblockTwatterUser", function (data, cb)
  local success = RPC.execute("ev-phone:unblockTwatterUser", data.user)
  cb({ data = success, meta = { ok = success, message = "done" } })
end)

RegisterUICallback("ev-ui:twatSend", function(data, cb)
  local character_id, first_name, last_name, text = data.character.id, data.character.first_name, data.character.last_name, data.text
  local success, message = RPC.execute("phone:addTwatterEntry", character_id, first_name, last_name, text)
  cb({ data = message, meta = { ok = success, message = (not success and message or 'done') } })
end)

RegisterUICallback("ev-ui:getTwats", function(data, cb)
  local success, message = RPC.execute("phone:getTwatterEntries")
  cb({ data = message, meta = { ok = success, message = (not success and message or 'done') } })
end)

-- TODO: Iterate over online admins.
-- report a twat
RegisterUICallback("ev-ui:twatReport", function(data, cb)
  -- INCOMING
  -- data.character = character data from ev-ui:init
  -- data.twat = tweet content

  -- RETURN
  -- cb data = {},
  --    meta = { ok: true | false, message: string }
  cb({ data = {}, meta = { ok = true, message = '' } })
end)

RegisterNUICallback('ev-ui:blockTwatterUser', function (data, cb)
  local success, message = RPC.execute("ev-phone:blockTwatterUser", data.cid)
  cb({ data = {}, meta = { ok = success, message = message } });
end)

RegisterUICallback("ev-ui:phone:purchaseBlue", function(data, cb)
  local success, message = RPC.execute("ev-phone:purchaseBlue")
  cb({ data = success, meta = { ok = success, message = (not success and message or 'done') } })
end)

RegisterUICallback("ev-ui:phone:cancelBlue", function(data, cb)
  local finished = exports["ev-taskbar"]:taskBar(5000, "Canceling...", true) -- 30000
  if finished ~= 100 then
    cb({ data = false, meta = { ok = false, message = "Failed to cancel subscription" } })
    return
  end

  local success, message = RPC.execute("ev-phone:cancelBlue")
  cb({ data = success, meta = { ok = success, message = (not success and message or 'done') } })
end)

RegisterUICallback("ev-ui:phone:getTwatterBlue", function(data, cb)
  local success = RPC.execute("ev-phone:getTwatterBlue")
  cb({ data = success, meta = { ok = success, message = 'done' } })
end)