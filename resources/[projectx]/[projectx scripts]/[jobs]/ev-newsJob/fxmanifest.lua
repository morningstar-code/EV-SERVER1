fx_version 'cerulean'
games { 'gta5' }

client_script "@ev-lib/client/cl_ui.lua"
client_script "@ev-errorlog/client/cl_errorlog.lua"
client_script "@ev-lib/client/cl_polyhooks.lua"

shared_scripts {
  '@ev-lib/shared/sh_util.lua',
  'shared/sh_*.lua'
}

client_scripts {
  '@ev-lib/client/cl_rpc.lua',
  "@ev-sync/client/lib.lua",
  'client/cl_*.lua',
}

server_scripts {
  "@ev-lib/server/sv_rpc.lua",
  "@oxmysql/lib/MySQL.lua",
  "@ev-lib/server/sv_asyncExports.js",
  "server/sv_*.lua",
}
