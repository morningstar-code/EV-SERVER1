RegisterNetEvent('cid_createFakeID')
AddEventHandler('cid_createFakeID', function()
  local elements = {
    { name = "first", label = "Firstname", icon = "user" },
    { name = "last", label = "Lastname", icon = "user" },
    { name = "sex", label = "Sex", icon = "genderless" },
    { name = "dob", label = "Date of Birth (YYYY-MM-DD)", icon = "calendar-day" }
  }

  local prompt = exports['ev-ui']:OpenInputMenu(elements, function(values)
      if values.first == nil then
        TriggerEvent('DoLongHudText', 'Please provide a firstname', 2)
        return false
      end
      if values.last == nil then
        TriggerEvent('DoLongHudText', 'Please provide a lastname', 2)
        return false
      end
      if values.sex == nil then
        TriggerEvent('DoLongHudText', 'Please provide a sex', 2)
        return false
      end
      if values.dob == nil then
        TriggerEvent('DoLongHudText', 'Please provide a date of birth', 2)
        return false
      end
      return true
  end)

  local cid = exports["isPed"]:isPed("cid")
  local information = {
    ["fake"] = 1,
    ["Identifier"] = math.floor(math.random() * 1000) + 1000,
    ["Name"] = prompt.first,
    ["Surname"] = prompt.last,
    ["Sex"] = prompt.sex,
    ["DOB"] = prompt.dob,
    ["_hideKeys"] = { "fake" }
  }
  TriggerEvent('player:receiveItem', "idcard", 1, false, {}, json.encode(information))
  RPC.execute("ev-cid:addLog", "fakeid", "created")
end)

AddEventHandler("cid_viewLogs", function ()
  local logs = RPC.execute("ev-cid:getCreationLogs", "fakeid")

  local elements = {}
  for index, log in pairs(logs) do
    local description = "Created Fake ID"
    table.insert(elements, {
      title = log.character_name .. " (" .. log.character_id .. ") at " .. log.timestamp,
      description = description
    })
  end

  exports['ev-ui']:showContextMenu(elements)
end)

Citizen.CreateThread(function()
  exports["ev-polytarget"]:AddBoxZone(
    "pd_create_id",
    vector3(484.225, -994.029, 30.667), 1.00, 1.00,
    {
      minZ = 29.0,
      maxZ = 31.45
    }
  );

  exports["ev-interact"]:AddPeekEntryByPolyTarget("pd_create_id",
    {
      {
        event = "cid_createFakeID",
        id = "pd_create_id_main",
        icon = "fas fa-book",
        label = "Create new ID card"
      },
      {
        event = "cid_viewLogs",
        id = "pd_create_id_logs",
        icon = "fas fa-list",
        label = "View logs"
      }
    },
    {
      distance = { radius = 2.0 },
      job = { 'police' }
    }
  )
end)