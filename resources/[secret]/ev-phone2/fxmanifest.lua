fx_version 'cerulean'
games { 'rdr3', 'gta5' }

client_script "@cpx/client/lib.js"
server_script "@cpx/server/lib.js"
shared_script "@cpx/shared/lib.lua"

client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
  '@ev-errorlog/client/cl_errorlog.lua',
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

shared_script {
  '@ev-lib/shared/sh_util.lua',
  '@ev-lib/shared/sh_cacheable.lua',
  'shared/sh_*.*'
}

server_scripts {
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_asyncExports.lua',
  -- 'config.lua',
  'server/sv_*.lua',
}

lua54 'yes'

if GetConvar("sv_environment", "prod") == "debug" then
  client_script "tests/cl_*.lua"
end