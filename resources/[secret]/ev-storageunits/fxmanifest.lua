fx_version "cerulean"

description "Cool Storage Units"
author "cool"
version '0.0.1'

game "gta5"

server_script '@ev-lib/server/sv_rpc.js'
server_script '@ev-lib/server/sv_sql.js'
server_script 'server/*.js'

client_script '@ev-lib/client/cl_ui.js'
client_script '@ev-lib/client/cl_rpc.js'
client_script 'client/*.js'