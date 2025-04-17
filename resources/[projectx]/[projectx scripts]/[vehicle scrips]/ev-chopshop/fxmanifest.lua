fx_version 'cerulean'
games { 'gta5' }

shared_script "@cpx/shared/lib.lua"

client_script "@ev-sync/client/lib.lua"
client_script "@ev-lib/client/cl_flags.lua"
client_script "@ev-lib/client/cl_vehicles.lua"
client_script "@ev-lib/client/cl_rpc.lua"

client_scripts {
    "client/*.lua",
    "client/modules/*.lua"
}

server_script "@ev-lib/server/sv_rpc.lua"

server_scripts {
    "server/classes/*.lua",
    "server/*.lua",
    "server/controllers/*.lua",
}