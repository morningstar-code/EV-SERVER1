fx_version "cerulean"
games { "gta5" }

ui_page "html/index.html"

files {
    "html/*.html",
	"html/*.css",
    "html/*.js",
    "html/fonts/*.ttf",
    "imgs/*.png",
	"imgs/brands/*.png",
}

shared_scripts {
    "@ev-lib/shared/sh_util.lua",
    "shared/sh_*.lua",
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    "server/sv_*.lua",
}

client_scripts {
    "@ev-sync/client/lib.lua",
    "@ev-lib/client/cl_rpc.lua",
    "@ev-lib/client/cl_ui.lua",
    "client/cl_*.lua",
}