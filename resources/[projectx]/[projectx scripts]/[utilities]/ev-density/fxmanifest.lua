fx_version 'cerulean'

games {
    'gta5'
}

shared_scripts {
    "shared/*",
}

client_scripts {
	'@PolyZone/client.lua',
	'@PolyZone/BoxZone.lua',
	'@PolyZone/EntityZone.lua',
	'client/*.lua'
}

server_scripts {
	"@ev-infinity/server/sv_main.lua",
	'server/*.lua',
}
