fx_version 'cerulean'
games { 'gta5' }

client_script "@ev-lib/client/cl_ui.lua"
client_script "@ev-lib/client/cl_rpc.lua"
client_scripts {
    'cl_*.lua',
}

shared_script 'sh_*.lua'

server_script "@ev-lib/server/sv_sql.lua"
server_script 'sv_*.lua'
