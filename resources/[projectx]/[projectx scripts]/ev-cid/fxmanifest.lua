fx_version "cerulean"
games {"gta5"}

client_script "@ev-errorlog/client/cl_errorlog.lua"

client_script {
    "@ev-lib/client/cl_rpc.lua",
    "@ev-lib/client/cl_ui.lua",
    "client/cl_main.lua",
    "client/cl_test.lua",
}


server_scripts {
    "@ev-lib/shared/sh_util.lua",
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
    "server/sv_main.lua"
}