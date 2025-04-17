fx_version "cerulean"
games { "gta5" }

ui_page "nui/dist/index.html"

files {
    "nui/dist/index.html",
    "nui/dist/js/app.js",
    "nui/dist/css/app.css",
    "nui/dist/img/tablet.png",
}

server_scripts {
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_rpc.js",
    "@ev-lib/server/sv_sql.lua",
    "@ev-lib/server/sv_sql.js",
    "server/vehiclesWithClasses.js",
    "server/config.js",
    "server/queries.js",
    "server/utils.js",
    "server/api.js",
    "server/Race.js",
    "server/Tournament.js",
    "server/events.js",
    "server/server.js",
    "server/creation.lua",
    "server/dongle.lua",
}

client_scripts{
    "@ev-lib/client/cl_ui.lua",
    "@ev-lib/client/cl_rpc.lua",
    "@ev-lib/client/cl_rpc.js",
    "client/config.lua",
    "client/utils.lua",
    "client/api.lua",
    "client/exports.lua",
    "client/commands.lua",
    "client/events.lua",
    "client/nui_cb.lua",
    "client/creation.lua",
    "client/checkpoint_race.lua",
    "client/dongle.lua",
    "client/*.js",
}