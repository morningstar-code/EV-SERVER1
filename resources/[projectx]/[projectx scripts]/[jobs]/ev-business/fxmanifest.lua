fx_version "cerulean"
games { "gta5" }

lua54 'yes'

client_script "@cpx/client/lib.js"
server_script "@cpx/server/lib.js"
shared_script "@cpx/shared/lib.lua"

client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
    "@ev-errorlog/client/cl_errorlog.lua",
    '@ev-sync/client/lib.lua',
    "@ev-lib/client/cl_rpc.lua",
    "@ev-locales/client/lib.lua",
    '@mka-lasers/client/client.lua',
    "client/cl_*.lua",
}

shared_script {
    "@ev-lib/shared/sh_util.lua",
    "shared/sh_*.*",
    "business/**/sh_*.lua",
}

server_scripts {
    "config.lua",
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_asyncExports.lua",
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
    "server/sv_*.lua",
}

