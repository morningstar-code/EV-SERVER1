fx_version 'cerulean'
games {'gta5'}

client_script "@ev-errorlog/client/cl_errorlog.lua"
client_script "@ev-lib/client/cl_rpc.lua"


client_script {
  "client.lua",
}
export "GetClosestNPC"
export "IsPedNearCoords"
export "isPed"
export "GroupRank"
export "TargetVehicle"