fx_version 'cerulean'
game 'gta5'
version '1.0.0'

client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_ui.js"
client_script "@ev-locales/client/lib.js"
client_script "build/client.js"

server_script "@cpx/server/lib.js"
server_script "@ev-db/server/lib.js"
server_script "build/server.js"
