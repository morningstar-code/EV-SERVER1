fx_version 'cerulean'
game 'gta5'

shared_script "shared/sh_*.lua"


client_scripts{
   '@ev-lib/client/cl_rpc.lua',
   '@ev-lib/client/cl_ui.lua',
    'client/cl_*.lua',
}

server_scripts{
   '@ev-lib/server/sv_rpc.lua',
    'server/sv_*.lua',
}
