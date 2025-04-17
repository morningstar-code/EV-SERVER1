fx_version 'cerulean'
games { 'gta5' }

description "Victoro - Base"
author "Rhodinium"

client_script "@ev-errorlog/client/cl_errorlog.lua"
server_script '@oxmysql/lib/MySQL.lua'

-- INIT CPX --
client_script "@cpx/client/lib.js"
server_script "@cpx/server/lib.js"

-- INIT --
server_script "sh_init.lua"
client_script "sh_init.lua"

--[[=====EVENTS=====]]--
server_script "events/sv_events.lua"
client_script "events/cl_events.lua"

--[[=====CORE=====]]--
server_script "core/sh_core.lua"
server_script "core/sh_enums.lua"
-- utility
server_script "utility/sh_util.lua"
-- database
server_script "database/sv_db.lua"
server_script "core/sv_core.lua"
server_script "core/sv_characters.lua"

client_script "core/sh_core.lua" 
client_script "core/sh_enums.lua"
-- utility
client_script "utility/sh_util.lua"
client_script "utility/cl_util.lua"

client_script "core/cl_core.lua"

--[[=====SPAWNMANAGER=====]]--
client_script "spawnmanager/cl_spawnmanager.lua"

--[[=====PLAYER=====]]--
server_script "player/sv_player.lua"
server_script "player/sv_controls.lua"
server_script "player/sv_settings.lua"
server_script "player/sv_variables.lua"

client_script "player/cl_player.lua"
client_script "player/cl_controls.lua"
client_script "player/cl_settings.lua"
client_script "player/cl_variables.lua"

--[[=====BLIPMANAGER=====]]--
client_script "blipmanager/cl_blipmanager.lua"
client_script "blipmanager/cl_blips.lua"

--[[=====COMMANDS=====]]--
client_script "commands/cl_commands.lua"
server_script "commands/sv_commands.lua"

--[[=====INFINITY=====]]--
client_script "@ev-infinity/client/cl_main.lua"
client_script "@ev-infinity/client/cl_tools.lua"
server_script "@ev-infinity/server/sv_main.lua"

server_scripts {
  "@ev-lib/server/sv_sql.lua",
  "config.lua",
}

lua54 'yes'