fx_version 'cerulean'
games { 'gta5' }

--[[ dependencies {
  "ev-lib",
  "PolyZone",
  "ev-ui"
} ]]--

client_script "@ev-sync/client/lib.lua"
client_script "@ev-lib/client/cl_ui.lua"
client_script "@ev-lib/client/cl_polyhooks.lua"

client_scripts {
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
  "@PolyZone/client.lua",
  '@mka-lasers/client/client.lua',
}

shared_script {
  '@ev-lib/shared/sh_util.lua',
  'shared/sh_*.*',
}

server_scripts {
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_asyncExports.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}