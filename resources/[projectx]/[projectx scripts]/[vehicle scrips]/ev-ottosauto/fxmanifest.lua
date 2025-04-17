fx_version "cerulean"
games { "gta5" }

client_script "@ev-sync/client/lib.lua"
client_script "@ev-lib/client/cl_ui.lua"
client_script "@PolyZone/client.lua"
client_script "@ev-lib/client/cl_polyhooks.lua"
client_script "@cpx/client/lib.js"

server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_asyncExports.lua"
server_script "@ev-lib/server/sv_sql.lua"


client_scripts {
  "@ev-lib/client/cl_rpc.lua",
  "client/cl_*.lua"
}

shared_script {
  "@ev-lib/shared/sh_util.lua",
  "@cpx/shared/lib.lua",
  "shared/sh_*.*",
}

server_scripts {
  "@oxmysql/lib/MySQL.lua",
  "@ev-lib/server/sv_rpc.lua",
  "server/sv_*.lua",
  
}
