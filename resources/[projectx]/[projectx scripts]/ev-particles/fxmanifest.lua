fx_version 'cerulean'
games {'gta5'}


client_script "@ev-errorlog/client/cl_errorlog.lua"


client_script 'particle_client.lua'
server_script 'particle_server.lua'

exports{
	'particleStart'
}
