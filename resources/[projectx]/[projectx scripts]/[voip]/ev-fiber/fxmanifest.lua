fx_version "cerulean"

games { "gta5" }

description "Victoro Fiber"

version "0.1.0"

ui_page 'nui/index.html'

files {
    'nui/**/*',
}


server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_sql.js"
server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_asyncExports.js"
server_script "@ev-lib/server/sv_cpx.js"

client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_ui.js"
client_script "@ev-lib/client/cl_rpc.js"

server_scripts {
    "server/*.js",
    "server/src/*.js",
}

client_scripts {
    "client/*.js",
}
