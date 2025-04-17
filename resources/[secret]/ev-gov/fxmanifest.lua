fx_version 'cerulean'
games { 'gta5' }

client_script "@ev-lib/client/cl_ui.lua"

shared_script "@ev-lib/shared/sh_cacheable.lua"

client_script "@cpx/client/lib.js"
server_script "@cpx/server/lib.js"
shared_script "@cpx/shared/lib.lua"

client_scripts {
  '@ev-errorlog/client/cl_errorlog.lua',
  '@ev-lib/client/cl_rpc.lua',
  '@ev-lib/client/cl_animTask.lua',
  'client/cl_*.lua'
}

shared_scripts {
  '@ev-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts {
  'config.lua',
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_sql.js',
  'server/classes/*.lua',
  'server/sv_*.lua',
  'server/sv_*.js',
}

client_script "tests/cl_*.lua"