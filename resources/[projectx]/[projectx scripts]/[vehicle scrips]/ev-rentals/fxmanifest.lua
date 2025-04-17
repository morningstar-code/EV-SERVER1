fx_version "cerulean"
games { "gta5" }

--[[ dependencies {
  "ev-lib",
  "PolyZone",
  "ev-ui"
} ]]--


client_scripts {
  "@ev-lib/client/cl_ui.lua",
  "@ev-lib/client/cl_rpc.lua",
  "client/cl_*.lua",
  "@PolyZone/client.lua",
  "@PolyZone/ComboZone.lua",
}

shared_script {
  "@ev-lib/shared/sh_util.lua",
  "shared/sh_*.*",
}

server_scripts {
  "@ev-lib/server/sv_asyncExports.lua",
  "@ev-lib/server/sv_rpc.lua",
  "@ev-lib/server/sv_sql.lua",
  "server/sv_*.lua",
  "server/sv_*.js",
}
