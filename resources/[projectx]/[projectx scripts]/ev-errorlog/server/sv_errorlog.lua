RegisterServerEvent('error')
AddEventHandler('error',function(resource, args)

    sendToDiscord("```Error in "..resource..'```', args)
end)



function sendToDiscord(name, args, color)
    local connect = {
          {
              ["color"] = 16711680,
              ["title"] = "".. name .."",
              ["description"] = args,
              ["footer"] = {
                  ["text"] = "Made by Rhodinium",
              },
          }
      }
    PerformHttpRequest('https://discord.com/api/webhooks/997750701495173250/rfu3rNPA69nq-wh_e1UIfj3qTT_HWxt4EytI7zs27LdEwr5h6RnTw-MJncZK1njYCI_M', function(err, text, headers) end, 'POST', json.encode({username = "Error Log", embeds = connect, avatar_url = "https://i.imgur.com/VuKnN5P_d.webp?maxwidth=728&fidelity=grand"}), { ['Content-Type'] = 'application/json' })
end

-- it must be saving into a file with io.open("test.lua", "r")
