RPC.register("ev-music:openApp", function(src)
    exports["ev-ui"]:openApplication("musicplayer", { url = info.url })
end)

RPC.register("ev-music:closeApp", function(src)
    exports["ev-ui"]:closeApplication("musicplayer") -- Edit: removed true because we have already 'show = false' in the callback so no need to true.
end)

RPC.register("ev-music:addMusicEntry", function(src, data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
    -- info.url / info.id .
end)

RPC.register("ev-music:createMusicTapes", function(src, data, cb)
    cb({ data = {}, meta = { ok = true, message = '' } })
end)

RPC.register("ev-music:recordPlay", function(src, info)
    local info = json.decode(info)

end)

RPC.register("ev-music:getSongOptions", function(src, pParams, business)
    
end)
