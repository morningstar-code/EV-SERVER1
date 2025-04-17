local WorkingOxyRunPlayers = {}

RegisterServerEvent('spawn-car', function()
  TriggerClientEvent('spawn-car-client', source)
end)

RegisterNetEvent('car-found', function()
  TriggerClientEvent('generate-ped-loc', source)
end)

RegisterServerEvent('started-job_oxy', function() --TODO: Figure out which one works
  -- local message = 'Find and steal a vehicle to use as transport.'
  -- exports['destiny-phone']:SendMailToPlayer(source, 'OxyRun', 'Unknown User', message)
  local src = source
  WorkingOxyRunPlayers[source] = true
  TriggerClientEvent('start-job', source)
end)

RegisterServerEvent('started-job_oxy', function() --TODO: Figure out which one works
  -- local message = 'Go to the supplier and ask for the goods.'
  -- exports['destiny-phone']:SendMailToPlayer(source, 'OxyRun', 'Unknown User', message)
  local src = source
  WorkingOxyRunPlayers[source] = true
  TriggerClientEvent('generate-ped-loc', source)
end)

RegisterServerEvent('all-collected', function()
  -- local message = 'Drive to the handoff location with the transport vehicle, wait for the customers and handoff the goods.'
  -- exports['destiny-phone']:SendMailToPlayer(source, 'OxyRun', 'Unknown User', message)
  TriggerClientEvent('generate-corner-loc', source)
end)

RegisterServerEvent('handoff-limit', function()
  -- local message = 'Go to the another handoff location with the transport vehicle, wait for the customers and handoff the goods.'
  -- exports['destiny-phone']:SendMailToPlayer(source, 'OxyRun', 'Unknown User', message)
  TriggerClientEvent('generate-new-corner-loc', source)
end)

RegisterServerEvent('ev-activities:givePayout')
AddEventHandler('ev-activities:givePayout', function(amount, pType, text)
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local charInfo = user:getCurrentCharacter()

  if not WorkingOxyRunPlayers[src] then
    local connect = {
      {
        ["color"] = color,
        ["title"] = "** Node [Activities] | Activity Exploiter **",
        ["description"] = "Log  | Character Name: " .. charInfo.first_name .. " " .. charInfo.last_name .. " | State ID: " .. charInfo.id .. ' | Tried to exploit the activity payout system.',
      }
    }
    PerformHttpRequest("https://discord.com/api/webhooks/1105495908604444683/AtA3BS_neO6sJ19ZfGOCseh9-ODTBfivvH2WAN7wTqJZvdGxWLV9HNjXQ4YwtoO5EIJy",
      function(err, text, headers)
      end, 'POST',
      json.encode({ username = "Node | Exploit Alert", embeds = connect,
        avatar_url = "https://cdn.discordapp.com/attachments/982104385679159296/1059831718103744522/FAtwwr2.png" }), { ['Content-Type'] = 'application/json' })
    return
  end


  if pType == "cash" then
    TriggerClientEvent("DoLongHudText", src, 'He gave you $ ' .. amount .. ' in cash for one item.', 1)
    user:addMoney(amount)
    print(amount)
  elseif pType == "bank" then
    TriggerClientEvent("DoLongHudText", src, 'He gave you $ ' .. amount .. ' to your bank account for one item.', 1)
    print(amount)

    local success, bankId = exports["ev-financials"]:getDefaultBankAccount(user.character.id, false, false)
    if not success then return false end

    local balance = exports["ev-financials"]:getAccountBalance(bankId)

    exports["ev-financials"]:adjustAccountBalance(bankId, "add", amount, src, "Log | Amount: $" .. amount .. " | Type: " .. pType .. " | Job Type (Buff / No Buff): " .. text)
  end

  local connect = {
    {
      ["color"] = color,
      ["title"] = "** pnp [Activities] | Payout Log **",
      ["description"] = "Log | Amount: $" .. amount .. " | Type: " .. pType .. " | Job Type (Buff / No Buff): " .. text .. " | Character Name: " .. charInfo.first_name .. " " .. charInfo.last_name .. " | State ID: " .. charInfo.id,
    }
  }
  PerformHttpRequest("https://discord.com/api/webhooks/1103999352193683456/BqnFxomle4Wq90dxQsy2SDVxQ3XBuK5lVFBCnXxkqZAgQMmfP5FbtC-NtsOS_n3VwOHZ",
    function(err, text, headers)
    end, 'POST',
    json.encode({ username = "pnp | Job Payout Log", embeds = connect,
      avatar_url = "https://cdn.discordapp.com/attachments/982104385679159296/1059831718103744522/FAtwwr2.png" }), { ['Content-Type'] = 'application/json' })
end)


RegisterServerEvent('ev-activities:oxy')
AddEventHandler('ev-activities:oxy', function()
  local src = source
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local charInfo = user:getCurrentCharacter()
  TriggerClientEvent("DoLongHudText", src, 'He gave you $100 for your cashroll.', 1)
  user:addMoney(100)

  local connect = {
      {
        ["color"] = color,
        ["title"] = "** ev-oxy [Activities] | cashroll payout log **",
        ["description"] = "Log | Amount: $" .. amount .. " | Type: " .. pType .. " | Job Type (Buff / No Buff): " .. text .. " | Character Name: " .. charInfo.first_name .. " " .. charInfo.last_name .. " | State ID: " .. charInfo.id,
      }
    }
    PerformHttpRequest("https://discord.com/api/webhooks/1103999352193683456/BqnFxomle4Wq90dxQsy2SDVxQ3XBuK5lVFBCnXxkqZAgQMmfP5FbtC-NtsOS_n3VwOHZ",
      function(err, text, headers)
      end, 'POST',
      json.encode({ username = "node | cashroll payout log", embeds = connect,
      avatar_url = "https://cdn.discordapp.com/attachments/982104385679159296/1059831718103744522/FAtwwr2.png" }), { ['Content-Type'] = 'application/json' })
end)
