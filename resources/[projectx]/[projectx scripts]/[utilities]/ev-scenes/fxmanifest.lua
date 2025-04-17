fx_version 'cerulean'

games { 'gta5' }

client_scripts {
  "@ev-lib/client/cl_rpc.lua",
  "@ev-lib/client/cl_ui.lua",
  'client/cl_*.lua',
}

server_scripts {
  "@oxmysql/lib/MySQL.lua",
  "@ev-lib/server/sv_rpc.lua",
  "@ev-lib/server/sv_sql.lua",
  'server/sv_*.lua',
}

