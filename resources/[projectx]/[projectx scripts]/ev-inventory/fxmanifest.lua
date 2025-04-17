fx_version 'cerulean'
games {'gta5'}


--[[ dependencies {
    "PolyZone"
} ]]--

client_script "@ev-errorlog/client/cl_errorlog.lua"
client_script "@PolyZone/client.lua"

ui_page 'nui/ui.html'

files {
  "nui/ui.html",
  "nui/pricedown.ttf",
  "nui/default.png",
  "nui/background.png",
  "nui/weight-hanging-solid.png",
  "nui/hand-holding-solid.png",
  "nui/search-solid.png",
  "nui/invbg.png",
  "nui/styles.css",
  "nui/i18n.js",
  "nui/scripts.js",
  "nui/debounce.min.js",
  "nui/purify.min.js",
  "nui/loading.gif",
  "nui/loading.svg",
  "nui/icons/*"
}

shared_script 'shared_list.js'
shared_script '@ev-lib/shared/sh_cacheable.js'

client_scripts {
  "@ev-sync/client/lib.lua",
  "@ev-lib/client/cl_ui.lua",
  "@ev-lib/client/cl_rpc.js",
  "@ev-lib/client/cl_poly.js",
  "@ev-lib/client/cl_rpc.lua",
  'client.js',
  'functions.lua',
  'cl_vehicleweights.js',
  'cl_craftingspots.js',
  'cl_attach.lua',
}

server_scripts {
  "@oxmysql/lib/MySQL.lua",
  '@ev-lib/server/sv_asyncExports.js',
  "@ev-lib/server/sv_cpx.js",
  "@ev-lib/server/sv_rpc.js",
  "@ev-lib/server/sv_rpc.lua",
  "sv_clean.js",
  'server_degradation.js',
  'server_shops.js',
  'server.js',
  "sv_functions.js",
  -- 'sv_craftingspots.js',
  'sv_craftingSpots.lua',
  'sv_functions.lua',
}

exports{
  'hasEnoughOfItem',
  'hasEnoughOfItemSv',
  'getFreeSpace',
  'getQuantity',
  'GetCurrentWeapons',
  'GetItemInfo',
  'GetInfoForFirstItemOfName',
  'getFullItemList',
  
}


-- dependency 'ev-lib'
