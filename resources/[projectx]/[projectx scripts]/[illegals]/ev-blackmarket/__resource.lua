resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

ui_page 'html/laptop.html'

client_scripts {
    '@ev-lib/client/cl_rpc.lua',
    'client/main.lua',
}

server_scripts {
    '@ev-lib/server/sv_rpc.lua',
    'server/main.lua',
}

files {
    'html/laptop.html',
    'html/css/style.css',
    'html/css/reset.css',
    'html/js/ui.js',
    'html/js/browse.js',
    'html/img/*.png',
}