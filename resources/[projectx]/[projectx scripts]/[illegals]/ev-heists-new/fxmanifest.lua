fx_version "cerulean"

games { "gta5" }

description "Victoro Heists X"

version "0.1.0"

dependencies { "mka-lasers" }

shared_scripts { "@cpx/shared/lib.lua", "@ev-lib/shared/sh_util.lua", "lua/shared/sh_*.lua" }

server_scripts {
  "@cpx/server/lib.js",
  "@ev-lib/server/sv_rpc.lua",
  "@ev-lib/server/sv_sql.lua",
  -- "@ev-db/server/lib.js",
  "@ev-lib/server/sv_asyncExports.js",
  "@ev-lib/server/sv_asyncExports.lua",
  "server/sv_*.js",
  "lua/server/sv_*.lua",
}

client_scripts {
  "@cpx/client/lib.js",
  "@ev-lib/client/cl_ui.js",
  -- "@ev-locales/client/lib.js",
  "@ev-errorlog/client/cl_errorlog.lua",
  "@ev-sync/client/lib.lua",
  "@ev-lib/client/cl_rpc.lua",
  "@ev-lib/client/cl_ui.lua",
  "@ev-lib/client/cl_animTask.lua",
  "@mka-lasers/client/client.lua",
  "@mka-grapple/client.lua",
  "client/cl_*.js",
  "lua/client/cl_*.lua",
}
