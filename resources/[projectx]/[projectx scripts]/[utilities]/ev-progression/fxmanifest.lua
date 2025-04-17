fx_version "cerulean"

games { "gta5" }

description "Rhodinium Boilerplate"

version "0.1.0"

server_script "@ev-lib/server/sv_sql.js"
server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_cpx.js"
server_script "@ev-lib/server/sv_asyncExports.js"

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    "server/*.js",
    "server/sv_*.lua",
}

client_scripts {
    "@ev-lib/client/cl_rpc.lua",
    "client/classes/*.lua",
    "client/cl_*.lua",
}
