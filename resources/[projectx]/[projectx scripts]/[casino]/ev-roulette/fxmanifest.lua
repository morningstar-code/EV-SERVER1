game 'gta5'
fx_version 'adamant'
version '1.0.2'

client_scripts {
    'config.lua',
    "@ev-lib/client/cl_ui.lua",
    '@ev-lib/client/cl_rpc.lua',
    'client/cl_*.lua',
}

server_scripts {
    'config.lua',
    '@ev-lib/shared/sh_util.lua',
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
    'server/sv_*.lua',
}


