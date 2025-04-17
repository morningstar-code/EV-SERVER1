fx_version "cerulean"

games { "gta5" }

description "Cool Boilerplate"

version "0.1.0"

server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_sql.js"
server_script "@ev-lib/server/sv_asyncExports.js"

client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_ui.js"
client_script "@ev-lib/client/cl_rpc.js"

shared_script "@ev-lib/shared/sh_cacheable.js"

server_scripts {
    "server/*.js",
}

client_scripts {
    "client/*.js",
}
