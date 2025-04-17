fx_version "cerulean"

description "Victoro - MDW"
author "Rhodinium"
version '0.0.1'

lua54 'yes'

game "gta5"

ui_page 'web/build/index.html'

client_scripts {
  "@ev-lib/client/cl_rpc.lua",
  "@ev-lib/client/cl_ui.lua",
  'client/cl_utils.lua',
  'client/cl_*.lua'
}

shared_scripts {
  '@ev-lib/shared/sh_util.lua',
  '@ev-lib/shared/sh_cacheable.lua',
}
server_scripts {
  "@oxmysql/lib/MySQL.lua",
  "@ev-lib/server/sv_rpc.lua",
  "@ev-lib/server/sv_sql.lua",
  "server/sv_*.lua"
}

files {
  'web/build/index.html',
  'web/build/**/*'
}