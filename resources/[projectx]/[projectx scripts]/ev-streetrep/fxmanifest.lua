fx_version "cerulean"

game "gta5"

shared_script {
    '@ev-lib/shared/sh_util.lua',
}

client_scripts {
    "@ev-lib/client/cl_rpc.lua",
    "@ev-lib/client/cl_ui.lua",
    "@ev-errorlog/client/cl_errorlog.lua",
}

server_scripts {
    "@ev-lib/server/sv_asyncExports.lua",
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
}

server_script "server/sv_main.lua"

client_script "client/cl_main.lua"
