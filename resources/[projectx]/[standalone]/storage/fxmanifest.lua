fx_version 'cerulean'
games {'gta5'}

-- dependency "ev-base"


client_script "@ev-errorlog/client/cl_errorlog.lua"

client_script "client/cl_storage.lua"


exports {
	'tryGet',
	'remove',
	'set',
	'setDev'
} 