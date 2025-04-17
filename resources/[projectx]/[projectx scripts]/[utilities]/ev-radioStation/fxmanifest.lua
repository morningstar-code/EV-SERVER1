fx_version "cerulean"

games { "gta5" }

description "Rhodinium Boilerplate"

version "0.1.0"

server_scripts {
    "@cpx/server/lib.js",
    "@ev-lib/server/sv_sql.js",
    "@ev-lib/server/sv_asyncExports.js",
    "@oxmysql/lib/MySQL.lua",
    "server/*.js",
    "server/sv_*.lua",
}

client_scripts {
    "@ev-lib/client/cl_rpc.lua",
    "@ev-lib/client/cl_rpc.js",
    "@ev-lib/client/cl_ui.lua",
    "@ev-lib/client/cl_ui.js",
    "@cpx/client/lib.js",
    "client/cl_*.lua",
    "client/cl_*.js",
}
