CPX.Commands = CPX.Commands or {}
CPX.Commands.Registered = CPX.Commands.Registered or {}

AddEventHandler("ev-base:exportsReady", function()
    addModule("Commands", CPX.Commands)
end)

function CPX.Commands.AddCommand(self, command, suggestion, source, cb, condition)
    if CPX.Commands.Registered[command] then return end
      table.insert(CPX.Commands.Registered, { ['command'] = command, ['suggestion'] = suggestion, ['function'] = cb, ["condition"] = condition})
      CPX.Commands.Registered[command] = true
    cb(cb)
end

function CPX.Commands.RemoveCommand(self, command, suggestion, source, cb, args)
    if not CPX.Commands.Registered[command] or nil then return end
    CPX.Commands.Registered[command] = false
    cb(cb)
end

-- AddEventHandler('chatMessage', function(Source, Color, Message)
--     if Message:sub(1, 1) == '/' then
--         local fullcmd = stringsplit(Message, ' ')
--         local cmd = fullcmd[1]
-- 		    local Comment

-- 		if #fullcmd > 1 then
-- 			Comment = fullcmd[2]
-- 			if #fullcmd > 2 then
-- 				for i=3, #fullcmd do
-- 					Comment = Comment .. ' ' .. fullcmd[i]
-- 				end
-- 			end
-- 		end
		
--         -- if cmd:lower() == '/savepos' then
--         -- 	TriggerClientEvent('CoordSaver:GetCoords', Source, Comment)
--         -- 	CancelEvent()
--         -- end
--     end
-- end)

-- function stringsplit(Input, Seperator)
-- 	if Seperator == nil then
-- 		Seperator = '%s'
-- 	end
	
-- 	local t={} ; i=1
	
-- 	for str in string.gmatch(Input, '([^'..Seperator..']+)') do
-- 		t[i] = str
-- 		i = i + 1
-- 	end
	
-- 	return t
-- end