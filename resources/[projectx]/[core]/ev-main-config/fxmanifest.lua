fx_version "cerulean"

games { "gta5" }


version "0.1.0"

server_script "@ev-lib/server/sv_sql.js"
server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_cpx.js"
server_script "@ev-lib/server/sv_cpx.lua"
server_script "@ev-lib/server/sv_asyncExports.js"
server_script "@cpx/server/lib.js"

client_script "@ev-lib/client/cl_ui.js"
client_script "@ev-lib/client/cl_rpc.js"
client_script "@cpx/client/lib.js"

server_scripts {
  'server/sv_main.js'
}

client_scripts {
  'client/cl_main.js'
}

shared_scripts {
  "shared/sh_*.js",
}

dependency 'ev-lib'
dependency 'ev-main-config'
