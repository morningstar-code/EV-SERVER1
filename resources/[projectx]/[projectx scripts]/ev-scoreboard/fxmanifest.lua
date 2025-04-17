fx_version "cerulean"
games { "gta5" }

shared_scripts {
    "shared/*",
}

server_scripts {
    "@ev-lib/server/sv_infinity.lua",
    "server/*",
}

client_scripts {
    "@ev-errorlog/client/cl_errorlog.lua",
    "@ev-lib/shared/sh_cacheable.lua",
    "@ev-lib/client/cl_infinity.lua",
    "@warmenu/warmenu.lua",
    "client/*",
}