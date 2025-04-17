fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "ev-polyzone",
  "ev-lib",
  "ev-ui"
} ]]--

client_script "@ev-sync/client/lib.lua"
client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  'client/cl_*.js',
  "@PolyZone/client.lua",
  "@PolyZone/ComboZone.lua",
}

shared_script {
  '@ev-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_script "@ev-lib/server/sv_cpx.js"
server_scripts {
  '@oxmysql/lib/MySQL.lua',
  '@ev-lib/server/sv_asyncExports.lua',
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_rpc.js',
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_sql.js',
  'server/sv_*.lua',
  'server/sv_*.js',
}
