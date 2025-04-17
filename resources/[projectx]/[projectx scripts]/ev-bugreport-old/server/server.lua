local DISCORD_WEBHOOK = "https://discord.com/api/webhooks/997750701495173250/rfu3rNPA69nq-wh_e1UIfj3qTT_HWxt4EytI7zs27LdEwr5h6RnTw-MJncZK1njYCI_M"

RegisterServerEvent('send')
AddEventHandler('send', function(data)
    local pName = GetPlayerName(source)
    local connect = {
        {
            ["color"] = "255",
            ["title"] = "Bug Report - ".. pName,
            ["description"] = "Bug: (A name for the bug) \n\n `"..data.title.."` \n\n━━━━━━━━━━━━━━━━━━\n\n Description: (A description of what happens and what may cause it) \n\n `"..data.description.."` \n\n━━━━━━━━━━━━━━━━━━\n\n VOD, Clip or Screenshot (URL ONLY | Please use F8 for any console errors) \n\n `"..data.url.."` \n\n━━━━━━━━━━━━━━━━━━\n\n",
	        ["footer"] = {
                ["text"] = "Sent by Victoro ingame bug report",
            },
        }
    }
    PerformHttpRequest(DISCORD_WEBHOOK, function(err, text, headers) end, 'POST', json.encode({username = "Rhodinium",  avatar_url = "https://cdn.discordapp.com/attachments/763640662096084993/1005308565516451912/7.png",embeds = connect}), { ['Content-Type'] = 'application/json' })
end)

