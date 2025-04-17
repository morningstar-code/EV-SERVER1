fx_version "cerulean"

games {"gta5"}

description "Rhodinium Vehicle Sync"

shared_scripts {
	"shared/sh_*.lua",
}

server_scripts {
	"@oxmysql/lib/MySQL.lua",
	"@ev-lib/server/sv_infinity.lua",
	"@ev-lib/server/sv_rpc.lua",
	"server/sv_*.lua",
}

client_scripts {
	"@ev-lib/client/cl_rpc.lua",
	"client/tools/cl_*.lua",
	"client/controllers/cl_*.lua",
	"client/cl_*.lua",
}