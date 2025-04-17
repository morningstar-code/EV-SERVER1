fx_version "cerulean"

games { "gta5" }

description "ev-heroin"
author "Rhodinium"
version "0.1.0"

server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_asyncExports.js"

client_script "@ev-lib/client/cl_rpc.js"
client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_ui.js"

server_scripts {
    "server/sv_*.js",
}

client_scripts {
    "client/cl_*.js",
}
