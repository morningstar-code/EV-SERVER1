fx_version 'bodacious'
games {'gta5'}

description 'Victoro Mechanics'
version '1.0.0'

client_scripts {
    "@cpx/client/lib.js",
    "@ev-lib/client/cl_ui.js",
    "@ev-lib/client/cl_rpc.js",
    "@ev-lib/client/cl_ui.lua",
    "@ev-lib/client/cl_rpc.lua",
    'client/cl_*.js',
    'client/cl_*.lua',
}

shared_scripts {
    "shared/sh_*.lua",
}

server_scripts {
    "@cpx/server/lib.js",
    "@ev-lib/server/sv_rpc.js",
    "@ev-lib/server/sv_rpc.lua",
    -- 'server/sv_*.js',
    'server/sv_*.lua',
}