fx_version 'cerulean'
games { 'gta5' }

client_script "@ev-lib/client/cl_ui.lua"
-- client_script "@cpx/client/lib.js"
-- server_script "@cpx/server/lib.js"
-- shared_script '@cpx/shared/lib.lua'

client_scripts {
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  'client/cl_*.js',
}

server_scripts {
  '@ev-lib/server/sv_sql.lua',
  "@ev-lib/server/sv_asyncExports.lua",
  'server/sv_*.lua',
  'server/sv_*.js',
}
