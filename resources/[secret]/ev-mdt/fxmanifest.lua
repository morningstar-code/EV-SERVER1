fx_version 'cerulean'

games { 'gta5' }

shared_script '@ev-lib/shared/sh_cacheable.lua'

client_script '@ev-sync/client/lib.lua'
client_script '@ev-lib/client/cl_ui.lua'

-- client_script "@cpx/client/lib.js"
-- server_script "@cpx/server/lib.js"
-- shared_script "@cpx/shared/lib.lua"

client_scripts {
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  '@PolyZone/client.lua',
}

server_scripts { 
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_rpc.js',
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_sql.js',
  '@ev-lib/server/sv_asyncExports.lua',
  'config.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}