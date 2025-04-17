fx_version 'cerulean'
games { 'gta5' }

ui_page 'client/html/index.html'

files {
  'client/html/*.html',
  'client/html/*.js',
  'client/html/*.css',
  'client/html/webfonts/*.eot',
  'client/html/webfonts/*.svg',
  'client/html/webfonts/*.ttf',
  'client/html/webfonts/*.woff',
  'client/html/webfonts/*.woff2',
  'client/html/css/*',
}

client_scripts {
  '@ev-errorlog/client/cl_errorlog.lua',
  '@ev-lib/client/cl_rpc.lua',
  '@ev-lib/client/cl_ui.lua',
  'client/cl_tattooshop.lua',
  'client/cl_*.lua',
  'client/cl_*.js',
}

shared_script {
  '@ev-lib/shared/sh_util.lua',
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_rpc.js',
  '@ev-lib/server/sv_sql.lua',
  'server/sv_*.lua',
}

export "CreateHashList"
export "GetTatCategs"
export "GetCustomSkins"