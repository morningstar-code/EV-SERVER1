fx_version 'cerulean'
games {'gta5'}

-- dependency "ev-base"
-- dependency "oxmysql"


client_script "@ev-errorlog/client/cl_errorlog.lua"


client_script {
	'util/xml.lua',
	'client/ytyp/*',
	'client/cl_ytyp.lua',
	
}

exports {
	'request',
} 