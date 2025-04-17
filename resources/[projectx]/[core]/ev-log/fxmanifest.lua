fx_version "cerulean"
games { "gta5" }

shared_scripts {
    '@ev-lib/shared/sh_cacheable.lua',
    '@ev-lib/shared/sh_util.lua',
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
    "server/sv_*.lua",
}

dependency "ev-base"