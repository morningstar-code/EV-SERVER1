fx_version 'cerulean'
games { 'gta5' }

ui_page 'index.html'

client_script {
    "@ev-lib/client/cl_rpc.lua",
    'client/cl_*.lua',
    'client/cl_*.js',
}

shared_script {
    'shared/sh_*.lua',
}

server_scripts {
    "@ev-lib/server/sv_rpc.lua",
    'server/sv_*.lua',
}

files {
    'index.html',
    'sounds/*.ogg'
}