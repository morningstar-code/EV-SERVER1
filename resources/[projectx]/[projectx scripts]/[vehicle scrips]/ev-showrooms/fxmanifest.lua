fx_version 'cerulean'
games { 'gta5' }

client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
  '@ev-lib/client/cl_rpc.lua',
  '@ev-lib/client/cl_rpc.js',
  'client/cl_*.lua',
  'client/cl_*.js',
  "@PolyZone/client.lua",
  "@PolyZone/ComboZone.lua",
}

shared_script {
  '@ev-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_scripts {
  '@ev-lib/server/sv_asyncExports.lua',
  '@ev-lib/server/sv_rpc.js',
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.js',
  '@ev-lib/server/sv_sql.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}