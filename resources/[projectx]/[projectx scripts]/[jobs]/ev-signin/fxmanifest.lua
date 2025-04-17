fx_version 'cerulean'
games { 'gta5' }

client_script "@ev-errorlog/client/cl_errorlog.lua"
client_script "@ev-lib/client/cl_ui.lua"
client_script "@ev-lib/client/cl_rpc.lua"
client_script "config.lua"

client_scripts {
  "client/cl_*.lua"
}
server_scripts {
  "@oxmysql/lib/MySQL.lua",
  "@ev-lib/server/sv_sql.lua",
  "server/sv_*.lua",
}