fx_version 'cerulean'
games { 'gta5' }

client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
  '@ev-errorlog/client/cl_errorlog.lua',
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

shared_scripts {
  '@ev-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts {
  'config.lua',
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.lua',
  'server/sv_*.lua',
}