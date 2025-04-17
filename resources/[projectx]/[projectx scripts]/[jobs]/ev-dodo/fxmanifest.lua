fx_version "cerulean"

games { "gta5" }

description "Victoro Dodologistics"

version "0.1.0"

server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_sql.js"
server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_asyncExports.js"

client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_ui.js"
client_script "@ev-lib/client/cl_rpc.js"
client_script "@ev-locales/client/lib.js"

server_scripts {
    "build/server/*.js",
}

client_scripts {
    "build/client/*.js",
}
