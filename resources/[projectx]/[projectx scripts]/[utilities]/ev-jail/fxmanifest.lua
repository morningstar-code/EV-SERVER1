fx_version "cerulean"
games { "gta5" }

shared_scripts {
    '@ev-lib/shared/sh_cacheable.lua',
    -- '@ev-lib/shared/sh_cacheable.js', TODO: make jail script in js/ts
    "shared/*",
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "@ev-lib/server/sv_rpc.lua",
    "server/sv_*.lua",
    -- "@ev-lib/server/sv_rpc.js", TODO: make jail script in js/ts
    -- "server/sv_*.js", TODO: make jail script in js/ts
}

client_scripts {
    "@ev-lib/client/cl_rpc.lua",
    "@ev-lib/client/cl_ui.lua",
    "client/cl_*.lua",
    -- "@ev-lib/client/cl_rpc.js", TODO: make jail script in js/ts
    -- "@ev-lib/client/cl_ui.js", TODO: make jail script in js/ts
    -- "client/cl_*.js", TODO: make jail script in js/ts
}