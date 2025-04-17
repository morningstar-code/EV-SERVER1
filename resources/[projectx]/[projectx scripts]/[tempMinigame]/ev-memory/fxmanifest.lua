fx_version 'adamant'

game 'gta5'

ui_page 'ui/index.html'

client_scripts {
	'@ev-errorlog/client/cl_errorlog.lua',
	'@ev-lib/client/cl_ui.lua',
	'@ev-lib/client/cl_animTask.lua',
	'@ev-sync/client/lib.lua',
	'client.lua',
}

files {
	'ui/index.html',
	'ui/*.css',
	'ui/*.js',
}