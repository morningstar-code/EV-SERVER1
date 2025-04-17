fx_version 'adamant'

game 'gta5'

ui_page 'build/index.html'

client_scripts {
	'client/client.lua',
	'client/utils.lua'
}

files {
	'build/index.html',
	'build/assets/*.css',
	'build/assets/*.js',
}


exports {
	'OpenUntangleGame'
}