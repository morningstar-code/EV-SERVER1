fx_version 'cerulean'
games { 'rdr3', 'gta5' }

server_scripts {
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.lua',
  'server/config.lua',
  'server/sv_*.lua',
}

lua54 'yes'