local DISCORD_WEBHOOK = "https://discordapp.com/api/webhooks/1088817466081280040/nrdVqztRXTvLB8qrcOp4cIOQVysY93GQjNBoVtNMCF95TQXiAUA4Z5CKgZmyGtQY6cF3"

RegisterServerEvent('sendreport')
AddEventHandler('sendreport', function(data)
    local pName = GetPlayerName(source)
    local connect = {
        {
            ["color"] = "255",
            ["title"] = "Player Reporting the issue - ".. pName,
            ["description"] = "Reported Player ID/'s: \n\n `"..data.title.."` \n\n━━━━━━━━━━━━━━━━━━\n\n Description: \n\n `"..data.description.."` \n\n━━━━━━━━━━━━━━━━━━\n\n VOD / Clip / Screenshot URLs: \n\n `"..data.url.."` \n\n━━━━━━━━━━━━━━━━━━\n\n",
	        ["footer"] = {
                ["text"] = "Made by Hypix",
            },
        }
    }
    PerformHttpRequest(DISCORD_WEBHOOK, function(err, text, headers) end, 'POST', json.encode({username = "Player Reports",  avatar_url = "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-512.png",embeds = connect}), { ['Content-Type'] = 'application/json' })
end)

