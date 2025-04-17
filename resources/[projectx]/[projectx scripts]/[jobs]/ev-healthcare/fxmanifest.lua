fx_version 'cerulean'

games {
  'gta5',
  'rdr3'
}

client_scripts {
  "@ev-lib/client/cl_ui.lua",
  "@ev-locales/client/lib.lua",
  '@ev-lib/client/cl_rpc.lua',
  '@ev-lib/client/cl_animTask.lua',
  'client/cl_*.lua'
}

shared_scripts {
  '@ev-lib/shared/sh_util.lua',
  "shared/sh_*.lua"
}

server_scripts {
  '@ev-lib/server/sv_asyncExports.lua',
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.lua',
  'server/sv_*.lua'
}