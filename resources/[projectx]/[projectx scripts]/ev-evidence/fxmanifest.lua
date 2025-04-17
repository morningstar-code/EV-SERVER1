fx_version "cerulean"
games { "gta5" }

shared_script {
    "@ev-lib/shared/sh_util.lua",
    "@ev-lib/shared/sh_cacheable.lua",
    "shared/*",
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    "server/*",
}

client_scripts {
    "@ev-lib/client/cl_rpc.lua",
    "client/*",
}