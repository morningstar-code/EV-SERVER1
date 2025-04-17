fx_version 'cerulean'
game 'gta5'

version '1.4'

client_scripts {
    "@ev-lib/client/cl_rpc.lua",
    "@ev-lib/client/cl_ui.lua",
    'config.lua',
    'client/*.lua',
}

server_scripts {
    "@ev-lib/server/sv_rpc.lua",
    'server_config.lua',
    '@mysql-async/lib/MySQL.lua',
    'server/*.lua',
}

ui_page 'html/index.html'

files {
    'html/*',
    'html/titles/*',
    'html/titles/3/*',
    'html/titles/4/*',
    'html/titles/5/*',
    'html/titles/6/*',
    'html/titles/7/*'
}

exports {
    'dispatchadd',
    'dispatch',
    'policedead',
    'callsign_command'
}