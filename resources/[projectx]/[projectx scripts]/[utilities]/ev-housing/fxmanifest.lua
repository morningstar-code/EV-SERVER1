fx_version 'cerulean'
games{'gta5'}

client_script "config.lua"

client_scripts{
  "@ev-lib/client/cl_ui.lua",
  '@ev-lib/client/cl_rpc.lua',
  'client/cl_*.lua',
}

shared_script{
  '@ev-lib/shared/sh_util.lua',
  'shared/sh_*.*'
}

server_scripts{
  "@oxmysql/lib/MySQL.lua",
  '@ev-lib/server/sv_rpc.lua',
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_asyncExports.lua',
  'server/sv_*.lua',
}

export "retriveHousingTable"
export "isNearProperty"
export "isInRobbery"
export "retrieveHousingTableMapped"
export "retrieveHousingZonesConfig"

export "hasPermissionInProperty"
export "getOwnerOfCurrentProperty"
export "getCurrentPropertyID"
export "isOwnerOfCurrentProperty"
export "isPropertyShop"
export "isInsideProperty"

export "getPropertyBuisness"

server_export "getSetOfProperty"
server_export "retrieveHousingTableMapped"
server_export "isCIDOwner"
