fx_version "cerulean"

games { "gta5" }

description "Victoro Boilerplate"

version "0.1.0"


shared_script "@ev-lib/shared/sh_cacheable.js"
shared_script "@ev-lib/shared/sh_cacheable.lua"

server_script "@cpx/server/lib.js"
server_script "@ev-lib/server/sv_asyncExports.js"

client_script "@cpx/client/lib.js"
client_script "@ev-lib/client/cl_ui.js"

server_scripts {
    "build/server/*.js",
}

client_scripts {
    "build/client/*.js",
}
