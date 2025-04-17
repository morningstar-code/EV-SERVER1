fx_version "cerulean"
games { "gta5" }

ui_page "html/index.html"

files {
    'html/index.html',
    'html/script.js',
}

shared_scripts {
    '@ev-lib/shared/sh_cacheable.lua',
    '@ev-lib/shared/sh_util.lua',
}

client_scripts {
    'client/client.lua'
}

server_scripts {
    'config.lua',
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    "@ev-lib/server/sv_sql.lua",
    "server/*.lua",
}
