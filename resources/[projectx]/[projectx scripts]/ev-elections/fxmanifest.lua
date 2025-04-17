fx_version 'cerulean'
game 'gta5'

shared_script 'vCode.lua'

Author 'ProjectX/SP34R'

client_script '@ev-lib/client/cl_rpc.lua'
server_script '@ev-lib/server/sv_rpc.lua'
client_script 'cl_*'
server_script 'sv_*'


ui_page 'html/index.html'
files {
    'html/*.*'
}