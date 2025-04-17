fx_version 'cerulean'

games { 'gta5' }

client_script "@ev-lib/client/cl_rpc.js"
client_script "build/client.js"

server_script "@ev-lib/server/sv_rpc.js"
server_script "@ev-lib/server/sv_asyncExports.js"
server_script "build/server.js"
