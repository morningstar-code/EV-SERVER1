fx_version "cerulean"

description "Cool - Vehicles"
author "cool"
version '0.0.1'

game "gta5"

shared_script "@ev-lib/shared/sh_cacheable.js"

client_script "@cpx/client/lib.js"
server_script "@cpx/server/lib.js"
server_script '@ev-lib/server/sv_rpc.js'
server_script '@ev-lib/server/sv_sql.js'
server_script 'server/*.js'
server_script 'server/sv_*.lua'
client_script '@ev-lib/client/cl_rpc.js'
client_script '@ev-lib/client/cl_ui.js'
client_script 'client/*.js'
client_script 'client/*.lua'