fx_version "cerulean"
games {"gta5"}

ui_page "client/ui/html/index.html"

files {
  "client/ui/html/index.html", 
  "client/ui/html/js/ui.js", 
  "client/ui/html/css/menu.css", 
  "client/ui/html/imgs/logo.png",
}

shared_script "@ev-lib/shared/sh_util.lua"

client_script "@cpx/client/lib.js"
client_script "@ev-sync/client/lib.lua"
client_script "@ev-lib/client/cl_ui.lua"
client_script "@ev-lib/client/cl_rpc.lua"
client_script "@ev-lib/client/cl_polyhooks.lua"
client_script "@PolyZone/client.lua"


server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_asyncExports.lua"
server_script "@ev-lib/server/sv_rpc.lua"
server_script "@oxmysql/lib/MySQL.lua"


shared_script "_configs/cfg_general.lua"
shared_script "@cpx/shared/lib.lua"

client_scripts {
  "client/cl_*.lua"
}

server_scripts {
  "server/sv_*.lua"
}

