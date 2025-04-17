fx_version "cerulean"

game "gta5"

files {
    'dlc_nikez_misc/*.awc',
    'misc.dat54.rel'
}

client_script "@ev-sync/client/lib.lua"
client_script "@ev-lib/client/cl_ui.lua"
client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_rpc.lua"
server_script "@ev-lib/server/sv_rpc.lua"
server_script "@cpx/server/lib.js"
shared_script "@cpx/shared/lib.lua"
client_script "@ev-errorlog/client/cl_errorlog.lua" 
server_script "@ev-lib/server/sv_asyncExports.lua"


client_script {
    "client/cl_*.lua",
    "client/cl_*.js",
    "config.lua"
}

server_script {
    "server/sv_*.lua",
    "server/sv_*.js",
    "config.lua"
}

data_file 'AUDIO_WAVEPACK' 'dlc_nikez_misc'
data_file 'AUDIO_SOUNDDATA' 'misc.dat'
