fx_version 'cerulean'
games {'gta5'}

-- dependency "ev-base"
-- dependency "raid_clothes"

ui_page "html/index.html"
files({
	"html/*",
	"html/images/*",
	"html/css/*",
	"html/webfonts/*",
	"html/js/*"
})

client_script '@ev-lib/client/cl_rpc.lua'
client_script "@ev-errorlog/client/cl_errorlog.lua"
client_script "client/*"

shared_script "shared/sh_spawn.lua" 
shared_script "@ev-lib/shared/sh_cache.lua"
server_scripts {
  "@oxmysql/lib/MySQL.lua",
  '@ev-lib/server/sv_sql.lua',
  '@ev-lib/server/sv_asyncExports.lua',
  '@ev-lib/server/sv_rpc.lua',
}
server_script "server/*"