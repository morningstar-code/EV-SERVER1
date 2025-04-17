fx_version "adamant"
game "gta5"

name "ev-slotmachines"
description "Playable slot machines similar to that of GTA:Online."
author "Loqrin for Victoro | Victoro.net"
url "https://www.Victoro.net/"

ui_page "ui/index.html"

files({
    "ui/index.html",
    "ui/js/*.js",
    "ui/css/*.css",
})

client_scripts{
    "@ev-lib/client/cl_ui.lua",
    "@ev-lib/client/cl_rpc.lua",
    "_configs/cfg_general.lua",
    "core/client/cl_ply.lua"
}

server_scripts{
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
    "_configs/cfg_general.lua",
    "core/server/sv_ply.lua",
    "core/server/sv_slots.js"
}
