fx_version "cerulean"

description "EV - UI"
author "cool"
version '0.0.1'

lua54 'yes'

game "gta5"

shared_script "@cpx/shared/lib.lua"

ui_page 'web/build/index.html'

files {
  'web/build/index.html',
  'web/build/**/*'
}

client_scripts {
  "@ev-lib/client/cl_rpc.lua",
  'client/cl_exports.lua',
  'client/cl_utils.lua',
  'client/model/cl_*.lua'
}

server_scripts {
  '@ev-lib/server/sv_rpc.lua',
  'server/sv_*.lua',
  'server/sv_*.js'
}