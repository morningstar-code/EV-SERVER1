fx_version "cerulean"

games { "gta5" }

description "EV Job Framework"

version "0.1.0"

shared_script "@ev-lib/shared/sh_cacheable.js"

server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_sql.js"
server_script "@ev-lib/server/sv_sql.lua"
server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_rpc.lua"
server_script "@ev-lib/server/sv_asyncExports.js"

client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_flags.lua"
client_script "@ev-lib/client/cl_ui.js"
client_script "@ev-lib/client/cl_rpc.js"
client_script "@ev-lib/client/cl_rpc.lua"
client_script "@ev-sync/client/lib.lua"


client_scripts {
	"client/*.js",
	"client/*.lua"
}

server_scripts {
	"config.lua",
	"server/*.js",
	"server/*.lua"
}

client_script "tests/cl_*.js"
server_script "tests/sv_*.js"