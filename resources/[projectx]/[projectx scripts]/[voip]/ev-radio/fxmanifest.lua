fx_version "cerulean"
games { "gta5" }

ui_page "html/index.html"

files {
    "html/*.html",
    "html/*.js",
    "html/*.css",
    "html/*.png",
    "html/*.ttf",
}

client_script "@ev-lib/client/cl_ui.lua"
client_script "@ev-errorlog/client/cl_errorlog.lua"

shared_scripts {
    "shared/*",
}

server_scripts {
    "server/*",
}

client_scripts {
    "client/*",
}