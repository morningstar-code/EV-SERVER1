fx_version "cerulean"

games { "gta5" }

description "Cool Vehicle Lifts"

version "0.1.0"

server_script "@ev-lib/server/sv_sql.js"
server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_cpx.js"
server_script "@ev-lib/server/sv_asyncExports.js"

client_script "@ev-lib/client/cl_ui.js"
client_script "@ev-lib/client/cl_rpc.js"

server_scripts {
    "build/server/*.js",
}

client_scripts {
    "build/client/*.js",
}