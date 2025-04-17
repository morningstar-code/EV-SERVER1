fx_version 'cerulean'
games {'gta5'}


shared_script "@mka-array/Array.lua"
shared_script "@ev-lib/shared/sh_cacheable.lua"

server_script {
	"@ev-lib/server/sv_infinity.lua",
	'@ev-lib/server/sv_rpc.lua',
	'server/server.lua',
}
server_script "server.lua"
client_script "client.lua"

client_script {
	"@ev-errorlog/client/cl_errorlog.lua",
	"@ev-lib/client/cl_infinity.lua",
	'@ev-lib/client/cl_rpc.lua',
	'client.lua',
}
