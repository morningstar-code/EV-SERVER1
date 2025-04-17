fx_version "cerulean"

games {"gta5"}

description "NPCs Handler"

version "0.1.0"

client_scripts {
  "@ev-errorlog/client/cl_errorlog.lua",
  "@ev-lib/client/cl_flags.lua",
  "@ev-lib/client/cl_rpc.lua",
  "client/classes/*.lua",
  "client/*.lua",
}

shared_scripts {
  "@ev-lib/shared/sh_util.lua",
  "shared/sh_*.lua",
}

server_scripts {
  "@ev-lib/server/sv_rpc.lua",
  "server/sv_*.lua",
}
