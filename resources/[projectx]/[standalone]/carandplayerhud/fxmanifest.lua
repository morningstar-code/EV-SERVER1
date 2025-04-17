fx_version 'cerulean'
games {'gta5'}


client_script "@ev-errorlog/client/cl_errorlog.lua"

shared_script "@mka-array/Array.lua"
shared_script "@ev-lib/shared/sh_cacheable.lua"

client_script "@ev-lib/client/cl_infinity.lua"
server_script "@ev-lib/server/sv_infinity.lua"
server_script "@ev-lib/server/sv_sql.lua"

client_script 'carhud.lua'
client_script 'cl_playerbuffs.lua'
server_script 'carhud_server.lua'
server_script 'sr_autoKick.lua'
client_script 'newsStands.lua'

-- ui_page('html/index.html')

-- files({
-- 	"html/index.html",
-- 	"html/script.js",
-- 	"html/styles.css",
-- 	"html/img/*.svg",
-- 	"html/img/*.png"
-- })

exports {
	"playerLocation",
	"playerZone"
}

