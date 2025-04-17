fx_version "cerulean"

games {"gta5"}

description "Victoro Peek Interactions"

shared_scripts {
	"shared/sh_*.lua",
}

server_scripts {
	"server/sv_*.lua",
}

client_script "@mka-array/Array.lua"
client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
	"client/cl_*.lua",
	'@ev-lib/client/cl_rpc.lua',
	"@cpx/client/lib.js",
	"client/entries/cl_*.lua",
}