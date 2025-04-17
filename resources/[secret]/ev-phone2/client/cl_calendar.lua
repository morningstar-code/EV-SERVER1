local UpcomingEvents = {}

RegisterUICallback("ev-ui:calendar:createEvent", function(data, cb)
  local result, message = RPC.execute("ev-phone:calendar:createEvent", data)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("ev-ui:calendar:joinEvent", function(data, cb)
  -- text: Event Code
  local result, message = RPC.execute("ev-phone:calendar:joinEvent", data.text)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("ev-ui:calendar:sendInvite", function(data, cb)
  -- text: State ID to invite
  local result, message = RPC.execute("ev-phone:calendar:sendInvite", data.id, data.text)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("ev-ui:calendar:leaveEvent", function(data, cb)
  -- id: Event ID to leave
  local result = RPC.execute("ev-phone:calendar:leaveEvent", data.id)
  cb({ data = "ok", meta = { ok = result, message = "done" } })
end)

RegisterUICallback("ev-ui:calendar:getEvents", function(data, cb)
  local data = RPC.execute("ev-phone:calendar:getEvents", data.character.id) or {}
  UpcomingEvents = data
  cb({ data = data, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("ev-ui:calendar:editEvent", function(data, cb)
  local result, message = RPC.execute("ev-phone:calendar:editEvent", data)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterUICallback("ev-ui:calendar:forceAddEvent", function(data, cb)
  local result, message = RPC.execute("ev-phone:calendar:forceAddEvent", data.id, data.text)
  cb({ data = "ok", meta = { ok = result, message = message } })
end)

RegisterNetEvent("ev-phone:calendar:eventInvite", function(pEventId, pName)
  local result = DoPhoneConfirmation("Event Invite", pName)
  print(result)
  if result then
    RPC.execute("ev-phone:calendar:joinEventById", pEventId)
  end
end)

RegisterCommand('ev-phone:calendar:eventInvite', function() 
  TriggerEvent('ev-phone:calendar:eventInvite', 1, 'Test Event')
end)

RegisterNetEvent("ev-phone:calendar:checkEvent", function(pEventId)
  for _, event in ipairs(UpcomingEvents) do
    if event.id == pEventId then
      SendUIMessage({
        source = "ev-nui",
        app = "phone",
        data = {
          action = "notification",
          target_app = "calendar",
          title = "Calendar",
          body = event.name .. " is starting!",
          icon = { background = "#171717", color = "white", name = "calendar-alt" },
          show_even_if_app_active = true,
        },
      })
      return
    end
  end
end)

function getUpcomingEvents(pCharacterId)
  UpcomingEvents = RPC.execute("ev-phone:calendar:getUpcomingEvents", pCharacterId) or {}
  if #UpcomingEvents > 0 then
    SendUIMessage({
      source = "ev-nui",
      app = "phone",
      data = {
        action = "notification",
        target_app = "calendar",
        title = "Calendar",
        body = "You have " .. #UpcomingEvents .. " event" .. (#UpcomingEvents > 1 and "s" or "") .. " happening soon",
        icon = { background = "#171717", color = "white", name = "calendar-alt" },
        show_even_if_app_active = true,
      },
    })
  end
end

AddEventHandler("ev-spawn:characterSpawned", getUpcomingEvents)
