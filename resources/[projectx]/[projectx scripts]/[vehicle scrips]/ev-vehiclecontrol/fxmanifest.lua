fx_version "cerulean"

games {"gta5"}

description "Victoro Vehicle Remote Control"
author "xIAlexanderIx"

server_scripts {
	"server/main.lua"
}

client_script "@ev-sync/client/lib.lua"

client_scripts {
	"client/vehicles/*.lua",
	"client/main.lua",
	"client/tools.lua"
}