fx_version 'cerulean'
games { 'gta5' }

client_script "@cpx/client/lib.js"
server_script "@cpx/server/lib.js"
shared_script "@cpx/shared/lib.lua"

client_script "@ev-errorlog/client/cl_errorlog.lua"
client_script "@ev-lib/client/cl_ui.lua"
client_script "@ev-lib/client/cl_rpc.lua"
server_script "@ev-lib/server/sv_rpc.lua"

client_scripts {
  'client/cl_*.lua',
}

shared_script {
  'sh_config.lua',
}

server_scripts {
  'server/sv_*.lua',
}

ui_page "ui/index.html"

files({
    "ui/index.html",
    "ui/js/*.js",
    "ui/css/*.css",
})
