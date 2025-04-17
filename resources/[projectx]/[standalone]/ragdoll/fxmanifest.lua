fx_version 'cerulean'
games {'gta5'}

client_script {
    '@ev-lib/client/cl_rpc.lua',
    'respawn.lua',
    'cl_health.lua',
}

server_script '@cpx/server/lib.js'
client_script '@cpx/client/lib.js'
shared_script '@cpx/shared/lib.lua'

server_script {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    'server.lua',
    'sv_health.lua',
}
