fx_version "cerulean"
games { "gta5" }

--[[ dependencies {
  "ev-polyzone",
  "ev-lib",
  "ev-ui"
} ]]--

client_script "@ev-lib/client/cl_ui.lua"

client_scripts {
  "@ev-lib/client/cl_rpc.lua",
  "client/cl_*.lua",
}

server_scripts {
  "@ev-lib/server/sv_asyncExports.lua",
  "@ev-lib/server/sv_rpc.lua",
  "server/sv_*.lua",
}
