fx_version 'cerulean'
games { 'gta5' }

server_script "@cpx/server/lib.js"
client_script "@cpx/client/lib.js"
shared_script "@cpx/shared/lib.lua"

client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
    '@ev-errorlog/client/cl_errorlog.lua',
    '@ev-lib/client/cl_rpc.lua',
    '@PolyZone/client.lua',
    '@PolyZone/BoxZone.lua',
    '@PolyZone/ComboZone.lua',
    'client/cl_*.lua',
}

shared_script {
    '@ev-lib/shared/sh_util.lua',
    'shared/sh_*.*',
}

server_scripts {
    'config.lua',
    '@ev-lib/server/sv_asyncExports.lua',
    '@ev-lib/server/sv_rpc.lua',
    '@ev-lib/server/sv_sql.lua',
    'server/sv_*.lua',
}