fx_version "cerulean"

game { "gta5" }

shared_scripts {
    "shared/config.lua"
}

client_scripts {
    "@ev-lib/client/cl_ui.lua",
    "@ev-lib/client/cl_rpc.lua",
    "client/cl_utils.lua",
    "client/cl_main.lua",
    "client/cl_spawn.lua"
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_sql.lua",
    "@ev-lib/shared/sh_util.lua",
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_asyncExports.lua",
    "server/sv_utils.lua",
    "server/sv_main.lua"
}