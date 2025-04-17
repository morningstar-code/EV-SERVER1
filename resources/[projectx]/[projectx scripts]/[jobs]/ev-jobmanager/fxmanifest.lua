fx_version "cerulean"
games { "gta5" }

shared_scripts {
    "shared/*",
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
    "server/sv_*.lua",
}

client_scripts {
    "@ev-lib/client/cl_rpc.lua",
    "client/cl_*.lua",
}