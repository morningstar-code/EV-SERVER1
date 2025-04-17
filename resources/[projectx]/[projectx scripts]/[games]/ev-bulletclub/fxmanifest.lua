fx_version "cerulean"

description "Victoro Bulletclub"
author "Rhodinium"
version '0.0.1'

game "gta5"

server_script '@cpx/server/lib.js'
server_script '@ev-lib/server/sv_rpc.js'
server_script '@ev-lib/server/sv_sql.js'
server_script 'server/*.js'

client_script '@cpx/client/lib.js'
client_script '@ev-lib/client/cl_ui.js'
client_script '@ev-lib/client/cl_rpc.js'
client_script '@ev-lib/client/cl_poly.js'
client_script 'client/*.js'