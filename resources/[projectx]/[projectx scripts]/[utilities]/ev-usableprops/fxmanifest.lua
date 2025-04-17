fx_version 'cerulean'
games {'gta5'}

client_script "@ev-errorlog/client/cl_errorlog.lua"
client_script "@ev-sync/client/lib.lua"

client_scripts {
  '@ev-lib/client/cl_rpc.lua',
  '@cpx/client/lib.js',
  '@ev-lib/client/cl_ui.lua',
  '@ev-lib/shared/sh_util.lua',
  'client/cl_*.lua'
}

shared_scripts {
  '@cpx/shared/lib.lua',
}

server_scripts {
  '@ev-lib/server/sv_rpc.lua',
  '@cpx/server/lib.js',
  'server/sv_*.lua'
}
