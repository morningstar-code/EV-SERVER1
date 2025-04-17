fx_version 'cerulean'

games { 'gta5' }

client_scripts {
  "@ev-sync/client/lib.lua",
  "@ev-lib/client/cl_ui.lua",
  '@ev-lib/client/cl_rpc.lua',
  '@ev-lib/client/cl_animTask.lua',
  'client/cl_*.lua',
  "@PolyZone/client.lua",
}

server_script "@ev-lib/server/sv_cpx.js"
server_scripts {
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_rpc.js',
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_sql.js',
  'server/sv_*.lua',
  'server/sv_*.js',
  'build-server/sv_*.js',
}
