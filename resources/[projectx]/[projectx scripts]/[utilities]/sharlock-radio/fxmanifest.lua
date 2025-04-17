fx_version "cerulean"

games { "gta5" }

description "Victoro Boilerplate"

version "0.1.0"

server_script "@cpx/server/lib.js"

client_script "@ev-lib/client/cl_ui.js"
client_script "@cpx/client/lib.js"

server_scripts {
    "server/*.js",
}

client_scripts {
    "client/*.js",
}
