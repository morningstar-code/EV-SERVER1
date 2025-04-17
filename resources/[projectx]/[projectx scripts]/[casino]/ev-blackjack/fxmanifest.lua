fx_version 'adamant'

game "gta5"

client_scripts {
  "@ev-lib/client/cl_ui.lua",
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

server_scripts {
  "@oxmysql/lib/MySQL.lua",
  "@ev-lib/server/sv_rpc.lua",
  "@ev-lib/server/sv_sql.lua",
  'server/sv_*.lua',
  'server/sv_*.js',
}
