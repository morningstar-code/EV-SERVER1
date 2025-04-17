fx_version "cerulean"

games { "gta5" }

description "Cool Library"

author "cool#1337"

version "0.1.0"

server_script "@ev-lib/server/sv_sql.js"

server_scripts {
    "server/*.js",
}

client_scripts {
    "client/*.js",
}

shared_scripts {
    "shared/*.*",
}

exports {
    'GetLibrary',
}
